import React, { useEffect } from 'react';
import { ShieldCheck, Truck, Video, School, Cpu, CheckCircle2, Phone, MessageSquare, ArrowRight, Activity, Zap, Compass, Lock } from 'lucide-react';

export default function SolutionsHubPage() {
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
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>Unified Telematics Platforms</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900">
          Smart IoT <span className="text-amber-600">Solutions Hub</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Four purpose-built telematics software platforms engineered by Arshi Enterprises to power enterprise logistics, AI-driven driver safety, school transit security, and heavy industrial telemetry.
        </p>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <span className="block text-3xl sm:text-4xl font-black text-blue-600">4 Flagship</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Software Suites</span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <span className="block text-3xl sm:text-4xl font-black text-amber-600">&lt; 10s</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Live Packet Sync</span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <span className="block text-3xl sm:text-4xl font-black text-emerald-600">AIS-140</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Govt. Certified</span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <span className="block text-3xl sm:text-4xl font-black text-purple-600">99.98%</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Cloud Uptime</span>
          </div>
        </div>
      </div>

      {/* 4 Flagship Solutions Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Solution 1: Arshi Mobility */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1.5 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 text-2xl group-hover:scale-110 transition-transform">
                  <Truck className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-black uppercase tracking-wider">
                  Flagship Fleet OS
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition">
                Arshi Mobility
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Complete commercial fleet management ecosystem. Features live high-precision tracking, automated trip cost calculations, geofence breach sirens, driver duty rosters, and full state VAHAN backend sync.
              </p>

              <div className="space-y-2.5 mb-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Real-time sub-10 second satellite GPS refresh</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Trip replay with speed & ignition analytics</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Automated PDF maintenance & mileage reports</span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/917782808063?text=Hello%20Arshi%20Team!%20I%20am%20interested%20in%20a%20live%20demo%20of%20Arshi%20Mobility%20Platform."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all"
            >
              <span>Explore Arshi Mobility Demo</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Solution 2: Dashcam Connected */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1.5 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 text-2xl group-hover:scale-110 transition-transform">
                  <Video className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-black uppercase tracking-wider">
                  AI Video Telematics
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-amber-600 transition">
                Dashcam Connected (AI Video/DMS/ADAS)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Dual-lens 4G dashcam suite with real-time AI computer vision. Detects driver drowsiness, mobile phone usage, collision hazards, sudden lane departures, and uploads 1080p incident clips instantly to cloud.
              </p>

              <div className="space-y-2.5 mb-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Dual HD Cabin & Road Forward camera recording</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>DMS driver distraction & fatigue voice warnings</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Automatic incident video lock & cloud upload</span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/917782808063?text=Hello%20Arshi%20Team!%20I%20am%20interested%20in%20Dashcam%20Connected%20AI%20video%20telematics%20demo."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md shadow-amber-500/20 transition-all"
            >
              <span>Request AI Dashcam Demo</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Solution 3: Arshi School */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1.5 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 text-2xl group-hover:scale-110 transition-transform">
                  <School className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
                  Transit & Student Safety
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-emerald-600 transition">
                Arshi School Transit Guard
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Dedicated institutional transport security system with parent mobile app, RFID student attendance, automated arrival WhatsApp notifications, and direct SOS emergency link to school management.
              </p>

              <div className="space-y-2.5 mb-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Real-time school bus live tracking for parents</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>RFID student board/deboard timestamp logs</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Speed limiter alerts & route diversion warnings</span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/917782808063?text=Hello%20Arshi%20Team!%20I%20am%20interested%20in%20Arshi%20School%20Bus%20Safety%20System."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 transition-all"
            >
              <span>Explore School Transit OS</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Solution 4: Arshi Edge */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-400 hover:-translate-y-1.5 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 text-2xl group-hover:scale-110 transition-transform">
                  <Cpu className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-[11px] font-black uppercase tracking-wider">
                  Heavy IoT & Fuel Anti-Theft
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-purple-600 transition">
                Arshi Edge (Industrial Telematics)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Advanced heavy machinery and dumper telematics suite. Integrates ultrasonic fuel level probes, CAN J1939 engine telemetry, load cell axle sensors, and temperature probes for cold chains.
              </p>

              <div className="space-y-2.5 mb-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>99.5% accurate digital fuel level & drainage siren</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>CAN J1939 engine RPM, torque & coolant sensors</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Heavy equipment operating hour meters</span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/917782808063?text=Hello%20Arshi%20Team!%20I%20am%20interested%20in%20Arshi%20Edge%20Heavy%20IoT%20and%20Fuel%20Monitoring."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 transition-all"
            >
              <span>Explore Arshi Edge Suite</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>

      {/* CTA Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-xl border border-indigo-900/50">
          <h3 className="text-2xl sm:text-3xl font-black mb-3">
            Deploy Tailored Telematics for Your Enterprise
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-6">
            Get in touch with our telematics architects to schedule a live demo, custom API integration, or multi-state fleet trial.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/917782808063?text=Hello%20Arshi%20Team!%20I%20would%20like%20to%20request%20a%20telematics%20architecture%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all"
            >
              Consult on WhatsApp ↗
            </a>
            <a
              href={`tel:${helplinePhone}`}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition"
            >
              Call Helpline: {phoneDisplay}
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
