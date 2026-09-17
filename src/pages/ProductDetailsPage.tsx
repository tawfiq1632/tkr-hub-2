import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import { ProductCard } from '../components/ProductCard';
import { ProductReview } from '../types';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronRight,
  Share2,
  Package,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  MessageSquare
} from 'lucide-react';

export function ProductDetailsPage() {
  const { products, addToCart, toggleWishlist, isInWishlist, addToast, updateProduct } = useStore();
  const { currentRoute, navigate } = useRouter();
  const { isBangla, formatPrice, toBnDigits, t } = useLanguage();

  const productSlug = currentRoute.param || '';
  const product = products.find((p) => p.slug === productSlug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping' | 'reviews'>('desc');

  // New review state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Product Not Found</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          The product you are looking for does not exist or may have been moved.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-emerald-600 transition-colors"
        >
          <span>Return to Shop Catalog</span>
        </Link>
      </div>
    );
  }

  // Active color & size fallbacks
  const currentColor = selectedColor || (product.colors && product.colors[0]?.name);
  const currentSize = selectedSize || (product.sizes && product.sizes[0]);
  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, currentColor, currentSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, currentColor, currentSize);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard!', 'info');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: reviewerName.trim(),
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      title: reviewTitle.trim() || 'Verified Customer Review',
      comment: reviewComment.trim(),
      verified: true
    };

    const updatedReviews = [newRev, ...product.reviews];
    const newCount = updatedReviews.length;
    const newRating = Number(
      (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / newCount).toFixed(1)
    );

    updateProduct(product.id, {
      reviews: updatedReviews,
      reviewsCount: newCount,
      rating: newRating
    });

    setReviewSubmitted(true);
    addToast('Thank you! Your verified review has been published.', 'success');
  };

  // Related products in same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
        <Link to="/" className="hover:text-slate-900 transition-colors">
          {isBangla ? 'হোম' : 'Home'}
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <Link to="/shop" className="hover:text-slate-900 transition-colors">
          {isBangla ? 'শপ' : 'Shop'}
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <Link to={`/category/${product.category}`} className="hover:text-slate-900 transition-colors">
          {isBangla && product.categoryNameBn ? product.categoryNameBn : product.categoryName}
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-bold text-slate-900 line-clamp-1 max-w-xs">
          {isBangla && product.nameBn ? product.nameBn : product.name}
        </span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Col: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Selected Image */}
          <div className="relative aspect-square sm:aspect-4/3 w-full bg-slate-100 rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={isBangla && product.nameBn ? product.nameBn : product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-rose-600 text-white font-black text-xs rounded-lg shadow-md">
                {isBangla ? `${toBnDigits(product.discountPercentage)}% ছাড়` : `SAVE ${product.discountPercentage}%`}
              </span>
            )}
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-rose-600 flex items-center justify-center shadow-md transition-all cursor-pointer"
              aria-label="Add to wishlist"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border-2 shrink-0 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-emerald-600 shadow-md scale-105'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Details, Options, & Cash-on-Delivery Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                {isBangla && product.categoryNameBn ? product.categoryNameBn : (product.subcategory || product.categoryName)}
              </span>
              <button
                onClick={handleShare}
                className="text-slate-400 hover:text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                title="Share product"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{isBangla ? 'শেয়ার' : 'Share'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {isBangla && product.nameBn ? product.nameBn : product.name}
            </h1>

            {/* Ratings & reviews count */}
            <div className="flex items-center gap-3 text-xs pt-1">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{toBnDigits(product.rating)}</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-medium">
                {isBangla ? `${toBnDigits(product.reviewsCount)} টি কাস্টমার রিভিউ` : `${product.reviewsCount} customer reviews`}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isBangla ? '১০০% আসল পণ্য' : 'Verified Authentic'}</span>
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                {isBangla
                  ? 'সকল ট্যাক্স ও ভ্যাট অন্তর্ভুক্ত। পণ্য হাতে পেয়ে ক্যাশ পরিশোধ করুন।'
                  : 'All taxes included. Pay cash when package arrives.'}
              </span>
            </div>

            <div className="text-right">
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-lg inline-block ${
                  product.inStock
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {product.inStock
                  ? (isBangla ? `স্টকে আছে (${toBnDigits(product.stockCount)} টি)` : `In Stock (${product.stockCount} left)`)
                  : (isBangla ? 'স্টক শেষ' : 'Out of Stock')}
              </span>
            </div>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                {isBangla ? 'কালার/রং:' : 'Color:'}{' '}
                <span className="text-slate-900 font-extrabold">{currentColor}</span>
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => {
                  const isSelected = currentColor === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selector (Apparel) */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>
                  {isBangla ? 'সাইজ:' : 'Size:'} <span className="text-slate-900 font-extrabold">{currentSize}</span>
                </span>
                <span className="text-slate-400 font-normal">{isBangla ? 'রেগুলার ফিট' : 'Regular Fit'}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {product.sizes.map((size) => {
                  const isSelected = currentSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-10 rounded-xl font-bold text-xs flex items-center justify-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              {isBangla ? 'পরিমাণ' : 'Quantity'}
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-200 bg-white rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-slate-900">
                  {toBnDigits(quantity)}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-xs text-slate-500">
                {isBangla ? 'মোট:' : 'Total:'}{' '}
                <strong className="text-slate-900 font-bold">
                  {formatPrice(product.price * quantity)}
                </strong>
              </span>
            </div>
          </div>

          {/* Order Actions */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              id="buy-now-cod-button"
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="w-full py-3.5 px-6 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-slate-950 font-extrabold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Truck className="w-4 h-4" />
              <span>{isBangla ? 'ক্যাশ অন ডেলিভারিতে সরাসরি কিনুন' : 'Buy Now with Cash on Delivery (COD)'}</span>
            </button>

            <button
              type="button"
              id="add-to-cart-button"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isBangla ? 'শপিং কার্টে যুক্ত করুন' : 'Add to Shopping Cart'}</span>
            </button>
          </div>

          {/* Doorstep COD Guarantee Box */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
            <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>{isBangla ? 'হোম ডেলিভারি ও ক্যাশ অন ডেলিভারির নিশ্চয়তা:' : 'Doorstep Cash on Delivery Benefits:'}</span>
            </div>
            <ul className="space-y-1 text-xs text-emerald-900/90 pl-6 list-disc">
              <li>{isBangla ? 'ডেলিভারিম্যানের সামনে পার্সেল পরীক্ষা করে নগদ টাকা পরিশোধ করুন' : 'Inspect your parcel before paying cash to delivery rider'}</li>
              <li>{isBangla ? '৭ দিনের মধ্যে সহজ সাইজ বা পণ্য পরিবর্তনের সুবিধা' : 'Free doorstep size replacement within 7 days'}</li>
              <li>{isBangla && product.warrantyBn ? product.warrantyBn : (product.warranty || (isBangla ? '১০০% প্রস্তুতকারক অথেনটিক পণ্য' : '100% manufacturer verified authentic'))}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications, Description, Delivery Terms, Reviews */}
      <div className="pt-8 border-t border-slate-200 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('desc')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'desc'
                ? 'border-emerald-600 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {isBangla ? 'পণ্যের বিবরণ' : 'Product Overview'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'specs'
                ? 'border-emerald-600 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {isBangla ? 'টেকনিক্যাল স্পেসিফিকেশন' : 'Technical Specifications'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'shipping'
                ? 'border-emerald-600 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {isBangla ? 'ডেলিভারি ও ক্যাশ অন ডেলিভারি নিয়ম' : 'Delivery & COD Terms'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-emerald-600 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{isBangla ? 'কাস্টমার রিভিউ' : 'Customer Reviews'}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
              {toBnDigits(product.reviews.length)}
            </span>
          </button>
        </div>

        {/* Tab 1: Description & Key Highlights */}
        {activeTab === 'desc' && (
          <div className="space-y-6 max-w-4xl">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {isBangla && product.descriptionBn ? product.descriptionBn : product.description}
            </p>

            {((isBangla && product.featuresBn && product.featuresBn.length > 0) || (product.features && product.features.length > 0)) && (
              <div className="space-y-3 pt-4">
                <h4 className="font-bold text-slate-900 text-sm">
                  {isBangla ? 'বিশেষ বৈশিষ্ট্যসমূহ (Key Features)' : 'Key Features & Highlights'}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(isBangla && product.featuresBn ? product.featuresBn : product.features).map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 font-medium"
                    >
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Specs Table */}
        {activeTab === 'specs' && (
          <div className="max-w-3xl">
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-xs">
                <tbody>
                  {Object.entries(product.specs).map(([key, value], idx) => (
                    <tr
                      key={key}
                      className={`border-b border-slate-100 last:border-0 ${
                        idx % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'
                      }`}
                    >
                      <td className="py-3 px-4 font-bold text-slate-700 w-1/3 border-r border-slate-100">
                        {key}
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Delivery Policy */}
        {activeTab === 'shipping' && (
          <div className="max-w-3xl space-y-4 text-xs text-slate-700">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h4 className="font-bold text-sm text-slate-900">
                {isBangla ? 'হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি (COD)' : 'Doorstep Cash on Delivery (COD)'}
              </h4>
              <p className="leading-relaxed">
                {isBangla
                  ? 'চেকআউটে ক্যাশ অন ডেলিভারি নির্বাচন করার পর আমাদের কুরিয়ার টিম আপনার ঠিকানায় পার্সেল পৌঁছে দেবে। পার্সেলের সিল পরীক্ষা করে রাইডারের কাছে নগদ টাকা হস্তান্তর করুন।'
                  : 'When you choose Cash on Delivery at checkout, our courier partner will deliver the package to your requested address. You are welcome to inspect the outer packaging and ensure tamper seals are intact before paying the courier in cash.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h4 className="font-bold text-sm text-slate-900">
                {isBangla ? 'ডেলিভারির আনুমানিক সময়' : 'Estimated Dispatch & Delivery Time'}
              </h4>
              <p className="leading-relaxed">
                {isBangla
                  ? 'অর্ডার প্লেস করার ২-৪ ঘণ্টার মধ্যে যাচাই করা হয়। ঢাকা শহরের ভেতরে ২৪-৪৮ ঘণ্টার মধ্যে এবং সারা বাংলাদেশের যেকোনো জেলায় ২-৩ কার্যদিবসের মধ্যে ডেলিভারি সম্পন্ন হয়।'
                  : 'Orders are processed and verified within 2 to 4 business hours. Inside central metropolitan hubs: delivered in 24-48 hours. Regional nationwide delivery: 2-3 business days.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h4 className="font-bold text-sm text-slate-900">
                {isBangla ? '৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি' : '7-Day Replacement Guarantee'}
              </h4>
              <p className="leading-relaxed">
                {isBangla
                  ? 'সাইজ বা কোনো ত্রুটি থাকলে আমাদের কাস্টমার সাপোর্ট টিমে যোগাযোগ করলে বিনামূল্যে দ্রুত রিপ্লেসমেন্ট প্রদান করা হয়।'
                  : 'If the item does not fit or arrives with any factory defect, our dedicated customer support team will send an exchange rider directly to your address.'}
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Reviews & Review Submission */}
        {activeTab === 'reviews' && (
          <div className="space-y-8 max-w-4xl">
            {/* Review summary */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-3xl font-black text-slate-900">{toBnDigits(product.rating)}</span>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(product.rating) ? 'fill-current' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  {isBangla
                    ? `${toBnDigits(product.reviews.length)} জন কাস্টমারের রিভিউয়ের ভিত্তিতে`
                    : `Based on ${product.reviews.length} customer feedback entries`}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const formEl = document.getElementById('add-review-form');
                  formEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-colors shrink-0 cursor-pointer"
              >
                {isBangla ? 'রিভিউ লিখুন' : 'Write a Review'}
              </button>
            </div>

            {/* Existing reviews */}
            <div className="space-y-4">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs">{rev.author}</span>
                      {rev.verified && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" />
                          <span>{isBangla ? 'ভেরিফাইড পারচেজ (ক্যাশ অন ডেলিভারি)' : 'Verified Purchase (COD)'}</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-current' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  <h5 className="font-bold text-xs text-slate-900">{rev.title}</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Review form */}
            <div id="add-review-form" className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h4 className="font-bold text-sm text-slate-900">
                {isBangla ? 'আপনার মতামত বা রিভিউ দিন' : 'Share Your Experience'}
              </h4>
              {reviewSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>
                    {isBangla
                      ? 'ধন্যবাদ! আপনার ভেরিফাইড রিভিউ সফলভাবে জমা দেওয়া হয়েছে।'
                      : 'Thank you! Your verified review has been submitted and published.'}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        {isBangla ? 'আপনার নাম' : 'Your Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder={isBangla ? 'যেমন: সাকিব আহমেদ' : 'e.g. Shakib Ahmed'}
                        className="w-full bg-white text-xs text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        {isBangla ? 'রেটিং' : 'Rating'}
                      </label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full bg-white text-xs text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                      >
                        <option value={5}>★★★★★ ({isBangla ? '৫ - অসাধারণ' : '5 out of 5 Stars - Excellent'})</option>
                        <option value={4}>★★★★☆ ({isBangla ? '৪ - ভালো' : '4 out of 5 Stars - Good'})</option>
                        <option value={3}>★★★☆☆ ({isBangla ? '৩ - মোটামুটি' : '3 out of 5 Stars - Average'})</option>
                        <option value={2}>★★☆☆☆ ({isBangla ? '২ - খারাপ' : '2 out of 5 Stars - Poor'})</option>
                        <option value={1}>★☆☆☆☆ ({isBangla ? '১ - খুব খারাপ' : '1 out of 5 Stars - Terrible'})</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isBangla ? 'রিভিউ শিরোনাম' : 'Review Title'}
                    </label>
                    <input
                      type="text"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder={isBangla ? 'যেমন: চমৎকার সাউন্ড এবং দ্রুত ক্যাশ অন ডেলিভারি পেলাম' : 'e.g. Excellent sound & arrived fast with COD'}
                      className="w-full bg-white text-xs text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isBangla ? 'আপনার বিস্তারিত অভিজ্ঞতা' : 'Your Feedback'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder={isBangla ? 'পণ্যটির গুণমান, ডেলিভারি অভিজ্ঞতা ইত্যাদি সম্পর্কে লিখুন...' : 'Describe what you liked about the product, delivery experience, etc.'}
                      className="w-full bg-white text-xs text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    {isBangla ? 'রিভিউ সাবমিট করুন' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">
              {isBangla
                ? `${product.categoryNameBn || product.categoryName} ক্যাটাগরির অন্যান্য পণ্য`
                : `Similar in ${product.categoryName}`}
            </h3>
            <Link
              to={`/category/${product.category}`}
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              {isBangla ? 'আরও দেখুন' : 'View More'}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
