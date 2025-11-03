import { Industry, Question, QuestionFlow } from '@/types';

/**
 * Industry-specific question templates
 * These guide the coaching conversation based on business type
 */

const saasQuestions: Question[] = [
  {
    id: 'saas_1',
    text: 'What is your monthly recurring revenue (MRR)?',
    type: 'numeric',
    category: 'metrics',
  },
  {
    id: 'saas_2',
    text: 'How many active customers do you currently have?',
    type: 'numeric',
    category: 'metrics',
  },
  {
    id: 'saas_3',
    text: 'What is your average customer acquisition cost (CAC)?',
    type: 'numeric',
    category: 'metrics',
  },
  {
    id: 'saas_4',
    text: 'What is your monthly churn rate (percentage of customers who cancel)?',
    type: 'numeric',
    category: 'metrics',
  },
  {
    id: 'saas_5',
    text: 'What pricing model are you using?',
    type: 'choice',
    category: 'pricing',
    options: ['Per-user/seat', 'Usage-based', 'Tiered features', 'Flat rate', 'Freemium'],
  },
  {
    id: 'saas_6',
    text: 'What is your current pricing (or average revenue per user)?',
    type: 'numeric',
    category: 'pricing',
  },
  {
    id: 'saas_7',
    text: 'What is your gross margin percentage?',
    type: 'numeric',
    category: 'metrics',
  },
];

const servicesQuestions: Question[] = [
  {
    id: 'services_1',
    text: 'What type of service business do you run?',
    type: 'choice',
    category: 'business',
    options: ['Consulting', 'Agency', 'Professional services', 'Freelance', 'Other'],
  },
  {
    id: 'services_2',
    text: 'What is your annual revenue?',
    type: 'numeric',
    category: 'metrics',
  },
  {
    id: 'services_3',
    text: 'How do you currently price your services?',
    type: 'choice',
    category: 'pricing',
    options: ['Hourly rate', 'Project-based', 'Monthly retainer', 'Value-based', 'Mixed'],
  },
  {
    id: 'services_4',
    text: 'If you charge hourly, what is your current rate?',
    type: 'numeric',
    category: 'pricing',
  },
  {
    id: 'services_5',
    text: 'What is your annual salary cost (or salary equivalent if you are the owner)?',
    type: 'numeric',
    category: 'metrics',
  },
  {
    id: 'services_6',
    text: 'What is your annual overhead (rent, software, insurance, etc.)?',
    type: 'numeric',
    category: 'metrics',
  },
  {
    id: 'services_7',
    text: 'How many billable hours do you average per year (realistically)?',
    type: 'numeric',
    category: 'metrics',
  },
];

const restaurantQuestions: Question[] = [
  {
    id: 'restaurant_1',
    text: 'What is your annual or monthly revenue?',
    type: 'numeric',
    category: 'metrics',
  },
  {
    id: 'restaurant_2',
    text: 'What is your food cost as a percentage of revenue?',
    type: 'numeric',
    category: 'metrics',
  },
  {
    id: 'restaurant_3',
    text: 'What is your labor cost as a percentage of revenue?',
    type: 'numeric',
    category: 'metrics',
  },
  {
    id: 'restaurant_4',
    text: 'What type of restaurant are you running?',
    type: 'choice',
    category: 'business',
    options: ['Quick service', 'Fast casual', 'Full service', 'Fine dining', 'Café/coffee shop'],
  },
  {
    id: 'restaurant_5',
    text: 'What is your average check size per customer?',
    type: 'numeric',
    category: 'metrics',
  },
  {
    id: 'restaurant_6',
    text: 'Are you currently profitable?',
    type: 'boolean',
    category: 'metrics',
  },
];

const retailQuestions: Question[] = [
  {
    id: 'retail_1',
    text: 'What is your monthly or annual revenue?',
    type: 'numeric',
    category: 'metrics',
  },
  {
    id: 'retail_2',
    text: 'Are you primarily online, brick-and-mortar, or both?',
    type: 'choice',
    category: 'business',
    options: ['Online only (e-commerce)', 'Physical store only', 'Both online and physical'],
  },
  {
    id: 'retail_3',
    text: 'What is your average gross margin percentage?',
    type: 'numeric',
    category: 'metrics',
  },
  {
    id: 'retail_4',
    text: 'What is your average order value or transaction size?',
    type: 'numeric',
    category: 'metrics',
  },
  {
    id: 'retail_5',
    text: 'How do you currently price your products?',
    type: 'choice',
    category: 'pricing',
    options: ['Cost-plus (keystone)', 'Match competitors', 'Value-based', 'Dynamic pricing', 'Not sure'],
  },
  {
    id: 'retail_6',
    text: 'What is your inventory turnover rate (times per year)?',
    type: 'numeric',
    category: 'metrics',
  },
];

const manufacturingQuestions: Question[] = [
  {
    id: 'manufacturing_1',
    text: 'What is your annual revenue?',
    type: 'numeric',
    category: 'metrics',
  },
  {
    id: 'manufacturing_2',
    text: 'What is your total cost per unit (materials + labor + overhead)?',
    type: 'numeric',
    category: 'metrics',
  },
  {
    id: 'manufacturing_3',
    text: 'What is your current selling price per unit?',
    type: 'numeric',
    category: 'pricing',
  },
  {
    id: 'manufacturing_4',
    text: 'How many units do you produce/sell per month?',
    type: 'numeric',
    category: 'metrics',
  },
  {
    id: 'manufacturing_5',
    text: 'What is your current gross margin percentage?',
    type: 'numeric',
    category: 'metrics',
  },
  {
    id: 'manufacturing_6',
    text: 'Are you at capacity or do you have room to grow production?',
    type: 'choice',
    category: 'operations',
    options: ['At capacity', 'Room to grow', 'Not sure'],
  },
];

// Map industries to their question flows
export const industryTemplates: Record<Industry, QuestionFlow> = {
  saas: {
    industry: 'saas',
    questions: saasQuestions,
    conditionalQuestions: new Map(),
  },
  services: {
    industry: 'services',
    questions: servicesQuestions,
    conditionalQuestions: new Map(),
  },
  restaurant: {
    industry: 'restaurant',
    questions: restaurantQuestions,
    conditionalQuestions: new Map(),
  },
  retail: {
    industry: 'retail',
    questions: retailQuestions,
    conditionalQuestions: new Map(),
  },
  manufacturing: {
    industry: 'manufacturing',
    questions: manufacturingQuestions,
    conditionalQuestions: new Map(),
  },
  ecommerce: {
    industry: 'ecommerce',
    questions: retailQuestions, // E-commerce uses similar questions to retail
    conditionalQuestions: new Map(),
  },
  other: {
    industry: 'other',
    questions: servicesQuestions, // Default to services questions
    conditionalQuestions: new Map(),
  },
};

// Common follow-up questions that can be used across industries
export const commonFollowUps = {
  negativeCashFlow: {
    id: 'followup_cashflow',
    text: 'You mentioned negative cash flow. How many months of runway do you have at the current burn rate?',
    type: 'numeric' as const,
    category: 'metrics' as const,
  },
  lowMargins: {
    id: 'followup_margins',
    text: 'Your margins seem low. Have you raised prices in the past year?',
    type: 'boolean' as const,
    category: 'pricing' as const,
  },
  highChurn: {
    id: 'followup_churn',
    text: 'High churn often indicates a product or service issue. What are customers saying when they leave?',
    type: 'open' as const,
    category: 'business' as const,
  },
};
