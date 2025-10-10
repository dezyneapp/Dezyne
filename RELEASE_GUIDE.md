# 🚀 Dezyne App Release Guide

## Overview
This guide will help you release Dezyne to the iOS App Store and Google Play Store.

---

## 📋 Pre-Release Checklist

### 1. App Configuration ✅
- [x] App name: "Dezyne"
- [x] Bundle ID: com.dezyne.app
- [x] Version: 1.0.0
- [ ] App icon (512x512px)
- [ ] Splash screen
- [ ] Privacy Policy URL
- [ ] Terms of Service URL

### 2. Backend Requirements ⚠️
**IMPORTANT**: Your app currently uses mock data. Before releasing, you need:

- [ ] **Real Backend Server** (Firebase, Supabase, AWS, etc.)
- [ ] **Real Authentication** (currently simplified)
- [ ] **Payment Processing** (Stripe, PayPal, etc.)
- [ ] **Image Storage** (AWS S3, Cloudinary, etc.)
- [ ] **Database** (PostgreSQL, MongoDB, etc.)
- [ ] **Push Notifications** (optional but recommended)

### 3. Legal Requirements 📝
- [ ] Privacy Policy (required by App Store & Google Play)
- [ ] Terms of Service
- [ ] GDPR compliance (if serving EU users)
- [ ] Payment processing agreements
- [ ] Age restrictions (13+ recommended for marketplace apps)

---

## 🏗️ Build Methods

### Method 1: EAS Build (Recommended - Easiest)

**What is EAS?**
Expo Application Services - Cloud-based build service (free tier available)

#### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```

#### Step 2: Login to Expo
```bash
eas login
```

#### Step 3: Configure EAS
```bash
eas build:configure
```

This creates `eas.json`:
```json
{
  "build": {
    "preview": {
      "ios": {
        "simulator": true
      }
    },
    "production": {
      "ios": {
        "bundleIdentifier": "com.dezyne.app"
      },
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

#### Step 4: Build for iOS
```bash
# For testing on simulator
eas build --platform ios --profile preview

# For App Store submission
eas build --platform ios --profile production
```

**Requirements for iOS:**
- Apple Developer Account ($99/year)
- You'll be prompted to provide credentials
- EAS handles certificates and provisioning profiles

#### Step 5: Build for Android
```bash
# For testing (APK)
eas build --platform android --profile preview

# For Play Store (AAB)
eas build --platform android --profile production
```

**Requirements for Android:**
- Google Play Console Account ($25 one-time)
- EAS generates signing keys automatically

#### Step 6: Submit to Stores
```bash
# Submit to App Store
eas submit --platform ios

