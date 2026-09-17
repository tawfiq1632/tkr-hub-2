import { Product } from '../types';

// Map of Bangla & phonetic keywords to related English & Bangla search terms
export const BANGLA_SYNONYM_MAP: Record<string, string[]> = {
  // Headphones & Audio
  'হেডফোন': ['headphone', 'headphones', 'soundpulse', 'audio', 'earbuds', 'anc', 'wireless', 'ইয়ারফোন', 'ইয়ারফোন'],
  'হেড ফোন': ['headphone', 'headphones', 'soundpulse', 'audio', 'earbuds', 'anc'],
  'ইয়ারফোন': ['headphone', 'earphone', 'earbuds', 'audio', 'soundpulse'],
  'ইয়ারফোন': ['headphone', 'earphone', 'earbuds', 'audio', 'soundpulse'],
  'ইয়ারবাডস': ['earbuds', 'headphone', 'audio', 'soundpulse'],
  'ইয়ারবাডস': ['earbuds', 'headphone', 'audio', 'soundpulse'],
  'হেডসেট': ['headphone', 'headset', 'audio', 'mic'],
  'অডিও': ['audio', 'sound', 'headphone', 'mic', 'streamwave'],
  'গান': ['audio', 'music', 'soundpulse', 'headphone'],
  'সাউন্ড': ['sound', 'soundpulse', 'audio', 'headphone'],
  'মাইক্রোফোন': ['microphone', 'mic', 'streamwave', 'studio'],
  'মাইক': ['mic', 'microphone', 'streamwave'],

  // Watches & Smartwatches
  'স্মার্টওয়াচ': ['smartwatch', 'watch', 'chronofit', 'amoled', 'fitness', 'ঘড়ি', 'ঘড়ি'],
  'স্মার্ট ওয়াচ': ['smartwatch', 'watch', 'chronofit', 'amoled'],
  'স্মার্টওয়াচ': ['smartwatch', 'watch', 'chronofit', 'amoled'],
  'ঘড়ি': ['watch', 'smartwatch', 'chronofit', 'amoled'],
  'ঘড়ি': ['watch', 'smartwatch', 'chronofit', 'amoled'],
  'হাতঘড়ি': ['watch', 'smartwatch'],
  'হাত ঘড়ি': ['watch', 'smartwatch'],

  // Chargers & Power
  'পাওয়ার ব্যাংক': ['power bank', 'magpower', 'charger', 'battery'],
  'পাওয়ার ব্যাংক': ['power bank', 'magpower', 'charger', 'battery'],
  'পাওয়ারব্যাংক': ['power bank', 'magpower', 'charger'],
  'চার্জার': ['charger', 'power bank', 'fast charge', 'magpower'],
  'ব্যাটারি': ['battery', 'power bank', 'charge'],

  // Computers & Peripherals
  'কিবোর্ড': ['keyboard', 'mechanical', 'rgb', 'switch'],
  'কীবোর্ড': ['keyboard', 'mechanical'],
  'মাউস': ['mouse', 'wireless mouse', 'gaming mouse'],
  'মাউস প্যাড': ['mouse pad', 'desk mat'],

  // Apparel & Clothing
  'টি-শার্ট': ['t-shirt', 'tee', 'heavyweight', 'cotton', 'shirt', 'clothing'],
  'টি শার্ট': ['t-shirt', 'tee', 'heavyweight', 'cotton', 'shirt'],
  'টিশার্ট': ['t-shirt', 'tee', 'shirt', 'clothing'],
  'শার্ট': ['shirt', 't-shirt', 'tee', 'apparel'],
  'পোশাক': ['clothing', 'apparel', 't-shirt', 'hoodie', 'pants'],
  'গেঞ্জি': ['t-shirt', 'tee', 'cotton'],
  'জামা': ['clothing', 't-shirt', 'apparel'],
  'হুডি': ['hoodie', 'fleece', 'sweater', 'jacket'],
  'হুডী': ['hoodie', 'fleece', 'jacket'],
  'জ্যাকেট': ['jacket', 'windbreaker', 'outerwear', 'tactical'],
  'সোয়েটার': ['sweater', 'hoodie', 'fleece'],
  'প্যান্ট': ['pants', 'cargo', 'joggers', 'trouser'],
  'কার্গো': ['cargo', 'pants', 'tactical'],

  // Accessories & Gear
  'ব্যাগ': ['bag', 'backpack', 'commuter', 'pack'],
  'ব্যাকপ্যাক': ['backpack', 'bag', 'commuter', 'waterproof'],
  'ব্যাগপ্যাক': ['backpack', 'bag', 'commuter'],
  'স্কুল ব্যাগ': ['backpack', 'bag'],
  'মানিব্যাগ': ['wallet', 'rfid', 'leather', 'cardholder'],
  'ওয়ালেট': ['wallet', 'rfid', 'cardholder'],
  'ওয়ালেট': ['wallet', 'rfid', 'cardholder'],
  'চশমা': ['sunglasses', 'glasses', 'eyewear', 'optical'],
  'সানগ্লাস': ['sunglasses', 'shades', 'polarized', 'eyewear'],
  'বোতল': ['bottle', 'flask', 'insulated', 'water'],
  'ফ্লাস্ক': ['flask', 'bottle', 'thermal'],
  'ড্রোন': ['drone', 'camera', 'quadcopter']
};

