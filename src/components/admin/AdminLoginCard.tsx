import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Lock, ShieldCheck, Key, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export function AdminLoginCard() {
  const { loginAdmin } = useStore();
  const [email, setEmail] = useState('admin@tkrhub.com');
  const [password, setPassword] = useState('tkradmin2026');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await loginAdmin(email, password);
    setLoading(false);
    if (!result.success) {
      setError(result.message || 'Invalid administrator password.');
    }
  };

  const handleQuickDemo = async () => {
    setEmail('admin@tkrhub.com');
    setPassword('tkradmin2026');
    setError('');
    setLoading(true);
    await loginAdmin('admin@tkrhub.com', 'tkradmin2026');
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Admin Authentication</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Access store management, customer orders, and live contact information settings.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Admin Email or Username
          </label>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@tkrhub.com"
            className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Administrator Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500 font-medium"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <span>Verifying Credentials...</span>
          ) : (
            <>
              <span>Unlock Admin Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </>
          )}
        </button>
      </form>

      {/* One-click demo credentials banner */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/70 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Demo Admin Credentials
            </span>
            <span className="text-[10px] font-mono bg-emerald-200/70 text-emerald-900 px-1.5 py-0.5 rounded font-bold">
              Instant
            </span>
          </div>
          <p className="text-[11px] text-emerald-800/90 leading-tight">
            User: <code className="font-bold">admin@tkrhub.com</code> • Password: <code className="font-bold">tkradmin2026</code>
          </p>
        </div>

        <button
          type="button"
          onClick={handleQuickDemo}
          className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>One-Click Auto Login (Demo)</span>
        </button>
      </div>
    </div>
  );
}
