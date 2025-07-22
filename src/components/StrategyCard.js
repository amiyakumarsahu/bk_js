import React from 'react';

function StrategyCard({ name, costSavings, stockoutRisk, applied, onApply, style }) {
  const bgColor = applied ? '#e0f7fa' : '#f9f9f9';
  return (
    <div style={{
      width: '100%',
      position: 'relative',
      background: bgColor,
      padding: 20,
      borderRadius: 10,
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
      minHeight: 180,
      marginBottom: 16,
      ...style
    }}>
      {applied && (
        <div style={{
          position: 'absolute',
          top: 10,
          right: 15,
          color: 'green',
          fontWeight: 'bold',
        }}>
          Currently Applied
        </div>
      )}
      <h4 style={{ marginBottom: 5 }}>{name}</h4>
      <p style={{ marginTop: 0, fontSize: 13, color: '#666' }}>Replenishment strategy details</p>
      <p>Cost Savings: <span style={{ color: 'green', fontWeight: 'bold' }}>{costSavings}</span></p>
      <p>Stockout Risk: <span style={{ color: '#3498db', fontWeight: 'bold' }}>{stockoutRisk}</span></p>
      <button
        style={{
          marginTop: 10,
          background: applied ? '#3498db' : '#eee',
          color: applied ? '#fff' : '#333',
          border: 'none',
          borderRadius: 6,
          padding: '8px 18px',
          fontWeight: 600,
          cursor: applied ? 'default' : 'pointer',
        }}
        onClick={onApply}
        disabled={applied}
      >
        Apply {name}
      </button>
    </div>
  );
}

export default StrategyCard; 