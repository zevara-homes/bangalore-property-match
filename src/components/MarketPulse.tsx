import { useState, useEffect } from "react";

const activities = [
  { type: "listing", text: "New 3BHK listed in HSR Layout", color: "seller" },
  { type: "inquiry", text: "Buyer from IT sector looking in Whitefield", color: "buyer" },
  { type: "interest", text: "2BHK in Sarjapur got 5 inquiries", color: "seller" },
  { type: "match", text: "Perfect match found for Koramangala villa", color: "ai" },
  { type: "inquiry", text: "Family searching 4BHK in Electronic City", color: "buyer" },
  { type: "listing", text: "Premium apartment listed in Indiranagar", color: "seller" },
  { type: "match", text: "AI matched buyer to dream home in 2 hours", color: "ai" },
  { type: "interest", text: "Luxury villa in Whitefield trending", color: "seller" },
  { type: "inquiry", text: "Young professional wants 2BHK near ORR", color: "buyer" },
  { type: "listing", text: "Ready-to-move 3BHK available in Marathahalli", color: "seller" }
];

export const MarketPulse = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleActivities, setVisibleActivities] = useState(activities.slice(0, 3));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const newVisible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % activities.length;
      newVisible.push(activities[index]);
    }
    setVisibleActivities(newVisible);
  }, [currentIndex]);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'buyer':
        return 'bg-buyer-secondary text-buyer-primary border-buyer-primary/20';
      case 'seller':
        return 'bg-seller-secondary text-seller-primary border-seller-primary/20';
      case 'ai':
        return 'bg-ai-secondary text-ai-primary border-ai-primary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'listing':
        return '🏢';
      case 'inquiry':
        return '🔍';
      case 'interest':
        return '❤️';
      case 'match':
        return '✨';
      default:
        return '📊';
    }
  };

  return (
    <section className="py-8 border-y border-border bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
            <div className="w-3 h-3 rounded-full bg-ai-primary animate-pulse-gentle" />
            Live Market Pulse
          </h3>
          <p className="text-sm text-muted-foreground">
            Real-time activity on our platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-3">
            {visibleActivities.map((activity, index) => (
              <div
                key={`${currentIndex}-${index}`}
                className={`
                  flex items-center gap-3 p-3 rounded-lg border transition-all duration-500
                  ${getColorClasses(activity.color)}
                  ${index === 0 ? 'animate-slide-in-right' : ''}
                `}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="text-lg">
                  {getIcon(activity.type)}
                </div>
                <div className="flex-1 text-sm font-medium">
                  {activity.text}
                </div>
                <div className="text-xs text-muted-foreground">
                  Just now
                </div>
              </div>
            ))}
          </div>

          {/* Activity stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-buyer-primary">23</div>
              <div className="text-xs text-muted-foreground">Active Searches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-seller-primary">15</div>
              <div className="text-xs text-muted-foreground">New Listings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-ai-primary">8</div>
              <div className="text-xs text-muted-foreground">AI Matches</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};