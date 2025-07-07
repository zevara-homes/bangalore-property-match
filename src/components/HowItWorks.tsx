import { useState } from "react";

export const HowItWorks = () => {
  const [hoveredPath, setHoveredPath] = useState<'buyer' | 'seller' | null>(null);

  const buyerSteps = [
    {
      title: "Share Your Dream Home Criteria",
      description: "Tell us your location, budget, and preferences",
      icon: "🏠"
    },
    {
      title: "AI Analyzes 1000+ Properties",
      description: "Our AI scans verified new projects and listings",
      icon: "🤖"
    },
    {
      title: "Get Matched & Schedule Visits",
      description: "Receive curated matches and book instant visits",
      icon: "📅"
    }
  ];

  const sellerSteps = [
    {
      title: "List Your Property Details",
      description: "Upload photos and property information",
      icon: "📝"
    },
    {
      title: "AI Finds Qualified Buyers",
      description: "Smart matching with verified, serious buyers",
      icon: "🎯"
    },
    {
      title: "Get Offers & Close Deals",
      description: "Receive genuine offers and complete transactions",
      icon: "🤝"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform creates perfect matches between buyers and sellers
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Interactive Timeline */}
          <div className="relative">
            {/* Central AI Hub */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-24 h-24 rounded-full bg-ai-gradient flex items-center justify-center shadow-ai">
                <div className="text-2xl">🧠</div>
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-ai-primary whitespace-nowrap">
                AI Matching
              </div>
            </div>

            {/* Buyer Path (Top) */}
            <div 
              className={`
                relative transition-all duration-300 transform
                ${hoveredPath === 'buyer' ? 'scale-105' : hoveredPath === 'seller' ? 'scale-95 opacity-50' : ''}
              `}
              onMouseEnter={() => setHoveredPath('buyer')}
              onMouseLeave={() => setHoveredPath(null)}
            >
              <div className="flex justify-center mb-8">
                <div className="bg-buyer-secondary rounded-full px-6 py-2 border border-buyer-primary/20">
                  <span className="text-buyer-primary font-semibold">For Buyers</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {buyerSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="relative">
                      <div className="w-16 h-16 mx-auto rounded-full bg-buyer-gradient flex items-center justify-center text-2xl shadow-buyer mb-4">
                        {step.icon}
                      </div>
                      {index < buyerSteps.length - 1 && (
                        <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-buyer-primary/30" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-buyer-primary">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Buyer to AI connection line */}
              <div className="absolute bottom-0 left-1/2 w-0.5 h-16 bg-buyer-primary/50 transform -translate-x-1/2" />
            </div>

            {/* Seller Path (Bottom) */}
            <div 
              className={`
                relative transition-all duration-300 transform
                ${hoveredPath === 'seller' ? 'scale-105' : hoveredPath === 'buyer' ? 'scale-95 opacity-50' : ''}
              `}
              onMouseEnter={() => setHoveredPath('seller')}
              onMouseLeave={() => setHoveredPath(null)}
            >
              {/* Seller from AI connection line */}
              <div className="absolute top-0 left-1/2 w-0.5 h-16 bg-seller-primary/50 transform -translate-x-1/2" />
              
              <div className="flex justify-center mt-16 mb-8">
                <div className="bg-seller-secondary rounded-full px-6 py-2 border border-seller-primary/20">
                  <span className="text-seller-primary font-semibold">For Sellers</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sellerSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="relative">
                      <div className="w-16 h-16 mx-auto rounded-full bg-seller-gradient flex items-center justify-center text-2xl shadow-seller mb-4">
                        {step.icon}
                      </div>
                      {index < sellerSteps.length - 1 && (
                        <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-seller-primary/30" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-seller-primary">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};