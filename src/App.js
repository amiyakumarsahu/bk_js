import React, { useState } from 'react';
import './App.css';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import Tab5 from './pages/Tab5';

function App() {
  // State for filters
  const [city, setCity] = useState('Bangalore');
  const [outlet, setOutlet] = useState('');
  const [product, setProduct] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  // Placeholder options (replace with data loading logic)
  const outletOptions = ['Outlet 1', 'Outlet 2', 'Outlet 3'];
  const productOptions = ['Product 1', 'Product 2', 'Product 3'];
  const tabNames = [
    '📊 Supply Planning & Raw Material Management',
    '🛒 Smart Repurchase Tool',
    '🚛 Route Planning & Delivery Optimization',
    '🚛 Fleet Capacity Optimizer',
    '🤖 AI Assistant',
  ];

  return (
    <div className="App">
      {/* Header Bar */}
      <div className="header-bar">
        <div className="header-left">🍔 BK Analytics</div>
        <div className="header-center">AI Driven Intelligence Supply Chain Tool</div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-item">
          <span role="img" aria-label="calendar">📅</span> Today: <strong>Weekend</strong>
        </div>
        <div className="filter-item">
          <label>City</label>
          <select value={city} onChange={e => setCity(e.target.value)}>
            <option value="Bangalore">Bangalore</option>
          </select>
        </div>
        <div className="filter-item">
          <label>Outlet</label>
          <select value={outlet} onChange={e => setOutlet(e.target.value)}>
            {outletOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="filter-item">
          <label>Food Ingredients</label>
          <select value={product} onChange={e => setProduct(e.target.value)}>
            {productOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabNames.map((tab, idx) => (
          <button
            key={tab}
            className={activeTab === idx ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(idx)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content Placeholder */}
      <div className="tab-content">
        {activeTab === 0 && <Tab1 />}
        {activeTab === 1 && <Tab2 />}
        {activeTab === 2 && <Tab3 />}
        {activeTab === 3 && <Tab4 />}
        {activeTab === 4 && <Tab5 />}
      </div>
    </div>
  );
}

export default App;
