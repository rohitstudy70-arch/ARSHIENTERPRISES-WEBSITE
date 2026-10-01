import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NeonCity3D from '../components/NeonCity3D';
import FeaturesSection from '../components/FeaturesSection';
import HardwareCatalog from '../components/HardwareCatalog';
import itriangleLogo from '../assets/itriangle-logo.png';
import { submitLead } from '../services/api';
import { 
  ShieldCheck, 
  Zap, 
  MessageSquare, 
  Phone, 
  Navigation,
  Send,
  CheckCircle,
  MapPin,
  Mail,
  Check
} from 'lucide-react';

export default function HomePage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [fleetSize, setFleetSize] = useState('1 to 5 vehicles');
  const [submitted, setSubmitted] = useState(false);

  const phoneDisplay = "+91 77828 08063";
  const whatsappUrl = "https://wa.me/917782808063?text=Hello%20Arshi%20Enterprises!%20I%20would%20like%20to%20request%20a%20GPS%20telematics%20demo%20and%20commercial%20quote.";

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitLead({ name, phone, fleetSize, state: 'Bihar' });
    const message = `Hello Arshi Enterprises! I am ${name}. I manage a fleet of ${fleetSize}. My contact number is ${phone}. I would like to request an enterprise GPS telematics demo and installation quotation.`;
    window.open(`https://wa.me/917782808063?text=${encodeURIComponent(message)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div>
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
          HERO & 3D NEON CITY SECTION (ICONIC DARK 3D HERO)
          ========================================================================= */}
      <section id="hero" className="pt-32 pb-20 relative overflow-hidden bg-[#0a0630]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#3f6bff]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-[#e3ab84]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#140d5c] border border-[#3a2f9a] text-xs font-bold text-[#e3ab84] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#e3ab84] animate-pulse" />
                <span>24/7 Enterprise Telematics & Fleet Intelligence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                Track every <span className="text-[#e3ab84]">vehicle.</span><br />
                Save every <span className="text-[#4bc0ff]">rupee.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#b3aee0] max-w-xl leading-relaxed">
                India's trusted telematics partner for commercial logistics, heavy transport, school bus fleets, and enterprise operations. Eliminate fuel theft, monitor live telemetry, and optimize fleet operational expenses.
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
                  <span>Request Enterprise Demo</span>
                </a>

                <a
                  href="tel:+917782808063"
                  className="px-6 py-4 rounded-xl font-bold text-sm border border-[#3a2f9a] text-white hover:border-[#e3ab84] hover:bg-[#140d5c] transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#e3ab84]" />
                  <span>Speak with Specialist</span>
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
          4 LIVE METRIC STATS (ENTERPRISE GRADE ENGLISH)
          ========================================================================= */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:border-amber-400 hover:shadow-md transition">
              <span className="block text-3xl sm:text-4xl font-black text-blue-600">10,000+</span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-1">Active Vehicles Tracked</span>
              <span className="text-[11px] text-slate-500">Bihar, Bengal & 28+ States</span>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:border-amber-400 hover:shadow-md transition">
              <span className="block text-3xl sm:text-4xl font-black text-amber-600">500+</span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-1">Enterprise Fleets</span>
              <span className="text-[11px] text-slate-500">Trucks, Dumpers, Buses & Logistics</span>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:border-amber-400 hover:shadow-md transition">
              <span className="block text-3xl sm:text-4xl font-black text-emerald-600">100%</span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-1">Statutory Compliance</span>
              <span className="text-[11px] text-slate-500">MoRTH AIS 140 & Vahan Certified</span>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:border-amber-400 hover:shadow-md transition">
              <span className="block text-3xl sm:text-4xl font-black text-purple-600">24/7</span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-1">Real-Time Telemetry</span>
              <span className="text-[11px] text-slate-500">10-Second High-Precision Sync</span>
            </div>
          </div>
      {/* =========================================================================
          B2B INDUSTRY VERTICALS (SAMSARA-STYLE ENTERPRISE SECTOR GRID)
          ========================================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-300 text-xs font-extrabold text-blue-900 uppercase tracking-wider mb-4 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
              <span>Tailored Industry Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Enterprise Telematics for <span className="text-amber-600">Mission-Critical Operations</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Purpose-built telematics hardware and intelligent cloud software tailored to the stringent operational demands of major commercial sectors across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 text-center flex flex-col items-center">
              <div className="text-4xl mb-4 text-center">🚚</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">Logistics & Long-Haul Freight</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-center">
                Real-time route visibility, predictive delivery ETAs, automated driver trip audits, and instant anti-theft immobilization designed for 10-wheelers, trailers, and multi-axle freight.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 text-center flex flex-col items-center">
              <div className="text-4xl mb-4 text-center">⛏️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">Mining & Heavy Construction</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-center">
                High-precision ultrasonic fuel telemetry, engine run-hour logging, and strict geofence perimeter alarms for dumpers, tippers, excavators, and heavy earthmovers.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 text-center flex flex-col items-center">
              <div className="text-4xl mb-4 text-center">🚌</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">School Transit & Passenger Transit</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-center">
                MoRTH certified AIS 140 VLTD terminals with integrated 112 ERSS Police SOS panic emergency triggers, automated passenger route auditing, and seamless RTO fitness certification.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 text-center flex flex-col items-center">
              <div className="text-4xl mb-4 text-center">❄️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">Cold Chain & Perishable Logistics</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-center">
                Wireless temperature sensors with continuous BLE cloud telemetry, real-time thermal breach alerts, and automated trip compliance logging for pharmaceutical and dairy fleets.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 text-center flex flex-col items-center">
              <div className="text-4xl mb-4 text-center">🚜</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">Agricultural Contractors & Harvesters</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-center">
                Field acreage and bigha calculation algorithms, PTO engagement telemetry, vibration-proof casing, and battery disconnection alarms for tractors and combine harvesters.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 text-center flex flex-col items-center">
              <div className="text-4xl mb-4 text-center">🏢</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">Enterprise Fleets & Car Rentals</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-center">
                Comprehensive driver safety scorecards, overspeed detection, automated maintenance work-orders, and REST API connectors for direct integration with ERP & SAP systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CAPABILITIES / WHAT WE DO (CLEAN WHITE THEME)
          ========================================================================= */}
      <FeaturesSection />

      {/* =========================================================================
          HARDWARE & PRODUCTS CATALOG (CLEAN WHITE THEME)
          ========================================================================= */}
      <HardwareCatalog />

      {/* =========================================================================
          HOW IT WORKS (3 SIMPLE STEPS - ENTERPRISE THEME)
          ========================================================================= */}
      <section id="how-it-works" className="py-24 bg-slate-50 border-t border-slate-200 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Simple 3-Step <span className="text-amber-600">Deployment</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              From initial consultation to real-time live telemetry on your mobile screen in 3 frictionless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition text-center relative group">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white font-black text-2xl flex items-center justify-center mx-auto mb-6 shadow-md shadow-amber-500/20">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Schedule Consultation</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect via phone or WhatsApp with your fleet details. Receive instant software demos and tailored enterprise pricing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition text-center relative group">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-black text-2xl flex items-center justify-center mx-auto mb-6 shadow-md shadow-blue-600/20">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Certified On-Site Fitting</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our certified telematics engineers arrive at your depot or yard to perform covert, warranty-compliant 15-minute installation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition text-center relative group">
              <div className="w-14 h-14 rounded-2xl bg-rose-500 text-white font-black text-2xl flex items-center justify-center mx-auto mb-6 shadow-md shadow-rose-500/20">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">24/7 Command on Mobile & Web</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Monitor live GPS coordinates, speed compliance, fuel telemetry, and remote immobilizer directly from your mobile app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TRANSPORTERS TESTIMONIALS / REVIEWS (ENTERPRISE THEME)
          ========================================================================= */}
      <section className="py-20 bg-white border-t border-slate-200 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase text-blue-600 tracking-widest block mb-2">
              Verified Client Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Trusted by <span className="text-amber-600">Fleet Operators</span>
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Real verified feedback from logistics directors and transport owners across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:shadow-lg transition">
              <div className="text-amber-500 text-base mb-3">★★★★★</div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4">
                "Deploying Arshi GPS across our 8 commercial trucks completely eradicated fuel pilferage. We are saving over ₹20,000 monthly in operational fuel overheads."
              </p>
              <div className="font-bold text-sm text-slate-900">— Ramesh Yadav</div>
              <div className="text-xs text-slate-500">Fleet Owner, Purnea Transport Hub</div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:shadow-lg transition">
              <div className="text-amber-500 text-base mb-3">★★★★★</div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4">
                "We installed AIS 140 GPS across our school bus fleet and received the official RTO fitness certification immediately without hassle. Exceptional technical support."
              </p>
              <div className="font-bold text-sm text-slate-900">— Md. Aslam</div>
              <div className="text-xs text-slate-500">Commercial Bus Operator, Patna</div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:shadow-lg transition">
              <div className="text-amber-500 text-base mb-3">★★★★★</div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4">
                "When an unauthorized detour occurred at midnight, we instantly received an over-speed and geofence siren. We remotely immobilized the engine and secured the vehicle."
              </p>
              <div className="font-bold text-sm text-slate-900">— Sunil Sharma</div>
              <div className="text-xs text-slate-500">Mining Fleet Transporter, Siliguri</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          OUR TECHNOLOGY PARTNERS (CLEAN ENTERPRISE THEME)
          ========================================================================= */}
      <section id="partners" className="py-20 bg-white border-t border-slate-200 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-300 text-xs font-extrabold text-blue-900 uppercase tracking-wider mb-3 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
              <span>Technology Alliance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Our <span className="text-amber-600">Technology Partners</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Arshi Enterprises is proud to partner with leading automotive IoT and telematics innovators:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10 justify-center">
            {[
              { name: 'iTriangle', desc: 'AIS 140 Certified OEM Partner', logo: itriangleLogo },
              { name: 'Accolade', desc: 'Fuel Telemetry & Sensor Solutions', icon: '⚡' },
              { name: 'MARKON', desc: 'Heavy Mining & Dumper Telematics', icon: '🛡️' },
              { name: 'ACUTE', desc: 'High Precision Vehicle Trackers', icon: '📡' },
              { name: 'RDM', desc: 'Engine Controls & Immobilization', icon: '⚙️' }
            ].map((p, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:border-amber-400 hover:shadow-md transition flex flex-col items-center justify-center">
                <div className="h-10 flex items-center justify-center mb-2">
                  {p.logo ? (
                    <img src={p.logo} alt={`${p.name} Logo`} className="max-h-9 max-w-[130px] object-contain" />
                  ) : (
                    <div className="text-3xl">{p.icon}</div>
                  )}
                </div>
                <div className="font-extrabold text-base text-slate-900">{p.name}</div>
                <div className="text-[11px] text-slate-500 mt-1">{p.desc}</div>
              </div>
            ))}
          </div>

          {/* Accredited National Standards Banner */}
          <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
              🏛️ Accredited National Standards:
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {['MoRTH Certified', 'ARAI & CDAC Approved', 'National Vahan 4.0 Portal', '112 ERSS Police SOS', 'Dual eSIM Multi-Network'].map((std, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-semibold text-slate-800 shadow-sm">
                  {std}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTACT & LEAD CAPTURE FORM (CLEAN WHITE THEME)
          ========================================================================= */}
      <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-xs font-bold text-amber-900 uppercase tracking-wider shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Pan-India On-Site Deployment</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Request an Enterprise <br />
                <span className="text-amber-600">Telematics Demo</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Headquartered in Purnea, Bihar with nationwide telematics delivery. Submit your requirements for immediate consultation and live platform access.
              </p>

              <div className="space-y-4 pt-4">
                <a 
                  href="tel:+917782808063" 
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-md transition group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-110 transition">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Direct Helpline</div>
                    <div className="text-base font-bold text-slate-900">{phoneDisplay}</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Office Address</div>
                    <div className="text-sm font-medium text-slate-700 mt-0.5">
                      Hanuman Mandir, NH31, Maranga, near Vidya Vihar Institute Of Technology, Purnia - 854303, Bihar, India
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Email Inquiry</div>
                    <div className="text-sm font-medium text-slate-700 mt-0.5">
                      arshiranjeet133@gmail.com
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-6">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl relative">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Request Quotation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6">
                  Complete the form below to receive immediate technical specifications and tailored fleet pricing via WhatsApp.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Contact Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Fleet Size
                    </label>
                    <select
                      value={fleetSize}
                      onChange={(e) => setFleetSize(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition"
                    >
                      <option value="1 to 5 vehicles">1 to 5 Vehicles</option>
                      <option value="6 to 20 vehicles">6 to 20 Vehicles</option>
                      <option value="20+ vehicles">20+ Enterprise Fleet</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry via WhatsApp</span>
                  </button>
                </form>

                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500 border-t border-slate-100 pt-4">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> 100% Data Privacy
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Immediate Response
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
