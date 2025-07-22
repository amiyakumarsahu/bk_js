import streamlit as st


def colors_temp():
    return {
    'primary_accent': '#FF6B35', # Vibrant Orange/Red
    'secondary_info': '#17A2B8', # Calming Blue/Teal
    'success_green': '#28A745',  # Distinct Green
    'warning_orange': '#FFC107', # Clear Yellow/Orange
    'critical_red': '#DC3545',   # Strong Red
    'light_bg': '#F0F2F6',       # Soft Light Gray
    'white_bg': '#FFFFFF',       # Pure White for cards/components in light mode
    'dark_bg': '#262730',        # Dark Muted Gray
    'darker_bg': '#1E1E1E',      # Even darker for app background in dark mode
    'text_light': '#212529',     # Dark text for light mode
    'text_dark': '#F8F9FA',      # Light text for dark mode
    'border_light': '#E2E8F0',   # Light border for light mode
    'border_dark': '#475569',    # Darker border for dark mode
    'card_bg_light': '#F8F9FA',  # Card background in light mode
    'card_bg_dark': '#2D303A',   # Card background in dark mode
    'general_neutral_gray': '#64748B', # A neutral gray for general use or additional chart colors
    'status_critical_bg_light': '#ffebee', 'status_critical_text_light': '#c62828',
    'status_low_bg_light': '#fff3e0', 'status_low_text_light': '#ef6c00',
    'status_good_bg_light': '#e8f5e9', 'status_good_text_light': '#2e7d32',
    'status_excellent_bg_light': '#e0f2f1', 'status_excellent_text_light': '#00796b',
    'status_optimized_bg_light': '#e3f2fd', 'status_optimized_text_light': '#1565c0',
    'status_review_bg_light': '#fffde7', 'status_review_text_light': '#f9a825',
    'status_critical_bg_dark': '#4d1f1f', 'status_critical_text_dark': '#FFDADA', # Darker red background, light text
    'status_low_bg_dark': '#4d3f1f', 'status_low_text_dark': '#FFE0B2', # Darker orange background, light text
    'status_good_bg_dark': '#1f4d2f', 'status_good_text_dark': '#D4EDDA', # Darker green background, light text
    'status_excellent_bg_dark': '#1A4D4A', 'status_excellent_text_dark': '#B2DFDB', # Darker teal background, light text
    'status_optimized_bg_dark': '#1f334d', 'status_optimized_text_dark': '#BBDEFB', # Darker blue background, light text
    'status_review_bg_dark': '#4d4d1f', 'status_review_text_dark': '#FFF9C4', # Darker yellow background, light text
}

# Define the new, color-agnostic palette
COLORS = colors_temp()

