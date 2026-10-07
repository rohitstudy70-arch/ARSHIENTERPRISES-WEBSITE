import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Calendar, MapPin, Users, Award, Sparkles, 
  CheckCircle2, Phone, Mail, ChevronRight, ExternalLink, 
  Filter, X, Clock, Download, Tag, ArrowRight, Share2, Check
} from 'lucide-react';

import teamSportsImg from '../assets/team-sports-event-2024.jpg';
import installationTeamImg from '../assets/lok-sabha-election-installation-team-2024.jpg';
import fieldEngineersImg from '../assets/arshi-field-engineers-operations-team.jpg';
import biharSummitImg from '../assets/bihar-business-connect-summit-2024.jpg';
import hardwareExpoImg from '../assets/telematics-hardware-expo-pavilion.jpg';

export default function EventsPage() {
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

  const galleryImages = [
    { src: teamSportsImg, title: 'Arshi Team Sports & Champions Meet 🏆' },
    { src: installationTeamImg, title: 'Lok Sabha Election 2024 • EVM GPS Installation Team 🗳️' },
    { src: fieldEngineersImg, title: 'Arshi On-Ground Field Engineering & Installation Unit ⚡' },
    { src: biharSummitImg, title: 'Bihar Business Connect 2024 • Global Investors Summit 🏛️' },
    { src: hardwareExpoImg, title: 'Live Telematics & AIS 140 Hardware Demo Pavilion 🔬' },
    { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop', title: 'Keynote Presentation & AI Dashcam Launch' },
    { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop', title: 'State Logistics Expo Hardware Pavilion' },
    { src: 'https://images.unsplash.com/photo-1582192732943-e15e5ec18844?q=80&w=800&auto=format&fit=crop', title: 'Transporters Meetup & Diesel Anti-Theft Testing' },
    { src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop', title: 'Driver 112 SOS Panic Drill & Safety Briefing' }
  ];

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

      {/* Photo Highlights Section (Moved to Top) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase text-blue-600 tracking-widest block mb-1">
            Visual Memories & Operations
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Event & Operations <span className="text-amber-600">Photo Gallery</span>
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Moments captured across field operations, election duties, conferences, live hardware expos, and transporter meets
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((img, i) => (
            <div 
              key={i}
              onClick={() => setSelectedImage(img)}
              className="h-56 rounded-2xl overflow-hidden relative border border-slate-200 cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <img 
                src={img.src} 
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold leading-tight drop-shadow">
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
