import React from 'react';
import './KpiCard.css';

function KpiCard({ title, value, tooltip, bgColor }) {
  return (
    <div className="kpi-card" style={{ backgroundColor: bgColor || '#fff' }}>
      <div className="kpi-title">{title}</div>
      <div className="kpi-value">{value}</div>
      {tooltip && <div className="kpi-tooltip">{tooltip}</div>}
    </div>
  );
}

export default KpiCard; 