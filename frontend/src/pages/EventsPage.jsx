import React, { useEffect } from 'react';
import { ShieldCheck, Calendar, MapPin, Users, Award, Sparkles, CheckCircle2, Phone, Mail, ChevronRight, ExternalLink } from 'lucide-react';

export default function EventsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const helplinePhone = "+917782808063";
  const phoneDisplay = "+91 77828 08063";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-20">
      
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-xs font-extrabold text-amber-900 uppercase tracking-wider mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>Corporate Conclaves, Expos & Transporter Meets</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900">
          Connecting India's Transport Community <br />
          Through <span className="text-amber-600">Technology & Innovation</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          From high-level government telematics expos in Patna to ground-level transporter fuel workshops in Purnea — explore how Arshi Enterprises leads Eastern India's smart mobility transformation.
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <span className="block text-3xl sm:text-4xl font-black text-blue-600">15+</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Industry Expos</span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <span className="block text-3xl sm:text-4xl font-black text-amber-600">5,000+</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Transporters Trained</span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <span className="block text-3xl sm:text-4xl font-black text-emerald-600">28+</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">States Reached</span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <span className="block text-3xl sm:text-4xl font-black text-purple-600">100%</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Live On-Ground Demos</span>
          </div>
        </div>
      </div>

      {/* Featured Spotlight Event */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white overflow-hidden shadow-2xl border border-slate-700 grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 relative min-h-[340px]">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop"
              alt="Annual Telematics & AI Fleet Summit 2025"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg">
              🌟 Flagship Upcoming Event
            </span>
          </div>
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 mb-3">
              <Calendar className="w-4 h-4" />
              <span>15 November 2025</span>
              <span>•</span>
              <MapPin className="w-4 h-4" />
              <span>Purnia NOC HQ, Bihar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight mb-4 text-white">
              Annual Telematics & AI Fleet Summit 2025
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Join 300+ fleet owners, logistics heads, and transport union leaders. Experience live demonstrations of dual-lens AI dashcams, instant diesel anti-theft ultrasonic sensors, and next-gen AIS 140 VLTD compliance architecture.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/917782808063?text=Namaste!%20Mujhe%20Arshi%20Telematics%20Summit%202025%20ke%20liye%20pass%20chahiye."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/30 hover:scale-[1.02] transition"
              >
                <span>Book Free Delegate Pass</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href={`tel:${helplinePhone}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Event Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Major Expos & Fleet Meets Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase text-blue-600 tracking-widest block mb-2">
            Proven On Ground
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Major Expos, Meets & <span className="text-amber-600">Workshops</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Empowering transporters with real-time hardware intelligence and RTO compliance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
            <div className="h-52 bg-slate-800 relative overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop"
                alt="Bihar Logistics Expo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider border border-white/20">
                🏛️ State Expo
              </span>
            </div>
            <div className="p-7 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
                <span>📅 August 2024</span>
                <span>•</span>
                <span>📍 Patna</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition">
                Bihar State Logistics & Telematics Expo
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6 flex-1">
                Official government technology pavilion showcasing ARAI-certified AIS 140 devices, Emergency 112 ERSS police alert integration, and wireless cold-chain telemetry.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-blue-700">
                <span>Govt. & Enterprise Expo</span>
                <span className="text-amber-600">Completed ✓</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
            <div className="h-52 bg-slate-800 relative overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1582192732943-e15e5ec18844?q=80&w=800&auto=format&fit=crop"
                alt="Transporter Fuel Theft Meetup"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider border border-white/20">
                🚛 Transporter Meet
              </span>
            </div>
            <div className="p-7 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
                <span>📅 October 2024</span>
                <span>•</span>
                <span>📍 Purnea</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition">
                Transporters Fuel Theft & Security Meetup
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6 flex-1">
                100+ commercial truck and mining dumper owners participated in live anti-theft fuel drain detection tests with real-time phone alerts and instant engine shut-off.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-blue-700">
                <span>Hands-on Live Demos</span>
                <span className="text-amber-600">Completed ✓</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
            <div className="h-52 bg-slate-800 relative overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop"
                alt="Driver Safety Workshop"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider border border-white/20">
                🛡️ Driver Safety
              </span>
            </div>
            <div className="p-7 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
                <span>📅 May 2024</span>
                <span>•</span>
                <span>📍 Siliguri Border</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition">
                Eastern India Driver Safety & SOS Workshop
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6 flex-1">
                Direct on-ground training for long-haul commercial drivers on emergency SOS panic button protocols, anti-sleep fatigue alerts, and overspeeding control.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-blue-700">
                <span>Safety Certification</span>
                <span className="text-amber-600">Completed ✓</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
            <div className="h-52 bg-slate-800 relative overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=800&auto=format&fit=crop"
                alt="Dealer Conclave"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider border border-white/20">
                🤝 Partner Summit
              </span>
            </div>
            <div className="p-7 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
                <span>📅 July 2024</span>
                <span>•</span>
                <span>📍 Purnia HQ</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition">
                Arshi Authorized Dealer & Technician Conclave
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6 flex-1">
                Empowering 50+ regional field engineers and sales partners across Bihar and Bengal with advanced diagnostic tools, bypass harness fitting, and fast warranty processing.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-blue-700">
                <span>Dealer Network Summit</span>
                <span className="text-amber-600">Completed ✓</span>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
            <div className="h-52 bg-slate-800 relative overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?q=80&w=800&auto=format&fit=crop"
                alt="Agri-Tech Telematics Fair"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider border border-white/20">
                🚜 Agri IoT
              </span>
            </div>
            <div className="p-7 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
                <span>📅 March 2024</span>
                <span>•</span>
                <span>📍 Saharsa</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition">
                Agri-Tech & Tractor Telematics Demonstration
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6 flex-1">
                Live field demo of agricultural tractor hour meters, acreage calculation sensors, and geo-fence anti-theft immobilization for farmers and machinery contractors.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-blue-700">
                <span>Agricultural Telematics</span>
                <span className="text-amber-600">Completed ✓</span>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
            <div className="h-52 bg-slate-800 relative overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop"
                alt="Interstate Logistics Round Table"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider border border-white/20">
                🚚 Regional Round Table
              </span>
            </div>
            <div className="p-7 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
                <span>📅 January 2024</span>
                <span>•</span>
                <span>📍 Dhanbad Circle</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition">
                Interstate Mining & Coal Fleet Round Table
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6 flex-1">
                Resolving inter-state permit tracking challenges, Vahan portal integration rules, and diesel leakage tracking for heavy dumper and tipper truck operators.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-blue-700">
                <span>Heavy Fleet Logistics</span>
                <span className="text-amber-600">Completed ✓</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Host Workshop CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-blue-900 to-slate-900 text-white border border-blue-700 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">Host a Telematics Workshop at Your Fleet Yard</h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8">
            Want our mobile engineering team to conduct a free diesel theft detection & GPS compliance workshop for your transporter union or commercial fleet?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${helplinePhone}`}
              className="px-6 py-3 rounded-xl bg-white text-blue-900 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-slate-100 transition shadow-md"
            >
              <Phone className="w-4 h-4 text-blue-700" />
              <span>Call Event Desk: {phoneDisplay}</span>
            </a>
            <a
              href="https://wa.me/917782808063?text=Namaste!%20Humare%20transport%20yard%20me%20GPS%20demo%20workshop%20organize%20karna%20hai."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-md"
            >
              <span>💬 WhatsApp Event Coordinator</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
