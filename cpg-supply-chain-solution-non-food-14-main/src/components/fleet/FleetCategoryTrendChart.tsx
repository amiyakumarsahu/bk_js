
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FleetCategoryTrendChartProps {
  numOutlets: number;
  selectedOutlet: string;
  selectedRoute: string;
}

const FleetCategoryTrendChart = ({ numOutlets, selectedOutlet, selectedRoute }: FleetCategoryTrendChartProps) => {
  const chartData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return days.map(day => {
      let frozenDemand = 0;
      let chilledDemand = 0;
      let dryDemand = 0;
      
      for (let i = 0; i < numOutlets; i++) {
        const outlet = `BK_${(i + 1).toString().padStart(3, '0')}`;
        const route = `Route ${String.fromCharCode(65 + (i % 3))}`;
        
        // Filter by outlet and route
        if (selectedOutlet !== 'all' && outlet !== selectedOutlet) continue;
        if (selectedRoute !== 'all' && route !== selectedRoute) continue;
        
        const dayMultiplier = day === 'Fri' || day === 'Sat' ? 1.3 : day === 'Sun' ? 0.8 : 1.0;
        
        frozenDemand += Math.round((Math.floor(Math.random() * 300) + 100) * dayMultiplier);
        chilledDemand += Math.round((Math.floor(Math.random() * 250) + 80) * dayMultiplier);
        dryDemand += Math.round((Math.floor(Math.random() * 200) + 50) * dayMultiplier);
      }
      
      return {
        day,
        frozen: frozenDemand,
        chilled: chilledDemand,
        dry: dryDemand,
      };
    });
  }, [numOutlets, selectedOutlet, selectedRoute]);

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis label={{ value: 'Demand (kg)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="frozen" 
            stroke="#93C5FD" 
            strokeWidth={2}
            dot={{ fill: '#93C5FD', strokeWidth: 2, r: 4 }}
            name="Frozen"
          />
          <Line 
            type="monotone" 
            dataKey="chilled" 
            stroke="#86EFAC" 
            strokeWidth={2}
            dot={{ fill: '#86EFAC', strokeWidth: 2, r: 4 }}
            name="Chilled"
          />
          <Line 
            type="monotone" 
            dataKey="dry" 
            stroke="#FDE68A" 
            strokeWidth={2}
            dot={{ fill: '#FDE68A', strokeWidth: 2, r: 4 }}
            name="Dry"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FleetCategoryTrendChart;
