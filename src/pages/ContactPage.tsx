import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { EditPencilButton } from '../components/EditPencilButton';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  ChevronDown,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import {
  formatWhatsAppUrl,
  formatTelUrl,
  formatMailtoUrl,
  isValidMapUrl
} from '../data/initialSettings';

export function ContactPage() {
  const { addToast, storeSettings } = useStore();
  const contact = storeSettings.contact;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('Order & Delivery Status');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !message.trim()) return;

    setSubmitted(true);
    addToast('Your inquiry has been received! Our support agent will call or email you shortly.', 'success');
  };

  const faqs = [
    {
      q: 'How does Cash on Delivery (COD) work with TKR Hub?',
      a: 'When you place an order on TKR Hub, you don’t need a credit card or digital wallet. You only pay in cash when the delivery courier physically arrives at your door with your package. You are welcome to inspect the tamper-proof security parcel before completing the payment.'
    },
    {
      q: 'What are the delivery times and charges nationwide?',
      a: 'Within central metropolitan districts (e.g. Dhaka), orders are delivered in 24 to 48 hours. For regional and outer districts, delivery takes 2 to 4 business days. Standard delivery is $4.50, but orders over $60 qualify for FREE standard delivery.'
    },
    {
      q: 'How does the 7-Day Return and Exchange policy work?',
      a: 'If your clothing size doesn’t fit, or if a gadget arrives with any factory malfunction, notify us within 7 days of receiving your order. We will dispatch an exchange courier rider directly to your address to swap the item or process a refund.'
    },
    {
      q: 'Can I track my courier rider in real time?',
      a: 'Yes! Every TKR Hub order receives a unique tracking number (e.g. TKR-88219). Visit our Track Order page at any time to see the exact milestone of your package, from warehouse inspection to doorstep transit.'
    }
  ];

  // Card visibility checks
  const isCallVisible = contact.callSupport.enabled && (contact.callSupport.value?.trim() || contact.emptyHandlingMode === 'show_message');
  const isWhatsappVisible = contact.whatsapp.enabled && (contact.whatsapp.value?.trim() || contact.emptyHandlingMode === 'show_message');
  const isEmailVisible = contact.emailSupport.enabled && (contact.emailSupport.value?.trim() || contact.emptyHandlingMode === 'show_message');
  const isOfficeVisible = contact.mainOffice.enabled && (contact.mainOffice.value?.trim() || contact.emptyHandlingMode === 'show_message');

  const visibleCardsCount = [isCallVisible, isWhatsappVisible, isEmailVisible, isOfficeVisible].filter(Boolean).length;

  const resolvedMapUrl = contact.mainOffice.mapUrl || contact.googleMapsUrl;
  const hasValidMap = isValidMapUrl(resolvedMapUrl);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            We're Here For You
          </span>
          <EditPencilButton
            target="all"
            size="xs"
            variant="light"
            title="সব যোগাযোগের তথ্য পরিবর্তন করুন / Edit All Contact Information"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Contact & Customer Care
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Have a question about your Cash on Delivery order, product sizing, or warranty service? Reach out to our dedicated support channels.
        </p>
      </div>

      {/* Contact Cards Grid - Dynamically populated from admin settings */}
      {visibleCardsCount > 0 ? (
        <div className={`grid grid-cols-1 ${
          visibleCardsCount === 1
            ? 'max-w-md mx-auto'
            : visibleCardsCount === 2
            ? 'sm:grid-cols-2 max-w-2xl mx-auto'
            : visibleCardsCount === 3
            ? 'sm:grid-cols-2 lg:grid-cols-3'
            : 'sm:grid-cols-2 lg:grid-cols-4'
        } gap-6`}>
          {/* Card 1: Call Support */}
          {isCallVisible && (
            <div id="contact-card-call" className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between transition-all hover:border-emerald-200 hover:shadow-sm relative group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <EditPencilButton
                    target="phone"
                    size="sm"
                    variant="light"
                    title="ফোন নাম্বার এডিট করুন / Edit Phone Number"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{contact.callSupport.label || 'Call Support'}</h3>
                  {contact.callSupport.shortDescription && (
                    <p className="text-xs text-slate-500 mt-0.5">{contact.callSupport.shortDescription}</p>
                  )}
                </div>

                {contact.callSupport.value?.trim() ? (
                  <a
                    href={formatTelUrl(contact.callSupport.value)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors py-1 group"
                  >
                    <span>{contact.callSupport.value}</span>
                  </a>
                ) : (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-800 flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{contact.emptyFieldMessage || 'Channel temporarily unavailable.'}</span>
                  </div>
                )}
              </div>
              {contact.businessHours && (
                <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{contact.businessHours}</span>
                </div>
              )}
            </div>
          )}

          {/* Card 2: WhatsApp Chat */}
          {isWhatsappVisible && (
            <div id="contact-card-whatsapp" className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between transition-all hover:border-emerald-200 hover:shadow-sm relative group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <EditPencilButton
                    target="whatsapp"
                    size="sm"
                    variant="light"
                    title="হোয়াটসঅ্যাপ নাম্বার এডিট করুন / Edit WhatsApp Number"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{contact.whatsapp.label || 'WhatsApp Chat'}</h3>
                  {contact.whatsapp.shortDescription && (
                    <p className="text-xs text-slate-500 mt-0.5">{contact.whatsapp.shortDescription}</p>
                  )}
                </div>

                {contact.whatsapp.value?.trim() ? (
                  <a
                    href={formatWhatsAppUrl(contact.whatsapp.value)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors py-1 group"
                  >
                    <span>{contact.whatsapp.value}</span>
                    <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                  </a>
                ) : (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-800 flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{contact.emptyFieldMessage || 'Channel temporarily unavailable.'}</span>
                  </div>
                )}
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Direct WhatsApp live chat</span>
              </div>
            </div>
          )}

          {/* Card 3: Email Support */}
          {isEmailVisible && (
            <div id="contact-card-email" className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between transition-all hover:border-emerald-200 hover:shadow-sm relative group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <EditPencilButton
                    target="email"
                    size="sm"
                    variant="light"
                    title="জিমেইল / ইমেইল এডিট করুন / Edit Gmail"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{contact.emailSupport.label || 'Email Support'}</h3>
                  {contact.emailSupport.shortDescription && (
                    <p className="text-xs text-slate-500 mt-0.5">{contact.emailSupport.shortDescription}</p>
                  )}
                </div>

                {contact.emailSupport.value?.trim() ? (
                  <a
                    href={formatMailtoUrl(contact.emailSupport.value)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors py-1 group break-all"
                  >
                    <span>{contact.emailSupport.value}</span>
                  </a>
                ) : (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-800 flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{contact.emptyFieldMessage || 'Channel temporarily unavailable.'}</span>
                  </div>
                )}
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] text-slate-400">
                <span>Official Helpdesk & Tickets</span>
              </div>
            </div>
          )}

          {/* Card 4: Main Office */}
          {isOfficeVisible && (
            <div id="contact-card-office" className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between transition-all hover:border-emerald-200 hover:shadow-sm relative group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <EditPencilButton
                    target="address"
                    size="sm"
                    variant="light"
                    title="অফিস ঠিকানা এডিট করুন / Edit Office Address"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{contact.mainOffice.label || 'Main Office'}</h3>
                  {contact.mainOffice.shortDescription && (
                    <p className="text-xs text-slate-500 mt-0.5">{contact.mainOffice.shortDescription}</p>
                  )}
                </div>

                {contact.mainOffice.value?.trim() ? (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                      {contact.mainOffice.value}
                    </p>
                    {hasValidMap && (
                      <a
                        href={resolvedMapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                      >
                        <span>View on Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-800 flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{contact.emptyFieldMessage || 'Address update in progress.'}</span>
                  </div>
                )}
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] text-slate-400">
                <span>Central Logistics & Hub</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Notice when all channels are disabled or hidden by admin */
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center max-w-xl mx-auto space-y-2">
          <HelpCircle className="w-6 h-6 text-slate-400 mx-auto" />
          <p className="text-xs sm:text-sm font-semibold text-slate-700">
            {contact.emptyFieldMessage || 'Our direct support lines are currently undergoing routine maintenance.'}
          </p>
          <p className="text-xs text-slate-500">
            Please submit the customer inquiry form below and our team will get in touch with you promptly.
          </p>
        </div>
      )}


      {/* Main Grid: Contact Inquiry Form + Delivery & Returns Policies */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="text-xl font-black text-slate-900">Send Us an Inquiry</h2>
            <p className="text-xs text-slate-500 mt-1">
              Fill in your message and our team will get back to you promptly.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-950 text-base">Message Sent Successfully!</h3>
              <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                Thank you, {fullName}. Our customer representative has received your ticket and will contact you via phone or email shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +880 1712-000000"
                    className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. tanvir@example.com"
                    className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Topic</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                  >
                    <option value="Order & Delivery Status">Order & Delivery Status</option>
                    <option value="Cash on Delivery Question">Cash on Delivery Inquiry</option>
                    <option value="Return & Size Exchange">Return & Size Exchange</option>
                    <option value="Product Technical Specifications">Product Specs & Warranty</option>
                    <option value="Wholesale / Bulk Order">Wholesale / Bulk Order</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Message</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please specify order number if applicable, along with your query..."
                  className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Col: Delivery & Return Information Details */}
        <div className="lg:col-span-5 space-y-6">
          {/* Delivery Info Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-600" />
              <span>Delivery Information</span>
            </h3>
            <div className="space-y-2 text-xs text-slate-600">
              <p>
                <strong>Inside Dhaka Metro:</strong> Delivered in 24 - 48 hours via dedicated motorcycle couriers.
              </p>
              <p>
                <strong>Regional Nationwide:</strong> Delivered in 2 - 4 business days with full parcel tracking.
              </p>
              <p>
                <strong>Free Delivery:</strong> All orders with a subtotal of $60 or higher automatically receive free standard shipping.
              </p>
            </div>
          </div>

          {/* Return Policy Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-emerald-600" />
              <span>7-Day Return & Exchange</span>
            </h3>
            <div className="space-y-2 text-xs text-slate-600">
              <p>
                <strong>Size Exchange:</strong> If clothing doesn't fit, request a size swap within 7 days.
              </p>
              <p>
                <strong>Defect Protection:</strong> Any factory defect is replaced free of cost with a brand-new unit.
              </p>
              <p>
                <strong>Condition:</strong> Products must be returned in original packaging with tags intact.
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 px-1">Frequently Asked Questions</h4>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 text-xs font-bold text-slate-900 flex items-center justify-between gap-2"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
