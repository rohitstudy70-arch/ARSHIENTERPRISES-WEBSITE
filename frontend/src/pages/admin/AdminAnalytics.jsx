import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import toast from 'react-hot-toast';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from 'recharts';
import { FaChartLine, FaChartBar } from 'react-icons/fa';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-white/10 rounded-xl px-3 py-2 shadow-2xl">
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminAPI.getAnalytics();
        setAnalytics(res.data.data);
      } catch {
        toast.error('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <div className="w-10 h-10 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      <p className="text-xs text-slate-500">Loading analytics...</p>
    </div>
  );

  if (!analytics) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <div className="w-20 h-20 bg-slate-800/60 rounded-2xl flex items-center justify-center">
        <FaChartBar size={32} className="text-slate-600" />
      </div>
      <div className="text-center">
        <p className="text-slate-300 font-semibold text-lg">Analytics Not Available</p>
        <p className="text-slate-500 text-sm mt-1">Connect your backend to enable analytics tracking.</p>
      </div>
    </div>
  );

  const COLORS = {
    inquiries: '#38bdf8',
    leads: '#a78bfa',
    bar: '#818cf8',
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-slate-400 text-sm mt-0.5">Performance insights and trends</p>
      </div>

      {/* Charts */}
      <div className="space-y-5">
        {/* Inquiries Over Time */}
        {analytics.inquiriesOverTime && (
          <div className="bg-slate-800/60 border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center">
                <FaChartLine size={13} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Inquiries Over Time</h3>
                <p className="text-xs text-slate-500">Daily inquiry volume</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={analytics.inquiriesOverTime}>
                <defs>
                  <linearGradient id="inquiriesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.inquiries} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={COLORS.inquiries} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke={COLORS.inquiries}
                  strokeWidth={2}
                  fill="url(#inquiriesGrad)"
                  name="Inquiries"
                  dot={false}
                  activeDot={{ r: 4, fill: COLORS.inquiries, stroke: '#0f172a', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Leads Over Time */}
        {analytics.leadsOverTime && (
          <div className="bg-slate-800/60 border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <FaChartBar size={13} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Leads Over Time</h3>
                <p className="text-xs text-slate-500">Daily lead captures</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={analytics.leadsOverTime} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill={COLORS.leads} name="Leads" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Bottom Row */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Lead Sources */}
          {analytics.leadSources && (
            <div className="bg-slate-800/60 border border-white/[0.06] rounded-2xl p-5">
              <h3 className="font-semibold text-white text-sm mb-4">Lead Sources</h3>
              <div className="space-y-4">
                {analytics.leadSources.map((src, i) => {
                  const total = analytics.leadSources.reduce((s, x) => s + x.count, 0);
                  const pct = total ? Math.round((src.count / total) * 100) : 0;
                  const colors = ['from-sky-500 to-blue-600', 'from-violet-500 to-purple-600', 'from-emerald-500 to-green-600', 'from-amber-500 to-orange-600'];
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="capitalize text-slate-300 font-medium">{src._id || 'Unknown'}</span>
                        <span className="text-slate-500">{src.count} <span className="text-slate-600">({pct}%)</span></span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full bg-gradient-to-r ${colors[i % colors.length]} transition-all duration-700`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Inquiry Types */}
          {analytics.inquiryTypes && (
            <div className="bg-slate-800/60 border border-white/[0.06] rounded-2xl p-5">
              <h3 className="font-semibold text-white text-sm mb-4">Inquiry Types</h3>
              <div className="space-y-4">
                {analytics.inquiryTypes.map((type, i) => {
                  const total = analytics.inquiryTypes.reduce((s, x) => s + x.count, 0);
                  const pct = total ? Math.round((type.count / total) * 100) : 0;
                  const colors = ['from-emerald-500 to-teal-600', 'from-sky-500 to-cyan-600', 'from-rose-500 to-red-600', 'from-amber-500 to-yellow-600'];
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="capitalize text-slate-300 font-medium">{type._id || 'General'}</span>
                        <span className="text-slate-500">{type.count} <span className="text-slate-600">({pct}%)</span></span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full bg-gradient-to-r ${colors[i % colors.length]} transition-all duration-700`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
