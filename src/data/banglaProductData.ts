import { Product } from '../types';

export interface BanglaProductInfo {
  nameBn: string;
  categoryNameBn: string;
  subcategoryBn: string;
  shortDescriptionBn: string;
  badgeBn: string;
  keywordsBn: string[];
}

export const BANGLA_PRODUCTS_MAP: Record<string, BanglaProductInfo> = {
  // 1. Headphones (হেডফোন)
  'prod-g1': {
    nameBn: 'টিকেআর সাউন্ডপালস এএনসি প্রো ওয়্যারলেস হেডফোন',
    categoryNameBn: 'গ্যাজেটস ও টেক',
    subcategoryBn: 'ওয়্যারলেস অডিও',
    shortDescriptionBn: 'হাইব্রিড ৪২ডিবি অ্যাক্টিভ নয়েজ ক্যান্সেলেশন, ৪৫ ঘণ্টার ব্যাটারি ব্যাকআপ এবং স্টুডিও হাই-রেস সাউন্ড কোয়ালিটি।',
    badgeBn: 'বেস্টসেলার',
    keywordsBn: [
      'হেডফোন',
      'হেড ফোন',
      'ইয়ারফোন',
      'ইয়ারফোন',
      'ইয়ারবাডস',
      'ইয়ারবাডস',
      'ব্লুটুথ',
      'সাউন্ড',
      'গান',
      'অডিও',
      'নয়েজ ক্যান্সেলেশন',
      'হেডসেট',
      'হিয়ারফোন',
      'headphone',
      'headphones',
      'soundpulse',
      'wireless audio'
    ]
  },

  // 2. Smartwatch (স্মার্টওয়াচ / ঘড়ি)
  'prod-g2': {
    nameBn: 'টিকেআর ক্রোনোফিট আল্ট্রা স্মার্টওয়াচ অ্যামোলেড ডিসপ্লে',
    categoryNameBn: 'গ্যাজেটস ও টেক',
    subcategoryBn: 'স্মার্টওয়াচ',
    shortDescriptionBn: '১.৯৬ ইঞ্চি এইচডি অ্যামোলেড অলওয়েজ-অন ডিসপ্লে, ২৪/৭ হার্টরেট ও এসপিও২ হেলথ ট্র্যাকিং এবং ব্লুটুথ কলিং।',
    badgeBn: 'জনপ্রিয়',
    keywordsBn: [
      'স্মার্টওয়াচ',
      'স্মার্ট ওয়াচ',
      'স্মার্টওয়াচ',
      'ঘড়ি',
      'ঘড়ি',
      'হাতঘড়ি',
      'হাত ঘড়ি',
      'হাতঘড়ি',
      'কলিং ঘড়ি',
      'ফিটনেস ব্যান্ড',
      'অ্যামোলেড ঘড়ি',
      'smartwatch',
      'watch',
      'chronofit',
      'amoled'
    ]
  },

  // 3. Power Bank (পাওয়ার ব্যাংক / চার্জার)
  'prod-g3': {
    nameBn: 'টিকেআর ম্যাগপাওয়ার ২০,০০০ এমএএইচ ফাস্ট চার্জার পাওয়ার ব্যাংক',
    categoryNameBn: 'গ্যাজেটস ও টেক',
    subcategoryBn: 'পাওয়ার ও চার্জার',
    shortDescriptionBn: '৬৫ ওয়াট সুপারফাস্ট পাওয়ার ডেলিভারি, ডিজিটাল এলইডি স্ট্যাটাস ডিসপ্লে এবং ম্যাগসেফ ওয়্যারলেস চার্জিং প্যাড।',
    badgeBn: 'হট ডিল',
    keywordsBn: [
      'পাওয়ার ব্যাংক',
      'পাওয়ার ব্যাংক',
      'পাওয়ারব্যাংক',
      'চার্জার',
      'ব্যাটারি',
      'ফাস্ট চার্জার',
      'ম্যাগসেফ',
      'কেবল',
      'টাইপ সি চার্জার',
      'ল্যাপটপ চার্জার',
      'power bank',
      'charger',
      'magpower',
      'battery'
    ]
  },

  // 4. USB Mic (মাইক্রোফোন / মাইক)
  'prod-g4': {
    nameBn: 'টিকেআর স্ট্রিমওয়েভ প্রো স্টুডিও ইউএসবি কনডেনসার মাইক্রোফোন',
    categoryNameBn: 'গ্যাজেটস ও টেক',
    subcategoryBn: 'অডিও গিয়ার',
    shortDescriptionBn: 'ব্রডকাস্ট কোয়ালিটি কার্ডিওয়েড ইউএসবি মাইক, ইন-বিল্ট শকমাউন্ট, ট্যাপ-টু-মিউট আরজিবি সেন্সর ও লাইভ হেডফোন মনিটরিং।',
    badgeBn: 'ক্রিয়েটর চয়েস',
    keywordsBn: [
      'মাইক্রোফোন',
      'মাইক',
      'ইউএসবি মাইক',
      'কন্ডেনসার মাইক',
      'রেকর্ডিং',
      'পডকাস্ট মাইক',
      'ইউটিউব মাইক',
      'গেমিং মাইক',
      'microphone',
      'mic',
      'streamwave',
      'audio'
    ]
  },

  // 5. Drone (ড্রোন / ক্যামেরা)
  'prod-g5': {
    nameBn: 'টিকেআর অ্যারোফ্লাইট ৪কে মিনি জিপিএস ক্যামেরা ড্রোন',
    categoryNameBn: 'গ্যাজেটস ও টেক',
    subcategoryBn: 'ড্রোন ও ক্যামেরা',
    shortDescriptionBn: '২৪৯ গ্রামের ফোল্ডেবল ড্রোন, ৪কে ইলেকট্রনিক স্ট্যাবিলাইজেশন ক্যামেরা, ৩৬০° অবস্টাকল ডিটেকশন এবং ২৮ মিনিট ফ্লাইট।',
    badgeBn: 'নতুন টেক',
    keywordsBn: [
      'ড্রোন',
      'ক্যামেরা',
      'ক্যামেরা ড্রোন',
      '৪কে ড্রোন',
      'জিপিএস ড্রোন',
      'উড়ন্ত ক্যামেরা',
      'ভিডিও ক্যামেরা',
      'drone',
      'aeroflight',
      'camera'
    ]
  },

  // 6. T-Shirt (টি-শার্ট / গেঞ্জি / জামা / পোশাক)
  'prod-c1': {
    nameBn: 'টিকেআর হেভিওয়েট ওভারসাইজড ভিন্টেজ ড্রপ-শোল্ডার টি-শার্ট',
    categoryNameBn: 'পোশাক ও ফ্যাশন',
    subcategoryBn: 'ওভারসাইজড টি-শার্ট',
    shortDescriptionBn: '২৮০ জিএসএম প্রিমিয়াম ১০০% সুতি কম্বড কটন, প্রি-শ্রাংক বক্সি ফিট এবং দীর্ঘস্থায়ী ডাবল-স্টিচ কলার।',
    badgeBn: 'টপ রেটেড',
    keywordsBn: [
      'টি-শার্ট',
      'টি শার্ট',
      'টিশার্ট',
      'শার্ট',
      'গেঞ্জি',
      'জামা',
      'পোশাক',
      'কটন টি-শার্ট',
      'ড্রপ শোল্ডার',
      'ওভারসাইজড',
      't-shirt',
      'tshirt',
      'tee',
      'shirt',
      'clothing',
      'heavyweight'
    ]
  },

  // 7. Hoodie (হুডি / সোয়েটার / শীতের পোশাক)
  'prod-c2': {
    nameBn: 'টিকেআর টেকফ্লিস ট্যাকটিক্যাল পুলওভার হুডি ৪২০ জিএসএম',
    categoryNameBn: 'পোশাক ও ফ্যাশন',
    subcategoryBn: 'হুডি ও ফ্লিস',
    shortDescriptionBn: '৪২০ জিএসএম নরম ব্রাশব্যাক কটন ফ্লিস হুডি, ডাবল লেয়ার হুড, ক্যাঙ্গারু পকেট এবং অভ্যন্তরীণ গোপন জিপার পকেট।',
    badgeBn: 'শীতের কালেকশন',
    keywordsBn: [
      'হুডি',
      'হুডী',
      'সোয়েটার',
      'সোয়েটার',
      'জ্যাকেট',
      'শীতের পোশাক',
      'পোশাক',
      'শীতের জামা',
      'হাতাওয়ালা হুডি',
      'hoodie',
      'fleece',
      'sweater',
      'techfleece'
    ]
  },

  // 8. Cargo Joggers (কার্গো প্যান্ট / ট্রাউজার)
  'prod-c3': {
    nameBn: 'টিকেআর আরবান কমিউটার রিপস্টপ কার্গো জগ্স প্যান্ট',
    categoryNameBn: 'পোশাক ও ফ্যাশন',
    subcategoryBn: 'কার্গো প্যান্ট',
    shortDescriptionBn: 'ওয়াটার-রেজিস্ট্যান্ট স্ট্রেচ রিপস্টপ ফেব্রিক, ৬টি গভীর পকেট, ইলাস্টিক ড্রস্ট্রিং কোমর এবং ট্র্যাপার্ড গোড়ালি।',
    badgeBn: 'ইউটিলিটি',
    keywordsBn: [
      'প্যান্ট',
      'কার্গো',
      'কার্গো প্যান্ট',
      'ট্রাউজার',
      'জগ্স',
      'পোশাক',
      'গেঞ্জি প্যান্ট',
      'স্টাইলিশ প্যান্ট',
      'pants',
      'cargo',
      'joggers',
      'ripstop'
    ]
  },

  // 9. Windbreaker Jacket (জ্যাকেট / উইন্ডব্রেকার)
  'prod-c4': {
    nameBn: 'টিকেআর ওয়েদারগার্ড ট্যাকটিক্যাল উইন্ডব্রেকার জ্যাকেট',
    categoryNameBn: 'পোশাক ও ফ্যাশন',
    subcategoryBn: 'জ্যাকেট',
    shortDescriptionBn: 'আল্ট্রালাইট ৩-লেয়ার ওয়াটারপ্রুফ শেল জ্যাকেট, সিলড টেপড সিম, সমন্বয়যোগ্য ঝড় হুড এবং থ্রিএম রিফ্লেক্টিভ লোগো।',
    badgeBn: 'অল-ওয়েদার',
    keywordsBn: [
      'জ্যাকেট',
      'উইন্ডব্রেকার',
      'রেইনকোট',
      'বৃষ্টির জ্যাকেট',
      'শীতের পোশাক',
      'ট্যাকটিক্যাল জ্যাকেট',
      'পোশাক',
      'jacket',
      'windbreaker',
      'outerwear',
      'weatherguard'
    ]
  },

  // 10. Backpack (ব্যাগ / ব্যাকপ্যাক / ট্রাভেল ব্যাগ)
  'prod-a1': {
    nameBn: 'টিকেআর নোম্যাড শিল্ড ২৮ লিটার ওয়াটারপ্রুফ ব্যাকপ্যাক ব্যাগ',
    categoryNameBn: 'এক্সেসরিজ ও গিয়ার',
    subcategoryBn: 'ব্যাকপ্যাক',
    shortDescriptionBn: '৯০০ডি ব্যালিস্টিক ওয়েদারপ্রুফ নাইলন, ১৬ ইঞ্চি ল্যাপটপ সেফটি ভল্ট এবং সিক্রেট অ্যান্টি-থেফ্ট পকেট।',
    badgeBn: 'স্টাফ পিক',
    keywordsBn: [
      'ব্যাগ',
      'ব্যাকপ্যাক',
      'ব্যাগপ্যাক',
      'ল্যাপটপ ব্যাগ',
      'ট্রাভেল ব্যাগ',
      'স্কুল ব্যাগ',
      'কলেজ ব্যাগ',
      'ওয়াটারপ্রুফ ব্যাগ',
      'পিঠের ব্যাগ',
      'backpack',
      'bag',
      'nomad shield',
      'commuter'
    ]
  },

  // 11. Wallet (মানিব্যাগ / ওয়ালেট)
  'prod-a2': {
    nameBn: 'টিকেআর অ্যাপেক্স মিনিমালিস্ট কার্বন আরএফআইডি মানিব্যাগ',
    categoryNameBn: 'এক্সেসরিজ ও গিয়ার',
    subcategoryBn: 'মানিব্যাগ ও ওয়ালেট',
    shortDescriptionBn: 'অ্যারোস্পেস ফোর্জড কার্বন ফাইবার ও জেনুইন লেদার, ১০টি কার্ড স্লট এবং আরএফআইডি ব্লকিং সুরক্ষা।',
    badgeBn: 'ইডিচি এসেনশিয়াল',
    keywordsBn: [
      'মানিব্যাগ',
      'ওয়ালেট',
      'ওয়ালেট',
      'কার্ডহোল্ডার',
      'লেদার মানিব্যাগ',
      'টাকার ব্যাগ',
      'কার্বন ওয়ালেট',
      'wallet',
      'cardholder',
      'rfid',
      'leather wallet'
    ]
  },

  // 12. Thermal Flask (পানির বোতল / ফ্লাস্ক)
  'prod-a3': {
    nameBn: 'টিকেআর হাইড্রো-লক ৩২ আউন্স ভ্যাকুয়াম ইনসুলেটেড থার্মাল ফ্লাস্ক বোতল',
    categoryNameBn: 'এক্সেসরিজ ও গিয়ার',
    subcategoryBn: 'হাইড্রেশন বোতল',
    shortDescriptionBn: 'ডাবল-ওয়াল ১৮/৮ স্টেইনলেস স্টিল, ২৪ ঘণ্টা বরফ ঠান্ডা ও ১২ ঘণ্টা গরম রাখার ক্ষমতা। ১০০% লিকপ্রুফ।',
    badgeBn: 'জনপ্রিয়',
    keywordsBn: [
      'বোতল',
      'পানির বোতল',
      'ফ্লাস্ক',
      'থার্মাস',
      'গরম পানির বোতল',
      'ঠান্ডা পানির বোতল',
      'স্টিল বোতল',
      'flask',
      'bottle',
      'water bottle',
      'hydrolock',
      'thermal'
    ]
  }
};