/**
 * Normalizes text for comparison (lowercased, trimmed, collapsed whitespace)
 */
export function normalizeText(text: string): string {
  return (text || '')
    .toLowerCase()
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // remove zero-width characters
    .replace(/[।.,/#!$%^&*;:{}=\-_`~()]/g, ' ') // replace punctuation with space
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks if a product matches the search query across English, Bangla, and synonyms
 */
export function matchesProductSearch(product: Product, rawQuery: string): boolean {
  if (!rawQuery || !rawQuery.trim()) return true;

  const query = normalizeText(rawQuery);
  if (!query) return true;

  // 1. Direct match on standard English fields
  const nameEn = normalizeText(product.name);
  const catEn = normalizeText(product.categoryName);
  const subcatEn = normalizeText(product.subcategory);
  const descEn = normalizeText(product.description || '');
  const shortDescEn = normalizeText(product.shortDescription || '');
  const badgeEn = normalizeText(product.badge || '');

  if (
    nameEn.includes(query) ||
    catEn.includes(query) ||
    subcatEn.includes(query) ||
    descEn.includes(query) ||
    shortDescEn.includes(query) ||
    badgeEn.includes(query)
  ) {
    return true;
  }

  // 2. Direct match on Bangla fields
  const nameBn = normalizeText(product.nameBn || '');
  const catBn = normalizeText(product.categoryNameBn || '');
  const subcatBn = normalizeText(product.subcategoryBn || '');
  const descBn = normalizeText(product.descriptionBn || '');
  const shortDescBn = normalizeText(product.shortDescriptionBn || '');
  const badgeBn = normalizeText(product.badgeBn || '');
  const keywordsBn = (product.keywordsBn || []).map(normalizeText);

  if (
    nameBn.includes(query) ||
    catBn.includes(query) ||
    subcatBn.includes(query) ||
    descBn.includes(query) ||
    shortDescBn.includes(query) ||
    badgeBn.includes(query) ||
    keywordsBn.some((k) => k.includes(query) || query.includes(k))
  ) {
    return true;
  }

  // 3. Synonym expansions for Bangla query terms
  // Check if query or any word in query matches our synonym map
  const queryWords = query.split(' ');
  for (const word of queryWords) {
    if (!word) continue;

    // Direct check in synonym map
    const mappedTerms = BANGLA_SYNONYM_MAP[word];
    if (mappedTerms && mappedTerms.length > 0) {
      for (const term of mappedTerms) {
        const normTerm = normalizeText(term);
        if (
          nameEn.includes(normTerm) ||
          catEn.includes(normTerm) ||
          subcatEn.includes(normTerm) ||
          descEn.includes(normTerm) ||
          nameBn.includes(normTerm)
        ) {
          return true;
        }
      }
    }
  }

  // Check whole phrase in synonym map (e.g. 'হেড ফোন', 'টি শার্ট', 'পাওয়ার ব্যাংক')
  const phraseTerms = BANGLA_SYNONYM_MAP[query];
  if (phraseTerms && phraseTerms.length > 0) {
    for (const term of phraseTerms) {
      const normTerm = normalizeText(term);
      if (
        nameEn.includes(normTerm) ||
        catEn.includes(normTerm) ||
        subcatEn.includes(normTerm) ||
        descEn.includes(normTerm) ||
        nameBn.includes(normTerm)
      ) {
        return true;
      }
    }
  }

  // 4. Reverse check: if product has Bangla keywords, does any keyword match the synonym of query?
  if (product.keywordsBn) {
    for (const kw of product.keywordsBn) {
      const normKw = normalizeText(kw);
      if (normKw.includes(query) || query.includes(normKw)) {
        return true;
      }
    }
  }

  return false;
}
