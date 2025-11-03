import { NextRequest, NextResponse } from 'next/server';
import { PricingCoachAgent } from '@/agents/pricing-coach';
import { prisma } from '@/lib/db/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessName, industry, businessId } = body;

    // Create or get business - always ensure we have a business!
    let business;
    if (businessId) {
      business = await prisma.business.findUnique({ where: { id: businessId } });
      if (!business) {
        return NextResponse.json(
          { error: 'Business not found' },
          { status: 404 }
        );
      }
    } else {
      // Always create a business if none provided
      business = await prisma.business.create({
        data: {
          name: businessName || 'My Business',
          industry: industry || 'other',
        },
      });
    }

    // Create coaching session (business is guaranteed to exist now)
    const session = await prisma.coachingSession.create({
      data: {
        businessId: business.id,
        status: 'active',
      },
    });

    // Initialize agent and get greeting
    const agent = new PricingCoachAgent(process.env.ANTHROPIC_API_KEY || '');
    const greeting = await agent.startSession();

    // Save greeting message
    await prisma.message.create({
      data: {
        sessionId: session.id,
        role: 'assistant',
        content: greeting.content,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      businessId: business?.id,
      message: greeting.content,
    });
  } catch (error: any) {
    console.error('Start session error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to start session' },
      { status: 500 }
    );
  }
}
