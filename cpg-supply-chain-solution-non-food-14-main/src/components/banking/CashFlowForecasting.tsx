
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, BarChart3, Calendar } from 'lucide-react';

interface CashFlowForecastingProps {
  timeframe: string;
  region: string;
}

const CashFlowForecasting: React.FC<CashFlowForecastingProps> = ({ timeframe, region }) => {
  const [forecastModel, setForecastModel] = useState('ai-lstm');
  const [scenarioType, setScenarioType] = useState('base');

  // Mock forecast data with confidence intervals
  const forecastData = [
    { date: '2024-01-22', actual: 3100, forecast: 3050, upper: 3200, lower: 2900, confidence: 94 },
    { date: '2024-01-23', actual: null, forecast: 3180, upper: 3350, lower: 3010, confidence: 92 },
    { date: '2024-01-24', actual: null, forecast: 3250, upper: 3420, lower: 3080, confidence: 89 },
    { date: '2024-01-25', actual: null, forecast: 3120, upper: 3300, lower: 2940, confidence: 87 },
    { date: '2024-01-26', actual: null, forecast: 3350, upper: 3550, lower: 3150, confidence: 85 },
    { date: '2024-01-27', actual: null, forecast: 3280, upper: 3480, lower: 3080, confidence: 83 },
    { date: '2024-01-28', actual: null, forecast: 3150, upper: 3370, lower: 2930, confidence: 81 }
  ];

  const scenarioAnalysis = [
    { scenario: 'Base Case', cashPosition: '₹4,250 Cr', probability: '60%', impact: 'Neutral' },
    { scenario: 'Interest Rate +2%', cashPosition: '₹3,950 Cr', probability: '25%', impact: 'Negative' },
    { scenario: 'Economic Expansion', cashPosition: '₹4,680 Cr', probability: '15%', impact: 'Positive' }
  ];

  const factorsInfluencing = [
    { factor: 'Loan Repayments', impact: 'High', trend: '+12%', description: 'Seasonal uptick expected' },
    { factor: 'Interest Rate Environment', impact: 'Medium', trend: 'Stable', description: 'RBI policy unchanged' },
    { factor: 'Customer Deposits', impact: 'High', trend: '+8%', description: 'Festival season inflows' },
    { factor: 'Operational Expenses', impact: 'Medium', trend: '+3%', description: 'Regular growth pattern' }
  ];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <Select value={forecastModel} onValueChange={setForecastModel}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Forecast Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ai-lstm">AI-LSTM Model</SelectItem>
            <SelectItem value="arima">ARIMA Model</SelectItem>
            <SelectItem value="xgboost">XGBoost Model</SelectItem>
            <SelectItem value="historical">Historical Trend</SelectItem>
            <SelectItem value="seasonal">Seasonal Adjustment</SelectItem>
          </SelectContent>
        </Select>

        <Select value={scenarioType} onValueChange={setScenarioType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Scenario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="base">Base Case</SelectItem>
            <SelectItem value="optimistic">Optimistic</SelectItem>
            <SelectItem value="pessimistic">Pessimistic</SelectItem>
            <SelectItem value="stress">Stress Test</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="flex items-center space-x-2">
          <BarChart3 className="w-4 h-4" />
          <span>Run Forecast</span>
        </Button>
      </div>

      {/* Forecast Chart */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center justify-between">
            <span>7-Day Cash Flow Forecast</span>
            <Badge variant="outline" className="text-blue-700 border-blue-200">
              {forecastModel === 'ai-lstm' ? 'AI-LSTM' : 'Historical'} Model
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="upper" stroke="#93c5fd" strokeWidth={1} strokeDasharray="5,5" name="Upper Confidence" />
              <Line type="monotone" dataKey="lower" stroke="#93c5fd" strokeWidth={1} strokeDasharray="5,5" name="Lower Confidence" />
              <Line type="monotone" dataKey="forecast" stroke="#3b82f6" strokeWidth={3} name="Forecast" />
              <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Scenario Analysis and Influencing Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scenario Analysis */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Scenario Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scenarioAnalysis.map((scenario, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">{scenario.scenario}</div>
                    <div className="text-sm text-gray-500">Probability: {scenario.probability}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{scenario.cashPosition}</div>
                    <Badge 
                      variant="outline"
                      className={
                        scenario.impact === 'Positive' ? 'text-green-700 border-green-200' :
                        scenario.impact === 'Negative' ? 'text-red-700 border-red-200' :
                        'text-gray-700 border-gray-200'
                      }
                    >
                      {scenario.impact}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Influencing Factors */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Key Influencing Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {factorsInfluencing.map((factor, index) => (
                <div key={index} className="p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{factor.factor}</span>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline"
                        className={
                          factor.impact === 'High' ? 'text-red-700 border-red-200' :
                          'text-orange-700 border-orange-200'
                        }
                      >
                        {factor.impact} Impact
                      </Badge>
                      <span className="text-sm font-semibold text-blue-600">{factor.trend}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{factor.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CashFlowForecasting;
