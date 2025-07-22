
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface InflowOutflowAnalysisProps {
  timeframe: string;
  region: string;
}

const InflowOutflowAnalysis: React.FC<InflowOutflowAnalysisProps> = ({ timeframe, region }) => {
  const [segmentType, setSegmentType] = useState('customer');

  // Mock data for inflow/outflow analysis
  const customerSegmentData = [
    { segment: 'Retail', inflow: 1200, outflow: 800, net: 400, percentage: 35 },
    { segment: 'Corporate', inflow: 1800, outflow: 1200, net: 600, percentage: 45 },
    { segment: 'Treasury', inflow: 500, outflow: 300, net: 200, percentage: 15 },
    { segment: 'Government', inflow: 300, outflow: 100, net: 200, percentage: 5 }
  ];

  const top10Contributors = [
    { name: 'ABC Corp Ltd', type: 'Corporate', amount: 450, trend: 'up', category: 'inflow' },
    { name: 'Retail Deposits', type: 'Retail', amount: 380, trend: 'up', category: 'inflow' },
    { name: 'Loan Disbursements', type: 'Corporate', amount: -420, trend: 'down', category: 'outflow' },
    { name: 'XYZ Industries', type: 'Corporate', amount: 320, trend: 'up', category: 'inflow' },
    { name: 'Operating Expenses', type: 'Internal', amount: -280, trend: 'stable', category: 'outflow' },
    { name: 'Interest Income', type: 'Treasury', amount: 250, trend: 'up', category: 'inflow' },
    { name: 'Vendor Payments', type: 'Corporate', amount: -240, trend: 'down', category: 'outflow' },
    { name: 'Government Bonds', type: 'Treasury', amount: 220, trend: 'stable', category: 'inflow' },
    { name: 'ATM Cash Loading', type: 'Internal', amount: -200, trend: 'stable', category: 'outflow' },
    { name: 'Service Charges', type: 'Retail', amount: 180, trend: 'up', category: 'inflow' }
  ];

  const patternDetection = [
    { pattern: 'Unusual Corporate Inflow Spike', severity: 'Medium', description: 'ABC Corp deposited 150% above average', time: '2 hours ago' },
    { pattern: 'Retail Withdrawal Pattern', severity: 'Low', description: 'Higher than normal ATM withdrawals detected', time: '4 hours ago' },
    { pattern: 'Treasury Operations Anomaly', severity: 'High', description: 'Government bond transaction outside normal hours', time: '6 hours ago' }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center space-x-4">
        <Select value={segmentType} onValueChange={setSegmentType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Segment Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customer">Customer Segment</SelectItem>
            <SelectItem value="product">Product Type</SelectItem>
            <SelectItem value="channel">Channel</SelectItem>
            <SelectItem value="geography">Geography</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Segment Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Inflow vs Outflow by Segment</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={customerSegmentData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="segment" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="inflow" fill="#10b981" name="Inflow (₹ Cr)" />
                <Bar dataKey="outflow" fill="#ef4444" name="Outflow (₹ Cr)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Net Position Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerSegmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ segment, percentage }) => `${segment}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="net"
                >
                  {customerSegmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top 10 Contributors */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Top 10 Flow Contributors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {top10Contributors.map((contributor, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="text-sm font-medium text-gray-500">#{index + 1}</div>
                  <div>
                    <div className="font-medium text-gray-900">{contributor.name}</div>
                    <div className="text-sm text-gray-500">{contributor.type}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className={`font-semibold ${contributor.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {contributor.amount > 0 ? '+' : ''}₹{Math.abs(contributor.amount)} Cr
                    </div>
                    <div className="text-xs text-gray-500">
                      {contributor.category === 'inflow' ? 'Inflow' : 'Outflow'}
                    </div>
                  </div>
                  {contributor.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                  {contributor.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
                  {contributor.trend === 'stable' && <div className="w-4 h-4 bg-gray-400 rounded-full"></div>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pattern Detection */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span>AI Pattern Detection & Anomalies</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {patternDetection.map((pattern, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className={`w-5 h-5 ${
                    pattern.severity === 'High' ? 'text-red-500' :
                    pattern.severity === 'Medium' ? 'text-orange-500' :
                    'text-blue-500'
                  }`} />
                  <div>
                    <div className="font-medium text-gray-900">{pattern.pattern}</div>
                    <div className="text-sm text-gray-600">{pattern.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant="outline"
                    className={
                      pattern.severity === 'High' ? 'text-red-700 border-red-200' :
                      pattern.severity === 'Medium' ? 'text-orange-700 border-orange-200' :
                      'text-blue-700 border-blue-200'
                    }
                  >
                    {pattern.severity}
                  </Badge>
                  <div className="text-xs text-gray-500 mt-1">{pattern.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InflowOutflowAnalysis;
