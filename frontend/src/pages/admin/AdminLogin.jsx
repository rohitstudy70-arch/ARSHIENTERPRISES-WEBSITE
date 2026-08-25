import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { FaLock, FaEnvelope, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await adminLogin(form.email.trim().toLowerCase(), form.password);
      toast.success('Welcome back, Admin!');
      navigate('/admin');
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed. Check your credentials.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      {/* Ambient glow background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-xl shadow-blue-500/25 mb-4">
            <FaShieldAlt size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-slate-500 text-sm mt-1">Arshi Enterprises</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/80 border border-white/[0.06] backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-black/60">
          <h2 className="text-lg font-semibold text-white mb-1">Sign in to continue</h2>
          <p className="text-slate-500 text-sm mb-6">Enter your admin credentials below</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="admin@arshigps.com"
                  className="w-full bg-slate-800/60 border border-white/[0.06] text-slate-200 placeholder-slate-600 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-sky-500/50 focus:bg-slate-800 transition-all"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="Enter your password"
                  className="w-full bg-slate-800/60 border border-white/[0.06] text-slate-200 placeholder-slate-600 rounded-xl pl-10 pr-12 py-3 text-sm focus:outline-none focus:border-sky-500/50 focus:bg-slate-800 transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <FaLock size={13} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Security notice */}
          <div className="mt-6 flex items-center gap-2 p-3 bg-slate-800/40 rounded-xl border border-white/[0.04]">
            <FaShieldAlt size={12} className="text-emerald-400 flex-shrink-0" />
            <p className="text-xs text-slate-500">
              This is a secured admin area. Unauthorized access is prohibited.
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-5">
          <a
            href="/"
            className="text-sm text-slate-600 hover:text-slate-400 transition-colors"
          >
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
}
