
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { MapPin, TrendingUp, TrendingDown } from 'lucide-react';

interface CashPositionBreakdownProps {
  timeframe: string;
  region: string;
}

const CashPositionBreakdown: React.FC<CashPositionBreakdownProps> = ({ timeframe, region }) => {
  // Mock data for cash position breakdown
  const cashBreakdownData = [
    { name: 'Branch Cash', value: 1250, percentage: 29.4, color: '#3b82f6' },
    { name: 'ATM/Vaults', value: 980, percentage: 23.1, color: '#10b981' },
    { name: 'Inter-bank', value: 850, percentage: 20.0, color: '#f59e0b' },
    { name: 'Central Bank', value: 720, percentage: 16.9, color: '#ef4444' },
    { name: 'Surplus Fund', value: 450, percentage: 10.6, color: '#8b5cf6' }
  ];

  const regionalData = [
    { region: 'North', cash: 1200, target: 1100, variance: '+9.1%', status: 'surplus' },
    { region: 'South', cash: 950, target: 1000, variance: '-5.0%', status: 'deficit' },
    { region: 'East', cash: 880, target: 850, variance: '+3.5%', status: 'surplus' },
    { region: 'West', cash: 1220, target: 1300, variance: '-6.2%', status: 'deficit' }
  ];

  const atmStatusData = [
    { location: 'Mumbai Central', cash: 450000, capacity: 500000, utilization: 90, status: 'good' },
    { location: 'Delhi CP', cash: 350000, capacity: 500000, utilization: 70, status: 'moderate' },
    { location: 'Bangalore MG Road', cash: 150000, capacity: 400000, utilization: 37.5, status: 'low' },
    { location: 'Chennai T Nagar', cash: 380000, capacity: 450000, utilization: 84.4, status: 'good' },
    { location: 'Kolkata Park Street', cash: 120000, capacity: 350000, utilization: 34.3, status: 'low' }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Cash Distribution Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Cash Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cashBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {cashBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cash Breakdown Details */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Position Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cashBreakdownData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="font-medium text-gray-900">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">₹{item.value} Cr</div>
                    <div className="text-sm text-gray-500">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Cash Position */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Regional Cash Position vs Target</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="region" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="cash" fill="#3b82f6" name="Actual Cash (₹ Cr)" />
              <Bar dataKey="target" fill="#94a3b8" name="Target (₹ Cr)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Regional Performance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {regionalData.map((region, index) => (
          <Card key={index} className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{region.region} Region</span>
                {region.status === 'surplus' ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
              </div>
              <div className="text-xl font-bold text-gray-900 mb-1">₹{region.cash} Cr</div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant="outline"
                  className={region.status === 'surplus' ? 'text-green-700 border-green-200' : 'text-red-700 border-red-200'}
                >
                  {region.variance}
                </Badge>
                <span className="text-xs text-gray-500">vs target</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ATM Cash Status */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>ATM Cash Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {atmStatusData.map((atm, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                <div>
                  <div className="font-medium text-gray-900">{atm.location}</div>
                  <div className="text-sm text-gray-500">₹{atm.cash.toLocaleString()} / ₹{atm.capacity.toLocaleString()}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{atm.utilization}%</div>
                    <div className="text-xs text-gray-500">Utilization</div>
                  </div>
                  <Badge 
                    variant="outline"
                    className={
                      atm.status === 'good' ? 'text-green-700 border-green-200' :
                      atm.status === 'moderate' ? 'text-orange-700 border-orange-200' :
                      'text-red-700 border-red-200'
                    }
                  >
                    {atm.status === 'good' ? 'Good' : atm.status === 'moderate' ? 'Moderate' : 'Low'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashPositionBreakdown;
