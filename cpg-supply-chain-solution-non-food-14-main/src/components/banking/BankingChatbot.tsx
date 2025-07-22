
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Bot, User, TrendingUp, AlertTriangle, DollarSign, Calendar } from 'lucide-react';

const BankingChatbot: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m HLB-Bot, your AI assistant for Hong Leong Bank cash flow analysis. I can help with Malaysian banking insights, 7-day forecasts, and recommendations. How can I assist you today?',
      timestamp: '10:30 AM'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickActions = [
    { label: 'Today\'s Cash Position', icon: DollarSign, query: 'What is today\'s net cash position in Malaysian context?' },
    { label: '7-Day Cash Forecast', icon: Calendar, query: 'Provide 7-day cash requirements forecast for Hong Leong Bank' },
    { label: 'CNY Impact Analysis', icon: TrendingUp, query: 'Analyze Chinese New Year impact on cash flows' },
    { label: 'BNM Compliance Check', icon: AlertTriangle, query: 'Check BNM regulatory compliance status' }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const newBotMessage = {
        id: messages.length + 2,
        type: 'bot' as const,
        content: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newBotMessage]);
    }, 1000);
  };

  const generateBotResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('cash position') || lowerQuery.includes('net cash') || lowerQuery.includes('malaysian')) {
      return 'Hong Leong Bank\'s current net cash position is RM 4,250M, up 12.5% from yesterday. This increase is driven by government salary inflows (+RM 450M) and reduced loan disbursements (-RM 180M). LCR stands at 142%, well above BNM\'s 100% minimum requirement. Regional breakdown: Klang Valley (RM 1,800M), Northern Region (RM 950M), Southern Region (RM 780M), East Coast (RM 420M), East Malaysia (RM 300M).';
    }
    
    if (lowerQuery.includes('7-day') || lowerQuery.includes('7 day') || lowerQuery.includes('weekly forecast') || lowerQuery.includes('forecast')) {
      return '7-Day Cash Requirements Forecast for Hong Leong Bank:\n\nDay 1 (Today): RM 4,250M - High priority due to CNY preparation\nDay 2: RM 3,950M - Expected CNY cash withdrawals peak\nDay 3: RM 4,180M - Corporate salary inflows balance outflows\nDay 4: RM 4,320M - Post-festive deposit recovery\nDay 5: RM 4,100M - Normal business operations\nDay 6-7: RM 3,800M - Weekend lower activity\n\nKey Actions Required:\n• Increase ATM cash by RM 200M in Chinese-majority areas\n• Prepare RM 150M volatility buffer for festive period\n• Monitor Penang, Ipoh, and KL branches closely\n• Coordinate with BNM for any emergency liquidity needs';
    }
    
    if (lowerQuery.includes('cny') || lowerQuery.includes('chinese new year') || lowerQuery.includes('festive')) {
      return 'Chinese New Year Impact Analysis for Hong Leong Bank:\n\nCash Outflow Surge: +35% in traditional Chinese areas (Penang, Ipoh, KL Chinatown)\nATM Withdrawals: Expected +250% increase in RM50 & RM100 denominations\nBranch Traffic: Peak hours 10AM-2PM, 8PM-10PM\nRegional Impact: Northern Region (+45%), Klang Valley (+30%), Others (+15%)\n\nRecommendations:\n• Deploy additional RM 180M to high-impact branches\n• Extend banking hours at 15 key locations\n• Increase cash van frequency by 40%\n• Monitor real-time ATM levels via HLB Connect\n• Coordinate with security for safe cash transport';
    }
    
    if (lowerQuery.includes('bnm') || lowerQuery.includes('compliance') || lowerQuery.includes('regulatory')) {
      return 'BNM Regulatory Compliance Status for Hong Leong Bank:\n\n✅ Liquidity Coverage Ratio: 142% (Requirement: 100%)\n✅ Net Stable Funding Ratio: 118% (Requirement: 100%)\n✅ Capital Adequacy Ratio: 16.8% (Requirement: 8%)\n⚠️ Large Exposure Limits: 22% (Threshold: 25% - monitoring required)\n✅ Reserve Requirement: 2.0% maintained with BNM\n\nUpcoming Requirements:\n• Climate Risk Stress Testing (Q2 2024)\n• Enhanced IT Risk Management Framework\n• Updated AML/CFT procedures\n\nRecommendation: Maintain current liquidity buffers and prepare documentation for upcoming BNM inspections.';
    }

    if (lowerQuery.includes('salary') || lowerQuery.includes('government') || lowerQuery.includes('payroll')) {
      return 'Malaysian Salary Cycle Impact on HLB Cash Flows:\n\nGovernment Sector (25th of month): RM 450M average inflow\nCorporate Sector (Month-end): RM 680M average inflow\nSME/Manufacturing (15th & Month-end): RM 320M total\nGLC/Statutory Bodies (27th-28th): RM 280M inflow\n\nRegional Patterns:\n• Putrajaya/Cyberjaya: Government heavy (+RM 120M)\n• KLCC/Bangsar: Corporate concentration (+RM 200M)\n• Shah Alam/Subang: Manufacturing payrolls (+RM 90M)\n• Johor: Cross-border worker patterns unique\n\nNext 7 days actions:\n• Position RM 150M extra liquidity for month-end surge\n• Coordinate with HR departments of major corporate clients\n• Prepare for EPF contribution processing (RM 180M outflow expected)';
    }
    
    return 'I can help you with Hong Leong Bank\'s cash flow analysis in the Malaysian context. Try asking about:\n\n• 7-day cash requirements and forecasts\n• Chinese New Year or festive season impact\n• BNM regulatory compliance status\n• Government and corporate salary cycle effects\n• Regional cash flow patterns across Malaysia\n• ATM and branch cash optimization\n• Inter-bank liquidity management\n\nFor example: "What are the cash requirements for next 7 days?" or "How will CNY affect our Penang branches?"';
  };

  const handleQuickAction = (query: string) => {
    setInputMessage(query);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleQuickAction(action.query)}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <action.icon className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-gray-900">{action.label}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chat Interface */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Bot className="w-5 h-5 text-red-600" />
            <span>HLB-Bot - Hong Leong Bank AI Assistant</span>
            <Badge variant="outline" className="text-green-700 border-green-200">Malaysian Context</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Messages */}
          <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white text-gray-900 shadow-sm border border-gray-200'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && <Bot className="w-4 h-4 mt-1 text-red-600" />}
                    {message.type === 'user' && <User className="w-4 h-4 mt-1 text-white" />}
                    <div>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-red-200' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about Malaysian cash flows, 7-day forecasts, CNY impact, BNM compliance..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Button onClick={handleSendMessage} className="px-4 bg-red-600 hover:bg-red-700">
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Malaysian-Specific Suggested Queries */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Malaysian Banking Queries:</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => handleQuickAction('What are the cash requirements for next 7 days considering Malaysian salary cycles?')}>
                7-day requirements forecast
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => handleQuickAction('How will Hari Raya impact our cash flows across Malaysian regions?')}>
                Festive season impact
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => handleQuickAction('Optimize cash allocation between Klang Valley and East Malaysia branches')}>
                Regional optimization
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankingChatbot;