/**
 * Enriches any product with Bangla fields and searchable Bangla keywords
 */
export function enrichProductWithBangla(product: Product): Product {
  const match = BANGLA_PRODUCTS_MAP[product.id] || BANGLA_PRODUCTS_MAP[product.slug];

  if (match) {
    return {
      ...product,
      nameBn: product.nameBn || match.nameBn,
      categoryNameBn: product.categoryNameBn || match.categoryNameBn,
      subcategoryBn: product.subcategoryBn || match.subcategoryBn,
      shortDescriptionBn: product.shortDescriptionBn || match.shortDescriptionBn,
      badgeBn: product.badgeBn || match.badgeBn,
      keywordsBn: Array.from(new Set([...(product.keywordsBn || []), ...match.keywordsBn]))
    };
  }

  // Generic fallback if not explicitly mapped
  const fallbackKeywords = [
    product.name.toLowerCase(),
    product.categoryName.toLowerCase(),
    product.subcategory.toLowerCase()
  ];

  return {
    ...product,
    nameBn: product.nameBn || product.name,
    categoryNameBn: product.categoryNameBn || product.categoryName,
    subcategoryBn: product.subcategoryBn || product.subcategory,
    shortDescriptionBn: product.shortDescriptionBn || product.shortDescription,
    badgeBn: product.badgeBn || product.badge,
    keywordsBn: Array.from(new Set([...(product.keywordsBn || []), ...fallbackKeywords]))
  };
}

/**
 * Enriches an entire array of products with Bangla attributes
 */
export function enrichProductsList(products: Product[]): Product[] {
  return products.map(enrichProductWithBangla);
}
