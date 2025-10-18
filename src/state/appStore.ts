import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { 
  User, 
  Listing, 
  CartItem, 
  Order, 
  AffiliateClick,
  AffiliateEarning 
} from '../types/models';

// Generate mock listings
const generateMockListings = (): Listing[] => {
  const mockListings: Listing[] = [
    {
      id: "1",
      sellerId: "seller1",
      sellerName: "Emma Design",
      title: "Hand-Painted Denim Jacket",
      description: "Vintage denim jacket transformed with custom sunset painting on the back. Features original brass buttons and distressed details.",
      price: 85,
      images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800"],
      category: "outerwear",
      size: "M",
      condition: "Good",
      upcyclingTechniques: ["painting", "distressing"],
      beforeImage: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800",
      isSold: false,
      createdAt: Date.now() - 86400000,
      views: 234,
      likes: 45,
    },
    {
      id: "2",
      sellerId: "seller2",
      sellerName: "Stitch Studio",
      title: "Embroidered Floral Sweatshirt",
      description: "Oversized cream sweatshirt with hand-embroidered wildflowers along the sleeves and neckline. 100% cotton.",
      price: 62,
      images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800"],
      category: "tops",
      size: "L",
      condition: "Like New",
      upcyclingTechniques: ["embroidery"],
      isSold: false,
      createdAt: Date.now() - 172800000,
      views: 189,
      likes: 38,
    },
    {
      id: "3",
      sellerId: "seller3",
      sellerName: "Patch Paradise",
      title: "Patchwork Cargo Pants",
      description: "Black cargo pants reimagined with colorful fabric patches and custom embroidered details. Unique one-of-a-kind piece.",
      price: 74,
      images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800"],
      category: "bottoms",
      size: "M",
      condition: "Good",
      upcyclingTechniques: ["patchwork", "embroidery", "sewing"],
      isSold: false,
      createdAt: Date.now() - 259200000,
      views: 156,
      likes: 29,
    },
    {
      id: "4",
      sellerId: "seller1",
      sellerName: "Emma Design",
      title: "Tie-Dye Maxi Dress",
      description: "Flowing cotton maxi dress with custom purple and blue tie-dye pattern. Perfect for summer festivals.",
      price: 58,
      images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800"],
      category: "dresses",
      size: "S",
      condition: "Like New",
      upcyclingTechniques: ["dyeing"],
      isSold: false,
      createdAt: Date.now() - 345600000,
      views: 203,
      likes: 51,
    },
    {
      id: "5",
      sellerId: "seller4",
      sellerName: "Vintage Revive",
      title: "Rhinestone Crop Top",
      description: "Black cotton crop top elevated with hand-placed rhinestones in a geometric pattern. Eye-catching and unique.",
      price: 45,
      images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800"],
      category: "tops",
      size: "S",
      condition: "Like New",
      upcyclingTechniques: ["beading"],
      isSold: false,
      createdAt: Date.now() - 432000000,
      views: 178,
      likes: 42,
    },
    {
      id: "6",
      sellerId: "seller2",
      sellerName: "Stitch Studio",
      title: "Custom Painted Sneakers",
      description: "White canvas sneakers transformed with hand-painted cherry blossom design. Sealed for durability.",
      price: 92,
      images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800"],
      category: "shoes",
      size: "M",
      condition: "Like New",
      upcyclingTechniques: ["painting"],
      isSold: false,
      createdAt: Date.now() - 518400000,
      views: 267,
      likes: 63,
    },
  ];
  return mockListings;
};

// Generate unique affiliate code
const generateAffiliateCode = (name: string): string => {
  const randomString = Math.random().toString(36).substring(2, 6).toUpperCase();
  const namePrefix = name.substring(0, 3).toUpperCase();
  return `${namePrefix}${randomString}`;
};

interface AppState {
  // User state
  currentUser: User | null;
  users: User[];
  
  // Listings state
  listings: Listing[];
  likedListings: string[];
  
  // Cart state
  cart: CartItem[];
  
  // Orders state
  orders: Order[];
  
  // Affiliate state
  affiliateClicks: AffiliateClick[];
  affiliateEarnings: AffiliateEarning[];
  activeAffiliateCode: string | null;
  
  // Actions - User
  login: (name: string, email: string) => void;
  logout: () => void;
  becomeVerifiedSeller: (upcyclingProof: { techniques: string[], images: string[] }) => void;
  
