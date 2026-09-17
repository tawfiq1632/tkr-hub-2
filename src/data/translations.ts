import { AppLanguage } from '../types';

export const BANGLA_NUMERALS: Record<string, string> = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯'
};

export function toBengaliNumerals(input: string | number): string {
  const str = String(input);
  return str.replace(/[0-9]/g, (digit) => BANGLA_NUMERALS[digit] || digit);
}

export function formatCurrency(amount: number, lang: AppLanguage, currencySymbol = '৳'): string {
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  });

  if (lang === 'bn') {
    return `${currencySymbol} ${toBengaliNumerals(formatted)}`;
  }
  return `${currencySymbol} ${formatted}`;
}

export const TRANSLATIONS = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.shop': 'Shop All',
    'nav.gadgets': 'Gadgets & Tech',
    'nav.clothing': 'Apparel & Fashion',
    'nav.accessories': 'Everyday Gear',
    'nav.trackOrder': 'Track Order',
    'nav.about': 'About Us',
    'nav.contact': 'Contact & Care',
    'nav.admin': 'Admin Panel',

    // Announcement Bar
    'announcement.cod': 'Cash on Delivery (COD) Nationwide',
    'announcement.genuine': '100% Genuine Products • 7-Day Easy Return',
    'announcement.hotline': 'Hotline',

    // Search
    'search.placeholder': 'Search gadgets, headphones, watch, apparel...',
    'search.trending': 'Popular searches',
    'search.pressEnter': 'Press Enter to view all results',
    'search.resultsFor': 'Search Results for',
    'search.noResults': 'No matching products found',
    'search.tryDifferent': 'Try searching for headphones, smartwatch, hoodie, or bag.',

    // Header actions
    'header.cart': 'Cart',
    'header.wishlist': 'Wishlist',
    'header.quickSettings': 'Store Settings',
    'header.language': 'Language',
    'header.activeLang': 'English',

    // Hero
    'hero.badge': 'NEW COLLECTION 2026 • DOORSTEP CASH ON DELIVERY',
    'hero.headline': 'ELEVATE YOUR EVERYDAY ESSENTIALS.',
    'hero.subheadline': 'Curated high-grade gadgets, durable streetwear, and utility accessories engineered for modern lifestyle. Pay safely upon delivery at your doorstep.',
    'hero.shopCollection': 'Shop Collection',
    'hero.exploreCatalog': 'Explore Catalog',
    'hero.codTitle': '100% Cash on Delivery',
    'hero.codDesc': 'Pay only after unboxing & inspecting your parcel',
    'hero.deliveryTitle': 'Fast Nationwide Delivery',
    'hero.deliveryDesc': 'Reliable doorstep courier dispatch',
    'hero.warrantyTitle': 'Official Warranty',
    'hero.warrantyDesc': '7-day replacement & authentic guarantee',

    // Promo Banner
    'promo.badge': 'Limited Flash Deal',
    'promo.title': 'Save 10% OFF Storewide',
    'promo.desc': 'Use coupon code during Cash on Delivery checkout to save. Free doorstep inspection included.',
    'promo.coupon': 'Coupon Code',
    'promo.shopNow': 'Shop Now',

    // Categories
    'cat.all': 'All Categories',
    'cat.gadgets': 'Gadgets & Tech',
    'cat.clothing': 'Apparel & Streetwear',
    'cat.accessories': 'Everyday Accessories',
    'cat.viewAll': 'View All',
    'cat.explore': 'Explore',

    // Product Card & Details
    'product.addToCart': 'Add to Cart',
    'product.buyNow': 'Buy Now (COD)',
    'product.addedToCart': 'Added to cart!',
    'product.inStock': 'In Stock',
    'product.outOfStock': 'Out of Stock',
    'product.leftInStock': 'left in stock',
    'product.reviews': 'reviews',
    'product.bestseller': 'Bestseller',
    'product.popular': 'Popular',
    'product.hotDeal': 'Hot Deal',
    'product.trending': 'Trending',
    'product.newArrival': 'New',
    'product.off': 'OFF',
    'product.warranty': 'Warranty',
    'product.doorstepInspection': 'Doorstep inspection allowed upon delivery',
    'product.features': 'Key Features',
    'product.specs': 'Specifications',
    'product.selectColor': 'Select Color',
    'product.selectSize': 'Select Size',
    'product.quantity': 'Quantity',

    // Shop Page Filters
    'shop.title': 'Shop All Products',
    'shop.desc': 'Explore premium wireless audio, smart tech, tactical outerwear, and everyday gear with Cash-on-Delivery payment across the country.',
    'shop.sortBy': 'Sort by',
    'shop.featured': 'Featured',
    'shop.priceLow': 'Price: Low to High',
    'shop.priceHigh': 'Price: High to Low',
    'shop.rating': 'Top Rated',
    'shop.discount': 'Biggest Discount',
    'shop.filter': 'Filter',
    'shop.inStockOnly': 'In-Stock Only',
    'shop.maxPrice': 'Max Price',
    'shop.clearFilters': 'Clear Filters',
    'shop.showing': 'Showing',
    'shop.products': 'products',

    // Cart & Checkout
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your shopping bag is empty',
    'cart.startShopping': 'Start Shopping',
    'cart.summary': 'Order Summary',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping Fee',
    'cart.freeShipping': 'Free',
    'cart.freeDeliveryUnlocked': 'You unlocked Free Nationwide Delivery!',
    'cart.awayFromFreeDelivery': 'away from FREE Delivery',
    'cart.discount': 'Discount',
    'cart.coupon': 'Coupon / Promo Code',
    'cart.applyCoupon': 'Apply',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'cart.remove': 'Remove',

    // Checkout
    'checkout.title': 'Cash on Delivery Checkout',
    'checkout.customerInfo': 'Customer & Delivery Information',
    'checkout.fullName': 'Full Name',
    'checkout.fullNamePlaceholder': 'e.g. Tanvir Ahmed',
    'checkout.phone': 'Mobile Phone Number',
    'checkout.phonePlaceholder': 'e.g. 01712345678',
    'checkout.altPhone': 'Alternative Phone (Optional)',
    'checkout.email': 'Email Address (Optional)',
    'checkout.address': 'Full Street Address',
    'checkout.addressPlaceholder': 'House #, Road #, Area / Thana, Post Office',
    'checkout.city': 'City / District',
    'checkout.notes': 'Special Delivery Notes (Optional)',
    'checkout.paymentMethod': 'Payment Method',
    'checkout.codLabel': 'Cash on Delivery (Pay when you receive)',
    'checkout.placeOrder': 'Confirm & Place COD Order',
    'checkout.safetyPromise': '100% risk-free. Open & inspect your product before paying the delivery agent.',

    // Language Modal & Bar
    'lang.switchTitle': 'Language & Regional Settings',
    'lang.bangla': 'বাংলা (Bangla)',
    'lang.english': 'English (ইংরেজি)',
    'lang.desc': 'Select your preferred language. Bangladeshi shoppers and international visitors can switch anytime.',
    'lang.changeSuccess': 'Language updated successfully!',

    // Footer
    'footer.about': 'TKR Hub is Bangladesh\'s premier destination for next-gen gadgets, streetwear apparel, and daily utility accessories with 100% Cash-on-Delivery security.',
    'footer.quickLinks': 'Quick Links',
    'footer.support': 'Customer Support',
    'footer.contactUs': 'Get In Touch',
    'footer.copyright': 'All rights reserved. Designed for Bangladesh & beyond.'
  },
  bn: {
    // Navigation
    'nav.home': 'হোম',
    'nav.shop': 'সব পণ্য',
    'nav.gadgets': 'গ্যাজেটস ও টেক',
    'nav.clothing': 'পোশাক ও ফ্যাশন',
    'nav.accessories': 'এক্সেসরিজ ও গিয়ার',
    'nav.trackOrder': 'অর্ডার ট্র্যাক',
    'nav.about': 'আমাদের সম্পর্কে',
    'nav.contact': 'যোগাযোগ ও সাপোর্ট',
    'nav.admin': 'এডমিন প্যানেল',

    // Announcement Bar
    'announcement.cod': 'সারাদেশে হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি (COD)',
    'announcement.genuine': '১০০% আসল পণ্য • ৭ দিনের সহজ রিটার্ন পলিসি',
    'announcement.hotline': 'হটলাইন',

    // Search
    'search.placeholder': 'হেডফোন, স্মার্টওয়াচ, ঘড়ি, টি-শার্ট, ব্যাকপ্যাক খুঁজুন...',
    'search.trending': 'জনপ্রিয় অনুসন্ধান',
    'search.pressEnter': 'সব ফলাফল দেখতে Enter চাপুন',
    'search.resultsFor': 'অনুসন্ধানের ফলাফল',
    'search.noResults': 'কোনো পণ্য খুঁজে পাওয়া যায়নি',
    'search.tryDifferent': 'দয়া করে হেডফোন, স্মার্টওয়াচ, টি-শার্ট বা ব্যাগ লিখে অনুসন্ধান করুন।',

    // Header actions
    'header.cart': 'কার্ট',
    'header.wishlist': 'উইশলিস্ট',
    'header.quickSettings': 'স্টোর সেটিংস',
    'header.language': 'ভাষা',
    'header.activeLang': 'বাংলা',

    // Hero
    'hero.badge': 'নতুন কালেকশন ২০২৬ • সারাদেশে ক্যাশ অন ডেলিভারি',
    'hero.headline': 'আপনার দৈনন্দিন লাইফস্টাইলের সেরা পণ্য।',
    'hero.subheadline': 'সেরা মানের হেডফোন, স্মার্টওয়াচ, প্রিমিয়াম টি-শার্ট এবং নিত্যপ্রয়োজনীয় এক্সেসরিজ। কোনো আগাম পেমেন্ট ছাড়াই হাতে পেয়ে দেখে মূল্য পরিশোধ করুন।',
    'hero.shopCollection': 'কালেকশন দেখুন',
    'hero.exploreCatalog': 'সব পণ্য খুঁজুন',
    'hero.codTitle': '১০০% ক্যাশ অন ডেলিভারি',
    'hero.codDesc': 'পার্সেল খুলে দেখে নিশ্চিত হয়ে ডেলিভারিম্যানকে টাকা দিন',
    'hero.deliveryTitle': 'দ্রুত হোম ডেলিভারি',
    'hero.deliveryDesc': 'সারা বাংলাদেশে নির্ভরযোগ্য কুরিয়ারে দ্রুত ডেলিভারি',
    'hero.warrantyTitle': 'অফিশিয়াল ওয়ারেন্টি',
    'hero.warrantyDesc': '৭ দিনের রিপ্লেসমেন্ট এবং অরিজিনাল পণ্যের গ্যারান্টি',

    // Promo Banner
    'promo.badge': 'সীমিত সময়ের বিশেষ অফার',
    'promo.title': 'সব পণ্যে ১০% পর্যন্ত বিশেষ মূল্যছাড়',
    'promo.desc': 'ক্যাশ অন ডেলিভারি চেকআউটে প্রোমো কোড ব্যবহার করে অতিরিক্ত ডিসকাউন্ট উপভোগ করুন। পার্সেল খুলে দেখার সুবিধা অন্তর্ভুক্ত।',
    'promo.coupon': 'কুপন কোড',
    'promo.shopNow': 'অর্ডার করুন',

    // Categories
    'cat.all': 'সকল ক্যাটাগরি',
    'cat.gadgets': 'গ্যাজেটস ও টেকনোলজি',
    'cat.clothing': 'পোশাক ও ফ্যাশন',
    'cat.accessories': 'নিত্যব্যবহার্য এক্সেসরিজ',
    'cat.viewAll': 'সব দেখুন',
    'cat.explore': 'বিস্তারিত',

    // Product Card & Details
    'product.addToCart': 'কার্টে যোগ করুন',
    'product.buyNow': 'অর্ডার করুন (COD)',
    'product.addedToCart': 'কার্টে যুক্ত হয়েছে!',
    'product.inStock': 'স্টকে আছে',
    'product.outOfStock': 'স্টক শেষ',
    'product.leftInStock': 'টি অবশিষ্ট আছে',
    'product.reviews': 'রিভিউ',
    'product.bestseller': 'বেস্টসেলার',
    'product.popular': 'জনপ্রিয়',
    'product.hotDeal': 'হট ডিল',
    'product.trending': 'ট্রেন্ডিং',
    'product.newArrival': 'নতুন কালেকশন',
    'product.off': 'ছাড়',
    'product.warranty': 'ওয়ারেন্টি',
    'product.doorstepInspection': 'ডেলিভারি নেওয়ার সময় খুলে চেক করে নেওয়ার সুবিধা',
    'product.features': 'মূল বৈশিষ্ট্যসমূহ',
    'product.specs': 'স্পেসিফিকেশন',
    'product.selectColor': 'রঙ নির্বাচন করুন',
    'product.selectSize': 'সাইজ নির্বাচন করুন',
    'product.quantity': 'পরিমাণ',

    // Shop Page Filters
    'shop.title': 'সব পণ্য কালেকশন',
    'shop.desc': 'সেরা মানের হেডফোন, স্মার্ট গ্যাজেট, প্রিমিয়াম পোশাক এবং ট্রাভেল গিয়ার। হোম ডেলিভারিতে ক্যাশ অন ডেলিভারি সুবিধা।',
    'shop.sortBy': 'সাজান',
    'shop.featured': 'বিশেষ পছন্দের',
    'shop.priceLow': 'দাম: কম থেকে বেশি',
    'shop.priceHigh': 'দাম: বেশি থেকে কম',
    'shop.rating': 'সেরা রেটিং',
    'shop.discount': 'সর্বোচ্চ ছাড়',
    'shop.filter': 'ফিল্টার',
    'shop.inStockOnly': 'শুধুমাত্র স্টকে থাকা পণ্য',
    'shop.maxPrice': 'সর্বোচ্চ দাম',
    'shop.clearFilters': 'ফিল্টার মুছুন',
    'shop.showing': 'দেখাচ্ছে',
    'shop.products': 'টি পণ্য',

    // Cart & Checkout
    'cart.title': 'আপনার শপিং ব্যাগ',
    'cart.empty': 'আপনার শপিং ব্যাগ বর্তমানে খালি আছে',
    'cart.startShopping': 'কেনাকাটা শুরু করুন',
    'cart.summary': 'অর্ডারের বিবরণী',
    'cart.subtotal': 'সাবটোটাল',
    'cart.shipping': 'ডেলিভারি চার্জ',
    'cart.freeShipping': 'ফ্রি',
    'cart.freeDeliveryUnlocked': 'অভিনন্দন! আপনি ফ্রি ডেলিভারি অফার পেয়েছেন!',
    'cart.awayFromFreeDelivery': 'টাকা বাকি ফ্রি ডেলিভারির জন্য',
    'cart.discount': 'মূল্যছাড় / ডিসকাউন্ট',
    'cart.coupon': 'কুপন বা ডিসকাউন্ট কোড',
    'cart.applyCoupon': 'প্রয়োগ করুন',
    'cart.total': 'সর্বমোট মূল্য',
    'cart.checkout': 'চেকআউটে যান',
    'cart.remove': 'মুছুন',

    // Checkout
    'checkout.title': 'ক্যাশ অন ডেলিভারি চেকআউট',
    'checkout.customerInfo': 'গ্রাহকের নাম ও ডেলিভারি ঠিকানা',
    'checkout.fullName': 'আপনার পুরো নাম',
    'checkout.fullNamePlaceholder': 'যেমন: তানভীর আহমেদ',
    'checkout.phone': 'মোবাইল নম্বর',
    'checkout.phonePlaceholder': 'যেমন: ০১৭XXXXXXXX',
    'checkout.altPhone': 'বিকল্প মোবাইল নম্বর (যদি থাকে)',
    'checkout.email': 'ইমেইল বা জিমেইল (ঐচ্ছিক)',
    'checkout.address': 'সম্পূর্ণ ঠিকানা',
    'checkout.addressPlaceholder': 'বাসা নং, রোড নং, এলাকা/থানা, পোস্ট অফিস',
    'checkout.city': 'জেলা / শহর',
    'checkout.notes': 'ডেলিভারি সম্পর্কিত বিশেষ নির্দেশনা (ঐচ্ছিক)',
    'checkout.paymentMethod': 'পেমেন্ট মাধ্যম',
    'checkout.codLabel': 'ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে মূল্য পরিশোধ)',
    'checkout.placeOrder': 'অর্ডারটি কনফার্ম করুন',
    'checkout.safetyPromise': '১০০% নিরাপদ শপিং। পণ্য হাতে পেয়ে চেক করে তারপর ডেলিভারিম্যানকে টাকা দিন।',

    // Language Modal & Bar
    'lang.switchTitle': 'ভাষা ও আঞ্চলিক সেটিংস',
    'lang.bangla': 'বাংলা (Bangla)',
    'lang.english': 'English (ইংরেজি)',
    'lang.desc': 'আপনার পছন্দের ভাষা নির্বাচন করুন। বাংলাদেশের ক্রেতা এবং বিদেশি দর্শনার্থী উভয়ের সুবিধার জন্য উভয় ভাষাই উপলব্ধ।',
    'lang.changeSuccess': 'ভাষা সফলভাবে পরিবর্তন হয়েছে!',

    // Footer
    'footer.about': 'TKR Hub বাংলাদেশের একটি নির্ভরযোগ্য অনলাইন শপ যেখানে পাবেন আধুনিক গ্যাজেট, মানসম্মত পোশাক ও ট্রেন্ডি এক্সেসরিজ—সম্পূর্ণ ক্যাশ অন ডেলিভারি সুবিধায়।',
    'footer.quickLinks': 'প্রয়োজনীয় লিংক',
    'footer.support': 'কাস্টমার কেয়ার',
    'footer.contactUs': 'যোগাযোগের ঠিকানা',
    'footer.copyright': 'সর্বস্বত্ব সংরক্ষিত। বাংলাদেশের সকল ক্রেতাদের জন্য বিশ্বস্ত অনলাইন স্টোর।'
  }
};
