
import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface FleetAllocationTableProps {
  numOutlets: number;
}

interface TruckType {
  total: number;
  frozen: number;
  chill: number;
  dry: number;
  costPerKm: number;
}

const truckTypes: Record<string, TruckType> = {
  Small: { total: 1500, frozen: 700, chill: 500, dry: 300, costPerKm: 4 },
  Medium: { total: 2500, frozen: 1200, chill: 800, dry: 500, costPerKm: 6 },
  Large: { total: 4000, frozen: 1800, chill: 1500, dry: 700, costPerKm: 8 },
};

const FleetAllocationTable = ({ numOutlets }: FleetAllocationTableProps) => {
  const allocationData = useMemo(() => {
    const routeData = { A: { frozen: 0, chilled: 0, dry: 0 }, B: { frozen: 0, chilled: 0, dry: 0 }, C: { frozen: 0, chilled: 0, dry: 0 } };
    
    for (let i = 0; i < numOutlets; i++) {
      const route = String.fromCharCode(65 + (i % 3)) as 'A' | 'B' | 'C';
      const frozen = Math.floor(Math.random() * 500) + 100;
      const chilled = Math.floor(Math.random() * 400) + 100;
      const dry = Math.floor(Math.random() * 250) + 50;
      const forecastMultiplier = 1.0 + Math.random() * 0.2;
      
      routeData[route].frozen += Math.round(frozen * forecastMultiplier);
      routeData[route].chilled += Math.round(chilled * forecastMultiplier);
      routeData[route].dry += Math.round(dry * forecastMultiplier);
    }
    
    const allocations = [];
    for (const [routeLetter, demand] of Object.entries(routeData)) {
      // Mixed-truck optimization: find the most cost-effective combination
      let bestOption = null;
      let minCost = Infinity;
      
      for (const [truckName, cap] of Object.entries(truckTypes)) {
        const frozenUnits = Math.ceil(demand.frozen / cap.frozen);
        const chilledUnits = Math.ceil(demand.chilled / cap.chill);
        const dryUnits = Math.ceil(demand.dry / cap.dry);
        const trucksNeeded = Math.max(frozenUnits, chilledUnits, dryUnits);
        const totalCap = trucksNeeded * cap.total;
        const loadFactor = ((demand.frozen + demand.chilled + demand.dry) / totalCap) * 100;
        const costEstimate = trucksNeeded * cap.costPerKm * 25; // assuming avg 25km route
        
        if (costEstimate < minCost && loadFactor > 60) { // Ensure minimum efficiency
          minCost = costEstimate;
          bestOption = {
            route: `Route ${routeLetter}`,
            truckType: truckName,
            trucksNeeded,
            totalCapacity: totalCap,
            loadFactor: Math.round(loadFactor * 10) / 10,
            estimatedCost: costEstimate,
            dispatchTime: `${Math.floor(Math.random() * 3) + 22}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`, // 22:00-01:00
          };
        }
      }
      
      if (bestOption) {
        allocations.push(bestOption);
      }
    }
    
    return allocations;
  }, [numOutlets]);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Route</TableHead>
            <TableHead>Truck Type</TableHead>
            <TableHead>Trucks Needed</TableHead>
            <TableHead>Total Capacity (kg)</TableHead>
            <TableHead>Load Factor %</TableHead>
            <TableHead>Estimated Cost (RM)</TableHead>
            <TableHead>Recommended Dispatch Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allocationData.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row.route}</TableCell>
              <TableCell>
                <Badge variant={row.truckType === 'Small' ? 'secondary' : row.truckType === 'Medium' ? 'default' : 'destructive'}>
                  {row.truckType}
                </Badge>
              </TableCell>
              <TableCell>{row.trucksNeeded}</TableCell>
              <TableCell>{row.totalCapacity.toLocaleString()}</TableCell>
              <TableCell>
                <span className={row.loadFactor > 80 ? 'text-green-600 font-semibold' : row.loadFactor > 60 ? 'text-yellow-600' : 'text-red-600'}>
                  {row.loadFactor}%
                </span>
              </TableCell>
              <TableCell>RM {row.estimatedCost}</TableCell>
              <TableCell className="font-medium text-blue-600">{row.dispatchTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FleetAllocationTable;
