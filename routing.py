import requests
import random
import folium
import polyline
import pandas as pd
import numpy as np
#from dotenv import load_dotenv
import os


def get_random_color(exclude_colors=None):
    exclude_colors = exclude_colors or set()
    while True:
        color = "#{:06x}".format(random.randint(0, 0xFFFFFF))
        if color not in exclude_colors:
            return color

def build_payload(origin, destination):
    return {
        "origin": {
            "location": {
                "latLng": {
                    "latitude": origin[0],
                    "longitude": origin[1]
                }
            }
        },
        "destination": {
            "location": {
                "latLng": {
                    "latitude": destination[0],
                    "longitude": destination[1]
                }
            }
        },
        "travelMode": "DRIVE",
        "routingPreference": "TRAFFIC_AWARE_OPTIMAL",
        "computeAlternativeRoutes": True
    }

def get_routes(payload, api_key):
    url = 'https://routes.googleapis.com/directions/v2:computeRoutes'
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": api_key,
        "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline"
    }
    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()
    return response.json()

def plot_routes_from_names(location_order, df, api_key):
    if len(location_order) < 2:
        raise ValueError("Need at least two locations in order to plot routes.")

    # Lookup lat/lng from df in order
    locations = []
    for name in location_order:
        row = df[df['Name'] == name]
        if row.empty:
            raise ValueError(f"Location '{name}' not found in DataFrame.")
        lat = row.iloc[0]['Latitude']
        lon = row.iloc[0]['Longitude']
        locations.append((lat, lon))

    m = folium.Map(location=locations[0], zoom_start=10)
    used_colors = {"#00008B"}  # dark blue for best routes

    # Add numbered markers before drawing lines
    for idx, (lat, lon) in enumerate(locations):
        if idx == 0:
            label = "Start"
            icon_color = "blue"
        elif idx == len(locations) - 1:
            label = "End"
            icon_color = "red"
        else:
            label = str(idx + 1)  # 2, 3, ...
            icon_color = "green"
        folium.Marker(
            location=(lat, lon),
            popup=f"{location_order[idx]} ({label})",
            icon=folium.Icon(color=icon_color, icon="info-sign")
        ).add_to(m)

    # Draw polylines with route info
    for i in range(len(locations) - 1):
        origin = locations[i]
        destination = locations[i + 1]
        label = f"{location_order[i]} → {location_order[i+1]}"

        payload = build_payload(origin, destination)
        route_data = get_routes(payload, api_key)
        routes = route_data.get('routes', [])

        for idx, route in enumerate(routes):
            coords = polyline.decode(route['polyline']['encodedPolyline'])
            distance_km = route['distanceMeters'] / 1000
            duration_seconds = int(route['duration'].replace('s', ''))
            duration_min = duration_seconds / 60

            if idx == 0:
                color = "#00008B"
                weight = 6
                opacity = 0.9
            else:
                color = get_random_color(used_colors)
                used_colors.add(color)
                weight = 4
                opacity = 0.6

            folium.PolyLine(
                coords,
                color=color,
                weight=weight,
                opacity=opacity,
                tooltip=f"{label} Route {idx+1}: {distance_km:.1f} km, {duration_min:.0f} min"
            ).add_to(m)

    return m


import random

def calculate_random_route(locations, distance_matrix, duration_matrix, start_index):
    """
    Generates a random route with a fixed start index and calculates total distance and duration.

    Args:
        locations (list): List of location names.
        distance_matrix (list of lists): Distance matrix in meters.
        duration_matrix (list of lists): Duration matrix in seconds.
        start_index (int): Index of the fixed starting location in the locations list.

    Returns:
        dict: {
            'route': list of location names in random order,
            'total_distance_km': float,
            'total_duration_min': float
        }
    """
    n = len(locations)
    
    if not (0 <= start_index < n):
        raise ValueError(f"Start index {start_index} is out of range for locations list.")

    remaining_indices = [i for i in range(n) if i != start_index]
    random.shuffle(remaining_indices)

    route_indices = [start_index] + remaining_indices

    total_distance = sum(float(distance_matrix[route_indices[i]][route_indices[i+1]]) for i in range(n - 1))
    total_duration = sum(float(duration_matrix[route_indices[i]][route_indices[i+1]]) for i in range(n - 1))

    route_names = [locations[i] for i in route_indices]

    return {
        'route': route_names,
        'total_distance_km': total_distance / 1000,
        'total_duration_min': total_duration / 60
    }


