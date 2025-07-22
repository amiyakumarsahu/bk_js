
import React from 'react';
import WarehousePickPathOptimizer from '@/components/WarehousePickPathOptimizer';

const WarehousePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
                Warehouse Manager
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WarehousePickPathOptimizer />
      </div>
    </div>
  );
};

export default WarehousePage;
