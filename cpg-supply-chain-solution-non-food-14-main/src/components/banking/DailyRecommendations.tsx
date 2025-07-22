
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, AlertTriangle, Calendar, Users, Building2, Zap } from 'lucide-react';

interface DailyRecommendationsProps {
  timeframe: string;
  region: string;
}

const DailyRecommendations: React.FC<DailyRecommendationsProps> = ({ timeframe, region }) => {
  const [selectedDate, setSelectedDate] = useState('2024-01-22');
  
  // Malaysian salary cycle dates and holidays
  const malaysiaSalaryData = [
    { date: '2024-01-22', event: 'Government Salary (25th)', impact: 'High Inflow', amount: 'RM 450M' },
    { date: '2024-01-23', event: 'Chinese New Year Prep', impact: 'High Outflow', amount: 'RM 320M' },
    { date: '2024-01-24', event: 'Corporate Salary (Month-end)', impact: 'High Inflow', amount: 'RM 680M' },
    { date: '2024-01-25', event: 'Festive Bonus Payout', impact: 'High Outflow', amount: 'RM 280M' },
    { date: '2024-01-26', event: 'EPF Contribution Date', impact: 'Medium Outflow', amount: 'RM 150M' },
    { date: '2024-01-27', event: 'Weekend - Lower Activity', impact: 'Low Flow', amount: 'RM 50M' },
    { date: '2024-01-28', event: 'Week Start - Normal', impact: 'Medium Flow', amount: 'RM 180M' }
  ];

  const dailyRecommendations = [
    {
      date: '2024-01-22',
      netPosition: 'RM 2,450M',
      recommendation: 'Increase liquidity buffer',
      priority: 'High',
      reasoning: 'Government salary inflow + CNY cash demand spike expected',
      actions: [
        'Transfer RM 200M from investment portfolio',
        'Prepare additional RM 150M for ATM network',
        'Alert branch managers for extended hours'
      ],
      volatilityBuffer: 'RM 180M',
      riskLevel: 'Medium'
    },
    {
      date: '2024-01-23',
      netPosition: 'RM 2,100M',
      recommendation: 'Optimize branch allocation',
      priority: 'High',
      reasoning: 'CNY preparation - high cash withdrawal expected in Chinese-majority areas',
      actions: [
        'Redistribute RM 100M to Klang Valley branches',
        'Increase cash van frequency to Penang/Ipoh',
        'Monitor real-time ATM levels'
      ],
      volatilityBuffer: 'RM 220M',
      riskLevel: 'High'
    },
    {
      date: '2024-01-24',
      netPosition: 'RM 2,800M',
      recommendation: 'Invest surplus cash',
      priority: 'Medium',
      reasoning: 'Corporate salaries boost deposits, temporary surplus available',
      actions: [
        'Deploy RM 300M in overnight repo',
        'Consider 7-day BNM bills for RM 200M',
        'Maintain base liquidity at RM 2,300M'
      ],
      volatilityBuffer: 'RM 150M',
      riskLevel: 'Low'
    },
    {
      date: '2024-01-25',
      netPosition: 'RM 2,520M',
      recommendation: 'Standard operations',
      priority: 'Low',
      reasoning: 'Festive bonus outflows balanced by business deposits',
      actions: [
        'Maintain current allocation',
        'Monitor SME loan disbursement queue',
        'Prepare for weekend positioning'
      ],
      volatilityBuffer: 'RM 160M',
      riskLevel: 'Low'
    }
  ];

  const getCurrentRecommendation = () => {
    return dailyRecommendations.find(rec => rec.date === selectedDate) || dailyRecommendations[0];
  };

  const currentRec = getCurrentRecommendation();

  return (
    <div className="space-y-6">
      {/* Malaysian Context Banner */}
      <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Building2 className="w-8 h-8 text-red-600" />
            <div>
              <h3 className="text-lg font-semibold text-red-900">Malaysian Banking Context</h3>
              <p className="text-sm text-red-700">
                Incorporating Malaysian salary cycles, festive seasons (CNY, Hari Raya), BNM regulations, and regional cash flow patterns
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date Selection and Key Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Malaysian Salary & Event Calendar</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {malaysiaSalaryData.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedDate === item.date ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedDate(item.date)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-gray-600">{item.date}</div>
                    <div className="text-sm text-gray-900">{item.event}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="outline"
                      className={
                        item.impact.includes('High') ? 'text-red-700 border-red-200' :
                        item.impact.includes('Medium') ? 'text-orange-700 border-orange-200' :
                        'text-blue-700 border-blue-200'
                      }
                    >
                      {item.impact}
                    </Badge>
                    <span className="text-sm font-medium text-gray-900">{item.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <span>Regional Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm font-medium text-green-900">Klang Valley</div>
                <div className="text-xs text-green-700">85% corporate salaries, high ATM usage</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm font-medium text-blue-900">Northern Region</div>
                <div className="text-xs text-blue-700">Manufacturing payrolls, CNY high impact</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-sm font-medium text-orange-900">East Malaysia</div>
                <div className="text-xs text-orange-700">Oil & gas sector, commodity cycles</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Recommendation Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span>Daily Cash Flow Recommendation - {selectedDate}</span>
            </div>
            <Badge 
              variant="outline"
              className={
                currentRec.priority === 'High' ? 'text-red-700 border-red-200' :
                currentRec.priority === 'Medium' ? 'text-orange-700 border-orange-200' :
                'text-green-700 border-green-200'
              }
            >
              {currentRec.priority} Priority
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Key Metrics */}
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Net Cash Position</div>
                <div className="text-2xl font-bold text-gray-900">{currentRec.netPosition}</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600">Volatility Buffer</div>
                <div className="text-2xl font-bold text-blue-900">{currentRec.volatilityBuffer}</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="text-sm text-yellow-700">Risk Level</div>
                <div className="text-lg font-bold text-yellow-900">{currentRec.riskLevel}</div>
              </div>
            </div>

            {/* Recommendation & Reasoning */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Primary Recommendation</h4>
                <p className="text-gray-700 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  {currentRec.recommendation}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Reasoning</h4>
                <p className="text-gray-700">{currentRec.reasoning}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Required Actions</h4>
                <div className="space-y-2">
                  {currentRec.actions.map((action, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-700">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>7-Day Cash Flow Requirements Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3">Date</th>
                  <th className="text-left py-2 px-3">Net Position</th>
                  <th className="text-left py-2 px-3">Buffer Required</th>
                  <th className="text-left py-2 px-3">Risk Level</th>
                  <th className="text-left py-2 px-3">Primary Action</th>
                </tr>
              </thead>
              <tbody>
                {dailyRecommendations.map((rec, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium">{rec.date}</td>
                    <td className="py-2 px-3">{rec.netPosition}</td>
                    <td className="py-2 px-3">{rec.volatilityBuffer}</td>
                    <td className="py-2 px-3">
                      <Badge 
                        variant="outline" 
                        className={
                          rec.riskLevel === 'High' ? 'text-red-700 border-red-200' :
                          rec.riskLevel === 'Medium' ? 'text-orange-700 border-orange-200' :
                          'text-green-700 border-green-200'
                        }
                      >
                        {rec.riskLevel}
                      </Badge>
                    </td>
                    <td className="py-2 px-3 text-xs">{rec.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyRecommendations;
