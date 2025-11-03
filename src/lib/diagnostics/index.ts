import {
  BusinessMetrics,
  DiagnosticResult,
  Problem,
  Opportunity,
  Industry,
  FocusArea,
} from '@/types';

/**
 * Diagnostic Engine
 * Analyzes business metrics to identify problems and opportunities
 */

export function diagnoseBusiness(
  metrics: BusinessMetrics,
  industry: Industry
): DiagnosticResult {
  const problems: Problem[] = [];
  const opportunities: Opportunity[] = [];

  // Check for negative cash flow / unprofitability
  if (metrics.netMargin !== undefined && metrics.netMargin < 0) {
    problems.push({
      type: 'negative_cash_flow',
      severity: 'critical',
      description: 'Negative net margin - losing money on every sale',
      impact: 'Business is unsustainable without immediate changes. Typical timeline to failure: 6-18 months.',
      metrics: { netMargin: metrics.netMargin },
    });
  }

  // Check for low gross margins
  if (metrics.grossMargin !== undefined) {
    const industryBenchmarks: Record<Industry, number> = {
      saas: 70,
      services: 50,
      restaurant: 65,
      retail: 40,
      manufacturing: 25,
      ecommerce: 40,
      other: 40,
    };

    const benchmark = industryBenchmarks[industry];
    if (metrics.grossMargin < benchmark - 15) {
      problems.push({
        type: 'low_gross_margin',
        severity: 'high',
        description: `Gross margin of ${metrics.grossMargin.toFixed(1)}% is well below industry standard of ${benchmark}%`,
        impact: 'Insufficient margin to cover overhead and generate profit. Likely underpricing or high cost structure.',
        metrics: { grossMargin: metrics.grossMargin, benchmark },
      });
    }
  }

  // Check LTV:CAC ratio (for SaaS and subscription businesses)
  if (metrics.ltv !== undefined && metrics.cac !== undefined) {
    const ltvToCacRatio = metrics.ltv / metrics.cac;

    if (ltvToCacRatio < 3) {
      problems.push({
        type: 'poor_ltv_cac',
        severity: ltvToCacRatio < 1.5 ? 'critical' : 'high',
        description: `LTV:CAC ratio of ${ltvToCacRatio.toFixed(1)}:1 is below the healthy 3:1 threshold`,
        impact: 'Unit economics don\'t support sustainable growth. You\'re spending too much to acquire customers relative to their value.',
        metrics: { ltv: metrics.ltv, cac: metrics.cac, ratio: ltvToCacRatio },
      });

      // Add opportunities for improvement
      opportunities.push({
        type: 'increase_ltv',
        potential: 'high',
        description: 'Increase customer lifetime value through upsells, retention programs, or price increases',
        estimatedImpact: `Doubling LTV from $${metrics.ltv} to $${metrics.ltv * 2} would make unit economics healthy`,
      });
    }
  }

  // Check for high churn (subscription businesses)
  if (metrics.churnRate !== undefined && metrics.churnRate > 5) {
    problems.push({
      type: 'high_churn',
      severity: metrics.churnRate > 10 ? 'critical' : 'high',
      description: `Monthly churn rate of ${metrics.churnRate.toFixed(1)}% is above healthy thresholds (3-5%)`,
      impact: 'High churn destroys LTV and makes growth unsustainable. Often indicates product/market fit issues, not just pricing.',
      metrics: { churnRate: metrics.churnRate },
    });
  }

  // Check if at capacity but not profitable (operations issue)
  if (
    metrics.revenue !== undefined &&
    metrics.netMargin !== undefined &&
    metrics.netMargin < 10
  ) {
    opportunities.push({
      type: 'operational_efficiency',
      potential: 'high',
      description: 'Focus on operational efficiency and cost reduction alongside pricing',
      estimatedImpact: 'Could improve margins by 5-15 percentage points without changing prices',
    });
  }

  // Check for pricing power opportunity
  if (
    metrics.grossMargin !== undefined &&
    metrics.grossMargin > 50 &&
    metrics.netMargin !== undefined &&
    metrics.netMargin < 15
  ) {
    opportunities.push({
      type: 'price_increase',
      potential: 'high',
      description: 'Strong gross margins suggest room for strategic price increases',
      estimatedImpact: 'A 10% price increase could boost profit by 50-100% with minimal churn',
    });
  }

  // Check for low CAC (opportunity to invest in growth)
  if (
    metrics.cac !== undefined &&
    metrics.ltv !== undefined &&
    metrics.ltv / metrics.cac > 5
  ) {
    opportunities.push({
      type: 'growth_opportunity',
      potential: 'high',
      description: 'Excellent unit economics allow aggressive customer acquisition',
      estimatedImpact: 'Could 2-3x marketing spend and still maintain healthy margins',
    });
  }

  // Determine focus area based on problems
  const focusArea = determineFocusArea(problems, opportunities, metrics);
  const urgency = determineUrgency(problems);

  return {
    problems,
    opportunities,
    focusArea,
    urgency,
  };
}

function determineFocusArea(
  problems: Problem[],
  opportunities: Opportunity[],
  metrics: BusinessMetrics
): FocusArea {
  // Critical profitability issue = pricing focus
  if (problems.some(p => p.type === 'negative_cash_flow' || p.type === 'low_gross_margin')) {
    return 'pricing';
  }

  // LTV:CAC issues = could be pricing or operations
  if (problems.some(p => p.type === 'poor_ltv_cac')) {
    // If CAC is high, it's a marketing/sales issue
    if (metrics.cac && metrics.ltv && metrics.cac > metrics.ltv * 0.5) {
      return 'marketing';
    }
    // If LTV is low, it's likely pricing
    return 'pricing';
  }

  // High churn = product/operations issue usually
  if (problems.some(p => p.type === 'high_churn')) {
    return 'operations';
  }

  // If no major problems, look for opportunities
  if (opportunities.some(o => o.type === 'price_increase')) {
    return 'pricing';
  }

  if (opportunities.some(o => o.type === 'growth_opportunity')) {
    return 'marketing';
  }

  // Default to pricing since that's our specialty
  return 'pricing';
}

function determineUrgency(problems: Problem[]): 'low' | 'medium' | 'high' | 'critical' {
  if (problems.some(p => p.severity === 'critical')) {
    return 'critical';
  }
  if (problems.some(p => p.severity === 'high')) {
    return 'high';
  }
  if (problems.some(p => p.severity === 'medium')) {
    return 'medium';
  }
  return 'low';
}

/**
 * Generate recommendations based on diagnostic results
 */
export function generateRecommendations(
  diagnostic: DiagnosticResult,
  metrics: BusinessMetrics,
  industry: Industry
): string {
  const { problems, opportunities, focusArea, urgency } = diagnostic;

  let recommendations = '';

  if (urgency === 'critical') {
    recommendations += 'This requires immediate action. ';
  }

  // Main focus area recommendation
  switch (focusArea) {
    case 'pricing':
      recommendations += 'Your primary issue is pricing strategy. ';
      if (problems.some(p => p.type === 'low_gross_margin')) {
        recommendations += 'You need to increase prices or reduce costs - likely both. ';
      }
      break;

    case 'operations':
      recommendations += 'While we can optimize pricing, your main issue is operational. ';
      if (problems.some(p => p.type === 'high_churn')) {
        recommendations += 'High churn suggests product/service quality or customer success issues. ';
      }
      break;

    case 'marketing':
      recommendations += 'Your pricing might be fine - the issue is customer acquisition. ';
      break;

    case 'sales':
      recommendations += 'Focus on sales process and conversion optimization. ';
      break;
  }

  return recommendations;
}
