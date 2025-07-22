import sys
import os
# # Get the parent folder of the current file (Integration/)
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# sys.path.append(BASE_DIR)
import streamlit as st
import pandas as pd
from style_sheet import small_colored_kpi_html,select_html
from streamlit_folium import st_folium
from routing import plot_routes_from_names, calculate_random_route,get_distance_and_duration_matrices,calculate_trip_cost
from dotenv import load_dotenv
import numpy as np
import subprocess
import json

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

@st.cache_data
def route_data():
    return pd.read_excel(r'data\locations.xlsx')

st.markdown("""
    <style>
        body {
            background-color: #f4f8fb;
        }

        .scroll-table {
            max-height: 200px;
            overflow-y: auto;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 10px;
            background-color: #ffffff;
        }

        .flex-container {
            display: flex;
            gap: 20px;
            margin-bottom: 1.2rem;
        }

        .flex-box {
            flex: 1;
            padding: 12px;
            background-color: #e6f2ff;
            border: 2px solid #3399ff;
            border-radius: 10px;
        }

        iframe {
            border-radius: 12px;
            border: 2px solid #3399ff;
            height: 400px !important;
        }

        .kpi-section {
            display: flex;
            gap: 20px;
            margin-top: 10px;
        }

        .kpi-card {
            flex: 1;
            padding: 1rem;
            border-radius: 1rem;
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(8px);
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            text-align: center;
        }
    </style>
""", unsafe_allow_html=True)

st.title("🍔 **Burger King Route Planner**")

df=route_data()

if not df.empty:
    # Location preview
    st.markdown("""
    <div style="background-color:#ffffff; padding:1px; border-radius:10px; border:1px solid #ddd; overflow-x:auto;">
        <h4>📍 Locations Preview</h4>
    </div>
    """, unsafe_allow_html=True)
    st.dataframe(df, use_container_width=True, height=200)

    all_names = df['Name'].tolist()

    # Selectors in a row
    st.markdown('<div class="flex-container">', unsafe_allow_html=True)
    col1, col2 = st.columns(2)

    # --- START LOCATION ---
    with col1:
        with st.container(border=True):
            st.markdown(select_html("🚦 Start Location", "Select One",), unsafe_allow_html=True)
            start_location = st.selectbox(" ", options=all_names, key="start_selector",label_visibility="collapsed")

    # --- DELIVERY POINTS ---
    with col2:
        location_names = []
        if start_location:
            with st.container(border=True):
                st.markdown(select_html("📍 Delivery Points", "Select 1–4"), unsafe_allow_html=True)
                st.markdown("""
                        <style>
                            /* Remove top margin between blocks */
                            .stMultiSelect {
                                margin-top: -15px !important;  /* You can tweak this */
                            }

                            /* Style the multiselect box (light theme) */
                            .stMultiSelect > div[data-baseweb="select"] {
                                font-size: 13px;
                                color: #1a1a1a;
                                background-color: #f4f9ff;
                                border-radius: 6px;
                            }

                            /* Style the selected tags */
                            .stMultiSelect span {
                                font-size: 10px !important;
                                color: #003366 !important;
                            }

                            /* Dropdown items */
                            div[data-baseweb="popover"] li {
                                font-size: 15px;
                                color: #333;
                                background-color: #fff;
                            }

                            /* Hover effect */
                            div[data-baseweb="popover"] li:hover {
                                background-color: #e6f0ff;
                            }
                        </style>
                    """, unsafe_allow_html=True)

                delivery_options = [loc for loc in all_names if loc != start_location]
                delivery_locations = st.multiselect(" ", options=delivery_options, key="delivery_selector",label_visibility="collapsed", max_selections=4)


    # Combine locations
    location_names = [start_location] + delivery_locations if start_location else []

    # Validate and show route
    if 2 <= len(location_names) <= 5:
        load_dotenv()
        api_key = os.getenv("GOOGLE_API_KEY")
        optimize_clicked = st.button("🚀 Optimize Route")

        if optimize_clicked and api_key:
            with st.spinner("⏳ Optimizing route..."):
                dist_matrix, dur_matrix = get_distance_and_duration_matrices(
                    location_names, df, api_key)
                
            

                if isinstance(dist_matrix, np.ndarray):
                    dist_matrix = dist_matrix.tolist()
                if isinstance(dur_matrix, np.ndarray):
                    dur_matrix = dur_matrix.tolist()


                # result = solve_open_tsp(
                #     dist_matrix,
                #     dur_matrix,
                #     location_names,
                #     location_names.index(start_location),
                # )
                # Call backend script using subprocess in ortools-env
                payload = {
                "distance_matrix": dist_matrix,
                "time_matrix": dur_matrix,
                "location_names": location_names,
                "start_index": location_names.index(start_location),}
                # Parse the output
                result=json.loads(subprocess.run(
                    ["venv_ortools\\Scripts\\python.exe", "utils\\optimizer.py"],
                    input=json.dumps(payload).encode(),
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,).stdout.decode("utf-8", errors="ignore"))

                route = result["route"]
                cost = calculate_trip_cost(result["total_distance_km"])

                non_opt_result = calculate_random_route(
                    location_names,
                    dist_matrix,
                    dur_matrix,
                    location_names.index(start_location),
                )
                worst_cost = calculate_trip_cost(non_opt_result["total_distance_km"])

                route_str = " → ".join(route)
                non_opt_route_str = " → ".join(non_opt_result["route"])

                # MAP
                map_obj = plot_routes_from_names(route, df, api_key)

                col1, col2 = st.columns(2)

                # Non-optimized KPIs
                with col1:
                    st.markdown("### ❌ Non-Optimized Route")
                    st.markdown("**Route:**")
                    st.text(non_opt_route_str)

                    kpi_col1, kpi_col2 = st.columns(2)
                    with kpi_col1:
                        st.markdown(
                            small_colored_kpi_html("📍 Distance (KM)", f"{worst_cost['distance_km']:.2f} km","#ffd9cc", "#661400"),
                            unsafe_allow_html=True
                        )
                    with kpi_col2:
                        st.markdown(
                            small_colored_kpi_html("⛽ Fuel Cost (₹)", f"₹{worst_cost['fuel_cost']:.2f}", "#ffd9cc", "#661400"),
                            unsafe_allow_html=True
                        )

                # Optimized KPIs
                with col2:
                    st.markdown("### ✅ Optimized Route")
                    st.markdown("**Route:**")
                    st.text(route_str)

                    kpi_col3, kpi_col4 = st.columns(2)
                    with kpi_col3:
                        st.markdown(
                            small_colored_kpi_html("📍 Distance (KM)", f"{cost['distance_km']:.2f} km", "#ccffcc", "#006600"),
                            unsafe_allow_html=True
                        )
                    with kpi_col4:
                        st.markdown(
                            small_colored_kpi_html("⛽ Fuel Cost (₹)", f"₹{cost['fuel_cost']:.2f}", "#ccffcc", "#006600"),
                            unsafe_allow_html=True
                        )


                st.components.v1.html(map_obj._repr_html_(), height=400)

    elif len(location_names) > 5:
        st.warning("⚠️ Please select **at most 4 ** delivery locations.")
    else:
        st.warning("⚠️ Please select **at least 1** delivery locations.")
