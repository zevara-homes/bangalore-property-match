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
        <div className="max-w-xs lg:max-w-md">
          <div className="bg-blue-600 text-white rounded-lg rounded-br-sm p-4">
            <p className="text-sm">{displayedContent}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">{formatTime(message.timestamp)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-2xl">
        <div className="bg-white border border-gray-200 rounded-lg rounded-bl-sm p-6 shadow-sm">
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-line text-gray-800">
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
              <p className="text-xs font-medium text-gray-600 mb-2">Sources:</p>
              <div className="flex flex-wrap gap-2">
                {message.sources.map((source, index) => (
                  <div key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                    {getSourceIcon(source)}
                    <span>{source}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
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

        <p className="text-xs text-gray-500 mt-2">{formatTime(message.timestamp)}</p>
      </div>
    </div>
  );
};