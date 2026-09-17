import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { StoreSettings } from '../../types';
import { DEFAULT_STORE_SETTINGS, isValidMapUrl } from '../../data/initialSettings';
import {
  Settings,
  Save,
  RotateCcw,
  Store,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  CheckCircle2,
  DollarSign,
  Truck,
  ExternalLink,
  Check,
  AlertCircle
} from 'lucide-react';

export function AdminStoreSettings() {
  const { storeSettings, updateStoreSettings, addToast } = useStore();
  const [draft, setDraft] = useState<StoreSettings>(() => storeSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [successBanner, setSuccessBanner] = useState(false);

  useEffect(() => {
    setDraft(storeSettings);
  }, [storeSettings]);

  const hasUnsavedChanges = JSON.stringify(draft) !== JSON.stringify(storeSettings);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    const success = await updateStoreSettings(draft);
    setIsSaving(false);
    if (success) {
      setSuccessBanner(true);
      setTimeout(() => setSuccessBanner(false), 5000);
    }
  };

  const handleCancel = () => {
    setDraft(storeSettings);
    addToast('Store settings reverted to last saved database state.', 'info');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all store settings and contact info back to default factory configuration?')) {
      setDraft(DEFAULT_STORE_SETTINGS);
      addToast('Draft reset to defaults. Click Save to apply.', 'info');
    }
  };

  const isMapValid = isValidMapUrl(draft.contact.googleMapsUrl || draft.contact.mainOffice.mapUrl);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Settings Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-slate-900 text-emerald-400">
            <Settings className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Store & Communication Settings
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure global store parameters, COD delivery thresholds, and public communication channels.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={!hasUnsavedChanges || isSaving}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors disabled:opacity-40 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : 'Save All Settings'}</span>
          </button>
        </div>
      </div>

      {successBanner && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>All store configuration and contact records have been written to the database!</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessBanner(false)}
            className="text-emerald-700 hover:text-emerald-900 font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Store Branding & Currency */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">Store Identity & Pricing</h3>
              <p className="text-xs text-slate-500">Brand identity and Cash-on-Delivery pricing options.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Store Name</label>
              <input
                type="text"
                value={draft.storeName}
                onChange={(e) => setDraft({ ...draft, storeName: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Currency Symbol</label>
              <input
                type="text"
                value={draft.currency}
                onChange={(e) => setDraft({ ...draft, currency: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500 font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Store Tagline / Slogan</label>
              <input
                type="text"
                value={draft.tagline}
                onChange={(e) => setDraft({ ...draft, tagline: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Free Shipping Threshold ($)
              </label>
              <input
                type="number"
                step="1"
                value={draft.freeShippingThreshold}
                onChange={(e) => setDraft({ ...draft, freeShippingThreshold: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Standard Shipping Fee ($)
              </label>
              <input
                type="number"
                step="0.1"
                value={draft.standardShippingFee}
                onChange={(e) => setDraft({ ...draft, standardShippingFee: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Store Contact & Communication Channels (Required Editable Fields) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">
                Official Store Contact & Communication Channels
              </h3>
              <p className="text-xs text-slate-500">
                Direct fields for titles, numbers, email, business address, and Google Maps URL.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Field Set 1: Call Support */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                Call Support Channel
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Call Support Title</label>
                  <input
                    type="text"
                    value={draft.contact.callSupport.label}
                    onChange={(e) => setDraft({
                      ...draft,
                      contact: {
                        ...draft.contact,
                        callSupport: { ...draft.contact.callSupport, label: e.target.value }
                      }
                    })}
                    placeholder="Call Support"
                    className="w-full bg-white text-slate-900 text-xs rounded-xl px-3.5 py-2 border border-slate-200 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={draft.contact.callSupport.value}
                    onChange={(e) => setDraft({
                      ...draft,
                      contact: {
                        ...draft.contact,
                        callSupport: { ...draft.contact.callSupport, value: e.target.value }
                      }
                    })}
                    placeholder="+880 1700-857482"
                    className="w-full bg-white text-slate-900 text-xs rounded-xl px-3.5 py-2 border border-slate-200 focus:outline-emerald-500 font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 mb-1">Call Support Description</label>
                  <input
                    type="text"
                    value={draft.contact.callSupport.shortDescription}
                    onChange={(e) => setDraft({
                      ...draft,
                      contact: {
                        ...draft.contact,
                        callSupport: { ...draft.contact.callSupport, shortDescription: e.target.value }
                      }
                    })}
                    placeholder="Urgent order & courier queries (Mon – Sun: 9AM – 10PM)"
                    className="w-full bg-white text-slate-900 text-xs rounded-xl px-3.5 py-2 border border-slate-200 focus:outline-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Field Set 2: WhatsApp */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                WhatsApp Chat Channel
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">WhatsApp Title</label>
                  <input
                    type="text"
                    value={draft.contact.whatsapp.label}
                    onChange={(e) => setDraft({
                      ...draft,
                      contact: {
                        ...draft.contact,
                        whatsapp: { ...draft.contact.whatsapp, label: e.target.value }
                      }
                    })}
                    placeholder="WhatsApp Chat"
                    className="w-full bg-white text-slate-900 text-xs rounded-xl px-3.5 py-2 border border-slate-200 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={draft.contact.whatsapp.value}
                    onChange={(e) => setDraft({
                      ...draft,
                      contact: {
                        ...draft.contact,
                        whatsapp: { ...draft.contact.whatsapp, value: e.target.value }
                      }
                    })}
                    placeholder="+880 1819-857482"
                    className="w-full bg-white text-slate-900 text-xs rounded-xl px-3.5 py-2 border border-slate-200 focus:outline-emerald-500 font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 mb-1">WhatsApp Description</label>
                  <input
                    type="text"
                    value={draft.contact.whatsapp.shortDescription}
                    onChange={(e) => setDraft({
                      ...draft,
                      contact: {
                        ...draft.contact,
                        whatsapp: { ...draft.contact.whatsapp, shortDescription: e.target.value }
                      }
                    })}
                    placeholder="Fast message response (Typical reply in 15 mins)"
                    className="w-full bg-white text-slate-900 text-xs rounded-xl px-3.5 py-2 border border-slate-200 focus:outline-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Field Set 3: Email Support */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                Email Support Channel
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Email Title</label>
                  <input
                    type="text"
                    value={draft.contact.emailSupport.label}
                    onChange={(e) => setDraft({
                      ...draft,
                      contact: {
                        ...draft.contact,
                        emailSupport: { ...draft.contact.emailSupport, label: e.target.value }
                      }
                    })}
                    placeholder="Email Support"
                    className="w-full bg-white text-slate-900 text-xs rounded-xl px-3.5 py-2 border border-slate-200 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={draft.contact.emailSupport.value}
                    onChange={(e) => setDraft({
                      ...draft,
                      contact: {
                        ...draft.contact,
                        emailSupport: { ...draft.contact.emailSupport, value: e.target.value }
                      }
                    })}
                    placeholder="support@tkrhub.com"
                    className="w-full bg-white text-slate-900 text-xs rounded-xl px-3.5 py-2 border border-slate-200 focus:outline-emerald-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 mb-1">Email Description</label>
                  <input
                    type="text"
                    value={draft.contact.emailSupport.shortDescription}
                    onChange={(e) => setDraft({
                      ...draft,
                      contact: {
                        ...draft.contact,
                        emailSupport: { ...draft.contact.emailSupport, shortDescription: e.target.value }
                      }
                    })}
                    placeholder="Corporate & warranty helpdesk (Replies within 4 hours)"
                    className="w-full bg-white text-slate-900 text-xs rounded-xl px-3.5 py-2 border border-slate-200 focus:outline-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Field Set 4: Main Office & Google Maps */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Office Address & Google Maps Location
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Office Title</label>
                  <input
                    type="text"
                    value={draft.contact.mainOffice.label}
                    onChange={(e) => setDraft({
                      ...draft,
                      contact: {
                        ...draft.contact,
                        mainOffice: { ...draft.contact.mainOffice, label: e.target.value }
                      }
                    })}
                    placeholder="Main Office"
                    className="w-full bg-white text-slate-900 text-xs rounded-xl px-3.5 py-2 border border-slate-200 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Google Maps URL</label>
                  <input
                    type="url"
                    value={draft.contact.googleMapsUrl || draft.contact.mainOffice.mapUrl || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setDraft({
                        ...draft,
                        contact: {
                          ...draft.contact,
                          googleMapsUrl: val,
                          mainOffice: { ...draft.contact.mainOffice, mapUrl: val }
                        }
                      });
                    }}
                    placeholder="https://maps.google.com/?q=..."
                    className="w-full bg-white text-slate-900 text-xs rounded-xl px-3.5 py-2 border border-slate-200 focus:outline-emerald-500"
                  />
                  {isMapValid && (
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                      <Check className="w-3 h-3" /> Valid Map link will render interactive map action.
                    </span>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 mb-1">Full Business Address</label>
                  <textarea
                    rows={2}
                    value={draft.contact.mainOffice.value}
                    onChange={(e) => setDraft({
                      ...draft,
                      contact: {
                        ...draft.contact,
                        mainOffice: { ...draft.contact.mainOffice, value: e.target.value }
                      }
                    })}
                    placeholder="House 42, Road 11, Block D, Banani Commercial Area, Dhaka - 1213"
                    className="w-full bg-white text-slate-900 text-xs rounded-xl px-3.5 py-2 border border-slate-200 focus:outline-emerald-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 mb-1">Office Description</label>
                  <input
                    type="text"
                    value={draft.contact.mainOffice.shortDescription}
                    onChange={(e) => setDraft({
                      ...draft,
                      contact: {
                        ...draft.contact,
                        mainOffice: { ...draft.contact.mainOffice, shortDescription: e.target.value }
                      }
                    })}
                    placeholder="Central Logistics & Fulfillment Warehouse #01"
                    className="w-full bg-white text-slate-900 text-xs rounded-xl px-3.5 py-2 border border-slate-200 focus:outline-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            {hasUnsavedChanges ? (
              <span className="text-amber-600 font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                Unsaved configuration modifications.
              </span>
            ) : (
              <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Settings saved in database.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={!hasUnsavedChanges || isSaving}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors disabled:opacity-40 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
