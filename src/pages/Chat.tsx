import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, Mic } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChatMessage } from "@/components/ChatMessage";
import { conversationData } from "@/data/conversationData";
import { useUser } from "@/contexts/UserContext";

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
  sources?: string[];
  action?: { text: string; link: string };
  followUps?: string[];
}

export const Chat = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { updateQuestionCount } = useUser();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load initial question from URL params
    const question = searchParams.get('q');
    const context = searchParams.get('context');
    
    if (question) {
      handleQuestion(question, context);
    } else if (context) {
      handleContextualStart(context);
    }
  }, [searchParams]);

  const handleContextualStart = (context: string) => {
    const contextData = conversationData.contextual[context as keyof typeof conversationData.contextual];
    if (contextData) {
      simulateAIResponse(contextData);
    }
  };

  const handleQuestion = (question: string, context?: string | null) => {
    const userMessage: Message = {
      role: 'user',
      content: question,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Find matching conversation
    const lowerQuestion = question.toLowerCase();
    let response = null;
    
    for (const [key, conversation] of Object.entries(conversationData.general)) {
      if (lowerQuestion.includes(key)) {
        response = conversation;
        break;
      }
    }
    
    if (!response) {
      response = conversationData.fallback;
    }
    
    simulateAIResponse(response);
  };

  const simulateAIResponse = (responseData: any) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const aiMessage: Message = {
        role: 'ai',
        content: responseData.response,
        timestamp: Date.now(),
        sources: responseData.sources,
        action: responseData.action,
        followUps: responseData.followUps
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    updateQuestionCount(); // Track question for signup trigger
    handleQuestion(inputValue);
    setInputValue("");
  };

  const handleFollowUp = (question: string) => {
    updateQuestionCount(); // Track follow-up question
    handleQuestion(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Home</span>
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-800">
                AI<span className="text-blue-600">Broker</span> <span className="text-sm font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">Consultant</span>
              </h1>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Available for consultation
              </div>
            </div>
            <p className="text-sm text-gray-500">Professional Real Estate Advisory</p>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px] flex flex-col">
          
          {/* Messages Area */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-12">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-lg font-semibold mb-2">How can I help you today?</h3>
                <p>Ask me anything about Bangalore real estate</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <ChatMessage 
                key={index} 
                message={message} 
                onFollowUp={handleFollowUp}
              />
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-md shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                    <span className="text-blue-600 text-sm font-medium">Your advisor is analyzing the market...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Professional Input Area */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your real estate needs..."
                  className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white shadow-sm"
                  disabled={isTyping}
                />
                <Mic className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 cursor-pointer hover:text-blue-600 transition" />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2 font-semibold shadow-sm"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Get Expert Advice</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};