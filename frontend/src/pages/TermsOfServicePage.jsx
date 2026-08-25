/**
 * Terms of Service Page - Arshi GPS
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { FaFileContract, FaChevronRight } from 'react-icons/fa';

const Section = ({ number, title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
      <span className="flex-shrink-0 w-7 h-7 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
        {number}
      </span>
      {title}
    </h2>
    <div className="text-slate-600 leading-relaxed space-y-2 pl-9">
      {children}
    </div>
  </div>
);

export const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Terms of Service | Arshi GPS"
        description="Terms and conditions for using Arshi GPS products, services, installation support, and website. Read before purchasing or using our GPS tracking solutions."
        canonicalPath="/terms-of-service"
      />

      {/* Hero Banner */}
      <div className="bg-slate-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <FaFileContract className="text-cyan-400" size={28} />
            <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-slate-300 text-sm mt-2">
            Last Updated: <strong className="text-white">May 28, 2025</strong>
          </p>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mt-4">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <FaChevronRight size={10} />
            <span className="text-white">Terms of Service</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">

          <p className="text-slate-600 mb-8 leading-relaxed border-l-4 border-primary pl-4 bg-orange-50 py-3 pr-4 rounded-r-lg">
            Please read these Terms of Service carefully before using the <strong>Arshi GPS</strong> website or purchasing our products and services. By accessing our website or placing an order, you agree to be bound by these terms.
          </p>

          <Section number="1" title="Acceptance of Terms">
            <p>
              By accessing or using any service, product, or website provided by <strong>Arshi Enterprises (Arshi GPS)</strong>, you agree to comply with and be legally bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
            </p>
          </Section>

          <Section number="2" title="Products & Services">
            <p>Arshi GPS provides the following products and services:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>GPS tracking devices for vehicles (cars, bikes, trucks, tractors, commercial fleets)</li>
              <li>Hardware supply: AGT365N, PRO-365N, PRO-Lite, AIS 140, KSK Tractor GPS, Magnet Tracker</li>
              <li>GPS device installation and technical support</li>
              <li>Fleet management and vehicle monitoring solutions</li>
              <li>Mobile app access for live tracking and alerts</li>
            </ul>
            <p className="mt-2">
              Product availability, pricing, and features are subject to change without prior notice. We reserve the right to modify, discontinue, or update any product at any time.
            </p>
          </Section>

          <Section number="3" title="Orders & Payment">
            <ul className="list-disc pl-5 space-y-2">
              <li>All orders placed are subject to availability and confirmation by our sales team</li>
              <li>Prices are quoted in Indian Rupees (₹) and are inclusive/exclusive of GST as mentioned at time of order</li>
              <li>Payment must be made before or at the time of delivery/installation unless otherwise agreed</li>
              <li>We accept UPI, bank transfer, cash, and other agreed payment modes</li>
              <li>Order cancellations must be communicated before dispatch. Cancellations post-dispatch may not be accepted</li>
            </ul>
          </Section>

          <Section number="4" title="Installation & Delivery">
            <ul className="list-disc pl-5 space-y-2">
              <li>GPS device installation is provided in select cities across India. Availability may vary by location</li>
              <li>Installation time frames are estimates and may vary depending on technician availability and location</li>
              <li>The customer is responsible for providing access to the vehicle at the agreed time and place</li>
              <li>Arshi GPS is not responsible for installation delays caused by the customer's unavailability or incorrect address</li>
              <li>Physical delivery of devices (self-installation) is done via trusted courier partners. Delivery timelines may vary</li>
            </ul>
          </Section>

          <Section number="5" title="Warranty & Support">
            <ul className="list-disc pl-5 space-y-2">
              <li>GPS devices come with a <strong>1-year replacement warranty</strong> against manufacturing defects</li>
              <li>Warranty does not cover physical damage, water damage (beyond device rating), tampering, or misuse</li>
              <li>Technical support is available via call/WhatsApp at <strong>+91 77828 08063</strong></li>
              <li>Device replacement or repair is subject to inspection and verification by our technical team</li>
            </ul>
          </Section>

          <Section number="6" title="Subscription & SIM/Platform Services">
            <ul className="list-disc pl-5 space-y-2">
              <li>Some GPS devices require an active SIM card and/or platform subscription for live tracking functionality</li>
              <li>Subscription fees (if applicable) are separate from device costs and are billed periodically</li>
              <li>Failure to renew subscriptions will result in suspension of tracking services</li>
              <li>Arshi GPS is not responsible for GPS platform downtime caused by third-party server or network issues</li>
            </ul>
          </Section>

          <Section number="7" title="User Responsibilities">
            <p>As a customer, you agree to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Provide accurate and truthful information when placing orders or filling inquiry forms</li>
              <li>Use GPS tracking devices only for lawful purposes</li>
              <li>Not use GPS tracking devices to track any individual without their knowledge or consent (where legally required)</li>
              <li>Not tamper with, reverse-engineer, or modify the GPS hardware or software</li>
              <li>Keep your app credentials and account login secure</li>
            </ul>
          </Section>

          <Section number="8" title="Limitation of Liability">
            <p>
              Arshi Enterprises shall not be liable for any indirect, incidental, or consequential damages arising from:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>GPS signal loss or inaccuracies in location data</li>
              <li>Vehicle theft or damage that occurred while using our devices</li>
              <li>Interruptions in third-party tracking platform services</li>
              <li>Misuse of GPS data by the device owner or operator</li>
              <li>Delays in installation or delivery beyond our direct control</li>
            </ul>
            <p className="mt-2">
              Our total liability in any case shall not exceed the amount paid for the specific product or service in question.
            </p>
          </Section>

          <Section number="9" title="Intellectual Property">
            <p>
              All content on this website — including text, images, logos, product descriptions, and design elements — is the property of Arshi Enterprises and is protected under applicable intellectual property laws. You may not reproduce, distribute, or commercially use any content without our written permission.
            </p>
          </Section>

          <Section number="10" title="Privacy">
            <p>
              Your use of our website and services is also governed by our{' '}
              <Link to="/privacy-policy" className="text-primary hover:underline font-medium">Privacy Policy</Link>,
              which is incorporated into these Terms of Service by reference.
            </p>
          </Section>

          <Section number="11" title="Governing Law & Disputes">
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in <strong>Purnia, Bihar, India</strong>.
            </p>
          </Section>

          <Section number="12" title="Changes to Terms">
            <p>
              Arshi Enterprises reserves the right to modify these Terms of Service at any time. Updated terms will be posted on this page with a revised "Last Updated" date. Continued use of our website or services after changes constitutes your acceptance of the new terms.
            </p>
          </Section>

          <Section number="13" title="Contact Us">
            <p>For questions, complaints, or legal notices related to these Terms, please contact:</p>
            <div className="mt-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="font-semibold text-slate-800">Arshi Enterprises (Arshi GPS)</p>
              <p className="mt-1">GST: <strong>10ATIPK1589P1ZA</strong></p>
              <p className="mt-1">📍 Hanuman Mandir, NH31, Maranga, near Vidya Vihar Institute of Technology, Purnia – 854303, Bihar, India</p>
              <p className="mt-1">📞 <a href="tel:+917782808063" className="text-primary hover:underline">+91 77828 08063</a></p>
              <p className="mt-1">✉️ <a href="mailto:arshiranjeet133@gmail.com" className="text-primary hover:underline">arshiranjeet133@gmail.com</a></p>
            </div>
          </Section>

        </div>

        {/* Footer Nav */}
        <div className="flex flex-wrap gap-4 justify-center mt-8 text-sm text-slate-500">
          <Link to="/" className="hover:text-primary transition-colors">← Back to Home</Link>
          <span>|</span>
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <span>|</span>
          <Link to="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
