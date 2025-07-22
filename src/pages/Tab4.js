import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import KpiCard from '../components/KpiCard';
import * as XLSX from 'xlsx';

function Tab4() {
  // Data state
  const [routeDemandData, setRouteDemandData] = useState([]);
  const [truckData, setTruckData] = useState([]);
  const [truckCombData, setTruckCombData] = useState([]);

  useEffect(() => {
    // Load route_outlet_demand.xlsx
    fetch(process.env.PUBLIC_URL + '/data/route_outlet_demand.xlsx')
      .then(res => res.arrayBuffer())
      .then(buffer => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        setRouteDemandData(json);
      });
    // Load truck_data.xlsx
    fetch(process.env.PUBLIC_URL + '/data/truck_data.xlsx')
      .then(res => res.arrayBuffer())
      .then(buffer => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        setTruckData(json);
      });
    // Load truck_combinations.xlsx
    fetch(process.env.PUBLIC_URL + '/data/truck_combinations.xlsx')
      .then(res => res.arrayBuffer())
      .then(buffer => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        setTruckCombData(json);
      });
  }, []);

  // Example: aggregate KPIs from real data (replace with your logic)
  const totalFleetSize = truckData.length;
  const avgLoadFactor = truckCombData.length ? (truckCombData.reduce((sum, row) => sum + (parseFloat(row['Load Factor(%)']) || 0), 0) / truckCombData.length).toFixed(2) + '%' : 'N/A';
  const avgDeliveryCost = truckCombData.length ? ('Rs ' + (truckCombData.reduce((sum, row) => sum + (parseFloat(row['Estimated Cost (₹)']) || 0), 0) / truckCombData.length).toFixed(0)) : 'N/A';
  // ...add more as needed

  const kpis = [
    { title: '🚚 Total Fleet Size', value: totalFleetSize, tooltip: '', bgColor: '#f6fcfa' },
    { title: '📦 Avg Load Factor', value: avgLoadFactor, tooltip: '', bgColor: '#f6fcfa' },
    { title: '💸 Avg Delivery Cost', value: avgDeliveryCost, tooltip: '', bgColor: '#f6fcfa' },
    // ...add more KPIs as needed
  ];

  // Example: demand trend by day (replace with your logic)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const demandTrend = days.map(day => routeDemandData.filter(row => row.Day === day).reduce((sum, row) => sum + (row['Total Demand'] || 0), 0));

  // Example: demand by route (replace with your logic)
  const routes = Array.from(new Set(routeDemandData.map(row => row.Route).filter(Boolean)));
  const routeDemand = routes.map(route => routeDemandData.filter(row => row.Route === route).reduce((sum, row) => sum + (row['Total Demand'] || 0), 0));

  // Example: outlet table (replace with your logic)
  const outletTable = routeDemandData.slice(0, 10).map(row => ({
    outlet: row.outlet,
    Chill: row.Chill,
    Dry: row.Dry,
    Frozen: row.Frozen,
    total: row['Total Demand'],
  }));

  // Example: fleet allocation table (replace with your logic)
  const fleetTable = truckCombData.slice(0, 10).map(row => ({
    combo: row['Fleet Combination'],
    small: row['Small Truck'],
    medium: row['Medium Truck'],
    large: row['Large Truck'],
    load: row['Load Factor(%)'],
    cost: row['Estimated Cost (₹)'],
    recommended: row['Recommended'],
  }));

  // Example: historical performance table (mocked, replace with real logic if available)
  const histTable = [
    { route: 'Route1', stops: 3, distance: 27, time: 5.4, fuel: 215, efficiency: '24.1%', status: 'Optimized' },
    { route: 'Route2', stops: 4, distance: 54, time: 4.7, fuel: 432, efficiency: '9.2%', status: 'Optimized' },
  ];

  return (
    <div>
      <h2>🚛 Fleet Capacity Optimizer</h2>
      {/* KPIs Row */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', justifyContent: 'center' }}>
        {kpis.map((kpi, idx) => (
          <KpiCard key={idx} {...kpi} style={{ width: 220 }} />
        ))}
      </div>
      {/* Demand Trend and Category Breakdown */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: 32 }}>
        <div style={{ flex: 1 }}>
          <h4>📈 Demand Forecast Trend</h4>
          <Plot
            data={[
              {
                x: days,
                y: demandTrend,
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Total Demand',
                line: { color: '#00b894', width: 4 },
                marker: { size: 10, color: '#00b894', line: { width: 2, color: 'white' } },
              },
            ]}
            layout={{
              xaxis: { title: 'Day' },
              yaxis: { title: 'Total Demand (boxes)' },
              height: 320,
              margin: { l: 40, r: 20, t: 40, b: 40 },
              legend: { orientation: 'h', y: 1.1, x: 0.5, xanchor: 'center' },
            }}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        {/* Category breakdown can be added here if available in your data */}
      </div>
      {/* Demand by Route Bar Chart */}
      <div style={{ background: '#fff', borderRadius: 18, border: '3px solid #6c5ce7', boxShadow: '0 8px 15px rgba(0,0,0,0.1)', padding: 24, marginBottom: 32 }}>
        <h4>📍 Demand Planning by Route</h4>
        <Plot
          data={[
            {
              x: routes,
              y: routeDemand,
              type: 'bar',
              name: 'Total Demand',
              marker: { color: '#55efc4' },
            },
          ]}
          layout={{
            xaxis: { title: 'Route' },
            yaxis: { title: 'Boxes' },
            height: 320,
            margin: { l: 40, r: 40, t: 20, b: 80 },
            legend: { orientation: 'h', y: 1.1, x: 0.5, xanchor: 'center' },
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      {/* Demand by Outlet Table */}
      <div style={{ background: '#fff', borderRadius: 18, border: '3px solid #6c5ce7', boxShadow: '0 8px 15px rgba(0,0,0,0.1)', padding: 24, marginBottom: 32 }}>
        <h4>📍 Demand Planning per Outlet</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Outlet</th>
              <th>Chill</th>
              <th>Dry</th>
              <th>Frozen</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {outletTable.map((row, idx) => (
              <tr key={idx}>
                <td>{row.outlet}</td>
                <td style={{ color: '#55efc4', fontWeight: 600 }}>{row.Chill}</td>
                <td style={{ color: '#ffeaa7', fontWeight: 600 }}>{row.Dry}</td>
                <td style={{ color: '#74b9ff', fontWeight: 600 }}>{row.Frozen}</td>
                <td>{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Fleet Allocation Table */}
      <div style={{ background: '#fff', borderRadius: 18, border: '3px solid #00cec9', boxShadow: '0 8px 15px rgba(0,0,0,0.1)', padding: 24, marginBottom: 32 }}>
        <h4>🚚 Fleet Allocation Plan</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Fleet Combination</th>
              <th>Small Truck</th>
              <th>Medium Truck</th>
              <th>Large Truck</th>
              <th>Load Factor(%)</th>
              <th>Estimated Cost (₹)</th>
              <th>Recommended</th>
            </tr>
          </thead>
          <tbody>
            {fleetTable.map((row, idx) => (
              <tr key={idx}>
                <td>{row.combo}</td>
                <td>{row.small}</td>
                <td>{row.medium}</td>
                <td>{row.large}</td>
                <td>{row.load}</td>
                <td>{row.cost}</td>
                <td>{row.recommended}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Historical Performance Table (mocked) */}
      <div style={{ background: '#fff', borderRadius: 18, border: '3px solid #fdcb6e', boxShadow: '0 8px 15px rgba(0,0,0,0.1)', padding: 24, marginBottom: 32 }}>
        <h4>📊 Historical Route Performance</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Route</th>
              <th>Stops</th>
              <th>Distance (km)</th>
              <th>Time (hr)</th>
              <th>Fuel Cost (RM)</th>
              <th>Efficiency (%)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {histTable.map((row, idx) => (
              <tr key={idx}>
                <td>{row.route}</td>
                <td>{row.stops}</td>
                <td>{row.distance}</td>
                <td>{row.time}</td>
                <td>{row.fuel}</td>
                <td>{row.efficiency}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tab4; 