# Custom CSS for styling with theme support using CSS variables
def get_theme_css():
    # Define CSS variables based on the current theme state
    if st.session_state.dark_mode:
        bg_color = COLORS['darker_bg']
        text_color = COLORS['text_dark']
        header_bg = COLORS['card_bg_dark']
        filter_bg = COLORS['card_bg_dark']
        metric_card_bg = COLORS['card_bg_dark']
        alert_critical_bg = '#4d1f1f' # Darker specific shade
        alert_warning_bg = '#4d3f1f'  # Darker specific shade
        alert_info_bg = '#1f3f4d'     # Darker specific shade
        tab_inactive_bg = COLORS['card_bg_dark']
        tab_inactive_text = COLORS['text_dark']
        plotly_font_color = COLORS['text_dark'] # Plotly font color in dark mode
        plotly_grid_color = COLORS['border_dark'] # Plotly grid color in dark mode
        plotly_plot_bg = COLORS['card_bg_dark'] # Plotly plot background in dark mode

        refresh_btn_text_color = COLORS['text_dark'] # Light text for refresh button in dark mode
        refresh_btn_bg_color = COLORS['dark_bg']     # Dark background for refresh button in dark mode
    else:
        bg_color = "#FFF3E0"
        text_color = COLORS['text_light']
        header_bg = COLORS['white_bg']
        filter_bg = COLORS['white_bg']
        metric_card_bg = COLORS['white_bg']
        alert_critical_bg = '#ffe6e6' # Lighter specific shade
        alert_warning_bg = '#fff3cd'  # Lighter specific shade
        alert_info_bg = '#d1ecf1'     # Lighter specific shade
        tab_inactive_bg = COLORS['white_bg']
        tab_inactive_text = COLORS['text_light']
        plotly_font_color = COLORS['text_light'] # Plotly font color in light mode
        plotly_grid_color = COLORS['border_light'] # Plotly grid color in light mode
        plotly_plot_bg = COLORS['white_bg'] # Plotly plot background in light mode

        refresh_btn_text_color = COLORS['text_light'] # Dark text for refresh button in light mode
        refresh_btn_bg_color = COLORS['light_bg']     # Light background for refresh button in light mode


    return f"""
        <style>
            /* Base theme variables */
            :root {{
                --primary-accent: {COLORS['primary_accent']};
                --secondary-info: {COLORS['secondary_info']};
                --success-green: {COLORS['success_green']};
                --warning-orange: {COLORS['warning_orange']};
                --critical-red: {COLORS['critical_red']};
                --bg-color: {bg_color};
                --text-color: {text_color};
                --header-bg: {header_bg};
                --filter-bg: {filter_bg};
                --metric-card-bg: {metric_card_bg};
                --alert-critical-bg: {alert_critical_bg};
                --alert-warning-bg: {alert_warning_bg};
                --alert-info-bg: {alert_info_bg};
                --tab-inactive-bg: {tab_inactive_bg};
                --tab-inactive-text: {tab_inactive_text};
                --table-header-bg: {COLORS['light_bg'] if not st.session_state.dark_mode else COLORS['dark_bg']};
                --table-row-hover-bg: {COLORS['light_bg'] if not st.session_state.dark_mode else COLORS['card_bg_dark']};
                --border-color: {COLORS['border_light'] if not st.session_state.dark_mode else COLORS['border_dark']};
                --refresh-btn-text-color: {refresh_btn_text_color};
                --refresh-btn-bg-color: {refresh_btn_bg_color};
                --plotly-font-color: {plotly_font_color};
                --plotly-grid-color: {plotly_grid_color};
                --plotly-plot-bg: {plotly_plot_bg};
            }}

            .stApp {{
                background-color: var(--bg-color);
                color: var(--text-color);
            }}
            .header-container, .filter-container, .metric-card, .main-content-container {{
                background-color: var(--header-bg);
                color: var(--text-color);
            }}
            
           .metric-card {{
                padding: 1rem;
                border-radius: 0.5rem;
                border-left: 4px solid var(--primary-accent);
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                width: 100%;
                overflow: visible;
            }}

            .delta-good {{ color: var(--success-green); }}
            .delta-bad {{ color: var(--critical-red); }}

            .alert-card {{
                padding: 1rem;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
                border-left-width: 4px;
            }}
            .alert-critical {{ background-color: var(--alert-critical-bg); border-color: var(--critical-red); color: var(--critical_red); }}
            .alert-warning {{ background-color: var(--alert-warning-bg); border-color: var(--warning_orange); color: var(--warning_orange); }}
            .alert-info {{ background-color: var(--alert-info_bg); border-color: var(--secondary_info); color: var(--secondary_info); }}
            .alert-success {{ background-color: #F0FDF4; border-color: #28A745; color: #155E2B; }}
            
            .stTabs [data-baseweb="tab-list"] {{
                gap: 2px;
                width: 100%;
                justify-content: space-around; 
            }}
            .stTabs [data-baseweb="tab"] {{
                flex-grow: 1; 
                text-align: center; 
                background-color: var(--tab-inactive-bg);
                border-radius: 0.5rem 0.5rem 0px 0px;
                padding: 10px 20px;
                color: var(--tab-inactive-text);
                margin-right: 4px; 
                transition: background-color 0.3s, color 0.3s;
            }}
            .stTabs [aria-selected="true"] {{
                background-color: var(--primary-accent);
                color: white;
            }}
            .stSelectbox > div > div {{
                background-color: var(--filter-bg);
                border: 1px solid var(--border-color);
                border-radius: 0.5rem;
                color: var(--text-color);
            }}
            .stButton > button {{
                background-color: var(--primary-accent);
                color: white;
                border-radius: 0.5rem;
                padding: 0.6rem 1rem;
                font-weight: 600;
                transition: background-color 0.3s;
            }}
            .stButton > button:hover {{
                background-color: #E65A2C; 
            }}
            .stButton > button[kind="secondary"] {{
                background-color: var(--tab-inactive-bg);
                color: var(--text-color);
                border: 1px solid var(--border-color);
            }}
            .stButton > button[kind="secondary"]:hover {{
                background-color: var(--table-row-hover-bg);
            }}

            /* Specific styling for Refresh button */
            .stButton[data-testid="stButton-refresh_btn"] > button {{
                background-color: var(--refresh-btn-bg-color) !important;
                color: var(--refresh-btn-text-color) !important;
                border: 1px solid var(--border-color); /* Keep the border for consistency */
            }}
            .stButton[data-testid="stButton-refresh_btn"] > button:hover {{
                background-color: var(--table-row-hover-bg) !important; /* Use table row hover bg for a subtle change */
            }}

            .stSlider > div > div {{
                background-color: var(--filter-bg);
                border-radius: 0.5rem;
            }}
            .stSlider .st-bd {{ 
                background-color: var(--border-color);
            }}
            .stSlider .st-bg {{ 
                background-color: var(--primary-accent);
            }}

            .stDataFrame {{
                border-radius: 0.5rem;
                overflow: hidden; 
            }}
            .dataframe-container table {{
                width: 100%;
                border-collapse: collapse;
                border-radius: 0.5rem;
                overflow: hidden;
            }}
            .dataframe-container th {{
                background-color: var(--table-header-bg);
                color: var(--text-color);
                padding: 12px 24px;
                text-align: left;
                font-size: 0.75rem; 
                text-transform: uppercase;
            }}
            .dataframe-container td {{
                /* Removed background-color here as it's now controlled by style_status_row */
                color: var(--text-color); /* Default text color, overridden by inline for status cells */
                padding: 12px 24px;
                border-bottom: 1px solid var(--border-color);
            }}
            .dataframe-container tr:hover td {{
                background-color: var(--table-row-hover-bg);
            }}
            
            /* Ensure Plotly chart backgrounds adapt */
            .js-plotly-plot {{
                background-color: var(--plotly-plot-bg); 
                border-radius: 0.5rem;
            }}
            .js-plotly-plot .plotly .modebar {{
                background-color: var(--plotly-plot-bg);
                color: var(--plotly-font-color);
            }}
            .js-plotly-plot .plotly .cursor-pointer {{
                fill: var(--plotly-font-color);
                stroke: var(--plotly-font-color);
            }}

            /* More specific Plotly text elements with !important for stronger override */
            .js-plotly-plot .g-gtitle,
            .js-plotly-plot .annotation-text,
            .js-plotly-plot .sankey-node-label,
            .js-plotly-plot .sankey-link-label,
            .js-plotly-plot .contour-label,
            .js-plotly-plot .textpoint,
            .js-plotly-plot .arena-text,
            .js-plotly-plot .gtext text,
            .js-plotly-plot .gdata text,
            .js-plotly-plot .g-xaxis-title,
            .js-plotly-plot .g-yaxis-title,
            .js-plotly-plot .xtick text,
            .js-plotly-plot .ytick text,
            .js-plotly-plot .legendtext {{
                fill: var(--plotly-font-color) !important;
                color: var(--plotly-font-color) !important; 
            }}
            .js-plotly-plot .plot .xtick, .js-plotly-plot .plot .ytick {{
                stroke: var(--plotly-font-color) !important; 
            }}
            .js-plotly-plot .gridline {{
                stroke: var(--plotly-grid-color) !important; 
            }} 
        </style>
    """


