import React from 'react';

const statusColors = {
  Critical: { background: '#FF4D4D', color: '#fff' },
  Good: { background: '#1ac342', color: '#fff' },
  Low: { background: '#f7a923', color: '#222' },
};

function InventoryStatusTable({ data, onPlaceOrder }) {
  return (
    <div style={{ overflowX: 'auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 20 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Ingredient Name</th>
            <th>Purchase History</th>
            <th>Recommendations</th>
            <th>Current Status</th>
            <th>Timeline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>
                <div style={{ fontWeight: 700 }}>{row.ingredient}</div>
                <div style={{ fontSize: 13, color: '#888' }}>Shelf Life: {row.shelfLife} days</div>
                <div style={{ fontSize: 13, color: '#888' }}>{row.area}</div>
              </td>
              <td>
                <div>Last: <b>{row.lastQty} {row.unit}</b></div>
                <div style={{ fontSize: 13, color: '#888' }}>{row.daysSince} days ago</div>
                <div style={{ fontSize: 13, color: '#888' }}>Lead time: {row.leadTime}</div>
              </td>
              <td>
                <div style={{ fontWeight: 700 }}>{row.recQty} {row.unit}</div>
                <div style={{ fontSize: 13, color: '#888' }}>Spoilage: {row.spoilage}</div>
              </td>
              <td>
                <span style={{
                  display: 'inline-block',
                  padding: '6px 18px',
                  borderRadius: 18,
                  fontWeight: 700,
                  fontSize: 14,
                  background: statusColors[row.status]?.background,
                  color: statusColors[row.status]?.color,
                  marginTop: 6,
                }}>{row.status}</span>
              </td>
              <td>
                <div style={{ color: '#1ac342', fontWeight: 700 }}>Raise Indent: {row.todayStr}</div>
                <div style={{ color: '#72bcd4', fontWeight: 700 }}>Next Indent: {row.nextDateStr}</div>
              </td>
              <td>
                <button
                  style={{
                    background: row.status === 'Critical' ? '#FF4D4D' : row.status === 'Good' ? '#1ac342' : '#f7a923',
                    color: '#fff',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 16px',
                    cursor: 'pointer',
                    width: '100%',
                    height: 40,
                  }}
                  onClick={() => onPlaceOrder(row)}
                  disabled={row.recQty <= 0}
                >
                  🛒 Create PO
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryStatusTable; 