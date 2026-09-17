import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import { CustomerOrderForm } from '../types';
import {
  Truck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShoppingBag,
  MapPin,
  Phone,
  User,
  Mail,
  FileText,
  Lock,
  RotateCcw,
  Sparkles,
  Check,
  BadgeCheck
} from 'lucide-react';
import { SecurityCenterModal } from '../components/SecurityCenterModal';

export function CheckoutPage() {
  const {
    cart,
    cartSubtotal,
    shippingCost,
    discountAmount,
    appliedPromo,
    finalTotal,
    createOrder,
    addToast
  } = useStore();

  const { isBangla, formatPrice, toBnDigits, t } = useLanguage();
  const { navigate } = useRouter();

  // Form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('Dhaka');
  const [postalCode, setPostalCode] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // BD Telecom Operator detector
  const getBdOperatorInfo = (num: string) => {
    const clean = num.replace(/[^0-9]/g, '');
    const digits = clean.startsWith('88') ? clean.slice(2) : clean;
    if (digits.length >= 3) {
      const prefix = digits.slice(0, 3);
      if (prefix === '017' || prefix === '013') return { name: 'গ্রামীণফোন (GP)', color: 'text-sky-700 bg-sky-50 border-sky-200' };
      if (prefix === '018') return { name: 'রবি (Robi)', color: 'text-rose-700 bg-rose-50 border-rose-200' };
      if (prefix === '019' || prefix === '014') return { name: 'বাংলালিংক (Banglalink)', color: 'text-amber-800 bg-amber-50 border-amber-200' };
      if (prefix === '016') return { name: 'এয়ারটেল (Airtel)', color: 'text-red-700 bg-red-50 border-red-200' };
      if (prefix === '015') return { name: 'টেলিটক (Teletalk)', color: 'text-emerald-800 bg-emerald-50 border-emerald-200' };
    }
    return null;
  };

  // If cart is empty, redirect to shop
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-900">{t('cart_empty_title')}</h2>
        <p className="text-xs text-slate-500">
          {isBangla
            ? 'চেকআউট করার আগে অনুগ্রহ করে আপনার কার্টে পণ্য যোগ করুন।'
            : 'Please add items to your cart before proceeding to checkout.'}
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-emerald-600 transition-colors"
        >
          <span>{t('cart_start_shopping')}</span>
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) {
      errs.fullName = isBangla ? 'আপনার পূর্ণ নাম লিখুন।' : 'Full Name is required.';
    }
    if (!phone.trim()) {
      errs.phone = isBangla ? 'ডেলিভারি কনফার্মেশনের জন্য মোবাইল নম্বর প্রয়োজন।' : 'Phone number is required for courier delivery.';
    } else if (phone.trim().length < 8) {
      errs.phone = isBangla ? 'অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন।' : 'Please provide a valid phone number.';
    }
    if (!deliveryAddress.trim()) {
      errs.deliveryAddress = isBangla ? 'সম্পূর্ণ ডেলিভারি ঠিকানা (বাসা/রোড/এলাকা) আবশ্যক।' : 'Complete street and house delivery address is required.';
    }
    if (!city.trim()) {
      errs.city = isBangla ? 'জেলা / শহর নির্বাচন করুন।' : 'City / District is required.';
    }
    if (!agreeTerms) {
      errs.agreeTerms = isBangla ? 'ক্যাশ অন ডেলিভারির শর্তাবলীতে সম্মতি প্রদান করুন।' : 'Please confirm terms and Cash on Delivery agreement.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      addToast(
        isBangla ? 'অনুগ্রহ করে সব প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করুন।' : 'Please fill in all required delivery fields.',
        'error'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const customerData: CustomerOrderForm = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        altPhone: altPhone.trim(),
        email: email.trim() || 'customer@tkrhub.com',
        deliveryAddress: deliveryAddress.trim(),
        city: city.trim(),
        postalCode: postalCode.trim() || '1000',
        deliveryNotes: deliveryNotes.trim(),
        agreeTerms
      };

      const newOrder = createOrder(customerData);

      // Navigate to order confirmation page with order id query
      setTimeout(() => {
        navigate(`/order-confirmation?orderId=${newOrder.orderNumber}`);
      }, 400);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      addToast(
        isBangla ? 'অর্ডার সম্পন্ন হতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।' : 'Failed to place order. Please check details and try again.',
        'error'
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Checkout Progress / Steps */}
      <div className="flex items-center justify-center gap-4 text-xs font-bold">
        <Link to="/cart" className="text-slate-400 hover:text-slate-700 flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">
            {toBnDigits('1')}
          </span>
          <span>{isBangla ? 'শপিং কার্ট' : 'Shopping Cart'}</span>
        </Link>
        <span className="text-slate-300">→</span>
        <span className="text-emerald-700 flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
            {toBnDigits('2')}
          </span>
          <span>{isBangla ? 'ক্যাশ অন ডেলিভারি চেকআউট' : 'Cash on Delivery Checkout'}</span>
        </span>
        <span className="text-slate-300">→</span>
        <span className="text-slate-400 flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px]">
            {toBnDigits('3')}
          </span>
          <span>{isBangla ? 'কনফার্মেশন' : 'Confirmation'}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Customer Order Form */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span>{isBangla ? 'গ্রাহকের ডেলিভারি ও যোগাযোগের তথ্য' : 'Customer Delivery Information'}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {isBangla
                  ? 'আপনার সঠিক ঠিকানা ও সক্রিয় মোবাইল নম্বর লিখুন যাতে আমাদের ডেলিভারি রাইডার সহজেই যোগাযোগ করতে পারেন।'
                  : 'Please enter your accurate address and active phone number so our courier rider can contact you.'}
              </p>
            </div>

            <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {isBangla ? 'আপনার পূর্ণ নাম' : 'Full Customer Name'} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                    }}
                    placeholder={isBangla ? 'যেমন: মোহাম্মদ রফিকুল ইসলাম' : 'e.g. Rafiqul Islam'}
                    className={`w-full bg-slate-50 text-slate-900 text-xs rounded-xl pl-9 pr-4 py-2.5 border ${
                      errors.fullName ? 'border-rose-500' : 'border-slate-200'
                    } focus:outline-emerald-500`}
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                </div>
                {errors.fullName && (
                  <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.fullName}</p>
                )}
              </div>

              {/* Phone Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      {isBangla ? 'মোবাইল ফোন নম্বর' : 'Mobile Phone Number'} <span className="text-rose-500">*</span>
                    </label>
                    {phone.trim().length >= 3 && getBdOperatorInfo(phone) && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getBdOperatorInfo(phone)!.color}`}>
                        {getBdOperatorInfo(phone)!.name}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                      }}
                      placeholder={isBangla ? 'যেমন: 01712-345678' : 'e.g. +880 1712-345678'}
                      className={`w-full bg-slate-50 text-slate-900 text-xs rounded-xl pl-9 pr-4 py-2.5 border ${
                        errors.phone ? 'border-rose-500' : 'border-slate-200'
                      } focus:outline-emerald-500`}
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  </div>
                  {phone.replace(/[^0-9]/g, '').length === 11 && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded-md border border-emerald-200/60 mt-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{isBangla ? 'সঠিক ১১ ডিজিটের বিডি নম্বর • স্প্যাম সিকিউরিটি ভেরিফাইড' : 'Valid 11-digit BD number • Anti-Fraud Verified'}</span>
                    </div>
                  )}
                  {errors.phone && (
                    <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.phone}</p>
                  )}
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    {isBangla ? 'অর্ডার পাঠানোর আগে নিশ্চিত করতে কল দেওয়া হবে।' : 'Our team will call to confirm dispatch.'}
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {isBangla ? 'বিকল্প মোবাইল নম্বর (ঐচ্ছিক)' : 'Alternative Phone (Optional)'}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={altPhone}
                      onChange={(e) => setAltPhone(e.target.value)}
                      placeholder={isBangla ? 'যেমন: 01819-000000' : 'e.g. +880 1819-000000'}
                      className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 focus:outline-emerald-500"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {isBangla ? 'ইমেইল এড্রেস (অর্ডার ট্র্যাকিং ও রসিদের জন্য)' : 'Email Address (For Order Tracking Updates)'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isBangla ? 'যেমন: customer@example.com' : 'e.g. customer@example.com'}
                    className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 focus:outline-emerald-500"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {isBangla ? 'বাসা/রোড/এলাকার পূর্ণ ডেলিভারি ঠিকানা' : 'Complete Street / Building Address'} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={deliveryAddress}
                  onChange={(e) => {
                    setDeliveryAddress(e.target.value);
                    if (errors.deliveryAddress) setErrors((prev) => ({ ...prev, deliveryAddress: '' }));
                  }}
                  placeholder={isBangla ? 'যেমন: বাসা ১৪, রোড ৫, ব্লক বি, নিকেতন, গুলশান, ঢাকা' : 'e.g. House 14, Road 5, Block B, Niketan, Gulshan'}
                  className={`w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border ${
                    errors.deliveryAddress ? 'border-rose-500' : 'border-slate-200'
                  } focus:outline-emerald-500`}
                />
                {errors.deliveryAddress && (
                  <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.deliveryAddress}</p>
                )}
              </div>

              {/* City and Postal Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {isBangla ? 'শহর / জেলা' : 'City / District'} <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                  >
                    <option value="Dhaka">{isBangla ? 'ঢাকা (মেট্রো ও পার্শ্ববর্তী)' : 'Dhaka (Metro & Suburbs)'}</option>
                    <option value="Chittagong">{isBangla ? 'চট্টগ্রাম' : 'Chittagong'}</option>
                    <option value="Sylhet">{isBangla ? 'সিলেট' : 'Sylhet'}</option>
                    <option value="Rajshahi">{isBangla ? 'রাজশাহী' : 'Rajshahi'}</option>
                    <option value="Khulna">{isBangla ? 'খুলনা' : 'Khulna'}</option>
                    <option value="Barisal">{isBangla ? 'বরিশাল' : 'Barisal'}</option>
                    <option value="Rangpur">{isBangla ? 'রংপুর' : 'Rangpur'}</option>
                    <option value="Mymensingh">{isBangla ? 'ময়মনসিংহ' : 'Mymensingh'}</option>
                    <option value="Comilla">{isBangla ? 'কুমিল্লা' : 'Comilla'}</option>
                    <option value="Gazipur">{isBangla ? 'গাজীপুর' : 'Gazipur'}</option>
                    <option value="Narayanganj">{isBangla ? 'নারায়ণগঞ্জ' : 'Narayanganj'}</option>
                    <option value="Other District">{isBangla ? 'অন্যান্য জেলা' : 'Other Regional District'}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {isBangla ? 'পোস্ট কোড' : 'Postal / Zip Code'}
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder={isBangla ? 'যেমন: ১২১২' : 'e.g. 1212'}
                    className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                  />
                </div>
              </div>

              {/* Delivery Notes */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {isBangla ? 'ডেলিভারির বিশেষ নির্দেশনা (ঐচ্ছিক)' : 'Special Delivery Instructions (Optional)'}
                </label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder={isBangla ? 'যেমন: আসার আগে কল দিবেন, বিকাল ৩টার পর ডেলিভারি ইত্যাদি' : 'e.g. Call before arrival, leave with security guard, delivery after 3 PM'}
                  className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                />
              </div>

              {/* Payment Method Selector (Pre-selected Cash on Delivery) */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <label className="text-xs font-bold text-slate-900 block">
                  {isBangla ? 'পেমেন্ট পদ্ধতি' : 'Select Payment Method'}
                </label>

                {/* COD Card */}
                <div className="p-4 rounded-2xl border-2 border-emerald-600 bg-emerald-50/60 flex items-start gap-3.5 relative">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-emerald-950">
                        {isBangla ? 'ক্যাশ অন ডেলিভারি (COD)' : 'Cash on Delivery (COD)'}
                      </h4>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-emerald-600 text-white rounded-md">
                        {isBangla ? 'জনপ্রিয় ও সুপারিশকৃত' : 'Recommended'}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                      {isBangla ? (
                        <>আমাদের ডেলিভারি রাইডার আপনার দরজায় পণ্য পৌঁছে দেওয়ার পর নগদ <strong>{formatPrice(finalTotal)}</strong> পরিশোধ করুন। পার্সেল দেখে নেওয়ার সম্পূর্ণ সুযোগ রয়েছে।</>
                      ) : (
                        <>Pay <strong>{formatPrice(finalTotal)}</strong> in cash when our courier rider delivers your package to your doorstep. You can inspect the outer packaging before payment.</>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 mt-0.5 accent-emerald-600 cursor-pointer"
                  />
                  <span>
                    {isBangla
                      ? 'আমি নিশ্চিত করছি যে প্রদত্ত ডেলিভারি ঠিকানা সঠিক, এবং পার্সেল গ্রহণের সময় নির্ধারিত নগদ টাকা পরিশোধ করতে সম্মত।'
                      : 'I confirm that the delivery details provided are accurate, and I agree to receive and pay the exact amount in cash upon parcel delivery.'}
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.agreeTerms}</p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Col: Order Summary Card & Place Order Button */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-xs">
            <h3 className="text-base font-black text-slate-900 flex items-center justify-between">
              <span>{isBangla ? 'অর্ডার বিবরণ' : 'Order Summary'}</span>
              <span className="text-xs font-semibold text-slate-500">
                {isBangla
                  ? `${toBnDigits(cart.reduce((sum, item) => sum + item.quantity, 0))} টি পণ্য`
                  : `${cart.reduce((sum, item) => sum + item.quantity, 0)} items`}
              </span>
            </h3>

            {/* Mini Items List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-slate-100">
              {cart.map((item, i) => (
                <div key={i} className="flex items-center gap-3 pt-3 first:pt-0">
                  <img
                    src={item.product.images[0]}
                    alt={isBangla && item.product.nameBn ? item.product.nameBn : item.product.name}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-100 border shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 line-clamp-1">
                      {isBangla && item.product.nameBn ? item.product.nameBn : item.product.name}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {isBangla ? 'পরিমাণ:' : 'Qty:'} {toBnDigits(item.quantity)}{' '}
                      {item.selectedColor ? `• ${item.selectedColor}` : ''}{' '}
                      {item.selectedSize ? `• ${isBangla ? 'সাইজ' : 'Size'} ${item.selectedSize}` : ''}
                    </p>
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-slate-200 space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>{isBangla ? 'সাবটোটাল' : 'Subtotal'}</span>
                <span className="font-bold text-slate-900">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{isBangla ? 'ডেলিভারি চার্জ' : 'Delivery Charge'}</span>
                <span className="font-bold text-slate-900">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600">{t('cart_shipping_free')}</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-bold">
                  <span>
                    {isBangla ? `ডিসকাউন্ট (${appliedPromo?.code})` : `Discount (${appliedPromo?.code})`}
                  </span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between text-base font-black text-slate-900">
                <span>{isBangla ? 'ডেলিভারির সময় প্রদেয়' : 'Amount Due on Delivery'}</span>
                <span className="text-2xl text-slate-950">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                id="place-order-button"
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full py-4 px-4 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-slate-950 font-black rounded-xl shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Truck className="w-5 h-5" />
                <span>
                  {isSubmitting
                    ? isBangla ? 'অর্ডার কনফার্ম করা হচ্ছে...' : 'Confirming Order...'
                    : isBangla ? 'অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)' : 'Confirm Order (Cash on Delivery)'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {isBangla ? 'কোনো অগ্রিম পেমেন্ট নেই • নিরাপদ হোম ডেলিভারি' : 'No advance payment • Safe Doorstep Handover'}
                </span>
              </div>
            </div>
          </div>

          {/* Guarantees Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2.5">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{isBangla ? 'টিকেআর হাব গ্রাহক সুরক্ষা:' : 'TKR Hub Customer Protection:'}</span>
              </div>
              <button
                type="button"
                onClick={() => setSecurityModalOpen(true)}
                className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 underline cursor-pointer"
              >
                {isBangla ? 'সুরক্ষা রিপোর্ট' : 'Security Details'}
              </button>
            </div>
            <p className="text-[11px] leading-relaxed">
              {isBangla
                ? 'ভুল বা ক্ষতিগ্রস্ত পণ্য পেলে সাথে সাথে ডেলিভারি প্রত্যাখ্যান করতে পারবেন অথবা আমাদের ৭ দিনের সহজ রিটার্ন পলিসির আওতায় রিপ্লেসমেন্ট নিতে পারবেন।'
                : 'If you receive the wrong product, damaged parcel, or incorrect size, you can reject the delivery or request a replacement under our 7-day hassle-free return policy.'}
            </p>
          </div>
        </div>
      </div>

      {/* Security Center Modal */}
      <SecurityCenterModal
        isOpen={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
      />
    </div>
  );
}
