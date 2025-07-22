import React, { useState, useEffect } from 'react';
import StrategyCard from '../components/StrategyCard';
import InventoryStatusTable from '../components/InventoryStatusTable';
import * as XLSX from 'xlsx';

function formatDate(val) {
  const d = new Date(val);
  return d instanceof Date && !isNaN(d) ? d.toLocaleDateString() : 'N/A';
}

function formatDateDMY(val) {
  if (!val) return '';
  const d = new Date(val);
  if (d instanceof Date && !isNaN(d)) {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }
  return String(val);
}

function parseDMY(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return 'N/A';
  const [day, month, year] = dateStr.split('-');
  if (!day || !month || !year) return 'N/A';
  const d = new Date(`${year}-${month}-${day}`);
  if (isNaN(d)) return 'N/A';
  return `${day}-${month}-${year}`;
}

function excelSerialToDMY(serial) {
  if (!serial || isNaN(serial)) return 'N/A';
  const excelEpoch = new Date(1899, 11, 30);
  const d = new Date(excelEpoch.getTime() + serial * 24 * 60 * 60 * 1000);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

function Tab2() {
  // Strategy scenarios (mock data)
  const scenarios = {
    Conservative: { z: 0.52, costSavings: '$2,340', stockoutRisk: '15%' },
    Balanced: { z: 1.04, costSavings: '$3,680', stockoutRisk: '2%' },
    Aggressive: { z: 2.33, costSavings: '$4,920', stockoutRisk: '10%' },
  };
  const [selectedStrategy, setSelectedStrategy] = useState('Balanced');

  // Real inventory data from Excel
  const [inventoryData, setInventoryData] = useState([]);
  const [areaFilter, setAreaFilter] = useState('All');
  const [ingredientFilter, setIngredientFilter] = useState('All');

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data/procurement_data.xlsx')
      .then(res => res.arrayBuffer())
      .then(buffer => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        setInventoryData(json);
        if (json.length > 0) {
          console.log('Sample row:', json[0]);
          console.log('Sample row keys:', Object.keys(json[0]));
        }
      });
  }, []);

  // Get unique areas/ingredients for filters
  const areaOptions = ['All', ...Array.from(new Set(inventoryData.map(row => row.area_x).filter(Boolean)))];
  const ingredientOptions = ['All', ...Array.from(new Set(inventoryData.map(row => row.raw_material_name_x).filter(Boolean)))];

  // Filtered data
  const filteredData = inventoryData.filter(row =>
    (areaFilter === 'All' || row.area_x === areaFilter) &&
    (ingredientFilter === 'All' || row.raw_material_name_x === ingredientFilter)
  );

  // Map Excel data to table format expected by InventoryStatusTable
  const tableData = filteredData.map(row => {
    // Calculate required as in Python
    const z = scenarios[selectedStrategy]?.z || 1.04;
    const calculated_required = Math.round((Number(row.procurement_quantity) || 0) + (Number(row.spoilage) || 0) + (z * (Number(row.safety_stock) || 0)));
    // Status logic as in Python
    let status = 'Good';
    if (Number(row.current_inventory) < calculated_required) {
      status = 'Critical';
    } else if (Number(row.current_inventory) > calculated_required) {
      status = 'Good';
    } else {
      status = 'Low';
    }
    const buttonColor = {
      'Critical': '#e74c3c',
      'Low': '#f39c12',
      'Good': '#2ecc71',
    }[status] || '#999999';
    const statusBadgeColor = {
      'Critical': '#FF4D4D',
      'Low': '#f7a923',
      'Good': '#1ac342',
    }[status] || '#f0f0f0';
    return {
      ingredient: row.raw_material_name_x,
      shelfLife: row.avg_shelf_life_days,
      area: row.area_x,
      lastQty: row.current_inventory,
      unit: row.spoilage_unit_type,
      daysSince: row.DaysSincePurchase,
      leadTime: row.lead_time,
      recQty: row.procurement_quantity,
      spoilage: row.spoilage,
      status,
      todayStr: excelSerialToDMY(row.RaiseDate),
      nextDateStr: excelSerialToDMY(row.NextDate),
      buttonColor,
      statusBadgeColor,
    };
  });

  // Order confirmation popup
  const [orderMsg, setOrderMsg] = useState('');
  const handlePlaceOrder = (row) => {
    setOrderMsg(`Purchase Order placed for ${row.ingredient} (${row.recQty} ${row.unit})!`);
    setTimeout(() => setOrderMsg(''), 2500);
  };

  return (
    <div>
      <h2>🛒 Smart Repurchase Tool</h2>
      <h3>Reorder Strategy Scenarios</h3>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: 32, justifyContent: 'center' }}>
        {Object.entries(scenarios).map(([name, data]) => (
          <StrategyCard
            key={name}
            name={name}
            costSavings={data.costSavings}
            stockoutRisk={data.stockoutRisk}
            applied={selectedStrategy === name}
            onApply={() => setSelectedStrategy(name)}
            style={{ width: 220 }}
          />
        ))}
      </div>
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
          <select value={ingredientFilter} onChange={e => setIngredientFilter(e.target.value)}>
            {ingredientOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>
      <h3>Inventory Status by Ingredient</h3>
      <InventoryStatusTable data={tableData} onPlaceOrder={handlePlaceOrder} />
      {orderMsg && (
        <div style={{ marginTop: 20, padding: 16, background: '#e0ffe0', color: '#1ac342', borderRadius: 8, fontWeight: 600 }}>
          {orderMsg}
        </div>
      )}
    </div>
  );
}

export default Tab2; 