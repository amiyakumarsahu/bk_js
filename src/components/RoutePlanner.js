
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';


function RoutePlanner() {
  const [locations, setLocations] = useState([]); // [{ name, lat, lng }]
  const [startLocation, setStartLocation] = useState('');
  const [deliveryLocations, setDeliveryLocations] = useState([]);
  const [optimized, setOptimized] = useState(false);
  const [route, setRoute] = useState([]);

  // Load locations from CSV
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data/locations.csv')
      .then(res => res.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          complete: results => {
            const data = results.data.filter(row => row.Name && row.Latitude && row.Longitude);
            setLocations(data.map(row => ({
              name: row.Name,
              lat: parseFloat(row.Latitude),
              lng: parseFloat(row.Longitude)
            })));
            if (data.length > 0) setStartLocation(data[0].Name);
          }
        });
      });
  }, []);

  const handleOptimize = () => {
    const newRoute = [startLocation, ...deliveryLocations];
    setRoute(newRoute);
    setOptimized(true);
    // Always show the static HTML map file
  };
  return (
    <div style={{ background: '#fff', borderRadius: 18, border: '5px solid #FF6B35', boxShadow: '0 12px 28px rgba(0,0,0,0.18)', padding: 24, marginBottom: 32 }}>
      <h3>Route Planner</h3>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: 8, alignItems: 'end' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <label style={{ fontWeight: 700, color: '#333', marginBottom: 6, display: 'block' }}>Start Location</label>
          <Autocomplete
            options={locations.map(loc => loc.name)}
            value={startLocation}
            onChange={(event, newValue) => {
              if (newValue) setStartLocation(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Select start location"
                size="small"
                sx={{ background: '#f9f9f9', borderRadius: 1, marginBottom: 1 }}
              />
            )}
            sx={{ width: '100%', marginBottom: 1 }}
            disableClearable
          />
        </div>
        <div style={{ flex: 2, minWidth: 220 }}>
          <label style={{ fontWeight: 700, color: '#333', marginBottom: 6, display: 'block' }}>Delivery Points <span style={{ fontWeight: 400, color: '#888' }}>(select up to 4)</span></label>
          <Autocomplete
            multiple
            options={locations.filter(loc => loc.name !== startLocation).map(loc => loc.name)}
            value={deliveryLocations}
            onChange={(event, newValue) => {
              if (newValue.length <= 4) {
                setDeliveryLocations(newValue);
              }
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" color="primary" label={option} {...getTagProps({ index })} key={option} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder={deliveryLocations.length >= 4 ? "Max 4 selected" : "Select delivery points"}
                size="small"
                sx={{ background: '#f9f9f9', borderRadius: 1, marginBottom: 1 }}
              />
            )}
            sx={{ width: '100%', marginBottom: 1 }}
            disableCloseOnSelect
          />
          {deliveryLocations.length === 0 && (
            <div style={{ color: '#d32f2f', fontWeight: 500, marginTop: 4 }}>
              Please select at least 1 delivery point.
            </div>
          )}
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <button
          style={{ background: '#FF6B35', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', fontSize: 16, boxShadow: '0 2px 8px rgba(255,107,53,0.08)' }}
          onClick={handleOptimize}
          disabled={deliveryLocations.length < 1}
        >
          🚀 Optimize Route
        </button>
      </div>
      {optimized && (
        <div style={{ marginTop: 24 }}>
          <h4>Optimized Route</h4>
          <div style={{ fontWeight: 600, fontSize: 18, color: '#3498db' }}>{route.join(' → ')}</div>
          <div style={{ display: 'flex', gap: '2rem', marginTop: 24 }}>
            <div style={{ flex: 2, background: '#f4f8fb', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Map Preview</div>
              <iframe
                src={process.env.PUBLIC_URL + '/best_routes_map.html'}
                title="Best Routes Map"
                style={{ height: 320, width: '100%', borderRadius: 10, overflow: 'hidden', border: 'none' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoutePlanner; 