# Helper function to style inventory/route status dynamically
def style_status_row(row, dark_mode_active):
    status_map = {
        'critical': ('status_critical_bg', 'status_critical_text'),
        'low': ('status_low_bg', 'status_low_text'),
        'good': ('status_good_bg', 'status_good_text'),
        'excellent': ('status_excellent_bg', 'status_excellent_text'),
        'optimized': ('status_optimized_bg', 'status_optimized_text'),
        'review': ('status_review_bg', 'status_review_text')
    }
    
    status = row['Status']
    if status in status_map:
        bg_key_base, text_key_base = status_map[status]
        
        bg_key = f"{bg_key_base}_dark" if dark_mode_active else f"{bg_key_base}_light"
        text_key = f"{text_key_base}_dark" if dark_mode_active else f"{bg_key_base}_light"
        
        bg_color = COLORS[bg_key]
        text_color = COLORS[text_key]
        
        return [f'background-color: {bg_color} !important; color: {text_color} !important'] * len(row)
    return [''] * len(row)

def style_priority(row):
    # Simple color mapping for priority column only
    colors = {'high': 'background-color: #dc3545; color: white; font-weight: bold;',
              'medium': 'background-color: #ffc107; color: black; font-weight: bold;',
              'low': 'background-color: #28a745; color: white; font-weight: bold;'}
    return [colors.get(str(row['priority']).lower(), '') if col == 'priority' else '' for col in row.index]

