
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FleetDemandTrendChartProps {
  numOutlets: number;
  selectedOutlet: string;
  selectedRoute: string;
  onOutletChange: (outlet: string) => void;
  onRouteChange: (route: string) => void;
}

const FleetDemandTrendChart = ({ 
  numOutlets, 
  selectedOutlet, 
  selectedRoute, 
  onOutletChange, 
  onRouteChange 
}: FleetDemandTrendChartProps) => {
  const { chartData, outlets, routes } = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const outletsList = Array.from({ length: numOutlets }, (_, i) => `BK_${(i + 1).toString().padStart(3, '0')}`);
    const routesList = ['Route A', 'Route B', 'Route C'];
    
    const data = days.map(day => {
      let totalDemand = 0;
      
      for (let i = 0; i < numOutlets; i++) {
        const outlet = `BK_${(i + 1).toString().padStart(3, '0')}`;
        const route = `Route ${String.fromCharCode(65 + (i % 3))}`;
        
        // Filter by outlet and route
        if (selectedOutlet !== 'all' && outlet !== selectedOutlet) continue;
        if (selectedRoute !== 'all' && route !== selectedRoute) continue;
        
        const baseDemand = Math.floor(Math.random() * 800) + 200;
        const dayMultiplier = day === 'Fri' || day === 'Sat' ? 1.3 : day === 'Sun' ? 0.8 : 1.0;
        totalDemand += Math.round(baseDemand * dayMultiplier);
      }
      
      return {
        day,
        demand: totalDemand,
      };
    });
    
    return {
      chartData: data,
      outlets: outletsList,
      routes: routesList,
    };
  }, [numOutlets, selectedOutlet, selectedRoute]);

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Select value={selectedOutlet} onValueChange={onOutletChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Outlet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Outlets</SelectItem>
            {outlets.map(outlet => (
              <SelectItem key={outlet} value={outlet}>{outlet}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedRoute} onValueChange={onRouteChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Route" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Routes</SelectItem>
            {routes.map(route => (
              <SelectItem key={route} value={route}>{route}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis label={{ value: 'Total Demand (kg)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="demand" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
              name="Total Demand"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FleetDemandTrendChart;
