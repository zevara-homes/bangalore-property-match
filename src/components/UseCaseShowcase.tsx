import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const useCases = [
  {
    title: "First-Time Buyer",
    avatar: "👨‍💼",
    question: "Explain home loan process for ₹60L property",
    preview: "Here's your step-by-step guide with required documents, eligibility criteria, and bank recommendations...",
    category: "Learning",
    bgColor: "from-blue-500 to-blue-600"
  },
  {
    title: "Smart Investor", 
    avatar: "📈",
    question: "Which area gives best rental yield?",
    preview: "Top 3 areas with 4.5%+ yields: Marathahalli (4.8%), Whitefield (4.6%), HSR Layout (4.5%)...",
    category: "Investment",
    bgColor: "from-green-500 to-green-600"
  },
  {
    title: "Property Seller",
    avatar: "🏠",
    question: "Is this good time to sell in HSR?",
    preview: "Market analysis shows HSR Layout has 15% more buyer activity this quarter, with average sale time of 35 days...",
    category: "Selling",
    bgColor: "from-purple-500 to-purple-600"
  },
  {
    title: "NRI Investor",
    avatar: "🌏",
    question: "Properties with rental guarantee?",
    preview: "17 verified projects offer rental guarantee: Brigade Cornerstone (7% assured), Prestige Lakeside (6.5%)...",
    category: "NRI Services",
    bgColor: "from-orange-500 to-orange-600"
  },
  {
    title: "Tech Professional",
    avatar: "💻",
    question: "Best areas near tech parks under ₹1.2Cr?",
    preview: "Based on commute analysis: Marathahalli (15 min to multiple parks), Whitefield (tech hub center)...",
    category: "Lifestyle",
    bgColor: "from-indigo-500 to-indigo-600"
  },
  {
    title: "Family Seeker",
    avatar: "👨‍👩‍👧‍👦",
    question: "3 BHK with good schools and hospitals nearby?",
    preview: "Top family-friendly areas: Koramangala (excellent schools), Indiranagar (premium healthcare access)...",
    category: "Family",
    bgColor: "from-pink-500 to-pink-600"
  }
];

export const UseCaseShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % useCases.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + useCases.length) % useCases.length);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % useCases.length;
      cards.push(useCases[index]);
    }
    return cards;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            How People Use AIBroker
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            From first-time buyers to seasoned investors, see how AIBroker helps everyone make smarter property decisions
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition duration-200"
            >
              <ChevronLeft className="w-6 h-6 text-blue-600" />
            </button>
            
            <div className="flex gap-2">
              {useCases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition duration-200 ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={nextSlide}
              className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition duration-200"
            >
              <ChevronRight className="w-6 h-6 text-blue-600" />
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleCards().map((useCase, index) => (
              <div 
                key={`${currentIndex}-${index}`}
                className="group bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition duration-300 animate-fade-in-up"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${useCase.bgColor} p-6 text-white`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{useCase.avatar}</div>
                    <div>
                      <h3 className="font-bold text-lg">{useCase.title}</h3>
                      <div className="text-sm opacity-90 bg-white/20 px-2 py-1 rounded-full w-fit">
                        {useCase.category}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-slate-600 mb-2">Question:</div>
                    <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-blue-500">
                      <p className="text-slate-700 font-medium">{useCase.question}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-semibold text-slate-600 mb-2">AIBroker Response:</div>
                    <p className="text-sm text-slate-600 leading-relaxed">{useCase.preview}</p>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200 group-hover:bg-blue-700">
                    Ask Similar Question
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Ready to Get Your Questions Answered?
              </h3>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                Join thousands of smart property seekers who trust AIBroker for intelligent real estate guidance
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition duration-200 shadow-lg hover:shadow-xl">
                Start Your Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};