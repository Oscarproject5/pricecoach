# 💰 Price Coach - Smart Pricing Strategy Agent

An AI-powered business coach that helps companies optimize their pricing strategy. Price Coach asks probing questions, identifies core business problems, and co-creates solutions with business owners.

## 🚀 Two Ways to Use Price Coach

### ⭐ Option 1: Claude Code (Recommended)

**Use your Claude subscription - no API key needed!**

Simply type in Claude Code:
```
/price-coach
```

Start coaching immediately! Perfect for:
- ✅ Solo entrepreneurs and consultants
- ✅ Quick pricing analysis
- ✅ No additional costs beyond your Claude subscription
- ✅ Works directly in your IDE

[See Claude Code guide →](.claude/README.md)

### Option 2: Web Application

Run as a standalone web app with API key. Perfect for:
- ✅ Team deployments
- ✅ Production environments
- ✅ Custom integrations
- ✅ Client-facing tools

[Continue to web app setup →](#getting-started)

## Features

- **Interactive Coaching Sessions**: Conversational AI that adapts to your business type
- **Industry-Specific Templates**: Pre-configured question flows for SaaS, Services, Restaurants, Retail, and Manufacturing
- **Pricing Calculators**: Built-in tools for break-even analysis, LTV/CAC ratios, gross margins, and more
- **Business Diagnostics**: Automatically identifies if pricing is the problem - or if it's operations, marketing, or sales
- **Persistent Sessions**: Save conversations and business metrics across sessions
- **Actionable Reports**: Generate PDF reports with recommendations and implementation plans

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TailwindCSS
- **Backend**: Anthropic Agent SDK (TypeScript), Next.js API Routes
- **Database**: Prisma ORM + SQLite (PostgreSQL ready)
- **AI**: Claude 3.5 Sonnet (Anthropic)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- **Authentication:** Either:
  - Claude Code installed (recommended - uses your existing subscription), OR
  - Anthropic API key ([get one here](https://console.anthropic.com/))

### Installation

1. **Clone and install dependencies:**

```bash
cd price-coach
npm install
```

2. **Set up environment variables:**

The `.env` file is already created. You have two authentication options:

**Option A: Use Claude Code (Recommended)**
If you're using Claude Code, you don't need to set anything! The app will use your existing Claude subscription automatically.

**Option B: Use Anthropic API Key**
If you want to use API credits instead, edit `.env` and add:
```env
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
DATABASE_URL="file:./dev.db"
```

3. **Initialize the database:**

```bash
npx prisma generate
npx prisma db push
```

4. **Run the development server:**

```bash
npm run dev
```

5. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
price-coach/
├── src/
│   ├── agents/              # Agent SDK implementations
│   │   └── pricing-coach.ts # Main conversational coach agent
│   ├── lib/
│   │   ├── calculators/     # Pricing calculation utilities
│   │   ├── diagnostics/     # Business analysis engine
│   │   ├── templates/       # Industry-specific question flows
│   │   ├── prompts/         # Agent system prompts
│   │   └── db/              # Database utilities
│   ├── app/
│   │   ├── api/             # API routes for agent interactions
│   │   ├── chat/            # Interactive coaching interface
│   │   └── page.tsx         # Landing page
│   └── types/               # TypeScript definitions
├── prisma/
│   └── schema.prisma        # Database schema
└── public/                  # Static assets
```

## How It Works

### 1. Coaching Philosophy

Price Coach embodies a collaborative, hands-on coaching style:

- **Ask Before Tell**: Asks clarifying questions before jumping to solutions
- **Find the ONE Thing**: Identifies the single most important business lever
- **Do the Math**: Uses real calculations to prove recommendations
- **Simplify**: Breaks complex problems into clear action steps
- **Redirect When Needed**: If pricing isn't the problem, guides to the right solution

### 2. Coaching Process

```
Discovery → Diagnosis → Solution Building → Implementation Planning
```

**Discovery**: Asks questions to understand the business deeply

**Diagnosis**: Identifies if the problem is pricing, operations, marketing, or sales

**Solution Building**: Co-creates solutions using actual business numbers

**Implementation**: Provides actionable steps and customer-facing messaging

### 3. Built-in Calculators

- **Break-Even Analysis**: Units/revenue needed to cover costs
- **Cost-Plus Pricing**: Ensures profitability with markup
- **LTV:CAC Ratio**: Critical for SaaS (needs to be >3:1)
- **Value-Based Pricing**: Captures 10-20% of value created
- **Service Hourly Rate**: Fully-loaded costs for service businesses
- **Menu Pricing**: Restaurant food cost targeting (28-35%)
- **Price Increase Impact**: Models revenue/profit changes

## Example Usage

1. **Start a session** on the homepage
2. **Answer questions** about your business
3. **Share your numbers** (revenue, costs, margins, etc.)
4. **Get diagnostic analysis** with identified problems/opportunities
5. **Co-create solutions** with real calculations
6. **Receive implementation plan** with customer-facing messaging

## API Endpoints

### `POST /api/session/start`
Start a new coaching session

**Body:**
```json
{
  "businessName": "Acme Corp",
  "industry": "saas"
}
```

### `POST /api/chat`
Send a message in a coaching session

**Body:**
```json
{
  "message": "Our revenue is $50k/month",
  "sessionId": "session_id"
}
```

### `POST /api/calculate`
Run a pricing calculation

**Body:**
```json
{
  "type": "break_even",
  "params": {
    "fixedCosts": 10000,
    "pricePerUnit": 50,
    "variableCostPerUnit": 20
  }
}
```

## Extending the Coach

### Add New Industry Templates

Edit `src/lib/templates/industry-questions.ts`:

```typescript
const newIndustryQuestions: Question[] = [
  {
    id: 'new_1',
    text: 'Your question here?',
    type: 'numeric',
    category: 'metrics',
  },
];
```

### Add New Calculators

Create a new function in `src/lib/calculators/index.ts`:

```typescript
export function calculateCustomMetric(params: {
  input1: number;
  input2: number;
}): CalculationResult {
  // Your calculation logic
  return {
    type: 'custom_metric',
    inputs: params,
    outputs: { result: calculatedValue },
    explanation: 'Human-readable explanation',
  };
}
```

### Customize the Coach Personality

Edit `src/lib/prompts/coach-system-prompt.ts` to modify how the coach interacts with users.

## Database Schema

- **Business**: Stores business profiles and metrics
- **CoachingSession**: Tracks individual coaching conversations
- **Message**: Stores conversation history
- **Report**: Generated recommendations and reports

View the full schema in `prisma/schema.prisma`.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

```env
ANTHROPIC_API_KEY=your_production_api_key
DATABASE_URL=your_production_database_url
```

For production, switch from SQLite to PostgreSQL:

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

Then run:
```bash
npx prisma generate
npx prisma db push
```

## Troubleshooting

**Issue**: "ANTHROPIC_API_KEY is not defined"
- Make sure you've created a `.env` file with your API key

**Issue**: Database errors
- Run `npx prisma generate` and `npx prisma db push`

**Issue**: Module not found
- Run `npm install` to install all dependencies

## Contributing

This is a starting point for a pricing coach application. Areas for enhancement:

- [ ] PDF report generation
- [ ] Dashboard with metrics visualization
- [ ] Competitor analysis tools
- [ ] More sophisticated NLP for extracting business metrics
- [ ] Multi-language support
- [ ] Integration with accounting software

## License

MIT

## Credits

Built with:
- [Anthropic Claude](https://www.anthropic.com/)
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [TailwindCSS](https://tailwindcss.com/)

Based on proven pricing strategies from leading business coaches and the comprehensive pricing research provided.
