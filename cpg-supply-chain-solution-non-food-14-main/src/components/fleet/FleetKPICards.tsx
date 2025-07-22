
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, DollarSign, TrendingUp, MapPin, BarChart3 } from 'lucide-react';

interface FleetKPICardsProps {
  numOutlets: number;
}

const FleetKPICards = ({ numOutlets }: FleetKPICardsProps) => {
  const kpiData = useMemo(() => {
    // Calculate fleet composition (small, medium, large trucks)
    const smallTrucks = Math.ceil(numOutlets * 0.3);
    const mediumTrucks = Math.ceil(numOutlets * 0.5);
    const largeTrucks = Math.ceil(numOutlets * 0.2);
    const totalFleetSize = smallTrucks + mediumTrucks + largeTrucks;
    
    // Calculate average load factor per route (3 routes: A, B, C)
    const avgLoadFactorPerRoute = 65 + Math.random() * 25; // 65-90%
    
    // Calculate average delivery cost per route
    const avgDeliveryCostPerRoute = 120 + Math.random() * 50; // RM 120-170 per route
    
    // Calculate average distance per route
    const avgDistancePerRoute = (numOutlets * (Math.random() * 20 + 10)) / 3; // Total distance divided by 3 routes
    
    // Calculate average outlets per route
    const avgOutletsPerRoute = numOutlets / 3;
    
    // Calculate drop density (outlets per km)
    const dropDensity = avgOutletsPerRoute / avgDistancePerRoute;
    
    return {
      totalFleetSize,
      smallTrucks,
      mediumTrucks,
      largeTrucks,
      avgLoadFactorPerRoute: Math.round(avgLoadFactorPerRoute * 10) / 10,
      avgDeliveryCostPerRoute: Math.round(avgDeliveryCostPerRoute),
      avgDistancePerRoute: Math.round(avgDistancePerRoute),
      avgOutletsPerRoute: Math.round(avgOutletsPerRoute * 10) / 10,
      dropDensity: Math.round(dropDensity * 100) / 100,
    };
  }, [numOutlets]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">🚛 Total Fleet Size</CardTitle>
          <Truck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.totalFleetSize}</div>
          <p className="text-xs text-muted-foreground">
            S:{kpiData.smallTrucks} M:{kpiData.mediumTrucks} L:{kpiData.largeTrucks}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">📦 Avg Load Factor</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.avgLoadFactorPerRoute}%</div>
          <p className="text-xs text-muted-foreground">Per route</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">💸 Avg Delivery Cost</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">RM {kpiData.avgDeliveryCostPerRoute}</div>
          <p className="text-xs text-muted-foreground">Per route</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">🛣️ Avg Distance</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.avgDistancePerRoute} km</div>
          <p className="text-xs text-muted-foreground">Per route</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">📍 Avg Outlets</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.avgOutletsPerRoute}</div>
          <p className="text-xs text-muted-foreground">Per route</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">📊 Drop Density</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.dropDensity}</div>
          <p className="text-xs text-muted-foreground">Outlets per km</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FleetKPICards;
