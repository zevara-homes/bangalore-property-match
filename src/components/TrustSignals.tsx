import { useState, useEffect } from "react";

interface TrustSignalsProps {
  mode: 'buy' | 'sell';
}

export const TrustSignals = ({ mode }: TrustSignalsProps) => {
  const [counters, setCounters] = useState({
    users: 0,
    transactions: 0,
    timeMetric: 0
  });

  const getData = () => {
    if (mode === 'buy') {
      return {
        users: { target: 500, label: "Happy Homeowners", suffix: "+", prefix: "" },
        transactions: { target: 2000, label: "in Transactions", suffix: "Cr+", prefix: "₹" },
        timeMetric: { target: 15, label: "Average Match Time", suffix: "-Day", prefix: "" }
      };
    } else {
      return {
        users: { target: 2000, label: "Active Buyers", suffix: "+", prefix: "" },
        transactions: { target: 45, label: "Average Sale", suffix: "-Day", prefix: "" },
        timeMetric: { target: 98, label: "Asking Price Achieved", suffix: "%", prefix: "" }
      };
    }
  };

  const data = getData();

  // Animate counters when mode changes
  useEffect(() => {
    setCounters({ users: 0, transactions: 0, timeMetric: 0 });
    
    const animateCounter = (key: keyof typeof counters, target: number) => {
      const duration = 1500;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, duration / steps);
    };

    // Stagger animations
    setTimeout(() => animateCounter('users', data.users.target), 100);
    setTimeout(() => animateCounter('transactions', data.transactions.target), 300);
    setTimeout(() => animateCounter('timeMetric', data.timeMetric.target), 500);
  }, [mode]);

  return (
    <div className="mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Users Metric */}
        <div className="text-center space-y-2">
          <div className={`
            text-4xl font-bold animate-counter
            ${mode === 'buy' ? 'text-buyer-primary' : 'text-seller-primary'}
          `}>
            {data.users.prefix}{counters.users}{data.users.suffix}
          </div>
          <div className="text-muted-foreground font-medium">
            {data.users.label}
          </div>
        </div>

        {/* Transactions Metric */}
        <div className="text-center space-y-2">
          <div className={`
            text-4xl font-bold animate-counter
            ${mode === 'buy' ? 'text-buyer-primary' : 'text-seller-primary'}
          `}>
            {data.transactions.prefix}{counters.transactions}{data.transactions.suffix}
          </div>
          <div className="text-muted-foreground font-medium">
            {data.transactions.label}
          </div>
        </div>

        {/* Time Metric */}
        <div className="text-center space-y-2">
          <div className={`
            text-4xl font-bold animate-counter
            ${mode === 'buy' ? 'text-buyer-primary' : 'text-seller-primary'}
          `}>
            {counters.timeMetric}{data.timeMetric.suffix}
          </div>
          <div className="text-muted-foreground font-medium">
            {data.timeMetric.label}
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-ai-primary rounded-full" />
          <span className="font-medium">AI-Powered</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-ai-primary rounded-full" />
          <span className="font-medium">Verified Users Only</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-ai-primary rounded-full" />
          <span className="font-medium">Zero Spam Guarantee</span>
        </div>
      </div>
    </div>
  );
};