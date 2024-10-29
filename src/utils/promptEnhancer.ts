import { shuffle } from './arrayUtils';
import type { EnhancedPromptResult } from '../types';

const sentencePatterns = {
  education: [
    (base: string) => `${base} through systematic learning approaches and practical exercises`,
    (base: string) => `${base}, emphasizing foundational concepts and real-world applications`,
    (base: string) => `${base} using interactive learning methods and continuous assessment`,
    (base: string) => `${base}, breaking down complex concepts into manageable components`
  ],
  technology: [
    (base: string) => `${base} following modern development practices and industry standards`,
    (base: string) => `${base}, ensuring robust architecture and maintainable codebase`,
    (base: string) => `${base} with emphasis on performance optimization and scalability`,
    (base: string) => `${base}, incorporating comprehensive testing and documentation`
  ],
  health: [
    (base: string) => `${base} following evidence-based clinical protocols and aseptic techniques`,
    (base: string) => `${base}, ensuring sterile conditions and optimal patient comfort`,
    (base: string) => `${base} with meticulous attention to infection prevention and wound assessment`,
    (base: string) => `${base}, maintaining comprehensive documentation and patient monitoring`
  ],
  medical_procedure: [
    (base: string) => `${base} following sterile technique and universal precautions`,
    (base: string) => `${base}, ensuring patient safety and comfort throughout the procedure`,
    (base: string) => `${base} with systematic documentation and wound assessment`,
    (base: string) => `${base}, incorporating best practice guidelines and infection control measures`
  ],
  business: [
    (base: string) => `${base} aligned with strategic objectives and market requirements`,
    (base: string) => `${base}, focusing on measurable outcomes and ROI optimization`,
    (base: string) => `${base} while ensuring operational efficiency and quality control`,
    (base: string) => `${base}, incorporating stakeholder feedback and market analysis`
  ],
  creative: [
    (base: string) => `${base} following design principles and artistic standards`,
    (base: string) => `${base}, ensuring aesthetic quality and visual impact`,
    (base: string) => `${base} with attention to detail and creative expression`,
    (base: string) => `${base}, incorporating innovative techniques and materials`
  ],
  general: [
    (base: string) => `${base} following established best practices and quality standards`,
    (base: string) => `${base}, ensuring comprehensive documentation and clear guidelines`,
    (base: string) => `${base} with systematic approach and measurable outcomes`,
    (base: string) => `${base}, maintaining flexibility and adaptability throughout`
  ]
};

const domainAdditions = {
  education: [
    'Learning objectives and outcomes',
    'Assessment methods',
    'Student engagement strategies',
    'Resource requirements',
    'Progress tracking metrics',
    'Differentiation approaches',
    'Technology integration',
    'Feedback mechanisms'
  ],
  technology: [
    'Performance requirements',
    'Security considerations',
    'Scalability needs',
    'Testing strategy',
    'Documentation requirements',
    'Error handling',
    'Monitoring setup',
    'Deployment strategy'
  ],
  health: [
    'Patient assessment protocol',
    'Infection control measures',
    'Documentation requirements',
    'Pain management protocol',
    'Wound monitoring schedule',
    'Equipment sterilization',
    'Staff PPE requirements',
    'Emergency response plan'
  ],
  medical_procedure: [
    'Pre-procedure assessment',
    'Required sterile equipment',
    'Infection control protocol',
    'Pain management steps',
    'Wound assessment criteria',
    'Documentation checklist',
    'Post-procedure monitoring',
    'Patient education points'
  ],
  business: [
    'Market analysis',
    'ROI projections',
    'Risk assessment',
    'Resource allocation',
    'Timeline milestones',
    'Success metrics',
    'Stakeholder management',
    'Budget considerations'
  ],
  creative: [
    'Style guidelines',
    'Brand alignment',
    'Target audience',
    'Technical specifications',
    'Review process',
    'Asset requirements',
    'Timeline constraints',
    'Distribution channels'
  ],
  general: [
    'Quality standards',
    'Timeline requirements',
    'Resource needs',
    'Success metrics',
    'Risk factors',
    'Documentation needs',
    'Review process',
    'Stakeholder involvement'
  ]
};

function detectDomain(text: string): keyof typeof sentencePatterns {
  const keywords = {
    education: ['learn', 'study', 'teach', 'student', 'school', 'education', 'training', 'curriculum'],
    technology: ['software', 'system', 'code', 'data', 'technical', 'development', 'programming', 'api'],
    health: ['health', 'medical', 'patient', 'clinical', 'hospital', 'care'],
    medical_procedure: ['procedure', 'dressing', 'wound', 'treatment', 'sterile', 'bandage', 'assessment'],
    business: ['business', 'market', 'customer', 'product', 'service', 'strategy', 'revenue', 'sales'],
    creative: ['design', 'creative', 'visual', 'artistic', 'content', 'brand', 'style', 'aesthetic']
  };

  const matches = Object.entries(keywords).map(([domain, words]) => ({
    domain,
    count: words.filter(word => text.toLowerCase().includes(word)).length
  }));

  const bestMatch = matches.reduce((max, curr) => 
    curr.count > max.count ? curr : max, 
    { domain: 'general', count: 0 }
  );

  return bestMatch.domain as keyof typeof sentencePatterns;
}

function capitalizeSentences(text: string): string {
  const sentences = text.split(/([.!?]+\s+)/).filter(Boolean);
  
  return sentences.map((part, index) => {
    if (index === 0 || sentences[index - 1].match(/[.!?]+\s+$/)) {
      return part.charAt(0).toUpperCase() + part.slice(1);
    }
    return part;
  }).join('');
}

function ensureEndWithPeriod(text: string): string {
  if (!text.trim().match(/[.!?]$/)) {
    return text.trim() + '.';
  }
  return text;
}

export function enhancePrompt(prompt: string): EnhancedPromptResult {
  const domain = detectDomain(prompt.trim());
  const patterns = sentencePatterns[domain];
  
  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
  const enhanced = capitalizeSentences(ensureEndWithPeriod(selectedPattern(prompt.trim())));

  const additions = shuffle(domainAdditions[domain]).slice(0, 5);

  return {
    mainPrompt: enhanced,
    requirements: [],
    considerations: [],
    context: [],
    additions
  };
}