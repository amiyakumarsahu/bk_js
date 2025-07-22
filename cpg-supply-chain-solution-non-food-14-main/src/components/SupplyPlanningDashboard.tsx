import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, Package, TrendingUp, Calendar, Filter } from 'lucide-react';
import SupplyPlanningChatbot from './SupplyPlanningChatbot';

interface SupplyPlanningProps {
  selectedStore: string;
  selectedRegion: string;
}

const SupplyPlanningDashboard: React.FC<SupplyPlanningProps> = ({ selectedStore, selectedRegion }) => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedProduct, setSelectedProduct] = useState('all');

  const demandForecastData = {
    all: [
      { date: 'Mon', demand: 850, actual: 820, spoilage: 25 },
      { date: 'Tue', demand: 920, actual: 890, spoilage: 30 },
      { date: 'Wed', demand: 1100, actual: 1050, spoilage: 35 },
      { date: 'Thu', demand: 1200, actual: 1180, spoilage: 40 },
      { date: 'Fri', demand: 1350, actual: 1320, spoilage: 45 },
      { date: 'Sat', demand: 1500, actual: 1480, spoilage: 50 },
      { date: 'Sun', demand: 1300, actual: 1250, spoilage: 48 }
    ],
    whopper: [
      { date: 'Mon', demand: 320, actual: 310, spoilage: 8 },
      { date: 'Tue', demand: 340, actual: 335, spoilage: 10 },
      { date: 'Wed', demand: 410, actual: 400, spoilage: 12 },
      { date: 'Thu', demand: 450, actual: 445, spoilage: 15 },
      { date: 'Fri', demand: 520, actual: 510, spoilage: 18 },
      { date: 'Sat', demand: 580, actual: 570, spoilage: 20 },
      { date: 'Sun', demand: 480, actual: 470, spoilage: 16 }
    ],
    fries: [
      { date: 'Mon', demand: 280, actual: 275, spoilage: 5 },
      { date: 'Tue', demand: 300, actual: 295, spoilage: 6 },
      { date: 'Wed', demand: 360, actual: 350, spoilage: 8 },
      { date: 'Thu', demand: 390, actual: 385, spoilage: 10 },
      { date: 'Fri', demand: 440, actual: 430, spoilage: 12 },
      { date: 'Sat', demand: 480, actual: 475, spoilage: 14 },
      { date: 'Sun', demand: 420, actual: 410, spoilage: 11 }
    ],
    chicken: [
      { date: 'Mon', demand: 250, actual: 235, spoilage: 12 },
      { date: 'Tue', demand: 280, actual: 260, spoilage: 14 },
      { date: 'Wed', demand: 330, actual: 300, spoilage: 15 },
      { date: 'Thu', demand: 360, actual: 350, spoilage: 15 },
      { date: 'Fri', demand: 390, actual: 380, spoilage: 15 },
      { date: 'Sat', demand: 440, actual: 435, spoilage: 16 },
      { date: 'Sun', demand: 400, actual: 375, spoilage: 21 }
    ]
  };

  const rawMaterialData = [
    { material: 'Beef Patties', current: 2400, required: 2800, status: 'critical', reorderPoint: 2000 },
    { material: 'Buns', current: 3200, required: 3500, status: 'low', reorderPoint: 2500 },
    { material: 'Lettuce', current: 1800, required: 2000, status: 'good', reorderPoint: 1200 },
    { material: 'Tomatoes', current: 1500, required: 1600, status: 'good', reorderPoint: 1000 },
    { material: 'Cheese', current: 800, required: 1200, status: 'critical', reorderPoint: 600 },
    { material: 'Fries', current: 2200, required: 2400, status: 'good', reorderPoint: 1800 }
  ];

  const spoilageAnalysis = [
    { name: 'Vegetables', value: 35, color: '#ef4444' },
    { name: 'Dairy', value: 25, color: '#f97316' },
    { name: 'Meat', value: 20, color: '#eab308' },
    { name: 'Bread', value: 15, color: '#22c55e' },
    { name: 'Others', value: 5, color: '#6366f1' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'low': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'good': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Supply Planning & Raw Material Management</h2>
        <div className="flex space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Calendar className="w-4 h-4 mr-2" />
            Generate Plan
          </Button>
        </div>
      </div>

      {/* Add Chatbot Integration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span>Demand Forecast vs Actual Performance</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="whopper">Whopper</SelectItem>
                      <SelectItem value="fries">Fries</SelectItem>
                      <SelectItem value="chicken">Chicken</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={demandForecastData[selectedProduct as keyof typeof demandForecastData]}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="demand" stroke="#f97316" strokeWidth={3} name="Forecasted Demand" />
                  <Line type="monotone" dataKey="actual" stroke="#22c55e" strokeWidth={3} name="Actual Demand" />
                  <Line type="monotone" dataKey="spoilage" stroke="#ef4444" strokeWidth={2} name="Spoilage" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <SupplyPlanningChatbot />
        </div>
      </div>

      {/* Raw Material Inventory Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-orange-600" />
            <span>Raw Material Inventory Status</span>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              SAP Integrated
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Material</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Current Stock</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Required</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Reorder Point</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">SAP Action</th>
                </tr>
              </thead>
              <tbody>
                {rawMaterialData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{item.material}</td>
                    <td className="py-3 px-4">{item.current.toLocaleString()} units</td>
                    <td className="py-3 px-4">{item.required.toLocaleString()} units</td>
                    <td className="py-3 px-4">{item.reorderPoint.toLocaleString()} units</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {item.status === 'critical' && (
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          Create SAP PO
                        </Button>
                      )}
                      {item.status === 'low' && (
                        <Button size="sm" variant="outline" className="text-orange-600 border-orange-300">
                          Schedule SAP Order
                        </Button>
                      )}
                      {item.status === 'good' && (
                        <span className="text-green-600 text-sm">Auto-Managed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Spoilage Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Spoilage Analysis by Category</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={spoilageAnalysis}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {spoilageAnalysis.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Alerts & SAP Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-red-800">Critical Stock Alert</p>
                  <p className="text-sm text-red-600">Beef patties below critical level. SAP PO auto-generated.</p>
                  <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700 text-white">
                    View SAP Order #PO789123
                  </Button>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Package className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-blue-800">SAP Integration Active</p>
                  <p className="text-sm text-blue-600">Real-time sync with SAP MM module enabled. Last sync: 2 min ago</p>
                  <Badge className="mt-1 bg-green-100 text-green-800">Connected</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupplyPlanningDashboard;
