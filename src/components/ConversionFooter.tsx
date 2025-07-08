import { useState, useEffect } from "react";
import { X, Crown, Check, Zap, Target, FileText } from "lucide-react";

export const ConversionFooter = () => {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [showProTeaser, setShowProTeaser] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) setShowProTeaser(true);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <>
      {/* AIBroker Pro Teaser */}
      {showProTeaser && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-2xl animate-slide-in-right">
            <button onClick={() => setShowProTeaser(false)} className="absolute top-2 right-2 text-white/80 hover:text-white">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5" />
              <h3 className="font-bold">AIBroker Pro</h3>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center gap-2"><Check className="w-3 h-3" /><span>Unlimited AI queries</span></div>
              <div className="flex items-center gap-2"><Check className="w-3 h-3" /><span>Custom market alerts</span></div>
              <div className="flex items-center gap-2"><Check className="w-3 h-3" /><span>Detailed property reports</span></div>
            </div>
            <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
              Start Free Trial
            </button>
          </div>
        </div>
      )}

      {/* Exit Intent */}
      {showExitIntent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Wait! Unlock AIBroker Pro</h3>
              <p className="text-slate-600">Get unlimited AI insights and premium features</p>
              <button 
                onClick={() => setShowExitIntent(false)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Start Free Trial
              </button>
              <button onClick={() => setShowExitIntent(false)} className="w-full py-3 text-slate-500">
                No, thanks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">AIBroker Pro</h2>
            <p className="text-xl text-slate-300 mb-8">Unlock Full Intelligence</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 text-slate-300">
                <Check className="w-5 h-5 text-green-400" />
                <span>Unlimited AI queries</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Check className="w-5 h-5 text-green-400" />
                <span>Custom market alerts</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Check className="w-5 h-5 text-green-400" />
                <span>Detailed reports</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Check className="w-5 h-5 text-green-400" />
                <span>Direct builder connections</span>
              </div>
            </div>
            <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition">
              Start Free Trial
            </button>
          </div>
          <div className="text-center text-slate-500 text-sm">
            © 2024 AIBroker. Your Real Estate Intelligence Partner.
          </div>
        </div>
      </footer>
    </>
  );
};