import { useState, useEffect } from "react";

const conversations = [
  {
    user: "I have ₹80L budget, where should I invest?",
    ai: "Based on current trends, here are top 3 areas:",
    results: [
      "Sarjapur Road: 18% appreciation expected + Metro by 2026",
      "Electronic City Phase 2: IT expansion driving demand", 
      "Hennur: Undervalued with upcoming infrastructure"
    ],
    action: "View Properties in These Areas"
  },
  {
    user: "Is Prestige Falcon City worth ₹1.2 Cr?",
    ai: "Let me analyze this property for you:",
    results: [
      "✓ Builder Rating: 4.5/5 (Strong track record)",
      "⚠ Price: 8% above area average",
      "✓ Appreciation: Expected 15% in 2 years",
      "✓ Amenities: Above average for this range"
    ],
    action: "See Detailed Analysis"
  },
  {
    user: "Which area gives best rental yield?",
    ai: "Top 3 areas with 4.5%+ yields:",
    results: [
      "Marathahalli: 4.8% yield, IT corridor proximity",
      "Whitefield: 4.6% yield, strong rental demand",
      "HSR Layout: 4.5% yield, premium tenant base"
    ],
    action: "Explore Rental Properties"
  }
];

export const AIConversationDemo = () => {
  const [currentConversation, setCurrentConversation] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentConversation((prev) => (prev + 1) % conversations.length);
        setIsVisible(true);
      }, 500);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const conversation = conversations[currentConversation];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            See AIBroker in Action
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Watch real conversations and intelligent responses
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Chat Interface */}
          <div className={`
            bg-white rounded-2xl shadow-2xl border border-blue-200 p-6 transition-opacity duration-500
            ${isVisible ? 'opacity-100' : 'opacity-60'}
          `}>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">AIBroker Assistant</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-slate-500">Online</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-xs">
                  <p className="text-sm">{conversation.user}</p>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex justify-start">
                <div className="bg-gray-100 text-slate-800 rounded-2xl rounded-bl-md px-4 py-3 max-w-sm">
                  <p className="text-sm font-medium mb-2">{conversation.ai}</p>
                  <div className="space-y-1">
                    {conversation.results.map((result, index) => (
                      <div key={index} className="text-xs bg-white rounded-lg p-2 border">
                        {result}
                      </div>
                    ))}
                  </div>
                  <button className="mt-3 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700 transition">
                    {conversation.action}
                  </button>
                </div>
              </div>

              {/* Typing Indicator */}
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Results Visualization */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-200 p-6">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Live Analysis Results
              </h4>
              
              {/* Property Cards or Analysis Cards */}
              <div className="space-y-3">
                {conversation.results.map((result, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-700">{result}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                            High Confidence
                          </div>
                          <div className="text-xs text-blue-600">View Details →</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
              <h4 className="font-semibold mb-3">💡 AI Insight</h4>
              <p className="text-sm opacity-90">
                This recommendation is based on analyzing 10,000+ similar queries, 
                current market trends, and verified transaction data.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition duration-200 shadow-lg hover:shadow-xl">
            Try AIBroker Now
          </button>
        </div>
      </div>
    </section>
  );
};