import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, X, MapPin, Clock, DollarSign, Heart, Briefcase, Star } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

interface PropertyPersonalityQuizProps {
  onComplete: () => void;
  onClose: () => void;
}

const quizQuestions = [
  {
    id: 'vision',
    title: "What's your dream property scenario?",
    options: [
      { id: 'first-home', label: 'First Home', subtitle: 'Starting fresh', icon: '🏡' },
      { id: 'investment', label: 'Smart Investment', subtitle: 'Building wealth', icon: '📈' },
      { id: 'upgrade', label: 'Dream Upgrade', subtitle: 'Ready for luxury', icon: '🏰' },
      { id: 'quick-sale', label: 'Quick Sale', subtitle: 'Selling fast', icon: '💰' },
      { id: 'buy-sell', label: 'Buy + Sell', subtitle: 'Upgrading smartly', icon: '🔄' }
    ]
  },
  {
    id: 'timeline',
    title: 'When do you plan to make your move?',
    type: 'timeline',
    options: [
      { id: 'immediate', label: 'Immediately', subtitle: 'Ready to move now' },
      { id: '3-months', label: '3 Months', subtitle: 'Planning ahead' },
      { id: '6-months', label: '6 Months', subtitle: 'Taking time to decide' },
      { id: '1-year', label: '1 Year+', subtitle: 'Long-term planning' }
    ]
  },
  {
    id: 'budget',
    title: "Let's talk numbers. What's your comfort zone?",
    options: [
      { id: 'under-50', label: 'Under ₹50L', subtitle: 'Starter budget' },
      { id: '50-100', label: '₹50L-1Cr', subtitle: 'Mid-range comfort' },
      { id: '100-200', label: '₹1-2Cr', subtitle: 'Premium choice' },
      { id: 'above-200', label: '₹2Cr+', subtitle: 'Luxury segment' },
      { id: 'flexible', label: 'Flexible', subtitle: 'Open to options' }
    ]
  },
  {
    id: 'location',
    title: 'What drives your location choice?',
    options: [
      { id: 'work', label: 'Near Work', subtitle: 'IT corridors', icon: '🏢' },
      { id: 'schools', label: 'Best Schools', subtitle: 'Education hubs', icon: '🏫' },
      { id: 'metro', label: 'Metro Access', subtitle: 'Connectivity', icon: '🚇' },
      { id: 'peaceful', label: 'Peaceful Areas', subtitle: 'Green zones', icon: '🌳' },
      { id: 'growth', label: 'Future Growth', subtitle: 'Upcoming areas', icon: '💡' }
    ]
  },
  {
    id: 'lifestyle',
    title: 'What matters most in your daily life?',
    type: 'multiple',
    options: [
      { id: 'fitness', label: 'Fitness & Recreation', icon: '🏃' },
      { id: 'shopping', label: 'Shopping & Dining', icon: '🛒' },
      { id: 'commute', label: 'Easy Commute', icon: '🚗' },
      { id: 'family', label: 'Family Amenities', icon: '👨‍👩‍👧' },
      { id: 'security', label: 'Gated Security', icon: '🔒' },
      { id: 'green', label: 'Green Spaces', icon: '🌿' }
    ]
  },
  {
    id: 'professional',
    title: 'This helps us match you better',
    type: 'professional',
    fields: ['industry', 'role', 'income']
  }
];

