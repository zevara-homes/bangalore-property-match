import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SearchWidgetProps {
  mode: 'buy' | 'sell';
}

type StepType = {
  label: string;
  options?: string[];
  type?: 'slider' | 'input';
  min?: number;
  max?: number;
  unit?: string;
  placeholder?: string;
};

export const SearchWidget = ({ mode }: SearchWidgetProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    location: '',
    budget: 50,
    propertyType: '',
    timeline: ''
  });

  const buyerSteps: StepType[] = [
    {
      label: "Location",
      options: ["Whitefield", "HSR Layout", "Sarjapur", "Electronic City", "Koramangala"]
    },
    {
      label: "Budget",
      type: "slider",
      min: 40,
      max: 300,
      unit: "₹L"
    },
    {
      label: "Property Type",
      options: ["2 BHK", "3 BHK", "4 BHK", "Villa"]
    }
  ];

  const sellerSteps: StepType[] = [
    {
      label: "Property Location",
      type: "input",
      placeholder: "Enter your property location"
    },
    {
      label: "Property Type & Size",
      options: ["2 BHK Apartment", "3 BHK Apartment", "4 BHK Apartment", "Independent House", "Villa"]
    },
    {
      label: "Expected Timeline",
      options: ["Immediate", "1-3 months", "3-6 months", "Just Planning"]
    }
  ];

  const steps = mode === 'buy' ? buyerSteps : sellerSteps;

  return (
    <div className={`
      bg-white rounded-2xl p-6 shadow-elegant border-2 transition-all duration-300
      ${mode === 'buy' ? 'border-buyer-primary/20' : 'border-seller-primary/20'}
    `}>
      <div className="space-y-6">
        {/* Progress indicator */}
        <div className="flex gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`
                h-2 flex-1 rounded-full transition-all duration-300
                ${index <= currentStep 
                  ? mode === 'buy' ? 'bg-buyer-primary' : 'bg-seller-primary'
                  : 'bg-muted'
                }
              `}
            />
          ))}
        </div>

        {/* Current step */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {steps[currentStep]?.label}
          </h3>

          {/* Input field */}
          {steps[currentStep]?.type === 'input' && (
            <input
              type="text"
              placeholder={steps[currentStep].placeholder}
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          )}

          {/* Slider */}
          {steps[currentStep]?.type === 'slider' && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₹40L</span>
                <span className={`
                  font-semibold text-lg
                  ${mode === 'buy' ? 'text-buyer-primary' : 'text-seller-primary'}
                `}>
                  ₹{formData.budget}L
                </span>
                <span>₹3Cr</span>
              </div>
              <input
                type="range"
                min="40"
                max="300"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value)})}
                className={`
                  w-full h-2 rounded-lg appearance-none cursor-pointer
                  ${mode === 'buy' ? 'range-buyer' : 'range-seller'}
                `}
              />
            </div>
          )}

          {/* Options */}
          {steps[currentStep]?.options && (
            <div className="grid grid-cols-2 gap-3">
              {steps[currentStep].options!.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFormData({...formData, propertyType: option});
                    if (currentStep < steps.length - 1) {
                      setTimeout(() => setCurrentStep(currentStep + 1), 300);
                    }
                  }}
                  className={`
                    p-3 text-sm font-medium rounded-lg border transition-all duration-200
                    hover:scale-105 hover:shadow-md
                    ${formData.propertyType === option
                      ? mode === 'buy' 
                        ? 'bg-buyer-primary text-white border-buyer-primary'
                        : 'bg-seller-primary text-white border-seller-primary'
                      : 'bg-muted/50 border-border hover:bg-muted'
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Instant valuation teaser for sellers */}
        {mode === 'sell' && currentStep === 0 && (
          <div className="bg-seller-secondary rounded-lg p-3 border border-seller-primary/20">
            <div className="text-sm text-seller-primary font-medium">
              💡 Properties in your area selling for ₹1.2Cr average
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm text-muted-foreground disabled:opacity-50"
          >
            Previous
          </button>
          
          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className={`
                px-6 py-2 text-sm font-medium text-white rounded-lg transition-all duration-200
                ${mode === 'buy' ? 'bg-buyer-primary hover:bg-buyer-accent' : 'bg-seller-primary hover:bg-seller-accent'}
              `}
            >
              Next
            </button>
          ) : (
            <button
              className={`
                px-6 py-2 text-sm font-medium text-white rounded-lg transition-all duration-200
                ${mode === 'buy' ? 'bg-buyer-primary hover:bg-buyer-accent' : 'bg-seller-primary hover:bg-seller-accent'}
              `}
            >
              Get Matches
            </button>
          )}
        </div>
      </div>
    </div>
  );
};