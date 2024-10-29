import React, { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import { shuffle } from '../utils/arrayUtils';

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
}

const ALL_EXAMPLES = [
  {
    title: 'Image Generation',
    prompt: 'Create a photorealistic image of a futuristic city at sunset with flying cars and holographic advertisements',
  },
  {
    title: 'Code Review',
    prompt: 'Review this React component for best practices, performance optimizations, and potential security issues',
  },
  {
    title: 'Content Writing',
    prompt: 'Write a compelling product description for a new eco-friendly water bottle that appeals to environmentally conscious consumers',
  },
  {
    title: 'Data Analysis',
    prompt: 'Analyze this dataset of customer behavior and provide insights on purchasing patterns and customer retention',
  },
  {
    title: 'UI Design',
    prompt: 'Design a modern, minimalist landing page for a meditation app focusing on calm and serenity',
  },
  {
    title: 'API Documentation',
    prompt: 'Document this REST API endpoint including authentication, request/response formats, and error handling',
  },
  {
    title: 'Marketing Copy',
    prompt: 'Write engaging social media copy for a new fitness app launch targeting health-conscious millennials',
  },
  {
    title: 'Video Script',
    prompt: 'Create a 60-second explainer video script for a revolutionary AI-powered smart home device',
  }
];

const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onSelect }) => {
  const [examples, setExamples] = useState(ALL_EXAMPLES.slice(0, 3));

  useEffect(() => {
    const interval = setInterval(() => {
      setExamples(shuffle(ALL_EXAMPLES).slice(0, 3));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Lightbulb className="w-5 h-5 text-yellow-400" />
        <h2 className="text-lg font-medium">Example Prompts</h2>
      </div>
      <div className="grid gap-3">
        {examples.map((example, index) => (
          <button
            key={`${example.title}-${index}`}
            onClick={() => onSelect(example.prompt)}
            className="text-left p-3 rounded-lg glass-panel hover:bg-white/10 transition-all transform hover:scale-[1.02] duration-200"
          >
            <h3 className="font-medium text-gray-200 mb-1">{example.title}</h3>
            <p className="text-sm text-gray-400">{example.prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExamplePrompts;