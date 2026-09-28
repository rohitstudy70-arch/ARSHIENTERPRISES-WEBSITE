import React from 'react';
import { Radio, Phone, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07041f] text-white/80 border-t border-[#3a2f9a]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e3ab84] to-[#d98f5e] flex items-center justify-center text-[#1a0f40]">
                <Radio className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white font-outfit">
                Arshi<span className="text-[#e3ab84]">GPS</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#a9a4d6] leading-relaxed">
              Arshi Enterprises (arshigps.com) delivers smart GPS fleet tracking, diesel theft monitoring, AIS 140 RTO approved devices, and asset tracking across Bihar and India.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#3a2f9a]/60 pb-2">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#b3aee0]">
              <li><a href="#hardware" className="hover:text-[#e3ab84] transition">Commercial Truck GPS</a></li>
              <li><a href="#hardware" className="hover:text-[#e3ab84] transition">AIS 140 RTO Approved GPS</a></li>
              <li><a href="#hardware" className="hover:text-[#e3ab84] transition">Fuel & Diesel Theft Sensor</a></li>
              <li><a href="#hardware" className="hover:text-[#e3ab84] transition">Tractor & Agri GPS</a></li>
              <li><a href="#hardware" className="hover:text-[#e3ab84] transition">Wireless Magnetic Trackers</a></li>
            </ul>
          </div>

          {/* Col 3: Technology Partners */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#3a2f9a]/60 pb-2">
              Technology Partners
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {['iTriangle', 'Accolade', 'MARKON', 'ACUTE', 'RDM', 'Teltonika', 'Concox'].map((partner, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-[#140d5c] border border-[#3a2f9a] text-[#b3aee0]">
                  {partner}
                </span>
              ))}
            </div>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#3a2f9a]/60 pb-2">
              Helpline & Support
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#b3aee0]">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#e3ab84]" />
                <a href="tel:+917782808063" className="hover:text-white">+91 77828 08063</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#4bc0ff]" />
                <span>arshiranjeet133@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ff79e0] shrink-0 mt-0.5" />
                <span>Purnia, Bihar - 854303</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#3a2f9a]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a9a4d6]">
          <div>
            © {currentYear} Arshi Enterprises (arshigps.com). All rights reserved.
          </div>
          <div>
            Track Every Vehicle • Save Every Rupee
          </div>
        </div>

      </div>
    </footer>
  );
}
