# 💰 Price Coach - Claude Code Integration

Use Price Coach directly in Claude Code with your existing Claude subscription - **no API key needed!**

## 🚀 Quick Start

Simply type in Claude Code:

```
/price-coach
```

The coach will start an interactive pricing strategy session right in your current conversation!

---

## 📋 Available Commands

### Main Coaching Command

**`/price-coach`** - Start a full coaching session
- Interactive conversation about your business
- Asks discovery questions
- Runs diagnostic analysis
- Provides actionable recommendations
- Uses your real numbers to prove solutions

### Quick Calculator Commands

**`/calculate-breakeven`** - Break-even analysis
- Find the minimum sales needed to cover costs
- Calculate contribution margins
- Understand profitability thresholds

**`/calculate-ltv-cac`** - SaaS unit economics
- Calculate lifetime value to acquisition cost ratio
- Determine if unit economics support growth
- Find CAC payback period
- **Critical for SaaS businesses!**

**`/calculate-service-rate`** - Service business hourly rate
- Calculate fully-loaded costs (salary + benefits + overhead)
- Determine minimum bill rate
- Account for realistic billable hours (1200-1500/year, not 2080!)

**`/price-increase-impact`** - Model price changes
- See the impact of raising prices
- Account for expected customer churn
- Calculate break-even churn rate
- **Pricing is your most powerful profit lever!**

**`/calculate-margins`** - Gross margin calculator
- Understand the critical difference between margin and markup
- Calculate profitability metrics
- Compare to industry benchmarks

---

## 💡 Example Usage

### Full Coaching Session

```
You: /price-coach

Coach: Hey! I'm your Pricing Coach. I help businesses figure out
if their pricing is holding them back - or if the real issue is
something else entirely.

Before we dive in, I want to understand your business. Can you tell me:
1. What business are you in?
2. What's the main problem you're trying to solve right now?

You: I run a SaaS business with $50k monthly revenue and 500
customers. We're losing $10k per month. I think we're underpriced.

Coach: Okay, negative cash flow is serious - let's dig into this...
[continues with questions and analysis]
```

### Quick Calculator

```
You: /calculate-breakeven

Command: I'll help you calculate your break-even point.

What are your monthly fixed costs?

You: $10,000

Command: What's your price per unit?

You: $50

Command: What's your variable cost per unit?

You: $20

Command: [Runs calculation]

Break-even Analysis:
- Break-even units: 334 units
- Break-even revenue: $16,700
- Contribution margin: $30 per unit (60%)

You need to sell 334 units to cover all costs...
```

---

## 🎯 When to Use Each Command

### Use `/price-coach` when:
- You want comprehensive business analysis
- You're not sure what the problem is
- You need help thinking through options
- You want collaborative problem-solving
- You have time for a full conversation

### Use calculator commands when:
- You need a quick calculation
- You know exactly what metric you want
- You're in the middle of a decision
- You want to test different scenarios

---

## 🧠 What the Coach Does

### 1. Discovery Phase
- Asks about your business and industry
- Understands your current situation
- Gathers key metrics (revenue, costs, margins, etc.)
- Identifies your main pain points

### 2. Diagnosis Phase
- Analyzes your numbers
- Identifies if pricing is actually the problem
- Calculates key metrics (break-even, LTV:CAC, margins)
- Finds the ONE lever that matters most

### 3. Solution Phase
- Co-creates solutions with you
- Uses YOUR actual numbers
- Tests different scenarios
- Shows the math to prove recommendations

### 4. Implementation Phase
- Breaks down into actionable steps
- Provides customer-facing messaging
- Gives clear next steps
- Focuses on ONE thing to avoid overwhelm

---

## 💪 The Coach's Strengths

