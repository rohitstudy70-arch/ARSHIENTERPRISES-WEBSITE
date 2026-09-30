import React, { useState } from 'react';
import { ShieldCheck, Zap, Battery, CheckCircle, MessageSquare, Tag, Award } from 'lucide-react';

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
    const text = `Hello Arshi Enterprises! I would like to inquire about ${productName} (${price}). Please share detailed pricing, technical specifications, and doorstep installation options.`;
    window.open(`https://wa.me/917782808063?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="hardware" className="py-24 bg-white relative overflow-hidden border-t border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-800 uppercase tracking-wider mb-4 shadow-sm">
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            <span>Direct Manufacturer Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Best-Selling <span className="text-amber-600">Hardware Portfolio</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            1-Year Zero-Downtime Replacement Guarantee • 1-Year Pan-India Connectivity Included • On-Site Deployment Across India
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
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === tab.key
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
                  : 'bg-slate-100 text-slate-700 border border-slate-200 hover:border-amber-400 hover:text-slate-900'
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
              className="bg-slate-50 rounded-2xl p-7 flex flex-col justify-between relative border border-slate-200 hover:border-amber-500 hover:bg-white hover:shadow-xl transition-all duration-300 group"
            >
              {product.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                  Most Popular
                </div>
              )}

              <div>
                <div className="mb-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md">
                    {product.bestFor}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-3xl font-black text-slate-900">{product.price}</span>
                  <span className="text-sm text-slate-400 line-through">{product.originalPrice}</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{product.discount}</span>
                </div>

                <div className="space-y-2.5 mb-6">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleInquiry(product.name, product.price)}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group-hover:scale-[1.01]"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Inquire on WhatsApp</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
