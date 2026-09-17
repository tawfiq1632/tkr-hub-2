import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useRouter } from '../context/RouterContext';
import { QuickEditTarget } from '../types';
import {
  Pencil,
  Image as ImageIcon,
  Mail,
  Phone,
  MessageSquare,
  Tag,
  Share2,
  MapPin,
  Settings,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Eye,
  EyeOff,
  Languages
} from 'lucide-react';

export function QuickEditToolbar() {
  const { openQuickEdit, isEditModeEnabled, setIsEditModeEnabled } = useStore();
  const { navigate } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const editItems: { target: QuickEditTarget; label: string; icon: React.ElementType }[] = [
    { target: 'language', label: 'Language & Translation (ভাষা সেটিংস)', icon: Languages },
    { target: 'logo', label: 'Logo & Brand (লোগো)', icon: ImageIcon },
    { target: 'email', label: 'Gmail / Email (জিমেইল)', icon: Mail },
    { target: 'phone', label: 'Phone Number (ফোন)', icon: Phone },
    { target: 'whatsapp', label: 'WhatsApp Chat (হোয়াটসঅ্যাপ)', icon: MessageSquare },
    { target: 'discount', label: 'Discounts & Promo (ডিসকাউন্ট)', icon: Tag },
    { target: 'links', label: 'Website & Social (লিংক)', icon: Share2 },
    { target: 'address', label: 'Office Address (ঠিকানা)', icon: MapPin }
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 select-none print:hidden">
      {/* Expanded Quick Edit Palette */}
      {isOpen && (
        <div className="bg-slate-900/95 text-white p-3 rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur-md w-72 space-y-2 animate-in fade-in-50 slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="font-extrabold text-xs text-white">
                Quick Edit Panel (এডিট মোড)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsEditModeEnabled((prev) => !prev)}
              className={`p-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                isEditModeEnabled
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400'
              }`}
              title={isEditModeEnabled ? 'Pencil highlights ON' : 'Pencil highlights OFF'}
            >
              {isEditModeEnabled ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              <span>{isEditModeEnabled ? 'Pencils ON' : 'Pencils OFF'}</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 leading-tight">
            লোগো, জিমেইল, ফোন বা ডিসকাউন্ট যেকোনো সময় দ্রুত পরিবর্তন করতে নিচের অপশনে চাপুন:
          </p>

          <div className="grid grid-cols-1 gap-1 pt-1">
            {editItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.target}
                  type="button"
                  onClick={() => {
                    openQuickEdit(item.target);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800/90 transition-colors text-left cursor-pointer group"
                >
                  <span className="p-1 rounded-lg bg-slate-800 group-hover:bg-emerald-500/20 text-emerald-400 transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className="flex-1">{item.label}</span>
                  <Pencil className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                navigate('/admin');
                setIsOpen(false);
              }}
              className="text-[11px] font-bold text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer py-1"
            >
              <Settings className="w-3 h-3 text-slate-400" />
              <span>Full Admin Portal</span>
            </button>
            <button
              type="button"
              onClick={() => {
                openQuickEdit('all');
                setIsOpen(false);
              }}
              className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer py-1"
            >
              <span>Open All Settings &rarr;</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2.5 rounded-2xl shadow-xl border border-slate-700/80 hover:border-emerald-500/50 transition-all duration-200 cursor-pointer group"
          title="Quick Edit Store Details / তথ্য পরিবর্তন করুন"
        >
          <span className="p-1 rounded-lg bg-emerald-500 text-slate-950">
            <Pencil className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
          </span>
          <span className="hidden sm:inline">Quick Edit (তথ্য পরিবর্তন)</span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
        </button>
      </div>
    </div>
  );
}
