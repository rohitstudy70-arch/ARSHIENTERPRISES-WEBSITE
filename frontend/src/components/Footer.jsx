/**
 * Footer Component
 * High-contrast accessible design
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { BUSINESS } from '../config/environment';
import { useGsapFadeInUp } from '../hooks/useGsapAnimations';

export const Footer = () => {
  const footerRef = useGsapFadeInUp();
  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="bg-primary text-white border-t border-sky-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="footer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold tracking-tight">{BUSINESS.NAME}</h3>
            <p className="text-white text-sm leading-relaxed">
              Trader and supplier of advanced GPS tracking devices for vehicle safety and fleet management across India.
            </p>
            <div className="space-y-1 text-xs font-semibold text-slate-100">
              <p>Proprietor: {BUSINESS.PROPRIETOR}</p>
              <p>GST: {BUSINESS.GST}</p>
            </div>
            <div className="flex gap-4 pt-1">
              <a href="https://www.facebook.com/share/1H3y8f8zaU/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-200 transition-colors" aria-label="Visit our Facebook Page">
                <FaFacebook size={20} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-200 transition-colors" aria-label="Visit our Twitter Page">
                <FaTwitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-200 transition-colors" aria-label="Visit our LinkedIn Profile">
                <FaLinkedin size={20} />
              </a>
              <a href="https://www.instagram.com/arshient.133?igsh=enJkMm0xdHB6aWd4" target="_blank" rel="noopener noreferrer" className="hover:text-sky-200 transition-colors" aria-label="Visit our Instagram Profile">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-extrabold mb-4 uppercase tracking-wider text-sky-200">Quick Links</h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li><Link to="/" className="text-white hover:text-sky-200 hover:underline transition-all">Home</Link></li>
              <li><Link to="/products" className="text-white hover:text-sky-200 hover:underline transition-all">Products</Link></li>
              <li><Link to="/services" className="text-white hover:text-sky-200 hover:underline transition-all">Services</Link></li>
              <li><Link to="/about" className="text-white hover:text-sky-200 hover:underline transition-all">About Us</Link></li>
              <li><Link to="/contact" className="text-white hover:text-sky-200 hover:underline transition-all">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-extrabold mb-4 uppercase tracking-wider text-sky-200">Services</h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li><Link to="/services" className="text-white hover:text-sky-200 hover:underline transition-all">Fleet Management</Link></li>
              <li><Link to="/services" className="text-white hover:text-sky-200 hover:underline transition-all">Vehicle Tracking</Link></li>
              <li><Link to="/services" className="text-white hover:text-sky-200 hover:underline transition-all">School Bus Tracking</Link></li>
              <li><Link to="/services" className="text-white hover:text-sky-200 hover:underline transition-all">Driver Monitoring</Link></li>
              <li><Link to="/services" className="text-white hover:text-sky-200 hover:underline transition-all">Anti-Theft System</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-extrabold mb-4 uppercase tracking-wider text-sky-200">Contact Info</h4>
            <div className="space-y-3.5 text-sm font-semibold text-white">
              <div className="flex items-start gap-2.5">
                <FaPhone className="mt-1 flex-shrink-0 text-sky-200" size={13} />
                <a href={`tel:${BUSINESS.PHONE}`} className="hover:text-sky-200 transition-colors">{BUSINESS.PHONE}</a>
              </div>
              <div className="flex items-start gap-2.5">
                <FaEnvelope className="mt-1 flex-shrink-0 text-sky-200" size={13} />
                <a href={`mailto:${BUSINESS.EMAIL}`} className="hover:text-sky-200 transition-colors break-all">{BUSINESS.EMAIL}</a>
              </div>
              <div className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-sky-200" size={13} />
                <p className="leading-relaxed">{BUSINESS.ADDRESS}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-sky-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left text-sm font-semibold text-slate-100 gap-4 md:gap-0">
          <p>&copy; {currentYear} {BUSINESS.NAME}. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 mt-2 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-sky-200 hover:underline transition-all">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-sky-200 hover:underline transition-all">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-sky-200 hover:underline transition-all">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
