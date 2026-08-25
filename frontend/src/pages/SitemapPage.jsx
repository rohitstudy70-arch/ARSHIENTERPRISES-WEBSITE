/**
 * Sitemap Page - Arshi GPS
 * Human-readable sitemap with all website pages and links
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { FaSitemap, FaChevronRight, FaHome, FaBoxOpen, FaCog, FaInfoCircle, FaEnvelope, FaShieldAlt, FaFileContract, FaUserShield } from 'react-icons/fa';

const SitemapSection = ({ icon: Icon, title, color, links }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center gap-3 mb-5">
      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
        <Icon className="text-white" size={18} />
      </div>
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
    </div>
    <ul className="space-y-2.5">
      {links.map((link, i) => (
        <li key={i}>
          <Link
            to={link.url}
            className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors group"
          >
            <FaChevronRight
              size={10}
              className="text-slate-300 group-hover:text-primary transition-colors flex-shrink-0"
            />
            <span className="text-sm">{link.label}</span>
            {link.badge && (
              <span className="ml-auto text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                {link.badge}
              </span>
            )}
          </Link>
          {link.desc && (
            <p className="text-xs text-slate-400 pl-4 mt-0.5">{link.desc}</p>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export const SitemapPage = () => {
  const sections = [
    {
      icon: FaHome,
      title: 'Main Pages',
      color: 'bg-blue-500',
      links: [
        { url: '/', label: 'Home', desc: 'Arshi GPS — India\'s trusted vehicle tracking solution', badge: 'Main' },
        { url: '/products', label: 'Products', desc: 'All GPS tracking devices and models' },
        { url: '/services', label: 'Services', desc: 'Fleet management, tracking & installation services' },
        { url: '/about', label: 'About Us', desc: 'Our story, team, and company history since 2013' },
        { url: '/contact', label: 'Contact Us', desc: 'Get in touch for quotes, support & callbacks' },
      ],
    },
    {
      icon: FaBoxOpen,
      title: 'GPS Products',
      color: 'bg-orange-500',
      links: [
        { url: '/products', label: 'All Products', desc: 'Browse our complete GPS tracker catalog' },
        { url: '/products/agt365n-advanced-gps-tracker', label: 'AGT365N — Advanced GPS Tracker', desc: 'Live tracking, engine lock, geofencing for cars & bikes' },
        { url: '/products/pro-365n-professional-fleet-tracker', label: 'PRO-365N — Professional Fleet Tracker', desc: 'Fuel monitoring, AC status, fleet-grade tracking' },
        { url: '/products/pro-lite-economical-tracker', label: 'PRO-Lite — Economical GPS Tracker', desc: 'Budget-friendly compact tracker for bikes & small cars' },
        { url: '/products/ais-140-government-rto-tracker', label: 'AIS 140 — Government RTO GPS', desc: 'RTO certified GPS for yellow-plate commercial vehicles' },
        { url: '/products/ksk-krish-e-smart-kit-tractor-gps', label: 'KSK — Tractor GPS (Krish-e Smart Kit)', desc: 'Diesel monitoring, area measurement for all tractors' },
        { url: '/products/magnet-gps-tracker-wireless-portable', label: 'Magnet GPS Tracker — Wireless & Portable', desc: 'No-install magnetic tracker for cars, bikes, assets' },
      ],
    },
    {
      icon: FaCog,
      title: 'Services',
      color: 'bg-violet-500',
      links: [
        { url: '/services', label: 'Real-time Vehicle Tracking', desc: 'Live GPS monitoring with route history' },
        { url: '/services', label: 'Fleet Management', desc: 'Manage multiple vehicles from one dashboard' },
        { url: '/services', label: 'Fuel Monitoring', desc: 'Track fuel levels, prevent fuel theft' },
        { url: '/services', label: 'Anti-Theft & Geofencing', desc: 'Engine lock, geofence alerts & alarms' },
        { url: '/services', label: 'AIS 140 RTO Compliance', desc: 'Government-certified tracking for commercial vehicles' },
        { url: '/services', label: 'Installation Support', desc: 'Pan-India professional installation network' },
      ],
    },
    {
      icon: FaInfoCircle,
      title: 'Company',
      color: 'bg-teal-500',
      links: [
        { url: '/about', label: 'About Arshi Enterprises', desc: 'Founded 2013 — GPS tracking specialists in Bihar' },
        { url: '/about', label: 'Our Mission & Vision', desc: 'Making vehicle safety accessible across India' },
        { url: '/contact', label: 'Get a Free Quote', desc: 'Contact our team for pricing and installation', badge: 'Free' },
        { url: '/contact', label: 'Request Callback', desc: 'Share your number, we call back in 15 minutes' },
      ],
    },
    {
      icon: FaShieldAlt,
      title: 'Legal & Policy',
      color: 'bg-slate-600',
      links: [
        { url: '/privacy-policy', label: 'Privacy Policy', desc: 'How we collect, use, and protect your data' },
        { url: '/terms-of-service', label: 'Terms of Service', desc: 'Terms for product purchase, use, and installation' },
        { url: '/sitemap', label: 'Sitemap', desc: 'Complete directory of all website pages' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Sitemap | Arshi GPS"
        description="Complete sitemap of the Arshi GPS website — find all pages including GPS products, services, company info, and legal policies."
        canonicalPath="/sitemap"
      />

      {/* Hero Banner */}
      <div className="bg-slate-900 text-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <FaSitemap className="text-cyan-400" size={28} />
            <h1 className="text-3xl md:text-4xl font-bold">Sitemap</h1>
          </div>
          <p className="text-slate-300 mt-2 max-w-xl">
            A complete directory of all pages on the Arshi GPS website. Find products, services, and information quickly.
          </p>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mt-4">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <FaChevronRight size={10} />
            <span className="text-white">Sitemap</span>
          </nav>
        </div>
      </div>

      {/* Sitemap Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Pages', value: '20+' },
            { label: 'GPS Products', value: '6' },
            { label: 'Services', value: '6+' },
            { label: 'Established', value: '2013' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section, i) => (
            <SitemapSection key={i} {...section} />
          ))}
        </div>

        {/* XML Sitemap Note */}
        <div className="mt-8 bg-slate-800 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-lg">📄 XML Sitemap for Search Engines</p>
            <p className="text-slate-300 text-sm mt-1">
              For search engine crawlers and SEO tools, an XML sitemap is available at:
            </p>
            <code className="text-cyan-400 text-sm mt-1 block">https://arshigps.com/sitemap.xml</code>
          </div>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            View XML →
          </a>
        </div>

        {/* Footer Nav */}
        <div className="flex flex-wrap gap-4 justify-center mt-8 text-sm text-slate-500">
          <Link to="/" className="hover:text-primary transition-colors">← Back to Home</Link>
          <span>|</span>
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <span>|</span>
          <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
