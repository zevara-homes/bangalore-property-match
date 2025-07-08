import { HeroSection } from "@/components/HeroSection";
import { AIConversationDemo } from "@/components/AIConversationDemo";
import { SuccessStories } from "@/components/SuccessStories";
import { UseCaseShowcase } from "@/components/UseCaseShowcase";
import { DynamicMarketPulse } from "@/components/DynamicMarketPulse";
import { ConversionFooter } from "@/components/ConversionFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AIConversationDemo />
      <DynamicMarketPulse />
      <UseCaseShowcase />
      <SuccessStories />
      <ConversionFooter />
    </div>
  );
};

export default Index;
