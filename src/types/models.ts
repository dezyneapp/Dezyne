export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  isSeller: boolean;
  isVerifiedUpcycler: boolean;
  affiliateCode: string;
  totalEarnings: number;
  affiliateEarnings: number;
  sellerEarnings: number;
  createdAt: number;
}

export interface UpcyclingTechnique {
  id: string;
  name: string;
  description: string;
}

export const UPCYCLING_TECHNIQUES: UpcyclingTechnique[] = [
  { id: "painting", name: "Painting", description: "Hand-painted designs on fabric" },
  { id: "embroidery", name: "Embroidery", description: "Decorative stitching and thread work" },
  { id: "sewing", name: "Sewing/Alterations", description: "Restructuring or adding fabric elements" },
  { id: "patchwork", name: "Patchwork", description: "Adding patches or fabric pieces" },
  { id: "dyeing", name: "Tie-Dye/Dyeing", description: "Custom color treatments" },
  { id: "distressing", name: "Distressing", description: "Intentional wear and tear effects" },
  { id: "beading", name: "Beading/Rhinestones", description: "Adding decorative elements" },
  { id: "printing", name: "Screen Printing", description: "Custom prints and designs" },
];

export type ClothingCategory = "tops" | "bottoms" | "dresses" | "outerwear" | "accessories" | "shoes" | "other";
export type ClothingSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "One Size";
export type ClothingCondition = "Like New" | "Good" | "Fair";

export interface Listing {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerProfileImage?: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: ClothingCategory;
  size: ClothingSize;
  condition: ClothingCondition;
  upcyclingTechniques: string[];
  beforeImage?: string;
  isSold: boolean;
  createdAt: number;
  views: number;
  likes: number;
}

export interface CartItem {
  listing: Listing;
  quantity: number;
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  listing: Listing;
  totalPrice: number;
  sellerAmount: number; // 93%
  platformAmount: number; // 7%
  affiliateAmount: number; // 3% if applicable
  affiliateUserId?: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: number;
}

export interface AffiliateClick {
  affiliateCode: string;
  userId: string;
  timestamp: number;
}

export interface AffiliateEarning {
  id: string;
  affiliateUserId: string;
  orderId: string;
  amount: number;
  createdAt: number;
}
