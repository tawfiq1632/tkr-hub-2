import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import { EditPencilButton } from '../components/EditPencilButton';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  ShieldCheck,
  Tag,
  ArrowLeft,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export function CartPage() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    shippingCost,
    freeShippingThreshold,
    appliedPromo,
    applyPromo,
    removePromo,
    discountAmount,
    finalTotal
  } = useStore();

  const { isBangla, formatPrice, toBnDigits, t } = useLanguage();
  const { navigate } = useRouter();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const res = applyPromo(promoInput.trim());
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {t('cart_empty_title')}
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            {t('cart_empty_desc')}
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all shadow-md"
        >
          <span>{t('cart_start_shopping')}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('cart_page_title')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('cart_page_desc')}
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline self-start sm:self-auto cursor-pointer"
        >
          {t('cart_clear_all')}
        </button>
      </div>

      {/* Free Shipping Progress Bar */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-emerald-950 flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-emerald-600" />
            {amountToFreeShipping === 0 ? (
              <span>
                {isBangla ? (
                  <>অভিনন্দন! আপনি <strong>ফ্রি হোম ডেলিভারি</strong> পাচ্ছেন!</>
                ) : (
                  <>Congratulations! You qualify for <strong>FREE Delivery</strong>!</>
                )}
              </span>
            ) : (
              <span>
                {isBangla ? (
                  <>ফ্রি ডেলিভারি পেতে আর মাত্র <strong>{formatPrice(amountToFreeShipping)}</strong> টাকার পণ্য যোগ করুন!</>
                ) : (
                  <>Add <strong>{formatPrice(amountToFreeShipping)}</strong> more to get Free Delivery!</>
                )}
              </span>
            )}
          </span>
          <span className="text-emerald-800 font-extrabold">
            {isBangla ? `${toBnDigits(freeShippingProgress.toFixed(0))}%` : `${freeShippingProgress.toFixed(0)}%`}
          </span>
        </div>

        <div className="w-full bg-emerald-200/70 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Cart Content: Item List + Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
            {cart.map((item, index) => (
              <div key={`${item.productId}-${item.selectedColor}-${item.selectedSize}-${index}`} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Thumbnail */}
                <Link to={`/product/${item.product.slug}`} className="shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={isBangla && item.product.nameBn ? item.product.nameBn : item.product.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-slate-100 border border-slate-200"
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="font-bold text-sm sm:text-base text-slate-900 hover:text-emerald-700 transition-colors line-clamp-1"
                  >
                    {isBangla && item.product.nameBn ? item.product.nameBn : item.product.name}
                  </Link>

                  <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                    <span className="text-slate-400">
                      {isBangla && item.product.categoryNameBn ? item.product.categoryNameBn : item.product.categoryName}
                    </span>
                    {item.selectedColor && (
                      <>
                        <span>•</span>
                        <span>{isBangla ? 'রং:' : 'Color:'} <strong>{item.selectedColor}</strong></span>
                      </>
                    )}
                    {item.selectedSize && (
                      <>
                        <span>•</span>
                        <span>{isBangla ? 'সাইজ:' : 'Size:'} <strong>{item.selectedSize}</strong></span>
                      </>
                    )}
                  </div>

                  <div className="text-xs font-bold text-slate-900 pt-1">
                    {formatPrice(item.price)} {isBangla ? 'প্রতি পিস' : 'each'}
                  </div>
                </div>

                {/* Quantity Controls & Subtotal */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                  {/* Stepper */}
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        updateCartQuantity(item.productId, item.quantity - 1, item.selectedColor, item.selectedSize)
                      }
                      className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-9 text-center text-xs font-bold text-slate-900">
                      {toBnDigits(item.quantity)}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateCartQuantity(item.productId, item.quantity + 1, item.selectedColor, item.selectedSize)
                      }
                      className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                      aria-label="Increase"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Total for item */}
                  <div className="text-right min-w-[70px]">
                    <span className="text-sm font-extrabold text-slate-900 block">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.productId, item.selectedColor, item.selectedSize)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title={isBangla ? 'পণ্যটি মুছুন' : 'Remove item'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-emerald-600"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('cart_continue_shopping')}</span>
            </Link>
          </div>
        </div>

        {/* Order Summary & Cash on Delivery CTA */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
            <h3 className="text-base font-black text-slate-900">
              {t('cart_order_summary')}
            </h3>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>
                  {isBangla
                    ? `সাবটোটাল (${toBnDigits(cart.reduce((a, b) => a + b.quantity, 0))} টি পণ্য)`
                    : `Subtotal (${cart.reduce((a, b) => a + b.quantity, 0)} items)`}
                </span>
                <span className="font-bold text-slate-900">{formatPrice(cartSubtotal)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>{t('cart_shipping')}</span>
                <span className="font-bold text-slate-900">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600 font-bold">{t('cart_shipping_free')}</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-bold">
                  <span>
                    {isBangla ? `প্রোমো ছাড় (${appliedPromo?.code})` : `Promo Discount (${appliedPromo?.code})`}
                  </span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between text-base font-black text-slate-900">
                <span>{t('cart_total')}</span>
                <span className="text-xl text-slate-950">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase text-slate-400 block">
                  {isBangla ? 'কুপন / ডিসকাউন্ট কোড' : 'Coupon / Promo Code'}
                </label>
                <EditPencilButton
                  target="discount"
                  size="xs"
                  variant="light"
                  title="কুপন ও ডিসকাউন্ট কোড পরিবর্তন করুন / Edit Coupon Code"
                />
              </div>

              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-950 font-bold">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{appliedPromo.code} ({appliedPromo.description})</span>
                  </div>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="text-rose-600 font-bold hover:underline ml-2 cursor-pointer"
                  >
                    {isBangla ? 'মুছুন' : 'Remove'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="e.g. TKR10 or FREESHIP"
                      className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3 py-2 border border-slate-200 focus:outline-emerald-500 uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors shrink-0 cursor-pointer"
                    >
                      {isBangla ? 'প্রয়োগ' : 'Apply'}
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-rose-600 font-medium">{promoError}</p>
                  )}
                  <p className="text-[10px] text-slate-400">
                    {isBangla ? (
                      <>১০% ডিসকাউন্টের জন্য <strong>TKR10</strong> বা <strong>FREESHIP</strong> ব্যবহার করুন।</>
                    ) : (
                      <>Try <strong>TKR10</strong> for 10% off or <strong>FREESHIP</strong>.</>
                    )}
                  </p>
                </form>
              )}
            </div>

            {/* Cash on Delivery Checkout Button */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                id="proceed-to-checkout-button"
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-slate-950 font-extrabold rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>{t('cart_proceed_to_checkout')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
                <span className="text-[11px] font-bold text-slate-800 block">
                  💵 {isBangla ? 'কোনো অগ্রিম পেমেন্ট লাগবে না' : 'Zero Online Payment Required'}
                </span>
                <span className="text-[10px] text-slate-500 leading-tight block">
                  {isBangla
                    ? `পণ্য হাতে পাওয়ার পর রাইডারের নিকট সর্বমোট ${formatPrice(finalTotal)} নগদ পরিশোধ করুন।`
                    : `You will pay ${formatPrice(finalTotal)} in cash directly to our courier rider at your doorstep.`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
