
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FleetDemandChartProps {
  numOutlets: number;
  timeWindow: string;
}

const FleetDemandChart = ({ numOutlets, timeWindow }: FleetDemandChartProps) => {
  const chartData = useMemo(() => {
    const routeData = { A: { frozen: 0, chilled: 0, dry: 0 }, B: { frozen: 0, chilled: 0, dry: 0 }, C: { frozen: 0, chilled: 0, dry: 0 } };
    const multiplier = timeWindow === 'Today' ? 1 : timeWindow === 'Tomorrow' ? 1.1 : 
                     timeWindow === 'Next 3 days' ? 3.2 : 7.5;
    
    for (let i = 0; i < numOutlets; i++) {
      const route = String.fromCharCode(65 + (i % 3)) as 'A' | 'B' | 'C';
      const frozen = Math.floor(Math.random() * 500) + 100;
      const chilled = Math.floor(Math.random() * 400) + 100;
      const dry = Math.floor(Math.random() * 250) + 50;
      
      routeData[route].frozen += Math.round(frozen * multiplier);
      routeData[route].chilled += Math.round(chilled * multiplier);
      routeData[route].dry += Math.round(dry * multiplier);
    }
    
    return [
      { route: 'Route A', frozen: routeData.A.frozen, chilled: routeData.A.chilled, dry: routeData.A.dry },
      { route: 'Route B', frozen: routeData.B.frozen, chilled: routeData.B.chilled, dry: routeData.B.dry },
      { route: 'Route C', frozen: routeData.C.frozen, chilled: routeData.C.chilled, dry: routeData.C.dry },
    ];
  }, [numOutlets, timeWindow]);

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="route" />
          <YAxis label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="frozen" fill="#93C5FD" name="Frozen" />
          <Bar dataKey="chilled" fill="#86EFAC" name="Chilled" />
          <Bar dataKey="dry" fill="#FDE68A" name="Dry" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FleetDemandChart;
