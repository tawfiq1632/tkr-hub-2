import React from 'react';
import { Link } from '../context/RouterContext';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Users,
  Target,
  Award,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Brand Hero */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The TKR Hub Vision</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Built for Modern Living. Powered by Trust & Cash on Delivery.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            TKR Hub was founded to eliminate the friction, uncertainty, and fake product concerns of modern e-commerce. We curate superior everyday audio gear, smart electronics, heavyweight apparel, and functional utility accessories.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <Link
              to="/shop"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors border border-slate-700"
            >
              Contact Team
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">100% Genuine Authenticity</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every electronic gadget and fabric garment in our inventory undergoes rigorous quality inspection before being added to our warehouse catalog. We reject counterfeits and substandard batches.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">Zero-Risk Cash on Delivery</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We believe you should only pay when you see the package in your hands. With nationwide Cash on Delivery, you inspect the outer parcel at your doorstep before handing cash to the courier.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <RotateCcw className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">7-Day Hassle-Free Returns</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ordered the wrong size hoodie or shoes? If it doesn’t fit, simply inform our support team within 7 days and we will dispatch an exchange rider directly to your address.
          </p>
        </div>
      </section>

      {/* Brand Numbers & Milestones */}
      <section className="bg-slate-100/80 rounded-3xl p-8 sm:p-12 border border-slate-200">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-slate-900">25,000+</span>
            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Parcels Delivered
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-slate-900">98.6%</span>
            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Customer Satisfaction
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-slate-900">48 Hours</span>
            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Average Metro Delivery
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-slate-900">64 Districts</span>
            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Nationwide Coverage
            </span>
          </div>
        </div>
      </section>

      {/* Quality Commitment Details */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl font-black text-slate-900">The TKR Hub Quality Promise</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We partner directly with specialized manufacturers to provide premium specifications at fair prices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/60">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900">Electronic Device Testing</h4>
              <p className="text-slate-500 mt-0.5 leading-relaxed">
                All battery banks, headphones, and smartwatches are factory stress-tested for voltage stability and battery longevity.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/60">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900">Heavyweight Combed Fabric</h4>
              <p className="text-slate-500 mt-0.5 leading-relaxed">
                Our apparel uses 280 GSM to 420 GSM organic ring-spun cotton that holds its structure and color through countless washes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/60">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900">Direct Courier Collaboration</h4>
              <p className="text-slate-500 mt-0.5 leading-relaxed">
                Integrated logistics API enables instant tracking codes with SMS notification when the rider is near your neighborhood.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/60">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900">Customer Support You Can Call</h4>
              <p className="text-slate-500 mt-0.5 leading-relaxed">
                No automated bot dead-ends. Speak directly to our support agents 7 days a week on our customer hotline.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
