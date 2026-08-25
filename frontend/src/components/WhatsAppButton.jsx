/**
 * WhatsApp Floating Button Component
 */

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { BUSINESS } from '../config/environment';

export const WhatsAppButton = () => {
  const whatsappNumber = BUSINESS.WHATSAPP.replace(/\D/g, '');
  const message = 'Hello! I am interested in your GPS tracking solutions.';
  const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-4 md:right-6 bg-green-500 text-white p-3.5 sm:p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-40 animate-bounce"
      title="Chat on WhatsApp"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7" />
    </a>
  );
};

export default WhatsAppButton;
