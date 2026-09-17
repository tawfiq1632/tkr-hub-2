import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useLanguage } from '../context/LanguageContext';
import { Download, Sparkles, X, Smartphone, CheckCircle2, ChevronRight, Share, PlusSquare } from 'lucide-react';

export function InstallAppFloatingButton() {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { isBangla } = useLanguage();

  const [dismissed, setDismissed] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem('tkr_pwa_fab_dismissed') === 'true';
      if (isDismissed) {
        setDismissed(true);
      }
    } catch {
      // Ignore storage errors in restricted iframes
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(true);
    try {
      sessionStorage.setItem('tkr_pwa_fab_dismissed', 'true');
    } catch {}
  };

  const handleAction = async () => {
    if (isInstalled) {
      setJustInstalled(true);
      setTimeout(() => setJustInstalled(false), 3000);
      return;
    }

    // 1. If Chromium beforeinstallprompt is ready, trigger native install!
    if (isInstallable) {
      const result = await install();
      if (result.success) {
        setJustInstalled(true);
        setTimeout(() => setJustInstalled(false), 4000);
      }
      return;
    }

    // 2. If iOS Safari, show step-by-step instructions
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    // 3. Fallback: Open universal App Download & Install Modal
    window.dispatchEvent(new CustomEvent('open-app-download-modal'));
  };

  // Completely hide when running inside standalone PWA mode or dismissed
  if (isInstalled || dismissed) {
    return null;
  }

  return (
    <>
      <aside
        aria-label={isBangla ? 'টিকেআর হাব অ্যাপ ইনস্টলেশন' : 'TKR Hub App Installation'}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 select-none"
      >
        <AnimatePresence>
          {minimized ? (
            <motion.button
              id="install-app-fab-minimized"
              key="minimized-btn"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              type="button"
              onClick={() => setMinimized(false)}
              className="relative p-3.5 rounded-full bg-[#0B132B] text-[#CFA035] border-2 border-[#CFA035] shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center group"
              title={isBangla ? 'অ্যাপ ইনস্টল বাটন বড় করুন' : 'Expand Install App Button'}
              aria-label={isBangla ? 'অ্যাপ ইনস্টল করুন' : 'Install App'}
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0B132B] animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0B132B]" />
            </motion.button>
          ) : (
            <motion.div
              id="install-app-fab-banner"
              key="expanded-card"
              initial={{ y: 25, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 25, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="relative flex items-center gap-3 pl-3 pr-2 py-2 rounded-2xl bg-gradient-to-r from-[#0B132B] via-slate-900 to-[#0B132B] text-white border border-[#CFA035]/50 shadow-2xl shadow-black/40 backdrop-blur-md max-w-[340px] sm:max-w-md group"
            >
              {/* Official TKR Monogram / App Icon */}
              <button
                type="button"
                onClick={handleAction}
                className="w-10 h-10 rounded-xl bg-slate-950 border border-[#CFA035]/60 p-1 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform cursor-pointer"
                title={isBangla ? 'অ্যাপ ইনস্টল করুন' : 'Install App'}
              >
                <img
                  src="/tkr-logo.svg"
                  alt="TKR Hub"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/icon.svg';
                  }}
                />
              </button>

              {/* Text & Trigger Area */}
              <div
                role="button"
                tabIndex={0}
                onClick={handleAction}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAction();
                  }
                }}
                className="flex-1 min-w-0 cursor-pointer pr-1"
                id="install-app-fab-action-trigger"
              >
                <div className="flex items-center gap-1.5 leading-none mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#CFA035] bg-[#CFA035]/15 px-1.5 py-0.5 rounded border border-[#CFA035]/30">
                    {isInstallable ? 'PWA Ready' : 'App'}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>{isBangla ? 'সরাসরি অ্যাপ' : 'Standalone'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-xs sm:text-sm font-extrabold text-white truncate group-hover:text-[#CFA035] transition-colors">
                    {isBangla ? 'টিকেআর হাব অ্যাপ ইনস্টল করুন' : 'Install TKR Hub App'}
                  </p>
                  <ChevronRight className="w-3.5 h-3.5 text-[#CFA035] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                id="install-app-fab-primary-btn"
                onClick={handleAction}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#CFA035] to-amber-500 hover:from-amber-400 hover:to-[#CFA035] text-slate-950 text-xs font-black shadow-md cursor-pointer transition-transform active:scale-95 shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isBangla ? 'ইনস্টল' : 'Install'}</span>
              </button>

              {/* Control Buttons (Minimize & Close) */}
              <div className="flex items-center gap-0.5 shrink-0 border-l border-slate-700/60 pl-1">
                <button
                  type="button"
                  id="install-app-fab-minimize-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMinimized(true);
                  }}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  title={isBangla ? 'ছোট করুন' : 'Minimize'}
                  aria-label={isBangla ? 'ছোট করুন' : 'Minimize'}
                >
                  <span className="block w-2.5 h-0.5 bg-slate-400 rounded-full" />
                </button>
                <button
                  type="button"
                  id="install-app-fab-close-btn"
                  onClick={handleDismiss}
                  className="p-1 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  title={isBangla ? 'বন্ধ করুন' : 'Close'}
                  aria-label={isBangla ? 'বিজ্ঞপ্তি বন্ধ করুন' : 'Dismiss banner'}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>

      {/* Installed Toast Celebration */}
      {justInstalled && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#0B132B] text-white border-2 border-[#CFA035] shadow-2xl animate-in fade-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-white">
              {isBangla ? 'অভিনন্দন! টিকেআর হাব অ্যাপ সফলভাবে ইনস্টল হয়েছে।' : 'TKR Hub App has been successfully installed!'}
            </p>
            <p className="text-[11px] text-[#CFA035]">
              {isBangla ? 'এখন থেকে সরাসরি হোম স্ক্রিন বা অ্যাপ আইকন থেকে চালাতে পারবেন।' : 'You can now launch it directly from your home screen or app menu.'}
            </p>
          </div>
        </div>
      )}

      {/* iOS Safari Installation Guide Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#CFA035]" />
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  {isBangla ? 'আইফোন / আইপ্যাডে ইনস্টল করার নিয়ম' : 'Install on iPhone / iPad'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs shrink-0">
                  1
                </span>
                <p>
                  {isBangla ? (
                    <>সাফারি ব্রাউজারের নিচের বারে থাকা <Share className="w-3.5 h-3.5 inline text-emerald-600" /> <strong>Share (শেয়ার)</strong> আইকনে ট্যাপ করুন।</>
                  ) : (
                    <>Tap the <Share className="w-3.5 h-3.5 inline text-emerald-600" /> <strong>Share</strong> button in your Safari toolbar.</>
                  )}
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs shrink-0">
                  2
                </span>
                <p>
                  {isBangla ? (
                    <>একটু নিচে স্ক্রোল করে <PlusSquare className="w-3.5 h-3.5 inline text-[#CFA035]" /> <strong>"Add to Home Screen"</strong> অপশনে চাপ দিন।</>
                  ) : (
                    <>Scroll down and select <PlusSquare className="w-3.5 h-3.5 inline text-[#CFA035]" /> <strong>"Add to Home Screen"</strong>.</>
                  )}
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs shrink-0">
                  3
                </span>
                <p>
                  {isBangla ? (
                    <>উপরে থাকা <strong>"Add"</strong> বাটনে ক্লিক করলেই আপনার মোবাইল স্ক্রিনে TKR Hub অ্যাপ তৈরি হয়ে যাবে!</>
                  ) : (
                    <>Tap <strong>Add</strong> in the top right corner. The TKR Hub icon will now appear on your home screen!</>
                  )}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-emerald-600 text-white font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer"
            >
              {isBangla ? 'বুঝেছি, বন্ধ করুন' : 'Got it, Close'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
