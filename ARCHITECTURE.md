# 🏗️ Architecture Guide

## Overview

Price Coach is built as a conversational AI agent using Anthropic's Claude API with a Next.js frontend and Prisma database layer. The architecture follows a clear separation of concerns between the AI agent logic, business logic, and presentation layers.

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │ Landing    │  │ Chat UI    │  │ Dashboard  │        │
│  │ Page       │  │ Component  │  │ (Future)   │        │
│  └────────────┘  └────────────┘  └────────────┘        │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP/REST
┌──────────────────────▼──────────────────────────────────┐
│                   API Routes (Next.js)                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │ /start     │  │ /chat      │  │ /calculate │        │
│  └────────────┘  └────────────┘  └────────────┘        │
└──────┬───────────────┬───────────────┬─────────────────┘
       │               │               │
┌──────▼───────┐  ┌───▼────────────┐ ┌▼───────────────┐
│ Pricing      │  │  Diagnostic    │ │  Calculator    │
│ Coach Agent  │  │  Engine        │ │  Library       │
│              │  │                │ │                │
│ (Claude SDK) │  │  - Analyzes    │ │  - Break-even  │
│              │  │    metrics     │ │  - LTV:CAC     │
│  - System    │  │  - Identifies  │ │  - Margins     │
│    prompts   │  │    problems    │ │  - Value-based │
│  - Context   │  │  - Suggests    │ │  - And more... │
│    tracking  │  │    focus area  │ │                │
│  - Convs     │  │                │ │                │
└──────┬───────┘  └───┬────────────┘ └┬───────────────┘
       │              │               │
       └──────────────┴───────────────┘
                      │
┌─────────────────────▼─────────────────────────┐
│              Database (Prisma + SQLite)       │
│  ┌──────────┐ ┌────────┐ ┌─────────┐ ┌──────┐│
│  │Business  │ │Session │ │Message  │ │Report││
│  └──────────┘ └────────┘ └─────────┘ └──────┘│
└───────────────────────────────────────────────┘
```

## Core Components

### 1. Pricing Coach Agent (`src/agents/pricing-coach.ts`)

The heart of the application. This class manages the conversational AI interaction with Claude.

**Key Responsibilities:**
- Maintains conversation history and context
- Calls Anthropic Claude API
- Extracts business information from conversations
- Updates coaching stage based on conversation progress
- Integrates with diagnostic engine and calculators

**Key Methods:**
- `startSession()`: Initialize a new coaching session
- `sendMessage()`: Send user message and get coach response
- `buildSystemPrompt()`: Constructs system prompt with current context
- `updateContext()`: Extracts information from conversation
- `runCalculation()`: Execute pricing calculations

**Context Management:**
The agent maintains a `CoachingContext` object that tracks:
- Conversation history
- Business metrics
- Industry type
- Current coaching stage (introduction → discovery → diagnosis → solution → implementation)

### 2. Diagnostic Engine (`src/lib/diagnostics/index.ts`)

Analyzes business metrics to identify problems and opportunities.

**Functions:**
- `diagnoseBusiness()`: Main diagnostic function that identifies:
  - Problems (negative cash flow, low margins, high churn, poor LTV:CAC)
  - Opportunities (price increases, growth opportunities, operational efficiency)
  - Focus area (pricing, operations, marketing, sales)
  - Urgency level (low, medium, high, critical)

- `generateRecommendations()`: Creates actionable recommendations based on diagnostic results

**How It Works:**
1. Receives business metrics and industry
2. Compares against industry benchmarks
3. Identifies specific problems with severity levels
4. Suggests opportunities for improvement
5. Determines primary focus area
6. Assesses urgency

### 3. Calculator Library (`src/lib/calculators/index.ts`)

Collection of pricing calculation utilities used by the coach.

**Available Calculators:**

| Calculator | Use Case | Key Output |
|------------|----------|------------|
| `calculateBreakEven` | Find profitability threshold | Units/revenue needed to break even |
| `calculateCostPlusPricing` | Set prices based on costs | Selling price with target markup |
| `calculateLTVtoCAC` | SaaS unit economics | LTV:CAC ratio, payback period |
| `calculateValueBasedPrice` | Price based on value created | Price as % of customer value |
| `calculateGrossMargin` | Understand profitability | Margin % and markup % |
| `calculateServiceHourlyRate` | Service business pricing | Fully-loaded hourly rate |
| `calculateMenuPrice` | Restaurant pricing | Menu price from food cost |
| `calculatePriceIncreaseImpact` | Model price changes | Revenue/profit impact of increases |

Each calculator returns a `CalculationResult` with:
- Type identifier
- Input parameters
- Output metrics
- Human-readable explanation

### 4. Industry Templates (`src/lib/templates/industry-questions.ts`)

Pre-configured question flows for different business types.

**Industries Supported:**
- SaaS/Software
- Professional Services
- Restaurants
- Retail
- E-commerce
- Manufacturing

Each template includes:
- Industry-specific questions
- Appropriate question types (numeric, choice, boolean, open)
- Question categories (business, metrics, pricing, operations)
- Conditional follow-up logic

### 5. API Routes

**`/api/session/start` (POST)**
- Creates new business record (if needed)
- Initializes coaching session
- Returns greeting message
- Sets up conversation context

**`/api/chat` (POST)**
- Accepts user message and session ID
- Loads conversation history
- Calls Pricing Coach Agent
- Saves messages to database
- Returns coach response

**`/api/calculate` (POST)**
- Executes standalone calculations
- Doesn't require active session
- Useful for quick pricing checks

### 6. Database Schema

**Business**
- Core business information
- Metrics (revenue, costs, margins, customers)
- Pricing structure
- Identified problems and recommendations
- Related sessions and reports

**CoachingSession**
- Tracks individual coaching conversations
- Links to business
- Stores session status and focus area
- Contains all messages in the conversation

**Message**
- Individual messages in a conversation
- Role (user, assistant, system)
- Content and timestamp
- Optional metadata (calculations, recommendations)

**Report**
- Generated reports with findings
- Recommendations and action items
- Links to business
- Optional PDF path for exports

## Data Flow

### Starting a Session

```
User → Landing Page
  ↓
  Enters business name & industry
  ↓
