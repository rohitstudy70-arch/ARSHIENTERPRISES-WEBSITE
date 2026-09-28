import React, { useState } from 'react';
import { ShieldCheck, Zap, Battery, CheckCircle, MessageSquare, Tag } from 'lucide-react';

export default function HardwareCatalog() {
  const [activeTab, setActiveTab] = useState('all');

  const products = [
    {
      id: 'agt365n',
      name: 'Arshi AGT365N Pro GPS Tracker',
      category: 'commercial',
      price: '₹2,999',
      originalPrice: '₹3,749',
      discount: '20% OFF',
      bestFor: 'Cars, Commercial Trucks & Fleets',
      specs: ['Remote Engine Cut-Off', '90-Day Playback', '150mAh Battery Backup', 'IP65 Waterproof'],
      popular: true,
    },
    {
      id: 'pro365n',
      name: 'Arshi PRO-365N Fleet Master',
      category: 'commercial',
      price: '₹3,499',
      originalPrice: '₹4,499',
      discount: '22% OFF',
      bestFor: 'Heavy Trucks, Dumper & Bus Fleets',
      specs: ['Dual Server Telemetry', 'Diesel Fuel Sensor Ready', 'Over-Voltage Protection', 'Anti-Jammer Guard'],
      popular: false,
    },
    {
      id: 'ais140',
      name: 'AIS 140 Govt. Certified GPS',
      category: 'ais140',
      price: '₹5,999',
      originalPrice: '₹7,500',
      discount: 'RTO Certified',
      bestFor: 'Commercial Transport, Taxis & School Vans',
      specs: ['Direct Bihar RTO Passing', 'Panic SOS Emergency Button', 'Dual eSIM Fallback', 'ARAI & CDAC Approved'],
      popular: true,
    },
    {
      id: 'magnetic',
      name: 'Portable Wireless Magnetic GPS',
      category: 'magnetic',
      price: '₹3,899',
      originalPrice: '₹4,999',
      discount: 'No Wiring',
      bestFor: 'Assets, Containers & Hidden Tracking',
      specs: ['10,000mAh Battery (30 Days)', 'Strong Industrial Magnet', 'Voice Monitoring Mic', 'Zero Wiring Required'],
      popular: false,
    },
    {
      id: 'bike',
      name: 'Micro Bike & Scooty GPS Tracker',
      category: 'personal',
      price: '₹1,999',
      originalPrice: '₹2,699',
      discount: '26% OFF',
      bestFor: 'Bikes, Scooters & Electric 2-Wheelers',
      specs: ['Ultra-Compact Size', 'Zero Battery Drain Mode', 'Towing & Shake Alarm', 'Live Speed Alerts'],
      popular: false,
    },
    {
      id: 'tractor',
      name: 'Agri-Track Tractor & Harvester GPS',
      category: 'tractor',
      price: '₹3,299',
      originalPrice: '₹4,199',
      discount: '1-Yr Free SIM',
      bestFor: 'Tractor, JCB & Agriculture Machinery',
      specs: ['Acreage & Bigha Area Calculation', 'Engine Run-Hour Counter', 'Heavy Vibration Proof', 'Battery Cut Siren'],
      popular: false,
    }
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category === activeTab);

  const handleInquiry = (productName, price) => {
    const text = `Namaste Arshi Enterprises! Mujhe ${productName} (${price}) ke baare me inquiry karni hai. Kripya pricing aur installation details bhejein.`;
    window.open(`https://wa.me/917782808063?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="hardware" className="py-24 bg-[#0a0630] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#140d5c] border border-[#3a2f9a] text-xs font-bold text-[#4bc0ff] uppercase tracking-wider mb-4">
            <Tag className="w-3.5 h-3.5" />
            <span>Direct Manufacturer Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Best-Selling <span className="text-[#e3ab84]">GPS Trackers</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#b3aee0]">
            1 Year Replacement Warranty • 1 Year Free Pan-India SIM Recharge • Doorstep Installation Support in Bihar
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { key: 'all', label: 'All Trackers' },
            { key: 'commercial', label: 'Commercial & Trucks' },
            { key: 'ais140', label: 'AIS 140 RTO Approved' },
            { key: 'magnetic', label: 'Wireless Magnetic' },
            { key: 'personal', label: 'Bikes & Personal' },
            { key: 'tractor', label: 'Tractors & JCB' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-[#f3c39a] to-[#d98f5e] text-[#1a0f40] shadow-neonAmber'
                  : 'bg-[#140d5c]/60 text-[#b3aee0] border border-[#3a2f9a] hover:border-[#e3ab84] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between relative border border-[#3a2f9a] group"
            >
              {product.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#e3ab84] to-[#ff79e0] text-[#1a0f40] text-[10px] font-black uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <span className="text-xs font-semibold text-[#4bc0ff] uppercase tracking-wider">
                  {product.bestFor}
                </span>
                
                <h3 className="text-2xl font-black text-white mt-1 mb-4 group-hover:text-[#e3ab84] transition-colors">
                  {product.name}
                </h3>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-extrabold text-white font-outfit">
                    {product.price}
                  </span>
                  <span className="text-base text-[#a9a4d6] line-through">
                    {product.originalPrice}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#e3ab84]/20 text-[#e3ab84] border border-[#e3ab84]/40">
                    {product.discount}
                  </span>
                </div>

                {/* Specs List */}
                <div className="space-y-2.5 mb-8">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-[#b3aee0]">
                      <CheckCircle className="w-4 h-4 text-[#4bc0ff] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleInquiry(product.name, product.price)}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#f3c39a] to-[#d98f5e] text-[#1a0f40] hover:shadow-neonAmber hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Get WhatsApp Quote & Demo</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
