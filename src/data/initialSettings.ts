import { StoreSettings } from '../types';

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: 'TKR Hub',
  tagline: 'Online Store • Authentic Tech & Apparel • Cash on Delivery',
  currency: '$',
  freeShippingThreshold: 60.0,
  standardShippingFee: 4.5,
  logo: {
    mode: 'custom_image',
    imageUrl: '/tkr-logo.svg',
    altText: 'TKR Holdings Official Logo',
    displayTitle: 'TKR HOLDINGS',
    displaySubtitle: 'Official Store • Cash on Delivery',
    logoHeight: 46
  },
  announcement: {
    enabled: true,
    text: '100% Genuine Products • 7-Day Easy Return • Cash on Delivery',
    highlightText: 'Cash on Delivery (COD) Nationwide',
    linkText: 'Track Order',
    linkUrl: '/track-order'
  },
  promo: {
    discountCode: 'TKR10',
    discountPercentage: 10,
    discountLabel: '10% OFF with code TKR10',
    heroBadgeText: 'NEW COLLECTION 2026 • DOORSTEP CASH ON DELIVERY',
    bannerHeadline: 'Next-Gen Tech & Streetwear at',
    bannerSubheadline: 'Experience the future of online shopping. Hand-picked noise cancelling headphones, AMOLED smartwatches, heavyweight apparel, and modular accessories delivered straight to your door with 100% Cash-on-Delivery payment.'
  },
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    youtube: 'https://youtube.com',
    website: 'https://tkrhub.com'
  },
  contact: {
    callSupport: {
      label: 'Call Support',
      value: '+880 1700-857482',
      shortDescription: 'Urgent order & courier queries (Mon – Sun: 9AM – 10PM)',
      enabled: true
    },
    whatsapp: {
      label: 'WhatsApp Chat',
      value: '+880 1819-857482',
      shortDescription: 'Fast message response (Typical reply in 15 mins)',
      enabled: true
    },
    emailSupport: {
      label: 'Email Support',
      value: 'support@tkrhub.com',
      shortDescription: 'Corporate & warranty helpdesk (Replies within 4 hours)',
      enabled: true
    },
    mainOffice: {
      label: 'Main Office',
      value: 'House 42, Road 11, Block D, Banani Commercial Area, Dhaka - 1213',
      shortDescription: 'Central Logistics & Fulfillment Warehouse #01',
      enabled: true,
      mapUrl: 'https://maps.google.com/?q=House+42+Road+11+Block+D+Banani+Dhaka'
    },
    emptyHandlingMode: 'hide',
    emptyFieldMessage: 'This support channel is currently undergoing maintenance. Please contact us via our alternative lines.',
    businessHours: 'Mon – Sun: 9:00 AM – 10:00 PM',
    googleMapsUrl: 'https://maps.google.com/?q=House+42+Road+11+Block+D+Banani+Dhaka'
  }
};

/**
 * Removes spaces, plus signs and special characters from the WhatsApp number
 * when creating the WhatsApp URL, while preserving the correct country code.
 * Example: "+880 1819-857482" -> "https://wa.me/8801819857482"
 */
export function formatWhatsAppUrl(raw: string): string {
  if (!raw || typeof raw !== 'string') return '';
  // Extract digits only, preserving the country code prefix
  const digits = raw.replace(/[^0-9]/g, '');
  if (!digits) return '';
  return `https://wa.me/${digits}`;
}

/**
 * Formats a clean tel: link from phone number string
 */
export function formatTelUrl(raw: string): string {
  if (!raw || typeof raw !== 'string') return '';
  // Keep plus sign for international dialing if present, strip whitespaces and hyphens
  const cleaned = raw.replace(/[\s\-()]/g, '');
  if (!cleaned) return '';
  return `tel:${cleaned}`;
}

/**
 * Formats a mailto: link
 */
export function formatMailtoUrl(raw: string): string {
  if (!raw || typeof raw !== 'string') return '';
  const cleaned = raw.trim();
  if (!cleaned) return '';
  return `mailto:${cleaned}`;
}

/**
 * Validates whether a provided string is a valid Google Maps / Web URL
 */
export function isValidMapUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return trimmed.startsWith('https://') || trimmed.startsWith('http://');
  }
}
