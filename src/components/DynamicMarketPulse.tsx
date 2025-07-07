import { useState, useEffect } from "react";

const areas = ['Whitefield', 'HSR Layout', 'Koramangala', 'Indiranagar', 'Sarjapur', 'Electronic City', 'Marathahalli'];
const propertyTypes = ['2 BHK', '3 BHK', '4 BHK', 'Penthouse', 'Villa'];
const priceRanges = ['₹60L-₹80L', '₹80L-₹1.2Cr', '₹1.2Cr-₹1.8Cr', '₹1.8Cr-₹2.5Cr'];

const trendingAreas = [
  "Whitefield ↑12% buyer interest this week",
  "HSR Layout: 45 new listings today",
  "Sarjapur: Avg closing time 22 days",
  "Koramangala: Premium demand up 8%",
  "Electronic City: New projects launching"
];

const priceInsights = [
  "3 BHK in Koramangala: ₹1.8-2.2 Cr range",
  "Best ROI: Hennur Road properties up 18% YoY",
  "2 BHK in Whitefield: Average ₹85L-1.1Cr",
  "HSR Layout penthouses: ₹2.5Cr+ demand high",
  "Sarjapur villas trending: ₹1.5-2Cr range"
];

const generateActivity = () => {
  const actions = [
    "viewing properties in",
    "got inquiries in",
    "listed near",
    "showing interest in",
    "scheduled visits in"
  ];
  
  const sources = [
    "Buyer from Mumbai",
    "IT Professional",
    "Investment Banker",
    "New 2 BHK",
    "4 BHK penthouse",
    "3 BHK apartment",
    "Family from Delhi"
  ];
  
  const randomSource = sources[Math.floor(Math.random() * sources.length)];
  const randomAction = actions[Math.floor(Math.random() * actions.length)];
  const randomArea = areas[Math.floor(Math.random() * areas.length)];
  
  const timeAgo = ["just now", "2 mins ago", "5 mins ago", "8 mins ago"][Math.floor(Math.random() * 4)];
  
  return {
    text: `${randomSource} ${randomAction} ${randomArea}`,
    time: timeAgo,
    id: Math.random()
  };
};

export const DynamicMarketPulse = () => {
  const [currentTrending, setCurrentTrending] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [activities, setActivities] = useState([
    generateActivity(),
    generateActivity(),
    generateActivity(),
    generateActivity(),
    generateActivity()
  ]);

  // Rotate trending areas every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTrending((prev) => (prev + 1) % trendingAreas.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Rotate price insights every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPrice((prev) => (prev + 1) % priceInsights.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Add new activity every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActivities((prev) => {
        const newActivity = generateActivity();
        const updated = [newActivity, ...prev];
        return updated.slice(0, 5); // Keep only latest 5
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 border-y border-border bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
            <div className="w-3 h-3 rounded-full bg-ai-primary animate-pulse-gentle" />
            Bangalore Real Estate Today
          </h3>
          <p className="text-sm text-muted-foreground">
            Live market insights and activity
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trending Areas */}
          <div className="bg-white rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-sm text-muted-foreground mb-2">
              🔥 TOP TRENDING
            </h4>
            <div className="h-12 flex items-center">
              <p 
                key={currentTrending}
                className="text-sm font-medium text-seller-primary animate-fade-in-up"
              >
                {trendingAreas[currentTrending]}
              </p>
            </div>
          </div>

          {/* Price Insights */}
          <div className="bg-white rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-sm text-muted-foreground mb-2">
              💰 PRICE INSIGHTS
            </h4>
            <div className="h-12 flex items-center">
              <p 
                key={currentPrice}
                className="text-sm font-medium text-buyer-primary animate-fade-in-up"
              >
                {priceInsights[currentPrice]}
              </p>
            </div>
          </div>

          {/* Live Activity */}
          <div className="bg-white rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-sm text-muted-foreground mb-2">
              ⚡ LIVE ACTIVITY
            </h4>
            <div className="space-y-2 h-12 overflow-hidden">
              {activities.slice(0, 2).map((activity, index) => (
                <div 
                  key={activity.id}
                  className={`
                    flex justify-between text-xs
                    ${index === 0 ? 'animate-slide-in-right' : 'opacity-60'}
                  `}
                >
                  <span className="font-medium truncate">{activity.text}</span>
                  <span className="text-muted-foreground ml-2">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-buyer-primary">
              {Math.floor(Math.random() * 10) + 20}
            </div>
            <div className="text-xs text-muted-foreground">Active Searches</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-seller-primary">
              {Math.floor(Math.random() * 8) + 12}
            </div>
            <div className="text-xs text-muted-foreground">New Listings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-ai-primary">
              {Math.floor(Math.random() * 5) + 6}
            </div>
            <div className="text-xs text-muted-foreground">AI Matches</div>
          </div>
        </div>
      </div>
    </section>
  );
};