def get_distance_and_duration_matrices(location_names, df_coords, api_key):
    """
    Returns distance and duration_in_traffic matrices for a list of locations.
    Parameters:
    - location_names: List of location names matching the 'name' column in df_coords
    - df_coords: DataFrame with columns ['name', 'lat', 'lon']
    - api_key: Google Maps Distance Matrix API key

    Returns:
    - distance_matrix: np.ndarray of distances in meters
    - duration_matrix: np.ndarray of durations in seconds (including traffic)
    """

    # Filter the DataFrame to only the required locations
    df_filtered = df_coords[df_coords['Name'].isin(location_names)].copy()

    # Ensure correct order
    df_filtered = df_filtered.set_index('Name').loc[location_names].reset_index()

    coords = list(zip(df_filtered['Latitude'], df_filtered['Longitude']))

    def coord_str(coord_list):
        return "|".join([f"{lat},{lng}" for lat, lng in coord_list])

    response = requests.get(
        "https://maps.googleapis.com/maps/api/distancematrix/json",
        params={
            "origins": coord_str(coords),
            "destinations": coord_str(coords),
            "departure_time": "now",
            "traffic_model": "best_guess",
            "key": api_key
        }
    )

    data = response.json()
    N = len(coords)
    distance_matrix = np.full((N, N), np.inf)
    duration_matrix = np.full((N, N), np.inf)

    for i, row in enumerate(data["rows"]):
        for j, element in enumerate(row["elements"]):
            if element["status"] == "OK":
                distance_matrix[i][j] = element["distance"]["value"]
                duration_matrix[i][j] = element["duration_in_traffic"]["value"]

    return distance_matrix, duration_matrix

def calculate_trip_cost(distance_km, truck_type="MCV", fuel_price_per_litre=87.0, toll=0, cold_chain=True):
    """
    Calculate the cost of a logistics trip based on distance, truck type, and operating factors.

    Parameters:
    - distance_km (float): Distance of the trip in kilometers.
    - truck_type (str): Type of truck ('LCV', 'MCV', 'HCV').
    - fuel_price_per_litre (float): Cost of diesel per litre in ₹ (default = 87).
    - toll (float): Total toll cost in ₹.
    - cold_chain (bool): If True, adds cost for refrigerated transport.

    Returns:
    - dict: Detailed cost breakdown and total cost.
    """

    # Define truck parameters
    truck_specs = {
        "LCV": {"mileage": 10, "driver_wage": 400, "maintenance_per_km": 1.2},
        "MCV": {"mileage": 8, "driver_wage": 500, "maintenance_per_km": 1.5},
        "HCV": {"mileage": 5, "driver_wage": 600, "maintenance_per_km": 2.0}
    }

    if truck_type not in truck_specs:
        raise ValueError("Unsupported truck type. Choose from: 'LCV', 'MCV', 'HCV'.")

    specs = truck_specs[truck_type]

    # Calculate basic cost components
    fuel_required = distance_km / specs["mileage"]
    fuel_cost = fuel_required * fuel_price_per_litre
    driver_cost = specs["driver_wage"]
    maintenance_cost = specs["maintenance_per_km"] * distance_km

    # Cold chain surcharge
    cold_chain_cost = 0
    if cold_chain:
        cold_chain_cost = 0.75 * distance_km  # ₹0.75 per km

    total_cost = fuel_cost + driver_cost + maintenance_cost + toll + cold_chain_cost

    return {
        "truck_type": truck_type,
        "distance_km": distance_km,
        "fuel_cost": round(fuel_cost, 2),
        "driver_cost": round(driver_cost, 2),
        "maintenance_cost": round(maintenance_cost, 2),
        "toll_cost": round(toll, 2),
        "cold_chain_cost": round(cold_chain_cost, 2),
        "total_trip_cost": round(total_cost, 2)
}
