import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useLanguage } from '../context/LanguageContext';
import {
  Download,
  Laptop,
  Smartphone,
  Share2,
  CheckCircle2,
  X,
  Send,
  ExternalLink,
  ShieldCheck,
  FileCode,
  Sparkles,
  Copy,
  Check
} from 'lucide-react';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AppDownloadModal({ isOpen, onClose }: AppDownloadModalProps) {
  const {
    isInstallable,
    isInstalled,
    isIOS,
    install,
    downloadPortableAppFile,
    downloadWindowsAppInstaller,
    downloadSilentVbsRunner,
    downloadDesktopShortcut,
    shareToTelegram,
    shareToWhatsApp,
    getPublicStoreUrl
  } = usePWAInstall();

  const { isBangla } = useLanguage();
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadedInstaller, setDownloadedInstaller] = useState(false);
  const [downloadedVbs, setDownloadedVbs] = useState(false);
  const [downloadedHtml, setDownloadedHtml] = useState(false);
  const [downloadedShortcut, setDownloadedShortcut] = useState(false);
  const [showPwaGuide, setShowPwaGuide] = useState(false);

  if (!isOpen) return null;

  const publicUrl = getPublicStoreUrl();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownloadInstaller = () => {
    downloadWindowsAppInstaller();
    setDownloadedInstaller(true);
    setTimeout(() => setDownloadedInstaller(false), 5000);
  };

  const handleDownloadVbs = () => {
    downloadSilentVbsRunner();
    setDownloadedVbs(true);
    setTimeout(() => setDownloadedVbs(false), 5000);
  };

  const handleDownloadHtml = () => {
    downloadPortableAppFile();
    setDownloadedHtml(true);
    setTimeout(() => setDownloadedHtml(false), 4000);
  };

  const handleDownloadShortcut = () => {
    downloadDesktopShortcut();
    setDownloadedShortcut(true);
    setTimeout(() => setDownloadedShortcut(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#0B132B] text-white p-6 sm:p-7 relative border-b border-[#CFA035]/30">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-[#CFA035]/50 p-1 flex items-center justify-center shrink-0 shadow-lg shadow-[#CFA035]/15">
              <img
                src="/tkr-logo.svg"
                alt="TKR Holdings Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/icon.svg';
                }}
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#CFA035]/20 text-[#CFA035] text-[11px] font-bold border border-[#CFA035]/30">
                <Sparkles className="w-3 h-3 text-[#CFA035]" />
                <span>{isBangla ? 'টিকেআর হোল্ডিংস • অফিসিয়াল ডেস্কটপ অ্যাপ' : 'TKR Holdings • Official Desktop App'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
                {isBangla ? 'ল্যাপটপে অ্যাপ ডাউনলোড ও ইনস্টল' : 'Download & Install App on PC'}
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
            {isBangla
              ? 'ব্রাউজার অ্যাড্রেস বার বা সার্চ বার ছাড়াই সরাসরি আলাদা সফটওয়্যার উইন্ডোতে চালানোর জন্য নিচের যেকোনো একটি সুবিধাজনক উপায় বেছে নিন।'
              : 'Launch TKR Holdings as a native standalone desktop app without browser URL bars, tabs, or bookmarks.'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5 overflow-y-auto">
          
          {/* Top Hero: Solution 1 - Silent VBS Launcher (Zero Terminal / Zero CMD) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0B132B] to-slate-950 text-white border-2 border-[#CFA035]/60 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-36 h-36 bg-[#CFA035]/15 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#CFA035] to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-[#CFA035]/30 shrink-0 font-black">
                  <Laptop className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#CFA035]/20 text-[#CFA035] text-[10px] font-extrabold uppercase tracking-wider">
                    ★ {isBangla ? 'পদ্ধতি ১ (সর্বাধিক সুবিধাজনক • কোনো টার্মিনাল আসবে না)' : 'Option 1 (Recommended • Zero Terminal)'}
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                    {isBangla ? 'টার্মিনাল ছাড়া সরাসরি অ্যাপ (.vbs)' : 'Silent Desktop App Runner (.vbs)'}
                  </h3>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-500 text-slate-950 shrink-0">
                {isBangla ? 'কোনো কালো পর্দা নেই' : 'No CMD Window'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
              {isBangla
                ? 'টার্মিনাল বা কমান্ড প্রম্পটের কোনো কালো বক্স আসবে না! এই ফাইলে ডাবল-ক্লিক করলেই স্বয়ংক্রিয়ভাবে আপনার ডেস্কটপে "TKR Holdings" অ্যাপ আইকন তৈরি হবে এবং সম্পূর্ণ ব্রাউজার বার ছাড়া সরাসরি ফুলস্ক্রিন অ্যাপ ওপেন হবে।'
                : 'Zero terminal flash! Double-clicking this script directly creates a desktop icon and launches the dedicated standalone app window.'}
            </p>

            <button
              type="button"
              onClick={handleDownloadVbs}
              className="w-full py-3.5 px-5 bg-gradient-to-r from-[#CFA035] via-amber-400 to-[#CFA035] hover:brightness-110 text-slate-950 font-black text-sm rounded-2xl shadow-lg shadow-[#CFA035]/25 transition-all flex items-center justify-center gap-2 cursor-pointer transform active:scale-98"
            >
              {downloadedVbs ? <CheckCircle2 className="w-5 h-5 text-slate-950" /> : <Download className="w-5 h-5" />}
              <span>
                {downloadedVbs
                  ? (isBangla ? '✓ ডাউনলোড হয়েছে! ফাইলে ডাবল-ক্লিক করুন' : '✓ Downloaded! Double click file')
                  : (isBangla ? 'টার্মিনাল ছাড়া অ্যাপ ডাউনলোড করুন (TKR-Holdings-App.vbs)' : 'Download Silent App (TKR-Holdings-App.vbs)')}
              </span>
            </button>
          </div>

          {/* Solution 2: Fixed BAT Installer */}
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase">
                  {isBangla ? 'পদ্ধতি ২ • উইন্ডোজ অটো-ইনস্টলার (.bat)' : 'Option 2 • Windows Auto-Installer (.bat)'}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                  {isBangla ? 'ইনস্টলার (.bat) - টার্মিনাল চলে যাওয়ার সমস্যা ফিক্সড' : 'Fixed BAT Installer'}
                </h4>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Fixed
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {isBangla
                ? 'আগে ডাবল-ক্লিক করলে টার্মিনাল এসে ১-২ সেকেন্ডে নিজে নিজে চলে যেত। আমরা এটি ঠিক করে দিয়েছি—এখন এটি স্ক্রিনে স্পষ্ট ইনস্টলেশন রিপোর্ট ও ডেস্কটপ আইকন তৈরি নিশ্চিত করবে এবং নিজে নিজে বন্ধ হবে না।'
                : 'The issue where the terminal closed after 1-2 seconds has been fixed. It now shows progress, creates the shortcut, and waits for your confirmation.'}
            </p>

            <button
              type="button"
              onClick={handleDownloadInstaller}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {downloadedInstaller ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
              <span>
                {downloadedInstaller
                  ? (isBangla ? '✓ ডাউনলোড হয়েছে' : '✓ Downloaded')
                  : (isBangla ? 'উইন্ডোজ ইনস্টলার ডাউনলোড করুন (Install-TKR-Holdings-App.bat)' : 'Download BAT Installer')}
              </span>
            </button>
          </div>

          {/* Other Convenient Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {/* Direct Browser PWA Install */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>{isBangla ? 'ব্রাউজারের বিল্ট-ইন PWA' : 'Browser PWA App'}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    PWA
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {isBangla
                    ? 'ক্রোম বা এজে এক ক্লিকেই ল্যাপটপে ইন্সটল করার ব্রাউজার ফিচার।'
                    : 'Install directly via browser address bar.'}
                </p>
              </div>

              {isInstalled ? (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 py-2 px-3 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isBangla ? 'ইতিমধ্যে ইনস্টল করা আছে' : 'Already Installed'}</span>
                </div>
              ) : isInstallable ? (
                <button
                  type="button"
                  onClick={install}
                  className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{isBangla ? 'অ্যাপ ইনস্টল করুন' : 'Install App'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPwaGuide(!showPwaGuide)}
                  className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Laptop className="w-4 h-4 text-slate-600" />
                  <span>{showPwaGuide ? (isBangla ? 'গাইড লুকান' : 'Hide Guide') : (isBangla ? 'ইনস্টল নিয়ম দেখুন' : 'View Guide')}</span>
                </button>
              )}

              {showPwaGuide && (
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[10px] text-amber-900 space-y-1">
                  <p className="font-bold">✓ ক্রোম / এজ ব্রাউজারের নিয়ম:</p>
                  <p>অ্যাড্রেস বারের ডান পাশে থাকা "Install" আইকন বা ৩-ডট মেনু &gt; "Save and share" &gt; "Install TKR Holdings" এ ক্লিক করুন।</p>
                </div>
              )}
            </div>

            {/* Option B: Portable HTML Offline Launcher */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                    <FileCode className="w-4 h-4 text-indigo-600" />
                    <span>{isBangla ? 'পোর্টেবল ফাইল (.html)' : 'Portable Launcher (.html)'}</span>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                    PORTABLE
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {isBangla
                    ? 'অফিসিয়াল লোগো সহ পোর্টেবল ফাইল যা বন্ধুদের পেনড্রাইভে বা টেলিগ্রামে শেয়ার করতে পারবেন।'
                    : 'Single file with official logo you can double-click anywhere.'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownloadHtml}
                className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {downloadedHtml ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                <span>
                  {downloadedHtml
                    ? (isBangla ? 'ডাউনলোড হয়েছে' : 'Downloaded')
                    : (isBangla ? 'পোর্টেবল লাঞ্চার (.html)' : 'Download .html')}
                </span>
              </button>
            </div>
          </div>

          {/* Send to Friend via Telegram / WhatsApp */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-sky-400" />
                <h4 className="font-bold text-xs sm:text-sm">
                  {isBangla ? 'টেলিগ্রাম বা হোয়াটসঅ্যাপে শেয়ার করুন' : 'Share App Link via Telegram or WhatsApp'}
                </h4>
              </div>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                Direct Link
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={shareToTelegram}
                className="flex-1 py-2 px-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </button>

              <button
                type="button"
                onClick={shareToWhatsApp}
                className="py-2 px-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? (isBangla ? 'কপি হয়েছে' : 'Copied') : (isBangla ? 'লিঙ্ক কপি' : 'Copy Link')}</span>
              </button>
            </div>

            {/* Direct Link box */}
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400 break-all select-all flex items-center justify-between gap-2">
              <span className="truncate">{publicUrl}</span>
              <span className="text-[10px] text-slate-500 uppercase shrink-0">Live URL</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] text-slate-600 font-medium">
              {isBangla ? 'অফিশিয়ালটিকেআর হোল্ডিংস সফটওয়্যার সংস্করণ' : 'Official TKR Holdings Standalone Version'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            {isBangla ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
