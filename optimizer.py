import json
import sys
import numpy as np
from ortools.constraint_solver import pywrapcp, routing_enums_pb2


def solve_open_tsp(distance_matrix, time_matrix, location_names, start_index=0):
    num_locations = len(distance_matrix)
    extended_size = num_locations + 1
    extended_distance = np.full((extended_size, extended_size), 1e9)
    extended_time = np.full((extended_size, extended_size), 1e9)

    extended_distance[:num_locations, :num_locations] = distance_matrix
    extended_time[:num_locations, :num_locations] = time_matrix

    for i in range(num_locations):
        extended_distance[i, -1] = 0
        extended_distance[-1, i] = 0
        extended_time[i, -1] = 0
        extended_time[-1, i] = 0

    manager = pywrapcp.RoutingIndexManager(extended_size, 1, [start_index], [extended_size - 1])
    routing = pywrapcp.RoutingModel(manager)

    def distance_callback(from_index, to_index):
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return int(extended_distance[from_node][to_node])

    def time_callback(from_index, to_index):
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return int(extended_time[from_node][to_node])

    distance_callback_index = routing.RegisterTransitCallback(distance_callback)
    time_callback_index = routing.RegisterTransitCallback(time_callback)

    routing.SetArcCostEvaluatorOfAllVehicles(distance_callback_index)

    routing.AddDimension(
        time_callback_index, 0,
        int(np.max(extended_time) * extended_size),
        True,
        "Time"
    )

    search_params = pywrapcp.DefaultRoutingSearchParameters()
    search_params.first_solution_strategy = routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
    search_params.local_search_metaheuristic = routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH
    search_params.time_limit.seconds = 30
    search_params.log_search = False

    solution = routing.SolveWithParameters(search_params)

    if solution:
        index = routing.Start(0)
        route = []
        total_distance = 0
        total_time = 0
        while not routing.IsEnd(index):
            node_index = manager.IndexToNode(index)
            route.append(location_names[node_index])
            next_index = solution.Value(routing.NextVar(index))
            next_node = manager.IndexToNode(next_index)
            total_distance += extended_distance[node_index][next_node]
            total_time += extended_time[node_index][next_node]
            index = next_index

        return {
            "route": route,
            "total_distance_km": float(total_distance / 1000),
            "total_time_minutes": float(total_time / 60)
        }
    else:
        return {"error": "No solution found"}


# === MAIN SCRIPT INTERFACE ===
if __name__ == "__main__":
    try:
        input_data = json.load(sys.stdin)

        distance_matrix = np.array(input_data["distance_matrix"])
        time_matrix = np.array(input_data["time_matrix"])
        location_names = input_data["location_names"]
        start_index = input_data.get("start_index", 0)

        result = solve_open_tsp(distance_matrix, time_matrix, location_names, start_index)
        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({"error": str(e)}))
