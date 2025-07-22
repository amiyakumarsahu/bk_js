
import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface RoutePerformanceData {
  route: string;
  stores: number;
  distance: number;
  time: number;
  fuelCost: number;
  efficiency: number;
  status: 'Optimized' | 'Optimal' | 'Need Optimization';
}

const HistoricalRoutePerformance = () => {
  const performanceData = useMemo(() => {
    const routes = ['Route A', 'Route B', 'Route C'];
    const data: RoutePerformanceData[] = [];
    
    routes.forEach(route => {
      const stores = Math.floor(Math.random() * 8) + 3; // 3-10 stores
      const distance = Math.floor(Math.random() * 50) + 20; // 20-70 km
      const time = Math.round((distance / 25 + stores * 0.5) * 10) / 10; // Estimated time in hours
      const fuelCost = Math.round(distance * 0.8 * 10) / 10; // RM per km fuel cost
      const efficiency = Math.round((stores / distance * 100) * 10) / 10; // Stores per km efficiency
      
      let status: 'Optimized' | 'Optimal' | 'Need Optimization';
      if (efficiency > 0.15) status = 'Optimized';
      else if (efficiency > 0.1) status = 'Optimal';
      else status = 'Need Optimization';
      
      data.push({
        route,
        stores,
        distance,
        time,
        fuelCost,
        efficiency,
        status,
      });
    });
    
    return data;
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Optimized': return 'bg-green-100 text-green-800';
      case 'Optimal': return 'bg-yellow-100 text-yellow-800';
      case 'Need Optimization': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Route</TableHead>
            <TableHead>Stores</TableHead>
            <TableHead>Distance (km)</TableHead>
            <TableHead>Time (hrs)</TableHead>
            <TableHead>Fuel Cost (RM)</TableHead>
            <TableHead>Efficiency (%)</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {performanceData.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row.route}</TableCell>
              <TableCell>{row.stores}</TableCell>
              <TableCell>{row.distance}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>RM {row.fuelCost}</TableCell>
              <TableCell>
                <span className={row.efficiency > 0.15 ? 'text-green-600 font-semibold' : row.efficiency > 0.1 ? 'text-yellow-600' : 'text-red-600'}>
                  {row.efficiency}%
                </span>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(row.status)}>
                  {row.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HistoricalRoutePerformance;
