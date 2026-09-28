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
      color: "text-[#4bc0ff]",
      border: "hover:border-[#4bc0ff]"
    },
    {
      icon: Fuel,
      title: "Diesel Theft & Fuel Monitoring",
      hindiDesc: "Fuel chori aur extra mileage rokein",
      desc: "Smart fuel telemetry sensors detect instant fuel drops, calculate accurate km/litre mileage, and alert you against pilferage.",
      badge: "Anti-Theft",
      color: "text-[#e3ab84]",
      border: "hover:border-[#e3ab84]"
    },
    {
      icon: Lock,
      title: "Remote Engine Cut-Off",
      hindiDesc: "Mobile phone se gaadi ka engine band karein",
      desc: "Single tap immobilizer cuts fuel injection during emergencies or unauthorized usage directly from your Android/iOS app.",
      badge: "Safety Lock",
      color: "text-[#ff79e0]",
      border: "hover:border-[#ff79e0]"
    },
    {
      icon: ShieldAlert,
      title: "Geofence & Over-Speed Alerts",
      hindiDesc: "Seema se bahar jane par instant alarm",
      desc: "Set virtual boundaries around warehouses, schools, or mining areas. Receive instant SMS & App notifications when vehicles exit.",
      badge: "Instant Siren",
      color: "text-[#4bc0ff]",
      border: "hover:border-[#4bc0ff]"
    },
    {
      icon: FileSpreadsheet,
      title: "Automated Daily MIS Reports",
      hindiDesc: "Excel aur PDF me daily running hisaab",
      desc: "Detailed trips, idle hours, AC runtime, driver behavior scorecards, and maintenance reminders generated automatically.",
      badge: "PDF / Excel",
      color: "text-[#e3ab84]",
      border: "hover:border-[#e3ab84]"
    },
    {
      icon: Cpu,
      title: "AIS 140 RTO Compliance",
      hindiDesc: "Commercial & school buses ke liye RTO pass",
      desc: "Govt. certified AIS 140 devices with dual SIM eSIM, panic emergency SOS button, and direct integration with Bihar RTO portal.",
      badge: "Govt Approved",
      color: "text-[#ff79e0]",
      border: "hover:border-[#ff79e0]"
    }
  ];

  return (
    <section id="features" className="py-24 bg-[#140d5c]/40 relative overflow-hidden border-y border-[#3a2f9a]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#140d5c] border border-[#3a2f9a] text-xs font-bold text-[#e3ab84] uppercase tracking-wider mb-4">
            <Activity className="w-3.5 h-3.5" />
            <span>Comprehensive Telematics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Hamare GPS Se <span className="text-[#e3ab84]">Kya Fayda Hoga?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#b3aee0]">
            Bihar aur poore Bharat ke fleet owners, truck transport, taxi operators aur school buses ke liye sabse bharosemand smart GPS system.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className={`glass-panel glass-panel-hover p-8 rounded-2xl relative flex flex-col justify-between group ${f.border}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-[#0a0630] border border-[#3a2f9a] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${f.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#0a0630] border border-[#3a2f9a] text-white/80">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#e3ab84] transition-colors">
                    {f.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#e3ab84] mt-1 mb-3">
                    {f.hindiDesc}
                  </div>
                  <p className="text-sm text-[#b3aee0] leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#3a2f9a]/60 flex items-center justify-between text-xs text-[#a9a4d6]">
                  <span>24/7 Cloud Uptime</span>
                  <span className="text-[#4bc0ff] font-semibold">100% Secure</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
