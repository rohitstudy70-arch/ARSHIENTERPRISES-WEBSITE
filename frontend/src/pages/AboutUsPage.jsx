import React, { useEffect } from 'react';
import { ShieldCheck, CheckCircle2, Zap, Radio, Phone, Mail, MapPin, Award, ChevronRight } from 'lucide-react';

export default function AboutUsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141b3d] via-[#0d122b] to-[#070a1a] text-white pt-28 pb-20">
      
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e3ab84]/10 border border-[#e3ab84]/30 text-xs font-extrabold text-[#e3ab84] uppercase tracking-wider mb-6">
          <ShieldCheck className="w-4 h-4" />
          <span>About Arshi Enterprises (Arshi GPS)</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
          Pioneering Smart Telematics & <br />
          <span className="text-[#e3ab84]">Fleet Intelligence</span> in India
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#b8c3e8] max-w-3xl mx-auto leading-relaxed">
          Headquartered in Purnea, Bihar, Arshi Enterprises is Eastern India's premier IoT vehicle tracking and fleet intelligence telematics provider, securing 10,000+ commercial vehicles.
        </p>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
          <div className="p-6 rounded-2xl bg-[#1a224a]/80 border border-[#5a69c8]/30 backdrop-blur-md">
            <span className="block text-3xl sm:text-4xl font-black text-[#4bc0ff]">10,000+</span>
            <span className="text-xs font-bold text-[#b8c3e8] uppercase tracking-wider">Live Vehicles</span>
          </div>
          <div className="p-6 rounded-2xl bg-[#1a224a]/80 border border-[#5a69c8]/30 backdrop-blur-md">
            <span className="block text-3xl sm:text-4xl font-black text-[#e3ab84]">500+</span>
            <span className="text-xs font-bold text-[#b8c3e8] uppercase tracking-wider">Fleet Owners</span>
          </div>
          <div className="p-6 rounded-2xl bg-[#1a224a]/80 border border-[#5a69c8]/30 backdrop-blur-md">
            <span className="block text-3xl sm:text-4xl font-black text-emerald-400">28+</span>
            <span className="text-xs font-bold text-[#b8c3e8] uppercase tracking-wider">States Approved</span>
          </div>
          <div className="p-6 rounded-2xl bg-[#1a224a]/80 border border-[#5a69c8]/30 backdrop-blur-md">
            <span className="block text-3xl sm:text-4xl font-black text-[#ff79e0]">99.9%</span>
            <span className="text-xs font-bold text-[#b8c3e8] uppercase tracking-wider">Cloud Uptime</span>
          </div>
        </div>
      </div>

      {/* Origin Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              From Local Roots in <span className="text-[#e3ab84]">Purnea, Bihar</span> to Pan-India Fleet Leader
            </h2>
            <p className="text-[#b8c3e8] text-base leading-relaxed">
              Arshi Enterprises was founded with a single mission: to empower transport operators, truck owners, school bus fleets, and taxi operators with affordable, military-grade GPS intelligence that eliminates fuel theft and vehicle insecurity.
            </p>
            <p className="text-[#b8c3e8] text-base leading-relaxed">
              What began as an on-ground initiative in Purnia has grown into an advanced IoT ecosystem connecting thousands of commercial trucks, mining dumpers, agricultural machinery, and passenger vehicles across Bihar, Jharkhand, Bengal, UP, and 28+ Indian States.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/917782808063?text=Namaste%20Arshi%20Enterprises!%20Mujhe%20GPS%20demo%20chahiye."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-[#f3c39a] to-[#d98f5e] text-[#1a0f40] hover:shadow-neonAmber hover:scale-[1.02] transition-all"
              >
                <span>Talk to Telematics Specialist</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#1a224a]/80 border border-[#5a69c8]/30 shadow-2xl backdrop-blur-xl space-y-4">
            <h3 className="text-xl font-extrabold text-white mb-4">Why Fleets Choose Arshi GPS</h3>
            <div className="space-y-3 text-xs text-[#b8c3e8]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><b>Doorstep Installation:</b> Dedicated mobile field engineers at your parking yard across Bihar.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><b>Direct RTO Passing:</b> MoRTH certified AIS 140 devices with official passing certificate on Vahan portal.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><b>Zero Battery Drain:</b> Smart micro-circuitry ensuring vehicle battery never discharges while parked.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><b>1-Year Replacement:</b> 100% replacement warranty with zero hassle.</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4 Pillars of Excellence */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Our 4 Pillars of <span className="text-[#e3ab84]">Excellence</span>
          </h2>
          <p className="mt-2 text-sm text-[#b8c3e8]">
            Engineered for extreme Indian road conditions and highest security
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 rounded-2xl bg-[#1a224a]/70 border border-[#5a69c8]/30 hover:border-[#e3ab84] transition group">
            <div className="text-3xl mb-4">🛰️</div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#e3ab84] transition">Military-Grade Hardware</h3>
            <p className="text-xs text-[#b8c3e8] leading-relaxed">IP67 waterproof casings, heavy vibration tolerance, anti-jammer guards, and high-gain GPS antennas.</p>
          </div>
          <div className="p-7 rounded-2xl bg-[#1a224a]/70 border border-[#5a69c8]/30 hover:border-[#e3ab84] transition group">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#e3ab84] transition">10-Sec Live Cloud Sync</h3>
            <p className="text-xs text-[#b8c3e8] leading-relaxed">High-throughput telemetry hosted on AWS Mumbai data centers ensuring zero latency and 90-day trip replay.</p>
          </div>
          <div className="p-7 rounded-2xl bg-[#1a224a]/70 border border-[#5a69c8]/30 hover:border-[#e3ab84] transition group">
            <div className="text-3xl mb-4">🚨</div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#e3ab84] transition">112 ERSS Police SOS</h3>
            <p className="text-xs text-[#b8c3e8] leading-relaxed">Integrated emergency panic button transmitting real-time distress alerts directly to the Police Command Center.</p>
          </div>
          <div className="p-7 rounded-2xl bg-[#1a224a]/70 border border-[#5a69c8]/30 hover:border-[#e3ab84] transition group">
            <div className="text-3xl mb-4">🛡️</div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#e3ab84] transition">Remote Engine Cut-Off</h3>
            <p className="text-xs text-[#b8c3e8] leading-relaxed">Immobilize unauthorized vehicle movement or hijack attempts with a single tap directly from your smartphone app.</p>
          </div>
        </div>
      </div>

      {/* Headquarters Address */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 rounded-3xl bg-[#1a224a]/80 border border-[#5a69c8]/30 shadow-2xl">
          <div className="text-3xl mb-3">📍</div>
          <h3 className="text-2xl font-black text-white mb-2">Registered Headquarters & NOC Center</h3>
          <p className="text-sm text-[#b8c3e8] mb-6">
            Hanuman Mandir, NH31, Maranga, near Vidya Vihar Institute Of Technology, Purnia - 854303, Bihar, India
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+917782808063"
              className="px-5 py-2.5 rounded-xl bg-[#4bc0ff]/10 border border-[#4bc0ff]/40 text-white text-xs font-bold flex items-center gap-2 hover:bg-[#4bc0ff]/20 transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#4bc0ff]" />
              <span>+91 77828 08063</span>
            </a>
            <a
              href="mailto:arshiranjeet133@gmail.com"
              className="px-5 py-2.5 rounded-xl bg-[#e3ab84]/10 border border-[#e3ab84]/40 text-[#e3ab84] text-xs font-bold flex items-center gap-2 hover:bg-[#e3ab84]/20 transition"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>arshiranjeet133@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
