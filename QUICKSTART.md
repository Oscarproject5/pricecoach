# 🚀 Quick Start Guide

Get your Price Coach up and running in 2 minutes!

## Step 1: Choose Your Authentication

You have two options:

### Option A: Use Claude Code (Recommended - No Setup Needed!)

If you're already using Claude Code (like on your desktop), you're done! The app will automatically use your Claude subscription. Skip to Step 3!

### Option B: Use Anthropic API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign in or create an account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key

Then open the `.env` file and uncomment/add your API key:

```env
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
DATABASE_URL="file:./dev.db"
```

**Important**: Replace `your-actual-key-here` with your real Anthropic API key!

## Step 2: Initialize Database

The database is already set up! If you need to reset it:

```bash
npx prisma db push --force-reset
```

## Step 3: Start the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 4: Start Your First Coaching Session

1. Enter your business name
2. Select your industry
3. Click "Start Coaching Session"
4. Answer the coach's questions honestly
5. Share your real numbers (revenue, costs, etc.)
6. Get personalized recommendations!

## Example Conversation Flow

**Coach**: "Hey! I'm your Pricing Coach. What business are you in?"

**You**: "I run a SaaS company that does project management software"

**Coach**: "Got it! What's the main problem you're trying to solve right now?"

**You**: "We're not profitable. Revenue is $50k/month but costs are $60k/month"

**Coach**: "Okay, let's dig into this. What's your current pricing model?"

**You**: "We charge $29/month per user"

*...coach asks more questions about customers, CAC, churn, etc...*

**Coach**: "Here's what I'm seeing: Your LTV:CAC ratio is only 2:1, which is below the healthy 3:1 threshold. Let me calculate what price you need..."

*...coach provides specific calculations and recommendations...*

## Tips for Best Results

1. **Be specific with numbers**: The coach uses your actual metrics to calculate recommendations
2. **Answer honestly**: The coach needs truth to help effectively
3. **Share context**: Explain your situation fully
4. **Ask questions**: The coach can explain calculations or reasoning
5. **Save your session**: Sessions are persisted, so you can come back later

## Troubleshooting

### "Failed to start session"
- Check that your `.env` file has a valid `ANTHROPIC_API_KEY`
- Make sure you're running the dev server (`npm run dev`)
- Check the terminal for error messages

### "Database error"
- Run `npx prisma db push` to recreate the database
- Make sure the `DATABASE_URL` is set in `.env`

### "Module not found"
- Run `npm install` to ensure all dependencies are installed

### Coach responses are slow
- This is normal! Claude is thinking through your situation
- Typically responses take 5-15 seconds
- More complex calculations may take longer

## What's Next?

After your first session, you can:

- **Continue the conversation**: Come back to your saved session
- **Try different scenarios**: Test pricing changes with the calculators
- **Generate reports**: Export your recommendations (coming soon)
- **Explore other features**: Competitor analysis tools (coming soon)

## Need Help?

- Check the main [README.md](README.md) for full documentation
- Review the [API documentation](README.md#api-endpoints)
- Look at the pricing calculator examples
- Review the Prisma schema to understand the data model

## Advanced: Using PostgreSQL Instead of SQLite

For production deployments, use PostgreSQL:

1. Set up a PostgreSQL database (e.g., on Railway, Supabase, or Neon)

2. Update `.env`:
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

3. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

4. Change all `String?` JSON fields back to `Json?`

5. Run:
```bash
npx prisma generate
npx prisma db push
```

## Have Fun!

The Price Coach is designed to feel like a real conversation with an expert. Don't hold back - share your challenges, ask questions, and let the coach help you find the right solution.

Remember: Sometimes the answer isn't pricing at all - it might be operations, marketing, or sales. The coach will help you find the real lever to pull.

Happy coaching! 💰
