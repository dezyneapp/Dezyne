# Dezyne - Upcycled Clothing Marketplace

Dezyne is a mobile marketplace app for buying and selling upcycled clothing. Built with React Native and Expo, it features a unique verification system that ensures only authentic upcyclers can sell, along with a comprehensive affiliate marketing program.

## 🎯 Key Features

### For Buyers
- **Browse Upcycled Items**: Explore unique, one-of-a-kind clothing pieces
- **Advanced Search & Filters**: Filter by category, size, price, and more
- **Product Details**: View before/after photos and upcycling techniques used
- **Shopping Cart**: Add multiple items and checkout seamlessly
- **Order Tracking**: Monitor your purchases from processing to delivery

### For Sellers
- **Upcycler Verification**: Prove your upcycling credentials to become a verified seller
- **Easy Listing Creation**: Upload photos, set prices, and describe your techniques
- **Revenue Split**: Earn 93% of every sale (7% platform fee)
- **Seller Dashboard**: Track your listings, sales, and earnings
- **Multiple Upcycling Categories**: Painting, embroidery, sewing, patchwork, dyeing, and more

### Affiliate Marketing
- **Personalized Links**: Get your unique affiliate code and shareable link
- **Earn 3% Commission**: Receive 3% of sales made through your referral links
- **Tracking Dashboard**: Monitor your referrals and earnings
- **Automatic Attribution**: Sales are automatically tracked when users sign up via your link

## 💰 Revenue Model

### Standard Split
- **Seller**: 93% of sale price
- **Platform**: 7% of sale price

### With Affiliate Referral
- **Seller**: 93% of sale price
- **Affiliate**: 3% commission
- **Platform**: 4% of sale price

## 🛠 Technical Stack

- **Framework**: React Native with Expo SDK 53
- **Navigation**: React Navigation (Native Stack + Bottom Tabs)
- **State Management**: Zustand with AsyncStorage persistence
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Icons**: Expo Vector Icons (Ionicons)
- **Image Picker**: expo-image-picker
- **Clipboard**: expo-clipboard

## 📱 App Structure

### Screens

1. **Home/Browse Screen**
   - Grid view of available listings
   - Category filters (Tops, Bottoms, Dresses, Outerwear, etc.)
   - Quick search access
   - Like functionality

2. **Product Detail Screen**
   - Image carousel
   - Price and description
   - Seller information
   - Upcycling techniques used
   - Before/after transformation photos
   - Add to cart functionality

3. **Search Screen**
   - Full-text search
   - Multiple filter options (category, size, price)
   - Real-time results
   - Filter badges with clear all option

4. **Sell Screen**
   - Upcycler verification flow (first-time sellers)
   - Listing creation form
   - Multiple image upload (up to 5 photos)
   - Before photo option
   - Technique selection
   - Revenue calculator showing 93% seller earnings

5. **Cart Screen**
   - Cart item management
   - Order summary with pricing breakdown
   - Affiliate code display (if applicable)
   - Checkout flow with address and payment
   - Revenue split information

6. **Profile Screen**
   - User information and stats
   - Earnings dashboard (total, sales, affiliate)
   - Activity metrics (listings, sold items, purchases)
   - Recent order history
   - Affiliate program access
   - Sign in/out functionality

### Navigation

- **Bottom Tabs**: Browse, Sell, Cart (with badge), Profile
- **Stack Navigation**: Product details, Search
- **Modal Presentations**: Verification, Checkout, Affiliate details

## 🔐 User Roles

### Buyer (Default)
- Browse and search listings
- Add items to cart and purchase
- Access affiliate program
- Track orders

### Verified Upcycler (Seller)
- All buyer privileges
- Create and manage listings
- Track sales and earnings
- Showcase upcycling techniques

## 🎨 Upcycling Techniques Supported

1. **Painting** - Hand-painted designs on fabric
2. **Embroidery** - Decorative stitching and thread work
3. **Sewing/Alterations** - Restructuring or adding fabric elements
4. **Patchwork** - Adding patches or fabric pieces
5. **Tie-Dye/Dyeing** - Custom color treatments
6. **Distressing** - Intentional wear and tear effects
7. **Beading/Rhinestones** - Adding decorative elements
8. **Screen Printing** - Custom prints and designs

## 📊 Data Management

All data is managed through Zustand stores with AsyncStorage persistence:

- **User State**: Authentication, profiles, earnings
- **Listings State**: All product listings, likes, views
- **Cart State**: Shopping cart items
- **Orders State**: Purchase history and sales
- **Affiliate State**: Referral tracking, clicks, earnings

## 🚀 Getting Started

The app comes pre-configured with mock data including:
- 6 sample listings with various categories
- Mock sellers with different specialties
- Sample upcycling techniques

### First Launch
1. Browse the home feed to see available items
2. Sign in via Profile tab to unlock all features
3. Get verified as an upcycler to start selling
4. Access your affiliate link to start earning commissions

## 💡 Key User Flows

### Becoming a Seller
1. Navigate to Sell tab
2. Click "Get Verified"
3. Select your upcycling techniques
4. Upload photos of your work (1-3 images)
5. Submit for verification
6. Start creating listings

### Making a Purchase
1. Browse or search for items
2. Tap item to view details
3. Add to cart
4. Navigate to Cart tab
5. Review items and pricing
6. Tap Checkout
7. Enter shipping address and payment
8. Place order

### Using Affiliate Program
1. Sign in to your account
2. Go to Profile tab
3. Tap on "Affiliate Earnings" card
4. View your affiliate code and link
5. Copy or share your link
6. Track earnings and referrals

## 🎯 Business Rules

- Only verified upcyclers can list items
- Each item is unique and can only be sold once
- Sellers must demonstrate at least one upcycling technique
- Affiliate commissions only apply to purchases from new referrals
- Users cannot earn affiliate commissions on their own purchases
- Platform maintains 7% of all sales (4% when affiliate involved)

## 📈 Future Enhancements (Not Implemented)

- Real payment processing integration
- Chat/messaging between buyers and sellers
- Reviews and ratings system
- Shipping integration and tracking
- Push notifications for sales and messages
- Social media integration
- Advanced analytics dashboard
- Seller verification levels (bronze, silver, gold)
- Featured/promoted listings
- Wishlist functionality
- Size guides and fit information

---

Built with ♻️ by Dezyne - Transforming fashion, one piece at a time.
