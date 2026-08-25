/**
 * Contact Page
 */

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { LocationMap } from '../components/LocationMap';
import { inquiryAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { BUSINESS } from '../config/environment';
import { useGsapPageHeader, useGsapFadeInLeft, useGsapFadeInRight, gsap, ScrollTrigger } from '../hooks/useGsapAnimations';

export const ContactPage = () => {
  const headerRef = useGsapPageHeader();
  const contactInfoRef = useGsapFadeInLeft();
  const formRef = useGsapFadeInRight();
  const contactItemsRef = useRef(null);

  const location = useLocation();
  const { cartItems, clearCart } = useCart();

  // Custom stagger animation for contact info items
  useEffect(() => {
    if (!contactItemsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.contact-info-item', {
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactItemsRef.current,
          start: 'top 85%',
        },
      });
    }, contactItemsRef);
    return () => ctx.revert();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Prefill cart items message
  useEffect(() => {
    if (location.state?.fromCart && cartItems.length > 0) {
      const itemsList = cartItems
        .map((item) => `- ${item.product.title} (Qty: ${item.quantity})`)
        .join('\n');
      const prefilledMessage = `Hello, I would like to request a bulk quote for the following products:\n\n${itemsList}\n\nPlease contact me back with the best offer.`;

      setFormData((prev) => ({
        ...prev,
        subject: 'Bulk GPS Trackers Quote Request',
        message: prefilledMessage,
      }));
    }
  }, [location.state, cartItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await inquiryAPI.createContact(formData);

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      // Clear cart on successful B2B inquiry submission
      if (location.state?.fromCart) {
        clearCart();
      }

      toast.success('Thank you! We will contact you soon.');

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light">
      <SEO 
        title="Contact Arshi GPS – Support, Price Quotes & Installation Purnia"
        description="Contact Arshi Enterprises for GPS tracker price quotes, installation, RTO AIS 140 support & bulk inquiries. Call +91 77828 08063 or visit us in Purnia, Bihar."
        keywords="Contact Arshi GPS, GPS support Purnia, GPS tracker quote Bihar, GPS helpline number Bihar, Arshi Enterprises address"
        canonicalPath="/contact"
      />
      {/* Header */}
      <section ref={headerRef} className="bg-gradient-to-r from-primary to-secondary text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-base sm:text-lg text-gray-100">Get in touch with our team</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <div ref={contactInfoRef} className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-dark mb-8">Get In Touch</h2>

              <div className="space-y-6" ref={contactItemsRef}>
                {/* Phone */}
                <div className="contact-info-item flex gap-4">
                  <div className="flex-shrink-0">
                    <FaPhone className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-1">Phone</h3>
                    <a
                      href={`tel:${BUSINESS.PHONE}`}
                      className="text-gray-600 hover:text-primary"
                    >
                      {BUSINESS.PHONE}
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9AM - 6PM</p>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-info-item flex gap-4">
                  <div className="flex-shrink-0">
                    <FaEnvelope className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-1">Email</h3>
                    <a
                      href={`mailto:${BUSINESS.EMAIL}`}
                      className="text-gray-600 hover:text-primary"
                    >
                      {BUSINESS.EMAIL}
                    </a>
                    <p className="text-sm text-gray-500 mt-1">We'll reply within 24 hours</p>
                  </div>
                </div>

                {/* Address */}
                <div className="contact-info-item flex gap-4">
                  <div className="flex-shrink-0">
                    <FaMapMarkerAlt className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-1">Address</h3>
                    <p className="text-gray-600">{BUSINESS.ADDRESS}</p>
                    <p className="text-sm text-gray-500 mt-1">GST: {BUSINESS.GST}</p>
                    <p className="text-sm text-gray-500">Proprietor: {BUSINESS.PROPRIETOR}</p>
                  </div>
                </div>
              </div>

              {/* Location CTA */}
              <div className="mt-8 bg-white rounded-lg overflow-hidden border border-gray-200 shadow-lg">
                <LocationMap 
                  latitude={25.741507}
                  longitude={87.463510}
                  title="Arshi GPS - Purnea"
                  description="Hanuman Mandir, NH31, Maranga, Purnea, Bihar"
                />
              </div>

              {/* Our Branches */}
              <div className="mt-8 bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" />
                  Our Branches
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Bihar State */}
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm border-b border-gray-100 pb-2 mb-3">
                      Bihar State
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <strong className="text-dark block text-sm">Purnea (H.O. Main)</strong>
                          <span className="text-xs text-gray-500">Hanuman Mandir, NH31, Maranga</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <strong className="text-dark block text-sm">Patna</strong>
                          <span className="text-xs text-gray-500">Regional Branch Office</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <strong className="text-dark block text-sm">Araria</strong>
                          <span className="text-xs text-gray-500">Local Branch Office</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Rajasthan State */}
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm border-b border-gray-100 pb-2 mb-3">
                      Rajasthan State
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <strong className="text-dark block text-sm">Jaipur</strong>
                          <span className="text-xs text-gray-500">Regional Branch Office</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div ref={formRef} className="bg-white rounded-lg shadow-lg p-5 sm:p-8 order-1 md:order-2">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <FaCheckCircle className="text-5xl text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-dark mb-2">Thank You!</h3>
                  <p className="text-gray-600 text-center">
                    Your message has been received. We'll contact you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-2xl font-bold text-dark mb-6">Send us a Message</h3>

                  {/* Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-dark mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-dark mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-dark mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+91-XXXXXXXXXX"
                    />
                  </div>

                  {/* Subject */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-dark mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="How can we help?"
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-dark mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tell us about your requirement..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
