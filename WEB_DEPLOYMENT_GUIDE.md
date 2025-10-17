# 🚀 Dezyne Web App - Deployment Guide

## ✅ What I've Done

Your app is now ready to work as a web app! I've:
- ✅ Installed React Native Web
- ✅ Created web configuration files
- ✅ Set up Progressive Web App (PWA) support
- ✅ Added build scripts

---

## 📱 Step 1: Test It Locally (RIGHT NOW)

Run this command to test your web app:

```bash
bun run web:dev
```

This will:
- Start a development server
- Open your browser automatically
- Show Dezyne running in the browser
- Works on your phone too (use the network URL)

---

## 🌐 Step 2: Get a Domain Name

You need a website address. Go to one of these:

**Option A: Namecheap** (Recommended)
- Go to: https://www.namecheap.com
- Search for: `dezyne.app` or `dezyne.co.uk` or `shopdezy ne.com`
- Price: ~£10/year
- No age restrictions
- Payment: Use debit card or PayPal

**Option B: Google Domains**
- https://domains.google
- Similar pricing
- Easy to use

**Pick a good domain:**
- dezyne.app
- dezyne.co.uk  
- getdezyne.com
- shopdezyne.com

---

## ☁️ Step 3: Deploy to Vercel (FREE Hosting)

**Vercel hosts your app for FREE forever.**

### A. Create Vercel Account
1. Go to: https://vercel.com
2. Sign up with GitHub (free)
3. No credit card needed
4. No age restrictions

### B. Install Vercel CLI

```bash
npm install -g vercel
```

### C. Deploy Your App

```bash
# Build your app for production
bun run web:build

# Deploy to Vercel
vercel --prod
```

Vercel will ask you:
- Project name: `dezyne`
- Do you want to deploy? `Y`

Done! You get a URL like: `dezyne.vercel.app`

### D. Connect Your Domain

In Vercel dashboard:
1. Go to your project
2. Settings → Domains
3. Add your domain (dezyne.app)
4. Follow instructions to point domain to Vercel

---

## 💳 Step 4: Set Up Stripe Payments

You need Stripe to accept payments and split the 93/7.

### A. Create Stripe Account
1. Go to: https://stripe.com
2. Sign up (need to be 13+)
3. They may need parent verification for under 18
4. UK bank account required

### B. Get Your API Keys
1. Go to Developers → API Keys
2. Copy your "Publishable key" and "Secret key"
3. Add to your `.env` file:

```bash
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
```

### C. Set Up Stripe Connect
This handles the 93/7 split automatically:
- Sellers sign up through Stripe Connect
- Money gets split: 93% to seller, 7% to you
- Stripe handles everything

**Guide:** https://stripe.com/docs/connect

---

## 📊 Step 5: Set Up Supabase (Backend)

Your app needs a real backend for user data.

### A. Create Supabase Account
1. Go to: https://supabase.com
2. Sign up (free tier - no credit card)
3. Create new project
4. Wait 2 minutes for setup

### B. Get Your Keys
1. Go to Project Settings → API
2. Copy URL and anon key
3. Add to `.env`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-key-here
```

### C. Create Database Tables

In Supabase SQL Editor, run:

```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  is_verified_upcycler BOOLEAN DEFAULT false,
  affiliate_code TEXT UNIQUE,
  total_earnings DECIMAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Listings table
CREATE TABLE listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL NOT NULL,
  images TEXT[],
  category TEXT NOT NULL,
  size TEXT NOT NULL,
  condition TEXT NOT NULL,
  upcycling_techniques TEXT[],
  is_sold BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_id UUID REFERENCES users(id),
  seller_id UUID REFERENCES users(id),
  listing_id UUID REFERENCES listings(id),
  total_price DECIMAL NOT NULL,
  seller_amount DECIMAL NOT NULL,
  platform_amount DECIMAL NOT NULL,
  affiliate_amount DECIMAL DEFAULT 0,
  affiliate_user_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎯 Step 6: Update App to Use Real Backend

You'll need to replace the mock data in `src/state/appStore.ts` with real Supabase calls.

**I've created** `src/api/supabase.ts` as a starting point.

**Example:**
Instead of storing users in Zustand, you'll:
```typescript
// Create user
await supabase.from('users').insert({ name, email });

// Get listings
const { data } = await supabase.from('listings').select('*');

// Upload images
await supabase.storage.from('images').upload(path, file);
```

---

## 📱 How Users Install Your Web App

Once deployed, users can:

### On iPhone:
1. Visit dezyne.app in Safari
2. Tap share button
3. "Add to Home Screen"
4. Icon appears like a real app

### On Android:
1. Visit dezyne.app in Chrome
2. Tap menu (3 dots)
3. "Add to Home screen"  
4. Icon appears like a real app

**It looks and works exactly like an App Store app!**

---

## 💰 Money & Taxes (UK)

### Receiving Payments:
- Stripe → Your bank account
- They send you money from sales
- Instant payouts available

### Taxes:
As a minor with self-employment income:
1. Keep track of all income
2. You file self-assessment when income > £1,000/year
3. First £12,570/year is tax-free
4. Register as self-employed: https://www.gov.uk/set-up-sole-trader

**You handle your own taxes - no parent involvement needed.**

---

## ✅ CHECKLIST

Do these in order:

**This Week:**
- [ ] Test locally: `bun run web:dev`
- [ ] Buy domain name (£10)
- [ ] Sign up for Vercel (free)
- [ ] Deploy to Vercel
- [ ] Connect domain

**Next Week:**
- [ ] Create Supabase account
- [ ] Set up database tables
- [ ] Update app to use Supabase instead of mock data

**Week 3:**
- [ ] Set up Stripe account (need parent help here potentially)
- [ ] Implement payment processing
- [ ] Test full buy/sell flow

**Week 4:**
- [ ] Share with friends to test
- [ ] Fix any bugs
- [ ] Launch! 🚀

---

## 🆘 Need Help?

**Vercel Deployment Issues:**
- Docs: https://vercel.com/docs

**Supabase Issues:**
- Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com

**Stripe Issues:**
- Docs: https://stripe.com/docs
- Support: stripe.com/support

---

## 🎉 Summary

You're converting from:
- ❌ App Store (requires parent, £99, complex)

To:
- ✅ Web App (no parent, free hosting, works everywhere)
- ✅ Your own payment processing
- ✅ Your own taxes
- ✅ Complete control

**Timeline:** Can be live in 1-2 weeks!

---

## 🚀 START HERE:

Right now, run:
```bash
bun run web:dev
```

See your app in the browser!
