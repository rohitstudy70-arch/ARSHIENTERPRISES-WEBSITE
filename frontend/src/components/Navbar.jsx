import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Radio, Phone, Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phoneDisplay = "+91 77828 08063";
  const helplinePhone = "+917782808063";

  const toggleDropdown = (name) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#0a0630]/95 backdrop-blur-xl border-b border-[#3a2f9a]/70 py-3 shadow-2xl' 
        : 'bg-gradient-to-b from-[#0a0630]/95 via-[#0a0630]/60 to-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e3ab84] to-[#d98f5e] flex items-center justify-center text-[#1a0f40] shadow-lg shadow-[#e3ab84]/20 group-hover:scale-105 transition-transform font-black text-xl font-outfit">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-white font-outfit">
              Arshi <span className="text-[#e3ab84] italic font-serif">Enterprises</span>
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Home */}
          <Link 
            to="/"
            className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
              location.pathname === '/'
                ? 'text-[#e3ab84] bg-[#e3ab84]/15 border border-[#e3ab84]/40 shadow-sm'
                : 'text-[#b3aee0] hover:text-[#e3ab84]'
            }`}
          >
            Home
          </Link>

          {/* Company */}
          <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
            <button 
              onClick={() => toggleDropdown('company')}
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-[#b3aee0] hover:text-[#e3ab84] transition"
            >
              Company <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 w-64 py-2 bg-[#0f0945] border border-[#4a3cb5] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link to="/about-us" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">About Us</Link>
              <Link to="/about-us#leadership" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">Leadership</Link>
              <Link to="/events" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">Events</Link>
              <Link to="/about-us#awards" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">Awards & Recognitions</Link>
              <Link to="/about-us#timeline" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">Our Journey</Link>
              <Link to="/about-us#mission" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">Mission, Vision & Values</Link>
            </div>
          </div>

          {/* Product */}
          <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
            <button 
              onClick={() => toggleDropdown('product')}
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-[#b3aee0] hover:text-[#e3ab84] transition"
            >
              Product <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 w-72 py-2 bg-[#0f0945] border border-[#4a3cb5] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link to="/#hardware" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">AGT365N Pro GPS Tracker</Link>
              <Link to="/#hardware" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">PRO-365N Fleet Master</Link>
              <Link to="/#hardware" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">AIS 140 Govt. Certified GPS</Link>
              <div className="my-1 border-t border-[#3a2f9a]" />
              <Link to="/#hardware" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">Portable Wireless Magnetic GPS</Link>
              <Link to="/#hardware" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">Micro Bike & Scooter GPS</Link>
              <Link to="/#hardware" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">Agri Tractor & Harvester GPS</Link>
            </div>
          </div>

          {/* Approved States Direct Link */}
          <Link 
            to="/approved-states"
            className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
              location.pathname === '/approved-states'
                ? 'text-[#e3ab84] bg-[#e3ab84]/15 border border-[#e3ab84]/40 shadow-sm'
                : 'text-[#b3aee0] hover:text-[#e3ab84]'
            }`}
          >
            Approved States
          </Link>

          {/* Services */}
          <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
            <button 
              onClick={() => toggleDropdown('services')}
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-[#b3aee0] hover:text-[#e3ab84] transition"
            >
              Services <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 w-64 py-2 bg-[#0f0945] border border-[#4a3cb5] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link to="/#features" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">Live GPS Fleet Tracking</Link>
              <Link to="/#features" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">Diesel Theft Monitoring</Link>
              <Link to="/#features" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">Remote Engine Lock / Cut-Off</Link>
              <Link to="/#features" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">AIS 140 RTO Compliance</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
            <button 
              onClick={() => toggleDropdown('contact')}
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-[#b3aee0] hover:text-[#e3ab84] transition"
            >
              Contact <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 w-56 py-2 bg-[#0f0945] border border-[#4a3cb5] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link to="/#contact" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">Get Free Demo</Link>
              <a href={`tel:${helplinePhone}`} className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">Call Helpline</a>
              <a href="https://wa.me/917782808063" target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">WhatsApp Chat</a>
            </div>
          </div>

          {/* Insight */}
          <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
            <button 
              onClick={() => toggleDropdown('insight')}
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-[#b3aee0] hover:text-[#e3ab84] transition"
            >
              Insight <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 w-56 py-2 bg-[#0f0945] border border-[#4a3cb5] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link to="/#features" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">Blog & Articles</Link>
              <Link to="/#features" className="block px-4 py-2.5 text-xs font-semibold text-[#e9eefb] hover:bg-[#e3ab84]/15 hover:text-white border-l-2 border-transparent hover:border-[#e3ab84]">Industry News</Link>
            </div>
          </div>
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${helplinePhone}`}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white border border-[#4bc0ff]/40 bg-[#4bc0ff]/10 hover:bg-[#4bc0ff]/20 transition-all shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-[#4bc0ff]" />
            <div className="text-left leading-tight">
              <span className="block text-[8px] text-[#4bc0ff] font-extrabold uppercase tracking-wider">Helpline 24/7</span>
              <span>{phoneDisplay}</span>
            </div>
          </a>
          
          <a
            href="https://caronline.live/authentication/create"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-[#1a0f40] bg-gradient-to-r from-[#f3c39a] to-[#d98f5e] hover:shadow-neonAmber hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wider"
          >
            Login ↗
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-[#140d5c] border border-[#3a2f9a] text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0630]/98 border-b border-[#3a2f9a] px-6 py-6 flex flex-col gap-3 max-h-[85vh] overflow-y-auto">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-white py-2 border-b border-[#3a2f9a]/40">Home</Link>
          <a href="https://caronline.live/authentication/create" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-[#f3c39a] py-2 border-b border-[#3a2f9a]/40">🔐 Login to GPS Server ↗</a>
          <Link to="/about-us" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-white/90 py-2 border-b border-[#3a2f9a]/40">About Us</Link>
          <Link to="/events" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-white/90 py-2 border-b border-[#3a2f9a]/40">Events & Expos</Link>
          <Link to="/approved-states" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-[#e3ab84] py-2 border-b border-[#3a2f9a]/40">Approved States 🇮🇳</Link>
          <Link to="/#hardware" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-white/90 py-2 border-b border-[#3a2f9a]/40">GPS Hardware</Link>
          <Link to="/#features" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-white/90 py-2 border-b border-[#3a2f9a]/40">Features & Telematics</Link>
          <Link to="/#contact" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-white/90 py-2 border-b border-[#3a2f9a]/40">Contact Us</Link>
          <div className="pt-2 flex flex-col gap-2">
            <a href={`tel:${helplinePhone}`} className="py-2.5 rounded-xl border border-[#4bc0ff]/40 bg-[#4bc0ff]/10 text-xs font-bold text-center text-white">
              Call Helpline: {phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
