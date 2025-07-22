
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Route, Plus, Trash2, Navigation, TrendingDown } from 'lucide-react';

const BangaloreRouteMap = () => {
  const [deliveryPoints, setDeliveryPoints] = useState([
    { id: 1, name: 'BK Koramangala', address: 'Koramangala 4th Block', lat: 12.9352, lng: 77.6245, demand: 850 },
    { id: 2, name: 'BK Indiranagar', address: 'Indiranagar 100 Feet Road', lat: 12.9719, lng: 77.6412, demand: 720 },
    { id: 3, name: 'BK Whitefield', address: 'Whitefield Main Road', lat: 12.9698, lng: 77.7500, demand: 950 }
  ]);

  const [sourceLocation] = useState({
    name: 'RDC Bangalore',
    address: 'Bommasandra Industrial Area',
    lat: 12.8058,
    lng: 77.6736
  });

  const [optimizedRoute, setOptimizedRoute] = useState(null);

  const optimizeRoute = () => {
    // Simulate route optimization
    const route = {
      totalDistance: 45.2,
      totalTime: 135,
      fuelCost: 280,
      savings: {
        distance: 12.3,
        time: 35,
        fuel: 85
      },
      sequence: [
        { ...sourceLocation, order: 0 },
        { ...deliveryPoints[0], order: 1, eta: '09:30 AM' },
        { ...deliveryPoints[1], order: 2, eta: '10:15 AM' },
        { ...deliveryPoints[2], order: 3, eta: '11:00 AM' }
      ]
    };
    setOptimizedRoute(route);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>Bangalore Route Optimization</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Map Placeholder */}
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300 mb-4">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Interactive Bangalore Map</p>
              <p className="text-xs text-gray-400">Source: RDC Bommasandra → Multiple BK Outlets</p>
            </div>
          </div>

          {/* Route Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Source Location</h4>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">{sourceLocation.name}</p>
                    <p className="text-xs text-gray-600">{sourceLocation.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-sm">Delivery Points</h4>
                <Button size="sm" variant="outline">
                  <Plus className="w-3 h-3 mr-1" />
                  Add Point
                </Button>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {deliveryPoints.map((point) => (
                  <div key={point.id} className="bg-orange-50 p-2 rounded border border-orange-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-xs">{point.name}</p>
                        <p className="text-xs text-gray-600">{point.address}</p>
                        <p className="text-xs text-orange-600">{point.demand} units</p>
                      </div>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button onClick={optimizeRoute} className="w-full bg-blue-600 hover:bg-blue-700">
            <Route className="w-4 h-4 mr-2" />
            Optimize Route
          </Button>
        </CardContent>
      </Card>

      {optimizedRoute && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Navigation className="w-5 h-5 text-green-600" />
              <span>Optimized Route Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Savings Summary */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-xs text-green-700">Distance Saved</p>
                    <p className="font-bold text-green-800">{optimizedRoute.savings.distance} km</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-xs text-blue-700">Time Saved</p>
                    <p className="font-bold text-blue-800">{optimizedRoute.savings.time} min</p>
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-orange-600" />
                  <div>
                    <p className="text-xs text-orange-700">Fuel Saved</p>
                    <p className="font-bold text-orange-800">₹{optimizedRoute.savings.fuel}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Route Sequence */}
            <div>
              <h4 className="font-semibold text-sm mb-2">Optimized Sequence</h4>
              <div className="space-y-2">
                {optimizedRoute.sequence.map((stop, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                    <Badge variant="outline" className="w-8 h-6 justify-center">
                      {index + 1}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{stop.name}</p>
                      <p className="text-xs text-gray-600">{stop.address}</p>
                    </div>
                    {stop.eta && (
                      <Badge className="bg-blue-100 text-blue-800">
                        {stop.eta}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Total Route:</strong> {optimizedRoute.totalDistance} km • {optimizedRoute.totalTime} min • ₹{optimizedRoute.fuelCost} fuel cost
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BangaloreRouteMap;
