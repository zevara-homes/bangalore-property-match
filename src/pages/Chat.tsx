import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, Mic } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChatMessage } from "@/components/ChatMessage";
import { conversationData } from "@/data/conversationData";

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
    
    handleQuestion(inputValue);
    setInputValue("");
  };

  const handleFollowUp = (question: string) => {
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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Home</span>
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-800">
              AI<span className="text-blue-600">Broker</span>
            </h1>
            <p className="text-sm text-gray-500">Your Real Estate Intelligence Partner</p>
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
                <div className="bg-gray-100 rounded-lg p-4 max-w-xs">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a follow-up question..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isTyping}
                />
                <Mic className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-600 transition" />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};