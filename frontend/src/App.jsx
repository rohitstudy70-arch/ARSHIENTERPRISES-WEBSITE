import React from 'react';
import Navbar from './components/Navbar';
import NeonCity3D from './components/NeonCity3D';
import FeaturesSection from './components/FeaturesSection';
import HardwareCatalog from './components/HardwareCatalog';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { 
  ShieldCheck, 
  Zap, 
  MessageSquare, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  Radio, 
  Navigation,
  Fuel,
  Cpu
} from 'lucide-react';

export default function App() {
  const phone = "+91 77828 08063";
  const whatsappUrl = "https://wa.me/917782808063?text=Namaste%20Arshi%20GPS%2C%20mujhe%20GPS%20tracking%20ka%20demo%20aur%20quote%20chahiye.";

  return (
    <div className="min-h-screen bg-[#0a0630] text-white selection:bg-[#e3ab84] selection:text-[#1a0f40] relative">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Floating WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Us"
        className="fixed right-6 bottom-6 z-50 w-14 h-14 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-2xl shadow-[#25d366]/40 hover:scale-110 active:scale-95 transition-all group"
      >
        <MessageSquare className="w-7 h-7 fill-current" />
        <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-[#0a0630] border border-[#3a2f9a] text-xs font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          Chat on WhatsApp
        </span>
      </a>

      {/* =========================================================================
          HERO & 3D NEON CITY SECTION
          ========================================================================= */}
      <section id="hero" className="pt-32 pb-20 relative overflow-hidden">
        {/* Background glow orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#3f6bff]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-[#e3ab84]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#140d5c] border border-[#3a2f9a] text-xs font-bold text-[#e3ab84] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#e3ab84] animate-pulse" />
                <span>24/7 Smart Telematics & Fleet Control</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                Track every <span className="text-[#e3ab84]">vehicle.</span><br />
                Save every <span className="text-[#4bc0ff]">rupee.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#b3aee0] max-w-xl leading-relaxed">
                Bihar aur poore Bharat ke truck, bus, taxi aur school-van fleet owners ka bharosemand GPS partner. Diesel chori roko, live location dekho aur gaadi ka kharcha bachao.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#f3c39a] to-[#d98f5e] text-[#1a0f40] hover:shadow-neonAmber hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Get Free Demo on WhatsApp</span>
                </a>

                <a
                  href="tel:+917782808063"
                  className="px-6 py-4 rounded-xl font-bold text-sm border border-[#3a2f9a] text-white hover:border-[#e3ab84] hover:bg-[#140d5c] transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#e3ab84]" />
                  <span>Call Direct: {phone}</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#3a2f9a]/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#e3ab84] shrink-0" />
                  <span className="text-xs text-[#b3aee0] font-medium">ARAI & CDAC Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#4bc0ff] shrink-0" />
                  <span className="text-xs text-[#b3aee0] font-medium">10-Sec Live Refresh</span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-[#ff79e0] shrink-0" />
                  <span className="text-xs text-[#b3aee0] font-medium">Pan-India Roaming</span>
                </div>
              </div>

            </div>

            {/* Right Column: 3D Isometric Neon City Viewport */}
            <div id="telematics" className="lg:col-span-6">
              <NeonCity3D />
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          CAPABILITIES / WHAT WE DO
          ========================================================================= */}
      <FeaturesSection />

      {/* =========================================================================
          HARDWARE & PRODUCTS CATALOG
          ========================================================================= */}
      <HardwareCatalog />

      {/* =========================================================================
          HOW IT WORKS (3 SIMPLE STEPS)
          ========================================================================= */}
      <section className="py-20 bg-[#140d5c]/20 border-t border-[#3a2f9a]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Kaise Kaam <span className="text-[#e3ab84]">Karta Hai?</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#b3aee0]">
              Sirf 3 aasan steps me aapki poori gaadi aur fleet online track ho jayegi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-2xl border border-[#3a2f9a] text-center relative group hover:border-[#e3ab84] transition">
              <div className="w-14 h-14 rounded-2xl bg-[#e3ab84] text-[#1a0f40] font-black text-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#e3ab84]/20">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Device Lagwayein</h3>
              <p className="text-xs sm:text-sm text-[#b3aee0]">
                Hamari certified technical team aapke location par aakar gaadi me GPS device install karti hai.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-[#3a2f9a] text-center relative group hover:border-[#4bc0ff] transition">
              <div className="w-14 h-14 rounded-2xl bg-[#4bc0ff] text-[#1a0f40] font-black text-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#4bc0ff]/20">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-2">App Se Jodein</h3>
              <p className="text-xs sm:text-sm text-[#b3aee0]">
                Aapke Android / iPhone par secure mobile application aur login credentials milte hain.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-[#3a2f9a] text-center relative group hover:border-[#ff79e0] transition">
              <div className="w-14 h-14 rounded-2xl bg-[#ff79e0] text-[#1a0f40] font-black text-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#ff79e0]/20">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-2">24/7 Live Dekhein</h3>
              <p className="text-xs sm:text-sm text-[#b3aee0]">
                Har gaadi ki live speed, exact location, diesel mileage aur trip reports kabhi bhi check karein.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          TECHNOLOGY PARTNERS
          ========================================================================= */}
      <section id="partners" className="py-16 bg-[#0a0630] border-t border-[#3a2f9a]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#a9a4d6] mb-8">
            Trusted Platform & Hardware Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-70 hover:opacity-100 transition-opacity">
            {['iTriangle', 'Accolade Telematics', 'MARKON Tech', 'ACUTE Solutions', 'RDM Controls', 'Teltonika'].map((partner, i) => (
              <div key={i} className="px-6 py-3 rounded-xl bg-[#140d5c]/60 border border-[#3a2f9a] text-sm font-bold text-[#b3aee0]">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTACT & LEAD FORM
          ========================================================================= */}
      <ContactSection />

      {/* =========================================================================
          FOOTER
          ========================================================================= */}
      <Footer />

    </div>
  );
}
