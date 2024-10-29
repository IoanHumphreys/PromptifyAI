import React, { KeyboardEvent } from 'react';
import { Wand2, Lightbulb } from 'lucide-react';
import PromptQuality from './PromptQuality';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => Promise<void>;
  examples: string[];
  onExampleClick: (example: string) => void;
  isExampleSelected: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ 
  value, 
  onChange, 
  onSubmit,
  examples,
  onExampleClick,
  isExampleSelected
}) => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set the height to match the content (min 192px = 12rem, max 384px = 24rem)
      const newHeight = Math.min(384, Math.max(192, textareaRef.current.scrollHeight));
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [value]);

  const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isExampleSelected && !isProcessing) {
        setIsProcessing(true);
        await onSubmit(value);
        setIsProcessing(false);
      }
    }
  };

  const handleEnhanceClick = async () => {
    if (canEnhance) {
      setIsProcessing(true);
      await onSubmit(value);
      setIsProcessing(false);
    }
  };

  React.useEffect(() => {
    setIsProcessing(false);
  }, [value]);

  const canEnhance = value.trim() && !isExampleSelected && !isProcessing;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Prompt</h2>
        <span className="text-sm text-gray-400">
          {value.length} characters
        </span>
      </div>
      
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your prompt here..."
          className="w-full min-h-[12rem] max-h-[24rem] p-4 pb-16 rounded-lg glass-panel text-white 
                   placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:border-transparent 
                   transition-colors resize-none overflow-y-auto"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 transparent' }}
        />
        <button
          onClick={handleEnhanceClick}
          disabled={!canEnhance}
          className={`
            absolute right-4 bottom-4 
            flex items-center gap-2 px-6 py-2.5 rounded-lg
            font-medium transition-all duration-200 transform
            ${canEnhance
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/25 active:scale-95 hover:-translate-y-0.5' 
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
          `}
        >
          <Wand2 className={`w-4 h-4 ${canEnhance ? 'animate-pulse' : ''}`} />
          <span>{isProcessing ? 'Enhancing...' : 'Enhance'}</span>
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-blue-400">
        <Lightbulb className="w-4 h-4" />
        <span>Pro tip: The more detailed your prompt, the better the AI can assist you</span>
      </div>

      {value && <PromptQuality prompt={value} />}

      <div className="flex flex-wrap gap-2">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(example)}
            disabled={isProcessing}
            className="px-3 py-1.5 text-sm rounded-lg glass-panel hover:bg-white/10 transition-all duration-200 transform hover:scale-[1.01] flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full group-hover:scale-110 transition-transform" />
            {example}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptInput;