import React from 'react';
import { Pencil } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { QuickEditTarget } from '../types';

interface EditPencilButtonProps {
  target: QuickEditTarget;
  title?: string;
  label?: string;
  size?: 'xs' | 'sm' | 'md';
  variant?: 'light' | 'dark' | 'glass' | 'emerald';
  className?: string;
}

export function EditPencilButton({
  target,
  title,
  label,
  size = 'sm',
  variant = 'light',
  className = ''
}: EditPencilButtonProps) {
  const { openQuickEdit, isEditModeEnabled } = useStore();

  const getTargetTitle = () => {
    if (title) return title;
    switch (target) {
      case 'logo':
        return 'লোগো পরিবর্তন করুন / Change Store Logo & Brand';
      case 'email':
        return 'জিমেইল / ইমেইল পরিবর্তন করুন / Change Email Address';
      case 'phone':
        return 'ফোন নাম্বার পরিবর্তন করুন / Change Phone Number';
      case 'whatsapp':
        return 'হোয়াটসঅ্যাপ নাম্বার পরিবর্তন করুন / Change WhatsApp';
      case 'discount':
        return 'ডিসকাউন্ট ও অফার পরিবর্তন করুন / Change Discount & Promo';
      case 'links':
        return 'সোশ্যাল মিডিয়া ও ওয়েবসাইট লিংক পরিবর্তন করুন / Change Links';
      case 'address':
        return 'অফিস ঠিকানা ও গুগল ম্যাপ পরিবর্তন করুন / Change Address & Map';
      default:
        return 'তথ্য পরিবর্তন করুন / Quick Edit';
    }
  };

  const sizeClasses = {
    xs: 'p-1 text-[11px] gap-1',
    sm: 'p-1.5 text-xs gap-1.5',
    md: 'px-2.5 py-1.5 text-xs gap-1.5'
  }[size];

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4'
  }[size];

  const variantClasses = {
    light:
      'bg-emerald-50 hover:bg-emerald-500 text-emerald-700 hover:text-white border border-emerald-200/90 hover:border-emerald-500 shadow-xs',
    dark:
      'bg-slate-800/90 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-slate-700 hover:border-emerald-400 shadow-xs',
    glass:
      'bg-white/90 hover:bg-emerald-500 text-slate-800 hover:text-white border border-slate-200/80 hover:border-emerald-500 backdrop-blur-xs shadow-xs',
    emerald:
      'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 shadow-sm'
  }[variant];

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openQuickEdit(target);
      }}
      title={getTargetTitle()}
      aria-label={getTargetTitle()}
      className={`inline-flex items-center justify-center font-bold rounded-lg transition-all duration-200 cursor-pointer select-none group/pencil shrink-0 ${sizeClasses} ${variantClasses} ${
        isEditModeEnabled ? 'ring-2 ring-emerald-400/40 ring-offset-1 hover:ring-emerald-500 scale-100' : 'opacity-80 hover:opacity-100'
      } ${className}`}
    >
      <Pencil className={`${iconSizes} group-hover/pencil:rotate-12 transition-transform duration-200`} />
      {label && <span className="font-semibold whitespace-nowrap">{label}</span>}
    </button>
  );
}
