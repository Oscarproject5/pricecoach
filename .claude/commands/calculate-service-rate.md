# Service Business Hourly Rate Calculator

Calculate the minimum hourly rate needed for service businesses (consulting, agencies, freelancing, professional services).

## What You Need

Ask the user for:
1. **Annual Salary** (or salary equivalent if they're the owner)
2. **Benefits %** (typically 25-30% - includes payroll taxes, health insurance, PTO, etc.)
3. **Allocated Overhead** (annual) - rent, software, equipment, marketing, admin costs
4. **Billable Hours per Year** (realistic: 1200-1500, NOT 2,080)
5. **Target Margin %** (typically 30-50% for services)

## Why Billable Hours Matter

Most service providers dramatically overestimate billable hours:
- Total work hours per year: 2,080 (52 weeks × 40 hours)
- Subtract PTO, holidays: -160 hours
- Subtract sick time, training: -80 hours
- Subtract business development: -200 hours
- Subtract admin work: -400 hours
- **Actual billable hours: 1,200-1,500 hours**

## Calculation

```
Labor Burden = Annual Salary × (Benefits % ÷ 100)
Total Annual Cost = Annual Salary + Labor Burden + Allocated Overhead
Fully-Loaded Cost per Hour = Total Annual Cost ÷ Billable Hours
Minimum Bill Rate = Fully-Loaded Cost per Hour ÷ (1 - Target Margin % ÷ 100)
Profit per Hour = Minimum Bill Rate - Fully-Loaded Cost per Hour
```

## What to Explain

After calculating:

1. **Fully-loaded cost**: "Your TRUE cost is $[X]/hour, not just your salary"
2. **Minimum bill rate**: "You must charge at least $[Y]/hour to hit your margin target"
3. **Profit per hour**: "At this rate, you profit $[Z] per billable hour"
4. **Reality check**: "This is your MINIMUM. Professional services typically charge 2-3x fully-loaded costs"

## Example

```
Annual Salary: $80,000
Benefits %: 25%
Allocated Overhead: $17,500/year
Billable Hours: 1,500/year
Target Margin: 30%

Calculation:
Labor Burden = $80,000 × 0.25 = $20,000
Total Annual Cost = $80,000 + $20,000 + $17,500 = $117,500
Fully-Loaded Cost = $117,500 ÷ 1,500 = $78.33/hour
Minimum Bill Rate = $78.33 ÷ 0.70 = $111.90/hour
Profit per Hour = $111.90 - $78.33 = $33.57/hour

Result:
Your fully-loaded cost is $78.33/hour. To achieve a 30% margin,
you must charge at least $112/hour. This yields $34/hour in profit.

Professional services typically charge 2-3x fully-loaded costs,
placing you at $150-235/hour depending on specialization and market.
```

## Pricing Models for Services

After calculating hourly rate, discuss:

**Hourly Billing**:
- Pros: Simple, transparent
- Cons: Punishes efficiency, commoditizes expertise
- Use for: Undefined scope, highly variable work

**Project-Based**:
- Formula: Estimated Hours × Hourly Rate × 1.3-1.5 (risk buffer)
- Pros: Rewards efficiency, captures value
- Cons: Requires good estimation
- Use for: Defined scope projects

**Retainer**:
- Formula: Monthly time commitment × Hourly Rate × 1.15-1.25 (strategic premium)
- Pros: Predictable revenue, stronger client relationships
- Cons: Requires ongoing relationship
- Use for: Ongoing services

Now ask the user for their service business numbers and calculate their minimum hourly rate!
