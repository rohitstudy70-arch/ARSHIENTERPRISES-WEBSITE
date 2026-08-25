/**
 * Privacy Policy Page - Arshi GPS
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { FaShieldAlt, FaChevronRight } from 'react-icons/fa';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
      <span className="w-1 h-6 bg-primary rounded-full inline-block"></span>
      {title}
    </h2>
    <div className="text-slate-600 leading-relaxed space-y-2 pl-3">
      {children}
    </div>
  </div>
);

export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Privacy Policy | Arshi GPS"
        description="Arshi GPS Privacy Policy - How we collect, use, and protect your personal information when you use our GPS tracking products and services."
        canonicalPath="/privacy-policy"
      />

      {/* Hero Banner */}
      <div className="bg-slate-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <FaShieldAlt className="text-cyan-400" size={28} />
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-slate-300 text-sm mt-2">
            Last Updated: <strong className="text-white">May 28, 2025</strong>
          </p>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mt-4">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <FaChevronRight size={10} />
            <span className="text-white">Privacy Policy</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">

          <p className="text-slate-600 mb-8 leading-relaxed border-l-4 border-cyan-400 pl-4 bg-cyan-50 py-3 pr-4 rounded-r-lg">
            Welcome to <strong>Arshi Enterprises (Arshi GPS)</strong>. We are committed to protecting your personal information and your right to privacy. This Privacy Policy describes how we collect, use, and safeguard your information when you visit our website or use our GPS tracking products and services.
          </p>

          <Section title="1. Information We Collect">
            <p>We collect information that you voluntarily provide to us when you:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Fill out a contact or inquiry form on our website</li>
              <li>Request a product quote or callback</li>
              <li>Use our AI chatbot assistant</li>
              <li>Purchase or inquire about our GPS products</li>
              <li>Subscribe to updates or promotional communication</li>
            </ul>
            <p className="mt-2">The personal information we collect may include:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Name</strong> — to address you personally</li>
              <li><strong>Mobile Number / Phone</strong> — for sales callbacks and support</li>
              <li><strong>Email Address</strong> — for inquiry responses and invoices</li>
              <li><strong>Vehicle Type / Requirement</strong> — to recommend the right GPS product</li>
              <li><strong>Location / Address</strong> — for installation support and delivery</li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>To respond to your inquiries and provide product support</li>
              <li>To contact you with pricing, offers, and GPS tracking solutions relevant to your needs</li>
              <li>To process and manage your GPS device order or installation request</li>
              <li>To improve our website experience and chatbot accuracy</li>
              <li>To send promotional messages (only with your consent)</li>
              <li>To maintain internal sales and lead records for our admin team</li>
            </ul>
          </Section>

          <Section title="3. GPS Device Data & Tracking">
            <p>Our GPS tracking devices collect vehicle location and usage data including:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Real-time GPS location coordinates</li>
              <li>Trip history and route playback data</li>
              <li>Ignition status, speed, and engine data</li>
              <li>Fuel level data (for supported devices)</li>
            </ul>
            <p className="mt-2">
              This data is stored on the GPS service platform and is accessible only to the vehicle owner / fleet manager via their registered app account. Arshi Enterprises does not share this tracking data with third parties.
            </p>
          </Section>

          <Section title="4. Data Sharing & Disclosure">
            <p>We <strong>do not sell, trade, or rent</strong> your personal information to third parties. We may share your information only in the following situations:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Service Partners:</strong> GPS platform providers and installation technicians who assist in delivering our services</li>
              <li><strong>Legal Compliance:</strong> When required by law, court order, or government authority</li>
              <li><strong>Business Transfer:</strong> In case of a merger, acquisition, or sale of assets</li>
            </ul>
          </Section>

          <Section title="5. Data Security">
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our website uses HTTPS encryption and our admin systems are password-protected.
            </p>
            <p className="mt-2">
              However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="6. Cookies & Website Analytics">
            <p>
              Our website may use cookies to enhance your browsing experience. Cookies are small data files stored on your browser. You can control cookie settings through your browser preferences. We may also use basic analytics tools to understand website traffic and improve our content.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction of inaccurate or incomplete information</li>
              <li>Request deletion of your data (subject to legal obligations)</li>
              <li>Opt out of promotional communications at any time</li>
              <li>Withdraw consent for data processing where applicable</li>
            </ul>
            <p className="mt-2">To exercise any of these rights, please contact us at the details below.</p>
          </Section>

          <Section title="8. Third-Party Links">
            <p>
              Our website may contain links to third-party websites (e.g., WhatsApp, social media). We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before sharing any personal information.
            </p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that a minor has provided us with personal data, we will delete it promptly.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this page periodically to stay informed about how we protect your information.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
            <div className="mt-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="font-semibold text-slate-800">Arshi Enterprises (Arshi GPS)</p>
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
          <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
          <span>|</span>
          <Link to="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
