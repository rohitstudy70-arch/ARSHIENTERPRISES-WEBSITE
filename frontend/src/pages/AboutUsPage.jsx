import React, { useEffect, useState } from 'react';
import { ShieldCheck, CheckCircle2, Zap, Radio, Phone, Mail, MapPin, Award, Trophy, FileCheck, Calendar, Sparkles, ChevronRight, RotateCcw } from 'lucide-react';
import bwAwardImg from '../assets/award-bw-businessworld-2021.jpg';
import trophyMsme3dImg from '../assets/trophy-india-5000-3d.jpg';
import isoQroImg from '../assets/certificate-iso-9001-qro-2024.jpg';
import msmeCertImg from '../assets/award-india-5000-msme-2020.jpg';
import isoOtabuImg from '../assets/certificate-iso-9001-otabu.jpg';
import msmeDocImg from '../assets/award-india-5000-certificate-doc.jpg';

export default function AboutUsPage() {
  const [fullscreenItem, setFullscreenItem] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setFullscreenItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnter = (item) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const t = setTimeout(() => {
      setFullscreenItem(item);
    }, 260);
    setHoverTimeout(t);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
  };

  const handleClick = (item) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setFullscreenItem(item);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-20">
      
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-xs font-extrabold text-amber-900 uppercase tracking-wider mb-6 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>About Arshi Enterprises (Arshi GPS)</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900">
          Pioneering Smart Telematics & <br />
          <span className="text-amber-600">Fleet Intelligence</span> in India
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Headquartered in Purnea, Bihar, Arshi Enterprises is Eastern India's premier IoT vehicle tracking and fleet intelligence telematics provider, securing 10,000+ commercial vehicles.
        </p>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <span className="block text-3xl sm:text-4xl font-black text-blue-600">10,000+</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Live Vehicles</span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <span className="block text-3xl sm:text-4xl font-black text-amber-600">500+</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Fleet Owners</span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <span className="block text-3xl sm:text-4xl font-black text-emerald-600">28+</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">States Approved</span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <span className="block text-3xl sm:text-4xl font-black text-purple-600">99.9%</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Cloud Uptime</span>
          </div>
        </div>
      </div>

      {/* Origin Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              From Local Roots in <span className="text-amber-600">Purnea, Bihar</span> to Pan-India Fleet Leader
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Arshi Enterprises was founded with a single mission: to empower transport operators, truck owners, school bus fleets, and taxi operators with affordable, military-grade GPS intelligence that eliminates fuel theft and vehicle insecurity.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              What began as an on-ground initiative in Purnia has grown into an advanced IoT ecosystem connecting thousands of commercial trucks, mining dumpers, agricultural machinery, and passenger vehicles across Bihar, Jharkhand, Bengal, UP, and 28+ Indian States.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/917782808063?text=Hello%20Arshi%20Enterprises!%20I%20would%20like%20to%20request%20a%20GPS%20telematics%20consultation%20and%20demo."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <span>Talk to Telematics Specialist</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900 mb-4">Why Fleets Choose Arshi GPS</h3>
            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><b>Doorstep Installation:</b> Dedicated mobile field engineers at your parking yard across Bihar.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><b>Direct RTO Passing:</b> MoRTH certified AIS 140 devices with official passing certificate on Vahan portal.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><b>Zero Battery Drain:</b> Smart micro-circuitry ensuring vehicle battery never discharges while parked.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><b>1-Year Replacement:</b> 100% replacement warranty with zero hassle.</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Our Strategic Council (Leadership) */}
      <div id="leadership" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="mb-10">
          <span className="text-xs font-black uppercase text-blue-600 tracking-widest block mb-2">
            Driving Precision & Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Our Strategic Council
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
            Meet the visionaries at Arshi Enterprises. Our leaders combine decades of telematics expertise with a commitment to technological authority, ensuring every fleet operator benefits from precision-engineered compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Leader 1: Ranjeet Kumar (Managing Director) */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row group hover:-translate-y-1">
            <div className="sm:w-5/12 min-h-[280px] bg-slate-100 relative overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                alt="Ranjeet Kumar - Managing Director"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-7 sm:p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-black text-blue-900 mb-1">
                Ranjeet Kumar
              </h3>
              <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-4">
                Managing Director
              </div>
              <blockquote className="text-sm italic text-slate-600 leading-relaxed border-l-2 border-amber-500 pl-4 my-0">
                "Operational excellence, strategic vision, and prompt doorstep support are the bridges between our telematics technology and its tangible economic impact on ground for commercial transporters."
              </blockquote>
            </div>
          </div>

          {/* Leader 2: Archana Jha (Operational Director) */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row group hover:-translate-y-1">
            <div className="sm:w-5/12 min-h-[280px] bg-slate-100 relative overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt="Archana Jha - Operational Director"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-7 sm:p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-black text-blue-900 mb-1">
                Archana Jha
              </h3>
              <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-4">
                Operational Director
              </div>
              <blockquote className="text-sm italic text-slate-600 leading-relaxed border-l-2 border-amber-500 pl-4 my-0">
                "Behind every moving vehicle is our relentless 24/7 operations and support. At Arshi Enterprises, we ensure that no fleet owner ever feels alone on the road — delivering instant backend assistance, unwavering care, and absolute trust across India."
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Awards & Recognitions */}
      <div id="awards" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase text-blue-600 tracking-widest block mb-2">
            Honors & Distinctions
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Awards & <span className="text-amber-600">Recognitions</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Celebrating our relentless commitment to telematics innovation, strict government compliance, and 24/7 service trust across India.
          </p>
        </div>

        {/* 3 Compact Dedicated 3D Showcase Cards (1 Row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-12">
          {/* Large 3D Card 1: 3D Holographic Certificate */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
            <div className="flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-200">
              <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-200 flex-wrap gap-2 text-slate-900">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black uppercase tracking-wider">
                    <Trophy className="w-3.5 h-3.5 text-amber-600" />
                    Winner 2021 • Special Mention
                  </span>
                  <span className="text-[11px] font-black text-amber-600 uppercase tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> 3D Tilt View
                  </span>
                </div>
              </div>

              <div className="w-full h-72 sm:h-[310px] relative bg-slate-50/50">
                <iframe
                  src="/certificate-3d.html"
                  title="3D Interactive Holographic Certificate"
                  className="w-full h-full border-0 block"
                  loading="eager"
                />
              </div>
            </div>

            <div className="p-5 sm:p-6 flex flex-col flex-1">
              <div className="text-[11px] font-black uppercase tracking-wider text-amber-700 mb-1.5">
                National Emerging Business Honor
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1.5 group-hover:text-amber-600 transition leading-snug">
                Best Service by Emerging Enterprise
              </h3>
              <div className="text-xs font-bold text-blue-700 mb-3">
                BW Businessworld & BWSME World (Jury Chair: Former SEBI Chairman U.K. Sinha • Supported by NSIC)
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4">
                Conferred by a high-level national jury chaired by U.K. Sinha (Former Chairman, SEBI) & supported by NSIC, celebrating Arshi GPS 3D emblem innovation, 24/7 client-first GPS fleet management, fast field engineering resolution, and benchmark customer trust across Eastern India.
              </p>

              <div className="mt-auto space-y-2">
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <Award className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium">Jury Chaired by Former SEBI Chairman U.K. Sinha</span>
                </div>
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium">Supported by National Small Industries Corporation (NSIC)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Large 3D Card 2: 3D Golden Trophy */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
            <div className="flex flex-col bg-white border-b border-slate-200">
              <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-[#e7dfd1] flex-wrap gap-2 text-slate-800">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    Winner 2020 • 3D Gold Trophy
                  </span>
                  <span className="text-[11px] font-black text-amber-700 uppercase tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> 3D Tilt View
                  </span>
                </div>
              </div>

              <div className="w-full h-72 sm:h-[310px] relative bg-white">
                <iframe
                  src="/trophy-360.html"
                  title="3D Interactive Trophy"
                  className="w-full h-full border-0 block"
                  loading="eager"
                />
              </div>
            </div>

            <div className="p-5 sm:p-6 flex flex-col flex-1">
              <div className="text-[11px] font-black uppercase tracking-wider text-amber-700 mb-1.5">
                National Quality Excellence Trophy
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1.5 group-hover:text-amber-600 transition leading-snug">
                India 5000 Best MSME National Trophy
              </h3>
              <div className="text-xs font-bold text-blue-700 mb-3">
                Benchmark Trust & TQV Audit Partner (Winner 2020 • Arshi Enterprises)
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4">
                Honored with the official physical 3D Golden MSME Trophy for outstanding business leadership, zero-failure telematics hardware deployments, high-precision satellite telemetry, and boosting operational logistics profitability for commercial fleets across India.
              </p>

              <div className="mt-auto space-y-2">
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium">Audited & Verified by Benchmark Trust & TQV Certification</span>
                </div>
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium">Pan-India Recognition for Quality Excellence in GPS Telematics</span>
                </div>
              </div>
            </div>
          </div>

          {/* Large 3D Card 3: 3D Interactive Gold Plaque */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
            <div className="flex flex-col bg-gradient-to-br from-[#faf7f2] to-[#f3ede2] border-b border-slate-200">
              <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-[#e7dfd1] flex-wrap gap-2 text-slate-800">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    Winner 2020 • Gold Seal Plaque
                  </span>
                  <span className="text-[11px] font-black text-amber-700 uppercase tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> 3D Tilt View
                  </span>
                </div>
              </div>

              <div className="w-full h-72 sm:h-[310px] relative bg-[#faf7f2]/50">
                <iframe
                  src="/plaque-3d.html"
                  title="3D Interactive Gold Plaque"
                  className="w-full h-full border-0 block"
                  loading="eager"
                />
              </div>
            </div>

            <div className="p-5 sm:p-6 flex flex-col flex-1">
              <div className="text-[11px] font-black uppercase tracking-wider text-amber-700 mb-1.5">
                National Excellence Honor
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1.5 group-hover:text-amber-600 transition leading-snug">
                India 5000 Gold Laurel Wreath Plaque
              </h3>
              <div className="text-xs font-bold text-blue-700 mb-3">
                Benchmark Trust & National MSME Jury (Winner 2020)
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4">
                Conferred with the prestigious Golden Laurel Wreath Plaque for outstanding telematics service quality, setting new logistics safety benchmarks, and high-precision GPS tracking across India.
              </p>

              <div className="mt-auto space-y-2">
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium">Physical Commemorative Hardwood & Brass Gold Plaque</span>
                </div>
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium">Official Benchmark Trust National Quality Seal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Excellence */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Our 4 Pillars of <span className="text-amber-600">Excellence</span>
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Engineered for extreme Indian road conditions and highest security
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition group">
            <div className="text-3xl mb-4">🛰️</div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition">Military-Grade Hardware</h3>
            <p className="text-xs text-slate-600 leading-relaxed">IP67 waterproof casings, heavy vibration tolerance, anti-jammer guards, and high-gain GPS antennas.</p>
          </div>
          <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition group">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition">10-Sec Live Cloud Sync</h3>
            <p className="text-xs text-slate-600 leading-relaxed">High-throughput telemetry hosted on AWS Mumbai data centers ensuring zero latency and 90-day trip replay.</p>
          </div>
          <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition group">
            <div className="text-3xl mb-4">🚨</div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition">112 ERSS Police SOS</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Integrated emergency panic button transmitting real-time distress alerts directly to the Police Command Center.</p>
          </div>
          <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition group">
            <div className="text-3xl mb-4">🛡️</div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition">Remote Engine Cut-Off</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Immobilize unauthorized vehicle movement or hijack attempts with a single tap directly from your smartphone app.</p>
          </div>
        </div>
      </div>

      {/* Why Work With Us (Careers Circular Hub) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20" id="careers">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 mb-2 block">Career Opportunities</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Why Work With <span className="text-amber-600">Arshi Enterprises</span>
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              "Innovate. Impact. Grow — Powered by India's Telematics Leader."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-white transition-all shadow-sm">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-base font-black text-slate-900 mb-1.5">Attractive Salary & Daily TA/DA</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Guaranteed on-time monthly salary payout with generous daily on-field travel allowances (TA/DA) for every field installation and service visit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-white transition-all shadow-sm">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-base font-black text-slate-900 mb-1.5">Field Safety & Insurance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ₹5 Lakh on-field accidental insurance coverage, certified safety gear protocols, and direct medical support for all technicians and engineers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-white transition-all shadow-sm">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-base font-black text-slate-900 mb-1.5">Fast-Track Career Growth</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear, structured promotion pathway to grow from Junior Field Installer to Senior Hardware Specialist, City Lead, and Regional Operations Head.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-white transition-all shadow-sm">
              <div className="text-3xl mb-3">🎓</div>
              <h3 className="text-base font-black text-slate-900 mb-1.5">Certified AIS-140 Training</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete hands-on training on 4G VLTD systems, CAN-Bus decoding, ultrasonic fuel level sensors, Speed Governors (SLD), and AI dashcams.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-white transition-all shadow-sm">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="text-base font-black text-slate-900 mb-1.5">Performance Cash Bonuses</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct per-device installation incentives, monthly target bonuses, and instant spot rewards for zero-defect RTO passing and fast turnarounds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-white transition-all shadow-sm">
              <div className="text-3xl mb-3">🧰</div>
              <h3 className="text-base font-black text-slate-900 mb-1.5">Smart Diagnostic Toolkits</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                High-grade official crimping tools, digital multimeters, OBD/CAN scanners, SIM programmers, and Android configuration tablets provided to every team.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Headquarters Address */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-lg">
          <div className="text-3xl mb-3">📍</div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">Registered Headquarters & NOC Center</h3>
          <p className="text-sm text-slate-600 mb-6">
            Hanuman Mandir, NH31, Maranga, near Vidya Vihar Institute Of Technology, Purnia - 854303, Bihar, India
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+917782808063"
              className="px-5 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold flex items-center gap-2 hover:bg-blue-100 transition"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>+91 77828 08063</span>
            </a>
            <a
              href="mailto:arshiranjeet133@gmail.com"
              className="px-5 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-2 hover:bg-amber-100 transition"
            >
              <Mail className="w-3.5 h-3.5 text-amber-600" />
              <span>arshiranjeet133@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Fullscreen Hover Modal Overlay */}
      {fullscreenItem && (
        <div
          className="fixed inset-0 z-[999999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
          onClick={() => setFullscreenItem(null)}
        >
          <div
            className="relative w-full max-w-5xl h-[88vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
                  {fullscreenItem.badge}
                </span>
                <span className="text-sm font-black text-slate-900">
                  {fullscreenItem.title}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
                  (Press ESC or click ✕ to close)
                </span>
                <button
                  onClick={() => setFullscreenItem(null)}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-black transition"
                  title="Close Fullscreen"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 w-full h-full relative bg-slate-50 flex items-center justify-center overflow-hidden p-4">
              {fullscreenItem.type === 'iframe' ? (
                <iframe
                  src={fullscreenItem.src}
                  title={fullscreenItem.title}
                  className="w-full h-full border-0 block"
                />
              ) : (
                <img
                  src={fullscreenItem.src}
                  alt={fullscreenItem.title}
                  className="max-h-[82vh] max-w-full object-contain rounded-xl shadow-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