POST /api/session/start
  ↓
  - Create/find business record
  - Create coaching session
  - Initialize PricingCoachAgent
  - Get greeting message
  - Save to database
  ↓
  Return sessionId & greeting
  ↓
Chat Page with sessionId
```

### Sending a Message

```
User types message → Chat UI
  ↓
POST /api/chat
  ↓
  Load session from database
  ↓
  Create PricingCoachAgent
  ↓
  Restore conversation history
  ↓
  agent.sendMessage(userMessage)
    ↓
    - Build system prompt with context
    - Add diagnostic info if available
    - Call Anthropic Claude API
    - Extract business info from response
    - Update coaching stage
    ↓
  Save messages to database
  ↓
  Return coach response
  ↓
Chat UI displays response
```

### Coach's Decision-Making

```
User Message
  ↓
Context Analysis
  - What stage are we in?
  - What industry?
  - What metrics do we have?
  ↓
Diagnostic Engine (if enough data)
  - Analyze metrics
  - Identify problems
  - Find opportunities
  - Determine focus area
  ↓
System Prompt Construction
  - Base coaching personality
  - Current stage instructions
  - Known metrics
  - Diagnostic findings
  - Recommended approach
  ↓
Claude API
  - Generates response
  - Asks follow-up questions
  - Runs calculations
  - Provides recommendations
  ↓
Response Processing
  - Extract numbers mentioned
  - Update business metrics
  - Advance coaching stage
  - Store context
