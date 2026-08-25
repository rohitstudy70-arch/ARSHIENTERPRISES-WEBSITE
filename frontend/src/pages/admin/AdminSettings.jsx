import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { FaSave, FaCog, FaGlobe, FaHashtag, FaBell, FaWrench, FaCheck } from 'react-icons/fa';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: '',
    siteEmail: '',
    phone: '',
    whatsapp: '',
    address: '',
    socialFacebook: '',
    socialInstagram: '',
    socialTwitter: '',
    socialYoutube: '',
    metaTitle: '',
    metaDescription: '',
    leadNotificationEmail: '',
    inquiryNotificationEmail: '',
    maintenanceMode: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminAPI.getSettings();
        setSettings(prev => ({ ...prev, ...(res.data.data || {}) }));
      } catch {
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (field, value) => setSettings(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminAPI.updateSettings(settings);
      toast.success('Settings saved!');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <div className="w-10 h-10 border-2 border-slate-500/30 border-t-slate-500 rounded-full animate-spin" />
      <p className="text-xs text-slate-500">Loading settings...</p>
    </div>
  );

  const Section = ({ title, icon: Icon, gradient, children }) => (
    <div className="bg-slate-800/60 border border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <Icon size={13} className="text-white" />
        </div>
        <h3 className="font-semibold text-white text-sm">{title}</h3>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );

  const Field = ({ label, type = 'text', field, placeholder, rows, hint }) => (
    <div>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">{label}</label>
      {rows ? (
        <textarea
          value={settings[field] || ''}
          onChange={e => handleChange(field, e.target.value)}
          rows={rows}
          className="w-full bg-slate-900/60 border border-white/[0.06] text-slate-200 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500/50 focus:bg-slate-900 transition-all resize-none"
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          value={settings[field] || ''}
          onChange={e => handleChange(field, e.target.value)}
          className="w-full bg-slate-900/60 border border-white/[0.06] text-slate-200 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500/50 focus:bg-slate-900 transition-all"
          placeholder={placeholder}
        />
      )}
      {hint && <p className="text-xs text-slate-600 mt-1.5">{hint}</p>}
    </div>
  );

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 text-sm mt-0.5">Manage your site configuration and preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* General */}
        <Section title="General Information" icon={FaCog} gradient="from-slate-500 to-gray-600">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Site Name" field="siteName" placeholder="Arshi Enterprises" />
            <Field label="Contact Email" field="siteEmail" type="email" placeholder="arshiranjeet133@gmail.com" />
            <Field label="Phone Number" field="phone" placeholder="+91 77828 08063" />
            <Field label="WhatsApp Number" field="whatsapp" placeholder="+91 77828 08063" />
          </div>
          <Field label="Business Address" field="address" rows={2} placeholder="Full business address..." />
        </Section>

        {/* Social Media */}
        <Section title="Social Media" icon={FaGlobe} gradient="from-sky-500 to-blue-600">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Facebook" field="socialFacebook" placeholder="https://facebook.com/..." />
            <Field label="Instagram" field="socialInstagram" placeholder="https://instagram.com/..." />
            <Field label="Twitter / X" field="socialTwitter" placeholder="https://twitter.com/..." />
            <Field label="YouTube" field="socialYoutube" placeholder="https://youtube.com/..." />
          </div>
        </Section>

        {/* SEO */}
        <Section title="SEO & Meta" icon={FaHashtag} gradient="from-violet-500 to-purple-600">
          <Field
            label="Default Meta Title"
            field="metaTitle"
            placeholder="Arshi GPS - GPS Tracking Solutions"
            hint="Appears in browser tab and search results. Keep under 60 characters."
          />
          <Field
            label="Default Meta Description"
            field="metaDescription"
            rows={2}
            placeholder="Professional GPS tracking solutions for businesses and fleets..."
            hint="Appears in search results. Keep under 160 characters."
          />
        </Section>

        {/* Notifications */}
        <Section title="Email Notifications" icon={FaBell} gradient="from-rose-500 to-red-600">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Lead Notification Email"
              field="leadNotificationEmail"
              type="email"
              placeholder="admin@arshigps.com"
              hint="Receive email when a new lead is captured"
            />
            <Field
              label="Inquiry Notification Email"
              field="inquiryNotificationEmail"
              type="email"
              placeholder="admin@arshigps.com"
              hint="Receive email when a new inquiry is submitted"
            />
          </div>
        </Section>

        {/* Maintenance */}
        <Section title="Maintenance" icon={FaWrench} gradient="from-amber-500 to-orange-600">
          <div className="flex items-center justify-between p-4 bg-slate-900/40 rounded-xl border border-white/[0.04]">
            <div>
              <p className="text-sm font-medium text-slate-200">Maintenance Mode</p>
              <p className="text-xs text-slate-500 mt-0.5">
                When enabled, visitors will see a maintenance page instead of your site.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleChange('maintenanceMode', !settings.maintenanceMode)}
              className={`relative flex-shrink-0 w-12 h-6 rounded-full transition-all duration-300 ${
                settings.maintenanceMode ? 'bg-red-500' : 'bg-slate-600'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${
                settings.maintenanceMode ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
          {settings.maintenanceMode && (
            <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
              <p className="text-xs text-red-400 font-medium">Maintenance mode is active. Your website is not accessible to visitors.</p>
            </div>
          )}
        </Section>

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg ${
              saved
                ? 'bg-emerald-500 text-white shadow-emerald-500/25'
                : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5'
            } disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {saving ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
            ) : saved ? (
              <><FaCheck size={13} /> Saved!</>
            ) : (
              <><FaSave size={13} /> Save Settings</>
            )}
          </button>
          {saved && (
            <span className="text-xs text-emerald-400 animate-fadeIn">All changes saved successfully</span>
          )}
        </div>
      </form>
    </div>
  );
}
