import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import {
  MapPin, Clock, Droplets, LineChart, ShieldAlert,
  Smartphone, Users, CheckCircle, Shield,
  BadgeCheck, Map, Star, ChevronRight, Zap, Target, Headphones
} from 'lucide-react';
import { BUSINESS } from '../../config/environment';
import { useGsapTextFillScrub } from '../../hooks/useGsapAnimations';

// Helper component for animating counters
const AnimatedCounter = ({ end, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60); // Assuming 60 FPS
    
    if (inView) {
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const SaaSSections = ({ testimonials }) => {
  const titleFillRef = useGsapTextFillScrub();
  const descFillRef = useGsapTextFillScrub();

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const features = [
    {
      icon: MapPin,
      title: 'Real-Time Vehicle Tracking',
      desc: 'Pinpoint accuracy with live location updates every 10 seconds for complete fleet visibility.'
    },
    {
      icon: ShieldAlert,
      title: 'Geo-Fencing Alerts',
      desc: 'Create virtual boundaries and receive instant notifications upon entry or exit.'
    },
    {
      icon: Droplets,
      title: 'Fuel Monitoring',
      desc: 'Track fuel consumption, prevent theft, and optimize mileage with precision sensors.'
    },
    {
      icon: LineChart,
      title: 'Driver Behaviour Analysis',
      desc: 'Monitor harsh braking, overspeeding, and sharp turns to ensure safety.'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Access',
      desc: 'Control your fleet from anywhere with our powerful, easy-to-use iOS & Android apps.'
    },
    {
      icon: Clock,
      title: '24/7 Customer Support',
      desc: 'Round-the-clock technical assistance to ensure your tracking system never sleeps.'
    }
  ];

  return (
    <div className="bg-slate-50 relative overflow-hidden">
      {/* Ambient Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-sky-100/50 blur-[100px]" />
      </div>

      {/* 1. Feature Cards Grid */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16 px-2"
          >
            <h2 className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">Powerful Features</h2>
            <h3 ref={titleFillRef} className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Everything You Need to Manage Your Fleet
            </h3>
            <p ref={descFillRef} className="text-lg text-slate-700 font-medium">
              Hum sirf device nahi dete, practical support ke saath complete tracking solution deliver karte hain.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feat, idx) => (
              <motion.div 
                key={idx} variants={fadeInUp}
                className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <feat.icon className="w-6 sm:w-7 h-6 sm:h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{feat.title}</h4>
                <p className="text-slate-700 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. Statistics Section */}
      <section className="py-12 md:py-16 bg-blue-600 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-y-8 md:gap-x-4 md:divide-x divide-blue-500/30">
            <div className="text-center px-2 sm:px-4">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-1 sm:mb-2">
                <AnimatedCounter end={10000} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm md:text-base text-blue-100 font-medium">Vehicles Tracked</div>
            </div>
            <div className="text-center px-2 sm:px-4">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-1 sm:mb-2">
                <AnimatedCounter end={2500} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm md:text-base text-blue-100 font-medium">Happy Clients</div>
            </div>
            <div className="text-center px-2 sm:px-4">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-1 sm:mb-2">
                <AnimatedCounter end={99} suffix="%" duration={1} />
              </div>
              <div className="text-xs sm:text-sm md:text-base text-blue-100 font-medium">Tracking Accuracy</div>
            </div>
            <div className="text-center px-2 sm:px-4">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-1 sm:mb-2">24/7</div>
              <div className="text-xs sm:text-sm md:text-base text-blue-100 font-medium">Live Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us Layout */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeInUp}
              className="order-2 lg:order-1 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-2xl md:rounded-3xl transform -rotate-3 scale-[1.02] opacity-20 blur-xl" />
              <img 
                src="https://cpimg.tistatic.com/08742420/b/5/Arshi-GPS-Tracker-PRO-365N.jpg" 
                alt="GPS Dashboard Mockup" 
                className="relative rounded-2xl md:rounded-3xl shadow-2xl border border-slate-200/50 object-cover w-full h-[250px] sm:h-[350px] md:h-[500px]"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 hidden sm:flex bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-slate-100 items-center gap-2 sm:gap-4">
                <div className="w-8 sm:w-12 h-8 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 sm:w-6 h-4 sm:h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 font-medium">AIS 140 Certified</p>
                  <p className="text-lg font-bold text-slate-900">100% Secure</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 lg:order-2"
            >
              <motion.h2 variants={fadeInUp} className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">
                Why Choose Us
              </motion.h2>
              <motion.h3 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 sm:mb-6 leading-tight">
                Empowering Your Business with Smart Tracking
              </motion.h3>
              <motion.p variants={fadeInUp} className="text-lg text-slate-700 mb-8 leading-relaxed">
                We provide more than just hardware. Arshi GPS delivers a comprehensive ecosystem designed to enhance operational efficiency, ensure safety, and boost your bottom line.
              </motion.p>
              
              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: Headphones, text: "Trusted 24/7 technical support" },
                  { icon: Zap, text: "Fast & professional installation" },
                  { icon: Target, text: "Pinpoint accurate tracking" },
                  { icon: BadgeCheck, text: "Highly affordable pricing plans" },
                  { icon: Map, text: "Pan India service coverage" }
                ].map((item, i) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div key={i} variants={fadeInUp} className="flex items-center gap-3 sm:gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-slate-800 font-semibold text-sm sm:text-base md:text-lg">{item.text}</span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-16 md:py-24 bg-white relative z-10 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto mb-12 md:mb-16 px-2"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Trusted by Industry Leaders</h2>
              <p className="text-lg text-slate-700">See what our clients have to say about their experience with Arshi GPS.</p>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {testimonials.slice(0, 3).map((testimonial, idx) => (
                <motion.div 
                  key={idx} variants={fadeInUp}
                  className="bg-slate-50 rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-slate-100 relative"
                >
                  <div className="flex gap-1 mb-4 sm:mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 sm:w-5 h-4 sm:h-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-200 text-slate-200'}`} />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 italic line-clamp-4 leading-relaxed">
                    "{testimonial.message}"
                  </p>
                  <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                      <p className="text-sm text-slate-600 font-medium">{testimonial.company || 'Verified Client'}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* 5. CTA Section */}
      <section className="py-16 md:py-24 relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-sky-500 rounded-2xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-16 text-center relative shadow-2xl overflow-hidden">
            {/* Decorative background circles */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[500px] h-[500px] rounded-full border-[60px] border-white/10" />
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[300px] h-[300px] rounded-full border-[40px] border-white/10" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
                Ready to Track Your Vehicles Smartly?
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-blue-100 mb-6 sm:mb-10">
                Join thousands of businesses who trust Arshi GPS for complete fleet visibility and security.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Link 
                  to="/contact"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Get Free Demo <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
                </Link>
                <a 
                  href={`tel:${BUSINESS.PHONE}`}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-lg sm:rounded-xl hover:bg-white/10 transition-all duration-300 text-sm sm:text-base text-center flex items-center justify-center"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
