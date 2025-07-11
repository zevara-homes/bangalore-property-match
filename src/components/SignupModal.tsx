import React, { useState } from 'react';
import { X, ArrowRight, Smartphone, Mail, Globe } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { PropertyPersonalityQuiz } from './PropertyPersonalityQuiz';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const { signupTrigger, setAuthenticated } = useUser();
  const [step, setStep] = useState<'signup' | 'quiz' | 'dashboard'>('signup');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  if (!isOpen) return null;

  const handleSocialLogin = (provider: string) => {
    // Simulate social login
    setAuthenticated(true);
    setStep('quiz');
  };

  const handlePhoneSignup = () => {
    if (phoneNumber.length === 10) {
      setOtpSent(true);
      setTimeout(() => {
        setAuthenticated(true);
        setStep('quiz');
      }, 2000);
    }
  };

  const handleQuizComplete = () => {
    onClose();
    // Navigate to dashboard after quiz completion
    window.location.href = '/dashboard';
  };

  const handleClose = () => {
    setStep('signup');
    setOtpSent(false);
    setPhoneNumber('');
    onClose();
  };

  if (step === 'quiz') {
    return <PropertyPersonalityQuiz onComplete={handleQuizComplete} onClose={handleClose} />;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex">
          {/* Left Side - Benefits */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-primary/80 text-white p-8 flex-col justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-4">AIBroker Has Learned About You!</h3>
              <p className="text-lg mb-6 text-primary-foreground/90">
                Based on your activity, you seem to be a:
              </p>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 mb-6">
                <p className="font-semibold">"Strategic Investor looking for high-ROI properties in tech corridors"</p>
              </div>
              <p className="text-sm text-primary-foreground/80">
                Let's personalize your experience in just 2 minutes
              </p>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="w-full md:w-1/2 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome to Your Personalized Property Journey
              </h2>
              <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {signupTrigger && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm">{signupTrigger}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Social Login Options */}
              <button
                onClick={() => handleSocialLogin('google')}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition"
              >
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Continue with Google</span>
              </button>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-500 text-sm">or</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* Phone Number Input */}
              <div className="space-y-3">
                <div className="flex">
                  <div className="flex items-center bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg px-3">
                    <Smartphone className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm">+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    className="flex-1 border border-gray-300 rounded-r-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    maxLength={10}
                  />
                </div>

                <button
                  onClick={handlePhoneSignup}
                  disabled={phoneNumber.length !== 10 || otpSent}
                  className="w-full bg-primary text-white rounded-lg py-3 px-4 font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {otpSent ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                By continuing, you agree to our terms & privacy policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};