  // Actions - Listings
  addListing: (listing: Omit<Listing, 'id' | 'sellerId' | 'sellerName' | 'sellerProfileImage' | 'createdAt' | 'views' | 'likes' | 'isSold'>) => void;
  toggleLike: (listingId: string) => void;
  incrementViews: (listingId: string) => void;
  
  // Actions - Cart
  addToCart: (listing: Listing) => void;
  removeFromCart: (listingId: string) => void;
  clearCart: () => void;
  
  // Actions - Orders
  createOrder: (cartItems: CartItem[], affiliateCode?: string) => void;
  
  // Actions - Affiliate
  trackAffiliateClick: (affiliateCode: string) => void;
  generateAffiliateLink: (userId: string) => string;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUser: null,
      users: [],
      listings: generateMockListings(),
      likedListings: [],
      cart: [],
      orders: [],
      affiliateClicks: [],
      affiliateEarnings: [],
      activeAffiliateCode: null,
      
      // User actions
      login: (name: string, email: string) => {
        const existingUser = get().users.find(u => u.email === email);
        
        if (existingUser) {
          set({ currentUser: existingUser });
        } else {
          const newUser: User = {
            id: `user_${Date.now()}`,
            name,
            email,
            isSeller: false,
            isVerifiedUpcycler: false,
            affiliateCode: generateAffiliateCode(name),
            totalEarnings: 0,
            affiliateEarnings: 0,
            sellerEarnings: 0,
            createdAt: Date.now(),
          };
          
          set(state => ({
            currentUser: newUser,
            users: [...state.users, newUser],
          }));
        }
      },
      
      logout: () => {
        set({ currentUser: null, cart: [], activeAffiliateCode: null });
      },
      
      becomeVerifiedSeller: (_upcyclingProof) => {
        const currentUser = get().currentUser;
        if (!currentUser) return;
        
        const updatedUser = {
          ...currentUser,
          isSeller: true,
          isVerifiedUpcycler: true,
        };
        
        set(state => ({
          currentUser: updatedUser,
          users: state.users.map(u => u.id === currentUser.id ? updatedUser : u),
        }));
      },
      
      // Listing actions
      addListing: (listingData) => {
        const currentUser = get().currentUser;
        if (!currentUser || !currentUser.isVerifiedUpcycler) return;
        
        const newListing: Listing = {
          ...listingData,
          id: `listing_${Date.now()}`,
          sellerId: currentUser.id,
          sellerName: currentUser.name,
          sellerProfileImage: currentUser.profileImage,
          createdAt: Date.now(),
          views: 0,
          likes: 0,
          isSold: false,
        };
        
        set(state => ({
          listings: [newListing, ...state.listings],
        }));
      },
      
      toggleLike: (listingId: string) => {
        const likedListings = get().likedListings;
        const isLiked = likedListings.includes(listingId);
        
        set(state => ({
          likedListings: isLiked
            ? state.likedListings.filter(id => id !== listingId)
            : [...state.likedListings, listingId],
          listings: state.listings.map(listing =>
            listing.id === listingId
              ? { ...listing, likes: isLiked ? listing.likes - 1 : listing.likes + 1 }
              : listing
          ),
        }));
      },
      
      incrementViews: (listingId: string) => {
        set(state => ({
          listings: state.listings.map(listing =>
            listing.id === listingId
              ? { ...listing, views: listing.views + 1 }
              : listing
          ),
        }));
      },
      
      // Cart actions
      addToCart: (listing: Listing) => {
        const cart = get().cart;
        const existingItem = cart.find(item => item.listing.id === listing.id);
        
        if (existingItem) {
          return; // Item already in cart
        }
        
        set(state => ({
          cart: [...state.cart, { listing, quantity: 1 }],
        }));
      },
      
      removeFromCart: (listingId: string) => {
        set(state => ({
          cart: state.cart.filter(item => item.listing.id !== listingId),
        }));
      },
      
      clearCart: () => {
        set({ cart: [] });
      },
      
