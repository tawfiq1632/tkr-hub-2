import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { StoreSettings, QuickEditTarget } from '../types';
import {
  formatWhatsAppUrl,
  formatTelUrl,
  formatMailtoUrl,
  isValidMapUrl
} from '../data/initialSettings';
import {
  X,
  Save,
  Image as ImageIcon,
  Mail,
  Phone,
  MessageSquare,
  Tag,
  Share2,
  MapPin,
  Upload,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Sliders,
  Check,
  AlertCircle,
  Languages
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function QuickEditModal() {
  const {
    quickEditTarget,
    closeQuickEdit,
    storeSettings,
    updateStoreSettings,
    addToast
  } = useStore();
  const { language, setLanguage } = useLanguage();

  const [activeTab, setActiveTab] = useState<QuickEditTarget>('logo');
  const [draft, setDraft] = useState<StoreSettings>(() => storeSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync draft and active tab whenever modal opens
  useEffect(() => {
    if (quickEditTarget) {
      setDraft(storeSettings);
      if (quickEditTarget === 'all') {
        setActiveTab('logo');
      } else {
        setActiveTab(quickEditTarget);
      }
      setFileUploadError(null);
    }
  }, [quickEditTarget, storeSettings]);

  if (!quickEditTarget) return null;

  // Handle local image file upload (converts to base64 Data URL)
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFileUploadError('Please select a valid image file (PNG, JPG, SVG, WebP, etc.).');
      return;
    }

    // Limit to reasonable size (~4MB)
    if (file.size > 4 * 1024 * 1024) {
      setFileUploadError('Image file is too large. Please select an image under 4MB.');
      return;
    }

    setFileUploadError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setDraft((prev) => ({
          ...prev,
          logo: {
            ...prev.logo,
            mode: 'custom_image',
            imageUrl: dataUrl
          }
        }));
        addToast('Logo image loaded! Click "Save Changes" to apply.', 'info', 'Image Ready');
      }
    };
    reader.onerror = () => {
      setFileUploadError('Failed to read image file. Please try again or paste a URL.');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    const success = await updateStoreSettings(draft);
    setIsSaving(false);
    if (success) {
      closeQuickEdit();
    }
  };

  const tabs: { id: QuickEditTarget; label: string; icon: React.ElementType }[] = [
    { id: 'language', label: 'Language / ভাষা সেটিংস', icon: Languages },
    { id: 'logo', label: 'Store Logo & Brand', icon: ImageIcon },
    { id: 'email', label: 'Gmail & Support Email', icon: Mail },
    { id: 'phone', label: 'Hotline & Phone', icon: Phone },
    { id: 'whatsapp', label: 'WhatsApp Chat', icon: MessageSquare },
    { id: 'discount', label: 'Discounts & Promo', icon: Tag },
    { id: 'links', label: 'Website & Social Links', icon: Share2 },
    { id: 'address', label: 'Office & Maps', icon: MapPin }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sliders className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg tracking-tight">
                  Quick Edit Information & Customizer
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-xs text-slate-400">
                লোগো, জিমেইল, ফোন নাম্বার, ডিসকাউন্ট ও লিংক যেকোনো সময় পরিবর্তন করুন
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeQuickEdit}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector Strip */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-4 pt-2 overflow-x-auto shrink-0 flex gap-1.5 scrollbar-thin">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                  isActive
                    ? 'bg-white text-emerald-700 border-emerald-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 0: LANGUAGE SETTINGS & BILINGUAL SEARCH */}
          {activeTab === 'language' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="bg-emerald-50/90 border border-emerald-200/90 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
                <span className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs shrink-0 mt-0.5">
                  <Languages className="w-5 h-5" />
                </span>
                <div className="text-xs text-emerald-950 space-y-1.5">
                  <h4 className="font-extrabold text-sm text-emerald-950">
                    দ্বিভাষিক সেটিংস সিস্টেম (Bangladeshi Website & Tourist English Mode)
                  </h4>
                  <p className="text-emerald-900 leading-relaxed">
                    এটি একটি খাঁটি বাংলাদেশি ই-কমার্স ওয়েবসাইট। বাংলাদেশের সাধারণ ক্রেতাদের জন্য বাংলা ভাষাকে মূল অগ্রাধিকার দেওয়া হয়েছে এবং বাংলাদেশে আসা বিদেশি পর্যটক বা আন্তর্জাতিক ভিজিটরদের সুবিধার জন্য আন্তর্জাতিক ইংরেজি ভাষাও রাখা হয়েছে।
                  </p>
                </div>
              </div>

              {/* Active Language Switcher Cards */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  সক্রিয় ভাষা পরিবর্তন করুন (Switch Active Storefront Language)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Bangla Option */}
                  <div
                    onClick={() => {
                      setLanguage('bn');
                      setDraft((prev) => ({ ...prev, defaultLanguage: 'bn' }));
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      language === 'bn'
                        ? 'border-emerald-600 bg-emerald-50/40 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🇧🇩</span>
                        <div>
                          <p className="font-bold text-sm text-slate-900">বাংলা (Bengali)</p>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                            ডিফল্ট ও মূল ভাষা
                          </span>
                        </div>
                      </div>
                      {language === 'bn' && (
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      বাংলাদেশের স্থানীয় ক্রেতাদের জন্য সম্পূর্ণ ইন্টারফেস বাংলায় প্রদর্শিত হবে। পণ্যের বাংলা নাম, ফিচার ও বাংলা অঙ্কে দাম (৳)।
                    </p>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">স্ট্যাটাস:</span>
                      <span className={`font-bold ${language === 'bn' ? 'text-emerald-700' : 'text-slate-500'}`}>
                        {language === 'bn' ? 'সক্রিয় (Active)' : 'নিষ্ক্রিয়'}
                      </span>
                    </div>
                  </div>

                  {/* English Option */}
                  <div
                    onClick={() => {
                      setLanguage('en');
                      setDraft((prev) => ({ ...prev, defaultLanguage: 'en' }));
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      language === 'en'
                        ? 'border-emerald-600 bg-emerald-50/40 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🇬🇧</span>
                        <div>
                          <p className="font-bold text-sm text-slate-900">English (International)</p>
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded-md">
                            For Foreign Tourists
                          </span>
                        </div>
                      </div>
                      {language === 'en' && (
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      Designed for foreign travelers & expats visiting Bangladesh. Shows English product titles, specifications, and USD/BDT conversions.
                    </p>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Status:</span>
                      <span className={`font-bold ${language === 'en' ? 'text-emerald-700' : 'text-slate-500'}`}>
                        {language === 'en' ? 'Active (সক্রিয়)' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bilingual Search Info & Verification */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-xs text-emerald-400 uppercase tracking-wider">
                      দ্বিভাষিক সার্চ ও সিনোনিম সাপোর্ট (Smart Bilingual Search)
                    </span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                    সক্রিয়
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  বাংলাদেশের ব্যবহারকারীরা সার্চ বক্সে বাংলা বা ইংরেজি যেকোনো ভাষায় সার্চ দিলেই সঠিক পণ্য খুঁজে পাবেন:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                    <p className="text-emerald-400 font-bold">"হেডফোন"</p>
                    <p className="text-[11px] text-slate-400">Headphones খুঁজে পাবে</p>
                  </div>
                  <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                    <p className="text-emerald-400 font-bold">"ঘড়ি" / "স্মার্টওয়াচ"</p>
                    <p className="text-[11px] text-slate-400">Smartwatch খুঁজে পাবে</p>
                  </div>
                  <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                    <p className="text-emerald-400 font-bold">"গেঞ্জি" / "টি-শার্ট"</p>
                    <p className="text-[11px] text-slate-400">T-Shirts খুঁজে পাবে</p>
                  </div>
                  <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                    <p className="text-emerald-400 font-bold">"ব্যাগ" / "ব্যাকপ্যাক"</p>
                    <p className="text-[11px] text-slate-400">Tactical Bag খুঁজে পাবে</p>
                  </div>
                  <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                    <p className="text-emerald-400 font-bold">"চার্জার" / "পাওয়ার ব্যাংক"</p>
                    <p className="text-[11px] text-slate-400">MagPower খুঁজে পাবে</p>
                  </div>
                  <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                    <p className="text-emerald-400 font-bold">"হুডি" / "জ্যাকেট"</p>
                    <p className="text-[11px] text-slate-400">Hoodie খুঁজে পাবে</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: LOGO & BRAND */}
          {activeTab === 'logo' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950 space-y-1">
                  <p className="font-bold">
                    আপনার নিজের তৈরি করা লোগো ছবি আপলোড করুন (Upload Your Custom Logo)
                  </p>
                  <p className="text-emerald-800">
                    এখানে ছবি আপলোড করলে বা ছবির লিংক দিলে তা সঙ্গে সঙ্গে ওয়েবসাইটের হেডার, ফুটার এবং মোবাইল মেন্যুতে সেট হয়ে যাবে।
                  </p>
                </div>
              </div>

              {/* Logo Mode Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  onClick={() =>
                    setDraft((p) => ({
                      ...p,
                      logo: { ...p.logo, mode: 'custom_image' }
                    }))
                  }
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    draft.logo.mode === 'custom_image'
                      ? 'border-emerald-600 bg-emerald-50/40 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="logoMode"
                    checked={draft.logo.mode === 'custom_image'}
                    onChange={() => {}}
                    className="mt-1 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-xs text-slate-900">Custom Image Logo (নিজের তৈরি ছবি)</p>
                    <p className="text-[11px] text-slate-500">
                      Display your custom photo/image as the primary store logo.
                    </p>
                  </div>
                </label>

                <label
                  onClick={() =>
                    setDraft((p) => ({
                      ...p,
                      logo: { ...p.logo, mode: 'default_badge' }
                    }))
                  }
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    draft.logo.mode === 'default_badge'
                      ? 'border-emerald-600 bg-emerald-50/40 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="logoMode"
                    checked={draft.logo.mode === 'default_badge'}
                    onChange={() => {}}
                    className="mt-1 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-xs text-slate-900">Default Brand Badge (TKR Hub Badge)</p>
                    <p className="text-[11px] text-slate-500">
                      Clean dark typography badge with emerald accents.
                    </p>
                  </div>
                </label>
              </div>

              {/* Upload & Image Controls */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-7 space-y-4">
                  {/* File Upload Box */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-800">
                      Upload Logo Image File (ডিভাইস থেকে ছবি আপলোড করুন)
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/20 rounded-2xl p-6 text-center cursor-pointer transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-600 group-hover:text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
                        <Upload className="w-6 h-6 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                      <p className="text-xs font-bold text-slate-800">
                        Click to browse or drop your logo image here
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Supports PNG, JPG, JPEG, SVG, WebP (Max 4MB)
                      </p>
                    </div>

                    {fileUploadError && (
                      <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{fileUploadError}</span>
                      </p>
                    )}
                  </div>

                  {/* Or Image URL */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Or Paste Image URL (অথবা অনলাইন ছবির লিঙ্ক দিন)
                    </label>
                    <input
                      type="url"
                      value={draft.logo.imageUrl || ''}
                      onChange={(e) =>
                        setDraft((p) => ({
                          ...p,
                          logo: { ...p.logo, imageUrl: e.target.value, mode: 'custom_image' }
                        }))
                      }
                      placeholder="https://example.com/my-store-logo.png"
                      className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none font-mono"
                    />
                  </div>

                  {/* Brand Titles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800">
                        Store Name (দোকানের নাম)
                      </label>
                      <input
                        type="text"
                        value={draft.logo.displayTitle || draft.storeName}
                        onChange={(e) =>
                          setDraft((p) => ({
                            ...p,
                            storeName: e.target.value,
                            logo: { ...p.logo, displayTitle: e.target.value }
                          }))
                        }
                        placeholder="TKR HUB"
                        className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none font-bold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800">
                        Subtitle / Tagline (ট্যাগলাইন)
                      </label>
                      <input
                        type="text"
                        value={draft.logo.displaySubtitle || ''}
                        onChange={(e) =>
                          setDraft((p) => ({
                            ...p,
                            logo: { ...p.logo, displaySubtitle: e.target.value }
                          }))
                        }
                        placeholder="Online Store"
                        className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none"
                      />
                    </div>
                  </div>

                  {/* Logo Height Slider */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Logo Display Height (ছবির আকার)</span>
                      <span className="text-emerald-700 font-mono">
                        {draft.logo.logoHeight || 40}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="28"
                      max="64"
                      value={draft.logo.logoHeight || 40}
                      onChange={(e) =>
                        setDraft((p) => ({
                          ...p,
                          logo: { ...p.logo, logoHeight: Number(e.target.value) }
                        }))
                      }
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Logo Live Previews */}
                <div className="md:col-span-5 space-y-4">
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/80 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Live Preview (হেডারে যেমন দেখাবে)
                    </span>

                    {/* Light preview */}
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
                      {draft.logo.mode === 'custom_image' && draft.logo.imageUrl ? (
                        <img
                          src={draft.logo.imageUrl}
                          alt="Preview"
                          style={{ height: `${draft.logo.logoHeight || 40}px` }}
                          className="max-h-12 max-w-[120px] object-contain rounded-lg border border-slate-100"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold text-xl flex items-center justify-center border border-slate-700">
                          <span className="bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
                            TKR
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="font-extrabold text-lg text-slate-900 tracking-tight leading-tight">
                          {draft.logo.displayTitle || 'TKR HUB'}
                        </div>
                        <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                          {draft.logo.displaySubtitle || 'Online Store'}
                        </div>
                      </div>
                    </div>

                    {/* Dark Preview (Footer & Hero) */}
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white shadow-xs flex items-center gap-3">
                      {draft.logo.mode === 'custom_image' && draft.logo.imageUrl ? (
                        <img
                          src={draft.logo.imageUrl}
                          alt="Preview"
                          style={{ height: `${draft.logo.logoHeight || 40}px` }}
                          className="max-h-12 max-w-[120px] object-contain rounded-lg bg-white/10 p-0.5"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-slate-800 text-white font-extrabold text-xl flex items-center justify-center border border-slate-700">
                          <span className="bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
                            TKR
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="font-extrabold text-lg text-white tracking-tight leading-tight">
                          {draft.logo.displayTitle || 'TKR HUB'}
                        </div>
                        <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                          {draft.logo.displaySubtitle || 'Online Store'}
                        </div>
                      </div>
                    </div>

                    {draft.logo.imageUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setDraft((p) => ({
                            ...p,
                            logo: {
                              ...p.logo,
                              imageUrl: '',
                              mode: 'default_badge'
                            }
                          }))
                        }
                        className="text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer pt-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Remove Custom Photo & Reset to Default</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GMAIL & EMAIL SUPPORT */}
          {activeTab === 'email' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950 space-y-1">
                  <p className="font-bold">Gmail / Support Email Configuration</p>
                  <p className="text-emerald-800">
                    এখানে আপনার জিমেইল (যেমন <code>tawfiqramim@gmail.com</code>) বা অফিসিয়াল সাপোর্ট ইমেইল সেট করুন।
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-w-xl">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Email Address / Gmail (আপনার জিমেইল বা সাপোর্ট ইমেইল)
                  </label>
                  <input
                    type="email"
                    value={draft.contact.emailSupport.value || ''}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        contact: {
                          ...p.contact,
                          emailSupport: { ...p.contact.emailSupport, value: e.target.value }
                        }
                      }))
                    }
                    placeholder="e.g. tawfiqramim@gmail.com or support@tkrhub.com"
                    className="w-full text-sm bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-3 outline-none font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Label (লেবেল)
                  </label>
                  <input
                    type="text"
                    value={draft.contact.emailSupport.label || ''}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        contact: {
                          ...p.contact,
                          emailSupport: { ...p.contact.emailSupport, label: e.target.value }
                        }
                      }))
                    }
                    placeholder="Email Support"
                    className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Short Description (সংক্ষিপ্ত বিবরণ)
                  </label>
                  <input
                    type="text"
                    value={draft.contact.emailSupport.shortDescription || ''}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        contact: {
                          ...p.contact,
                          emailSupport: { ...p.contact.emailSupport, shortDescription: e.target.value }
                        }
                      }))
                    }
                    placeholder="Replies within 4 hours • Corporate & warranty inquiries"
                    className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={draft.contact.emailSupport.enabled}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        contact: {
                          ...p.contact,
                          emailSupport: { ...p.contact.emailSupport, enabled: e.target.checked }
                        }
                      }))
                    }
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Enable email support channel across the site
                  </span>
                </label>

                {draft.contact.emailSupport.value && (
                  <div className="pt-2">
                    <a
                      href={formatMailtoUrl(draft.contact.emailSupport.value)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Test mailto: {draft.contact.emailSupport.value}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PHONE & HOTLINE */}
          {activeTab === 'phone' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950 space-y-1">
                  <p className="font-bold">Hotline & Customer Call Support</p>
                  <p className="text-emerald-800">
                    হেডার, ফুটার ও ট্র্যাকিং পেজের হেল্পলাইন ফোন নাম্বার এখানে পরিবর্তন করুন।
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-w-xl">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Phone / Hotline Number (মোবাইল / হেল্পলাইন নাম্বার)
                  </label>
                  <input
                    type="text"
                    value={draft.contact.callSupport.value || ''}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        contact: {
                          ...p.contact,
                          callSupport: { ...p.contact.callSupport, value: e.target.value }
                        }
                      }))
                    }
                    placeholder="+880 1700-857482"
                    className="w-full text-sm bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-3 outline-none font-mono font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Label (লেবেল)
                  </label>
                  <input
                    type="text"
                    value={draft.contact.callSupport.label || ''}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        contact: {
                          ...p.contact,
                          callSupport: { ...p.contact.callSupport, label: e.target.value }
                        }
                      }))
                    }
                    placeholder="Hotline / Call Support"
                    className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Business Hours (কাজের সময়)
                  </label>
                  <input
                    type="text"
                    value={draft.contact.businessHours || ''}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        contact: { ...p.contact, businessHours: e.target.value }
                      }))
                    }
                    placeholder="Mon – Sun: 9:00 AM – 10:00 PM"
                    className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={draft.contact.callSupport.enabled}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        contact: {
                          ...p.contact,
                          callSupport: { ...p.contact.callSupport, enabled: e.target.checked }
                        }
                      }))
                    }
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Enable phone call support on website
                  </span>
                </label>

                {draft.contact.callSupport.value && (
                  <div className="pt-2">
                    <a
                      href={formatTelUrl(draft.contact.callSupport.value)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Test Call: {draft.contact.callSupport.value}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: WHATSAPP CHAT */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950 space-y-1">
                  <p className="font-bold">WhatsApp Live Chat Number</p>
                  <p className="text-emerald-800">
                    এখানে কান্ট্রি কোড সহ আপনার হোয়াটসঅ্যাপ নাম্বার দিন। সিস্টেম স্বয়ংক্রিয়ভাবে <code>https://wa.me/</code> লিংক তৈরি করবে।
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-w-xl">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    WhatsApp Number (হোয়াটসঅ্যাপ নাম্বার)
                  </label>
                  <input
                    type="text"
                    value={draft.contact.whatsapp.value || ''}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        contact: {
                          ...p.contact,
                          whatsapp: { ...p.contact.whatsapp, value: e.target.value }
                        }
                      }))
                    }
                    placeholder="+880 1819-857482"
                    className="w-full text-sm bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-3 outline-none font-mono font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Label (লেবেল)
                  </label>
                  <input
                    type="text"
                    value={draft.contact.whatsapp.label || ''}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        contact: {
                          ...p.contact,
                          whatsapp: { ...p.contact.whatsapp, label: e.target.value }
                        }
                      }))
                    }
                    placeholder="WhatsApp Chat"
                    className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Short Description (সংক্ষিপ্ত বিবরণ)
                  </label>
                  <input
                    type="text"
                    value={draft.contact.whatsapp.shortDescription || ''}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        contact: {
                          ...p.contact,
                          whatsapp: { ...p.contact.whatsapp, shortDescription: e.target.value }
                        }
                      }))
                    }
                    placeholder="Typical reply in 15 mins • Live agent"
                    className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={draft.contact.whatsapp.enabled}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        contact: {
                          ...p.contact,
                          whatsapp: { ...p.contact.whatsapp, enabled: e.target.checked }
                        }
                      }))
                    }
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Enable WhatsApp support button on website
                  </span>
                </label>

                {draft.contact.whatsapp.value && (
                  <div className="pt-2">
                    <a
                      href={formatWhatsAppUrl(draft.contact.whatsapp.value)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Test WhatsApp Link: {formatWhatsAppUrl(draft.contact.whatsapp.value)}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: DISCOUNTS & PROMO CODES */}
          {activeTab === 'discount' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3">
                <Tag className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950 space-y-1">
                  <p className="font-bold">Discounts, Coupon Codes & Promo Banners</p>
                  <p className="text-emerald-800">
                    ডিসকাউন্ট অফার, প্রোমো কোড এবং শীর্ষ ব্যানার মেসেজ যেকোনো সময় পরিবর্তন করুন।
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-2">
                    Coupon & Discount Rates
                  </h4>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Promo Code (কুপন কোড)
                    </label>
                    <input
                      type="text"
                      value={draft.promo.discountCode || ''}
                      onChange={(e) =>
                        setDraft((p) => ({
                          ...p,
                          promo: { ...p.promo, discountCode: e.target.value.toUpperCase() }
                        }))
                      }
                      placeholder="TKR10"
                      className="w-full text-sm bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none font-mono font-black tracking-wider uppercase"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Discount Percentage (ডিসকাউন্ট শতাংশ %)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="90"
                        value={draft.promo.discountPercentage || 10}
                        onChange={(e) =>
                          setDraft((p) => ({
                            ...p,
                            promo: { ...p.promo, discountPercentage: Number(e.target.value) }
                          }))
                        }
                        className="w-32 text-sm bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none font-bold"
                      />
                      <span className="text-sm font-bold text-slate-600">% OFF</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Discount Label / Tagline
                    </label>
                    <input
                      type="text"
                      value={draft.promo.discountLabel || ''}
                      onChange={(e) =>
                        setDraft((p) => ({
                          ...p,
                          promo: { ...p.promo, discountLabel: e.target.value }
                        }))
                      }
                      placeholder="10% OFF with code TKR10"
                      className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Free Shipping Minimum Order ($)
                    </label>
                    <input
                      type="number"
                      step="1"
                      value={draft.freeShippingThreshold || 60}
                      onChange={(e) =>
                        setDraft((p) => ({
                          ...p,
                          freeShippingThreshold: Number(e.target.value)
                        }))
                      }
                      className="w-36 text-sm bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-2">
                    Banners & Hero Headlines
                  </h4>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Top Announcement Bar Headline
                    </label>
                    <input
                      type="text"
                      value={draft.announcement.highlightText || ''}
                      onChange={(e) =>
                        setDraft((p) => ({
                          ...p,
                          announcement: { ...p.announcement, highlightText: e.target.value }
                        }))
                      }
                      placeholder="Cash on Delivery (COD) Nationwide"
                      className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Top Announcement Bar Subtext
                    </label>
                    <input
                      type="text"
                      value={draft.announcement.text || ''}
                      onChange={(e) =>
                        setDraft((p) => ({
                          ...p,
                          announcement: { ...p.announcement, text: e.target.value }
                        }))
                      }
                      placeholder="100% Genuine Products • 7-Day Easy Return"
                      className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Hero Section Offer Badge Text
                    </label>
                    <input
                      type="text"
                      value={draft.promo.heroBadgeText || ''}
                      onChange={(e) =>
                        setDraft((p) => ({
                          ...p,
                          promo: { ...p.promo, heroBadgeText: e.target.value }
                        }))
                      }
                      placeholder="NEW COLLECTION 2026 • DOORSTEP CASH ON DELIVERY"
                      className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none font-semibold text-emerald-700"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Hero Headline Prefix
                    </label>
                    <input
                      type="text"
                      value={draft.promo.bannerHeadline || ''}
                      onChange={(e) =>
                        setDraft((p) => ({
                          ...p,
                          promo: { ...p.promo, bannerHeadline: e.target.value }
                        }))
                      }
                      placeholder="Next-Gen Tech & Streetwear at"
                      className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: WEBSITE & SOCIAL LINKS */}
          {activeTab === 'links' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3">
                <Share2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950 space-y-1">
                  <p className="font-bold">Website & Social Media Channels</p>
                  <p className="text-emerald-800">
                    এখানে আপনার ফেসবুক পেজ, ইনস্টাগ্রাম, ইউটিউব চ্যানেল এবং অফিসিয়াল ওয়েবসাইটের লিঙ্ক দিন।
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-w-xl">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Facebook Page URL
                  </label>
                  <input
                    type="url"
                    value={draft.socialLinks.facebook || ''}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        socialLinks: { ...p.socialLinks, facebook: e.target.value }
                      }))
                    }
                    placeholder="https://facebook.com/your-page"
                    className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Instagram Profile URL
                  </label>
                  <input
                    type="url"
                    value={draft.socialLinks.instagram || ''}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        socialLinks: { ...p.socialLinks, instagram: e.target.value }
                      }))
                    }
                    placeholder="https://instagram.com/your-handle"
                    className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    YouTube Channel URL
                  </label>
                  <input
                    type="url"
                    value={draft.socialLinks.youtube || ''}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        socialLinks: { ...p.socialLinks, youtube: e.target.value }
                      }))
                    }
                    placeholder="https://youtube.com/@your-channel"
                    className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    X (Twitter) Profile URL
                  </label>
                  <input
                    type="url"
                    value={draft.socialLinks.twitter || ''}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        socialLinks: { ...p.socialLinks, twitter: e.target.value }
                      }))
                    }
                    placeholder="https://x.com/your-handle"
                    className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Website Address URL
                  </label>
                  <input
                    type="url"
                    value={draft.socialLinks.website || ''}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        socialLinks: { ...p.socialLinks, website: e.target.value }
                      }))
                    }
                    placeholder="https://tkrhub.com"
                    className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: OFFICE & MAPS */}
          {activeTab === 'address' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950 space-y-1">
                  <p className="font-bold">Main Office Address & Google Maps Location</p>
                  <p className="text-emerald-800">
                    ফুটার এবং কনটাক্ট পেজের অফিস ঠিকানা ও গুগল ম্যাপ লিংক এখানে সেট করুন।
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-w-xl">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Physical Address (অফিস বা ওয়্যারহাউজ ঠিকানা)
                  </label>
                  <textarea
                    rows={3}
                    value={draft.contact.mainOffice.value || ''}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        contact: {
                          ...p.contact,
                          mainOffice: { ...p.contact.mainOffice, value: e.target.value }
                        }
                      }))
                    }
                    placeholder="House 42, Road 11, Block D, Banani Commercial Area, Dhaka - 1213"
                    className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-3 outline-none leading-relaxed font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Google Maps Link URL (গুগল ম্যাপ লিঙ্ক)
                  </label>
                  <input
                    type="url"
                    value={draft.contact.googleMapsUrl || draft.contact.mainOffice.mapUrl || ''}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        contact: {
                          ...p.contact,
                          googleMapsUrl: e.target.value,
                          mainOffice: { ...p.contact.mainOffice, mapUrl: e.target.value }
                        }
                      }))
                    }
                    placeholder="https://maps.google.com/?q=..."
                    className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Short Description (সংক্ষিপ্ত বিবরণ)
                  </label>
                  <input
                    type="text"
                    value={draft.contact.mainOffice.shortDescription || ''}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        contact: {
                          ...p.contact,
                          mainOffice: { ...p.contact.mainOffice, shortDescription: e.target.value }
                        }
                      }))
                    }
                    placeholder="Central Logistics & Fulfillment Warehouse #01"
                    className="w-full text-xs bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl p-2.5 outline-none"
                  />
                </div>

                {isValidMapUrl(draft.contact.googleMapsUrl || draft.contact.mainOffice.mapUrl) && (
                  <div className="pt-2">
                    <a
                      href={draft.contact.googleMapsUrl || draft.contact.mainOffice.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Test Google Maps URL</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Changes persist immediately to local storage and database.</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={closeQuickEdit}
              disabled={isSaving}
              className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={isSaving}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Changes (সংরক্ষণ করুন)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
