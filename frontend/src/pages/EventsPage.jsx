import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Calendar, MapPin, Users, Award, Sparkles, 
  CheckCircle2, Phone, Mail, ChevronRight, ExternalLink, 
  Filter, X, Clock, Download, Tag, ArrowRight, Share2, Check
} from 'lucide-react';

import teamSportsImg from '../assets/team-sports-event-2024.jpg';
import installationTeamImg from '../assets/lok-sabha-election-installation-team-2024.jpg';
import biharSummitImg from '../assets/bihar-business-connect-summit-2024.jpg';
import hardwareExpoImg from '../assets/telematics-hardware-expo-pavilion.jpg';

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState('Annual Telematics & AI Fleet Summit 2025');
  const [selectedImage, setSelectedImage] = useState(null);
  
  // RSVP Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    fleetSize: '',
    city: '',
    vehicleType: 'Trucks / Commercial',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const helplinePhone = "+917782808063";
  const phoneDisplay = "+91 77828 08063";

  const categories = [
    { id: 'all', label: 'All Events & Gallery (10)' },
    { id: 'expo', label: '🏛️ Industry Expos & Summits' },
    { id: 'team', label: '🏆 Team & Duty' },
    { id: 'fleet', label: '🚛 Transporter Meets' },
    { id: 'safety', label: '🛡️ Driver Safety' },
    { id: 'agri', label: '🚜 Agri-IoT' },
    { id: 'partner', label: '🤝 Partner Conclaves' },
  ];

  const eventsList = [
    {
      id: 0,
      category: 'team',
      badge: '🏆 Annual Champions Meet',
      status: 'Completed',
      date: 'Annual Meet 2024',
      location: 'Purnea Sports Ground, Bihar',
      title: 'Arshi Team Sports & Annual Champions Meet',
      image: teamSportsImg,
      description: 'Celebrating team unity, operational excellence, and sportsmanship. Arshi Enterprises field engineers, telemetry technicians, and support team celebrate annual tournament victory.',
      highlights: ['Annual Sports Championship', 'Team Excellence Awards', 'Field & NOC Staff Meet'],
      attendees: 'Full Arshi Team & Staff'
    },
    {
      id: 101,
      category: 'team',
      badge: '🛠️ Installation Team',
      status: 'Completed',
      date: 'May 2024',
      location: 'Araria Parliamentary Constituency, Bihar',
      title: 'Lok Sabha Election 2024 • EVM GPS Installation Team',
      image: installationTeamImg,
      description: 'Arshi Enterprises specialized field telemetry engineers deployed on official Lok Sabha Election 2024 duty for live AIS 140 GPS tracking, secure fleet monitoring, and real-time transit telemetry of Polled EVM & VVPAT transport convoys.',
      highlights: ['Lok Sabha Election 2024', 'Polled EVM & VVPAT Security', 'Field Telemetry Engineers'],
      attendees: 'Arshi Field Deployment Unit'
    },
    {
      id: 102,
      category: 'expo',
      badge: '🏛️ Global Investors Summit',
      status: 'Completed',
      date: '19 - 20 Dec 2024',
      location: 'Patna, Bihar',
      title: 'Bihar Business Connect 2024 • Global Investors Summit',
      image: biharSummitImg,
      description: 'Organized by Invest Bihar, Dept. of Industries (Govt. of Bihar) & BIADA. Arshi Enterprises represented Eastern India smart telematics and fleet automation sector, engaging with state leadership, enterprise partners, and global investors.',
      highlights: ['Invest Bihar & BIADA Conclave', 'Govt. of Bihar Flagship Summit', 'Enterprise Telematics Growth'],
      attendees: 'Global Investors & Leaders'
    },
    {
      id: 103,
      category: 'expo',
      badge: '🔬 Live Hardware Pavilion',
      status: 'Completed',
      date: 'Annual Conclave',
      location: 'Tech Pavilion, Bihar',
      title: 'Live Telematics & AIS 140 Hardware Demo Pavilion',
      image: hardwareExpoImg,
      description: 'Hands-on technical showcase demonstrating ARAI-approved AIS 140 GPS trackers, ultrasonic fuel sensors, wireless engine immobilizers, and multi-vehicle diagnostic hardware with live telemetry dashboards.',
      highlights: ['Live AIS 140 Hardware Demos', 'Ultrasonic Diesel Sensor Tests', 'Fleet Software Integration'],
      attendees: 'Transporters & Distributors'
    },
    {
      id: 1,
      category: 'expo',
      badge: '🏛️ State Expo',
      status: 'Completed',
      date: 'August 2024',
      location: 'Gyan Bhawan, Patna',
      title: 'Bihar State Logistics & Telematics Expo',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
      description: 'Official government technology pavilion showcasing ARAI-certified AIS 140 devices, Emergency 112 ERSS police alert integration, and wireless cold-chain telemetry.',
      highlights: ['ARAI & MoRTH Demo', '112 Emergency SOS', '150+ Fleet Delegates'],
      attendees: '350+ Visitors'
    },
    {
      id: 2,
      category: 'fleet',
      badge: '🚛 Transporter Meet',
      status: 'Completed',
      date: 'October 2024',
      location: 'Maranga Hub, Purnea',
      title: 'Transporters Fuel Theft & Security Meetup',
      image: 'https://images.unsplash.com/photo-1582192732943-e15e5ec18844?q=80&w=800&auto=format&fit=crop',
      description: '100+ commercial truck and mining dumper owners participated in live anti-theft fuel drain detection tests with real-time phone alerts and instant engine shut-off.',
      highlights: ['Live Fuel Drain Sensor Test', 'Remote Engine Immobilizer', 'Diesel Calibration Masterclass'],
      attendees: '120+ Fleet Owners'
    },
    {
      id: 3,
      category: 'safety',
      badge: '🛡️ Driver Safety',
      status: 'Completed',
      date: 'May 2024',
      location: 'NH-31 Highway Terminal',
      title: 'Eastern India Driver Safety & SOS Workshop',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop',
      description: 'Direct on-ground training for long-haul commercial drivers on emergency SOS panic button protocols, anti-sleep fatigue alerts, and overspeeding control.',
      highlights: ['SOS Panic Button Drills', 'Fatigue Detection Alerts', 'Police ERSS Protocol'],
      attendees: '200+ Drivers Trained'
    },
    {
      id: 4,
      category: 'partner',
      badge: '🤝 Partner Summit',
      status: 'Completed',
      date: 'July 2024',
      location: 'Regional NOC, Purnia',
      title: 'Arshi Authorized Dealer & Technician Conclave',
      image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=800&auto=format&fit=crop',
      description: 'Empowering 50+ regional field engineers and sales partners across Bihar and Bengal with advanced diagnostic tools, bypass harness fitting, and fast warranty processing.',
      highlights: ['Fast Fitting Standards', 'Diagnostic Toolkit Training', '1-Year Swap Guarantee Process'],
      attendees: '60+ Field Techs'
    },
    {
      id: 5,
      category: 'agri',
      badge: '🚜 Agri IoT',
      status: 'Completed',
      date: 'March 2024',
      location: 'KVK Grounds, Saharsa',
      title: 'Agri-Tech & Tractor Telematics Demonstration',
      image: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?q=80&w=800&auto=format&fit=crop',
      description: 'Live field demo of agricultural tractor hour meters, acreage calculation sensors, and geo-fence anti-theft immobilization for farmers and machinery contractors.',
      highlights: ['Tractor Acreage Meter', 'Engine Hour Counter', 'Machinery Anti-Theft Guard'],
      attendees: '180+ Farmers & Contractors'
    },
    {
      id: 6,
      category: 'fleet',
      badge: '🚚 Regional Round Table',
      status: 'Completed',
      date: 'January 2024',
      location: 'Dhanbad - Bengal Border',
      title: 'Interstate Mining & Coal Fleet Round Table',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop',
      description: 'Resolving inter-state permit tracking challenges, Vahan portal integration rules, and diesel leakage tracking for heavy dumper and tipper truck operators.',
      highlights: ['Interstate RTO Permits', 'National Vahan Portal Passing', 'Mining Dumpers Telemetry'],
      attendees: '80+ Mining Transporters'
    }
  ];

  const galleryImages = [
    { src: biharSummitImg, title: 'Bihar Business Connect 2024 • Global Investors Summit 🏛️' },
    { src: hardwareExpoImg, title: 'Live Telematics & AIS 140 Hardware Demo Pavilion 🔬' },
    { src: teamSportsImg, title: 'Arshi Team Sports & Champions Meet 🏆' },
    { src: installationTeamImg, title: 'Lok Sabha Election 2024 • EVM GPS Installation Team 🗳️' },
    { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop', title: 'Keynote Presentation & AI Dashcam Launch' },
    { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop', title: 'State Logistics Expo Hardware Pavilion' },
    { src: 'https://images.unsplash.com/photo-1582192732943-e15e5ec18844?q=80&w=800&auto=format&fit=crop', title: 'Transporters Meetup & Diesel Anti-Theft Testing' },
    { src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop', title: 'Driver 112 SOS Panic Drill & Safety Briefing' }
  ];

  const filteredEvents = activeCategory === 'all' 
    ? eventsList 
    : eventsList.filter(ev => ev.category === activeCategory);

  const openRsvpModal = (eventName) => {
    setSelectedEventName(eventName);
    setFormSubmitted(false);
    setModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    // WhatsApp auto-redirect after short timeout
    setTimeout(() => {
      const msg = `Hello Arshi Enterprises! I would like to request a delegate pass for ${selectedEventName}.%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0ACity: ${formData.city}%0AFleet Size: ${formData.fleetSize}%0AVehicle: ${formData.vehicleType}`;
      window.open(`https://wa.me/917782808063?text=${msg}`, '_blank');
    }, 1200);
  };

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

        {/* Live Metrics Grid */}
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
          <div className="lg:col-span-6 relative min-h-[360px] group overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop"
              alt="Annual Telematics & AI Fleet Summit 2025"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg">
              🌟 Flagship Upcoming Event
            </span>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
              <span className="bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">300+ Expected Delegates</span>
              <span className="bg-emerald-500/90 text-white font-bold px-3 py-1 rounded-md">Registration Open</span>
            </div>
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

            <div className="space-y-2 mb-8">
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Live AI Dashcam & Driver Fatigue Monitoring Demo</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Zero-Drill Ultrasonic Fuel Theft Sensor Testing</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Free 1-Year Fleet Manager Software Pass for Transporters</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => openRsvpModal('Annual Telematics & AI Fleet Summit 2025')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition"
              >
                <span>Book Free Delegate Pass</span>
                <ChevronRight className="w-4 h-4" />
              </button>
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

      {/* Interactive Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-black uppercase text-blue-600 tracking-widest block mb-1">
              Proven Track Record
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Major Expos, Meets & <span className="text-amber-600">Workshops</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-500/25'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filtered Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((ev) => (
            <div 
              key={ev.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              <div 
                className={`${ev.id === 0 ? 'h-80 sm:h-96' : 'h-60'} bg-slate-800 relative overflow-hidden shrink-0 cursor-pointer`}
                onClick={() => setSelectedImage({ src: ev.image, title: ev.title })}
              >
                <img
                  src={ev.image}
                  alt={ev.title}
                  className={`w-full h-full object-cover ${ev.id === 0 ? 'object-[center_42%]' : 'object-center'} group-hover:scale-105 transition-transform duration-500`}
                  loading="lazy"
                />
                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider border border-white/20">
                  {ev.badge}
                </span>
                <span className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-full bg-slate-900/70 text-slate-300 text-[10px] font-bold">
                  {ev.attendees}
                </span>
              </div>
              
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
                  <span>📅 {ev.date}</span>
                  <span>•</span>
                  <span>📍 {ev.location}</span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition">
                  {ev.title}
                </h3>
                
                <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1">
                  {ev.description}
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {ev.highlights.map((hl, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                      ✓ {hl}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-blue-700">
                  <button
                    onClick={() => openRsvpModal(ev.title)}
                    className="hover:underline flex items-center gap-1"
                  >
                    <span>Request Event Summary / Video</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Completed ✓
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Highlights Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase text-blue-600 tracking-widest block mb-1">
            Visual Memories
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Event <span className="text-amber-600">Photo Highlights</span>
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Moments captured across conferences, live demos, and transporter felicitations
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img, i) => (
            <div 
              key={i}
              onClick={() => setSelectedImage(img)}
              className="h-52 rounded-2xl overflow-hidden relative border border-slate-200 cursor-pointer group shadow-sm hover:shadow-md"
            >
              <img 
                src={img.src} 
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold leading-tight">
                {img.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Host a Workshop CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900 to-slate-900 text-white border border-blue-700 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3">Host a Telematics Workshop at Your Fleet Yard</h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Want our mobile engineering team to conduct a free diesel theft detection & GPS compliance workshop for your transporter union or commercial fleet?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${helplinePhone}`}
              className="px-6 py-3.5 rounded-xl bg-white text-blue-900 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-slate-100 transition shadow-lg"
            >
              <Phone className="w-4 h-4 text-blue-700" />
              <span>Call Event Desk: {phoneDisplay}</span>
            </a>
            <a
              href="https://wa.me/917782808063?text=Hello%20Arshi%20Enterprises!%20We%20would%20like%20to%20organize%20a%20GPS%20telematics%20demo%20workshop%20at%20our%20transport%20yard."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-lg shadow-amber-500/25"
            >
              <span>💬 WhatsApp Event Coordinator</span>
            </a>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Request Received!</h3>
                <p className="text-sm text-slate-600 mb-6">
                  Thank you, <b>{formData.name}</b>. Connecting you with our Event Desk on WhatsApp for your pass confirmation...
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[11px] font-black uppercase text-amber-600 tracking-wider block mb-1">
                    Delegate Pass & RSVP
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">
                    {selectedEventName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill the form below for instant pass confirmation & event agenda.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">City / Hub</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Purnea, Patna"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Fleet Size (Vehicles)</label>
                      <input
                        type="text"
                        placeholder="e.g. 5 Trucks, 15 Buses"
                        value={formData.fleetSize}
                        onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Vehicle Type</label>
                      <select
                        value={formData.vehicleType}
                        onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-amber-500"
                      >
                        <option>Trucks / Commercial</option>
                        <option>School Buses / Vans</option>
                        <option>Mining Dumpers</option>
                        <option>Tractors & Agricultural</option>
                        <option>Taxi / Cars</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition"
                    >
                      Confirm RSVP & Get Pass on WhatsApp ↗
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md cursor-pointer animate-fadeIn"
        >
          <div className="max-w-3xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 p-2 relative">
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title} 
              className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
            />
            <div className="p-4 text-center text-white text-sm font-bold">
              {selectedImage.title}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
