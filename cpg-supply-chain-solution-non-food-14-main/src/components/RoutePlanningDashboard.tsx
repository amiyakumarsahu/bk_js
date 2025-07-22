import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { MapPin, Truck, Route, Clock, Fuel, Navigation } from 'lucide-react';
import BangaloreRouteMap from './BangaloreRouteMap';

interface RoutePlanningProps {
  selectedStore: string;
  selectedRegion: string;
}

const RoutePlanningDashboard: React.FC<RoutePlanningProps> = ({ selectedStore, selectedRegion }) => {
  const [optimizationType, setOptimizationType] = useState('distance');

  const routeData = [
    {
      route: 'Route A',
      stores: 8,
      distance: 45.2,
      time: 180,
      fuelCost: 28.50,
      status: 'optimized',
      efficiency: 94
    },
    {
      route: 'Route B',
      stores: 6,
      distance: 38.7,
      time: 165,
      fuelCost: 24.20,
      status: 'optimal',
      efficiency: 98
    },
    {
      route: 'Route C',
      stores: 10,
      distance: 52.8,
      time: 210,
      fuelCost: 33.10,
      status: 'needs-optimization',
      efficiency: 78
    },
    {
      route: 'Route D',
      stores: 5,
      time: 120,
      distance: 29.3,
      fuelCost: 18.40,
      status: 'optimal',
      efficiency: 96
    }
  ];

  const deliveryPerformance = [
    { day: 'Mon', onTime: 94, delayed: 6, distance: 180, fuel: 120 },
    { day: 'Tue', onTime: 96, delayed: 4, distance: 165, fuel: 110 },
    { day: 'Wed', onTime: 92, delayed: 8, distance: 195, fuel: 130 },
    { day: 'Thu', onTime: 98, delayed: 2, distance: 170, fuel: 115 },
    { day: 'Fri', onTime: 95, delayed: 5, distance: 185, fuel: 125 },
    { day: 'Sat', onTime: 89, delayed: 11, distance: 220, fuel: 145 },
    { day: 'Sun', onTime: 97, delayed: 3, distance: 160, fuel: 105 }
  ];

  const fuelEfficiencyData = [
    { route: 'A', efficiency: 12.5, distance: 45, stores: 8 },
    { route: 'B', efficiency: 13.2, distance: 39, stores: 6 },
    { route: 'C', efficiency: 11.8, distance: 53, stores: 10 },
    { route: 'D', efficiency: 14.1, distance: 29, stores: 5 },
    { route: 'E', efficiency: 12.9, distance: 42, stores: 7 }
  ];

  const costBreakdown = [
    { name: 'Fuel', value: 45, color: '#ef4444' },
    { name: 'Driver Wages', value: 35, color: '#f97316' },
    { name: 'Vehicle Maintenance', value: 12, color: '#eab308' },
    { name: 'Insurance', value: 5, color: '#22c55e' },
    { name: 'Other', value: 3, color: '#6366f1' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-50 text-green-700 border-green-200';
      case 'optimized': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'needs-optimization': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTotalDistance = () => {
    return routeData.reduce((sum, route) => sum + route.distance, 0);
  };

  const getTotalFuelCost = () => {
    return routeData.reduce((sum, route) => sum + route.fuelCost, 0);
  };

  const getAverageEfficiency = () => {
    const avg = routeData.reduce((sum, route) => sum + route.efficiency, 0) / routeData.length;
    return Math.round(avg);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Route Planning & Delivery Optimization</h2>
        <div className="flex space-x-4">
          <Select value={optimizationType} onValueChange={setOptimizationType}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Minimize Distance</SelectItem>
              <SelectItem value="time">Minimize Time</SelectItem>
              <SelectItem value="fuel">Minimize Fuel Cost</SelectItem>
              <SelectItem value="balanced">Balanced Optimization</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Route className="w-4 h-4 mr-2" />
            Optimize Routes
          </Button>
        </div>
      </div>

      {/* Bangalore Interactive Map */}
      <BangaloreRouteMap />

      {/* Route Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-blue-700">Total Distance</p>
                <p className="text-2xl font-bold text-blue-800">{getTotalDistance().toFixed(1)} km</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Fuel className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-green-700">Fuel Cost</p>
                <p className="text-2xl font-bold text-green-800">${getTotalFuelCost().toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-orange-700">Avg Efficiency</p>
                <p className="text-2xl font-bold text-orange-800">{getAverageEfficiency()}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-purple-700">Active Routes</p>
                <p className="text-2xl font-bold text-purple-800">{routeData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Route Details Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Navigation className="w-5 h-5 text-blue-600" />
            <span>Route Performance Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Route</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Stores</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Distance</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Fuel Cost</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Efficiency</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {routeData.map((route, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{route.route}</td>
                    <td className="py-3 px-4">{route.stores} outlets</td>
                    <td className="py-3 px-4">{route.distance} km</td>
                    <td className="py-3 px-4">{route.time} min</td>
                    <td className="py-3 px-4">${route.fuelCost}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${route.efficiency}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{route.efficiency}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={getStatusColor(route.status)}>
                        {route.status.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Delivery Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deliveryPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="onTime" stackId="a" fill="#22c55e" name="On Time %" />
                <Bar dataKey="delayed" stackId="a" fill="#ef4444" name="Delayed %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fuel Efficiency Scatter */}
        <Card>
          <CardHeader>
            <CardTitle>Route Efficiency vs Distance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={fuelEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="distance" name="Distance (km)" />
                <YAxis dataKey="efficiency" name="Fuel Efficiency (km/l)" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter dataKey="efficiency" fill="#3b82f6" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Distance & Fuel Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={deliveryPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="distance" stroke="#3b82f6" strokeWidth={2} name="Distance (km)" />
                <Line yAxisId="right" type="monotone" dataKey="fuel" stroke="#f97316" strokeWidth={2} name="Fuel Cost ($)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Route Optimization Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Route className="w-6 h-6 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800">Route Consolidation</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Combine Route A and D to reduce total distance by 12km and save $8.30 in fuel costs.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800">Time Window Optimization</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Adjust delivery windows to avoid peak traffic, potentially reducing delivery time by 15%.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Fuel className="w-6 h-6 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-orange-800">Fuel Efficiency</h4>
                  <p className="text-sm text-orange-700 mt-1">
                    Route C shows poor fuel efficiency. Consider vehicle maintenance or route redesign.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoutePlanningDashboard;
