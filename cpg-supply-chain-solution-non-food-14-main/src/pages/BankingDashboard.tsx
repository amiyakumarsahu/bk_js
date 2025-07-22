
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, BarChart3, PieChart, MapPin, MessageSquare, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import CashFlowOverview from '@/components/banking/CashFlowOverview';
import CashFlowForecasting from '@/components/banking/CashFlowForecasting';
import CashPositionBreakdown from '@/components/banking/CashPositionBreakdown';
import InflowOutflowAnalysis from '@/components/banking/InflowOutflowAnalysis';
import BankingChatbot from '@/components/banking/BankingChatbot';
import ComplianceAlerts from '@/components/banking/ComplianceAlerts';
import DailyRecommendations from '@/components/banking/DailyRecommendations';

const BankingDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('daily');
  const [selectedRegion, setSelectedRegion] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg font-bold text-xl">
                Hong Leong Bank - Cash Flow Management
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Live Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Main Dashboard</span>
                </Button>
              </Link>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="klang-valley">Klang Valley</SelectItem>
                  <SelectItem value="northern">Northern Region</SelectItem>
                  <SelectItem value="southern">Southern Region</SelectItem>
                  <SelectItem value="east-coast">East Coast</SelectItem>
                  <SelectItem value="east-malaysia">East Malaysia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white shadow-sm">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Daily Recs</span>
            </TabsTrigger>
            <TabsTrigger value="forecasting" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Forecasting</span>
            </TabsTrigger>
            <TabsTrigger value="position" className="flex items-center space-x-2">
              <PieChart className="w-4 h-4" />
              <span>Cash Position</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Flow Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>AI Insights</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Compliance</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <CashFlowOverview timeframe={selectedTimeframe} region={selectedRegion} />
          </TabsContent>

          <TabsContent value="recommendations">
            <DailyRecommendations timeframe={selectedTimeframe} region={selectedRegion} />
          </TabsContent>

          <TabsContent value="forecasting">
            <CashFlowForecasting timeframe={selectedTimeframe} region={selectedRegion} />
          </TabsContent>

          <TabsContent value="position">
            <CashPositionBreakdown timeframe={selectedTimeframe} region={selectedRegion} />
          </TabsContent>

          <TabsContent value="analysis">
            <InflowOutflowAnalysis timeframe={selectedTimeframe} region={selectedRegion} />
          </TabsContent>

          <TabsContent value="insights">
            <BankingChatbot />
          </TabsContent>

          <TabsContent value="compliance">
            <ComplianceAlerts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BankingDashboard;
