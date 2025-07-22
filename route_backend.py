import sys
import os
import subprocess
import json
import numpy as np
from routing import plot_routes_from_names, calculate_random_route, get_distance_and_duration_matrices, calculate_trip_cost
from dotenv import load_dotenv
import pandas as pd

def run_ortools_backend(input_payload: dict):
    process = subprocess.Popen(
        ["venv_ortools/Scripts/python", "utils/optimizer.py"],
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

def get_route_data():
    return pd.read_excel(r'data/locations.xlsx')

# Example backend function for route optimization
# This can be called from a frontend or API endpoint

def optimize_route(location_names, df, api_key):
    dist_matrix, dur_matrix = get_distance_and_duration_matrices(
        location_names, df, api_key)

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
    result = run_ortools_backend(payload)
    route = result["route"]
    cost = calculate_trip_cost(result["total_distance_km"])
    return {
        "route": route,
        "cost": cost,
        "raw_result": result
    }
