import React, { useState } from 'react';
import { Link } from '../context/RouterContext';
import { useStore } from '../context/StoreContext';
import { EditPencilButton } from './EditPencilButton';
import {
  formatWhatsAppUrl,
  formatTelUrl,
  formatMailtoUrl,
  isValidMapUrl
} from '../data/initialSettings';
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Clock,
  Phone,
  Mail,
  MapPin,
  Send,
  Heart,
  ExternalLink,
  CheckCircle2,
  MessageSquare,
  Download,
  Laptop
} from 'lucide-react';
import { AppDownloadModal } from './AppDownloadModal';
import { SecurityCenterModal } from './SecurityCenterModal';

export function Footer() {
  const { addToast, storeSettings } = useStore();
  const contact = storeSettings.contact;
  const logo = storeSettings.logo;
  const promo = storeSettings.promo;
  const socialLinks = storeSettings.socialLinks;
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setSubscribed(true);
      addToast(`Thank you! Use promo code ${promo.discountCode || 'TKR10'} for ${promo.discountPercentage || 10}% off your order!`, 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800/80">
      {/* Trust & Guarantee Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/70">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Cash on Delivery (COD)</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Pay in cash right when the courier hands you your package. Zero advance risk.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/70">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Genuine Quality</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Direct from verified manufacturers with factory inspection and full warranty.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/70">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">7-Day Easy Returns</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Hassle-free replacement or refund if product doesn’t fit or has any defect.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/70">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">24-48h Express Shipping</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Fast courier dispatch nationwide with real-time SMS & web tracking updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2.5 group">
                {logo.mode === 'custom_image' && logo.imageUrl ? (
                  <img
                    src={logo.imageUrl}
                    alt={logo.altText || logo.displayTitle || 'TKR Hub'}
                    style={{ height: `${logo.logoHeight || 40}px` }}
                    className="max-h-12 max-w-[140px] object-contain rounded-lg bg-white/10 p-0.5"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white font-extrabold text-xl border border-slate-700">
                    <span className="tracking-tighter bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
                      TKR
                    </span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-extrabold text-2xl text-white tracking-tight leading-none">
                    {logo.displayTitle ? (
                      logo.displayTitle
                    ) : (
                      <>
                        TKR <span className="text-emerald-400">HUB</span>
                      </>
                    )}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 leading-tight">
                    {logo.displaySubtitle || 'Online Store'}
                  </span>
                </div>
              </Link>
              <EditPencilButton
                target="logo"
                size="xs"
                variant="dark"
                title="লোগো পরিবর্তন করুন / Change Store Logo"
              />
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              TKR Hub is your premier destination for next-generation tech gadgets, durable everyday apparel, and functional accessories. We believe online shopping should be reliable, fast, and 100% transparent with Cash-on-Delivery convenience.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xs font-semibold text-white uppercase tracking-wider">
                  Join our VIP Club for {promo.discountPercentage || 10}% Off
                </p>
                <EditPencilButton
                  target="discount"
                  size="xs"
                  variant="dark"
                  title="ডিসকাউন্ট পরিবর্তন করুন / Change Discount"
                />
              </div>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs py-2 px-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You're subscribed! Use code <strong>{promo.discountCode || 'TKR10'}</strong> for {promo.discountPercentage || 10}% discount.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center max-w-md">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-l-xl px-3.5 py-2.5 focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-r-xl transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Shop Categories</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/category/gadgets" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Gadgets & Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/clothing" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Apparel & Streetwear
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Everyday Accessories
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop?featured=true" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Trending Hot Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Help & Information</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/track-order" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Track Your Order</span>
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="text-slate-400 hover:text-white transition-colors">
                  Cash on Delivery Guide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Shipping & Delivery Info
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setDownloadModalOpen(true)}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Laptop Web App</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setSecurityModalOpen(true)}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Security & Anti-Fraud Center</span>
                </button>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Return & Exchange Policy
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About TKR Hub
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Customer Support
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-500 hover:text-slate-300 transition-colors text-xs">
                  Admin Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white">Get In Touch</h5>
              <EditPencilButton
                target="all"
                size="xs"
                variant="dark"
                title="যোগাযোগের তথ্য পরিবর্তন করুন / Edit Contact Information"
              />
            </div>
            <ul className="space-y-3 text-xs text-slate-400">
              {contact.mainOffice.enabled && contact.mainOffice.value?.trim() && (
                <li className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span>{contact.mainOffice.value}</span>
                      {isValidMapUrl(contact.mainOffice.mapUrl || contact.googleMapsUrl) && (
                        <a
                          href={contact.mainOffice.mapUrl || contact.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-emerald-400 hover:text-emerald-300 block mt-0.5"
                        >
                          View Map →
                        </a>
                      )}
                    </div>
                  </div>
                  <EditPencilButton
                    target="address"
                    size="xs"
                    variant="dark"
                    title="অফিস ঠিকানা পরিবর্তন করুন / Edit Address"
                  />
                </li>
              )}

              {contact.callSupport.enabled && contact.callSupport.value?.trim() && (
                <li className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <a href={formatTelUrl(contact.callSupport.value)} className="hover:text-white transition-colors truncate">
                      {contact.callSupport.label || 'Hotline'}: {contact.callSupport.value}
                    </a>
                  </div>
                  <EditPencilButton
                    target="phone"
                    size="xs"
                    variant="dark"
                    title="ফোন নাম্বার পরিবর্তন করুন / Edit Phone"
                  />
                </li>
              )}

              {contact.whatsapp.enabled && contact.whatsapp.value?.trim() && (
                <li className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    <a
                      href={formatWhatsAppUrl(contact.whatsapp.value)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors truncate"
                    >
                      {contact.whatsapp.label || 'WhatsApp'}: {contact.whatsapp.value}
                    </a>
                  </div>
                  <EditPencilButton
                    target="whatsapp"
                    size="xs"
                    variant="dark"
                    title="হোয়াটসঅ্যাপ নাম্বার পরিবর্তন করুন / Edit WhatsApp"
                  />
                </li>
              )}

              {contact.emailSupport.enabled && contact.emailSupport.value?.trim() && (
                <li className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                    <a href={formatMailtoUrl(contact.emailSupport.value)} className="hover:text-white transition-colors break-all">
                      {contact.emailSupport.value}
                    </a>
                  </div>
                  <EditPencilButton
                    target="email"
                    size="xs"
                    variant="dark"
                    title="জিমেইল / ইমেইল পরিবর্তন করুন / Edit Gmail"
                  />
                </li>
              )}

              {contact.businessHours && (
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{contact.businessHours}</span>
                </li>
              )}
            </ul>

            {/* Social Media Links */}
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  Follow Us & Links
                </p>
                <EditPencilButton
                  target="links"
                  size="xs"
                  variant="dark"
                  title="সোশ্যাল লিংক ও ওয়েবসাইট পরিবর্তন করুন / Edit Links"
                />
              </div>
              <div className="flex items-center gap-2.5">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 border border-slate-800 flex items-center justify-center transition-all"
                  >
                    <span className="font-bold text-xs">f</span>
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 border border-slate-800 flex items-center justify-center transition-all"
                  >
                    <span className="font-bold text-xs">ig</span>
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="X Twitter"
                    className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 border border-slate-800 flex items-center justify-center transition-all"
                  >
                    <span className="font-bold text-xs">x</span>
                  </a>
                )}
                {socialLinks.youtube && (
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 border border-slate-800 flex items-center justify-center transition-all"
                  >
                    <span className="font-bold text-xs">yt</span>
                  </a>
                )}
                {socialLinks.website && (
                  <a
                    href={socialLinks.website}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Website"
                    className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 border border-slate-800 flex items-center justify-center transition-all"
                    title={socialLinks.website}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-6 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} TKR Hub Online Store. All rights reserved.</p>
        <div className="flex items-center gap-4 text-xs">
          <button
            type="button"
            onClick={() => setSecurityModalOpen(true)}
            className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-Bit SSL Secured</span>
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setDownloadModalOpen(true)}
            className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Portable Web App</span>
          </button>
        </div>
      </div>

      {/* App Download Modal */}
      <AppDownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

      {/* Security Center Modal */}
      <SecurityCenterModal
        isOpen={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
      />
    </footer>
  );
}
