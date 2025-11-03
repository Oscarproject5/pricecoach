# Price Increase Impact Calculator

Model the financial impact of raising prices, accounting for expected customer churn.

## What You Need

Ask the user for:
1. **Current Price** - what they charge now
2. **Current Volume** - how many customers/units they have
3. **Price Increase %** - how much they want to raise prices (e.g., 10%)
4. **Expected Churn %** - how many customers they expect to lose (typically 5-15% for moderate increases)
5. **Current Gross Margin %** - profit margin percentage

## Calculation

```
New Price = Current Price × (1 + Price Increase % ÷ 100)
New Volume = Current Volume × (1 - Expected Churn % ÷ 100)
Current Revenue = Current Price × Current Volume
New Revenue = New Price × New Volume
Revenue Change $ = New Revenue - Current Revenue
Revenue Change % = (Revenue Change ÷ Current Revenue) × 100

Current Profit = Current Revenue × (Gross Margin % ÷ 100)
New Profit = New Revenue × (Gross Margin % ÷ 100)
Profit Change $ = New Profit - Current Profit
Profit Change % = (Profit Change ÷ Current Profit) × 100
```

## What to Explain

After calculating:

1. **Revenue impact**: "Despite losing X% of customers, revenue increases by Y%"
2. **Profit impact**: "Profit increases by Z% - pricing is the most powerful lever"
3. **Break-even churn**: "You could lose up to [%] of customers and still be profitable"
4. **Recommendation**: Whether the increase makes sense given the numbers

## Example

```
Current Price: $100
Current Volume: 500 customers
Price Increase: 10% (to $110)
Expected Churn: 5% (lose 25 customers)
Gross Margin: 60%

Calculation:
New Price = $100 × 1.10 = $110
New Volume = 500 × 0.95 = 475 customers
Current Revenue = $100 × 500 = $50,000
New Revenue = $110 × 475 = $52,250
Revenue Change = $52,250 - $50,000 = +$2,250 (+4.5%)

Current Profit = $50,000 × 0.60 = $30,000
New Profit = $52,250 × 0.60 = $31,350
Profit Change = $31,350 - $30,000 = +$1,350 (+4.5%)

Result:
Even with a 10% price increase and losing 5% of customers (25 people),
you'd increase revenue by $2,250 (+4.5%) and profit by $1,350 (+4.5%).

Break-even churn calculation:
You could lose up to 9% of customers (45 people) before the price
increase becomes revenue-neutral. The move is financially sound.
```

## Break-Even Churn Formula

```
Break-Even Churn % = (Price Increase %) ÷ (1 + Price Increase %) × 100

For 10% increase:
Break-Even Churn = 10% ÷ 1.10 × 100 = 9.09%
```

## Key Insights to Share

- **1% price increase typically yields 11-12% profit boost** (most powerful lever)
- **Expected churn for moderate increases (5-10%)**: 5-15% is normal
- **Expected churn for large increases (20%+)**: 20-30%+, risky
- **Historical data**: Most businesses dramatically overestimate churn from price increases
- **If no one complains**: Prices were probably too low to begin with

## Communication Tips

Share how to frame the increase:
1. Give 30-90 days notice
2. Explain reasons (inflation, new features, quality improvements)
3. Show value received
4. Offer options (lock in current rate for X months, annual prepay discount)
5. Be direct but not apologetic if justified

Now ask the user for their pricing data and model the impact of their price increase!
