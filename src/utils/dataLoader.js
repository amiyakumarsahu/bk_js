// dataLoader.js
// Utility functions for loading CSV and Excel files in the browser

// CSV: use papaparse
import Papa from 'papaparse';

export function loadCSV(file, callback) {
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: (results) => callback(results.data),
  });
}

// Excel: use SheetJS
import * as XLSX from 'xlsx';

export function loadExcel(file, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    callback(json);
  };
  reader.readAsArrayBuffer(file);
} 