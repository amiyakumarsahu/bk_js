
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User, ExternalLink } from 'lucide-react';

interface SapAction {
  type: string;
  material?: string;
  quantity?: number;
  orderValue?: string;
  materials?: string[];
  adjustment?: string;
}

interface Message {
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  sapAction?: SapAction;
}

const SupplyPlanningChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: 'Hello! I can help you with supply planning questions. Ask me about inventory levels, demand forecasts, or SAP integration.',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: botResponse.content,
        timestamp: new Date(),
        sapAction: botResponse.sapAction
      }]);
      setIsLoading(false);
    }, 1500);
  };

  const generateBotResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('beef') || lowerQuery.includes('patties')) {
      return {
        content: 'Beef patties are currently at critical level (2,400 units vs 2,800 required). I recommend placing an urgent order for 1,000 units. Would you like me to initiate a SAP purchase order?',
        sapAction: {
          type: 'purchase_order',
          material: 'Beef Patties',
          quantity: 1000,
          orderValue: '$2,400'
        }
      };
    } else if (lowerQuery.includes('spoilage') || lowerQuery.includes('waste')) {
      return {
        content: 'Current spoilage rate is 3.8%, down from 4.3% last week. Vegetables show highest spoilage at 35%. Consider reducing vegetable order quantities by 15% and increasing delivery frequency.',
        sapAction: null
      };
    } else if (lowerQuery.includes('forecast') || lowerQuery.includes('demand')) {
      return {
        content: 'This week\'s demand forecast shows 15% increase on Friday-Saturday. Current accuracy is 94.2%. I suggest increasing weekend inventory by 200 beef patties and 300 buns.',
        sapAction: {
          type: 'forecast_adjustment',
          materials: ['Beef Patties', 'Buns'],
          adjustment: '+15%'
        }
      };
    } else {
      return {
        content: 'I can help you with inventory levels, demand forecasting, spoilage analysis, and SAP integration. Try asking about specific materials or supply planning strategies.',
        sapAction: null
      };
    }
  };

  const handleSapAction = (action: SapAction) => {
    console.log('Initiating SAP action:', action);
    // In real implementation, this would trigger SAP integration
    setMessages(prev => [...prev, {
      type: 'bot',
      content: `SAP integration initiated. ${action.type === 'purchase_order' ? 'Purchase order' : 'Forecast adjustment'} request sent to SAP system. Reference ID: SAP-${Date.now()}`,
      timestamp: new Date()
    }]);
  };

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2 text-sm">
          <MessageCircle className="w-4 h-4 text-blue-600" />
          <span>Supply Planning Assistant</span>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            SAP Connected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-3 mb-3">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-2 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <div className="flex items-start space-x-2">
                  {message.type === 'bot' && <Bot className="w-4 h-4 mt-0.5" />}
                  {message.type === 'user' && <User className="w-4 h-4 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-xs">{message.content}</p>
                    {message.sapAction && (
                      <div className="mt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
                          onClick={() => handleSapAction(message.sapAction!)}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Execute in SAP
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about inventory, forecasts, or orders..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="text-xs"
          />
          <Button size="sm" onClick={handleSendMessage} disabled={isLoading}>
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplyPlanningChatbot;
