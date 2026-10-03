import React, { useEffect, useState } from 'react';
import { ShieldCheck, CheckCircle2, Zap, Radio, Phone, Mail, MapPin, Award, Trophy, FileCheck, Calendar, Sparkles, ChevronRight, RotateCcw } from 'lucide-react';
import bwAwardImg from '../assets/award-bw-businessworld-2021.jpg';
import trophyMsme3dImg from '../assets/trophy-india-5000-3d.jpg';
import isoQroImg from '../assets/certificate-iso-9001-qro-2024.jpg';
import msmeCertImg from '../assets/award-india-5000-msme-2020.jpg';
import isoOtabuImg from '../assets/certificate-iso-9001-otabu.jpg';
import msmeDocImg from '../assets/award-india-5000-certificate-doc.jpg';

export default function AboutUsPage() {
  const [view3D, setView3D] = useState('trophy');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

        {/* 2 Large Dedicated 3D Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          {/* Large 3D Card 1: 3D Holographic Certificate */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
            <div className="flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-200">
              <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-slate-200 flex-wrap gap-2 text-slate-900">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
                    <Trophy className="w-3.5 h-3.5 text-amber-600" />
                    Winner 2021 • Special Mention
                  </span>
                  <span className="text-xs font-black text-amber-600 uppercase tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> 3D Hologram Tilt
                  </span>
                </div>
                <a
                  href="/certificate-3d.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-black text-sky-700 hover:text-sky-800 px-3 py-1 rounded-lg bg-sky-50 border border-sky-200 hover:bg-sky-100 transition inline-flex items-center gap-1"
                >
                  ⛶ Fullscreen ↗
                </a>
              </div>

              <div className="w-full h-80 sm:h-96 relative bg-slate-50/50">
                <iframe
                  src="/certificate-3d.html"
                  title="3D Interactive Holographic Certificate"
                  className="w-full h-full border-0 block"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="p-7 sm:p-8 flex flex-col flex-1">
              <div className="text-xs font-black uppercase tracking-wider text-amber-700 mb-2">
                National Emerging Business Honor
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 group-hover:text-amber-600 transition leading-snug">
                Best Service by Emerging Enterprise
              </h3>
              <div className="text-xs sm:text-sm font-bold text-blue-700 mb-4">
                BW Businessworld & BWSME World (Jury Chair: Former SEBI Chairman U.K. Sinha • Supported by NSIC)
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Conferred by a high-level national jury chaired by U.K. Sinha (Former Chairman, SEBI) & supported by NSIC, celebrating Arshi GPS 3D emblem innovation, 24/7 client-first GPS fleet management, fast field engineering resolution, and benchmark customer trust across Eastern India.
              </p>

              <div className="mt-auto space-y-2.5">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium">Jury Chaired by Former SEBI Chairman U.K. Sinha</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium">Supported by National Small Industries Corporation (NSIC)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Large 3D Card 2: 360° Rotating 3D Golden Trophy */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
            <div className="flex flex-col bg-gradient-to-br from-[#faf7f2] to-[#f3ede2] border-b border-slate-200">
              <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-[#e7dfd1] flex-wrap gap-2 text-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    Winner 2020 • 3D Gold Trophy
                  </span>
                  <span className="text-xs font-black text-amber-700 uppercase tracking-wide flex items-center gap-1">
                    <RotateCcw className="w-3.5 h-3.5" /> 360° Auto-Rotate
                  </span>
                </div>
                <a
                  href="/trophy-360.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-black text-amber-900 hover:text-amber-950 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 hover:bg-amber-100 transition inline-flex items-center gap-1"
                >
                  ⛶ Fullscreen ↗
                </a>
              </div>

              <div className="w-full h-80 sm:h-96 relative bg-[#faf7f2]/50">
                <iframe
                  src="/trophy-360.html"
                  title="360 Interactive 3D Trophy"
                  className="w-full h-full border-0 block"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="p-7 sm:p-8 flex flex-col flex-1">
              <div className="text-xs font-black uppercase tracking-wider text-amber-700 mb-2">
                National Quality Excellence Trophy
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 group-hover:text-amber-600 transition leading-snug">
                India 5000 Best MSME National Trophy
              </h3>
              <div className="text-xs sm:text-sm font-bold text-blue-700 mb-4">
                Benchmark Trust & TQV Audit Partner (Winner 2020 • Arshi Enterprises)
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Honored with the official physical 3D Golden MSME Trophy for outstanding business leadership, zero-failure telematics hardware deployments, high-precision satellite telemetry, and boosting operational logistics profitability for commercial fleets across India.
              </p>

              <div className="mt-auto space-y-2.5">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium">Audited & Verified by Benchmark Trust & TQV Certification</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium">Pan-India Recognition for Quality Excellence in GPS Telematics</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accreditations Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-black uppercase text-blue-600 tracking-widest block mb-1">
            Accreditations & Compliance
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            Certified Quality & Official Recognitions
          </h3>
        </div>

        {/* 4 Accredited Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Award 1: ISO 9001:2015 QRO & UKAF Accredited */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition group overflow-hidden flex flex-col">
            <div className="w-full h-56 bg-slate-100 flex items-center justify-center p-3 border-b border-slate-200">
              <img src={isoQroImg} alt="ISO 9001:2015 Quality Management System Certification QRO UKAF" className="max-h-full max-w-full object-contain rounded-md shadow-sm group-hover:scale-105 transition duration-300" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-extrabold uppercase tracking-wider mb-3 w-fit">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                ISO 9001:2015 Certified
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mb-1 group-hover:text-amber-600 transition leading-snug">International Quality Management System</h3>
              <div className="text-xs font-bold text-blue-700 mb-3">QRO & UKAF Accredited (Valid 2024–2027)</div>
              <p className="text-xs text-slate-600 leading-relaxed mt-auto">Accredited by UKAF for standardized supply, rigorous quality testing, and zero-defect installation of AIS 140 VLTD trackers, fuel sensors, and CCTV systems.</p>
            </div>
          </div>

          {/* Award 2: India 5000 Gold Laurel Wreath Medal */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition group overflow-hidden flex flex-col">
            <div className="w-full h-56 bg-slate-100 flex items-center justify-center p-3 border-b border-slate-200">
              <img src={msmeCertImg} alt="India 5000 Best MSME Awards for Quality Excellence Winner 2020 Gold Seal" className="max-h-full max-w-full object-contain rounded-md shadow-sm group-hover:scale-105 transition duration-300" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-[11px] font-extrabold uppercase tracking-wider mb-3 w-fit">
                <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                National Quality Honor
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mb-1 group-hover:text-amber-600 transition leading-snug">India 5000 Quality Excellence Gold Seal</h3>
              <div className="text-xs font-bold text-blue-700 mb-3">India 5000 Executive Jury Board</div>
              <p className="text-xs text-slate-600 leading-relaxed mt-auto">Conferred with the prestigious Golden Laurel Wreath for setting benchmark standards in fleet customer satisfaction and high-precision satellite telemetry.</p>
            </div>
          </div>

          {/* Award 3: ISO 9001:2015 Otabu IAF Accredited */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition group overflow-hidden flex flex-col">
            <div className="w-full h-56 bg-slate-100 flex items-center justify-center p-3 border-b border-slate-200">
              <img src={isoOtabuImg} alt="ISO 9001:2015 Quality Registration Certificate Otabu IAF" className="max-h-full max-w-full object-contain rounded-md shadow-sm group-hover:scale-105 transition duration-300" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-extrabold uppercase tracking-wider mb-3 w-fit">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                ISO 9001:2015 IAF Certified
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mb-1 group-hover:text-amber-600 transition leading-snug">International Quality Assurance Standard</h3>
              <div className="text-xs font-bold text-blue-700 mb-3">Otabu Certification & IAF Accredited</div>
              <p className="text-xs text-slate-600 leading-relaxed mt-auto">Officially certified for quality compliance across GPS vehicle tracking systems, AIS 140 RTO telematics integration, and responsive technical support.</p>
            </div>
          </div>

          {/* Award 4: India 5000 Certificate of Recognition Document */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition group overflow-hidden flex flex-col">
            <div className="w-full h-56 bg-slate-100 flex items-center justify-center p-3 border-b border-slate-200">
              <img src={msmeDocImg} alt="India 5000 Best MSME Official Certificate of Recognition" className="max-h-full max-w-full object-contain rounded-md shadow-sm group-hover:scale-105 transition duration-300" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-[11px] font-extrabold uppercase tracking-wider mb-3 w-fit">
                <FileCheck className="w-3.5 h-3.5 text-indigo-600" />
                Certificate of Recognition
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mb-1 group-hover:text-amber-600 transition leading-snug">India 5000 Best MSME Winner Document</h3>
              <div className="text-xs font-bold text-blue-700 mb-3">National MSME Selection Council</div>
              <p className="text-xs text-slate-600 leading-relaxed mt-auto">Recognized for unwavering excellence in telematics service delivery, customer trust, and advancing commercial transport digital enablement across India.</p>
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

    </div>
  );
}
