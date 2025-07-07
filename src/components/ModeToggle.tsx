import { useState } from "react";

interface ModeToggleProps {
  onModeChange: (mode: 'buy' | 'sell') => void;
  currentMode: 'buy' | 'sell';
}

export const ModeToggle = ({ onModeChange, currentMode }: ModeToggleProps) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="relative inline-flex items-center bg-muted rounded-full p-1 shadow-elegant">
        <button
          onClick={() => onModeChange('buy')}
          className={`
            relative z-10 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300
            ${currentMode === 'buy' 
              ? 'text-white shadow-buyer' 
              : 'text-muted-foreground hover:text-foreground'
            }
          `}
        >
          I want to Buy
        </button>
        <button
          onClick={() => onModeChange('sell')}
          className={`
            relative z-10 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300
            ${currentMode === 'sell' 
              ? 'text-white shadow-seller' 
              : 'text-muted-foreground hover:text-foreground'
            }
          `}
        >
          I want to Sell
        </button>
        
        {/* Sliding background */}
        <div 
          className={`
            absolute top-1 bottom-1 w-1/2 rounded-full transition-all duration-300 ease-bounce
            ${currentMode === 'buy' 
              ? 'left-1 bg-buyer-gradient' 
              : 'left-1/2 bg-seller-gradient'
            }
          `}
        />
      </div>
    </div>
  );
};