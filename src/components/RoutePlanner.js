import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
    setRoute([startLocation, ...deliveryLocations]);
    setOptimized(true);
  };

  // Map name to lat/lng
  const nameToLatLng = name => {
    const loc = locations.find(l => l.name === name);
    return loc ? [loc.lat, loc.lng] : null;
  };

  // Polyline points
  const routeLatLngs = route.map(nameToLatLng).filter(Boolean);

  // Center map on first point or default
  const mapCenter = routeLatLngs[0] || [20.5937, 78.9629]; // India center

  return (
    <div style={{ background: '#fff', borderRadius: 18, border: '5px solid #FF6B35', boxShadow: '0 12px 28px rgba(0,0,0,0.18)', padding: 24, marginBottom: 32 }}>
      <h3>Route Planner</h3>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: 24 }}>
        <div>
          <label style={{ fontWeight: 600 }}>Start Location</label><br />
          <select value={startLocation} onChange={e => setStartLocation(e.target.value)}>
            {locations.map(loc => (
              <option key={loc.name} value={loc.name}>{loc.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ fontWeight: 600 }}>Delivery Points (select up to 4)</label><br />
          <select
            multiple
            value={deliveryLocations}
            onChange={e => {
              const options = Array.from(e.target.selectedOptions, o => o.value);
              setDeliveryLocations(options.slice(0, 4));
            }}
            style={{ minWidth: 160, minHeight: 80 }}
          >
            {locations.filter(loc => loc.name !== startLocation).map(loc => (
              <option key={loc.name} value={loc.name}>{loc.name}</option>
            ))}
          </select>
        </div>
        <div style={{ alignSelf: 'end' }}>
          <button
            style={{ background: '#FF6B35', color: '#fff', fontWeight: 600, border: 'none', borderRadius: 8, padding: '10px 24px', cursor: 'pointer' }}
            onClick={handleOptimize}
            disabled={deliveryLocations.length < 1}
          >
            🚀 Optimize Route
          </button>
        </div>
      </div>
      {optimized && routeLatLngs.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h4>Optimized Route</h4>
          <div style={{ fontWeight: 600, fontSize: 18, color: '#3498db' }}>{route.join(' → ')}</div>
          <div style={{ display: 'flex', gap: '2rem', marginTop: 24 }}>
            <div style={{ flex: 2, background: '#f4f8fb', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Map Preview</div>
              <MapContainer center={mapCenter} zoom={12} style={{ height: 320, width: '100%', borderRadius: 10 }} scrollWheelZoom={true}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {routeLatLngs.map((pos, idx) => (
                  <Marker position={pos} key={idx}>
                    <Popup>{route[idx]}</Popup>
                  </Marker>
                ))}
                {routeLatLngs.length > 1 && (
                  <Polyline positions={routeLatLngs} color="#FF6B35" weight={5} />
                )}
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoutePlanner; 