```

## Key Design Decisions

### Why Anthropic Claude?

- Excellent at following complex system prompts
- Strong at numerical reasoning and calculations
- Good at maintaining conversational context
- Natural coaching tone

### Why Next.js?

- Server-side rendering for fast initial loads
- API routes for backend logic
- Built-in TypeScript support
- Great developer experience

### Why Prisma?

- Type-safe database access
- Easy schema management
- Works with SQLite (dev) and PostgreSQL (prod)
- Excellent migrations

### Why SQLite for Development?

- Zero configuration
- File-based (no server needed)
- Easy to reset and test
- Can upgrade to PostgreSQL for production

## Extending the System

### Adding a New Calculator

1. Create function in `src/lib/calculators/index.ts`:
```typescript
export function calculateNewMetric(params: {
  input1: number;
  input2: number;
}): CalculationResult {
  const result = input1 * input2; // your logic

  return {
    type: 'new_metric',
    inputs: params,
    outputs: { result },
    explanation: 'Human explanation',
  };
}
```

2. Add case in `PricingCoachAgent.runCalculation()`

3. Update API route `/api/calculate` if needed

### Adding a New Industry

1. Create question array in `src/lib/templates/industry-questions.ts`:
```typescript
const newIndustryQuestions: Question[] = [
  {
    id: 'new_1',
    text: 'Question text?',
    type: 'numeric',
    category: 'metrics',
  },
  // more questions...
];
```

2. Add to `industryTemplates` map:
```typescript
export const industryTemplates: Record<Industry, QuestionFlow> = {
  // existing industries...
  newIndustry: {
    industry: 'newIndustry',
    questions: newIndustryQuestions,
    conditionalQuestions: new Map(),
  },
};
```

3. Update `Industry` type in `src/types/index.ts`

### Customizing the Coach Personality

Edit `src/lib/prompts/coach-system-prompt.ts`:

- Modify coaching style section
- Add/remove expertise areas
- Change tone and language
- Add industry-specific knowledge
- Adjust process steps

### Adding Report Generation

1. Install PDF library (pdfkit already in dependencies)

2. Create report generator in `src/lib/reports/`:
```typescript
export async function generateReport(
  business: Business,
  diagnostic: DiagnosticResult,
  recommendations: Recommendation[]
): Promise<string> {
  // Generate PDF
  // Save to /public/reports/
  // Return path
}
```

3. Add API route `/api/reports/generate`

4. Update UI to display/download reports

## Performance Considerations

- **API Calls**: Each message = 1 Claude API call (~5-15s)
- **Database**: All queries are simple lookups (fast with SQLite)
- **Context Window**: Claude has 200k tokens - enough for long conversations
- **Caching**: Consider caching diagnostic results if metrics don't change

## Security Considerations

- **API Keys**: Never expose ANTHROPIC_API_KEY to client
- **Input Validation**: Validate all user inputs before DB
- **Rate Limiting**: Consider adding rate limits to prevent abuse
- **Authentication**: Add auth before production deployment

## Testing Strategy

- **Unit Tests**: Test calculators independently
- **Integration Tests**: Test API routes with mocked Anthropic
- **E2E Tests**: Test full coaching flow
- **Manual Testing**: Actually use the coach with real scenarios

## Deployment Checklist

- [ ] Set up PostgreSQL database
- [ ] Add environment variables to hosting platform
- [ ] Run database migrations
- [ ] Set up monitoring/logging
- [ ] Add error tracking (e.g., Sentry)
- [ ] Configure CORS if needed
- [ ] Set up CI/CD pipeline
- [ ] Add authentication
- [ ] Configure rate limiting
- [ ] Set up backups

## Future Enhancements

- [ ] PDF report generation
- [ ] Dashboard with metrics visualization
- [ ] Multi-user support with authentication
- [ ] Competitor analysis module
- [ ] Integration with accounting software (QuickBooks, Xero)
- [ ] Email notifications
- [ ] Scheduled check-ins
- [ ] A/B testing framework
- [ ] Mobile app
- [ ] API for third-party integrations

## Troubleshooting

**Coach gives generic responses**
- Check that system prompt is loading correctly
- Verify diagnostic info is being passed to Claude
- Ensure conversation history is maintained

**Calculations are wrong**
- Verify input parameters are correct types
- Check calculator logic for edge cases
- Test calculators independently

**Database errors**
- Ensure Prisma client is generated
- Check DATABASE_URL is correct
- Verify schema is pushed to database

**Slow responses**
- Normal for complex questions (Claude is thinking)
- Check API key rate limits
- Consider caching for repeated queries

---

This architecture provides a solid foundation for a production-ready pricing coach while remaining flexible enough to extend and customize based on your specific needs.
