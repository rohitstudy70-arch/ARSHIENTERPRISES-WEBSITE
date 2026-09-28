import React, { useState, useEffect } from 'react';
import { Radio, Phone, MessageSquare, Menu, X, Shield, Cpu } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phoneDisplay = "+91 77828 08063";
  const whatsappUrl = "https://wa.me/917782808063?text=Namaste%20Arshi%20GPS%2C%20mujhe%20GPS%20tracking%20ka%20demo%20aur%20quote%20chahiye.";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#0a0630]/90 backdrop-blur-xl border-b border-[#3a2f9a]/70 py-3 shadow-2xl' 
        : 'bg-gradient-to-b from-[#0a0630]/90 via-[#0a0630]/40 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e3ab84] to-[#d98f5e] flex items-center justify-center text-[#1a0f40] shadow-lg shadow-[#e3ab84]/20 group-hover:scale-105 transition-transform">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white font-outfit">
                Arshi<span className="text-[#e3ab84]">GPS</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-[#4bc0ff]/20 text-[#4bc0ff] border border-[#4bc0ff]/40">
                PRO
              </span>
            </div>
            <span className="text-[11px] text-[#a9a4d6] font-medium -mt-1 tracking-wide">
              Smart Telematics & Fleet AI
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#hero" className="text-sm font-semibold text-white/90 hover:text-[#e3ab84] transition-colors">
            Home
          </a>
          <a href="#telematics" className="text-sm font-semibold text-white/70 hover:text-[#e3ab84] transition-colors">
            3D City
          </a>
          <a href="#features" className="text-sm font-semibold text-white/70 hover:text-[#e3ab84] transition-colors">
            Features
          </a>
          <a href="#hardware" className="text-sm font-semibold text-white/70 hover:text-[#e3ab84] transition-colors">
            GPS Trackers
          </a>
          <a href="#partners" className="text-sm font-semibold text-white/70 hover:text-[#e3ab84] transition-colors">
            Partners
          </a>
          <a href="#contact" className="text-sm font-semibold text-white/70 hover:text-[#e3ab84] transition-colors">
            Contact
          </a>
        </nav>

        {/* Header Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:+917782808063`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white border border-[#3a2f9a] hover:border-[#e3ab84] hover:bg-[#140d5c] transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-[#e3ab84]" />
            <span>{phoneDisplay}</span>
          </a>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#1a0f40] bg-gradient-to-r from-[#f3c39a] to-[#d98f5e] hover:shadow-neonAmber hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Free Demo</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-[#140d5c] border border-[#3a2f9a] text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0630]/98 border-b border-[#3a2f9a] px-6 py-6 flex flex-col gap-4">
          <a
            href="#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-white hover:text-[#e3ab84]"
          >
            Home
          </a>
          <a
            href="#telematics"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-white/80 hover:text-[#e3ab84]"
          >
            3D Smart City
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-white/80 hover:text-[#e3ab84]"
          >
            Features & Benefits
          </a>
          <a
            href="#hardware"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-white/80 hover:text-[#e3ab84]"
          >
            GPS Hardware
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-white/80 hover:text-[#e3ab84]"
          >
            Contact
          </a>
          <div className="pt-4 border-t border-[#3a2f9a] flex flex-col gap-3">
            <a
              href="tel:+917782808063"
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#3a2f9a] text-sm font-bold text-white bg-[#140d5c]"
            >
              <Phone className="w-4 h-4 text-[#e3ab84]" />
              Call {phoneDisplay}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-[#1a0f40] bg-gradient-to-r from-[#f3c39a] to-[#d98f5e]"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Free Demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
