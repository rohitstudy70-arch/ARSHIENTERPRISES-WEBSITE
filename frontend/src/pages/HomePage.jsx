/**
 * Home Page
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  useGsapHeroEntrance,
  useGsapFadeInUp,
  useGsapStagger,
  useGsapTextReveal,
  useGsapFloat,
  useGsapParallax,
  useGsapMagnetic,
  useGsapTextFillScrub,
} from '../hooks/useGsapAnimations';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShieldAlt, FaMapMarkerAlt, FaChartLine, FaHeadset, FaCheckCircle, FaBell, FaGasPump } from 'react-icons/fa';
import { Button } from '../components/Button';
import { ProductCard } from '../components/ProductCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { SEO } from '../components/SEO';
import { productAPI, testimonialAPI } from '../services/api';
import toast from 'react-hot-toast';
import { BUSINESS } from '../config/environment';
import { SaaSSections } from '../components/home/SaaSSections';

export const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Delay background video load to maximize initial page paint speed (FCP & LCP)
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // GSAP animation hooks
  const heroRef = useGsapHeroEntrance();
  const trustStripRef = useGsapStagger(':scope > div > div', { y: 20, duration: 0.5 });
  const servicesHeadingRef = useGsapFadeInUp();
  const servicesGridRef = useGsapStagger(':scope > div');
  const productsHeadingRef = useGsapFadeInUp();
  const productsGridRef = useGsapStagger(':scope > div');
  const testimonialsGrid1Ref = useGsapStagger(':scope > div');
  const testimonialsGrid2Ref = useGsapStagger(':scope > div');
  const ctaRef = useGsapFadeInUp();

  // New hooks
  const magneticButtonRef = useGsapMagnetic();
  const textRevealRef = useGsapTextReveal();
  const parallaxRef = useGsapParallax(0.15);
  const float1Ref = useGsapFloat({ delay: 0 });
  const float2Ref = useGsapFloat({ delay: 1 });
  const textFill1Ref = useGsapTextFillScrub();
  const textFill2Ref = useGsapTextFillScrub({ delay: 0.1 });
  const servicesTitleFillRef = useGsapTextFillScrub();
  const servicesDescFillRef = useGsapTextFillScrub({ delay: 0.1 });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsRes, testimonialsRes] = await Promise.all([
          productAPI.getFeatured(),
          testimonialAPI.getFeatured(),
        ]);

        setFeaturedProducts(productsRes.data.data);
        setTestimonials(testimonialsRes.data.data);
      } catch (error) {
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const services = [
    {
      icon: FaMapMarkerAlt,
      title: 'Real-time Vehicle Tracking',
      description: 'Live location visibility with route history for better fleet control.',
      features: ['Live GPS Tracking', '30-Day Route Playback', 'Share Live Link']
    },
    {
      icon: FaShieldAlt,
      title: 'Security & Anti-Theft',
      description: 'Remote engine cut-off and instant alerts to protect your vehicle from theft.',
      features: ['Remote Engine Lock', 'Ignition On/Off Alerts', 'Anti-Theft Alarm']
    },
    {
      icon: FaChartLine,
      title: 'Fleet Analytics',
      description: 'Actionable reports to improve utilization and reduce operating cost.',
      features: ['Daily Summary Reports', 'Stoppage & Idling Data', 'Over-speed Alerts']
    },
    {
      icon: FaBell,
      title: 'Smart Geofencing',
      description: 'Create virtual boundaries and receive instant entry/exit notifications.',
      features: ['Custom Safe Zones', 'Entry/Exit Alerts', 'Multi-zone Setup']
    },
    {
      icon: FaGasPump,
      title: 'Fuel Monitoring',
      description: 'Track fuel levels in real-time to prevent theft and optimize mileage.',
      features: ['Live Fuel Graph', 'Fuel Theft Alerts', 'Refill Notifications']
    },
    {
      icon: FaHeadset,
      title: 'Installation & Support',
      description: 'Practical deployment support and round-the-clock post-installation assistance.',
      features: ['Pan-India Installation', 'Dedicated Tech Support', '1 Year Replacement']
    },
  ];

  const highlights = [
    'Established in 2013',
    'Trusted by transport and logistics users',
    'Pan-India supply support',
    'Quick callback and quote assistance',
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Arshi Enterprises (ARSHI GPS)",
    "image": "https://cpimg.tistatic.com/08742420/b/5/Arshi-GPS-Tracker-PRO-365N.jpg",
    "@id": "https://arshigps.com/#localbusiness",
    "url": "https://arshigps.com",
    "telephone": "+917782808063",
    "email": "arshiranjeet133@gmail.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hanuman Mandir, NH31, Maranga, near Vidya Vihar Institute Of Technology",
      "addressLocality": "Purnia",
      "addressRegion": "Bihar",
      "postalCode": "854303",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.7538,
      "longitude": 87.4526
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/share/1H3y8f8zaU/",
      "https://www.instagram.com/arshient.133?igsh=enJkMm0xdHB6aWd4"
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Arshi GPS – Vehicle & Fleet Tracking Solutions Purnia Bihar" 
        description="Buy AIS 140 certified GPS trackers, AGT365N, PRO-365N, Magnet GPS & anti-theft systems in Purnia, Bihar. Real-time live tracking, fuel monitoring & RTO approval."
        keywords="GPS tracker Purnia, AIS 140 GPS Bihar, AGT365N tracker, PRO-365N GPS, vehicle tracking system Purnia, car GPS tracker Bihar, tractor GPS tracker, fleet management Bihar"
        canonicalPath="/"
        schema={localBusinessSchema}
      />
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden bg-slate-950 text-white">
        {/* Background Video */}
        {videoLoaded && (
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-45 pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="https://videos.pexels.com/video-files/3006846/3006846-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
        )}
        {/* Overlays for premium dark aesthetic and perfect readability */}
        <div className="absolute inset-0 bg-slate-950/20 z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.25),_transparent_45%),radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.15),_transparent_35%)] z-[2]" />
        
        {/* Content container elevated to render on top of the overlays */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="min-w-0">
              <p className="hero-badge inline-flex items-center gap-2 text-xs uppercase tracking-widest text-sky-200 bg-sky-500/20 px-3 py-1 rounded-full mb-4 flex-wrap w-fit">
                Arshi GPS Tracking Solutions
              </p>
              <h1 className="hero-title text-2xl sm:text-3xl md:text-5xl font-bold leading-snug md:leading-tight mb-4">
                Professional GPS Tracking for Vehicles and Fleets
              </h1>
              <p className="hero-desc text-slate-200 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
                Reliable trackers, practical installation support, and responsive customer service for businesses that need better vehicle visibility.
              </p>

              <div className="hero-buttons flex flex-col sm:flex-row gap-3 mb-8">
                <Button as={Link} to="/products" ref={magneticButtonRef} variant="primary" size="lg" className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm sm:text-base">
                  Explore Products <FaArrowRight className="inline ml-2" />
                </Button>
                <Button as={Link} to="/contact" variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-slate-950 text-sm sm:text-base">
                  Get Quote
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="hero-stat bg-slate-900/80 rounded-lg p-3 sm:p-4 border border-slate-800 text-center">
                  <p className="text-lg sm:text-2xl font-bold text-white">2013</p>
                  <p className="text-[11px] sm:text-xs text-slate-200 mt-1">Established</p>
                </div>
                <div className="hero-stat bg-slate-900/80 rounded-lg p-3 sm:p-4 border border-slate-800 text-center">
                  <p className="text-lg sm:text-2xl font-bold text-white">700+</p>
                  <p className="text-[11px] sm:text-xs text-slate-200 mt-1">Units/Month</p>
                </div>
                <div className="hero-stat bg-slate-900/80 rounded-lg p-3 sm:p-4 border border-slate-800 text-center">
                  <p className="text-lg sm:text-2xl font-bold text-white">India</p>
                  <p className="text-[11px] sm:text-xs text-slate-200 mt-1">Coverage</p>
                </div>
              </div>
            </div>

            <div ref={parallaxRef} className="hidden md:block">
              <div className="hero-image-main rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white">
                <img
                  src="https://cpimg.tistatic.com/08742420/b/5/Arshi-GPS-Tracker-PRO-365N.jpg"
                  alt="Arshi GPS Tracker"
                  className="w-full h-[280px] sm:h-[320px] md:h-[360px] object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div ref={float1Ref} className="hero-image-sub rounded-xl overflow-hidden border border-white/10 bg-white h-28 sm:h-32 flex items-center justify-center p-2 shadow-lg">
                  <img
                    src="https://cpimg.tistatic.com/08742419/b/5/Arshi-GPS-Tracker-AGT365N.jpg"
                    alt="AGT365N Tracker"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div ref={float2Ref} className="hero-image-sub rounded-xl overflow-hidden border border-white/10 bg-white h-28 sm:h-32 flex items-center justify-center p-2 shadow-lg">
                  <img
                    src="https://cpimg.tistatic.com/08742421/b/5/GPS-Tracker-PRO-Lite.jpg"
                    alt="PRO-Lite Tracker"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section ref={trustStripRef} className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                <FaCheckCircle className="text-emerald-600 flex-shrink-0 text-lg" />
                <span className="line-clamp-2">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instant Social Proof */}
      {testimonials.length > 0 && (
        <section ref={testimonialsGrid1Ref} className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-slate-900">Customer Reviews</h2>
              <span className="text-xs sm:text-sm text-slate-500">Verified client feedback</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.slice(0, 3).map((testimonial) => (
                <div key={testimonial._id} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-base ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-4">"{testimonial.message}"</p>
                  <p className="font-semibold text-dark text-sm">{testimonial.name}</p>
                  <p className="text-xs text-slate-600">{testimonial.company || 'Customer'}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={productsHeadingRef} className="text-center mb-12">
            <h2 ref={textFill1Ref} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Featured Products
            </h2>
            <p ref={textFill2Ref} className="text-sm sm:text-base font-medium text-slate-700 max-w-2xl mx-auto">
              Arshi GPS ke trusted tracking models for commercial and personal vehicle needs
            </p>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div ref={productsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center">
            <Button as={Link} to="/products" variant="primary" size="lg">
              View All Products <FaArrowRight className="inline ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Premium SaaS Sections */}
      <SaaSSections testimonials={testimonials} />
    </div>
  );
};

export default HomePage;
