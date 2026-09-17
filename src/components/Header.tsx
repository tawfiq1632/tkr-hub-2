import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { matchesProductSearch } from '../utils/searchHelper';
import { useRouter, Link } from '../context/RouterContext';
import { formatTelUrl } from '../data/initialSettings';
import { EditPencilButton } from './EditPencilButton';
import {
  ShoppingBag,
  Search,
  Heart,
  Truck,
  Phone,
  ShieldCheck,
  Menu,
  X,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Package,
  Layers,
  HelpCircle,
  Settings,
  Languages,
  Globe,
  Download,
  Laptop,
  Lock,
  Smartphone
} from 'lucide-react';
import { AppDownloadModal } from './AppDownloadModal';
import { SecurityCenterModal } from './SecurityCenterModal';
import { usePWAInstall } from '../hooks/usePWAInstall';

export function Header() {
  const { cartCount, cartSubtotal, wishlist, products, storeSettings, openQuickEdit } = useStore();
  const { language, setLanguage, toggleLanguage, isBangla, t, formatPrice } = useLanguage();
  const contact = storeSettings.contact;
  const logo = storeSettings.logo;
  const announcement = storeSettings.announcement;
  const { pathname, navigate, currentRoute } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [appDownloadModalOpen, setAppDownloadModalOpen] = useState(false);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  // Listen for open modal events from floating buttons or quick links
  useEffect(() => {
    const handleOpenModal = () => setAppDownloadModalOpen(true);
    window.addEventListener('open-app-download-modal', handleOpenModal);
    return () => window.removeEventListener('open-app-download-modal', handleOpenModal);
  }, []);

  // Handle direct PWA install prompt or open fallback
  const handleInstallAppClick = async () => {
    if (isInstallable) {
      const res = await install();
      if (res.success) return;
    }
    setAppDownloadModalOpen(true);
  };

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered live search suggestions with Bangla & English synonym support
  const liveSuggestions = searchInput.trim().length > 1
    ? products
        .filter((p) => matchesProductSearch(p, searchInput))
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchFocused(false);
      navigate(`/shop?search=${encodeURIComponent(searchInput.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: t('nav.home', 'Home'), path: '/' },
    { label: t('nav.shop', 'Shop All'), path: '/shop' },
    { label: t('nav.gadgets', 'Gadgets'), path: '/category/gadgets' },
    { label: t('nav.clothing', 'Clothing'), path: '/category/clothing' },
    { label: t('nav.accessories', 'Accessories'), path: '/category/accessories' },
    { label: t('nav.trackOrder', 'Track Order'), path: '/track-order', highlight: true },
    { label: t('nav.about', 'About'), path: '/about' },
    { label: t('nav.contact', 'Contact'), path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <Truck className="w-3.5 h-3.5 shrink-0" />
              <span>{announcement.highlightText || 'Cash on Delivery (COD) Nationwide'}</span>
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{announcement.text || '100% Genuine Products • 7-Day Easy Return'}</span>
            </span>
            <EditPencilButton
              target="discount"
              size="xs"
              variant="dark"
              title="অফার ও ব্যানার পরিবর্তন / Change Announcement & Discount"
            />
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs">
            {contact.callSupport.enabled && contact.callSupport.value?.trim() && (
              <div className="flex items-center gap-1.5">
                <a
                  href={formatTelUrl(contact.callSupport.value)}
                  className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                >
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>{contact.callSupport.label || (isBangla ? 'হটলাইন' : 'Hotline')}: {contact.callSupport.value}</span>
                </a>
                <EditPencilButton
                  target="phone"
                  size="xs"
                  variant="dark"
                  title="ফোন নাম্বার পরিবর্তন / Change Phone"
                />
                <span className="text-slate-700">|</span>
              </div>
            )}

            {/* Language Switcher in Header */}
            <div className="flex items-center gap-1 bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700/80 rounded-lg p-0.5 transition-colors">
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  isBangla
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="বাংলা ভাষা নির্বাচন করুন"
              >
                <span>🇧🇩</span>
                <span>বাংলা</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  !isBangla
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Switch to English"
              >
                <span>🇬🇧</span>
                <span>English</span>
              </button>
              <EditPencilButton
                target="language"
                size="xs"
                variant="dark"
                title="ভাষা সেটিংস / Language Settings"
              />
            </div>

            <span className="text-slate-700 hidden sm:inline">|</span>

            {/* Install App Header Link (Triggers beforeinstallprompt or opens App modal) */}
            <button
              type="button"
              id="header-top-install-app-btn"
              onClick={handleInstallAppClick}
              className="font-bold text-[#CFA035] hover:text-amber-200 transition-colors inline-flex items-center gap-1.5 cursor-pointer bg-[#CFA035]/15 hover:bg-[#CFA035]/25 px-2.5 py-0.5 rounded-md border border-[#CFA035]/40 text-[11px]"
              title={isBangla ? 'টিকেআর হাব অ্যাপ ইনস্টল করুন (PWA)' : 'Install TKR Hub App (PWA)'}
            >
              <Download className="w-3 h-3 text-[#CFA035]" />
              <span>{isBangla ? 'অ্যাপ ইনস্টল' : 'Install App'}</span>
              {isInstallable && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>

            <span className="text-slate-700 hidden sm:inline">|</span>

            <button
              type="button"
              onClick={() => setSecurityModalOpen(true)}
              className="font-medium text-emerald-300 hover:text-emerald-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
              title={isBangla ? 'নিরাপত্তা ও গ্রাহক সুরক্ষা কেন্দ্র' : 'Security & Trust Center'}
            >
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">{isBangla ? 'নিরাপত্তা' : 'Security'}</span>
            </button>

            <span className="text-slate-700 hidden sm:inline">|</span>

            <Link
              to="/track-order"
              className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
            >
              <Package className="w-3 h-3" />
              <span>{isBangla ? 'অর্ডার ট্র্যাক' : 'Track Order'}</span>
            </Link>
            <span className="text-slate-700">|</span>
            <Link
              to="/admin"
              className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
              title="Admin Portal"
            >
              <Settings className="w-3 h-3 text-slate-400" />
              <span className="hidden lg:inline">{isBangla ? 'এডমিন' : 'Admin'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          {/* Logo with Dynamic Image & Edit Pencil */}
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/" className="flex items-center gap-2.5 group">
              {logo.mode === 'custom_image' && logo.imageUrl ? (
                <img
                  src={logo.imageUrl}
                  alt={logo.altText || logo.displayTitle || 'Store Logo'}
                  style={{ height: `${logo.logoHeight || 40}px` }}
                  className="max-h-12 max-w-[150px] object-contain rounded-lg transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform duration-200 border border-slate-700/50">
                  <span className="tracking-tighter bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent">
                    TKR
                  </span>
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-none">
                    {logo.displayTitle ? (
                      logo.displayTitle
                    ) : (
                      <>
                        TKR <span className="text-emerald-600">HUB</span>
                      </>
                    )}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 leading-tight">
                  {logo.displaySubtitle || 'Online Store'}
                </span>
              </div>
            </Link>
            <EditPencilButton
              target="logo"
              size="xs"
              variant="light"
              title="লোগো পরিবর্তন করুন / Change Store Logo"
            />
          </div>

          {/* Search Bar - Desktop */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-lg hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder={isBangla ? 'পণ্য খুঁজুন (যেমন: হেডফোন, স্মার্টওয়াচ, ব্যাগ, টি-শার্ট)...' : 'Search gadgets, headphones, watch, apparel...'}
                className="w-full bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-slate-900 text-sm rounded-xl pl-10 pr-24 py-2.5 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{isBangla ? 'খুঁজুন' : 'Search'}</span>
              </button>
            </form>

            {/* Live Autocomplete Dropdown */}
            {searchFocused && searchInput.trim().length > 1 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between border-b border-slate-100">
                  <span>{isBangla ? 'প্রস্তাবিত পণ্যসমূহ' : 'Suggested Products'}</span>
                  <span className="text-slate-400">
                    {liveSuggestions.length} {isBangla ? 'টি পাওয়া গেছে' : 'found'}
                  </span>
                </div>
                {liveSuggestions.length > 0 ? (
                  <div>
                    {liveSuggestions.map((prod) => {
                      const prodTitle = isBangla && prod.nameBn ? prod.nameBn : prod.name;
                      const prodCat = isBangla && prod.categoryNameBn ? prod.categoryNameBn : prod.categoryName;
                      return (
                        <button
                          key={prod.id}
                          type="button"
                          onClick={() => {
                            setSearchFocused(false);
                            setSearchInput('');
                            navigate(`/product/${prod.slug}`);
                          }}
                          className="w-full text-left px-3 py-2.5 flex items-center gap-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 cursor-pointer"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prodTitle}
                            className="w-10 h-10 object-cover rounded-lg bg-slate-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-slate-800 truncate">{prodTitle}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-bold text-emerald-600">{formatPrice(prod.price)}</span>
                              {prod.originalPrice > prod.price && (
                                <span className="text-[10px] text-slate-400 line-through">
                                  {formatPrice(prod.originalPrice)}
                                </span>
                              )}
                              <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                                {prodCat}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                    <div className="p-2 border-t border-slate-100 bg-slate-50/70">
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="w-full text-center text-xs font-semibold text-emerald-600 hover:text-emerald-700 py-1 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>
                          {isBangla
                            ? `"${searchInput}" সম্পর্কিত সব ফলাফল দেখুন`
                            : `View all matching results for "${searchInput}"`}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-xs text-slate-500">
                    {isBangla
                      ? `"${searchInput}" দিয়ে কোনো পণ্য পাওয়া যায়নি। "হেডফোন", "স্মার্টওয়াচ", বা "ব্যাগ" লিখে অনুসন্ধান করতে পারেন।`
                      : `No products found matching "${searchInput}". Try searching "headphones", "hoodie", or "backpack".`}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions (App Download, Security, Wishlist, Cart, Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Install App Header Button (PWA / Desktop) */}
            <button
              type="button"
              id="header-main-install-app-btn"
              onClick={handleInstallAppClick}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#CFA035] text-xs font-black transition-colors cursor-pointer border border-[#CFA035]/40 shadow-xs"
              title={isBangla ? 'ল্যাপটপ বা মোবাইলে অ্যাপ ইনস্টল করুন' : 'Install App on Laptop or Mobile'}
            >
              <Download className="w-4 h-4 text-[#CFA035]" />
              <span className="hidden lg:inline">{isBangla ? 'অ্যাপ ইনস্টল' : 'Install App'}</span>
              <span className="text-[10px] bg-[#CFA035]/20 text-[#CFA035] px-1.5 py-0.2 rounded font-black">
                PWA
              </span>
            </button>

            {/* Desktop Security Center Button */}
            <button
              type="button"
              onClick={() => setSecurityModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200/80 transition-colors cursor-pointer"
              title={isBangla ? 'উন্নতমানের নিরাপত্তা ও গ্রাহক সুরক্ষা' : 'Security & Protection Center'}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="hidden xl:inline">{isBangla ? 'সুরক্ষা' : 'Security'}</span>
            </button>

            {/* Wishlist Link */}
            <Link
              to="/shop"
              className="p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors relative hidden sm:flex items-center justify-center"
              title={isBangla ? 'পছন্দের তালিকা' : 'Saved items'}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Button */}
            <Link
              to="/cart"
              id="header-cart-button"
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white transition-all duration-200 shadow-sm"
              title={isBangla ? 'শপিং কার্ট দেখুন' : 'View Shopping Cart'}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 text-slate-950 text-[11px] font-extrabold rounded-full flex items-center justify-center border-2 border-slate-900 shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-slate-300 uppercase font-semibold leading-none">
                  {isBangla ? 'কার্ট' : 'Cart'}
                </span>
                <span className="text-xs font-bold leading-tight mt-0.5 text-emerald-300">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors md:hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={isBangla ? 'হেডফোন, ঘড়ি, টি-শার্ট, ব্যাগ ইত্যাদি খুঁজুন...' : 'Search products in TKR Hub...'}
              className="w-full bg-slate-100 text-slate-900 text-sm rounded-xl pl-9 pr-16 py-2 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1 px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-lg cursor-pointer"
            >
              {isBangla ? 'খুঁজুন' : 'Search'}
            </button>
          </form>
        </div>
      </div>

      {/* Desktop Navigation Links Bar */}
      <nav className="border-t border-slate-100 hidden md:block bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-1 text-xs font-semibold text-slate-700 py-1 overflow-x-auto no-scrollbar">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.path);

              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs font-bold'
                        : link.highlight
                        ? 'text-emerald-700 hover:bg-emerald-50 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    {link.highlight && <Truck className="w-3.5 h-3.5 text-emerald-600" />}
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl">
          {/* Mobile Language Selector */}
          <div className="p-3 bg-slate-100 rounded-2xl flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-emerald-600" />
              <span>{isBangla ? 'ভাষা পরিবর্তন (Language)' : 'Language (ভাষা)'}</span>
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  isBangla ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-slate-700'
                }`}
              >
                🇧🇩 বাংলা
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  !isBangla ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-slate-700'
                }`}
              >
                🇬🇧 English
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
              {isBangla ? 'স্টোর মেনু' : 'Store Navigation'}
            </p>
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.highlight && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      COD
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {/* Quick App Download & Security Buttons for Mobile */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id="mobile-drawer-install-app-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleInstallAppClick();
                }}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-[#0B132B] border border-[#CFA035]/50 text-[#CFA035] text-xs font-black cursor-pointer hover:bg-slate-900 transition-colors"
              >
                <Download className="w-4 h-4 text-[#CFA035]" />
                <span>{isBangla ? 'অ্যাপ ইনস্টল (PWA)' : 'Install App (PWA)'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSecurityModalOpen(true);
                }}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold cursor-pointer hover:bg-emerald-100 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{isBangla ? 'নিরাপত্তা কেন্দ্র' : 'Security'}</span>
              </button>
            </div>

            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>{isBangla ? 'এডমিন ড্যাশবোর্ড' : 'Admin Dashboard'}</span>
            </Link>
            <div className="px-3 py-2 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900 text-xs flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {isBangla
                  ? 'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি (COD) সুবিধা চালু আছে'
                  : 'Doorstep Cash on Delivery available on all orders'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* App Download & Telegram Share Modal */}
      <AppDownloadModal
        isOpen={appDownloadModalOpen}
        onClose={() => setAppDownloadModalOpen(false)}
      />

      {/* Military Grade Security Center Modal */}
      <SecurityCenterModal
        isOpen={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
      />
    </header>
  );
}
