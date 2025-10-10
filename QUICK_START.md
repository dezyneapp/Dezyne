# 🚀 Dezyne Quick Start Guide

Welcome to Dezyne! Your upcycled clothing marketplace is ready to use.

## ✅ What's Been Built

### Complete App Features
✓ Home feed with 6 sample upcycled listings
✓ Product detail pages with before/after photos
✓ Advanced search and filtering system
✓ Shopping cart with checkout flow
✓ Upcycler verification system
✓ Listing creation for verified sellers
✓ Complete affiliate marketing program
✓ User profile with earnings dashboard
✓ Order tracking and history
✓ Revenue split system (93% seller, 7% platform, 3% affiliate)

### Files Created
- **7 Screen Components**: Home, Search, Product Detail, Sell, Cart, Profile
- **Complete Navigation**: Bottom tabs + Stack navigation with modal presentations
- **State Management**: Full Zustand store with AsyncStorage persistence
- **Type Definitions**: Comprehensive TypeScript interfaces
- **Deep Linking Hook**: Automatic affiliate code tracking

## 📱 How to Use the App

### First Time Setup
1. **The app is ready to run!** Just open it in your Expo preview
2. Browse the home feed to see sample listings
3. Tap the **Profile** tab to sign in

### Try These User Flows

#### 1. Browse & Purchase
```
Browse Tab → Tap any item → Add to Cart → Cart Tab → Checkout
```

#### 2. Become a Seller
```
Sell Tab → Get Verified → Select techniques → Upload photos → Submit
→ Create your first listing
```

#### 3. Start Affiliate Marketing
```
Profile Tab → Tap "Affiliate Earnings" → Copy/Share your link
→ Track your earnings
```

## 🎯 Key App Screens

### Browse Tab (Home)
- Grid view of all available items
- Category filters along the top
- Search button to access advanced filters
- Heart icon to like items
- "Upcycled" badge on all items

### Sell Tab
**Not Verified:**
- Shows verification process
- Lists all accepted upcycling techniques
- Get Verified button

**Verified Seller:**
- Full listing creation form
- Upload up to 5 product photos
- Optional before photo
- Price calculator showing 93% earnings
- Category, size, and condition selectors
- Technique tags

### Cart Tab
- All items in your cart
- Subtotal and total
- Revenue split information
- Affiliate code indicator (if applicable)
- Checkout button

### Profile Tab
**Not Signed In:**
- Welcome screen
- Sign in button

**Signed In:**
- User info with verified badge
- Earnings overview (Total, Sales, Affiliate)
- Activity stats (Listings, Sold, Purchases)
- Recent orders list
- Affiliate program access
- Sign out option

## 💰 Revenue System Explained

### Standard Sale
When someone buys an item:
- **Seller receives**: 93% of sale price
- **Platform receives**: 7% of sale price

Example: $100 item
- Seller gets: $93
- Platform gets: $7

### Affiliate Sale
When someone buys through an affiliate link:
- **Seller receives**: 93% of sale price
- **Affiliate receives**: 3% commission
- **Platform receives**: 4% of sale price

Example: $100 item via affiliate
- Seller gets: $93
- Affiliate gets: $3
- Platform gets: $4

## 🔗 Affiliate Marketing

### How It Works
1. Every user gets a unique affiliate code (e.g., "EMM4K2")
2. Generate your shareable link in Profile → Affiliate Earnings
3. When someone clicks your link, their purchases are tracked
4. You earn 3% of every sale they make
5. Track all earnings in your profile

### Your Affiliate Link Format
```
dezyne://app?ref=YOUR_CODE
```

## 📊 Mock Data Included

The app comes with:
- **6 Sample Listings** across different categories
- **4 Mock Sellers** with verified badges
- **8 Upcycling Techniques** (Painting, Embroidery, Sewing, etc.)
- **Realistic pricing** from $45-$92

## 🎨 Design Features

- Clean, minimalist interface
- Black & white color scheme with accent colors
- Native iOS-style navigation
- Smooth modal presentations
- Grid layouts for browsing
- Badge system for cart items
- Verified seller checkmarks
- Earnings visualizations

## 🔐 User Authentication

Simple email-based authentication:
1. Tap Profile → Sign In
2. Enter your name and email
3. Account is created/logged in
4. Data persists across app restarts

**Note**: This is a simplified auth system. In production, you'd integrate proper authentication (Firebase, Supabase, etc.)

## 📝 Creating Your First Listing

Once verified as an upcycler:

1. **Sell Tab** → You'll see the listing form
2. **Add Photos**: Tap camera icons to upload images
3. **Title**: Describe your piece (e.g., "Hand-Painted Denim Jacket")
4. **Description**: Detail the transformation and materials
5. **Price**: Set your price (you'll earn 93%)
6. **Category**: Choose the clothing type
7. **Size**: Select the size
8. **Condition**: Rate the item condition
9. **Techniques**: Tag your upcycling methods
10. **List Item**: Submit your listing

## 🛒 Making a Purchase

1. Browse items on the home screen
2. Tap an item to view details
3. Review photos, price, and description
4. Tap "Add to Cart"
5. Go to Cart tab
6. Review your items
7. Tap "Checkout"
8. Enter shipping address
9. Enter payment info (mock)
10. Place Order

## 📈 Tracking Your Earnings

In your Profile, you'll see three earning metrics:

1. **Total Earnings**: Combined sales + affiliate income
2. **Sales Earnings**: 93% from items you've sold
3. **Affiliate Earnings**: 3% commissions from referrals

Each order shows:
- Item sold/purchased
- Amount earned/spent
- Order status
- Date

## 🎯 Pro Tips

1. **Heart items** you like to save them for later
2. **Use search filters** to narrow down by size and category
3. **Share your affiliate link** on social media to maximize earnings
4. **Upload before photos** to show your transformation skills
5. **Use multiple techniques** to make items more appealing
6. **Price competitively** - remember you keep 93%!

## 🐛 Known Limitations

This is a demo/prototype with mock data:
- No real payment processing
- No actual shipping integration
- No real-time chat/messaging
- No image hosting (uses local URIs)
- Simplified authentication
- No backend server

These would be added in a production version!

## 🎉 You're All Set!

Your Dezyne marketplace is fully functional and ready to use. Explore the app, try different user flows, and see how the upcycling verification and affiliate systems work together!

---

**Questions or Issues?** Check the DEZYNE_README.md for technical details and architecture information.
