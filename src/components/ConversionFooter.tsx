import { useState, useEffect } from "react";

interface ConversionFooterProps {
  userMode: 'buy' | 'sell';
  hasToggled: boolean;
}

export const ConversionFooter = ({ userMode, hasToggled }: ConversionFooterProps) => {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  // Show sticky bar after scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowStickyBar(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show role switcher after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRoleSwitcher(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  // Exit intent detection
  useEffect(() => {
    const hasSeenExitPopup = sessionStorage.getItem('hasSeenExitPopup');
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasSeenExitPopup) {
        setShowExitIntent(true);
        sessionStorage.setItem('hasSeenExitPopup', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const getStickyBarContent = () => {
    if (hasToggled) {
      return {
        text: "Join 2500+ successful matches",
        cta: "Get Started",
        color: "ai"
      };
    } else if (userMode === 'buy') {
      return {
        text: "23 properties match your criteria",
        cta: "View Matches",
        color: "buyer"
      };
    } else {
      return {
        text: "147 buyers looking in your area",
        cta: "List Now",
        color: "seller"
      };
    }
  };

  const getExitIntentContent = () => {
    if (userMode === 'buy') {
      return {
        title: "Wait! Get Exclusive Pre-Launch Prices",
        subtitle: "Be the first to know about new projects in Bangalore",
        cta: "Get Early Access"
      };
    } else {
      return {
        title: "Leaving? Get a Free Property Valuation",
        subtitle: "Know your property's market value in 2 minutes",
        cta: "Get Free Valuation"
      };
    }
  };

  const getRoleSwitcherContent = () => {
    if (userMode === 'buy') {
      return {
        text: "Thinking of selling your current home first?",
        cta: "Explore Selling",
        newMode: "sell" as const
      };
    } else {
      return {
        text: "Looking to upgrade after selling?",
        cta: "Find Your Next Home",
        newMode: "buy" as const
      };
    }
  };

  const stickyContent = getStickyBarContent();
  const exitContent = getExitIntentContent();
  const roleContent = getRoleSwitcherContent();

  return (
    <>
      {/* Sticky Bar */}
      {showStickyBar && (
        <div className={`
          fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300
          ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}
        `}>
          <div className={`
            p-4 text-white shadow-lg
            ${stickyContent.color === 'buyer' ? 'bg-buyer-gradient' : 
              stickyContent.color === 'seller' ? 'bg-seller-gradient' : 'bg-ai-gradient'}
          `}>
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex-1">
                <div className="font-semibold">{stickyContent.text}</div>
              </div>
              <div className="flex items-center gap-4">
                <button className="bg-white text-foreground px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                  {stickyContent.cta}
                </button>
                <button 
                  onClick={() => setShowStickyBar(false)}
                  className="text-white/80 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exit Intent Popup */}
      {showExitIntent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-elegant">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">{exitContent.title}</h3>
              <p className="text-muted-foreground">{exitContent.subtitle}</p>
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    alert("You're on the list! We'll contact you soon with exclusive offers.");
                    setShowExitIntent(false);
                  }}
                  className={`
                    w-full py-3 text-white font-semibold rounded-lg transition-colors
                    ${userMode === 'buy' ? 'bg-buyer-primary hover:bg-buyer-accent' : 'bg-seller-primary hover:bg-seller-accent'}
                  `}
                >
                  {exitContent.cta}
                </button>
                <button 
                  onClick={() => setShowExitIntent(false)}
                  className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  No, thanks
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Switcher Notification */}
      {showRoleSwitcher && !hasToggled && (
        <div className="fixed bottom-20 right-4 z-40 max-w-sm">
          <div className="bg-white rounded-xl p-4 shadow-elegant border border-border animate-slide-in-right">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-ai-gradient flex items-center justify-center text-sm">
                💡
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground mb-2">
                  {roleContent.text}
                </p>
                <div className="flex gap-2">
                  <button className={`
                    px-3 py-1 text-xs font-medium text-white rounded-md transition-colors
                    ${roleContent.newMode === 'buy' ? 'bg-buyer-primary hover:bg-buyer-accent' : 'bg-seller-primary hover:bg-seller-accent'}
                  `}>
                    {roleContent.cta}
                  </button>
                  <button 
                    onClick={() => setShowRoleSwitcher(false)}
                    className="px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">PropertyAI</h3>
              <p className="text-background/80 text-sm">
                AI-powered property matching for Bangalore's real estate market.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">For Buyers</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li>Search Properties</li>
                <li>New Projects</li>
                <li>Area Guides</li>
                <li>EMI Calculator</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">For Sellers</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li>List Property</li>
                <li>Property Valuation</li>
                <li>Market Insights</li>
                <li>Selling Tips</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/60">
            © 2024 PropertyAI. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};