def kpi_card_with_tooltip(title, value, tooltip_text, value_suffix="", bg_color="#fff"):
    return f"""
    <div class="kpi-card" style="background: {bg_color};">
        <div class="kpi-header">
            {title}
            <div class="tooltip">
                <img src="https://img.icons8.com/ios-glyphs/14/000000/info.png"/>
                <span class="tooltiptext">{tooltip_text}</span>
            </div>
        </div>
        <div class="kpi-value">
            {value}{value_suffix}
        </div>
    </div>
     """

def create_kpi_html(label, value, delta, caption, delta_is_bad=False, is_currency=False, delta_unit='%'):
    delta_class = "delta-good" if (delta > 0 and not delta_is_bad) or (delta < 0 and delta_is_bad) else "delta-bad"
    delta_sign = "+" if delta > 0 else ""
    value_display = f"${{value:.1f}}K" if is_currency else f"{{value:.1f}}%"
    delta_display = f"{delta_sign}{abs(delta):.1f}{delta_unit}" if not is_currency else f"{delta_sign}${{abs(delta):.1f}}K"
    return f"""
    <div class="metric-card">
        <p class="text-sm text-slate-500 font-medium">{label}</p>
        <div class="flex items-baseline gap-2 mt-1">
            <p class="text-2xl font-bold text-slate-800">{value_display}</p>
            <p class="text-sm font-semibold {delta_class}">{delta_display}</p>
        </div>
        <p class="text-xs text-slate-400 mt-1">{caption}</p>
    </div>
    """

def create_simple_metric_html(label, value, delta_str, value_prefix="", value_suffix="", delta_prefix="", delta_suffix=""):
    try:
        delta_val = float(delta_str.replace('%', '').replace('$', '').replace('+', ''))
        delta_class = "delta-good" if delta_val >= 0 else "delta-bad"
        delta_sign = "+" if delta_val >= 0 else ""
        formatted_delta = f"{delta_sign}{delta_prefix}{abs(delta_val):.1f}{delta_suffix}"
    except ValueError:
        delta_class = ""
        formatted_delta = delta_str
    return f"""
    <div class="metric-card">
        <p class="text-sm font-medium text-slate-600">{label}</p>
        <div class="flex items-baseline gap-2 mt-1">
            <p class="text-xl font-bold text-slate-800">{value_prefix}{value}{value_suffix}</p>
            <p class="text-sm font-semibold {delta_class}">{formatted_delta}</p>
        </div>
    </div>
    """

def select_html(label, value, bg_color="#277CD1", font_color="white"):
    return f"""
        <div style="
            background-color:{bg_color};
            color:{font_color};
            padding:2px;
            border-radius:10px;
            text-align:center;
            height:50px;
            width:100%;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            margin-bottom:4px;
        ">
            <div style="font-size:15px; margin-bottom:2px;">{label}: {value}</div>
        </div>
    """

def small_colored_kpi_html(label, value, bg_color="#277CD1", font_color="white"):
    return f"""
        <div style="
            background-color:{bg_color};
            color:{font_color};
            padding:10px;
            border-radius:10px;
            text-align:center;
            height:100px;
            width:100%;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            margin-bottom:10px;
        ">
            <div style="font-size:14px; margin-bottom:4px;">{label}</div>
            <div style="font-size:20px; font-weight:bold;">{value}</div>
        </div>
    """

