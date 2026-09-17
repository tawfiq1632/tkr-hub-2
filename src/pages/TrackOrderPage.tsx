import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import { formatTelUrl } from '../data/initialSettings';
import { OrderStatus } from '../types';
import {
  Truck,
  Package,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  RotateCw,
  Sparkles
} from 'lucide-react';

export function TrackOrderPage() {
  const { orders, getOrderByIdOrNumber, updateOrderStatus, addToast, storeSettings } = useStore();
  const { isBangla, formatPrice, toBnDigits } = useLanguage();
  const { currentRoute, navigate } = useRouter();
  const contact = storeSettings.contact;

  const initialQuery = currentRoute.searchParams.get('orderId') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeOrder, setActiveOrder] = useState(() => {
    if (initialQuery) {
      return getOrderByIdOrNumber(initialQuery);
    }
    return orders[0];
  });
  const [hasSearched, setHasSearched] = useState(Boolean(initialQuery));

  // If URL search parameter changes
  useEffect(() => {
    const q = currentRoute.searchParams.get('orderId');
    if (q) {
      setSearchQuery(q);
      const found = getOrderByIdOrNumber(q);
      setActiveOrder(found);
      setHasSearched(true);
    }
  }, [currentRoute, getOrderByIdOrNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const found = getOrderByIdOrNumber(searchQuery.trim());
    setActiveOrder(found);
    setHasSearched(true);

    if (found) {
      addToast(
        isBangla
          ? `অর্ডার ${found.orderNumber} এর ট্র্যাকিং তথ্য পাওয়া গেছে`
          : `Tracking record loaded for ${found.orderNumber}`,
        'success'
      );
      navigate(`/track-order?orderId=${found.orderNumber}`, { replace: true });
    } else {
      addToast(
        isBangla
          ? 'এই নম্বর দিয়ে কোনো অর্ডার পাওয়া যায়নি। নমুনা ট্র্যাকিং দেখুন: TKR-88219'
          : 'No order found matching this number or phone. Try sample: TKR-88219',
        'error'
      );
    }
  };

  const handleQuickSelect = (orderNumber: string) => {
    setSearchQuery(orderNumber);
    const found = getOrderByIdOrNumber(orderNumber);
    setActiveOrder(found);
    setHasSearched(true);
    navigate(`/track-order?orderId=${orderNumber}`, { replace: true });
  };

  // Status advancement demo simulation
  const handleSimulateNextStatus = () => {
    if (!activeOrder) return;
    const flow: OrderStatus[] = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];
    const currentIndex = flow.indexOf(activeOrder.status);
    if (currentIndex < flow.length - 1) {
      const nextStatus = flow[currentIndex + 1];
      updateOrderStatus(activeOrder.id, nextStatus, 'Express Transit Courier Node');
      // Refresh active order in view
      setTimeout(() => {
        const updated = getOrderByIdOrNumber(activeOrder.id);
        if (updated) setActiveOrder(updated);
      }, 100);
    } else {
      addToast(
        isBangla ? 'এই অর্ডারটি ইতিমধ্যে "ডেলিভার্ড" অবস্থায় রয়েছে!' : 'This order has already reached final "Delivered" status!',
        'info'
      );
    }
  };

  const getStatusLabel = (status: string) => {
    if (!isBangla) return status;
    switch (status) {
      case 'Pending':
        return 'অপেক্ষমাণ (Pending)';
      case 'Confirmed':
        return 'নিশ্চিতকৃত (Confirmed)';
      case 'Packed':
        return 'প্যাকেজিং সম্পন্ন (Packed)';
      case 'Shipped':
        return 'কুরিয়ারে অন-রুট (Shipped)';
      case 'Delivered':
        return 'ডেলিভার্ড সম্পন্ন (Delivered)';
      case 'Cancelled':
        return 'বাতিল (Cancelled)';
      default:
        return status;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
          <Truck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{isBangla ? 'রিয়েল-টাইম পার্সেল ও কুরিয়ার ট্র্যাকিং' : 'Real-Time Parcel Logistics Tracking'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {isBangla ? 'আপনার অর্ডারের অবস্থান জানুন' : 'Track Your TKR Hub Order'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {isBangla
            ? 'আপনার অর্ডার নম্বর (যেমন: TKR-88219) অথবা চেকআউটে ব্যবহৃত ফোন নম্বর দিয়ে কুরিয়ার রাইডারের অবস্থান ট্র্যাক করুন।'
            : 'Enter your Order Number (e.g. TKR-88219) or the phone number you used during checkout to monitor warehouse dispatch and courier rider progress.'}
        </p>
      </div>

      {/* Search Bar Container */}
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSearch} className="relative flex items-center shadow-lg rounded-2xl overflow-hidden border border-slate-200">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBangla ? 'অর্ডার নম্বর বা ফোন নম্বর লিখুন (যেমন: TKR-88219)' : 'Enter Order Number (e.g. TKR-88219 or Phone)'}
            className="w-full bg-white text-slate-900 text-sm pl-11 pr-32 py-4 outline-none font-medium placeholder:text-slate-400"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
          <button
            type="submit"
            className="absolute right-2 px-5 py-2.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            {isBangla ? 'ট্র্যাক করুন' : 'Track Parcel'}
          </button>
        </form>

        {/* Quick Sample Order Chips for Instant Testing */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-500">
          <span className="font-semibold text-slate-400">
            {isBangla ? 'নমুনা অর্ডার পরীক্ষা করুন:' : 'Try sample orders:'}
          </span>
          {orders.slice(0, 3).map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => handleQuickSelect(o.orderNumber)}
              className={`px-3 py-1 rounded-lg border font-mono font-bold transition-all cursor-pointer ${
                activeOrder?.id === o.id
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              {o.orderNumber} ({getStatusLabel(o.status)})
            </button>
          ))}
        </div>
      </div>

      {/* Active Order Results View */}
      {activeOrder ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-8 shadow-xs">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {activeOrder.orderNumber}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide ${
                    activeOrder.status === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : activeOrder.status === 'Shipped'
                      ? 'bg-blue-100 text-blue-800'
                      : activeOrder.status === 'Packed'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isBangla ? 'বর্তমান অবস্থা: ' : 'Status: '}{getStatusLabel(activeOrder.status)}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isBangla ? 'কুরিয়ার:' : 'Courier:'} <strong>{activeOrder.courierName || (isBangla ? 'টিকেআর এক্সপ্রেস কুরিয়ার' : 'TKR Express Courier')}</strong> •{' '}
                {isBangla ? 'ট্র্যাকিং আইডি:' : 'Tracking ID:'}{' '}
                <span className="font-mono">{activeOrder.trackingCode}</span>
              </p>
            </div>

            {/* Simulation button for demo */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSimulateNextStatus}
                className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                title={isBangla ? 'কুরিয়ার স্ট্যাটাস পরিবর্তন করে টেস্ট করুন' : 'Advance order status to next courier stage for live test'}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{isBangla ? 'পরবর্তী কুরিয়ার ধাপ সিমুলেট করুন' : 'Simulate Next Courier Step'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">
                {isBangla ? 'সম্ভাব্য ডেলিভারি সময়' : 'Estimated Arrival'}
              </span>
              <span className="text-sm font-bold text-slate-900">
                {activeOrder.estimatedDeliveryDate}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">
                {isBangla ? 'পেমেন্ট মাধ্যম' : 'Payment Mode'}
              </span>
              <span className="text-sm font-bold text-emerald-700 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                <span>
                  {isBangla
                    ? `ক্যাশ অন ডেলিভারি (${formatPrice(activeOrder.total)})`
                    : `Cash on Delivery (${formatPrice(activeOrder.total)})`}
                </span>
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">
                {isBangla ? 'ডেলিভারি গন্তব্য' : 'Delivery Destination'}
              </span>
              <span className="text-sm font-bold text-slate-900 truncate block">
                {activeOrder.customer.city} ({activeOrder.customer.deliveryAddress})
              </span>
            </div>
          </div>

          {/* Timeline Stages */}
          <div className="space-y-6 pt-2">
            <h3 className="text-base font-black text-slate-900">
              {isBangla ? 'শিপমেন্ট মাইলফলক ও ট্র্যাকিং ইতিহাস' : 'Shipment Milestone History'}
            </h3>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {activeOrder.trackingSteps.map((step) => {
                const isDone = step.completed;
                const isCurrent = step.current;

                return (
                  <div key={step.step} className="relative flex items-start gap-4">
                    {/* Circle marker */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isDone
                          ? 'bg-emerald-600 text-white shadow-xs ring-4 ring-emerald-50'
                          : isCurrent
                          ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-100 animate-pulse'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : toBnDigits(step.step)}
                    </div>

                    {/* Step details */}
                    <div className="flex-1 min-w-0 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4
                          className={`font-bold text-xs sm:text-sm ${
                            isCurrent ? 'text-blue-900 font-extrabold' : isDone ? 'text-slate-900' : 'text-slate-500'
                          }`}
                        >
                          {step.title}
                        </h4>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {step.timestamp}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {step.description}
                      </p>

                      {step.location && (
                        <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold mt-2">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          <span>{isBangla ? 'হাব / অবস্থান:' : 'Location Node:'} {step.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Package Contents List */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <h4 className="font-bold text-sm text-slate-900">
              {isBangla ? 'এই পার্সেলের পণ্যসমূহ' : 'Items in this Consignment'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg bg-white border shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-bold text-slate-900 truncate">{item.name}</p>
                    <p className="text-slate-500 text-[11px]">
                      {isBangla ? 'পরিমাণ:' : 'Qty:'} {toBnDigits(item.quantity)}{' '}
                      {item.selectedColor ? `• ${item.selectedColor}` : ''}{' '}
                      {item.selectedSize ? `• ${isBangla ? 'সাইজ' : 'Size'}: ${item.selectedSize}` : ''}
                    </p>
                    <p className="font-semibold text-slate-800 mt-0.5">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Care Callout */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-xs">
                {isBangla ? 'ডেলিভারির সময় পরিবর্তন করতে চান বা রাইডারের সাথে কথা বলতে চান?' : 'Need to change delivery timing or contact your rider?'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {isBangla
                  ? `জরুরি ডেলিভারি সহায়তার জন্য আমাদের টিম প্রতিদিন ${contact.businessHours || 'সকাল ৯টা – রাত ১০টা'} পর্যন্ত সক্রিয় রয়েছে।`
                  : `Our support team is available ${contact.businessHours || '9:00 AM – 10:00 PM'} for urgent route assistance.`}
              </p>
            </div>
            {contact.callSupport.enabled && contact.callSupport.value ? (
              <a
                href={formatTelUrl(contact.callSupport.value)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shrink-0 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{isBangla ? 'কল করুন: ' : 'Call '}{contact.callSupport.value}</span>
              </a>
            ) : (
              <Link
                to="/contact"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shrink-0 flex items-center justify-center gap-1.5"
              >
                <span>{isBangla ? 'যোগাযোগ করুন' : 'Contact Support'}</span>
              </Link>
            )}
          </div>
        </div>
      ) : hasSearched ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {isBangla ? 'কোনো ট্র্যাকিং রেকর্ড পাওয়া যায়নি' : 'No Tracking Record Found'}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {isBangla
              ? `"${searchQuery}" এর সাথে মিলে এমন কোনো অর্ডার পাওয়া যায়নি। সঠিক অর্ডার আইডি বা ফোন নম্বর চেক করুন। নমুনা অর্ডার দেখতে নিচের বাটনে ক্লিক করুন:`
              : `We couldn't find an order matching "${searchQuery}". Please check your order ID or phone number. Try testing with sample order TKR-88219.`}
          </p>
          <button
            type="button"
            onClick={() => handleQuickSelect('TKR-88219')}
            className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            {isBangla ? 'নমুনা অর্ডার লোড করুন (TKR-88219)' : 'Load Sample Order (TKR-88219)'}
          </button>
        </div>
      ) : null}
    </div>
  );
}
