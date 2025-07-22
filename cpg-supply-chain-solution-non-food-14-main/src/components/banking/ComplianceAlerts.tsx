
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, FileText, Clock, CheckCircle } from 'lucide-react';

const ComplianceAlerts: React.FC = () => {
  const complianceAlerts = [
    {
      id: 1,
      type: 'RBI Compliance',
      severity: 'High',
      title: 'LCR Below Regulatory Buffer',
      description: 'Liquidity Coverage Ratio in Western region approaching minimum threshold of 100%',
      currentValue: '105%',
      threshold: '110%',
      deadline: '2 hours',
      status: 'active',
      actions: ['Increase HQLA holdings', 'Reduce net cash outflows']
    },
    {
      id: 2,
      type: 'AML/CFT',
      severity: 'Medium',
      title: 'Unusual Transaction Pattern',
      description: 'Large cash transactions detected outside normal business hours',
      amount: '₹50 Cr',
      threshold: '₹25 Cr',
      deadline: '4 hours',
      status: 'review',
      actions: ['Customer verification required', 'Transaction source validation']
    },
    {
      id: 3,
      type: 'Internal Policy',
      severity: 'Low',
      title: 'Cash Position Variance',
      description: 'Daily cash position variance exceeds internal risk limits',
      currentValue: '15%',
      threshold: '10%',
      deadline: '1 day',
      status: 'acknowledged',
      actions: ['Review forecasting model', 'Adjust risk parameters']
    },
    {
      id: 4,
      type: 'IFRS Reporting',
      severity: 'Medium',
      title: 'Fair Value Measurement',
      description: 'Treasury instruments require updated fair value assessment',
      deadline: '6 hours',
      status: 'pending',
      actions: ['Update market valuations', 'Review accounting entries']
    }
  ];

  const riskMetrics = [
    { metric: 'Liquidity Coverage Ratio', value: '142%', status: 'good', min: '100%' },
    { metric: 'Net Stable Funding Ratio', value: '118%', status: 'good', min: '100%' },
    { metric: 'Leverage Ratio', value: '4.2%', status: 'good', min: '3.0%' },
    { metric: 'Credit Risk Exposure', value: '8.5%', status: 'moderate', max: '10.0%' }
  ];

  const recentActions = [
    {
      time: '2 hours ago',
      action: 'LCR compliance report submitted to RBI',
      user: 'Risk Team',
      status: 'completed'
    },
    {
      time: '4 hours ago',
      action: 'AML alert investigation completed',
      user: 'Compliance Officer',
      status: 'completed'
    },
    {
      time: '6 hours ago',
      action: 'Internal audit findings addressed',
      user: 'Operations Team',
      status: 'completed'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-700 border-red-200';
      case 'Medium': return 'text-orange-700 border-orange-200';
      case 'Low': return 'text-blue-700 border-blue-200';
      default: return 'text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-700 border-red-200';
      case 'review': return 'text-orange-700 border-orange-200';
      case 'pending': return 'text-blue-700 border-blue-200';
      case 'acknowledged': return 'text-green-700 border-green-200';
      default: return 'text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {riskMetrics.map((metric, index) => (
          <Card key={index} className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Shield className={`w-5 h-5 ${
                  metric.status === 'good' ? 'text-green-600' : 
                  metric.status === 'moderate' ? 'text-orange-600' : 
                  'text-red-600'
                }`} />
                <Badge 
                  variant="outline"
                  className={
                    metric.status === 'good' ? 'text-green-700 border-green-200' :
                    metric.status === 'moderate' ? 'text-orange-700 border-orange-200' :
                    'text-red-700 border-red-200'
                  }
                >
                  {metric.status}
                </Badge>
              </div>
              <div className="font-semibold text-gray-900 text-lg">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.metric}</div>
              <div className="text-xs text-gray-500 mt-1">
                Min: {metric.min || metric.max}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Compliance Alerts */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span>Active Compliance Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceAlerts.map((alert) => (
              <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge variant="outline" className="text-gray-700 border-gray-200">
                        {alert.type}
                      </Badge>
                      <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(alert.status)}>
                        {alert.status}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{alert.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                    
                    {alert.currentValue && (
                      <div className="text-sm text-gray-500">
                        Current: {alert.currentValue} | Threshold: {alert.threshold}
                      </div>
                    )}
                    {alert.amount && (
                      <div className="text-sm text-gray-500">
                        Amount: {alert.amount} | Limit: {alert.threshold}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                      <Clock className="w-4 h-4" />
                      <span>{alert.deadline}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Recommended Actions:</div>
                  <div className="flex flex-wrap gap-2">
                    {alert.actions.map((action, index) => (
                      <Badge key={index} variant="outline" className="text-blue-700 border-blue-200">
                        {action}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Actions */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Recent Compliance Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActions.map((action, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-900">{action.action}</div>
                    <div className="text-sm text-gray-500">by {action.user}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">{action.time}</div>
                  <Badge variant="outline" className="text-green-700 border-green-200">
                    {action.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceAlerts;
