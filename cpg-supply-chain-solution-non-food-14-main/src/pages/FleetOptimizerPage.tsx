
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Truck, Package, MapPin, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import FleetDemandTable from '@/components/fleet/FleetDemandTable';
import FleetAllocationTable from '@/components/fleet/FleetAllocationTable';
import FleetKPICards from '@/components/fleet/FleetKPICards';
import FleetDemandChart from '@/components/fleet/FleetDemandChart';
import FleetDemandTrendChart from '@/components/fleet/FleetDemandTrendChart';
import FleetCategoryTrendChart from '@/components/fleet/FleetCategoryTrendChart';
import HistoricalRoutePerformance from '@/components/fleet/HistoricalRoutePerformance';
import { useToast } from '@/hooks/use-toast';

const FleetOptimizerPage = () => {
  const numOutlets = 6; // Fixed number of outlets
  const [timeWindow, setTimeWindow] = useState('Today');
  const [selectedOutlet, setSelectedOutlet] = useState('all');
  const [selectedRoute, setSelectedRoute] = useState('all');
  const { toast } = useToast();

  const handleSendPlan = () => {
    toast({
      title: "Plan Sent Successfully",
      description: "Fleet allocation plan has been sent to Logistics Head ✅",
    });
  };

  const handleNotifyDrivers = () => {
    toast({
      title: "Drivers Notified",
      description: "Driver notifications have been dispatched ✅",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
                🚛 Fleet Capacity Optimizer
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Logistics Planning
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Main Dashboard</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Description */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Fleet Capacity Optimizer for Fast Food Chain Deliveries</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-600">
              This simulator helps logistics teams:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Consolidate outlet demand by route</li>
                <li>Forecast demand & plan delivery loads</li>
                <li>Allocate trucks based on demand</li>
                <li>Recommend truck types and load plans</li>
                <li>Monitor key delivery KPIs</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <FleetKPICards numOutlets={numOutlets} />

        {/* Top Row - Trend Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>📈 Demand Forecast Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FleetDemandTrendChart 
                numOutlets={numOutlets} 
                selectedOutlet={selectedOutlet}
                selectedRoute={selectedRoute}
                onOutletChange={setSelectedOutlet}
                onRouteChange={setSelectedRoute}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>📊 Category Breakdown Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FleetCategoryTrendChart 
                numOutlets={numOutlets}
                selectedOutlet={selectedOutlet}
                selectedRoute={selectedRoute}
              />
            </CardContent>
          </Card>
        </div>

        {/* Demand Planning Table */}
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>📦 Demand Planning for the Outlets</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FleetDemandTable 
                numOutlets={numOutlets} 
                timeWindow={timeWindow}
                onTimeWindowChange={setTimeWindow}
              />
            </CardContent>
          </Card>
        </div>

        {/* Demand Chart */}
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>📈 Demand Planning by Route</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FleetDemandChart 
                numOutlets={numOutlets} 
                timeWindow={timeWindow}
              />
            </CardContent>
          </Card>
        </div>

        {/* Fleet Allocation */}
        <div className="mb-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5" />
                  <span>🚚 Recommended Fleet Allocation Plan</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button onClick={handleSendPlan} size="sm" className="flex items-center space-x-2">
                    <Package className="w-4 h-4" />
                    <span>📩 Send Plan to Logistics Head</span>
                  </Button>
                  <Button variant="outline" onClick={handleNotifyDrivers} size="sm" className="flex items-center space-x-2">
                    <Truck className="w-4 h-4" />
                    <span>📨 Notify Drivers</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <FleetAllocationTable numOutlets={numOutlets} />
            </CardContent>
          </Card>
        </div>

        {/* Historical Route Performance */}
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>📊 Historical Route Performance Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HistoricalRoutePerformance />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FleetOptimizerPage;
