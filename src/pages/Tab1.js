import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import KpiCard from '../components/KpiCard';
import Papa from 'papaparse';

function Tab1() {
  // Data state
  const [dashboardData, setDashboardData] = useState([]);
  const [shelfLifeData, setShelfLifeData] = useState([]);
  // Example filter state (expand as needed)
  const [areaFilter, setAreaFilter] = useState('All');
  const [productFilter, setProductFilter] = useState('All');
  // Scenario planner state
  const [campaignType, setCampaignType] = useState('Buy 1 Get 1');
  const [impactPct, setImpactPct] = useState(35);
  const [avgShelfLife, setAvgShelfLife] = useState(5);
  const [safetyStockPct, setSafetyStockPct] = useState(20);

  // Load CSV data on mount
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data/final_dashboard_3.csv')
      .then(res => res.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          complete: results => setDashboardData(results.data),
        });
      });
    fetch(process.env.PUBLIC_URL + '/data/food_ingredient_batches_shelf_life.csv')
      .then(res => res.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          complete: results => setShelfLifeData(results.data),
        });
      });
  }, []);

  // Example: get unique areas/products for filters
  const areaOptions = ['All', ...Array.from(new Set(dashboardData.map(row => row.area).filter(Boolean)))];
  const productOptions = ['All', ...Array.from(new Set(dashboardData.map(row => row.raw_material_name).filter(Boolean)))];

  // Filtered data
  const filteredData = dashboardData.filter(row =>
    (areaFilter === 'All' || row.area === areaFilter) &&
    (productFilter === 'All' || row.raw_material_name === productFilter)
  );

  // KPIs (replace with real aggregation logic)
  const kpis = [
    {
      title: 'Current Inventory',
      value: filteredData.reduce((sum, row) => sum + (row.current_inventory || 0), 0),
      tooltip: 'Stock available at the outlet as of today',
      bgColor: '#F6ECFF',
    },
    {
      title: 'Daily Sales Velocity',
      value: filteredData.reduce((sum, row) => sum + (row.daily_sales_velocity || 0), 0),
      tooltip: 'Average daily sales based on the past 7 days.',
      bgColor: '#E3F2FD',
    },
    {
      title: 'Safety Stock',
      value: filteredData.reduce((sum, row) => sum + (row.safety_stock || 0), 0),
      tooltip: 'Extra stock kept to avoid running out when sales are higher or delivery is delayed.',
      bgColor: '#E8F5E9',
    },
    {
      title: 'Avg Shelf Life (Days)',
      value: Math.round(filteredData.reduce((sum, row) => sum + (row.avg_shelf_life_days || 0), 0) / (filteredData.length || 1)),
      tooltip: 'Average number of days an ingredient stays usable before expiring.',
      bgColor: '#FFEBEE',
    },
  ];

  // Example chart data (now using correct CSV columns)
  const dates = filteredData.map(row => row.date);
  const forecast = filteredData.map(row => row.forecast);
  const actual = filteredData.map(row => row.current_inventory);
  const spoilage = filteredData.map(row => row.spoilage);
  console.log({ dates, forecast, actual, spoilage, filteredData });

  return (
    <div>
      <h2>📊 Supply Planning & Raw Material Management</h2>
      {/* Filters */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
        <div>
          <label>Outlet</label><br />
          <select value={areaFilter} onChange={e => setAreaFilter(e.target.value)}>
            {areaOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label>Food Ingredient</label><br />
          <select value={productFilter} onChange={e => setProductFilter(e.target.value)}>
            {productOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>
      {/* Scenario Planner Controls */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <label style={{ fontWeight: 600 }}>Campaign Type</label><br />
          <select value={campaignType} onChange={e => setCampaignType(e.target.value)}>
            <option>Buy 1 Get 1</option>
            <option>Weekend Combo</option>
            <option>Rainy Day Offer</option>
            <option>None</option>
          </select>
        </div>
        <div>
          <label style={{ fontWeight: 600 }}>Promotional Impact (%)</label><br />
          <input type="range" min={0} max={100} value={impactPct} onChange={e => setImpactPct(Number(e.target.value))} />
          <span style={{ marginLeft: 8 }}>{impactPct}%</span>
        </div>
        <div>
          <label style={{ fontWeight: 600 }}>Average Shelf Life (days)</label><br />
          <input type="range" min={1} max={15} value={avgShelfLife} onChange={e => setAvgShelfLife(Number(e.target.value))} />
          <span style={{ marginLeft: 8 }}>{avgShelfLife}</span>
        </div>
        <div>
          <label style={{ fontWeight: 600 }}>Safety Stock (%)</label><br />
          <input type="range" min={0} max={100} value={safetyStockPct} onChange={e => setSafetyStockPct(Number(e.target.value))} />
          <span style={{ marginLeft: 8 }}>{safetyStockPct}%</span>
        </div>
      </div>
      {/* KPIs */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', justifyContent: 'center' }}>
        {kpis.map((kpi, idx) => (
          <KpiCard key={idx} {...kpi} style={{ width: 220 }} />
        ))}
      </div>

      {/* Demand Forecast vs Actual Performance (with Spoilage) Chart */}
      <div style={{ background: '#fff', borderRadius: 18, border: '5px solid #FF6B35', boxShadow: '0 12px 28px rgba(0,0,0,0.18)', padding: 24, marginBottom: 32 }}>
        <h3>Demand Forecast vs Actual Performance (with Spoilage)</h3>
        <Plot
          data={[
            {
              x: dates,
              y: forecast,
              type: 'scatter',
              mode: 'lines+markers',
              name: 'Forecast',
              line: { color: '#17A2B8', width: 3 },
              marker: { symbol: 'circle-open', size: 8, color: '#17A2B8' },
            },
            {
              x: dates,
              y: actual,
              type: 'scatter',
              mode: 'lines+markers',
              name: 'Actual',
              line: { color: '#28A745', width: 3 },
              marker: { symbol: 'circle-open', size: 8, color: '#28A745' },
            },
            {
              x: dates,
              y: spoilage,
              type: 'scatter',
              mode: 'lines+markers',
              name: 'Spoilage',
              line: { color: '#DC3545', width: 2, dash: 'dot' },
              marker: { symbol: 'circle-open', size: 8, color: '#DC3545' },
            },
          ]}
          layout={{
            height: 400,
            xaxis: { title: 'Date' },
            yaxis: { title: 'Units' },
            hovermode: 'closest',
            template: 'plotly_white',
            margin: { l: 20, r: 20, t: 40, b: 20 },
            legend: { orientation: 'h', y: 1.1, x: 0.5, xanchor: 'center' },
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Inventory/Procurement Bar Chart and Spoilage Pie Chart */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: 32 }}>
        <div style={{ flex: 2, background: '#fff', borderRadius: 18, border: '5px solid #FF6B35', boxShadow: '0 12px 28px rgba(0,0,0,0.18)', padding: 24 }}>
          <h4 style={{ marginBottom: '0.5rem' }}>Daily Stock Gaps and Procurement Needs</h4>
          <Plot
            data={[
              {
                x: dates,
                y: [1000, 1100, 1050, 1200, 1150, 1250, 1300, 1280, 1220, 1190],
                type: 'bar',
                name: 'Total Required',
                marker: { color: '#ADD8E6' },
              },
              {
                x: dates,
                y: [900, 950, 970, 1000, 980, 1020, 1040, 1000, 980, 950],
                type: 'bar',
                name: 'Current Inventory',
                marker: { color: '#3b8edb' },
              },
              {
                x: dates,
                y: [100, 150, 80, 200, 170, 230, 260, 280, 240, 190],
                type: 'bar',
                name: 'Procurement Recommendation',
                marker: { color: '#0D47A1' },
              },
            ]}
            layout={{
              barmode: 'group',
              yaxis: { title: 'Quantity' },
              xaxis: { title: 'Date' },
              template: 'plotly_white',
              height: 320,
              margin: { l: 20, r: 10, t: 30, b: 10 },
              legend: { orientation: 'h', y: 1.1, x: 0.5, xanchor: 'center' },
            }}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: 18, border: '5px solid #FF6B35', boxShadow: '0 12px 28px rgba(0,0,0,0.18)', padding: 24 }}>
          <h4 style={{ marginBottom: '0.5rem' }}>Which Batches Risk Expiry?</h4>
          <Plot
            data={[
              {
                values: [30, 50, 20],
                labels: ['High', 'Medium', 'Low'],
                type: 'pie',
                marker: { colors: ['#dc3545', '#ffc107', '#28a745'] },
                hole: 0.3,
              },
            ]}
            layout={{
              height: 320,
              margin: { l: 10, r: 10, t: 30, b: 10 },
              legend: { orientation: 'h', y: -0.2, x: 0.5, xanchor: 'center' },
            }}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      {/* All main Tab 1 content is now scaffolded above. */}
    </div>
  );
}

export default Tab1; 