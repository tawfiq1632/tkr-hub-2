export type CategorySlug = 'all' | 'gadgets' | 'clothing' | 'accessories';

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  categoryName: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  badge?: string;
  description: string;
  shortDescription: string;
  nameBn?: string;
  categoryNameBn?: string;
  subcategoryBn?: string;
  shortDescriptionBn?: string;
  descriptionBn?: string;
  badgeBn?: string;
  keywordsBn?: string[];
  features: string[];
  specs: Record<string, string>;
  images: string[];
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  warranty?: string;
  shippingNote?: string;
  reviews: ProductReview[];
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  price: number;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface TrackingStep {
  step: number;
  title: string;
  description: string;
  location?: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface CustomerOrderForm {
  fullName: string;
  phone: string;
  altPhone: string;
  email: string;
  deliveryAddress: string;
  city: string;
  postalCode: string;
  deliveryNotes: string;
  agreeTerms: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerOrderForm;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: 'Cash on Delivery';
  status: OrderStatus;
  trackingSteps: TrackingStep[];
  estimatedDeliveryDate: string;
  courierName?: string;
  trackingCode?: string;
}

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
  featuredSubcategories: string[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title?: string;
  message: string;
}

export interface ContactCardConfig {
  label: string;
  value: string;
  shortDescription: string;
  enabled: boolean;
  mapUrl?: string;
}

export interface StoreContactSettings {
  callSupport: ContactCardConfig;
  whatsapp: ContactCardConfig;
  emailSupport: ContactCardConfig;
  mainOffice: ContactCardConfig;
  emptyHandlingMode: 'hide' | 'show_message';
  emptyFieldMessage: string;
  businessHours?: string;
  googleMapsUrl?: string;
}

export interface StoreLogoSettings {
  mode: 'custom_image' | 'default_badge';
  imageUrl: string;
  altText: string;
  displayTitle: string;
  displaySubtitle: string;
  logoHeight?: number;
}

export interface StoreAnnouncementSettings {
  enabled: boolean;
  text: string;
  highlightText: string;
  linkText?: string;
  linkUrl?: string;
}

export interface StorePromoSettings {
  discountCode: string;
  discountPercentage: number;
  discountLabel: string;
  heroBadgeText: string;
  bannerHeadline: string;
  bannerSubheadline: string;
}

export interface StoreSocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  website: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  currency: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  logo: StoreLogoSettings;
  announcement: StoreAnnouncementSettings;
  promo: StorePromoSettings;
  socialLinks: StoreSocialLinks;
  contact: StoreContactSettings;
  defaultLanguage?: 'bn' | 'en';
}

export type AppLanguage = 'bn' | 'en';

export type QuickEditTarget = 'logo' | 'email' | 'phone' | 'whatsapp' | 'discount' | 'links' | 'address' | 'language' | 'all';