✅ **Asks Before Telling** - Gets your numbers before recommending
✅ **Does the Math** - Uses calculations to prove solutions
✅ **Finds the ONE Thing** - Identifies the key leverage point
✅ **Redirects When Needed** - If pricing isn't the problem, guides you to what is
✅ **Simplifies Complexity** - One avatar, one channel, one focus
✅ **Collaborative** - "Let's figure this out together" approach

---

## 🎓 What the Coach Knows

### Industries
- SaaS / Software (LTV:CAC ratios, churn, MRR)
- Professional Services (fully-loaded hourly rates, billable hours)
- Restaurants (food cost %, menu engineering)
- Retail / E-commerce (margins, inventory turnover)
- Manufacturing (activity-based costing, volume/margin trade-offs)

### Pricing Methods
- Cost-plus pricing (with fully-loaded costs)
- Value-based pricing (10-20% of value created)
- Competitive pricing (penetration, parity, premium)
- Psychological pricing (charm pricing, anchoring, decoys)
- Dynamic and tiered pricing

### Key Insights
- 1% price improvement = 11-12% profit boost
- Most businesses severely undercharge
- Sometimes pricing isn't the problem at all
- Cash flow > profit in early stages
- Simplicity beats complexity to $1M

---

## ⚠️ Important Notes

### The Coach Will:
- ✅ Use your actual numbers in calculations
- ✅ Tell you if pricing isn't actually your problem
- ✅ Identify if it's operations, marketing, or sales instead
- ✅ Be direct about urgency if you're losing money
- ✅ Celebrate when your numbers are strong
- ✅ Help you focus on ONE thing at a time

### The Coach Won't:
- ❌ Make assumptions about your costs or revenue
- ❌ Recommend solutions without understanding your situation
- ❌ Tell you what you want to hear if it's wrong
- ❌ Overcomplicate things with 10 different strategies

---

## 🔄 Combining Commands

You can use commands together in a conversation:

```
You: /price-coach

[Coach asks discovery questions]

You: [Provides business info]

Coach: Let me calculate your break-even point...
[Does calculation inline]

[Later in conversation]

You: What about raising prices?

Coach: Let's model that. /price-increase-impact
[Runs price increase calculator]
```

---

## 📊 Sample Outputs

The coach provides:
- Specific calculations with your numbers
- Industry benchmarks for comparison
- Clear explanations of what metrics mean
- Action steps prioritized by impact
- Framing for customers when implementing changes

---

## 🆚 Claude Code vs Web App

| Feature | Claude Code (This) | Web App |
|---------|-------------------|---------|
| **Authentication** | Your Claude subscription | Requires Anthropic API key |
| **Cost** | Included in subscription | Pay per API call |
| **Interface** | Right in your IDE | Separate browser window |
| **Session History** | Saved in Claude Code | Database persistence |
| **File Access** | Can read your business files | No file access |
| **Best For** | Solo entrepreneurs, quick analysis | Teams, production deployments |

---

## 🎯 Pro Tips

1. **Be specific with numbers** - The coach uses your actual metrics
2. **Don't hide problems** - The coach needs truth to help effectively
3. **Ask follow-up questions** - The coach can explain any calculation
4. **Save important insights** - Copy recommendations to your notes
5. **Revisit when things change** - Run `/price-coach` quarterly

---

## 🐛 Troubleshooting

**Coach seems generic?**
- Provide more specific numbers and context
- Answer the discovery questions thoroughly

**Need a different calculation?**
- Ask! The coach can adapt formulas to your situation
- Or use one of the specific calculator commands

**Want to continue a previous session?**
- Just refer back to previous messages in the conversation
- Or summarize key points and ask to continue

---

## 📚 Learn More

- See the full pricing research: `compass_artifact_*.md`
- Understand the coaching style: `This is coach.txt`
- Review the pricing calculators: `src/lib/calculators/index.ts`
- Read about diagnostic logic: `src/lib/diagnostics/index.ts`

---

**Ready to optimize your pricing?**

Type `/price-coach` and let's get started! 💰
