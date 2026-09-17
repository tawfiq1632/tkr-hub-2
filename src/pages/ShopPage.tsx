import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { matchesProductSearch } from '../utils/searchHelper';
import { useRouter, Link } from '../context/RouterContext';
import { ProductCard } from '../components/ProductCard';
import { Product, CategorySlug } from '../types';
import {
  Filter,
  SlidersHorizontal,
  Search,
  ArrowUpDown,
  Check,
  X,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export function ShopPage() {
  const { products } = useStore();
  const { currentRoute, navigate } = useRouter();
  const { isBangla, formatPrice, toBnDigits, t } = useLanguage();

  // URL search query param
  const initialSearch = currentRoute.searchParams.get('search') || '';
  const initialCategory = (currentRoute.searchParams.get('category') as CategorySlug) || 'all';
  const initialSort = currentRoute.searchParams.get('sort') || 'featured';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug>(initialCategory);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [maxPrice, setMaxPrice] = useState<number>(250);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if URL changes
  useEffect(() => {
    const q = currentRoute.searchParams.get('search') || '';
    const c = (currentRoute.searchParams.get('category') as CategorySlug) || 'all';
    const s = currentRoute.searchParams.get('sort') || 'featured';
    setSearchQuery(q);
    setSelectedCategory(c);
    setSortBy(s);
  }, [currentRoute]);

  const categoriesList: { slug: CategorySlug; name: string; count: number }[] = [
    {
      slug: 'all',
      name: isBangla ? 'সকল ক্যাটাগরি' : 'All Categories',
      count: products.length
    },
    {
      slug: 'gadgets',
      name: isBangla ? 'গ্যাজেট ও টেকনোলজি' : 'Gadgets & Tech',
      count: products.filter((p) => p.category === 'gadgets').length
    },
    {
      slug: 'clothing',
      name: isBangla ? 'পোশাক ও ফ্যাশন' : 'Apparel & Streetwear',
      count: products.filter((p) => p.category === 'clothing').length
    },
    {
      slug: 'accessories',
      name: isBangla ? 'এক্সেসরিজ ও গিয়ার' : 'Accessories',
      count: products.filter((p) => p.category === 'accessories').length
    }
  ];

  // Filtering & sorting logic with full bilingual search support
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

        // Search query filter (matches English + Bangla + synonyms like হেডফোন -> headphones)
        if (searchQuery.trim() && !matchesProductSearch(p, searchQuery)) {
          return false;
        }

        // Price filter
        if (p.price > maxPrice) return false;

        // Stock filter
        if (onlyInStock && !p.inStock) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
        // Default: featured / priority
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, maxPrice, onlyInStock, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setMaxPrice(250);
    setOnlyInStock(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery !== '' || selectedCategory !== 'all' || maxPrice < 250 || onlyInStock;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            {isBangla ? 'ক্যাটালগ ও কালেকশন' : 'Catalog & Collections'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            {isBangla ? 'TKR হাবের সকল প্রিমিয়াম পণ্য' : 'Shop All TKR Hub Products'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {isBangla
              ? 'ওয়্যারলেস অডিও, স্মার্ট ঘড়ি, টেক গ্যাজেট, ব্যাগ ও ট্রেন্ডি পোশাক — সারা বাংলাদেশে নিরাপদ ক্যাশ অন ডেলিভারি (COD) সুবিধায় অর্ডার করুন।'
              : 'Explore premium wireless audio, smart tech, tactical outerwear, and everyday gear with Cash-on-Delivery payment across the country.'}
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
        {/* Search Input in Shop */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBangla ? 'পণ্য, ফিচার বা নাম দিয়ে খুঁজুন (যেমন: হেডফোন, ঘড়ি)...' : 'Filter by product name, feature, or keyword...'}
            className="w-full bg-slate-100 text-slate-900 text-sm rounded-xl pl-9 pr-8 py-2.5 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-800 font-semibold text-xs rounded-xl border border-slate-200 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{isBangla ? 'ফিল্টার' : 'Filters'} {hasActiveFilters && `(${isBangla ? 'সক্রিয়' : 'Active'})`}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 hidden sm:inline">
              {isBangla ? 'সর্ট:' : 'Sort:'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2.5 border border-slate-200 focus:border-emerald-500 outline-none cursor-pointer"
            >
              <option value="featured">{isBangla ? 'ফিচার্ড ও প্রস্তাবিত' : 'Featured & Recommended'}</option>
              <option value="price-low">{isBangla ? 'দাম: কম থেকে বেশি' : 'Price: Low to High'}</option>
              <option value="price-high">{isBangla ? 'দাম: বেশি থেকে কম' : 'Price: High to Low'}</option>
              <option value="rating">{isBangla ? 'সর্বোচ্চ গ্রাহক রেটিং' : 'Highest Customer Rating'}</option>
              <option value="discount">{isBangla ? 'সর্বোচ্চ ছাড়ের শতকরা হার' : 'Biggest Discount %'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                <span>{isBangla ? 'ফিল্টারসমূহ' : 'Filters'}</span>
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[11px] font-semibold text-rose-600 hover:underline cursor-pointer"
                >
                  {isBangla ? 'রিসেট করুন' : 'Reset All'}
                </button>
              )}
            </div>

            {/* Category Selector */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isBangla ? 'ক্যাটাগরি' : 'Department'}
              </h4>
              <div className="space-y-1">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      selectedCategory === cat.slug
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        selectedCategory === cat.slug ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {toBnDigits(cat.count)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>{isBangla ? 'সর্বোচ্চ মূল্য' : 'Max Price'}</span>
                <span className="text-emerald-600 font-extrabold">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="20"
                max="250"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{formatPrice(20)}</span>
                <span>{formatPrice(250)}</span>
              </div>
            </div>

            {/* In Stock Only Toggle */}
            <div className="pt-4 border-t border-slate-100">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 rounded border-slate-300 accent-emerald-600"
                />
                <span>{isBangla ? 'শুধুমাত্র স্টকে থাকা পণ্য' : 'In Stock items only'}</span>
              </label>
            </div>

            {/* Cash on Delivery Notice */}
            <div className="pt-4 border-t border-slate-100">
              <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200/60 text-emerald-950 text-xs space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{isBangla ? '১০০% ক্যাশ অন ডেলিভারি' : '100% Cash on Delivery'}</span>
                </p>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  {isBangla
                    ? 'আমাদের স্টোরের প্রতিটি পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা আছে।'
                    : 'Every product in our store is eligible for payment upon delivery.'}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Filter Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end lg:hidden">
            <div className="bg-white w-full max-w-xs h-full p-6 space-y-6 overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-bold text-slate-900 text-base">
                  {isBangla ? 'ক্যাটালগ ফিল্টার' : 'Filter Catalog'}
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-400">
                  {isBangla ? 'ক্যাটাগরি' : 'Department'}
                </h4>
                {categoriesList.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                      selectedCategory === cat.slug ? 'bg-slate-900 text-white' : 'text-slate-700 bg-slate-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span>{toBnDigits(cat.count)}</span>
                  </button>
                ))}
              </div>

              {/* Mobile Price */}
              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>{isBangla ? 'সর্বোচ্চ মূল্য:' : 'Max Price:'}</span>
                  <span className="text-emerald-600">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="250"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              {/* In stock */}
              <div className="pt-4 border-t">
                <label className="flex items-center gap-2 text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="accent-emerald-600"
                  />
                  <span>{isBangla ? 'শুধুমাত্র স্টকে থাকা পণ্য' : 'In Stock Only'}</span>
                </label>
              </div>

              <div className="pt-6 space-y-2">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  {isBangla
                    ? `ফিল্টার প্রয়োগ করুন (${toBnDigits(filteredProducts.length)} টি পণ্য)`
                    : `Apply Filters (${filteredProducts.length} results)`}
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                  >
                    {isBangla ? 'সব রিসেট করুন' : 'Clear All'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <main className="lg:col-span-9 space-y-6">
          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">
                {isBangla ? 'সক্রিয় ফিল্টার:' : 'Active filters:'}
              </span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-200 text-slate-800 font-semibold">
                  <span>{isBangla ? 'ক্যাটাগরি' : 'Category'}: {selectedCategory}</span>
                  <button onClick={() => setSelectedCategory('all')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-200 text-slate-800 font-semibold">
                  <span>{isBangla ? 'অনুসন্ধান' : 'Query'}: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {maxPrice < 250 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-200 text-slate-800 font-semibold">
                  <span>{isBangla ? `${formatPrice(maxPrice)}-এর মধ্যে` : `Under ${formatPrice(maxPrice)}`}</span>
                  <button onClick={() => setMaxPrice(250)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {onlyInStock && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-200 text-slate-800 font-semibold">
                  <span>{isBangla ? 'স্টকে আছে' : 'In Stock'}</span>
                  <button onClick={() => setOnlyInStock(false)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-emerald-600 hover:underline font-bold ml-1 cursor-pointer"
              >
                {isBangla ? 'সব মুছুন' : 'Clear all'}
              </button>
            </div>
          )}

          {/* Results Count */}
          <div className="text-xs text-slate-500 font-medium">
            {isBangla ? (
              <>মোট <strong className="text-slate-900">{toBnDigits(filteredProducts.length)}</strong> টি পণ্য পাওয়া গেছে</>
            ) : (
              <>Showing <strong className="text-slate-900">{filteredProducts.length}</strong> products</>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {isBangla ? 'কোনো পণ্য পাওয়া যায়নি' : 'No matching products found'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {isBangla
                  ? `"${searchQuery}" এর জন্য কোনো পণ্য মেলেনি। দয়া করে "হেডফোন", "স্মার্টওয়াচ", "টি-শার্ট", বা "ব্যাগ" লিখে চেষ্টা করুন।`
                  : `We couldn't find any products matching your current filters or search term. Try searching "headphones", "smartwatch", or "backpack".`}
              </p>
              <button
                onClick={clearFilters}
                className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                {isBangla ? 'সব ফিল্টার রিসেট করুন' : 'Reset All Filters'}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
