import { CalculationResult } from '@/types';

/**
 * Break-Even Analysis Calculator
 * Formula: Break-Even Units = Fixed Costs / (Price - Variable Cost per Unit)
 */
export function calculateBreakEven(params: {
  fixedCosts: number;
  pricePerUnit: number;
  variableCostPerUnit: number;
}): CalculationResult {
  const { fixedCosts, pricePerUnit, variableCostPerUnit } = params;

  const contributionMargin = pricePerUnit - variableCostPerUnit;
  const breakEvenUnits = fixedCosts / contributionMargin;
  const breakEvenRevenue = breakEvenUnits * pricePerUnit;
  const contributionMarginRatio = contributionMargin / pricePerUnit;

  return {
    type: 'break_even',
    inputs: params,
    outputs: {
      breakEvenUnits: Math.ceil(breakEvenUnits),
      breakEvenRevenue: Math.round(breakEvenRevenue),
      contributionMargin,
      contributionMarginRatio: Math.round(contributionMarginRatio * 100) / 100,
    },
    explanation: `You need to sell ${Math.ceil(breakEvenUnits)} units (generating $${Math.round(breakEvenRevenue).toLocaleString()} in revenue) to cover all costs. Each unit contributes $${contributionMargin.toFixed(2)} toward covering fixed costs.`,
  };
}

/**
 * Cost-Plus Pricing Calculator
 * Formula: Price = Total Cost × (1 + Markup Percentage)
 */
export function calculateCostPlusPricing(params: {
  totalCostPerUnit: number;
  targetMarkupPercentage: number;
}): CalculationResult {
  const { totalCostPerUnit, targetMarkupPercentage } = params;

  const sellingPrice = totalCostPerUnit * (1 + targetMarkupPercentage / 100);
  const profitPerUnit = sellingPrice - totalCostPerUnit;
  const grossMargin = (profitPerUnit / sellingPrice) * 100;

  return {
    type: 'cost_plus',
    inputs: params,
    outputs: {
      sellingPrice: Math.round(sellingPrice * 100) / 100,
      profitPerUnit: Math.round(profitPerUnit * 100) / 100,
      grossMarginPercentage: Math.round(grossMargin * 100) / 100,
    },
    explanation: `With a ${targetMarkupPercentage}% markup on costs of $${totalCostPerUnit}, you should price at $${sellingPrice.toFixed(2)}. This yields a ${grossMargin.toFixed(1)}% gross margin and $${profitPerUnit.toFixed(2)} profit per unit.`,
  };
}

/**
 * LTV:CAC Ratio Calculator (crucial for SaaS and subscription businesses)
 */
export function calculateLTVtoCAC(params: {
  averageRevenuePerUser: number;
  grossMarginPercent: number;
  customerLifetimeMonths: number;
  customerAcquisitionCost: number;
}): CalculationResult {
  const { averageRevenuePerUser, grossMarginPercent, customerLifetimeMonths, customerAcquisitionCost } = params;

  const ltv = averageRevenuePerUser * (grossMarginPercent / 100) * customerLifetimeMonths;
  const ltvToCacRatio = ltv / customerAcquisitionCost;
  const monthsToCacPayback = customerAcquisitionCost / (averageRevenuePerUser * (grossMarginPercent / 100));

  return {
    type: 'ltv_cac',
    inputs: params,
    outputs: {
      ltv: Math.round(ltv),
      ltvToCacRatio: Math.round(ltvToCacRatio * 100) / 100,
      monthsToPayback: Math.round(monthsToCacPayback * 10) / 10,
      isHealthy: ltvToCacRatio >= 3 && monthsToCacPayback <= 12,
    },
    explanation: `Your LTV is $${Math.round(ltv).toLocaleString()} and your LTV:CAC ratio is ${ltvToCacRatio.toFixed(1)}:1. ${ltvToCacRatio >= 3 ? 'This is healthy!' : 'This needs improvement - aim for 3:1 or higher.'} CAC payback period is ${monthsToCacPayback.toFixed(1)} months ${monthsToCacPayback <= 12 ? '(good)' : '(should be under 12 months)'}.`,
  };
}

/**
 * Value-Based Pricing Calculator
 * Formula: Price = (Total Economic Value Created) × (Your Fair Share %)
 */
export function calculateValueBasedPrice(params: {
  economicValueCreated: number;
  fairSharePercentage: number; // typically 10-20%
}): CalculationResult {
  const { economicValueCreated, fairSharePercentage } = params;

  const suggestedPrice = economicValueCreated * (fairSharePercentage / 100);
  const customerValue = economicValueCreated - suggestedPrice;

  return {
    type: 'value_based',
    inputs: params,
    outputs: {
      suggestedPrice: Math.round(suggestedPrice),
      customerRetainedValue: Math.round(customerValue),
      valueMultiple: Math.round((economicValueCreated / suggestedPrice) * 10) / 10,
    },
    explanation: `Based on creating $${economicValueCreated.toLocaleString()} in value, you should charge $${Math.round(suggestedPrice).toLocaleString()} (${fairSharePercentage}% of value created). Customer still gets $${Math.round(customerValue).toLocaleString()} in value - a ${(economicValueCreated / suggestedPrice).toFixed(1)}x return.`,
  };
}

/**
 * Gross Margin Calculator
 */
