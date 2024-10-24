import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PromptInput from './components/PromptInput';
import PromptPreview from './components/PromptPreview';
import { enhancePrompt } from './utils/promptEnhancer';
import { shuffle } from './utils/arrayUtils';
import type { EnhancedPromptResult } from './types';

const ALL_PROMPTS = [
  'Create a photorealistic image of a futuristic city',
  'Review this React component for best practices',
  'Write a compelling product description',
  'Design a modern landing page',
  'Document this REST API endpoint',
  'Generate a 3D model of a spacecraft',
  'Write an engaging blog post about AI',
  'Create a logo for a tech startup',
  'Design a mobile app interface',
  'Write a marketing email campaign',
  'Develop a machine learning model',
  'Create an educational lesson plan',
  'Design a sustainable architecture concept',
  'Write a medical research protocol',
  'Create a social media strategy',
  'Design a user onboarding flow',
  'Write a business proposal',
  'Create a fitness training program',
  'Design a restaurant menu',
  'Write a technical documentation'
];

export default function App() {
  const [userPrompt, setUserPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState<EnhancedPromptResult | null>(null);
  const [examplePrompts, setExamplePrompts] = useState<string[]>([]);
  const [isExampleSelected, setIsExampleSelected] = useState(false);

  useEffect(() => {
    // Initially shuffle and take 4 prompts
    setExamplePrompts(shuffle(ALL_PROMPTS).slice(0, 4));

    // Rotate examples every 10 seconds
    const interval = setInterval(() => {
      setExamplePrompts(shuffle(ALL_PROMPTS).slice(0, 4));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handlePromptSubmit = async (prompt: string) => {
    // Add artificial delay to simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate network delay for enhancement
    const enhanced = enhancePrompt(prompt);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setEnhancedPrompt(enhanced);
  };

  const handleRegenerate = () => {
    if (userPrompt) {
      handlePromptSubmit(userPrompt);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PromptInput
            value={userPrompt}
            onChange={(value) => {
              setUserPrompt(value);
              setIsExampleSelected(false);
            }}
            onSubmit={handlePromptSubmit}
            examples={examplePrompts}
            onExampleClick={(example) => {
              setUserPrompt(example);
              setIsExampleSelected(true);
              handlePromptSubmit(example);
            }}
            isExampleSelected={isExampleSelected}
          />
          <PromptPreview 
            result={enhancedPrompt} 
            onRegenerate={handleRegenerate}
          />
        </div>
      </main>
    </div>
  );
}