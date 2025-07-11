import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserLimits {
  freeQuestions: number;
  questionsAsked: number;
  propertiesViewed: string[];
  buyerIntentShown: boolean;
  sellerIntentShown: boolean;
}

interface UserPreferences {
  propertyVision?: string;
  timeline?: string;
  budget?: string;
  locationPriority?: string;
  lifestyle?: string[];
  professional?: {
    industry: string;
    role: string;
    income: string;
  };
  personalityType?: string;
}

interface UserContextType {
  isAuthenticated: boolean;
  userLimits: UserLimits;
  userPreferences: UserPreferences;
  shouldShowSignup: boolean;
  signupTrigger: string;
  updateQuestionCount: () => void;
  addViewedProperty: (propertyId: string) => void;
  setAuthenticated: (auth: boolean) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  resetSignupTrigger: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [shouldShowSignup, setShouldShowSignup] = useState(false);
  const [signupTrigger, setSignupTrigger] = useState('');
  
  const [userLimits, setUserLimits] = useState<UserLimits>(() => {
    const saved = localStorage.getItem('userLimits');
    return saved ? JSON.parse(saved) : {
      freeQuestions: 5,
      questionsAsked: 0,
      propertiesViewed: [],
      buyerIntentShown: false,
      sellerIntentShown: false
    };
  });

  const [userPreferences, setUserPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('userPreferences');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('userLimits', JSON.stringify(userLimits));
  }, [userLimits]);

  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
  }, [userPreferences]);

  const updateQuestionCount = () => {
    if (!isAuthenticated) {
      setUserLimits(prev => {
        const newCount = prev.questionsAsked + 1;
        if (newCount >= prev.freeQuestions) {
          setShouldShowSignup(true);
          setSignupTrigger("You've asked 5 questions - Sign up for unlimited AI consultations");
        }
        return { ...prev, questionsAsked: newCount };
      });
    }
  };

  const addViewedProperty = (propertyId: string) => {
    if (!isAuthenticated) {
      setUserLimits(prev => ({
        ...prev,
        propertiesViewed: [...prev.propertiesViewed, propertyId]
      }));
      
      if (userLimits.propertiesViewed.length >= 2) {
        setShouldShowSignup(true);
        setSignupTrigger("Create account to schedule visit with verified builders");
      }
    }
  };

  const setAuthenticated = (auth: boolean) => {
    setIsAuthenticated(auth);
    if (auth) {
      setShouldShowSignup(false);
      setSignupTrigger('');
    }
  };

  const updatePreferences = (prefs: Partial<UserPreferences>) => {
    setUserPreferences(prev => ({ ...prev, ...prefs }));
  };

  const resetSignupTrigger = () => {
    setShouldShowSignup(false);
    setSignupTrigger('');
  };

  return (
    <UserContext.Provider value={{
      isAuthenticated,
      userLimits,
      userPreferences,
      shouldShowSignup,
      signupTrigger,
      updateQuestionCount,
      addViewedProperty,
      setAuthenticated,
      updatePreferences,
      resetSignupTrigger
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};