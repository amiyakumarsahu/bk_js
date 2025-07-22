
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  MapPin, 
  Package, 
  Users, 
  Route,
  Target,
  BarChart3,
  Activity
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WarehousePickPathOptimizer = () => {
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedShift, setSelectedShift] = useState('current');

  // Mock data for KPIs
  const kpiData = [
    {
      title: "Pick Efficiency",
      value: "87.3%",
      change: "+3.2%",
      trend: "up",
      icon: Target,
      description: "Items picked per hour vs target"
    },
    {
      title: "Avg Travel Distance",
      value: "2.4km",
      change: "-18%",
      trend: "down",
      icon: Route,
      description: "Per pick cycle optimization"
    },
    {
      title: "Order Fulfillment Rate",
      value: "94.7%",
      change: "+1.8%",
      trend: "up",
      icon: Package,
      description: "Orders completed on time"
    },
    {
      title: "Active Pickers",
      value: "24",
      change: "0",
      trend: "stable",
      icon: Users,
      description: "Current shift workforce"
    }
  ];

  // Mock data for pick path analytics
  const pickPathData = [
    { hour: '08:00', distance: 2.8, efficiency: 82, picks: 45 },
    { hour: '09:00', distance: 2.6, efficiency: 85, picks: 52 },
    { hour: '10:00', distance: 2.4, efficiency: 88, picks: 48 },
    { hour: '11:00', distance: 2.2, efficiency: 91, picks: 55 },
    { hour: '12:00', distance: 2.5, efficiency: 86, picks: 42 },
    { hour: '13:00', distance: 2.7, efficiency: 84, picks: 38 },
    { hour: '14:00', distance: 2.3, efficiency: 89, picks: 51 },
    { hour: '15:00', distance: 2.1, efficiency: 93, picks: 58 }
  ];

  const zonePerformance = [
    { zone: 'Zone A', picks: 280, distance: 18.5, efficiency: 92 },
    { zone: 'Zone B', picks: 245, distance: 21.2, efficiency: 87 },
    { zone: 'Zone C', picks: 310, distance: 16.8, efficiency: 95 },
    { zone: 'Zone D', picks: 198, distance: 24.1, efficiency: 83 }
  ];

  const inboundOutboundData = [
    { time: '08:00', inbound: 85, outbound: 120 },
    { time: '10:00', inbound: 92, outbound: 135 },
    { time: '12:00', inbound: 78, outbound: 98 },
    { time: '14:00', inbound: 105, outbound: 142 },
    { time: '16:00', inbound: 88, outbound: 156 },
    { time: '18:00', inbound: 95, outbound: 128 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pick Path Optimizer</h1>
          <p className="text-gray-600 mt-1">Warehouse Operations Dashboard</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedShift} onValueChange={setSelectedShift}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Shift</SelectItem>
              <SelectItem value="morning">Morning Shift</SelectItem>
              <SelectItem value="evening">Evening Shift</SelectItem>
              <SelectItem value="night">Night Shift</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              <SelectItem value="zoneA">Zone A</SelectItem>
              <SelectItem value="zoneB">Zone B</SelectItem>
              <SelectItem value="zoneC">Zone C</SelectItem>
              <SelectItem value="zoneD">Zone D</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {kpi.title}
                  </CardTitle>
                  <IconComponent className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                  <div className="flex items-center space-x-1">
                    {kpi.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                    {kpi.trend === "down" && <TrendingDown className="h-4 w-4 text-green-500" />}
                    {kpi.trend === "stable" && <Activity className="h-4 w-4 text-gray-400" />}
                    <span className={`text-sm font-medium ${
                      kpi.trend === "up" ? "text-green-600" : 
                      kpi.trend === "down" ? "text-green-600" : "text-gray-600"
                    }`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{kpi.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Dashboard */}
      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Path Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="zones" className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Zone Performance</span>
          </TabsTrigger>
          <TabsTrigger value="operations" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Operations Flow</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pick Efficiency Over Time */}
            <Card>
              <CardHeader>
                <CardTitle>Pick Efficiency Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={pickPathData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke="#f97316" 
                      strokeWidth={2}
                      name="Efficiency %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Travel Distance Optimization */}
            <Card>
              <CardHeader>
                <CardTitle>Travel Distance by Hour</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={pickPathData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="distance" 
                      stroke="#dc2626" 
                      fill="#dc2626" 
                      fillOpacity={0.3}
                      name="Distance (km)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Pick Rate Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Hourly Pick Rate Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pickPathData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="picks" fill="#f97316" name="Items Picked" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Zone Performance Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Zone Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={zonePerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="zone" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="efficiency" fill="#f97316" name="Efficiency %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Zone Distance Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Average Travel Distance by Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={zonePerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="zone" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="distance" fill="#dc2626" name="Distance (km)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Zone Details Table */}
          <Card>
            <CardHeader>
              <CardTitle>Zone Performance Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Zone</th>
                      <th className="text-left p-2">Total Picks</th>
                      <th className="text-left p-2">Avg Distance (km)</th>
                      <th className="text-left p-2">Efficiency</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {zonePerformance.map((zone, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{zone.zone}</td>
                        <td className="p-2">{zone.picks}</td>
                        <td className="p-2">{zone.distance}</td>
                        <td className="p-2">{zone.efficiency}%</td>
                        <td className="p-2">
                          <Badge 
                            variant={zone.efficiency >= 90 ? "default" : "secondary"}
                            className={zone.efficiency >= 90 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                          >
                            {zone.efficiency >= 90 ? "Optimal" : "Needs Optimization"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          {/* Inbound vs Outbound Flow */}
          <Card>
            <CardHeader>
              <CardTitle>Inbound vs Outbound Operations Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={inboundOutboundData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="inbound" 
                    stackId="1"
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.6}
                    name="Inbound Activities"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="outbound" 
                    stackId="2"
                    stroke="#f97316" 
                    fill="#f97316" 
                    fillOpacity={0.6}
                    name="Outbound Activities"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Active Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Current Active Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium">Priority Orders</p>
                      <p className="text-sm text-gray-600">Urgent pickups</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800">12</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Standard Orders</p>
                      <p className="text-sm text-gray-600">Regular processing</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">87</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Bulk Orders</p>
                      <p className="text-sm text-gray-600">Large quantities</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">23</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Optimization Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Optimization Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <p className="font-medium text-yellow-800">Zone B Optimization</p>
                    <p className="text-sm text-yellow-700">Rearrange picker routes to reduce 15% travel time</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="font-medium text-blue-800">Peak Hour Staffing</p>
                    <p className="text-sm text-blue-700">Add 2 more pickers during 14:00-16:00 period</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <p className="font-medium text-green-800">Batch Optimization</p>
                    <p className="text-sm text-green-700">Group similar location picks to save 20% distance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WarehousePickPathOptimizer;
