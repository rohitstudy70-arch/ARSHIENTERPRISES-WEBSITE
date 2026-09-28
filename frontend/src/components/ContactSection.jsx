import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Mail, Send, ShieldCheck, Check } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicles, setVehicles] = useState('1 to 5 vehicles');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Namaste Arshi Enterprises! Main ${name} bol raha hoon. Mere paas ${vehicles} hain. Mera contact number ${phone} hai. Mujhe GPS tracking ka demo aur installation quote chahiye.`;
    const whatsappUrl = `https://wa.me/917782808063?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#140d5c]/30 relative overflow-hidden border-t border-[#3a2f9a]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Info Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#140d5c] border border-[#3a2f9a] text-xs font-bold text-[#e3ab84] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Doorstep Installation Bihar</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Get Free GPS Demo <br />
              <span className="text-[#e3ab84]">& Best Fleet Price</span>
            </h2>

            <p className="text-base text-[#b3aee0] leading-relaxed">
              Purnea, Katihar, Bhagalpur, Patna aur poore Bihar me direct doorstep installation aur 24/7 technical support.
            </p>

            <div className="space-y-4 pt-4">
              <a 
                href="tel:+917782808063" 
                className="flex items-start gap-4 p-4 rounded-xl bg-[#0a0630]/60 border border-[#3a2f9a] hover:border-[#e3ab84] transition group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#140d5c] flex items-center justify-center text-[#e3ab84] group-hover:scale-110 transition">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#a9a4d6] font-semibold">Direct Helpline</div>
                  <div className="text-base font-bold text-white">+91 77828 08063</div>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0a0630]/60 border border-[#3a2f9a]">
                <div className="w-10 h-10 rounded-lg bg-[#140d5c] flex items-center justify-center text-[#4bc0ff]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#a9a4d6] font-semibold">Office Address</div>
                  <div className="text-sm font-medium text-white/90">
                    Hanuman Mandir, NH31, Maranga, near Vidya Vihar Institute Of Technology, Purnia - 854303, Bihar, India
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0a0630]/60 border border-[#3a2f9a]">
                <div className="w-10 h-10 rounded-lg bg-[#140d5c] flex items-center justify-center text-[#ff79e0]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#a9a4d6] font-semibold">Email Inquiry</div>
                  <div className="text-sm font-medium text-white/90">
                    arshiranjeet133@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Lead Capture Form */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#3a2f9a] shadow-2xl relative">
              <h3 className="text-2xl font-bold text-white mb-2">
                Instant WhatsApp Quote
              </h3>
              <p className="text-xs sm:text-sm text-[#b3aee0] mb-6">
                Form bhariye, details turant hamare WhatsApp par receive hongi aur aapko instant quotation mil jayega.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#b3aee0] uppercase mb-1.5">
                    Aapka Naam (Full Name)
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#0a0630] border border-[#3a2f9a] text-white text-sm focus:outline-none focus:border-[#e3ab84] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#b3aee0] uppercase mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#0a0630] border border-[#3a2f9a] text-white text-sm focus:outline-none focus:border-[#e3ab84] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#b3aee0] uppercase mb-1.5">
                    Kitni Gaadiyon Ke Liye GPS Chahiye?
                  </label>
                  <select
                    value={vehicles}
                    onChange={(e) => setVehicles(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#0a0630] border border-[#3a2f9a] text-white text-sm focus:outline-none focus:border-[#e3ab84] transition"
                  >
                    <option value="1 to 5 vehicles">1 se 5 Gaadiyan (Personal / Small Fleet)</option>
                    <option value="6 to 20 vehicles">6 se 20 Gaadiyan (Commercial Transport)</option>
                    <option value="20+ vehicles">20 se zyada Gaadiyan (Enterprise Fleet)</option>
                    <option value="AIS 140 Passing">Commercial AIS 140 RTO Passing Only</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[#f3c39a] to-[#d98f5e] text-[#1a0f40] hover:shadow-neonAmber hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>WhatsApp Par Quotation Bhejein</span>
                </button>
              </form>

              {/* Trust Badge */}
              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-[#a9a4d6] border-t border-[#3a2f9a]/60 pt-4">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#4bc0ff]" /> No Spam Guarantee
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#4bc0ff]" /> Instant Reply
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
