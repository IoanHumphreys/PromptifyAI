import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, RefreshCw, ArrowRight, Lightbulb, Copy, Check } from 'lucide-react';
import type { EnhancedPromptResult } from '../types';

interface PromptPreviewProps {
  result: EnhancedPromptResult | null;
  onRegenerate?: () => void;
}

const PromptPreview: React.FC<PromptPreviewProps> = ({ result, onRegenerate }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [displayedAdditions, setDisplayedAdditions] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingAdditions, setIsTypingAdditions] = useState(false);
  const [hasExtended, setHasExtended] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const typewriterRef = useRef<NodeJS.Timeout>();
  const previousPromptRef = useRef<string>('');
  const extendedPromptRef = useRef<string>('');

  useEffect(() => {
    if (result?.mainPrompt && result.mainPrompt !== previousPromptRef.current) {
      setHasExtended(false);
      previousPromptRef.current = result.mainPrompt;
      extendedPromptRef.current = '';
      setDisplayedAdditions([]);
      setIsTyping(true);
      setIsTypingAdditions(false);
      
      let index = 0;
      const text = result.mainPrompt;
      
      const typeText = () => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
          typewriterRef.current = setTimeout(typeText, 20);
        } else {
          setIsTyping(false);
          if (result.additions?.length > 0) {
            typeAdditions();
          }
        }
      };

      typeText();

      return () => {
        if (typewriterRef.current) {
          clearTimeout(typewriterRef.current);
        }
      };
    }
  }, [result?.mainPrompt]);

  useEffect(() => {
    if (hasExtended) {
      setIsTyping(true);
      setDisplayedAdditions([]);
      let index = 0;
      const text = extendedPromptRef.current;
      
      const typeText = () => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
          typewriterRef.current = setTimeout(typeText, 20);
        } else {
          setIsTyping(false);
          if (result?.additions?.length > 0) {
            typeAdditions();
          }
        }
      };

      typeText();

      return () => {
        if (typewriterRef.current) {
          clearTimeout(typewriterRef.current);
        }
      };
    }
  }, [hasExtended]);

  const typeAdditions = () => {
    if (!result?.additions?.length) return;
    
    setIsTypingAdditions(true);
    let currentIndex = 0;
    
    const addNextAddition = () => {
      if (currentIndex < result.additions.length) {
        const addition = result.additions[currentIndex];
        if (addition?.trim()) {
          setDisplayedAdditions(prev => [...prev, addition]);
        }
        currentIndex++;
        typewriterRef.current = setTimeout(addNextAddition, 100);
      } else {
        setIsTypingAdditions(false);
      }
    };

    addNextAddition();
  };

  const handleExtend = () => {
    if (!hasExtended && result?.mainPrompt) {
      const extendedPrompt = result.mainPrompt + ', incorporating advanced methodologies and innovative approaches';
      extendedPromptRef.current = extendedPrompt;
      setHasExtended(true);
    }
  };

  const handleCopy = async () => {
    if (!result) return;

    const textToCopy = `${displayedText}\n\nKey Additions:\n${displayedAdditions.map(addition => `• ${addition}`).join('\n')}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  if (!result) {
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
        <div className="flex items-center gap-3">
          {(isTyping || isTypingAdditions) && (
            <span className="text-sm text-blue-400 flex items-center gap-2">
              <span className="animate-pulse">Enhancing</span>
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          )}
          {!isTyping && !isTypingAdditions && (
            <div className="flex gap-2">
              {!hasExtended && (
                <button
                  onClick={handleExtend}
                  className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg 
                           bg-indigo-600 hover:bg-indigo-500
                           text-white font-medium transition-all duration-200 
                           transform hover:-translate-y-0.5 active:scale-95
                           shadow-lg hover:shadow-indigo-500/25
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Extend</span>
                </button>
              )}
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg 
                         bg-gray-700 hover:bg-gray-600 text-gray-300 
                         font-medium transition-all duration-200 
                         transform hover:-translate-y-0.5 active:scale-95"
              >
                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
              </button>
              {onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg 
                           bg-gray-700 hover:bg-gray-600
                           text-gray-300 font-medium transition-all duration-200 
                           transform hover:-translate-y-0.5 active:scale-95
                           shadow-lg hover:shadow-gray-500/25
                           focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Regenerate</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="p-4 rounded-lg glass-panel min-h-[12rem]">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
              <div className="space-y-2 flex-grow">
                <h3 className="font-medium text-blue-400">Enhanced Version</h3>
                <div className="text-gray-200 relative">
                  {displayedText}
                  {isTyping && (
                    <span className="inline-block w-0.5 h-5 bg-blue-400 animate-pulse ml-1" />
                  )}
                </div>
              </div>
            </div>

            {(displayedAdditions.length > 0 || isTypingAdditions) && (
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="font-medium text-purple-400">Key Additions</h3>
                  <ul className="list-none space-y-2">
                    {displayedAdditions.map((addition, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-200">
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                        {addition}
                      </li>
                    ))}
                    {isTypingAdditions && (
                      <li className="flex items-center gap-2 text-gray-200">
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                        <span className="inline-block w-0.5 h-5 bg-purple-400 animate-pulse" />
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptPreview;