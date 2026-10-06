export type StockStatus = 'in_stock' | 'low_stock' | 'on_order' | 'out_of_stock';

export interface Product {
  id: string;
  code: string;
  name: string;
  categoryId: string;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  isDiscounted: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  stockStatus: StockStatus;
  dimensions: string;
  materials: string;
  colors: { name: string; hex: string }[];
  images: string[];
  videoUrl?: string;
  viewsCount: number;
  ordersCount: number;
  rating?: number;
  reviewsCount?: number;
  tags: string[];
  createdAt: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  customerName: string;
  city?: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
  verifiedPurchase?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  featured?: boolean;
}

export type SocialPlatformFormat =
  | 'ig_post'      // 1080x1080 (1:1)
  | 'ig_portrait'  // 1080x1350 (4:5)
  | 'ig_story'     // 1080x1920 (9:16)
  | 'fb_post'      // 1200x1500 (4:5)
  | 'fb_story'     // 1080x1920 (9:16)
  | 'reel_cover';  // 1080x1920 (9:16)

export type DesignStatus = 'draft' | 'ready' | 'published' | 'archived';

export type DesignTheme =
  | 'dark_luxury'   // Charcoal Black & Brushed Gold
  | 'royal_gold'    // Deep Warm Brown & Lustrous Gold
  | 'warm_walnut'   // Rich Wood Tone & Brass
  | 'ivory_chic'    // Off-white & Champagne Accents
  | 'emerald_night' // Royal Emerald & Gold
  | 'pure_minimal'; // Crisp Gallery White & Charcoal

export interface SocialMediaDesign {
  id: string;
  title: string;
  productId: string;
  productName: string;
  productImage: string;
  format: SocialPlatformFormat;
  templateId: string;
  theme: DesignTheme;
  customHeadline: string;
  customSubhead: string;
  customTagline: string;
  badgeText?: string;
  showPrice: boolean;
  temporaryPrice?: number;
  temporaryOriginalPrice?: number;
  temporaryDiscount?: number;
  showOldPrice: boolean;
  showLogo: boolean;
  showContact: boolean;
  showPhone: boolean;
  showWhatsapp: boolean;
  showHandle: boolean;
  showSpecs: boolean;
  imageScale: number;
  imageOffsetX: number;
  imageOffsetY: number;
  status: DesignStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DesignTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  defaultTheme: DesignTheme;
  defaultFormat: SocialPlatformFormat;
  badge: string;
  sampleHeadline: string;
  sampleSubhead: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  image: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'delivered' | 'completed' | 'cancelled';

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  notes?: string;
  orderMethod: 'whatsapp' | 'web_form' | 'phone_call';
  createdAt: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  xPlatform: string;
  snapchat: string;
  currency: string;
  announcementText: string;
  showAnnouncement: boolean;
  announcementBarEnabled?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  featuredFurniture: string[];
}
