# LTV:CAC Ratio Calculator (SaaS & Subscription Businesses)

Calculate the most important metric for subscription businesses: the ratio of customer Lifetime Value to Customer Acquisition Cost.

## What You Need

Ask the user for:
1. **Average Revenue Per User** (monthly) - typical customer payment
2. **Gross Margin %** - percentage that's profit after direct costs (typically 70-80% for SaaS)
3. **Customer Lifetime** (months) - how long customers stay (or use churn rate)
4. **Customer Acquisition Cost (CAC)** - total cost to acquire one customer

## Calculation

```
LTV = Average Revenue Per User × (Gross Margin % ÷ 100) × Customer Lifetime (months)
LTV:CAC Ratio = LTV ÷ CAC
CAC Payback Period = CAC ÷ (Monthly Revenue × Gross Margin %)
```

## Healthy Benchmarks

- **LTV:CAC Ratio**: Must be **>3:1** (healthy), >5:1 (excellent)
- **CAC Payback Period**: Should be **<12 months** (ideally 6-9 months)

## What to Explain

After calculating, tell them:

1. **Is it healthy?**
   - Ratio <3:1 = unit economics don't support growth
   - Ratio 3-5:1 = healthy, can scale
   - Ratio >5:1 = excellent, invest more in growth

2. **Payback period**:
   - <6 months = very strong
   - 6-12 months = good
   - >12 months = too long, limits growth

3. **What to do**:
   - If ratio is low: increase LTV (raise prices, reduce churn, add upsells) OR reduce CAC
   - If payback is long: focus on reducing CAC or increasing MRR

## Example

```
Average Revenue Per User: $100/month
Gross Margin: 70%
Customer Lifetime: 24 months
CAC: $300

Calculation:
LTV = $100 × 0.70 × 24 = $1,680
LTV:CAC Ratio = $1,680 ÷ $300 = 5.6:1
CAC Payback = $300 ÷ ($100 × 0.70) = 4.3 months

Result:
Your LTV:CAC ratio is 5.6:1 - that's excellent! You're creating $5.60
in value for every $1 spent acquiring customers. Your payback period
of 4.3 months is very strong. These unit economics support aggressive growth.
```

## Critical Insights

- If LTV:CAC is <3:1, don't scale marketing until you fix unit economics
- Most failed SaaS companies had LTV:CAC <1:1
- CAC payback >18 months means you'll run out of cash before breaking even on customers

Now ask the user for their SaaS metrics and calculate their LTV:CAC ratio!
