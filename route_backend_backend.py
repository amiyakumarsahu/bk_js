import sys
import pandas as pd
import os
import numpy as np
import subprocess
import json
from dotenv import load_dotenv
from routing import plot_routes_from_names, calculate_random_route, get_distance_and_duration_matrices, calculate_trip_cost

def run_ortools_backend(input_payload: dict):
    process = subprocess.Popen(
        ["venv_ortools/Scripts/python", "optimizer.py"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    input_json = json.dumps(input_payload)
    stdout, stderr = process.communicate(input=input_json)

    if process.returncode != 0:
        raise RuntimeError(f"Error: {stderr}")

    return json.loads(stdout)

# Example backend function for route optimization
def optimize_route(location_names, df, api_key):
    dist_matrix, dur_matrix = get_distance_and_duration_matrices(location_names, df, api_key)
    if isinstance(dist_matrix, np.ndarray):
        dist_matrix = dist_matrix.tolist()
    if isinstance(dur_matrix, np.ndarray):
        dur_matrix = dur_matrix.tolist()
    payload = {
        "distance_matrix": dist_matrix,
        "time_matrix": dur_matrix,
        "location_names": location_names,
        "start_index": location_names.index(location_names[0]),
    }
    # result = run_ortools_backend(payload)
    result=json.loads(subprocess.run(
    ["venv_ortools\\Scripts\\python.exe", "optimizer.py"],
    input=json.dumps(payload).encode(),
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,).stdout.decode("utf-8", errors="ignore"))
    route = result["route"]
    cost = calculate_trip_cost(result["total_distance_km"])
    return route, cost

# Example backend function for non-optimized route
def get_non_optimized_route(location_names, dist_matrix, dur_matrix):
    non_opt_result = calculate_random_route(
        location_names,
        dist_matrix,
        dur_matrix,
        location_names.index(location_names[0]),
    )
    worst_cost = calculate_trip_cost(non_opt_result["total_distance_km"])
    return non_opt_result["route"], worst_cost

# Backend function to generate a map HTML for a given route (like in sheet3.py)
def get_route_map_html(route, df, api_key):
    """
    Returns the HTML representation of the route map using plot_routes_from_names.
    """
    map_obj = plot_routes_from_names(route, df, api_key)
    return map_obj._repr_html_()


if __name__ == "__main__":
    try:
        load_dotenv()
        # Read JSON input from stdin (from Flask server)
        input_data = json.load(sys.stdin)
        route = input_data.get('route', [])
        # You can use start_location if needed, or just use route[0] as start
        df = pd.read_excel('data/locations.xlsx')
        # api_key = os.getenv('API_KEY')
        # # Call optimize_route with the route as location_names
        # optimized_route, cost = optimize_route(route, df, api_key)
        # # Optionally, return the map HTML
        # html = get_route_map_html(optimized_route, df, api_key)
        # print(html)
                # Return a dummy map HTML if any error occurs
        dummy_html = '''
        <div style="width:100%;height:320px;display:flex;align-items:center;justify-content:center;background:#eee;border-radius:10px;">
            <span style="color:#888;font-size:1.2rem;">Dummy Map Preview (Backend Error)</span>
        </div>
        '''
        print(dummy_html)
    except Exception as e:
        # Return a dummy map HTML if any error occurs
        dummy_html = '''
        <div style="width:100%;height:320px;display:flex;align-items:center;justify-content:center;background:#eee;border-radius:10px;">
            <span style="color:#888;font-size:1.2rem;">Dummy Map Preview (Backend Error)</span>
        </div>
        '''
        print(dummy_html)