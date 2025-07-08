import { useState, useEffect } from "react";
import { Mic, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TrustSignals } from "./TrustSignals";
import { PropertyMatchModal } from "./PropertyMatchModal";
import heroImage from "@/assets/hero-image.jpg";

const aiQuestions = [
  "Which Bangalore area has best ROI under ₹1 Cr?",
  "Will property prices drop after elections?",
  "Compare Prestige vs Sobha for investment",
  "Should I buy now or wait 6 months?",
  "Best 3 BHK near IT parks with good schools?"
];

export const HeroSection = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  // Animate through questions
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentQuestion((prev) => (prev + 1) % aiQuestions.length);
        setIsTyping(true);
      }, 500);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/chat?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleServiceClick = (service: string) => {
    switch (service) {
      case 'find':
        setShowMatchModal(true);
        break;
      case 'market':
        navigate('/chat?context=market');
        break;
      case 'verify':
        navigate('/chat?context=verify');
        break;
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
        {/* AIBroker Brand */}
        <div className="text-center mb-8">
          <h1 className="text-5xl lg:text-7xl font-bold text-slate-800 mb-4">
            AI<span className="text-blue-600">Broker</span>
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            Your Real Estate Intelligence Partner
          </p>
        </div>

        {/* Dynamic Question Carousel */}
        <div className="text-center mb-8">
          <div className="h-16 flex items-center justify-center">
            <h2 className={`
              text-2xl lg:text-4xl font-semibold text-slate-700 transition-opacity duration-500
              ${isTyping ? 'opacity-100' : 'opacity-60'}
            `}>
              {aiQuestions[currentQuestion]}
              <span className="animate-pulse">|</span>
            </h2>
          </div>
        </div>

        {/* Universal AI Search Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
            <div className="relative bg-white rounded-2xl border-2 border-blue-200 shadow-xl p-2">
              <div className="flex items-center gap-4">
                <Search className="w-6 h-6 text-blue-600 ml-4" />
                <input
                  type="text"
                  placeholder="Ask AIBroker anything about real estate..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 text-lg px-2 py-4 border-0 outline-none bg-transparent"
                />
                <button 
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-200"
                >
                  Ask AIBroker
                </button>
                <Mic className="w-6 h-6 text-gray-400 mr-4 cursor-pointer hover:text-blue-600 transition" />
              </div>
            </div>
          </div>
        </div>

        {/* Service Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <button 
            onClick={() => handleServiceClick('find')}
            className="group bg-white rounded-xl p-6 border border-blue-200 hover:border-blue-400 transition duration-300 hover:shadow-lg"
          >
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold text-slate-700 group-hover:text-blue-600">Find/Sell Properties</h3>
            <p className="text-sm text-slate-500 mt-2">AI-powered property matching</p>
          </button>
          
          <button 
            onClick={() => handleServiceClick('market')}
            className="group bg-white rounded-xl p-6 border border-blue-200 hover:border-blue-400 transition duration-300 hover:shadow-lg"
          >
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-slate-700 group-hover:text-blue-600">Track Markets</h3>
            <p className="text-sm text-slate-500 mt-2">Real-time market intelligence</p>
          </button>
          
          <button 
            onClick={() => handleServiceClick('verify')}
            className="group bg-white rounded-xl p-6 border border-blue-200 hover:border-blue-400 transition duration-300 hover:shadow-lg"
          >
            <div className="text-3xl mb-3">✓</div>
            <h3 className="text-lg font-semibold text-slate-700 group-hover:text-blue-600">Verify Deals</h3>
            <p className="text-sm text-slate-500 mt-2">Smart deal analysis & validation</p>
          </button>
        </div>

        {/* AI Metrics */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100 max-w-4xl mx-auto">
          <h3 className="text-center text-2xl font-bold text-slate-800 mb-8">AIBroker Intelligence</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50,000+</div>
              <div className="text-sm text-slate-600">Properties Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">200+</div>
              <div className="text-sm text-slate-600">Micro-markets Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10M+</div>
              <div className="text-sm text-slate-600">Data Points Processed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">6hrs</div>
              <div className="text-sm text-slate-600">Update Frequency</div>
            </div>
          </div>
          <div className="text-center mt-6 text-sm text-slate-500">
            Powered by: Government Records • Builder Databases • Market Trends • News Analysis
          </div>
        </div>
      </div>
      
      {/* Property Match Modal */}
      <PropertyMatchModal 
        isOpen={showMatchModal}
        onClose={() => setShowMatchModal(false)}
        mode="buy"
      />
    </section>
  );
};