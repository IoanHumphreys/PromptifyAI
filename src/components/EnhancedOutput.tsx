import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ListChecks, AlertTriangle, RefreshCw } from 'lucide-react';
import { EnhancedPromptResult } from '../types';

interface EnhancedOutputProps {
  enhancedPrompt: EnhancedPromptResult | null;
  onRegenerate?: () => void;
}

const EnhancedOutput: React.FC<EnhancedOutputProps> = ({ enhancedPrompt, onRegenerate }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typewriterRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (enhancedPrompt?.mainPrompt) {
      setIsTyping(true);
      let index = 0;
      const text = enhancedPrompt.mainPrompt;
      
      const typeText = () => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
          typewriterRef.current = setTimeout(typeText, 20);
        } else {
          setIsTyping(false);
        }
      };

      typeText();

      return () => {
        if (typewriterRef.current) {
          clearTimeout(typewriterRef.current);
        }
      };
    }
  }, [enhancedPrompt?.mainPrompt]);

  if (!enhancedPrompt) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Enhanced Prompt</h2>
        <div className="p-4 rounded-lg glass-panel min-h-[12rem] flex items-center justify-center">
          <p className="text-gray-500 italic">
            Enter a prompt and press Enter to see the enhanced version...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Enhanced Prompt</h2>
        <div className="flex items-center gap-4">
          {isTyping && (
            <span className="text-sm text-blue-400 flex items-center gap-2">
              <span className="animate-pulse">Generating</span>
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          )}
          {!isTyping && onRegenerate && (
            <button
              onClick={onRegenerate}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-panel hover:bg-white/10 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Regenerate</span>
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="p-4 rounded-lg glass-panel">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
              <div className="space-y-2 flex-grow">
                <h3 className="font-medium text-blue-400">Enhanced Version:</h3>
                <div className="text-gray-200 relative">
                  {displayedText}
                  {isTyping && (
                    <span className="inline-block w-0.5 h-5 bg-blue-400 animate-pulse ml-1" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ListChecks className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="font-medium text-green-400">Key Elements:</h3>
                <ul className="list-none space-y-2">
                  {enhancedPrompt.keyElements.map((element, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-200">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      {element}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="font-medium text-yellow-400">Consider Adding:</h3>
                <ul className="list-none space-y-2">
                  {enhancedPrompt.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-200">
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedOutput;