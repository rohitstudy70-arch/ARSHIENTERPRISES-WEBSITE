import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck, CheckCircle2, Phone, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';
import { fetchStates } from '../services/api';

const fallbackStates = [
  { name: "Bihar", code: "BR", zone: "east", portal: "Bihar Vahan & Mines Portal", vehicles: ["Trucks", "School Buses", "Taxis", "Mining Dumpers", "Tractors"], status: "Approved & Live" },
  { name: "Jharkhand", code: "JH", zone: "east", portal: "Jharkhand Transport VLT Portal", vehicles: ["Coal Trucks", "School Vans", "Taxis", "Commercial Fleets"], status: "Approved & Live" },
  { name: "West Bengal", code: "WB", zone: "east", portal: "WB Transport Vahan VLT", vehicles: ["Kolkata Cabs", "Buses", "Goods Trucks", "Tankers"], status: "Approved & Live" },
  { name: "Odisha", code: "OD", zone: "east", portal: "Odisha Vahan i3MS Mining Portal", vehicles: ["Mining Dumpers", "School Buses", "Interstate Trucks"], status: "Approved & Live" },
  { name: "Uttar Pradesh", code: "UP", zone: "north", portal: "UP RTO Vahan 4.0 Portal", vehicles: ["Commercial Trucks", "Taxis", "School Buses", "Tankers"], status: "Approved & Live" },
  { name: "Delhi NCR", code: "DL", zone: "north", portal: "Delhi Transport Dept. VLT", vehicles: ["All Taxis", "School Buses", "Commercial Fleets", "EV Cabs"], status: "Approved & Live" },
  { name: "Haryana", code: "HR", zone: "north", portal: "Haryana Sarathi / Vahan VLT", vehicles: ["Commercial Cabs", "School Buses", "Heavy Goods"], status: "Approved & Live" },
  { name: "Punjab", code: "PB", zone: "north", portal: "Punjab Transport Department", vehicles: ["Agriculture Transport", "School Vans", "Highway Trucks"], status: "Approved & Live" },
  { name: "Rajasthan", code: "RJ", zone: "north", portal: "Rajasthan Vahan Mines Portal", vehicles: ["Mining Trucks", "Tourist Cabs", "School Buses"], status: "Approved & Live" },
  { name: "Himachal Pradesh", code: "HP", zone: "north", portal: "HP Transport Hill Safety VLT", vehicles: ["Tourist Buses", "Taxis", "Goods Carriers"], status: "Approved & Live" },
  { name: "Uttarakhand", code: "UK", zone: "north", portal: "Char Dham Yatra & UK RTO VLT", vehicles: ["Yatra Buses", "Taxis", "Commercial Trucks"], status: "Approved & Live" },
  { name: "Jammu & Kashmir", code: "JK", zone: "north", portal: "J&K Transport Command Center", vehicles: ["Tourist Cabs", "Interstate Cargo", "Buses"], status: "Approved & Live" },
  { name: "Maharashtra", code: "MH", zone: "west", portal: "Maha Vahan VLT ERSS 112", vehicles: ["Mumbai Taxis", "School Buses", "Heavy Fleets", "Hazardous Tankers"], status: "Approved & Live" },
  { name: "Gujarat", code: "GJ", zone: "west", portal: "Gujarat Transport Vahan VLT", vehicles: ["Industrial Trucks", "Chemical Tankers", "School Buses"], status: "Approved & Live" },
  { name: "Goa", code: "GA", zone: "west", portal: "Goa RTO Tourist Safety VLT", vehicles: ["Rental Cabs", "Tourist Taxis", "Interstate Buses"], status: "Approved & Live" },
  { name: "Madhya Pradesh", code: "MP", zone: "central", portal: "MP Transport Vahan & Mines", vehicles: ["Mining Dumpers", "School Buses", "Freight Carriers"], status: "Approved & Live" },
  { name: "Chhattisgarh", code: "CG", zone: "central", portal: "CG Khanij & VLT Command", vehicles: ["Coal Dumpers", "Iron Ore Trucks", "School Vans"], status: "Approved & Live" },
  { name: "Karnataka", code: "KA", zone: "south", portal: "Karnataka Vahan Suraksha Portal", vehicles: ["Bengaluru Taxis", "School Buses", "Factory Cabs", "Trucks"], status: "Approved & Live" },
  { name: "Tamil Nadu", code: "TN", zone: "south", portal: "TN Transport Vahan VLT", vehicles: ["Omni Buses", "School Fleets", "Goods Transport"], status: "Approved & Live" },
  { name: "Telangana", code: "TS", zone: "south", portal: "Telangana RTA Live VLT", vehicles: ["Hyderabad Cabs", "School Buses", "Cargo Fleets"], status: "Approved & Live" },
  { name: "Andhra Pradesh", code: "AP", zone: "south", portal: "AP Transport Vahan Portal", vehicles: ["Port Trucks", "Aquaculture Cargo", "Taxis", "Buses"], status: "Approved & Live" },
  { name: "Kerala", code: "KL", zone: "south", portal: "Suraksha-Mitra Kerala VLT", vehicles: ["KSRTC Buses", "School Fleets", "Tourist Cabs", "Trucks"], status: "Approved & Live" },
  { name: "Assam", code: "AS", zone: "northeast", portal: "Assam Transport VLT System", vehicles: ["Tea Estate Trucks", "Buses", "Commercial Cabs"], status: "Approved & Live" },
  { name: "Meghalaya", code: "ML", zone: "northeast", portal: "Meghalaya RTO VLT", vehicles: ["Coal & Limestone Trucks", "Tourist Cabs"], status: "Approved & Live" },
  { name: "Tripura", code: "TR", zone: "northeast", portal: "Tripura Vahan VLT Portal", vehicles: ["Interstate Goods", "Passenger Vehicles"], status: "Approved & Live" },
  { name: "Sikkim", code: "SK", zone: "northeast", portal: "Sikkim Transport Hill VLT", vehicles: ["Tourist Cabs", "Mountain Freight"], status: "Approved & Live" },
  { name: "Nagaland", code: "NL", zone: "northeast", portal: "Nagaland Transport Portal", vehicles: ["Highway Trucks", "Passenger Cabs"], status: "Approved & Live" },
  { name: "Manipur", code: "MN", zone: "northeast", portal: "Manipur Vahan VLT Portal", vehicles: ["Interstate Cargo", "Commercial Taxis"], status: "Approved & Live" },
  { name: "Arunachal Pradesh", code: "AR", zone: "northeast", portal: "Arunachal Transport VLT", vehicles: ["Border Freight", "Commercial Fleets"], status: "Approved & Live" },
  { name: "Mizoram", code: "MZ", zone: "northeast", portal: "Mizoram RTO VLT System", vehicles: ["Goods Vehicles", "Commercial Taxis"], status: "Approved & Live" }
];

export default function ApprovedStatesPage() {
  const [states, setStates] = useState(fallbackStates);
  const [search, setSearch] = useState('');
  const [selectedZone, setSelectedZone] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadStates = async () => {
      const data = await fetchStates();
      if (data && data.success && data.data && data.data.length > 0) {
        setStates(data.data);
      }
    };
    loadStates();
  }, []);

  const filteredStates = states.filter(s => {
    const matchesZone = selectedZone === 'all' || s.zone.toLowerCase() === selectedZone.toLowerCase();
    const query = search.toLowerCase();
    const matchesSearch = s.name.toLowerCase().includes(query) || 
                          s.code.toLowerCase().includes(query) || 
                          s.portal.toLowerCase().includes(query);
    return matchesZone && matchesSearch;
  });

  const handleInquiry = (stateName, stateCode) => {
    const text = `Namaste Arshi Enterprises! Mujhe ${stateName} (${stateCode}) ke liye AIS 140 GPS RTO passing certificate aur bulk quote chahiye.`;
    window.open(`https://wa.me/917782808063?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141b3d] via-[#0d122b] to-[#070a1a] text-white pt-28 pb-20">
      
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-extrabold text-emerald-400 uppercase tracking-wider mb-6">
          <ShieldCheck className="w-4 h-4" />
          <span>Pan-India MoRTH & AIS 140 Compliance</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
          Approved States & UTs for <span className="text-[#e3ab84]">AIS 140 GPS</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#b8c3e8] max-w-3xl mx-auto leading-relaxed">
          Arshi Enterprises provides Government & ARAI/CDAC certified AIS 140 GPS Location Tracking (VLT) devices with Emergency SOS 112 ERSS integration and full RTO passing support across all Indian States.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10">
          <div className="p-5 rounded-2xl bg-[#1a224a]/80 border border-[#5a69c8]/30 backdrop-blur-md">
            <span className="block text-3xl font-black text-[#4bc0ff]">28+</span>
            <span className="text-xs font-bold text-[#b8c3e8] uppercase tracking-wider">States Approved</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#1a224a]/80 border border-[#5a69c8]/30 backdrop-blur-md">
            <span className="block text-3xl font-black text-[#e3ab84]">8+</span>
            <span className="text-xs font-bold text-[#b8c3e8] uppercase tracking-wider">Union Territories</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#1a224a]/80 border border-[#5a69c8]/30 backdrop-blur-md">
            <span className="block text-3xl font-black text-emerald-400">100%</span>
            <span className="text-xs font-bold text-[#b8c3e8] uppercase tracking-wider">Vahan Portal Sync</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#1a224a]/80 border border-[#5a69c8]/30 backdrop-blur-md">
            <span className="block text-3xl font-black text-[#ff79e0]">112</span>
            <span className="text-xs font-bold text-[#b8c3e8] uppercase tracking-wider">Police SOS Ready</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative mb-6">
          <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-[#b8c3e8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search state name or code (e.g. Bihar, UP, Maharashtra, Bengal, Mining)..."
            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[#1a224a]/90 border border-[#5a69c8]/40 text-white text-base focus:outline-none focus:border-[#e3ab84] focus:ring-2 focus:ring-[#e3ab84]/20 transition shadow-xl"
          />
        </div>

        {/* Zone Pill Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { key: 'all', label: 'All States & UTs' },
            { key: 'east', label: 'East India' },
            { key: 'north', label: 'North India' },
            { key: 'west', label: 'West India' },
            { key: 'south', label: 'South India' },
            { key: 'central', label: 'Central India' },
            { key: 'northeast', label: 'North East' },
          ].map(z => (
            <button
              key={z.key}
              onClick={() => setSelectedZone(z.key)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition ${
                selectedZone === z.key
                  ? 'bg-gradient-to-r from-[#f3c39a] to-[#d98f5e] text-[#1a0f40] shadow-md'
                  : 'bg-[#1a224a]/60 text-[#b8c3e8] border border-[#5a69c8]/30 hover:border-[#e3ab84]'
              }`}
            >
              {z.label}
            </button>
          ))}
        </div>
      </div>

      {/* State Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStates.map(s => (
            <div
              key={s.code}
              className="p-7 rounded-3xl bg-[#1a224a]/70 border border-[#5a69c8]/30 hover:border-[#e3ab84] hover:bg-[#243069]/90 transition-all duration-300 flex flex-col justify-between shadow-xl group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#4bc0ff]/10 border border-[#4bc0ff]/30 flex items-center justify-center font-black text-lg text-[#4bc0ff]">
                      {s.code}
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-white group-hover:text-[#e3ab84] transition-colors">
                        {s.name}
                      </h3>
                      <span className="text-[10px] font-extrabold uppercase text-[#e3ab84] tracking-widest">
                        {s.zone} India Zone
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/10 border border-emerald-500/40 text-emerald-400">
                    ✓ Live RTO
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-xs text-[#b8c3e8]">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🏛️</span>
                    <span>Portal: <b className="text-white">{s.portal}</b></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>ARAI / CDAC Certificate Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>112 ERSS Police SOS Button Integration</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#5a69c8]/20 mb-6">
                  <div className="text-[10px] font-bold text-[#b8c3e8] uppercase mb-2">Mandatory Categories:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.vehicles.map((v, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#0d122b]/80 border border-[#5a69c8]/20 text-[#d0d8f5]">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleInquiry(s.name, s.code)}
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-black bg-gradient-to-r from-[#f3c39a] to-[#d98f5e] text-[#1a0f40] hover:shadow-neonAmber hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>Get RTO Certificate Quote</span>
                </button>
                <a
                  href="tel:+917782808063"
                  className="p-3 rounded-xl border border-[#5a69c8]/40 text-white hover:border-[#e3ab84] hover:bg-[#e3ab84]/10 transition"
                  title="Call Helpline"
                >
                  <Phone className="w-4 h-4 text-[#e3ab84]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
