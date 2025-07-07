import { useState, useEffect } from "react";
import { ModeToggle } from "./ModeToggle";
import { SearchWidget } from "./SearchWidget";
import { TrustSignals } from "./TrustSignals";
import heroImage from "@/assets/hero-image.jpg";

export const HeroSection = () => {
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');
  
  // Save mode preference
  useEffect(() => {
    sessionStorage.setItem('preferredMode', mode);
  }, [mode]);

  const getHeadlineData = () => {
    return {
      main: "AI Matches You to Bangalore's Perfect Properties in Minutes",
      sub: mode === 'buy' 
        ? "Skip the endless search. Get matched to verified new projects instantly"
        : "Get 3X more qualified buyers with AI-powered matching",
      cta: mode === 'buy' ? "Find My Dream Home" : "List My Property"
    };
  };

  const { main, sub, cta } = getHeadlineData();

  return (
    <section className={`
      min-h-screen relative overflow-hidden transition-all duration-500
      ${mode === 'buy' ? 'buyer-theme' : 'seller-theme'}
    `}>
      {/* Dynamic background gradient */}
      <div className={`
        absolute inset-0 opacity-5 transition-all duration-500
        ${mode === 'buy' ? 'bg-buyer-gradient' : 'bg-seller-gradient'}
      `} />
      
      <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
        {/* Mode Toggle */}
        <ModeToggle onModeChange={setMode} currentMode={mode} />
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                {main}
              </h1>
              <p className="text-xl text-muted-foreground animate-mode-switch">
                {sub}
              </p>
            </div>
            
            {/* Search Widget */}
            <SearchWidget mode={mode} />
            
            {/* Primary CTA */}
            <button 
              className={`
                w-full lg:w-auto px-8 py-4 text-lg font-semibold rounded-xl
                text-white shadow-lg transition-all duration-300 hover:scale-105
                ${mode === 'buy' 
                  ? 'bg-buyer-gradient shadow-buyer hover:shadow-buyer/50' 
                  : 'bg-seller-gradient shadow-seller hover:shadow-seller/50'
                }
              `}
              onClick={() => {
                // Track conversion by mode - will be added with analytics
                console.log('CTA clicked:', { mode, cta });
              }}
            >
              {cta}
            </button>
          </div>
          
          {/* Right Visual */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={heroImage} 
                alt="Bangalore Properties" 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay with AI elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent">
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white">
                    <div className={`
                      w-3 h-3 rounded-full animate-pulse-gentle
                      ${mode === 'buy' ? 'bg-buyer-primary' : 'bg-seller-primary'}
                    `} />
                    <span className="text-sm font-medium">
                      {mode === 'buy' ? 'AI matching properties...' : 'AI finding buyers...'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating success metrics */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-elegant">
              <div className="text-center">
                <div className={`
                  text-2xl font-bold
                  ${mode === 'buy' ? 'text-buyer-primary' : 'text-seller-primary'}
                `}>
                  {mode === 'buy' ? '15 Days' : '45 Days'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {mode === 'buy' ? 'Avg Match Time' : 'Avg Sale Time'}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trust Signals */}
        <TrustSignals mode={mode} />
      </div>
    </section>
  );
};