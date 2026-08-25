/**
 * About Page
 */

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import {
  useGsapPageHeader,
  useGsapFadeInLeft,
  useGsapFadeInRight,
  useGsapFadeInUp,
  useGsapStagger,
  gsap,
  ScrollTrigger,
} from '../hooks/useGsapAnimations';

export const AboutPage = () => {
  const stats = [
    { number: '2013', label: 'Established' },
    { number: '10+', label: 'Years in Business' },
    { number: 'All India', label: 'Service Coverage' },
    { number: '700/Month', label: 'Supply Capacity' },
  ];

  const keyFacts = [
    { label: 'Nature of Business', value: 'Trader, Supplier' },
    { label: 'Year of Establishment', value: '2013' },
    { label: 'Location', value: 'Purnia, Bihar, India' },
    { label: 'No. of Employees', value: '19' },
    { label: 'GST Number', value: '10ATIPK1589P1ZA' },
    { label: 'Shipment Mode', value: 'Road Transport' },
    { label: 'Payment Mode', value: 'Online Payments (NEFT/RTGS/IMPS)' },
    { label: 'Order Type', value: 'Bulk quantity orders only' },
  ];

  const team = [
    { name: 'Mr Ranjeet Kumar', position: 'Proprietor' },
    { name: 'Sales Team', position: 'Client Assistance' },
    { name: 'Support Team', position: 'Installation & Service' },
    { name: 'Operations Team', position: 'Dispatch & Coordination' },
  ];

  // 1. Page Header
  const headerRef = useGsapPageHeader();

  // 2. Our Story
  const storyTextRef = useGsapFadeInLeft();
  const storyImageRef = useGsapFadeInRight();

  // 3. Mission & Vision
  const missionHeadingRef = useGsapFadeInUp();
  const missionGridRef = useGsapStagger(':scope > div');

  // 4. Statistics
  const statsGridRef = useGsapStagger(':scope > div');

  // 5. Core Values
  const valuesGridRef = useGsapStagger(':scope > div');

  // 6. Key Facts
  const keyFactsHeadingRef = useGsapFadeInUp();
  const keyFactsContainerRef = useRef(null);

  useEffect(() => {
    if (!keyFactsContainerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(':scope > div', {
        x: -60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: keyFactsContainerRef.current,
          start: 'top 85%',
        },
      });
    }, keyFactsContainerRef);
    return () => ctx.revert();
  }, []);

  // 7. Team
  const teamGridRef = useGsapStagger(':scope > div');

  // 8. CTA
  const ctaRef = useGsapFadeInUp();

  return (
    <div className="min-h-screen">
      <SEO 
        title="About Arshi Enterprises – Leading GPS Supplier Purnia Bihar"
        description="Established in 2013 by Mr Ranjeet Kumar in Purnia, Bihar. Arshi Enterprises is a trusted supplier & trader of certified AIS 140 GPS trackers & fleet solutions."
        keywords="Arshi Enterprises Purnia, Ranjeet Kumar GPS, GPS supplier Bihar, AIS 140 company Bihar, fleet management provider Purnia"
        canonicalPath="/about"
      />
      {/* Header */}
      <section ref={headerRef} className="bg-gradient-to-r from-primary to-secondary text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About Arshi Enterprises
          </h1>
          <p className="text-base sm:text-lg text-gray-100">
            Leading provider of GPS tracking and fleet management solutions
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 sm:py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div ref={storyTextRef}>
              <h2 className="text-3xl font-bold text-dark mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Arshi Enterprises is a trusted trader and supplier of advanced GPS Vehicle Tracking Systems and Arshi GPS Trackers. We have built a robust distribution network that helps us serve customers across India efficiently.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From procurement and warehousing to order processing and delivery, our processes are streamlined to reduce lead time and improve customer satisfaction. We work with selected channel partners who share our quality commitment.
              </p>
            </div>
            <div ref={storyImageRef} className="bg-white rounded-lg shadow-lg p-8">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
                alt="Our Office"
                className="rounded-lg mb-4"
              />
              <p className="text-gray-600 italic text-center">Committed to excellence in GPS tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 ref={missionHeadingRef} className="text-2xl sm:text-3xl font-bold text-dark text-center mb-8 sm:mb-12">Mission & Vision</h2>

          <div ref={missionGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-primary text-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="leading-relaxed">
                To provide affordable, reliable, and innovative GPS tracking and fleet management solutions that help businesses reduce costs, improve efficiency, and ensure the safety of their vehicles and drivers.
              </p>
            </div>

            <div className="bg-secondary text-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="leading-relaxed">
                To become the leading GPS tracking and fleet management provider in India by delivering cutting-edge technology, exceptional customer service, and continuous innovation in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 sm:py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark text-center mb-8 sm:mb-12">By The Numbers</h2>

          <div ref={statsGridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-5 sm:p-8 text-center">
                <div className="text-2xl sm:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark text-center mb-8 sm:mb-12">Our Core Values</h2>

          <div ref={valuesGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-5xl font-bold text-primary mb-4">1</div>
              <h3 className="text-xl font-bold text-dark mb-3">Integrity</h3>
              <p className="text-gray-600">
                We believe in transparency and honesty in all our dealings with customers and partners.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-5xl font-bold text-primary mb-4">2</div>
              <h3 className="text-xl font-bold text-dark mb-3">Innovation</h3>
              <p className="text-gray-600">
                Continuous improvement and cutting-edge technology are at the heart of everything we do.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-5xl font-bold text-primary mb-4">3</div>
              <h3 className="text-xl font-bold text-dark mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in our products, services, and customer support at all times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-12 sm:py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 ref={keyFactsHeadingRef} className="text-2xl sm:text-3xl font-bold text-dark text-center mb-8 sm:mb-10">Key Facts</h2>
          <div ref={keyFactsContainerRef} className="bg-white rounded-lg shadow-md overflow-hidden text-sm sm:text-base">
            {keyFacts.map((fact, idx) => (
              <div key={fact.label} className={`grid grid-cols-1 sm:grid-cols-2 ${idx !== keyFacts.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="p-3 sm:p-4 font-semibold text-dark bg-gray-50">{fact.label}</div>
                <div className="p-3 sm:p-4 text-gray-700">{fact.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 sm:py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark text-center mb-8 sm:mb-12">Our Leadership Team</h2>

          <div ref={teamGridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-300 h-40 flex items-center justify-center">
                  <span className="text-gray-500 text-6xl">👤</span>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-dark">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-12 sm:py-16">
        <div ref={ctaRef} className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Elevate Your Fleet Management?</h2>
          <p className="text-base sm:text-lg mb-8 text-gray-100">
            Join thousands of businesses using Arshi GPS for efficient fleet management
          </p>
          <Button as={Link} to="/contact" variant="primary" size="lg" className="w-full sm:w-auto bg-accent hover:bg-opacity-90">
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
