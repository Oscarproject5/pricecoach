import { NextRequest, NextResponse } from 'next/server';
import * as calculators from '@/lib/calculators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, params } = body;

    if (!type || !params) {
      return NextResponse.json(
        { error: 'Calculation type and params are required' },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case 'break_even':
        result = calculators.calculateBreakEven(params);
        break;
      case 'cost_plus':
        result = calculators.calculateCostPlusPricing(params);
        break;
      case 'ltv_cac':
        result = calculators.calculateLTVtoCAC(params);
        break;
      case 'value_based':
        result = calculators.calculateValueBasedPrice(params);
        break;
      case 'gross_margin':
        result = calculators.calculateGrossMargin(params);
        break;
      case 'service_hourly':
        result = calculators.calculateServiceHourlyRate(params);
        break;
      case 'menu_pricing':
        result = calculators.calculateMenuPrice(params);
        break;
      case 'price_increase':
        result = calculators.calculatePriceIncreaseImpact(params);
        break;
      default:
        return NextResponse.json({ error: 'Unknown calculation type' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Calculate API error:', error);
    return NextResponse.json(
      { error: error.message || 'Calculation failed' },
      { status: 500 }
    );
  }
}
