
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, MapPin, Truck, Package, BarChart3, Warehouse, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import SupplyPlanningDashboard from '@/components/SupplyPlanningDashboard';
import RepurchaseTool from '@/components/RepurchaseTool';
import RoutePlanningDashboard from '@/components/RoutePlanningDashboard';
import KPICards from '@/components/KPICards';

const Index = () => {
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('north');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
                BK Analytics
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Live Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/banking">
                <Button variant="outline" className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Banking Dashboard</span>
                </Button>
              </Link>
              <Link to="/warehouse">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Warehouse className="w-4 h-4" />
                  <span>Warehouse Manager</span>
                </Button>
              </Link>
              <Link to="/fleet">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Truck className="w-4 h-4" />
                  <span>Fleet Optimizer</span>
                </Button>
              </Link>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north">North Region</SelectItem>
                  <SelectItem value="south">South Region</SelectItem>
                  <SelectItem value="east">East Region</SelectItem>
                  <SelectItem value="west">West Region</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Store" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stores</SelectItem>
                  <SelectItem value="store1">Store BK001</SelectItem>
                  <SelectItem value="store2">Store BK002</SelectItem>
                  <SelectItem value="store3">Store BK003</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Overview */}
        <KPICards />

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="supply" className="mt-8">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="supply" className="flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span>Supply Planning</span>
            </TabsTrigger>
            <TabsTrigger value="repurchase" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Repurchase Tool</span>
            </TabsTrigger>
            <TabsTrigger value="routing" className="flex items-center space-x-2">
              <Truck className="w-4 h-4" />
              <span>Route Planning</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="supply" className="mt-6">
            <SupplyPlanningDashboard selectedStore={selectedStore} selectedRegion={selectedRegion} />
          </TabsContent>

          <TabsContent value="repurchase" className="mt-6">
            <RepurchaseTool selectedStore={selectedStore} selectedRegion={selectedRegion} />
          </TabsContent>

          <TabsContent value="routing" className="mt-6">
            <RoutePlanningDashboard selectedStore={selectedStore} selectedRegion={selectedRegion} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
