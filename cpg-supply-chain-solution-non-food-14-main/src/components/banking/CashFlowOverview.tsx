
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, Zap, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface CashFlowOverviewProps {
  timeframe: string;
  region: string;
}

const CashFlowOverview: React.FC<CashFlowOverviewProps> = ({ timeframe, region }) => {
  const [flowFilter, setFlowFilter] = useState('both');

  // Malaysian context mock data
  const dailyFlowData = [
    { date: '2024-01-15', inflow: 2500, outflow: 1800, net: 700 },
    { date: '2024-01-16', inflow: 2800, outflow: 2100, net: 700 },
    { date: '2024-01-17', inflow: 3200, outflow: 2400, net: 800 },
    { date: '2024-01-18', inflow: 2900, outflow: 2200, net: 700 },
    { date: '2024-01-19', inflow: 3500, outflow: 2800, net: 700 },
    { date: '2024-01-20', inflow: 3100, outflow: 2600, net: 500 },
    { date: '2024-01-21', inflow: 2700, outflow: 2300, net: 400 }
  ];

  const inflowBreakdown = [
    { name: 'Government Salaries', value: 450, color: '#10b981' },
    { name: 'Corporate Deposits', value: 680, color: '#3b82f6' },
    { name: 'SME Loan Repayments', value: 320, color: '#8b5cf6' },
    { name: 'Retail Deposits', value: 280, color: '#f59e0b' },
    { name: 'Investment Returns', value: 150, color: '#ef4444' },
    { name: 'Inter-bank Receipts', value: 120, color: '#06b6d4' }
  ];

  const outflowBreakdown = [
    { name: 'Loan Disbursements', value: 580, color: '#ef4444' },
    { name: 'ATM Cash Replenishment', value: 320, color: '#f59e0b' },
    { name: 'Operational Expenses', value: 280, color: '#8b5cf6' },
    { name: 'Customer Withdrawals', value: 420, color: '#06b6d4' },
    { name: 'Inter-bank Payments', value: 180, color: '#84cc16' },
    { name: 'CNY Bonus Payouts', value: 220, color: '#f97316' }
  ];

  const kpiData = [
    {
      title: 'Net Cash Position',
      value: 'RM 4,250M',
      change: '+12.5%',
      trend: 'up',
      description: 'vs last period'
    },
    {
      title: 'Liquidity Coverage Ratio',
      value: '142%',
      change: '+3.2%',
      trend: 'up',
      description: 'Above BNM minimum (100%)'
    },
    {
      title: 'Cash Burn Rate',
      value: 'RM 850M/day',
      change: '-5.1%',
      trend: 'down',
      description: 'Average daily outflow'
    },
    {
      title: 'Forecast Accuracy',
      value: '94.2%',
      change: '+1.8%',
      trend: 'up',
      description: 'Last 30 days average'
    }
  ];

  const alerts = [
    { type: 'warning', message: 'ATM cash below threshold in 15 locations (Klang Valley)', priority: 'Medium' },
    { type: 'info', message: 'CNY period - surplus cash available for investment: RM 320M', priority: 'Low' },
    { type: 'error', message: 'LCR approaching BNM minimum in East Malaysia region', priority: 'High' }
  ];

  const getFilteredData = () => {
    if (flowFilter === 'inflow') return inflowBreakdown;
    if (flowFilter === 'outflow') return outflowBreakdown;
    return [...inflowBreakdown, ...outflowBreakdown];
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
              {kpi.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge 
                  variant="outline" 
                  className={kpi.trend === 'up' ? 'text-green-700 border-green-200' : 'text-red-700 border-red-200'}
                >
                  {kpi.change}
                </Badge>
                <span className="text-xs text-gray-500">{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Cash Flow Trend */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Daily Cash Flow Trend (Malaysian Context)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyFlowData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="inflow" stroke="#10b981" strokeWidth={2} name="Inflow (RM M)" />
                <Line type="monotone" dataKey="outflow" stroke="#ef4444" strokeWidth={2} name="Outflow (RM M)" />
                <Line type="monotone" dataKey="net" stroke="#3b82f6" strokeWidth={3} name="Net Position (RM M)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Inflow/Outflow Breakdown with Filter */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Cash Flow Breakdown</CardTitle>
              <Select value={flowFilter} onValueChange={setFlowFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="both">Both</SelectItem>
                  <SelectItem value="inflow">Inflow Only</SelectItem>
                  <SelectItem value="outflow">Outflow Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getFilteredData()}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: RM ${value}M`}
                >
                  {getFilteredData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`RM ${value}M`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-green-900">Inflow Sources (Malaysian Context)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inflowBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded border border-green-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">RM {item.value}M</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-red-900">Outflow Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {outflowBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded border border-red-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">RM {item.value}M</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Malaysian-Specific Alerts */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span>Real-time Alerts (Malaysian Banking Context)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  {alert.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                  {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-orange-500" />}
                  {alert.type === 'info' && <Zap className="w-5 h-5 text-blue-500" />}
                  <span className="text-sm text-gray-700">{alert.message}</span>
                </div>
                <Badge 
                  variant="outline"
                  className={
                    alert.priority === 'High' ? 'text-red-700 border-red-200' :
                    alert.priority === 'Medium' ? 'text-orange-700 border-orange-200' :
                    'text-blue-700 border-blue-200'
                  }
                >
                  {alert.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashFlowOverview;
