import { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { SuccessStories } from "@/components/SuccessStories";
import { HowItWorks } from "@/components/HowItWorks";
import { DynamicMarketPulse } from "@/components/DynamicMarketPulse";
import { ConversionFooter } from "@/components/ConversionFooter";

const Index = () => {
  const [userMode, setUserMode] = useState<'buy' | 'sell'>('buy');
  const [hasToggled, setHasToggled] = useState(false);

  useEffect(() => {
    // Track if user has toggled between modes
    const originalMode = sessionStorage.getItem('preferredMode') || 'buy';
    if (userMode !== originalMode) {
      setHasToggled(true);
    }
  }, [userMode]);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <DynamicMarketPulse />
      <SuccessStories />
      <HowItWorks />
      <ConversionFooter userMode={userMode} hasToggled={hasToggled} />
    </div>
  );
};

export default Index;
