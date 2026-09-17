import React from 'react';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export function OrderConfirmationPage() {
  const { orders, getOrderByIdOrNumber } = useStore();
  const { isBangla, formatPrice, toBnDigits } = useLanguage();
  const { currentRoute, navigate } = useRouter();

  // Get order id from query string e.g. /order-confirmation?orderId=TKR-88219
  const orderIdQuery = currentRoute.searchParams.get('orderId');
  
  // If no order id in query, default to most recently created order
  const order = orderIdQuery
    ? getOrderByIdOrNumber(orderIdQuery)
    : orders[0];

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          {isBangla ? 'কোনো অর্ডার পাওয়া যায়নি' : 'No Order Found'}
        </h2>
        <p className="text-xs text-slate-500">
          {isBangla
            ? 'আমরা কোনো সক্রিয় অর্ডারের রসিদ খুঁজে পাইনি। অনুগ্রহ করে আপনার অর্ডার নম্বর চেক করুন বা শপিং চালিয়ে যান।'
            : 'We could not locate an active order receipt. Please check your order number or browse our store.'}
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl"
        >
          <span>{isBangla ? 'শপে ফিরে যান' : 'Go to Shop'}</span>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 print:p-0 print:m-0">
      {/* Success Hero Header */}
      <div className="text-center space-y-3 print:space-y-1">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-in zoom-in-50 duration-300">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>
        <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 font-extrabold text-xs rounded-full border border-emerald-200">
          {isBangla ? 'অর্ডার সফলভাবে গ্রহণ করা হয়েছে' : 'Order Successfully Placed'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {isBangla ? `ধন্যবাদ, ${order.customer.fullName}!` : `Thank You, ${order.customer.fullName}!`}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          {isBangla
            ? 'আপনার অর্ডারটি লিপিবদ্ধ হয়েছে। ক্যাশ অন ডেলিভারিতে দ্রুত আপনার ঠিকানায় পার্সেল পৌঁছে দেওয়ার প্রক্রিয়া শুরু হচ্ছে।'
            : 'Your order has been recorded. Our team is preparing your package for express courier dispatch with Cash on Delivery payment.'}
        </p>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
        <Link
          to={`/track-order?orderId=${order.orderNumber}`}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <Truck className="w-4 h-4" />
          <span>{isBangla ? 'অর্ডার ট্র্যাক করুন' : 'Track Order Status'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <button
          type="button"
          onClick={handlePrint}
          className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm rounded-xl border border-slate-200 shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>{isBangla ? 'রসিদ প্রিন্ট / সংরক্ষণ' : 'Print / Save Receipt'}</span>
        </button>

        <Link
          to="/shop"
          className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
        >
          <span>{isBangla ? 'আরও কেনাকাটা করুন' : 'Continue Shopping'}</span>
        </Link>
      </div>

      {/* Printable Receipt Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-8 shadow-xs print:border-none print:shadow-none print:p-0">
        {/* Order Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
          <div>
            <span className="text-slate-400 font-medium block">
              {isBangla ? 'অর্ডার নম্বর' : 'Order Number'}
            </span>
            <strong className="text-slate-900 font-black text-sm sm:text-base font-mono">
              {order.orderNumber}
            </strong>
          </div>

          <div>
            <span className="text-slate-400 font-medium block">
              {isBangla ? 'সম্ভাব্য ডেলিভারি' : 'Estimated Delivery'}
            </span>
            <strong className="text-slate-900 font-bold text-xs sm:text-sm">
              {order.estimatedDeliveryDate}
            </strong>
          </div>

          <div>
            <span className="text-slate-400 font-medium block">
              {isBangla ? 'পেমেন্ট পদ্ধতি' : 'Payment Method'}
            </span>
            <strong className="text-emerald-700 font-bold flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" />
              <span>{isBangla ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}</span>
            </strong>
          </div>

          <div>
            <span className="text-slate-400 font-medium block">
              {isBangla ? 'সর্বমোট প্রদেয়' : 'Total Payable'}
            </span>
            <strong className="text-slate-950 font-black text-sm sm:text-base">
              {formatPrice(order.total)}
            </strong>
          </div>
        </div>

        {/* Customer & Delivery Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2 p-5 rounded-2xl border border-slate-200/70 bg-white">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isBangla ? 'ডেলিভারি ঠিকানা' : 'Delivery Address'}</span>
            </h4>
            <p className="text-sm font-bold text-slate-900">{order.customer.fullName}</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              {order.customer.deliveryAddress}, {order.customer.city} {order.customer.postalCode ? `- ${order.customer.postalCode}` : ''}
            </p>
            {order.customer.deliveryNotes && (
              <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded-lg mt-2">
                <strong>{isBangla ? 'ডেলিভারি নোট:' : 'Delivery Note:'}</strong> {order.customer.deliveryNotes}
              </p>
            )}
          </div>

          <div className="space-y-2 p-5 rounded-2xl border border-slate-200/70 bg-white">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isBangla ? 'যোগাযোগের তথ্য' : 'Contact Details'}</span>
            </h4>
            <div className="space-y-1 text-xs text-slate-700">
              <p>
                {isBangla ? 'প্রধান ফোন:' : 'Primary Phone:'} <strong>{order.customer.phone}</strong>
              </p>
              {order.customer.altPhone && (
                <p>
                  {isBangla ? 'বিকল্প ফোন:' : 'Alt Phone:'} <strong>{order.customer.altPhone}</strong>
                </p>
              )}
              {order.customer.email && (
                <p>
                  {isBangla ? 'ইমেইল:' : 'Email:'} <strong>{order.customer.email}</strong>
                </p>
              )}
              <p className="text-[11px] text-slate-400 pt-1">
                {isBangla
                  ? 'ডেলিভারি রাইডার পৌঁছানোর পূর্বে এই নম্বরে কল করবেন।'
                  : 'Courier rider will call this number before arriving.'}
              </p>
            </div>
          </div>
        </div>

        {/* Itemized Breakdown Table */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Package className="w-4 h-4 text-emerald-600" />
            <span>{isBangla ? 'অর্ডারের পণ্যসমূহ' : 'Items in Your Order'}</span>
          </h4>

          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-4">{isBangla ? 'পণ্য' : 'Item'}</th>
                  <th className="py-3 px-4 text-center">{isBangla ? 'পরিমাণ' : 'Qty'}</th>
                  <th className="py-3 px-4 text-right">{isBangla ? 'মূল্য' : 'Price'}</th>
                  <th className="py-3 px-4 text-right">{isBangla ? 'মোট' : 'Total'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item, i) => (
                  <tr key={i}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded-lg bg-slate-100 border shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{item.name}</p>
                          <p className="text-[11px] text-slate-500">
                            {item.selectedColor ? `${isBangla ? 'রং' : 'Color'}: ${item.selectedColor}` : ''}{' '}
                            {item.selectedSize ? `• ${isBangla ? 'সাইজ' : 'Size'}: ${item.selectedSize}` : ''}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-semibold text-slate-700">
                      {toBnDigits(item.quantity)}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-600">
                      {formatPrice(item.price)}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="border-t border-slate-200 pt-4 flex flex-col items-end space-y-2 text-xs">
          <div className="w-64 space-y-2 text-slate-600">
            <div className="flex justify-between">
              <span>{isBangla ? 'সাবটোটাল:' : 'Subtotal:'}</span>
              <span className="font-bold text-slate-900">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>{isBangla ? 'ডেলিভারি চার্জ:' : 'Delivery Fee:'}</span>
              <span className="font-bold text-slate-900">
                {order.shippingFee === 0 ? (isBangla ? 'ফ্রি' : 'FREE') : formatPrice(order.shippingFee)}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>{isBangla ? 'ডিসকাউন্ট' : 'Discount'} ({order.couponCode || 'Promo'}):</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-black text-slate-950">
              <span>{isBangla ? 'ডেলিভারির সময় নগদ প্রদেয়:' : 'Cash Payable at Doorstep:'}</span>
              <span className="text-lg text-emerald-700">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Cash on Delivery Notice */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>{isBangla ? 'ক্যাশ অন ডেলিভারি সম্পর্কিত নির্দেশনা:' : 'Doorstep Cash on Delivery Instructions:'}</span>
          </p>
          <p className="text-[11px] text-emerald-900 leading-relaxed">
            {isBangla
              ? `আমাদের ডেলিভারি রাইডার পৌঁছানোর পর নগদ ${formatPrice(order.total)} টাকা প্রস্তুত রাখুন। পার্সেল হাতে পেয়ে প্যাকেজিং ও সিকিউরিটি সিল নিশ্চিত করে মূল্য পরিশোধ করতে পারবেন।`
              : `Please keep ${formatPrice(order.total)} in cash ready when our courier calls to deliver. You can check the package condition and verify that the security tape is intact before handing cash to the courier.`}
          </p>
        </div>
      </div>
    </div>
  );
}
