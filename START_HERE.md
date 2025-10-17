# 🎯 Your Simple Checklist - Do These In Order

## ✅ TODAY (2-3 hours total)

### 1. Developer Accounts
- [ ] Sign up for Apple Developer ($99/year): https://developer.apple.com
- [ ] Sign up for Google Play Console ($25): https://play.google.com/console
- **Why**: You need these to submit your app to stores

---

### 2. App Icon
- [ ] Create 1024x1024 PNG image with your Dezyne logo
  - Use Canva (free): https://canva.com
  - Dark blue background (#1e293b)
  - Hanger icon + "Dezyne" text
- [ ] Save as: `/home/user/workspace/assets/icon.png`
- **Why**: Required for app submission

---

### 3. Privacy Policy & Terms
- [ ] Generate Privacy Policy: https://www.termsfeed.com/privacy-policy-generator/
- [ ] Generate Terms of Service: https://www.termsfeed.com/terms-conditions-generator/
- [ ] Host them publicly (GitHub Pages, Notion, or simple website)
- [ ] Save the URLs - you'll need them for submission
- **Why**: Required by App Store and Google Play

---

### 4. Screenshots
- [ ] Take 3-5 screenshots of your app:
  1. Home/Browse screen
  2. Product detail
  3. Cart/Checkout
  4. Profile/Earnings
  5. Sell screen
- [ ] Save to your computer
- **Why**: Needed for store listings

---

## 📅 THIS WEEK (Critical - Before You Can Release)

### 5. Set Up Supabase Backend
✅ Already installed Supabase library
- [ ] Create account: https://supabase.com
- [ ] Create new project
- [ ] Copy your project URL and API key
- [ ] Add to `.env` file (replace the placeholder values):
  ```
  EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
  EXPO_PUBLIC_SUPABASE_ANON_KEY=your-key-here
  ```
- [ ] Create database tables (users, listings, orders)
- [ ] Replace mock data with real API calls

**Why**: Your app currently uses fake data. Apple/Google will reject it without a real backend.

**Help**: See Supabase docs: https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native

---

## 📅 NEXT WEEK (After Backend is Working)

### 6. Configure EAS Build
✅ Already installed EAS CLI

Run these commands:
```bash
cd /home/user/workspace
npx eas-cli login
npx eas-cli build:configure
```

---

### 7. Build Your App
```bash
# Build for iOS
npx eas-cli build --platform ios --profile production

# Build for Android
npx eas-cli build --platform android --profile production
```
This takes 15-30 minutes. You'll get download links when done.

---

### 8. Submit to Stores

**For iOS (App Store):**
1. Go to https://appstoreconnect.apple.com
2. Create new app
3. Upload your screenshots
4. Add description, keywords, privacy policy URL
5. Run: `npx eas-cli submit --platform ios`
6. Wait 1-3 days for review

**For Android (Google Play):**
1. Go to https://play.google.com/console
2. Create new app
3. Upload screenshots and graphics
4. Add description, privacy policy URL
5. Run: `npx eas-cli submit --platform android`
6. Wait few hours to 1 day for review

---

## 🚨 MOST IMPORTANT STEP

**Step 5 (Supabase Backend)** is the most critical. Without a real backend:
- ❌ You cannot release the app
- ❌ Apple and Google will reject it
- ❌ Users can't actually buy/sell items

**Estimated time**: 3-5 days to implement properly

---

## 📞 Need Help?

**Backend Setup**: See `src/api/supabase.ts` - I've created a starter file
**Full Details**: See `RELEASE_GUIDE.md`
**Questions**: Supabase has great docs at https://supabase.com/docs

---

## ⏱️ Timeline Summary

- **Today**: Accounts, icon, legal pages, screenshots (2-3 hours)
- **This Week**: Backend setup (3-5 days of work)
- **Next Week**: Build and submit (1 day)
- **Wait**: Review process (1-7 days)

**Total: 2-3 weeks from now to live in stores**

---

## 💰 Total Cost

- Apple Developer: $99
- Google Play: $25
- Supabase: Free (to start)
- **Total: $124**

---

## 🎯 START HERE:

**RIGHT NOW, DO THIS:**
1. ✅ Sign up for Apple Developer Account
2. ✅ Sign up for Google Play Console  
3. ✅ Create app icon in Canva

**Then work on the backend this week.**
