import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface PromptQualityProps {
  prompt: string;
}

const PromptQuality: React.FC<PromptQualityProps> = ({ prompt }) => {
  const getQualityScore = (text: string): number => {
    let score = 0;
    
    // Length-based scoring
    if (text.length > 20) score += 15;
    if (text.length > 50) score += 15;
    if (text.length > 100) score += 10;
    
    // Word count scoring
    const wordCount = text.split(/\s+/).length;
    if (wordCount > 5) score += 10;
    if (wordCount > 10) score += 10;
    if (wordCount > 20) score += 10;
    
    // Specific keywords scoring
    const keywords = ['specific', 'detailed', 'requirements', 'context', 'example', 'consider'];
    keywords.forEach(keyword => {
      if (text.toLowerCase().includes(keyword)) score += 5;
    });
    
    // Punctuation and structure scoring
    if (/[.?!]/.test(text)) score += 5;
    if (text.includes(',')) score += 5;
    if (/\d/.test(text)) score += 5;
    
    return Math.min(100, score);
  };

  const score = getQualityScore(prompt);
  
  const getQualityInfo = (score: number) => {
    if (score >= 80) {
      return {
        label: 'Excellent',
        icon: CheckCircle,
        color: 'text-green-400',
        bg: 'bg-green-400',
        message: 'Your prompt is detailed and well-structured.'
      };
    }
    if (score >= 50) {
      return {
        label: 'Good',
        icon: AlertTriangle,
        color: 'text-yellow-400',
        bg: 'bg-yellow-400',
        message: 'Consider adding more specific details or requirements.'
      };
    }
    return {
      label: 'Needs Work',
      icon: XCircle,
      color: 'text-red-400',
      bg: 'bg-red-400',
      message: 'Try to make your prompt more detailed and specific.'
    };
  };

  const qualityInfo = getQualityInfo(score);
  const Icon = qualityInfo.icon;

  return (
    <div className="glass-panel p-4 rounded-lg space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${qualityInfo.color}`} />
          <span className="font-medium">Prompt Quality</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${qualityInfo.color} font-medium`}>
            {qualityInfo.label}
          </span>
          <span className="text-sm text-gray-400">
            {score}%
          </span>
        </div>
      </div>
      
      <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full ${qualityInfo.bg} transition-all duration-500 rounded-full`}
          style={{ width: `${score}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
      
      <p className="text-sm text-gray-400">
        {qualityInfo.message}
      </p>
    </div>
  );
};

export default PromptQuality;