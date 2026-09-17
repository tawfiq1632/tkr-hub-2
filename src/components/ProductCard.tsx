import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import { Star, ShoppingBag, Heart, Check, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const { isBangla, formatPrice, toBnDigits, t } = useLanguage();
  const { navigate } = useRouter();

  const isFavorite = isInWishlist(product.id);

  const displayName = isBangla && product.nameBn ? product.nameBn : product.name;
  const displayCategory = isBangla && product.categoryNameBn ? product.categoryNameBn : product.categoryName;
  const displayBadge = isBangla && product.badgeBn ? product.badgeBn : product.badge;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.colors?.[0]?.name, product.sizes?.[0]);
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={displayName}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start pointer-events-none">
          {displayBadge && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide bg-slate-900 text-white shadow-sm">
              {displayBadge}
            </span>
          )}
          {product.discountPercentage > 0 && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide bg-rose-500 text-white shadow-sm">
              -{toBnDigits(product.discountPercentage)}% {isBangla ? 'ছাড়' : 'OFF'}
            </span>
          )}
        </div>

        {/* Floating Wishlist Button */}
        <button
          type="button"
          onClick={handleFavoriteToggle}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorite
              ? 'bg-rose-50 text-rose-600 shadow-md scale-105'
              : 'bg-white/90 text-slate-600 hover:text-rose-600 hover:bg-white shadow-xs'
          }`}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-rose-500' : ''}`} />
        </button>

        {/* Quick View Button on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <button
            type="button"
            onClick={() => navigate(`/product/${product.slug}`)}
            className="w-full py-2 bg-white/95 hover:bg-white text-slate-800 text-xs font-semibold rounded-xl shadow-md backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isBangla ? 'একনজরে দেখুন' : 'Quick View'}</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Subcategory */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-medium text-slate-500">{displayCategory}</span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-slate-700 text-xs">{toBnDigits(product.rating)}</span>
              <span className="text-slate-400 text-[11px]">({toBnDigits(product.reviewsCount)})</span>
            </div>
          </div>

          {/* Title */}
          <Link
            to={`/product/${product.slug}`}
            className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug"
            title={displayName}
          >
            {displayName}
          </Link>

          {/* Color Preview Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.colors.map((c) => (
                <span
                  key={c.name}
                  className="w-3 h-3 rounded-full border border-slate-300 shadow-xs"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              <span className="text-[11px] text-slate-400 ml-1">
                {toBnDigits(product.colors.length)} {isBangla ? 'টি কালার' : (product.colors.length === 1 ? 'color' : 'colors')}
              </span>
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="pt-3.5 mt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-slate-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
              {isBangla ? 'ক্যাশ অন ডেলিভারি (COD)' : 'Cash on Delivery (COD)'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              product.inStock
                ? 'bg-slate-900 hover:bg-emerald-600 text-white active:scale-95 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
            title={product.inStock ? t('product.addToCart') : t('product.outOfStock')}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">
              {product.inStock ? (isBangla ? 'অর্ডার' : 'Add') : (isBangla ? 'স্টক শেষ' : 'Sold Out')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
