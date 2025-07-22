
import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FleetDemandTableProps {
  numOutlets: number;
  timeWindow: string;
  onTimeWindowChange: (timeWindow: string) => void;
}

interface OutletData {
  outlet: string;
  route: string;
  totalDemand: number;
  frozenDemand: number;
  chilledDemand: number;
  dryDemand: number;
}

const FleetDemandTable = ({ numOutlets, timeWindow, onTimeWindowChange }: FleetDemandTableProps) => {
  const data = useMemo(() => {
    const outlets: OutletData[] = [];
    const multiplier = timeWindow === 'Today' ? 1 : timeWindow === 'Tomorrow' ? 1.1 : 
                     timeWindow === 'Next 3 days' ? 3.2 : 7.5; // Approximate for planning periods
    
    for (let i = 0; i < numOutlets; i++) {
      const frozenDemand = Math.round((Math.floor(Math.random() * 500) + 100) * multiplier);
      const chilledDemand = Math.round((Math.floor(Math.random() * 400) + 100) * multiplier);
      const dryDemand = Math.round((Math.floor(Math.random() * 250) + 50) * multiplier);
      const totalDemand = frozenDemand + chilledDemand + dryDemand;
      
      outlets.push({
        outlet: `BK_${(i + 1).toString().padStart(3, '0')}`,
        route: `Route ${String.fromCharCode(65 + (i % 3))}`,
        totalDemand,
        frozenDemand,
        chilledDemand,
        dryDemand,
      });
    }
    return outlets;
  }, [numOutlets, timeWindow]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h6 className="text-sm font-medium text-gray-600">Planning Period</h6>
        <Select value={timeWindow} onValueChange={onTimeWindowChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Time Window" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Today">Today</SelectItem>
            <SelectItem value="Tomorrow">Tomorrow</SelectItem>
            <SelectItem value="Next 3 days">Next 3 days</SelectItem>
            <SelectItem value="1 week">1 week</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Outlet</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Total Demand (kg)</TableHead>
              <TableHead>Frozen Demand (kg)</TableHead>
              <TableHead>Chilled Demand (kg)</TableHead>
              <TableHead>Dry Demand (kg)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{row.outlet}</TableCell>
                <TableCell>{row.route}</TableCell>
                <TableCell className="font-semibold">{row.totalDemand.toLocaleString()}</TableCell>
                <TableCell className="text-blue-600">{row.frozenDemand.toLocaleString()}</TableCell>
                <TableCell className="text-green-600">{row.chilledDemand.toLocaleString()}</TableCell>
                <TableCell className="text-orange-600">{row.dryDemand.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FleetDemandTable;
