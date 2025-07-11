import React from 'react';
import { TrendingUp, MapPin, Heart, Calendar, Star, ArrowRight } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

export const PersonalizedDashboard: React.FC = () => {
  const { userPreferences, isAuthenticated } = useUser();

  if (!isAuthenticated || !userPreferences.personalityType) {
    return null;
  }

  const getPersonalityInsights = () => {
    switch (userPreferences.personalityType) {
      case 'Strategic Tech Investor':
        return {
          areas: [
            { name: 'Whitefield', match: 94, reason: 'Your tribe lives here' },
            { name: 'Sarjapur', match: 89, reason: 'Best value for money' },
            { name: 'HSR Layout', match: 85, reason: 'Lifestyle heaven' }
          ],
          insights: [
            'IT professionals love these 3 areas',
            'Average appreciation: 18% annually',
            'Strong rental yields: 4.2%'
          ]
        };
      case 'First-Time Home Buyer':
        return {
          areas: [
            { name: 'Electronic City', match: 92, reason: 'Affordable & well-connected' },
            { name: 'Hennur', match: 88, reason: 'Growing infrastructure' },
            { name: 'Hoskote', match: 85, reason: 'Best value in your budget' }
          ],
          insights: [
            'Perfect starter areas within budget',
            'Good connectivity to main city',
            'Family-friendly neighborhoods'
          ]
        };
      default:
        return {
          areas: [
            { name: 'Koramangala', match: 90, reason: 'Premium lifestyle' },
            { name: 'Indiranagar', match: 87, reason: 'Central location' },
            { name: 'Jayanagar', match: 85, reason: 'Traditional charm' }
          ],
          insights: [
            'Matches your preferences perfectly',
            'Strong appreciation potential',
            'Excellent amenities'
          ]
        };
    }
  };

  const { areas, insights } = getPersonalityInsights();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-8 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="text-primary-foreground/90">You're a "{userPreferences.personalityType}"</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-2xl font-bold">47</div>
            <div className="text-sm">Perfect matches found</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm">Exclusive pre-launches</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm">Motivated sellers</div>
          </div>
        </div>
      </div>

      {/* Market Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-4">
          <TrendingUp className="w-6 h-6 text-blue-600 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-2">📊 Market Alert</h3>
            <p className="text-blue-800 mb-3">
              Properties in your budget range dropped 3% this week in Whitefield
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View Opportunities →
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Your Perfect Match Areas */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Your Perfect Match Areas
          </h3>
          
          <div className="space-y-4">
            {areas.map((area, index) => (
              <div key={area.name} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{area.name}</h4>
                  <div className="flex items-center gap-2">
                    <div className="text-primary font-bold">{area.match}%</div>
                    <div className="text-sm text-gray-500">match</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{area.reason}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${area.match}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 bg-primary text-white rounded-lg py-3 font-medium hover:bg-primary/90 flex items-center justify-center gap-2">
            Explore My Matches
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Saved Searches & Recommendations */}
        <div className="space-y-6">
          {/* Saved Searches */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Your Saved Searches
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">3 BHK in Whitefield under ₹1.5Cr</div>
                  <div className="text-xs text-gray-500">17 new properties</div>
                </div>
                <button className="text-primary text-sm font-medium">View</button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">Investment properties with 4%+ yield</div>
                  <div className="text-xs text-gray-500">8 new properties</div>
                </div>
                <button className="text-primary text-sm font-medium">View</button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold mb-4">Continue Your Journey</h3>
            
            <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm">🤖</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm">Ask AI</div>
                  <div className="text-xs text-gray-500">Get instant answers</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
              </button>
              
              <button className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm">🏠</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm">Browse Matches</div>
                  <div className="text-xs text-gray-500">View curated properties</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
              </button>
              
              <button className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm">Schedule Visits</div>
                  <div className="text-xs text-gray-500">Book property tours</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="mt-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          AIBroker Insights for You
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-700">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};