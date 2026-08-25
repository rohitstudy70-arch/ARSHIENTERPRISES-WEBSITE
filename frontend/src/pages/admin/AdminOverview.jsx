import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import toast from 'react-hot-toast';
import {
  FaBox, FaEnvelope, FaPhone, FaStar,
  FaArrowUp, FaArrowDown, FaArrowRight, FaPlus, FaBolt
} from 'react-icons/fa';


// Animated counter hook
function useCounter(target, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!target) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.floor(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
}

const StatCard = ({ label, value, icon: Icon, gradient, link, trend, trendVal }) => {
  const animated = useCounter(value);
  return (
    <Link to={link} className="group relative overflow-hidden rounded-2xl bg-slate-800/60 border border-white/[0.06] p-5 hover:bg-slate-800/90 transition-all duration-300 hover:border-white/10 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-0.5">
      {/* Glow */}
      <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300 blur-xl`} />

      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
          <Icon size={18} className="text-white" />
        </div>
        {trend !== undefined && (
          <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            trend >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {trend >= 0 ? <FaArrowUp size={8} /> : <FaArrowDown size={8} />}
            {Math.abs(trendVal || trend)}%
          </span>
        )}
      </div>

      <p className="text-3xl font-bold text-white mb-1 tabular-nums">{animated.toLocaleString()}</p>
      <p className="text-xs font-medium text-slate-400">{label}</p>

      {/* Bottom arrow */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <FaArrowRight size={11} className="text-slate-400" />
      </div>
    </Link>
  );
};

export default function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminAPI.getStats();
        setStats(res.data.data);
      } catch {
        toast.error('Failed to load stats');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
        <p className="text-xs text-slate-500">Loading dashboard...</p>
      </div>
    </div>
  );

  const cards = [
    { label: 'Total Products', value: stats?.totalProducts || 0, icon: FaBox, gradient: 'from-violet-500 to-purple-600', link: '/admin/products', trend: 0 },
    { label: 'Total Inquiries', value: stats?.totalInquiries || 0, icon: FaEnvelope, gradient: 'from-emerald-500 to-green-600', link: '/admin/inquiries', trend: 0 },
    { label: 'New Inquiries', value: stats?.newInquiries || 0, icon: FaArrowUp, gradient: 'from-orange-500 to-amber-600', link: '/admin/inquiries', trend: 0 },
    { label: 'Total Leads', value: stats?.totalLeads || 0, icon: FaPhone, gradient: 'from-sky-500 to-blue-600', link: '/admin/leads', trend: 0 },
    { label: 'New Leads', value: stats?.newLeads || 0, icon: FaArrowUp, gradient: 'from-rose-500 to-red-600', link: '/admin/leads', trend: 0 },
    { label: 'Testimonials', value: stats?.totalTestimonials || 0, icon: FaStar, gradient: 'from-yellow-500 to-orange-500', link: '/admin/testimonials', trend: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FaBolt className="text-sky-400" size={14} />
            <span className="text-xs font-medium text-sky-400 uppercase tracking-wider">Dashboard</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Overview</h1>
          <p className="text-slate-400 text-sm mt-0.5">Here's what's happening with your business today.</p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
        >
          <FaPlus size={12} />
          <span className="hidden sm:inline">Add Product</span>
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {cards.map((card, i) => <StatCard key={i} {...card} />)}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Recent Inquiries */}
        {stats?.recentInquiries?.length > 0 && (
          <div className="bg-slate-800/60 border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                  <FaEnvelope size={13} className="text-white" />
                </div>
                <h3 className="font-semibold text-white text-sm">Recent Inquiries</h3>
              </div>
              <Link to="/admin/inquiries" className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 transition-colors font-medium">
                View all <FaArrowRight size={9} />
              </Link>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {stats.recentInquiries.slice(0, 5).map(inq => (
                <div key={inq._id} className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.02] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-400 text-xs font-bold">
                      {(inq.name || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-200 truncate">{inq.name}</p>
                    <p className="text-xs text-slate-500 truncate">{inq.message}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                    inq.status === 'new' ? 'bg-orange-500/15 text-orange-400' :
                    inq.status === 'responded' ? 'bg-emerald-500/15 text-emerald-400' :
                    'bg-slate-600/50 text-slate-400'
                  }`}>{inq.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Leads */}
        {stats?.recentLeads?.length > 0 && (
          <div className="bg-slate-800/60 border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                  <FaPhone size={13} className="text-white" />
                </div>
                <h3 className="font-semibold text-white text-sm">Recent Leads</h3>
              </div>
              <Link to="/admin/leads" className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 transition-colors font-medium">
                View all <FaArrowRight size={9} />
              </Link>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {stats.recentLeads.slice(0, 5).map(lead => (
                <div key={lead._id} className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.02] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                    <FaPhone size={11} className="text-sky-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-200 truncate">{lead.name || 'Visitor'}</p>
                    <p className="text-xs text-slate-500">{lead.phone}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                    lead.status === 'new' ? 'bg-sky-500/15 text-sky-400' :
                    lead.status === 'contacted' ? 'bg-amber-500/15 text-amber-400' :
                    lead.status === 'converted' ? 'bg-emerald-500/15 text-emerald-400' :
                    'bg-red-500/15 text-red-400'
                  }`}>{lead.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800/60 border border-white/[0.06] rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Add Product', to: '/admin/products/new', gradient: 'from-violet-500 to-purple-600', icon: FaBox },
            { label: 'View Inquiries', to: '/admin/inquiries', gradient: 'from-emerald-500 to-green-600', icon: FaEnvelope },
            { label: 'Manage Leads', to: '/admin/leads', gradient: 'from-sky-500 to-blue-600', icon: FaPhone },
            { label: 'Settings', to: '/admin/settings', gradient: 'from-slate-500 to-gray-600', icon: FaStar },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                to={action.to}
                className="group flex flex-col items-center gap-2.5 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200`}>
                  <Icon size={16} className="text-white" />
                </div>
                <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 transition-colors text-center">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
