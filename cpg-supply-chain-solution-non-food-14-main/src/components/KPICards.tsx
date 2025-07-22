
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

const KPICards = () => {
  const kpis = [
    {
      title: "Supply Efficiency",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      status: "good",
      description: "Stock availability vs demand"
    },
    {
      title: "Spoilage Rate",
      value: "3.8%",
      change: "-0.5%",
      trend: "down",
      status: "good",
      description: "Waste reduction this week"
    },
    {
      title: "Delivery Efficiency",
      value: "96.7%",
      change: "+1.2%",
      trend: "up",
      status: "excellent",
      description: "On-time deliveries"
    },
    {
      title: "Cost Optimization",
      value: "$12.4K",
      change: "-$2.1K",
      trend: "down",
      status: "excellent",
      description: "Weekly savings achieved"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-50 text-green-700 border-green-200';
      case 'good': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'warning': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="w-4 h-4 text-green-600" /> : 
      <TrendingDown className="w-4 h-4 text-green-600" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
              {getTrendIcon(kpi.trend)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600 font-medium">{kpi.change}</span>
                <Badge variant="outline" className={getStatusColor(kpi.status)}>
                  {kpi.status}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">{kpi.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KPICards;
