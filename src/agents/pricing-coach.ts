import Anthropic from '@anthropic-ai/sdk';
import { CoachingContext, CoachMessage, Industry, BusinessMetrics } from '@/types';
import { COACH_SYSTEM_PROMPT, INITIAL_GREETING } from '@/lib/prompts/coach-system-prompt';
import { diagnoseBusiness, generateRecommendations } from '@/lib/diagnostics';
import * as calculators from '@/lib/calculators';

/**
 * Pricing Coach Agent
 * Main conversational agent using Anthropic Claude
 */

export class PricingCoachAgent {
  private client: Anthropic;
  private context: CoachingContext;

  constructor(apiKey: string, initialContext?: Partial<CoachingContext>) {
    this.client = new Anthropic({
      apiKey: apiKey || process.env.ANTHROPIC_API_KEY || '',
    });

    this.context = {
      conversationHistory: [],
      currentStage: 'introduction',
      ...initialContext,
    };
  }

  /**
   * Start a new coaching session
   */
  async startSession(): Promise<CoachMessage> {
    const greeting: CoachMessage = {
      role: 'assistant',
      content: INITIAL_GREETING,
      timestamp: new Date(),
    };

    this.context.conversationHistory.push(greeting);
    return greeting;
  }

  /**
   * Send a message and get coach's response
   */
  async sendMessage(userMessage: string): Promise<CoachMessage> {
    // Add user message to history
    const userMsg: CoachMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    this.context.conversationHistory.push(userMsg);

    // Build messages for Claude
    const messages = this.buildClaudeMessages();

    try {
      // Call Claude API
      const response = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        system: this.buildSystemPrompt(),
        messages,
      });

      // Extract response content
      const assistantContent = response.content
        .filter(block => block.type === 'text')
        .map(block => (block as { type: 'text'; text: string }).text)
        .join('\n');

      // Create assistant message
      const assistantMsg: CoachMessage = {
        role: 'assistant',
        content: assistantContent,
        timestamp: new Date(),
      };

      this.context.conversationHistory.push(assistantMsg);

      // Update context based on conversation
      await this.updateContext(userMessage, assistantContent);

      return assistantMsg;
    } catch (error) {
      console.error('Error calling Claude API:', error);
      throw new Error('Failed to get response from coach');
    }
  }

  /**
   * Build system prompt with current context
   */
  private buildSystemPrompt(): string {
    let systemPrompt = COACH_SYSTEM_PROMPT;

    // Add context about current stage
    systemPrompt += `\n\n# Current Session Context\n`;
    systemPrompt += `Stage: ${this.context.currentStage}\n`;

    if (this.context.industry) {
      systemPrompt += `Industry: ${this.context.industry}\n`;
    }

    if (this.context.metrics) {
      systemPrompt += `\n## Known Metrics:\n`;
      systemPrompt += JSON.stringify(this.context.metrics, null, 2);
    }

    // If we have enough data, run diagnostics
    if (this.context.metrics && this.context.industry) {
      const diagnostic = diagnoseBusiness(this.context.metrics, this.context.industry);
      const recommendations = generateRecommendations(
        diagnostic,
        this.context.metrics,
        this.context.industry
      );

      systemPrompt += `\n## Diagnostic Analysis:\n`;
      systemPrompt += `Focus Area: ${diagnostic.focusArea}\n`;
      systemPrompt += `Urgency: ${diagnostic.urgency}\n`;
      systemPrompt += `\nProblems Identified:\n`;
      diagnostic.problems.forEach(p => {
        systemPrompt += `- [${p.severity}] ${p.description}\n`;
      });
      systemPrompt += `\nOpportunities:\n`;
      diagnostic.opportunities.forEach(o => {
        systemPrompt += `- [${o.potential}] ${o.description}\n`;
      });
      systemPrompt += `\nRecommendation: ${recommendations}\n`;
    }

    return systemPrompt;
  }

  /**
   * Build messages array for Claude API
   */
  private buildClaudeMessages(): Array<{ role: 'user' | 'assistant'; content: string }> {
    return this.context.conversationHistory
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));
  }

  /**
   * Update context based on conversation
   * Extract business info, metrics, etc.
   */
  private async updateContext(userMessage: string, assistantResponse: string): Promise<void> {
    // Simple pattern matching to extract key information
    // In production, you might use a more sophisticated NLP approach

    // Extract industry mentions
    const industries: Industry[] = ['saas', 'services', 'retail', 'restaurant', 'manufacturing', 'ecommerce'];
    const lowerMessage = userMessage.toLowerCase();

    for (const industry of industries) {
      if (lowerMessage.includes(industry)) {
        this.context.industry = industry;
        break;
      }
    }

    // Extract numbers (revenue, costs, etc.)
    const numbers = userMessage.match(/\$?\d+(?:,\d{3})*(?:\.\d{2})?/g);
    if (numbers && numbers.length > 0) {
      // Initialize metrics if not exists
      if (!this.context.metrics) {
        this.context.metrics = {};
      }

      // You would want more sophisticated extraction here
      // This is a simplified example
    }

    // Update stage based on conversation flow
    if (this.context.currentStage === 'introduction' && this.context.industry) {
      this.context.currentStage = 'discovery';
    }

    if (
      this.context.currentStage === 'discovery' &&
      this.context.metrics &&
      Object.keys(this.context.metrics).length >= 3
    ) {
      this.context.currentStage = 'metrics-gathering';
    }
  }

  /**
   * Get current context
   */
  getContext(): CoachingContext {
    return this.context;
  }

  /**
   * Update metrics manually
   */
  updateMetrics(metrics: Partial<BusinessMetrics>): void {
    this.context.metrics = {
      ...this.context.metrics,
      ...metrics,
    };
  }

  /**
   * Run a specific calculation
   */
  runCalculation(calcType: string, params: any) {
    switch (calcType) {
      case 'break_even':
        return calculators.calculateBreakEven(params);
      case 'cost_plus':
        return calculators.calculateCostPlusPricing(params);
      case 'ltv_cac':
        return calculators.calculateLTVtoCAC(params);
      case 'value_based':
        return calculators.calculateValueBasedPrice(params);
      case 'gross_margin':
        return calculators.calculateGrossMargin(params);
      case 'service_hourly':
        return calculators.calculateServiceHourlyRate(params);
      case 'menu_pricing':
        return calculators.calculateMenuPrice(params);
      case 'price_increase':
        return calculators.calculatePriceIncreaseImpact(params);
      default:
        throw new Error(`Unknown calculation type: ${calcType}`);
    }
  }
}

/**
 * Factory function to create a new coaching session
 */
export function createCoachingSession(apiKey?: string): PricingCoachAgent {
  return new PricingCoachAgent(apiKey || process.env.ANTHROPIC_API_KEY || '');
}
