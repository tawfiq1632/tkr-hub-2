import React from 'react';
import { useStore } from '../context/StoreContext';
import { Link, useRouter } from '../context/RouterContext';
import { ProductCard } from '../components/ProductCard';
import { EditPencilButton } from '../components/EditPencilButton';
import { CATEGORIES } from '../data/initialProducts';
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Headphones,
  Shirt,
  Watch,
  Flame,
  CheckCircle2,
  Package,
  Search
} from 'lucide-react';

export function HomePage() {
  const { products, storeSettings } = useStore();
  const promo = storeSettings.promo;
  const announcement = storeSettings.announcement;
  const logo = storeSettings.logo;
  const { navigate } = useRouter();

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{announcement.highlightText || 'NEW COLLECTION 2026 • DOORSTEP CASH ON DELIVERY'}</span>
              </div>
              <EditPencilButton
                target="discount"
                size="xs"
                variant="dark"
                title="অফার ও ডিসকাউন্ট পরিবর্তন করুন / Edit Promo & Discount"
              />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              Next-Gen Tech & Streetwear at{' '}
              <span className="bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
                {logo.displayTitle || 'TKR HUB.'}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Experience the future of online shopping. Hand-picked noise cancelling headphones, AMOLED smartwatches, heavyweight apparel, and modular accessories delivered straight to your door with 100% Cash-on-Delivery payment.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/shop"
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base group"
              >
                <span>Explore Full Shop</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/category/gadgets"
                className="px-5 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-colors text-sm sm:text-base"
              >
                Gadgets & Audio
              </Link>
              <Link
                to="/category/clothing"
                className="px-5 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-colors text-sm sm:text-base"
              >
                Heavyweight Apparel
              </Link>
            </div>

            {/* Quick Metrics / Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 max-w-lg">
              <div>
                <span className="block text-xl sm:text-2xl font-extrabold text-white">100%</span>
                <span className="text-xs text-slate-400">Cash on Delivery</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-extrabold text-white">48h</span>
                <span className="text-xs text-slate-400">Express Transit</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-extrabold text-white">7 Days</span>
                <span className="text-xs text-slate-400">Easy Returns</span>
              </div>
            </div>
          </div>

          {/* Hero Featured Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-slate-800/70 border border-slate-700/80 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
              <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-900 relative">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                  alt="TKR SoundPulse"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 px-3 py-1 bg-emerald-500 text-slate-950 text-xs font-black rounded-full shadow-md">
                  HOT DEAL
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Wireless Audio • Hi-Res LDAC</span>
                  <span className="text-emerald-400 font-semibold">In Stock (28 units left)</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  TKR SoundPulse ANC Pro Wireless Headphones
                </h3>
                <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                  <div>
                    <span className="text-2xl font-extrabold text-white">$79.99</span>
                    <span className="text-xs text-slate-400 line-through ml-2">$129.99</span>
                  </div>
                  <Link
                    to="/product/tkr-soundpulse-anc-pro-headphones"
                    className="px-4 py-2 bg-white hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Browse by Department
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Explore TKR Hub Categories
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-600 inline-flex items-center gap-1 group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group relative h-80 rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6"
            >
              {/* Background image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="relative z-10 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-md inline-block">
                  {cat.tagline}
                </span>
                <h3 className="text-2xl font-extrabold text-white">{cat.name}</h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-300 group-hover:text-white transition-colors">
                  <span>Shop {cat.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Fast Order Tracking Feature Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-emerald-950 text-white p-6 sm:p-10 border border-emerald-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Truck className="w-4 h-4" />
                <span>Live Parcel Tracking</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Already ordered with Cash on Delivery?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/80 max-w-xl">
                Check exactly where your package is, from warehouse dispatch to local courier transit. Try our sample order IDs <strong>TKR-88219</strong> or <strong>TKR-94520</strong>!
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3">
              <Link
                to="/track-order"
                className="w-full text-center px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Package className="w-4 h-4" />
                <span>Track Order Now</span>
              </Link>
              <Link
                to="/contact"
                className="w-full text-center px-5 py-3.5 bg-emerald-900/60 hover:bg-emerald-900 text-white font-semibold rounded-xl border border-emerald-700/60 transition-colors text-sm flex items-center justify-center gap-2"
              >
                <span>Delivery FAQ</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Flash Offer / Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950 border border-emerald-500/20 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                {promo.bannerBadge || 'Limited Flash Deal'}
              </span>
              <EditPencilButton
                target="discount"
                size="xs"
                variant="dark"
                title="অফার ব্যানার ও ডিসকাউন্ট পরিবর্তন করুন / Edit Promo Banner"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {promo.bannerTitle || `Save ${promo.discountPercentage || 10}% OFF Storewide`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {promo.bannerSubtitle || `Use coupon code during Cash on Delivery checkout to save ${promo.discountPercentage || 10}%. Free doorstep inspection included.`}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-950/80 border border-emerald-500/40 rounded-2xl px-5 py-3 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Coupon Code</span>
              <span className="text-xl font-black text-emerald-400 tracking-wider font-mono">{promo.discountCode || 'TKR10'}</span>
            </div>
            <Link
              to="/shop"
              className="px-5 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Handpicked Essentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Featured at TKR Hub
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-600 inline-flex items-center gap-1 group"
          >
            <span>See All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trending / Hot Deals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Trending This Week
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Customer Favorites
              </h2>
            </div>
          </div>
          <Link
            to="/shop?sort=rating"
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-600 inline-flex items-center gap-1 group"
          >
            <span>Top Rated Items</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Cash on Delivery Step Explanation */}
      <section className="bg-slate-100/80 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              How Cash on Delivery Works
            </h2>
            <p className="text-sm text-slate-600">
              No credit card or online payment required. Order in seconds, inspect at your doorstep, and pay cash to the courier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 relative">
              <span className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-base">
                1
              </span>
              <h3 className="font-bold text-slate-900 text-base">Place Order Online</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add products to your cart, enter your delivery address and phone number at checkout. Select Cash on Delivery with one click.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 relative">
              <span className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-base">
                2
              </span>
              <h3 className="font-bold text-slate-900 text-base">We Pack & Dispatch</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We perform quality verification, securely pack your items, and dispatch via express courier with real-time web tracking.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 relative">
              <span className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-base">
                3
              </span>
              <h3 className="font-bold text-slate-900 text-base">Pay Cash at Doorstep</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive the package, check the packaging, and hand over the exact cash amount to the delivery rider. 100% stress-free.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