export const PropertyPersonalityQuiz: React.FC<PropertyPersonalityQuizProps> = ({
  onComplete,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const { updatePreferences } = useUser();

  const currentQuestion = quizQuestions[currentStep];
  const isLastStep = currentStep === quizQuestions.length - 1;

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (isLastStep) {
      // Calculate personality type based on answers
      const personalityType = calculatePersonalityType(answers);
      updatePreferences({ ...answers, personalityType });
      onComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculatePersonalityType = (answers: Record<string, any>) => {
    // Simple personality calculation
    if (answers.vision === 'investment' && answers.professional?.industry === 'IT') {
      return 'Strategic Tech Investor';
    } else if (answers.vision === 'first-home') {
      return 'First-Time Home Buyer';
    } else if (answers.vision === 'upgrade') {
      return 'Lifestyle Upgrader';
    }
    return 'Smart Property Seeker';
  };

  const canProceed = () => {
    const current = answers[currentQuestion.id];
    if (currentQuestion.type === 'multiple') {
      return current && current.length > 0;
    }
    if (currentQuestion.type === 'professional') {
      return true; // Optional step
    }
    return current;
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'timeline':
        return (
          <div className="space-y-4">
            {currentQuestion.options?.map(option => (
              <button
                key={option.id}
                onClick={() => handleAnswer(currentQuestion.id, option.id)}
                className={`w-full p-4 rounded-lg border-2 text-left transition ${
                  answers[currentQuestion.id] === option.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-500">{option.subtitle}</div>
              </button>
            ))}
          </div>
        );

      case 'multiple':
        return (
          <div className="grid grid-cols-2 gap-3">
            {currentQuestion.options?.map(option => {
              const isSelected = answers[currentQuestion.id]?.includes(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    const current = answers[currentQuestion.id] || [];
                    const updated = isSelected
                      ? current.filter((id: string) => id !== option.id)
                      : [...current, option.id];
                    handleAnswer(currentQuestion.id, updated);
                  }}
                  className={`p-4 rounded-lg border-2 text-left transition ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{option.icon}</div>
                  <div className="font-medium text-sm">{option.label}</div>
                </button>
              );
            })}
          </div>
        );

      case 'professional':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2"
                onChange={(e) => handleAnswer(currentQuestion.id, { 
                  ...answers[currentQuestion.id], 
                  industry: e.target.value 
                })}
              >
                <option value="">Industry</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Other">Other</option>
              </select>
              
              <select
                className="border border-gray-300 rounded-lg px-3 py-2"
                onChange={(e) => handleAnswer(currentQuestion.id, { 
                  ...answers[currentQuestion.id], 
                  role: e.target.value 
                })}
              >
                <option value="">Role Level</option>
                <option value="Entry">Entry Level</option>
                <option value="Manager">Manager</option>
                <option value="Senior">Senior</option>
                <option value="Executive">Executive</option>
              </select>
              
              <select
                className="border border-gray-300 rounded-lg px-3 py-2"
                onChange={(e) => handleAnswer(currentQuestion.id, { 
                  ...answers[currentQuestion.id], 
                  income: e.target.value 
                })}
              >
                <option value="">Income Range</option>
                <option value="5-10L">₹5-10L/year</option>
                <option value="10-20L">₹10-20L/year</option>
                <option value="20L+">₹20L+/year</option>
              </select>
            </div>
            <p className="text-sm text-gray-500">This information helps us provide better recommendations</p>
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentQuestion.options?.map(option => (
              <button
                key={option.id}
                onClick={() => handleAnswer(currentQuestion.id, option.id)}
                className={`p-6 rounded-lg border-2 text-center transition ${
                  answers[currentQuestion.id] === option.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-3">{option.icon}</div>
                <div className="font-medium mb-1">{option.label}</div>
                <div className="text-sm text-gray-500">{option.subtitle}</div>
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {currentStep > 0 && (
                <button onClick={handleBack} className="text-gray-500 hover:text-gray-700">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <h2 className="text-xl font-bold">Discover Your Property Personality</h2>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step {currentStep + 1} of {quizQuestions.length}</span>
              <span>{Math.round(((currentStep + 1) / quizQuestions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-6 text-center">
            {currentQuestion.title}
          </h3>
          
          {renderQuestion()}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="px-6 py-2 text-gray-600 hover:text-gray-800"
              disabled={currentStep === 0}
            >
              Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLastStep ? 'Complete Quiz' : 'Continue'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};