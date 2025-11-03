// Business Types
export type Industry =
  | 'saas'
  | 'services'
  | 'retail'
  | 'restaurant'
  | 'manufacturing'
  | 'ecommerce'
  | 'other';

export type PricingModel =
  | 'hourly'
  | 'project'
  | 'subscription'
  | 'per-unit'
  | 'tiered'
  | 'freemium'
  | 'value-based';

export type FocusArea = 'pricing' | 'operations' | 'marketing' | 'sales' | 'product';

export interface BusinessMetrics {
  revenue?: number;
  monthlyRevenue?: number;
  costs?: number;
  grossMargin?: number;
  netMargin?: number;
  customersCount?: number;
  cac?: number; // Customer Acquisition Cost
  ltv?: number; // Lifetime Value
  churnRate?: number;
  averageOrderValue?: number;
}

export interface PricingStructure {
  model: PricingModel;
  currentPrice?: number;
  tiers?: Array<{
    name: string;
    price: number;
    features?: string[];
  }>;
  discounts?: Array<{
    type: string;
    amount: number;
  }>;
}

export interface DiagnosticResult {
  problems: Problem[];
  opportunities: Opportunity[];
  focusArea: FocusArea;
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

export interface Problem {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impact: string;
  metrics?: Record<string, number>;
}

export interface Opportunity {
  type: string;
  potential: 'low' | 'medium' | 'high';
  description: string;
  estimatedImpact: string;
}

export interface Recommendation {
  title: string;
  category: FocusArea;
  priority: 'low' | 'medium' | 'high';
  description: string;
  implementation: string[];
  expectedOutcome: string;
  timeframe: string;
  calculations?: CalculationResult;
}

export interface CalculationResult {
  type: string;
  inputs: Record<string, number>;
  outputs: Record<string, number | boolean>;
  explanation: string;
}

// Coach Types
export interface CoachMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    questionType?: string;
    calculations?: CalculationResult[];
    recommendations?: Recommendation[];
  };
}

export interface CoachingContext {
  businessId?: string;
  sessionId?: string;
  industry?: Industry;
  metrics?: BusinessMetrics;
  pricing?: PricingStructure;
  conversationHistory: CoachMessage[];
  currentStage: CoachingStage;
}

export type CoachingStage =
  | 'introduction'
  | 'discovery'
  | 'metrics-gathering'
  | 'diagnosis'
  | 'solution-building'
  | 'implementation-planning'
  | 'complete';

// Question Types
export interface Question {
  id: string;
  text: string;
  type: 'open' | 'numeric' | 'choice' | 'boolean';
  category: 'business' | 'metrics' | 'pricing' | 'operations' | 'market';
  options?: string[];
  validation?: (answer: string | number) => boolean;
  followUp?: (answer: string | number) => Question[];
}

export interface QuestionFlow {
  industry: Industry;
  questions: Question[];
  conditionalQuestions: Map<string, Question[]>;
}
