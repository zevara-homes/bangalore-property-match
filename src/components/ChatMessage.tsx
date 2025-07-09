import { useState, useEffect } from "react";
import { ExternalLink, TrendingUp, FileText, Users } from "lucide-react";

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
  sources?: string[];
  action?: { text: string; link: string };
  followUps?: string[];
}

interface ChatMessageProps {
  message: Message;
  onFollowUp: (question: string) => void;
}

export const ChatMessage = ({ message, onFollowUp }: ChatMessageProps) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [showSources, setShowSources] = useState(false);
  const [showFollowUps, setShowFollowUps] = useState(false);

  useEffect(() => {
    if (message.role === 'ai') {
      // Typewriter effect
      let index = 0;
      const timer = setInterval(() => {
        if (index < message.content.length) {
          setDisplayedContent(message.content.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          // Show sources and follow-ups after typing is complete
          setTimeout(() => setShowSources(true), 300);
          setTimeout(() => setShowFollowUps(true), 600);
        }
      }, 30);

      return () => clearInterval(timer);
    } else {
      setDisplayedContent(message.content);
    }
  }, [message]);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getSourceIcon = (source: string) => {
    if (source.includes('Market') || source.includes('Analysis')) return <TrendingUp className="w-4 h-4" />;
    if (source.includes('Builder') || source.includes('Report')) return <FileText className="w-4 h-4" />;
    if (source.includes('Government') || source.includes('Data')) return <Users className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-md lg:max-w-lg">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-l-3 border-blue-500 rounded-r-lg p-4 shadow-sm">
            <p className="text-gray-800 font-medium">{displayedContent}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">{formatTime(message.timestamp)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-3xl">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md relative">
          {/* Professional Header */}
          <div className="absolute -top-3 left-6 bg-white px-3 py-1 border border-gray-200 rounded text-xs font-semibold text-blue-600">
            AIBroker Advisor
          </div>
          
          {/* Analysis Header */}
          <div className="border-b border-gray-100 p-4 bg-gray-50 rounded-t-lg">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Professional Analysis</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">Confidence:</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="p-6">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                {displayedContent}
              </div>
            </div>

            {/* Action Button */}
            {message.action && showSources && (
              <div className="mt-4">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  {message.action.text}
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Sources */}
            {message.sources && showSources && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-600 mb-2">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Verified Data Sources:
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {message.sources.map((source, index) => (
                    <div key={index} className="flex items-center gap-1 px-3 py-1 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 font-medium">
                      {getSourceIcon(source)}
                      <span>{source}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Professional Disclaimer */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 italic">
                Analysis based on current market data and verified transactions
              </p>
            </div>
          </div>
        </div>

        {/* Follow-up Questions */}
        {message.followUps && showFollowUps && (
          <div className="mt-3 space-y-2">
            <p className="text-xs font-medium text-gray-600">You might also ask:</p>
            <div className="space-y-2">
              {message.followUps.map((question, index) => (
                <button
                  key={index}
                  onClick={() => onFollowUp(question)}
                  className="block w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
};