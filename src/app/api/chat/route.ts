import { NextRequest, NextResponse } from 'next/server';
import { PricingCoachAgent } from '@/agents/pricing-coach';
import { prisma } from '@/lib/db/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId, businessId } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Create or retrieve coaching session
    let session;
    if (sessionId) {
      session = await prisma.coachingSession.findUnique({
        where: { id: sessionId },
        include: { messages: true },
      });
    }

    // Initialize agent with existing context if available
    const agent = new PricingCoachAgent(process.env.ANTHROPIC_API_KEY || '');

    // If session exists, restore conversation history
    if (session) {
      const history = session.messages.map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content,
        timestamp: msg.timestamp,
      }));
      agent.getContext().conversationHistory = history;
    }

    // Get response from agent
    const response = await agent.sendMessage(message);

    // Save message to database
    if (sessionId) {
      // Save user message
      await prisma.message.create({
        data: {
          sessionId,
          role: 'user',
          content: message,
        },
      });

      // Save assistant response
      await prisma.message.create({
        data: {
          sessionId,
          role: 'assistant',
          content: response.content,
          metadata: response.metadata,
        },
      });
    }

    return NextResponse.json({
      response: response.content,
      context: agent.getContext(),
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
