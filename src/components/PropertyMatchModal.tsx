import { useState } from "react";
import { X, MapPin, Bed, Bath, Car, Heart, ExternalLink, Shield, TrendingUp, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface PropertyMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'buy' | 'sell';
}

export const PropertyMatchModal = ({ isOpen, onClose, mode }: PropertyMatchModalProps) => {
  const [activeMode, setActiveMode] = useState<'buy' | 'sell'>(mode);
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({
    budget: '',
    location: '',
    propertyType: '',
    bedrooms: '',
    priority: ''
  });

  const [properties] = useState([
    {
      id: 1,
      title: "Prestige Falcon City",
      price: "₹1.2 Cr",
      pricePerSqft: "₹8,300",
      location: "Kanakapura Road",
      bedrooms: 3,
      bathrooms: 3,
      parking: 2,
      sqft: "1,450",
      matchScore: 94,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop&crop=center",
      whyMatched: [
        "Within your budget range",
        "Near IT corridor (important to you)",
        "Has gym and swimming pool",
        "Ready to move"
      ],
      builderRating: 4.5,
      appreciation: "18% expected in 2 years"
    },
    {
      id: 2,
      title: "Godrej Splendour",
      price: "₹85L",
      pricePerSqft: "₹7,100",
      location: "Whitefield",
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      sqft: "1,200",
      matchScore: 89,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=250&fit=crop&crop=center",
      whyMatched: [
        "Great value for money",
        "Excellent connectivity",
        "Top-rated builder",
        "Metro connectivity coming"
      ],
      builderRating: 4.2,
      appreciation: "15% expected in 2 years"
    }
  ]);

  // Seller dashboard data
  const [interestedBuyers] = useState([
    {
      id: 1,
      type: "Verified IT Professional",
      matchScore: 91,
      budget: "₹1.2-1.5 Cr",
      timeline: "Immediate",
      lastActive: "2 hours ago",
      lookingFor: "3 BHK",
      preferredArea: "Your area"
    },
    {
      id: 2,
      type: "Investment Banker",
      matchScore: 87,
      budget: "₹1.0-1.4 Cr",
      timeline: "Within 30 days",
      lastActive: "5 hours ago",
      lookingFor: "2-3 BHK",
      preferredArea: "IT corridors"
    }
  ]);

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrioritySelection = (priority: string) => {
    setPreferences(prev => ({ ...prev, priority }));
    handleNext();
  };

  if (!isOpen) return null;

  const renderModeSelector = () => (
    <div className="text-center space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-3">AI Match Studio</h2>
        <p className="text-gray-600 text-lg">Your Personalized Property Journey Starts Here</p>
      </div>
      
      <div className="flex gap-6 justify-center">
        <button
          onClick={() => { setActiveMode('buy'); handleNext(); }}
          className={`flex items-center gap-3 px-10 py-6 rounded-2xl border-2 transition-all ${
            activeMode === 'buy' 
              ? 'border-blue-500 bg-blue-50 text-blue-700' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="text-3xl">🏠</span>
          <span className="font-semibold text-lg">I'm Buying</span>
        </button>
        <button
          onClick={() => { setActiveMode('sell'); handleNext(); }}
          className={`flex items-center gap-3 px-10 py-6 rounded-2xl border-2 transition-all ${
            activeMode === 'sell' 
              ? 'border-green-500 bg-green-50 text-green-700' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="text-3xl">💼</span>
          <span className="font-semibold text-lg">I'm Selling</span>
        </button>
      </div>
    </div>
  );

  const renderBuyerStep1 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-3">Let's find your perfect home</h3>
        <p className="text-gray-600 text-lg">What matters most to you?</p>
      </div>
      
      <div className="grid gap-6 max-w-2xl mx-auto">
        <button
          onClick={() => handlePrioritySelection('budget')}
          className="p-8 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">💰</div>
            <div>
              <h4 className="font-semibold text-lg">Budget is my priority</h4>
              <p className="text-gray-600">I want maximum value for my money</p>
            </div>
          </div>
        </button>
        
        <button
          onClick={() => handlePrioritySelection('location')}
          className="p-8 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">📍</div>
            <div>
              <h4 className="font-semibold text-lg">Location comes first</h4>
              <p className="text-gray-600">Connectivity and area are most important</p>
            </div>
          </div>
        </button>
        
        <button
          onClick={() => handlePrioritySelection('amenities')}
          className="p-8 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">🏊</div>
            <div>
              <h4 className="font-semibold text-lg">Size and amenities are key</h4>
              <p className="text-gray-600">I need specific features and space</p>
            </div>
          </div>
        </button>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  const renderBuyerStep2 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-3">Tell us more about your needs</h3>
        <p className="text-gray-600 text-lg">This helps us find perfect matches</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div>
          <Label htmlFor="budget" className="text-base font-medium">Budget Range</Label>
          <Input
            id="budget"
            placeholder="e.g., ₹80L - ₹1Cr"
            value={preferences.budget}
            onChange={(e) => handlePreferenceChange('budget', e.target.value)}
            className="mt-2 h-12"
          />
        </div>
        <div>
          <Label htmlFor="location" className="text-base font-medium">Preferred Area</Label>
          <Input
            id="location"
            placeholder="e.g., Whitefield, HSR"
            value={preferences.location}
            onChange={(e) => handlePreferenceChange('location', e.target.value)}
            className="mt-2 h-12"
          />
        </div>
        <div>
          <Label htmlFor="propertyType" className="text-base font-medium">Property Type</Label>
          <Input
            id="propertyType"
            placeholder="e.g., 2 BHK, 3 BHK"
            value={preferences.propertyType}
            onChange={(e) => handlePreferenceChange('propertyType', e.target.value)}
            className="mt-2 h-12"
          />
        </div>
        <div>
          <Label htmlFor="bedrooms" className="text-base font-medium">Bedrooms</Label>
          <Input
            id="bedrooms"
            placeholder="e.g., 2, 3"
            value={preferences.bedrooms}
            onChange={(e) => handlePreferenceChange('bedrooms', e.target.value)}
            className="mt-2 h-12"
          />
        </div>
      </div>
      
      <div className="text-center">
        <Button onClick={handleNext} className="px-8 py-3 text-lg">
          Find My Perfect Matches
        </Button>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  const renderBuyerResults = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-3">Your AI Matches</h3>
        <p className="text-gray-600 text-lg mb-4">Based on your preferences, I've found {properties.length} perfect matches</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">Sort by: Best Match</span>
        </div>
      </div>
      
      <div className="space-y-6 max-h-96 overflow-y-auto">
        {properties.map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex gap-6">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-xl mb-1">{property.title}</h4>
                      <p className="text-gray-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {property.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-2xl font-bold text-green-600">{property.price}</span>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {property.matchScore}% Match ⭐
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{property.pricePerSqft}/sqft</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      {property.bedrooms} BHK
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      {property.bathrooms} Bath
                    </span>
                    <span className="flex items-center gap-1">
                      <Car className="w-4 h-4" />
                      {property.parking} Parking
                    </span>
                    <span>{property.sqft} sqft</span>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h5 className="font-semibold text-blue-900 mb-2">Why AI Matched This:</h5>
                    <ul className="space-y-1">
                      {property.whyMatched.map((reason, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-blue-700">
                          <CheckCircle className="w-4 h-4" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Heart className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" className="flex-1">
                      Schedule Visit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex items-center justify-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  const renderSellerDashboard = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-3">Your Property Dashboard</h3>
        <p className="text-gray-600 text-lg">Professional insights for your property sale</p>
      </div>
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-3 gap-6 p-6 bg-gray-50 rounded-xl">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">89/100</div>
          <div className="text-sm text-gray-600">Property Score</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">147</div>
          <div className="text-sm text-gray-600">Interested Buyers</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">12</div>
          <div className="text-sm text-gray-600">Scheduled Visits</div>
        </div>
      </div>
      
      {/* Interested Buyers */}
      <div>
        <h4 className="font-semibold text-lg mb-4">Buyers Looking for Properties Like Yours</h4>
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {interestedBuyers.map((buyer) => (
            <Card key={buyer.id} className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-lg">{buyer.type}</span>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Match Score: {buyer.matchScore}% 🎯
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Looking for:</span> {buyer.lookingFor}
                      </div>
                      <div>
                        <span className="font-medium">Budget:</span> {buyer.budget} ✓
                      </div>
                      <div>
                        <span className="font-medium">Preferred:</span> {buyer.preferredArea} ✓
                      </div>
                      <div>
                        <span className="font-medium">Timeline:</span> {buyer.timeline}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      Last Active: {buyer.lastActive}
                    </div>
                  </div>
                  
                  <div className="flex gap-3 ml-4">
                    <Button size="sm" variant="outline">Connect</Button>
                    <Button size="sm">View Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Market Insights */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Your Property vs Market
        </h4>
        <div className="space-y-2">
          <div className="text-base">Your price: ₹1.35 Cr (₹9,300/sqft)</div>
          <div className="text-base">Area average: ₹1.28 Cr</div>
          <div className="text-green-700 font-medium bg-green-100 px-3 py-2 rounded-lg">
            Recommendation: "Priced well for quick sale"
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-auto shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">AI Match Studio</h2>
            {step > 0 && (
              <p className="text-gray-600">
                {activeMode === 'buy' ? 'Buyer Journey' : 'Seller Dashboard'}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-8">
          {step === 0 && renderModeSelector()}
          {activeMode === 'buy' && step === 1 && renderBuyerStep1()}
          {activeMode === 'buy' && step === 2 && renderBuyerStep2()}
          {activeMode === 'buy' && step === 3 && renderBuyerResults()}
          {activeMode === 'sell' && step === 1 && renderSellerDashboard()}
        </div>
      </div>
    </div>
  );
};