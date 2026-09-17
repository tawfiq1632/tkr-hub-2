import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { StoreContactSettings } from '../../types';
import {
  formatWhatsAppUrl,
  formatTelUrl,
  formatMailtoUrl,
  isValidMapUrl
} from '../../data/initialSettings';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Clock,
  HelpCircle,
  Sparkles,
  Lock,
  Unlock,
  Check,
  Globe
} from 'lucide-react';

export function AdminContactSettings() {
  const { storeSettings, updateContactSettings, addToast } = useStore();
  
  // Local working draft copy of contact settings
  const [draft, setDraft] = useState<StoreContactSettings>(() => storeSettings.contact);
  const [isEditing, setIsEditing] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccessBanner, setSavedSuccessBanner] = useState(false);

  // Sync draft when storeSettings changes externally
  useEffect(() => {
    setDraft(storeSettings.contact);
  }, [storeSettings.contact]);

  // Check if draft has unsaved changes
  const hasUnsavedChanges = JSON.stringify(draft) !== JSON.stringify(storeSettings.contact);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    const success = await updateContactSettings(draft);
    setIsSaving(false);
    if (success) {
      setSavedSuccessBanner(true);
      setTimeout(() => setSavedSuccessBanner(false), 5000);
    }
  };

  const handleCancel = () => {
    setDraft(storeSettings.contact);
    addToast('Changes discarded. Restored last saved database settings.', 'info', 'Reverted');
  };

  // WhatsApp link calculation
  const generatedWhatsAppUrl = formatWhatsAppUrl(draft.whatsapp.value);
  const resolvedMapUrl = draft.mainOffice.mapUrl || draft.googleMapsUrl;
  const isMapValid = isValidMapUrl(resolvedMapUrl);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Settings Action Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Phone className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Contact Information Settings
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage live customer care channels, telephone hotlines, WhatsApp link, and physical office address.
              </p>
            </div>
          </div>
        </div>

        {/* Toolbar: Save, Cancel, Edit Mode, Preview Toggle */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-colors flex items-center gap-1.5 cursor-pointer ${
              isEditing
                ? 'bg-slate-100 text-slate-800 border-slate-300'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isEditing ? <Unlock className="w-3.5 h-3.5 text-emerald-600" /> : <Lock className="w-3.5 h-3.5 text-slate-400" />}
            <span>{isEditing ? 'Editing Enabled' : 'Locked Mode'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-colors flex items-center gap-1.5 cursor-pointer ${
              showPreview
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {showPreview ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
            <span>{showPreview ? 'Hide Live Preview' : 'Show Live Preview'}</span>
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={!hasUnsavedChanges || isSaving}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving to Database...' : 'Save Settings'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {savedSuccessBanner && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/90 text-emerald-900 text-xs flex items-center justify-between shadow-xs animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-slate-900">
                Contact information saved to database!
              </p>
              <p className="text-slate-600 text-[11px] mt-0.5">
                All changes are now automatically active on the Contact page, Header, and Footer across the website.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSavedSuccessBanner(false)}
            className="text-emerald-700 hover:text-emerald-900 font-bold text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Live Preview Panel (When Enabled) */}
      {showPreview && (
        <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="font-bold text-sm tracking-tight text-white">
                Live Public Website Preview (Contact Cards)
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">
              Previewing real customer experience in real time
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 Preview */}
            <div className={`p-4 rounded-2xl border transition-all ${
              draft.callSupport.enabled ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-950/40 border-slate-800/60 opacity-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Phone className="w-4 h-4" />
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  draft.callSupport.enabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                }`}>
                  {draft.callSupport.enabled ? 'Active' : 'Disabled'}
                </span>
              </div>
              <h4 className="font-bold text-xs text-white">{draft.callSupport.label || 'Call Support'}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{draft.callSupport.shortDescription}</p>
              
              {draft.callSupport.value?.trim() ? (
                <a
                  href={formatTelUrl(draft.callSupport.value)}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                >
                  <span>{draft.callSupport.value}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="mt-2 block text-[11px] text-amber-400/90 italic">
                  {draft.emptyHandlingMode === 'show_message' ? draft.emptyFieldMessage : '[Hidden publicly]'}
                </span>
              )}
            </div>

            {/* Card 2 Preview */}
            <div className={`p-4 rounded-2xl border transition-all ${
              draft.whatsapp.enabled ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-950/40 border-slate-800/60 opacity-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <MessageSquare className="w-4 h-4" />
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  draft.whatsapp.enabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                }`}>
                  {draft.whatsapp.enabled ? 'Active' : 'Disabled'}
                </span>
              </div>
              <h4 className="font-bold text-xs text-white">{draft.whatsapp.label || 'WhatsApp Chat'}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{draft.whatsapp.shortDescription}</p>
              
              {draft.whatsapp.value?.trim() ? (
                <div className="mt-2 space-y-1">
                  <a
                    href={generatedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>{draft.whatsapp.value}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="block text-[10px] font-mono text-slate-400 truncate">
                    wa.me/{generatedWhatsAppUrl.replace('https://wa.me/', '')}
                  </span>
                </div>
              ) : (
                <span className="mt-2 block text-[11px] text-amber-400/90 italic">
                  {draft.emptyHandlingMode === 'show_message' ? draft.emptyFieldMessage : '[Hidden publicly]'}
                </span>
              )}
            </div>

            {/* Card 3 Preview */}
            <div className={`p-4 rounded-2xl border transition-all ${
              draft.emailSupport.enabled ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-950/40 border-slate-800/60 opacity-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Mail className="w-4 h-4" />
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  draft.emailSupport.enabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                }`}>
                  {draft.emailSupport.enabled ? 'Active' : 'Disabled'}
                </span>
              </div>
              <h4 className="font-bold text-xs text-white">{draft.emailSupport.label || 'Email Support'}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{draft.emailSupport.shortDescription}</p>
              
              {draft.emailSupport.value?.trim() ? (
                <a
                  href={formatMailtoUrl(draft.emailSupport.value)}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 truncate max-w-full"
                >
                  <span className="truncate">{draft.emailSupport.value}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              ) : (
                <span className="mt-2 block text-[11px] text-amber-400/90 italic">
                  {draft.emptyHandlingMode === 'show_message' ? draft.emptyFieldMessage : '[Hidden publicly]'}
                </span>
              )}
            </div>

            {/* Card 4 Preview */}
            <div className={`p-4 rounded-2xl border transition-all ${
              draft.mainOffice.enabled ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-950/40 border-slate-800/60 opacity-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  draft.mainOffice.enabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                }`}>
                  {draft.mainOffice.enabled ? 'Active' : 'Disabled'}
                </span>
              </div>
              <h4 className="font-bold text-xs text-white">{draft.mainOffice.label || 'Main Office'}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{draft.mainOffice.shortDescription}</p>
              
              {draft.mainOffice.value?.trim() ? (
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-slate-300 line-clamp-2">{draft.mainOffice.value}</p>
                  {isMapValid ? (
                    <a
                      href={resolvedMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300"
                    >
                      <span>Google Maps Link</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ) : (
                    <span className="text-[10px] text-slate-500 block">(No Map link)</span>
                  )}
                </div>
              ) : (
                <span className="mt-2 block text-[11px] text-amber-400/90 italic">
                  {draft.emptyHandlingMode === 'show_message' ? draft.emptyFieldMessage : '[Hidden publicly]'}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Card 1: Call Support Settings */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">1. Call Support</h3>
                <p className="text-xs text-slate-500">
                  Customer telephone hotline. Generates an interactive <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-bold">tel:</code> link.
                </p>
              </div>
            </div>

            {/* Toggle switch */}
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                disabled={!isEditing}
                checked={draft.callSupport.enabled}
                onChange={(e) => setDraft({
                  ...draft,
                  callSupport: { ...draft.callSupport, enabled: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              <span className={`text-xs font-bold ${draft.callSupport.enabled ? 'text-emerald-700' : 'text-slate-400'}`}>
                {draft.callSupport.enabled ? 'Channel Enabled' : 'Channel Disabled'}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Card Label / Title
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={draft.callSupport.label}
                onChange={(e) => setDraft({
                  ...draft,
                  callSupport: { ...draft.callSupport, label: e.target.value }
                })}
                placeholder="Call Support"
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phone Number (e.g. +880 1700-857482)
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={draft.callSupport.value}
                onChange={(e) => setDraft({
                  ...draft,
                  callSupport: { ...draft.callSupport, value: e.target.value }
                })}
                placeholder="+880 1700-857482"
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500 font-mono disabled:opacity-60"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Short Description
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={draft.callSupport.shortDescription}
                onChange={(e) => setDraft({
                  ...draft,
                  callSupport: { ...draft.callSupport, shortDescription: e.target.value }
                })}
                placeholder="Urgent order & courier queries (Mon – Sun: 9AM – 10PM)"
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500 disabled:opacity-60"
              />
            </div>
          </div>
        </div>

        {/* Card 2: WhatsApp Chat Settings */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">2. WhatsApp Chat</h3>
                <p className="text-xs text-slate-500">
                  Instant messenger integration. Generates a clean <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-bold">https://wa.me/</code> link with sanitized digits.
                </p>
              </div>
            </div>

            {/* Toggle switch */}
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                disabled={!isEditing}
                checked={draft.whatsapp.enabled}
                onChange={(e) => setDraft({
                  ...draft,
                  whatsapp: { ...draft.whatsapp, enabled: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              <span className={`text-xs font-bold ${draft.whatsapp.enabled ? 'text-emerald-700' : 'text-slate-400'}`}>
                {draft.whatsapp.enabled ? 'Channel Enabled' : 'Channel Disabled'}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Card Label / Title
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={draft.whatsapp.label}
                onChange={(e) => setDraft({
                  ...draft,
                  whatsapp: { ...draft.whatsapp, label: e.target.value }
                })}
                placeholder="WhatsApp Chat"
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                WhatsApp Number (with Country Code)
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={draft.whatsapp.value}
                onChange={(e) => setDraft({
                  ...draft,
                  whatsapp: { ...draft.whatsapp, value: e.target.value }
                })}
                placeholder="+880 1819-857482"
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500 font-mono disabled:opacity-60"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Short Description
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={draft.whatsapp.shortDescription}
                onChange={(e) => setDraft({
                  ...draft,
                  whatsapp: { ...draft.whatsapp, shortDescription: e.target.value }
                })}
                placeholder="Fast message response (Typical reply in 15 mins)"
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500 disabled:opacity-60"
              />
            </div>

            {/* Sanitized URL preview box */}
            <div className="md:col-span-2 p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Auto-Sanitized WhatsApp URL:
                </span>
                {generatedWhatsAppUrl && (
                  <a
                    href={generatedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 underline"
                  >
                    <span>Test wa.me link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <code className="block text-xs font-mono text-emerald-800 bg-white/80 p-2 rounded-xl border border-emerald-100 truncate">
                {generatedWhatsAppUrl || '(Enter a valid number above to generate WhatsApp link)'}
              </code>
              <p className="text-[11px] text-slate-500">
                Spaces, plus signs, hyphens, and brackets are automatically stripped while preserving the full country code.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Email Support Settings */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">3. Email Support</h3>
                <p className="text-xs text-slate-500">
                  Customer helpdesk & ticketing inbox. Generates a clickable <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-bold">mailto:</code> link.
                </p>
              </div>
            </div>

            {/* Toggle switch */}
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                disabled={!isEditing}
                checked={draft.emailSupport.enabled}
                onChange={(e) => setDraft({
                  ...draft,
                  emailSupport: { ...draft.emailSupport, enabled: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              <span className={`text-xs font-bold ${draft.emailSupport.enabled ? 'text-emerald-700' : 'text-slate-400'}`}>
                {draft.emailSupport.enabled ? 'Channel Enabled' : 'Channel Disabled'}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Card Label / Title
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={draft.emailSupport.label}
                onChange={(e) => setDraft({
                  ...draft,
                  emailSupport: { ...draft.emailSupport, label: e.target.value }
                })}
                placeholder="Email Support"
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                disabled={!isEditing}
                value={draft.emailSupport.value}
                onChange={(e) => setDraft({
                  ...draft,
                  emailSupport: { ...draft.emailSupport, value: e.target.value }
                })}
                placeholder="support@tkrhub.com"
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500 disabled:opacity-60"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Short Description
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={draft.emailSupport.shortDescription}
                onChange={(e) => setDraft({
                  ...draft,
                  emailSupport: { ...draft.emailSupport, shortDescription: e.target.value }
                })}
                placeholder="Corporate & warranty helpdesk (Replies within 4 hours)"
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500 disabled:opacity-60"
              />
            </div>
          </div>
        </div>

        {/* Card 4: Main Office Settings */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">4. Main Office</h3>
                <p className="text-xs text-slate-500">
                  Headquarters & logistics dispatch center address with optional Google Maps link.
                </p>
              </div>
            </div>

            {/* Toggle switch */}
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                disabled={!isEditing}
                checked={draft.mainOffice.enabled}
                onChange={(e) => setDraft({
                  ...draft,
                  mainOffice: { ...draft.mainOffice, enabled: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              <span className={`text-xs font-bold ${draft.mainOffice.enabled ? 'text-emerald-700' : 'text-slate-400'}`}>
                {draft.mainOffice.enabled ? 'Channel Enabled' : 'Channel Disabled'}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Card Label / Title
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={draft.mainOffice.label}
                onChange={(e) => setDraft({
                  ...draft,
                  mainOffice: { ...draft.mainOffice, label: e.target.value }
                })}
                placeholder="Main Office"
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Google Maps URL (Optional)
              </label>
              <input
                type="url"
                disabled={!isEditing}
                value={draft.mainOffice.mapUrl || draft.googleMapsUrl || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setDraft({
                    ...draft,
                    googleMapsUrl: val,
                    mainOffice: { ...draft.mainOffice, mapUrl: val }
                  });
                }}
                placeholder="https://maps.google.com/?q=..."
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500 disabled:opacity-60"
              />
              <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                {isMapValid ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" />
                    Valid Google Maps link will open in a new tab.
                  </span>
                ) : (
                  <span className="text-slate-400">
                    If left empty, no map link will appear on the public card.
                  </span>
                )}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Business Address
              </label>
              <textarea
                rows={2}
                disabled={!isEditing}
                value={draft.mainOffice.value}
                onChange={(e) => setDraft({
                  ...draft,
                  mainOffice: { ...draft.mainOffice, value: e.target.value }
                })}
                placeholder="House 42, Road 11, Block D, Banani Commercial Area, Dhaka - 1213"
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500 disabled:opacity-60"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Short Description
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={draft.mainOffice.shortDescription}
                onChange={(e) => setDraft({
                  ...draft,
                  mainOffice: { ...draft.mainOffice, shortDescription: e.target.value }
                })}
                placeholder="Central Logistics & Fulfillment Warehouse #01"
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500 disabled:opacity-60"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Empty Card & Privacy Handling */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">
                5. Empty Field Handling & Fallback Behavior
              </h3>
              <p className="text-xs text-slate-500">
                Configure how the public website behaves if an administrator leaves any contact field blank.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50/70 transition-colors cursor-pointer">
              <input
                type="radio"
                name="emptyHandling"
                value="hide"
                disabled={!isEditing}
                checked={draft.emptyHandlingMode === 'hide'}
                onChange={() => setDraft({ ...draft, emptyHandlingMode: 'hide' })}
                className="mt-1 text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <span className="font-bold text-xs text-slate-900 block">
                  Hide Card Completely (Recommended)
                </span>
                <span className="text-[11px] text-slate-500">
                  Do not display cards with missing data publicly, preserving a clean and professional appearance.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50/70 transition-colors cursor-pointer">
              <input
                type="radio"
                name="emptyHandling"
                value="show_message"
                disabled={!isEditing}
                checked={draft.emptyHandlingMode === 'show_message'}
                onChange={() => setDraft({ ...draft, emptyHandlingMode: 'show_message' })}
                className="mt-1 text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <span className="font-bold text-xs text-slate-900 block">
                  Display Custom Admin-Controlled Message
                </span>
                <span className="text-[11px] text-slate-500">
                  Render the card frame but show an official maintenance or update note instead of broken links.
                </span>
              </div>
            </label>

            {draft.emptyHandlingMode === 'show_message' && (
              <div className="pt-2 animate-in fade-in duration-200">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Custom Fallback Notice
                </label>
                <textarea
                  rows={2}
                  disabled={!isEditing}
                  value={draft.emptyFieldMessage}
                  onChange={(e) => setDraft({ ...draft, emptyFieldMessage: e.target.value })}
                  placeholder="This support channel is currently undergoing maintenance. Please contact us via our alternative lines."
                  className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Section 6: Support Hours */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">
                6. Customer Support Operating Hours
              </h3>
              <p className="text-xs text-slate-500">
                Displayed in contact cards, header announcement, and footer.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Business Hours Text
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={draft.businessHours || ''}
              onChange={(e) => setDraft({ ...draft, businessHours: e.target.value })}
              placeholder="Mon – Sun: 9:00 AM – 10:00 PM"
              className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
            />
          </div>
        </div>

        {/* Bottom Save / Cancel Bar */}
        <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            {hasUnsavedChanges ? (
              <span className="text-amber-600 font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                You have unsaved changes in contact information.
              </span>
            ) : (
              <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                All contact settings are synchronized with database.
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
              <span>{isSaving ? 'Saving...' : 'Save Settings to Database'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
