import React from 'react';
import { MapPin, Fuel, ShieldAlert, Cpu, Activity, Clock, FileSpreadsheet, Lock } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: MapPin,
      title: "Real-Time Live Tracking",
      hindiDesc: "Har 10 second me live location dekhein",
      desc: "Instant live GPS tracking with 90-day route history playback, precise speed metrics, and stop-time reports on Google Maps.",
      badge: "10-Sec Refresh",
      color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      icon: Fuel,
      title: "Diesel Theft & Fuel Monitoring",
      hindiDesc: "Fuel chori aur extra mileage rokein",
      desc: "Smart fuel telemetry sensors detect instant fuel drops, calculate accurate km/litre mileage, and alert you against pilferage.",
      badge: "Anti-Theft",
      color: "text-amber-600 bg-amber-50 border-amber-200"
    },
    {
      icon: Lock,
      title: "Remote Engine Cut-Off",
      hindiDesc: "Mobile phone se gaadi ka engine band karein",
      desc: "Single tap immobilizer cuts fuel injection during emergencies or unauthorized usage directly from your Android/iOS app.",
      badge: "Safety Lock",
      color: "text-rose-600 bg-rose-50 border-rose-200"
    },
    {
      icon: ShieldAlert,
      title: "Geofence & Over-Speed Alerts",
      hindiDesc: "Seema se bahar jane par instant alarm",
      desc: "Set virtual boundaries around warehouses, schools, or mining areas. Receive instant SMS & App notifications when vehicles exit.",
      badge: "Instant Siren",
      color: "text-indigo-600 bg-indigo-50 border-indigo-200"
    },
    {
      icon: FileSpreadsheet,
      title: "Automated Daily MIS Reports",
      hindiDesc: "Excel aur PDF me daily running hisaab",
      desc: "Detailed trips, idle hours, AC runtime, driver behavior scorecards, and maintenance reminders generated automatically.",
      badge: "PDF / Excel",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200"
    },
    {
      icon: Cpu,
      title: "AIS 140 RTO Compliance",
      hindiDesc: "Commercial & school buses ke liye RTO pass",
      desc: "Govt. certified AIS 140 devices with dual SIM eSIM, panic emergency SOS button, and direct integration with Bihar RTO portal.",
      badge: "Govt Approved",
      color: "text-purple-600 bg-purple-50 border-purple-200"
    }
  ];

  return (
    <section id="features" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-xs font-bold text-amber-900 uppercase tracking-wider mb-4 shadow-sm">
            <Activity className="w-3.5 h-3.5 text-amber-700" />
            <span>Comprehensive Telematics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Hamare GPS Se <span className="text-amber-600">Kya Fayda Hoga?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Bihar aur poore Bharat ke fleet owners, truck transport, taxi operators aur school buses ke liye sabse bharosemand smart GPS system.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform ${f.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {f.title}
                  </h3>
                  
                  <div className="text-xs font-bold text-amber-700 mt-1 mb-3">
                    {f.hindiDesc}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Smart Cloud Sync</span>
                  <span className="text-emerald-600 font-bold">● Active 24/7</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