export function calculateGrossMargin(params: {
  revenue: number;
  costOfGoodsSold: number;
}): CalculationResult {
  const { revenue, costOfGoodsSold } = params;

  const grossProfit = revenue - costOfGoodsSold;
  const grossMarginPercent = (grossProfit / revenue) * 100;
  const markupPercent = (grossProfit / costOfGoodsSold) * 100;

  return {
    type: 'gross_margin',
    inputs: params,
    outputs: {
      grossProfit: Math.round(grossProfit),
      grossMarginPercent: Math.round(grossMarginPercent * 100) / 100,
      markupPercent: Math.round(markupPercent * 100) / 100,
    },
    explanation: `With revenue of $${revenue.toLocaleString()} and COGS of $${costOfGoodsSold.toLocaleString()}, your gross margin is ${grossMarginPercent.toFixed(1)}% (markup of ${markupPercent.toFixed(1)}%). Remember: margin and markup are different!`,
  };
}

/**
 * Service Business Hourly Rate Calculator
 * Calculates fully-loaded hourly rate for service businesses
 */
export function calculateServiceHourlyRate(params: {
  annualSalary: number;
  benefitsPercent: number; // typically 25-30%
  allocatedOverhead: number;
  billableHoursPerYear: number; // typically 1200-1500, not 2080
  targetMarginPercent: number;
}): CalculationResult {
  const { annualSalary, benefitsPercent, allocatedOverhead, billableHoursPerYear, targetMarginPercent } = params;

  const laborBurden = annualSalary * (benefitsPercent / 100);
  const totalAnnualCost = annualSalary + laborBurden + allocatedOverhead;
  const costPerHour = totalAnnualCost / billableHoursPerYear;
  const billRate = costPerHour / (1 - targetMarginPercent / 100);
  const profitPerHour = billRate - costPerHour;

  return {
    type: 'service_hourly_rate',
    inputs: params,
    outputs: {
      fullyLoadedCostPerHour: Math.round(costPerHour * 100) / 100,
      minimumBillRate: Math.round(billRate * 100) / 100,
      profitPerHour: Math.round(profitPerHour * 100) / 100,
      totalAnnualCost: Math.round(totalAnnualCost),
    },
    explanation: `With a fully-loaded cost of $${costPerHour.toFixed(2)}/hour (including salary, ${benefitsPercent}% benefits, and overhead), you need to charge at least $${billRate.toFixed(2)}/hour to achieve a ${targetMarginPercent}% margin. This yields $${profitPerHour.toFixed(2)}/hour in profit.`,
  };
}

/**
 * Restaurant Menu Pricing Calculator
 * Formula: Menu Price = Recipe Cost / Target Food Cost Percentage
 */
export function calculateMenuPrice(params: {
  recipeCost: number;
  targetFoodCostPercent: number; // typically 28-35%
}): CalculationResult {
  const { recipeCost, targetFoodCostPercent } = params;

  const menuPrice = recipeCost / (targetFoodCostPercent / 100);
  const grossProfit = menuPrice - recipeCost;
  const grossMarginPercent = (grossProfit / menuPrice) * 100;

  return {
    type: 'menu_pricing',
    inputs: params,
    outputs: {
      menuPrice: Math.round(menuPrice * 100) / 100,
      grossProfit: Math.round(grossProfit * 100) / 100,
      grossMarginPercent: Math.round(grossMarginPercent * 100) / 100,
    },
    explanation: `With recipe cost of $${recipeCost.toFixed(2)} and target food cost of ${targetFoodCostPercent}%, price at $${menuPrice.toFixed(2)}. This gives you $${grossProfit.toFixed(2)} per dish to cover labor, overhead, and profit.`,
  };
}

/**
 * Price Increase Impact Calculator
 * Shows the impact of raising prices on revenue and profit
 */
export function calculatePriceIncreaseImpact(params: {
  currentPrice: number;
  currentVolume: number;
  priceIncreasePercent: number;
  expectedChurnPercent: number;
  currentMarginPercent: number;
}): CalculationResult {
  const { currentPrice, currentVolume, priceIncreasePercent, expectedChurnPercent, currentMarginPercent } = params;

  const newPrice = currentPrice * (1 + priceIncreasePercent / 100);
  const newVolume = currentVolume * (1 - expectedChurnPercent / 100);

  const currentRevenue = currentPrice * currentVolume;
  const newRevenue = newPrice * newVolume;
  const revenueChange = newRevenue - currentRevenue;
  const revenueChangePercent = (revenueChange / currentRevenue) * 100;

  const currentProfit = currentRevenue * (currentMarginPercent / 100);
  const newProfit = newRevenue * (currentMarginPercent / 100);
  const profitChange = newProfit - currentProfit;
  const profitChangePercent = (profitChange / currentProfit) * 100;

  return {
    type: 'price_increase_impact',
    inputs: params,
    outputs: {
      newPrice: Math.round(newPrice * 100) / 100,
      newVolume: Math.round(newVolume),
      newRevenue: Math.round(newRevenue),
      revenueChange: Math.round(revenueChange),
      revenueChangePercent: Math.round(revenueChangePercent * 10) / 10,
      profitChange: Math.round(profitChange),
      profitChangePercent: Math.round(profitChangePercent * 10) / 10,
    },
    explanation: `Increasing price by ${priceIncreasePercent}% (from $${currentPrice} to $${newPrice.toFixed(2)}) with ${expectedChurnPercent}% churn changes revenue by ${revenueChangePercent >= 0 ? '+' : ''}${revenueChangePercent.toFixed(1)}% and profit by ${profitChangePercent >= 0 ? '+' : ''}${profitChangePercent.toFixed(1)}%. ${revenueChange > 0 ? 'This is a net positive move!' : 'This needs reconsideration.'}`,
  };
}
