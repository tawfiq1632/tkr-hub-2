import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/initialProducts';
import { CategorySlug } from '../types';
import { ArrowLeft, Sparkles, SlidersHorizontal, Truck, ShieldCheck } from 'lucide-react';

export function CategoryPage() {
  const { products } = useStore();
  const { isBangla, toBnDigits } = useLanguage();
  const { currentRoute, navigate } = useRouter();
  const categorySlug = (currentRoute.param as CategorySlug) || 'gadgets';

  const categoryMeta = CATEGORIES.find((c) => c.slug === categorySlug) || {
    slug: categorySlug,
    name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
    tagline: 'Premium Selection',
    description: 'Explore high performance, authentic products curated for quality and durability.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    itemCount: 0,
    featuredSubcategories: []
  };

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Filter products by category
  const categoryProducts = products.filter((p) => p.category === categorySlug);

  // Subcategories list
  const availableSubcategories = Array.from(
    new Set(categoryProducts.map((p) => p.subcategory).filter(Boolean))
  );

  const displayedProducts = categoryProducts
    .filter((p) => {
      if (selectedSubcategory !== 'all' && p.subcategory !== selectedSubcategory) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });

  const getCategoryTitle = (name: string, slug: string) => {
    if (!isBangla) return name;
    switch (slug) {
      case 'gadgets':
        return 'স্মার্ট গ্যাজেটস ও ডিভাইস';
      case 'audio':
        return 'অডিও ও সাউন্ড সিস্টেম';
      case 'charging':
        return 'চার্জার ও পাওয়ার সলিউশন';
      case 'accessories':
        return 'মোবাইল ও ল্যাপটপ এক্সেসরিজ';
      default:
        return name;
    }
  };

  const getCategoryTagline = (tagline: string, slug: string) => {
    if (!isBangla) return tagline;
    switch (slug) {
      case 'gadgets':
        return 'অত্যাধুনিক স্মার্ট প্রযুক্তি';
      case 'audio':
        return 'সেরা সাউন্ড কোয়ালিটি ও বেস';
      case 'charging':
        return 'ফাস্ট চার্জিং ও পাওয়ার ব্যাংক';
      case 'accessories':
        return 'প্রিমিয়াম কোয়ালিটি এক্সেসরিজ';
      default:
        return 'প্রিমিয়াম সিলেকশন';
    }
  };

  const categoryDisplayName = getCategoryTitle(categoryMeta.name, categoryMeta.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-900 transition-colors">
          {isBangla ? 'হোম' : 'Home'}
        </Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-slate-900 transition-colors">
          {isBangla ? 'ক্যাটাগরি' : 'Categories'}
        </Link>
        <span>/</span>
        <span className="font-bold text-slate-900 capitalize">{categoryDisplayName}</span>
      </nav>

      {/* Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[320px] flex flex-col justify-end p-6 sm:p-12 text-white border border-slate-800 shadow-xl">
        <img
          src={categoryMeta.image}
          alt={categoryDisplayName}
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{getCategoryTagline(categoryMeta.tagline, categoryMeta.slug)}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">{categoryDisplayName}</h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            {isBangla
              ? '১০০% অরিজিনাল ও অফিসিয়াল ওয়ারেন্টিযুক্ত প্রযুক্তি পণ্য সারাদেশে ক্যাশ অন ডেলিভারিতে সংগ্রহ করুন।'
              : categoryMeta.description}
          </p>

          <div className="flex items-center gap-6 pt-2 text-xs text-emerald-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>{isBangla ? 'ক্যাশ অন ডেলিভারি সুবিধা' : 'Cash-on-Delivery Available'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isBangla ? 'অফিসিয়াল ব্র্যান্ড ওয়ারেন্টি' : 'Official Warranty'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Subcategory Pills & Sorting Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => setSelectedSubcategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedSubcategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isBangla
              ? `সকল ${categoryDisplayName} (${toBnDigits(categoryProducts.length)})`
              : `All ${categoryMeta.name} (${categoryProducts.length})`}
          </button>
          {availableSubcategories.map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => setSelectedSubcategory(sub)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedSubcategory === sub
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-slate-500">
            {isBangla ? 'সর্ট করুন:' : 'Sort By:'}
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 border border-slate-200 focus:border-emerald-500 outline-none cursor-pointer"
          >
            <option value="featured">{isBangla ? 'বাছাইকৃত সেরা' : 'Featured Picks'}</option>
            <option value="price-low">{isBangla ? 'দাম: কম থেকে বেশি' : 'Price: Low to High'}</option>
            <option value="price-high">{isBangla ? 'দাম: বেশি থেকে কম' : 'Price: High to Low'}</option>
            <option value="rating">{isBangla ? 'সর্বোচ্চ রেটিং' : 'Top Rated'}</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            {isBangla ? 'এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি' : 'No products found in this category'}
          </h3>
          <p className="text-xs text-slate-500">
            {isBangla
              ? 'আমাদের অন্যান্য ক্যাটাগরি ঘুরে দেখুন অথবা সমস্ত পণ্য ব্রাউজ করুন।'
              : 'Check out our other departments or browse our full online store.'}
          </p>
          <Link
            to="/shop"
            className="inline-block px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-emerald-600 transition-colors"
          >
            {isBangla ? 'সকল পণ্য দেখুন' : 'Explore All Departments'}
          </Link>
        </div>
      )}
    </div>
  );
}