      // Order actions
      createOrder: (cartItems: CartItem[], affiliateCode?: string) => {
        const currentUser = get().currentUser;
        if (!currentUser) return;
        
        const newOrders: Order[] = [];
        const updatedListings = [...get().listings];
        const updatedUsers = [...get().users];
        const newAffiliateEarnings: AffiliateEarning[] = [];
        
        cartItems.forEach(item => {
          const totalPrice = item.listing.price;
          let affiliateAmount = 0;
          let platformAmount = totalPrice * 0.07;
          let affiliateUserId: string | undefined;
          
          // Check if purchase was made through affiliate link
          if (affiliateCode) {
            const affiliateUser = get().users.find(u => u.affiliateCode === affiliateCode);
            if (affiliateUser && affiliateUser.id !== currentUser.id) {
              affiliateAmount = totalPrice * 0.03;
              platformAmount = totalPrice * 0.04; // Platform gets 4% instead of 7%
              affiliateUserId = affiliateUser.id;
              
              // Track affiliate earning
              const affiliateEarning: AffiliateEarning = {
                id: `aff_earn_${Date.now()}_${Math.random()}`,
                affiliateUserId: affiliateUser.id,
                orderId: `order_${Date.now()}_${Math.random()}`,
                amount: affiliateAmount,
                createdAt: Date.now(),
              };
              newAffiliateEarnings.push(affiliateEarning);
              
              // Update affiliate user earnings
              const userIndex = updatedUsers.findIndex(u => u.id === affiliateUser.id);
              if (userIndex !== -1) {
                updatedUsers[userIndex] = {
                  ...updatedUsers[userIndex],
                  affiliateEarnings: updatedUsers[userIndex].affiliateEarnings + affiliateAmount,
                  totalEarnings: updatedUsers[userIndex].totalEarnings + affiliateAmount,
                };
              }
            }
          }
          
          const sellerAmount = totalPrice * 0.93;
          
          const order: Order = {
            id: `order_${Date.now()}_${Math.random()}`,
            buyerId: currentUser.id,
            sellerId: item.listing.sellerId,
            listing: item.listing,
            totalPrice,
            sellerAmount,
            platformAmount,
            affiliateAmount,
            affiliateUserId,
            status: "processing",
            createdAt: Date.now(),
          };
          
          newOrders.push(order);
          
          // Mark listing as sold
          const listingIndex = updatedListings.findIndex(l => l.id === item.listing.id);
          if (listingIndex !== -1) {
            updatedListings[listingIndex] = { ...updatedListings[listingIndex], isSold: true };
          }
          
          // Update seller earnings
          const sellerIndex = updatedUsers.findIndex(u => u.id === item.listing.sellerId);
          if (sellerIndex !== -1) {
            updatedUsers[sellerIndex] = {
              ...updatedUsers[sellerIndex],
              sellerEarnings: updatedUsers[sellerIndex].sellerEarnings + sellerAmount,
              totalEarnings: updatedUsers[sellerIndex].totalEarnings + sellerAmount,
            };
          }
        });
        
        // Update current user if they are an affiliate or seller
        const currentUserIndex = updatedUsers.findIndex(u => u.id === currentUser.id);
        const updatedCurrentUser = currentUserIndex !== -1 ? updatedUsers[currentUserIndex] : currentUser;
        
        set(state => ({
          orders: [...newOrders, ...state.orders],
          listings: updatedListings,
          users: updatedUsers,
          currentUser: updatedCurrentUser,
          affiliateEarnings: [...newAffiliateEarnings, ...state.affiliateEarnings],
          cart: [],
        }));
      },
      
      // Affiliate actions
      trackAffiliateClick: (affiliateCode: string) => {
        const currentUser = get().currentUser;
        if (!currentUser) return;
        
        const click: AffiliateClick = {
          affiliateCode,
          userId: currentUser.id,
          timestamp: Date.now(),
        };
        
        set(state => ({
          affiliateClicks: [...state.affiliateClicks, click],
          activeAffiliateCode: affiliateCode,
        }));
      },
      
      generateAffiliateLink: (userId: string) => {
        const user = get().users.find(u => u.id === userId) || get().currentUser;
        if (!user) return "";
        return `dezyne://app?ref=${user.affiliateCode}`;
      },
    }),
    {
      name: 'dezyne-storage',
      storage: createJSONStorage(() => Platform.OS === 'web' 
        ? {
            getItem: async (name: string) => localStorage.getItem(name),
            setItem: async (name: string, value: string) => localStorage.setItem(name, value),
            removeItem: async (name: string) => localStorage.removeItem(name),
          }
        : AsyncStorage
      ),
      partialize: (state) => ({
        currentUser: state.currentUser,
        users: state.users,
        listings: state.listings,
        likedListings: state.likedListings,
        orders: state.orders,
        affiliateClicks: state.affiliateClicks,
        affiliateEarnings: state.affiliateEarnings,
        activeAffiliateCode: state.activeAffiliateCode,
      }),
    }
  )
);
