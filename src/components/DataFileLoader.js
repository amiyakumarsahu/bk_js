import React, { useState } from 'react';
import { loadCSV, loadExcel } from '../utils/dataLoader';

function DataFileLoader() {
  const [data, setData] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    if (file.name.endsWith('.csv')) {
      loadCSV(file, setData);
    } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      loadExcel(file, setData);
    } else {
      alert('Unsupported file type. Please upload a CSV or Excel file.');
    }
  };

  return (
    <div style={{ margin: '24px 0' }}>
      <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFile} />
      {fileName && <div style={{ marginTop: 8, fontWeight: 600 }}>Loaded: {fileName}</div>}
      {data && (
        <div style={{ marginTop: 16, maxHeight: 300, overflow: 'auto', background: '#fff', borderRadius: 8, padding: 12 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <tbody>
              {data.slice(0, 10).map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((cell, j) => (
                    <td key={j} style={{ border: '1px solid #eee', padding: 4 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {data.length > 10 && <div style={{ color: '#888', fontSize: 12 }}>Showing first 10 rows...</div>}
        </div>
      )}
    </div>
  );
}

export default DataFileLoader; 