# Submit to Google Play
eas submit --platform android
```

---

### Method 2: Local Build (Advanced)

#### For iOS:
```bash
# Requires macOS with Xcode installed
npx expo prebuild
npx expo run:ios --configuration Release
```

Then open the `.xcworkspace` file in Xcode and archive for distribution.

#### For Android:
```bash
npx expo prebuild
npx expo run:android --variant release
```

---

## 📱 App Store Submission Requirements

### iOS App Store

**Developer Account:**
- Sign up at https://developer.apple.com
- Cost: $99/year

**App Store Connect:**
1. Create new app at https://appstoreconnect.apple.com
2. Fill in app information:
   - **Name**: Dezyne
   - **Primary Language**: English
   - **Bundle ID**: com.dezyne.app
   - **SKU**: dezyne-app-001

**Required Materials:**
- App icon (1024x1024px)
- Screenshots (various iPhone sizes)
- App preview video (optional but recommended)
- Description (max 4000 characters)
- Keywords (max 100 characters)
- Support URL
- Privacy Policy URL

**App Review Information:**
- Demo account credentials
- Review notes explaining the app
- Age rating questionnaire

**Screenshot Sizes Needed:**
- 6.7" (iPhone 14 Pro Max): 1290x2796
- 6.5" (iPhone 11 Pro Max): 1242x2688
- 5.5" (iPhone 8 Plus): 1242x2208

---

### Google Play Store

**Developer Account:**
- Sign up at https://play.google.com/console
- Cost: $25 (one-time)

**Required Materials:**
- App icon (512x512px)
- Feature graphic (1024x500px)
- Screenshots (minimum 2, at least 320px on shortest side)
- Short description (max 80 characters)
- Full description (max 4000 characters)
- Privacy Policy URL

**Store Listing:**
1. Create new app
2. Choose "App" (not Game)
3. Set app name: Dezyne
4. Set default language: English
5. Upload all graphics and screenshots

**Content Rating:**
- Complete questionnaire
- Likely rating: Everyone/Teen (due to marketplace nature)

**App Content:**
- Declare in-app purchases (your marketplace transactions)
- Set target audience age
- Add privacy policy

---

## 🎨 Required Assets

### App Icon (High Priority)
You need to create a proper app icon featuring your Dezyne logo.

**Specs:**
- Size: 1024x1024px
- Format: PNG (no transparency)
- Design: Your hanger logo + "Dezyne" text on navy background

**Tools to create:**
- Figma (free)
- Canva (free)
- Adobe Illustrator

Save as: `./assets/icon.png`

### Splash Screen
**Specs:**
- Size: 1284x2778px (will be resized)
- Background: #1e293b (navy)
- Center: Your logo

Save as: `./assets/splash.png`

### Screenshots
You'll need 3-5 screenshots showing:
1. Home/Browse screen with listings
2. Product detail page
3. Cart/Checkout
4. Profile with earnings
5. Sell/Create listing screen

**How to capture:**
1. Run app in iOS Simulator
2. Use Cmd+S to save screenshots
3. Use Figma to add device frames (optional)

---

## 🔐 Before You Release: Production Checklist

### Critical Items to Implement

#### 1. Replace Mock Data with Real Backend
**Current State:** All data is stored locally with Zustand
**Needed:** 
- Database (Firebase Firestore, Supabase, etc.)
- User authentication (Firebase Auth, Auth0, etc.)
- Image hosting (Cloudinary, AWS S3)

**Recommended Stack:**
```
Backend: Supabase (PostgreSQL + Auth + Storage)
- Free tier: 500MB database, 1GB storage
- Built-in authentication
- Real-time subscriptions
- File storage included
```

#### 2. Payment Processing
**Current State:** Mock checkout
**Needed:**
- Stripe Connect (recommended for marketplaces)
- PayPal
- Or Apple Pay + Google Pay

**Implementation:**
- Seller onboarding (bank details)
- Escrow/split payments (93/7 split)
- Refund handling

#### 3. Legal Pages
Create these pages (can be simple web pages):

**Privacy Policy** (required):
- What data you collect
- How you use it
- Third-party services
- User rights

**Terms of Service**:
- User responsibilities
- Seller requirements
- Transaction terms
- Dispute resolution

**Tools:**
- TermsFeed.com (generates policies)
- PrivacyPolicies.com

#### 4. Compliance

**Age Restriction:**
- Recommend 13+ (marketplace with user-generated content)

**Content Moderation:**
- Plan for reviewing upcycler verifications
- Process for reporting inappropriate listings
- Terms against prohibited items

**GDPR (if serving EU):**
- Data export capability
- Account deletion
- Cookie consent

---

## 📊 Estimated Costs

### One-Time Costs:
- Apple Developer Account: $99/year
- Google Play Console: $25 (one-time)
- Logo design (if outsourced): $50-$500
- **Total Initial: ~$175**

### Ongoing Costs:
- Apple renewal: $99/year
- Backend hosting:
  - Supabase: Free - $25/month
  - Firebase: Free - $25/month
- Payment processing: 2.9% + $0.30 per transaction
- **Estimated Monthly: $0-$100** (depends on usage)

---

## 🎯 Quick Start: MVP Release Path

If you want to release quickly for testing/feedback:

### Week 1: Setup
1. ✅ Create Apple Developer account
2. ✅ Create Google Play Console account
3. ✅ Design and export app icon
4. ✅ Set up Supabase backend (free)

### Week 2: Backend
1. ✅ Migrate user authentication
2. ✅ Set up database tables
3. ✅ Add image upload to Supabase Storage
4. ✅ Update app to use real API

### Week 3: Legal & Content
1. ✅ Create privacy policy
2. ✅ Create terms of service
3. ✅ Take screenshots
4. ✅ Write app descriptions

### Week 4: Build & Submit
1. ✅ Test thoroughly
2. ✅ Build with EAS
3. ✅ Submit to both stores
4. ✅ Wait for review (1-7 days)

---

## 🚦 Release Stages

### Stage 1: Internal Testing (Now)
- Use Expo Go for testing
- Share with friends/family
- Gather feedback

### Stage 2: TestFlight (iOS) / Internal Testing (Android)
- Upload build to stores
- Invite beta testers (up to 10,000 on TestFlight)
- Test payment flow, all features

### Stage 3: Soft Launch
- Release in one country first
- Monitor for bugs
- Gather reviews

### Stage 4: Global Launch
- Release in all countries
- Marketing push
- Monitor App Store reviews

---

## 📞 Support Resources

**Expo Documentation:**
- Build: https://docs.expo.dev/build/introduction/
- Submit: https://docs.expo.dev/submit/introduction/

**App Store:**
- Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Connect: https://appstoreconnect.apple.com

**Google Play:**
- Policy Center: https://play.google.com/console/about/guides/
- Console: https://play.google.com/console

**Supabase (Backend):**
- Docs: https://supabase.com/docs
- React Native Guide: https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native

---

## ⚡ Quick Commands Reference

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure project
eas build:configure

# Build for iOS (production)
eas build --platform ios --profile production

# Build for Android (production)
eas build --platform android --profile production

# Submit to App Store
eas submit --platform ios

# Submit to Google Play
eas submit --platform android

# Check build status
eas build:list
```

---

## ❓ FAQ

**Q: Can I release without a backend?**
A: No. Apple and Google will reject apps that don't work properly. You need a real backend for authentication, data storage, and payments.

**Q: How long does App Store review take?**
A: iOS: 1-3 days typically. Android: Few hours to 1 day.

**Q: Do I need both iOS and Android?**
A: No, you can release on just one platform initially. iOS has higher revenue typically.

**Q: What if my app gets rejected?**
A: You'll get specific feedback. Fix the issues and resubmit. Common reasons: incomplete functionality, missing privacy policy, crashes.

**Q: Can I update the app after release?**
A: Yes! You can push updates anytime. Users get notified of updates.

**Q: What about the 7% platform fee - how do I collect it?**
A: You'll need Stripe Connect or similar. They handle split payments automatically. Apple/Google take an additional 15-30% on in-app purchases.

---

## 🎉 Ready to Launch?

Your Dezyne app has a solid foundation! The main work now is:

1. **Backend implementation** (biggest task)
2. **Create app icon & screenshots** (design work)
3. **Legal pages** (use generators)
4. **Build and submit** (EAS makes this easy)

**Estimated time to launch:** 2-4 weeks with focused work

Good luck with your launch! 🚀
