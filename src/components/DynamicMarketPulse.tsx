import { useState, useEffect } from "react";

const areas = ['Whitefield', 'HSR Layout', 'Koramangala', 'Indiranagar', 'Sarjapur', 'Electronic City', 'Marathahalli'];

const liveQuestions = [
  "What's the rental yield in Indiranagar?",
  "Best builder for 3 BHK under ₹1.5 Cr?", 
  "Property tax calculation for ₹2 Cr villa?",
  "Should I invest in pre-launch or ready properties?",
  "Which area has best appreciation potential?",
  "How to verify builder's track record?",
  "Best time to buy property in Bangalore?",
  "Comparison between Prestige and Brigade properties",
  "Home loan options for ₹80L budget",
  "Is HSR Layout overpriced currently?"
];

const aiInsights = [
  "🔥 Trending: Sarjapur sees 34% more searches this week",
  "💡 Insight: Properties near Outer Ring Road up 12% YoY", 
  "⚡ Alert: New Metro line approved for Whitefield",
  "📈 Analysis: IT park proximity adds ₹500/sqft premium",
  "🏆 Winner: Electronic City leads in rental demand",
  "⚠️ Watch: Monsoon may affect construction timelines",
  "💎 Opportunity: Pre-launch prices 15% below market",
  "🎯 Prediction: Q4 will see 8% price adjustment"
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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentInsight, setCurrentInsight] = useState(0);
  const [activities, setActivities] = useState([
    generateActivity(),
    generateActivity(),
    generateActivity(),
    generateActivity(),
    generateActivity()
  ]);

  // Rotate live questions every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuestion((prev) => (prev + 1) % liveQuestions.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Rotate AI insights every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % aiInsights.length);
    }, 6000);
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
    <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-3">
            <div className="w-4 h-4 rounded-full bg-blue-600 animate-pulse-gentle" />
            AIBroker Intelligence Feed
          </h3>
          <p className="text-slate-600">
            Real-time Q&A stream and market intelligence
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Q&A Stream */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
            <h4 className="font-bold text-blue-600 mb-4 flex items-center gap-2">
              <span className="text-lg">💬</span> LIVE Q&A
            </h4>
            <div className="space-y-3">
              <div className="text-xs text-slate-500 border-b pb-2">Questions being asked now:</div>
              <div className="h-16 flex items-center">
                <p 
                  key={currentQuestion}
                  className="text-sm font-medium text-slate-700 animate-fade-in-up"
                >
                  "{liveQuestions[currentQuestion]}"
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>just now</span>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
            <h4 className="font-bold text-blue-600 mb-4 flex items-center gap-2">
              <span className="text-lg">🧠</span> AI INSIGHTS
            </h4>
            <div className="h-16 flex items-center">
              <p 
                key={currentInsight}
                className="text-sm font-medium text-slate-700 animate-fade-in-up"
              >
                {aiInsights[currentInsight]}
              </p>
            </div>
          </div>

          {/* Live Activity */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
            <h4 className="font-bold text-blue-600 mb-4 flex items-center gap-2">
              <span className="text-lg">⚡</span> LIVE ACTIVITY
            </h4>
            <div className="space-y-2 h-16 overflow-hidden">
              {activities.slice(0, 2).map((activity, index) => (
                <div 
                  key={activity.id}
                  className={`
                    flex justify-between text-xs
                    ${index === 0 ? 'animate-slide-in-right font-medium' : 'opacity-60'}
                  `}
                >
                  <span className="truncate">{activity.text}</span>
                  <span className="text-slate-500 ml-2">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-blue-200 max-w-4xl mx-auto">
          <div className="grid grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {Math.floor(Math.random() * 15) + 25}
              </div>
              <div className="text-xs text-slate-600">Questions Today</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {Math.floor(Math.random() * 8) + 12}
              </div>
              <div className="text-xs text-slate-600">AI Responses</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {Math.floor(Math.random() * 5) + 8}
              </div>
              <div className="text-xs text-slate-600">Market Updates</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {Math.floor(Math.random() * 3) + 5}
              </div>
              <div className="text-xs text-slate-600">Insights Generated</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};