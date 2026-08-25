/**
 * Services Page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaShieldAlt, FaChartLine, FaVideo, FaExclamationTriangle, FaGasPump } from 'react-icons/fa';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import {
  useGsapPageHeader,
  useGsapStagger,
  useGsapFadeInUp,
  useGsapFadeInLeft,
  useGsapFadeInRight,
} from '../hooks/useGsapAnimations';

export const ServicesPage = () => {
  const headerRef = useGsapPageHeader();
  const servicesGridRef = useGsapStagger(':scope > div');
  const whyHeadingRef = useGsapFadeInUp();
  const leftColRef = useGsapFadeInLeft();
  const rightColRef = useGsapFadeInRight();
  const ctaRef = useGsapFadeInUp();

  const services = [
    {
      icon: FaMapMarkerAlt,
      title: 'Real-Time Vehicle Tracking',
      description: 'Track your entire fleet in real-time with live GPS positioning, distance traveled, and route optimization.',
      features: ['Live tracking', 'Route optimization', 'Geofencing', 'Speed monitoring'],
    },
    {
      icon: FaShieldAlt,
      title: 'Anti-Theft System',
      description: 'Advanced anti-theft protection with instant alerts and vehicle immobilization capabilities.',
      features: ['Instant alerts', 'Vehicle immobilization', 'SOS button', '24/7 monitoring'],
    },
    {
      icon: FaChartLine,
      title: 'Fleet Analytics & Reporting',
      description: 'Comprehensive analytics dashboard with customizable reports for better decision making.',
      features: ['Daily reports', 'Performance metrics', 'Cost analysis', 'Fuel efficiency'],
    },
    {
      icon: FaVideo,
      title: 'Driver Monitoring',
      description: 'Monitor driver behavior with detailed analytics on speed, harsh braking, and idling time.',
      features: ['Behavior monitoring', 'Harsh acceleration alerts', 'Idling detection', 'Driver scorecard'],
    },
    {
      icon: FaGasPump,
      title: 'Fuel Monitoring',
      description: 'Real-time fuel consumption tracking and fuel theft detection with instant notifications.',
      features: ['Fuel tracking', 'Theft alerts', 'Consumption analytics', 'Cost optimization'],
    },
    {
      icon: FaExclamationTriangle,
      title: 'Emergency & SOS',
      description: 'Quick emergency response system with one-tap SOS activation and location sharing.',
      features: ['SOS alerts', 'Emergency contacts', 'Live location', 'Panic button'],
    },
  ];

  return (
    <div className="min-h-screen bg-light">
      <SEO 
        title="GPS Vehicle Tracking Services & Installation | Arshi GPS"
        description="Professional GPS installation, anti-theft immobilization, real-time fleet analytics, fuel tracking & 24/7 technical support services across Bihar & India."
        keywords="GPS installation Bihar, fleet tracking service Purnia, anti theft GPS system, fuel monitoring GPS, vehicle tracking services India"
        canonicalPath="/services"
      />
      {/* Header */}
      <section ref={headerRef} className="bg-gradient-to-r from-primary to-secondary text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Professional Fleet Management Services
          </h1>
          <p className="text-base sm:text-lg text-gray-100">
            Comprehensive solutions for modern fleet management and vehicle tracking
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={servicesGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, idx) => {
              const IconComponent = service.icon;
              return (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow">
                  <IconComponent className="text-4xl text-primary mb-4" />
                  <h3 className="text-xl font-bold text-dark mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-primary">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 ref={whyHeadingRef} className="text-3xl font-bold text-dark text-center mb-12">
            Why Choose Arshi GPS?
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div ref={leftColRef}>
              <h3 className="text-2xl font-bold text-dark mb-6">Proven Track Record</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-dark">10+ Years Experience</p>
                    <p className="text-gray-600">Trusted by thousands of businesses</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-dark">24/7 Support</p>
                    <p className="text-gray-600">Round-the-clock customer assistance</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-dark">99% Uptime</p>
                    <p className="text-gray-600">Reliable and stable platform</p>
                  </div>
                </li>
              </ul>
            </div>

            <div ref={rightColRef}>
              <h3 className="text-2xl font-bold text-dark mb-6">Advanced Technology</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-dark">Cloud-Based Platform</p>
                    <p className="text-gray-600">Access from anywhere, anytime</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-dark">Real-Time Updates</p>
                    <p className="text-gray-600">Live tracking and instant alerts</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-dark">Mobile & Web Apps</p>
                    <p className="text-gray-600">Easy access across all devices</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-12 sm:py-16">
        <div ref={ctaRef} className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Get Started with Professional Fleet Management
          </h2>
          <p className="text-base sm:text-lg mb-8 text-gray-100">
            Contact us today for a free consultation and personalized solution for your business
          </p>
          <Link to="/contact" className="inline-block w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto bg-accent hover:bg-opacity-90">
              Request a Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
