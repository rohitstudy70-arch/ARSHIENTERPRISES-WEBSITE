/**
 * Main Layout Component
 */

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ChatbotWidget from '../components/ChatbotWidget';
import CartDrawer from '../components/CartDrawer';
import { leadAPI } from '../services/api';
import toast from 'react-hot-toast';

export const MainLayout = ({ children }) => {
  const [showLeadPopup, setShowLeadPopup] = React.useState(false);
  const [submittingLead, setSubmittingLead] = React.useState(false);
  const [leadData, setLeadData] = React.useState({
    name: '',
    phone: '',
  });

  React.useEffect(() => {
    const alreadyCaptured = sessionStorage.getItem('leadCaptured');
    const popupDismissed = sessionStorage.getItem('leadPopupDismissed');

    if (!alreadyCaptured && !popupDismissed) {
      const handleScroll = () => {
        if (window.scrollY > 300) {
          setShowLeadPopup(true);
          window.removeEventListener('scroll', handleScroll);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleLeadSubmit = async (e) => {
    e.preventDefault();

    if (!/^\+?[0-9\s-]{10,20}$/.test(leadData.phone.trim())) {
      toast.error('Valid phone number daaliye');
      return;
    }

    try {
      setSubmittingLead(true);
      await leadAPI.capture({
        name: leadData.name.trim(),
        phone: leadData.phone.trim(),
        sourcePage: window.location.pathname,
        notes: 'Instant popup lead',
      });

      sessionStorage.setItem('leadCaptured', 'true');
      setShowLeadPopup(false);
      toast.success('Thank you! Hamari team aapko jaldi call karegi.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lead submit nahi ho paaya');
    } finally {
      setSubmittingLead(false);
    }
  };

  const handleDismiss = () => {
    sessionStorage.setItem('leadPopupDismissed', 'true');
    setShowLeadPopup(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatbotWidget />
      <CartDrawer />

      {showLeadPopup && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center px-4 transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md p-5 sm:p-6 border border-slate-100 animate-slideIn">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Free Callback</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-5 leading-relaxed">
              Best GPS plan ke liye number share kaiye, humaari team turant contact karegi!
            </p>

            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name (optional)"
                value={leadData.name}
                onChange={(e) => setLeadData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <input
                type="tel"
                required
                placeholder="+91 9876543210"
                value={leadData.phone}
                onChange={(e) => setLeadData((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="flex-1 border border-gray-300 rounded-xl py-2.5 font-semibold text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  disabled={submittingLead}
                  className="flex-1 bg-primary text-white rounded-xl py-2.5 font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-60"
                >
                  {submittingLead ? 'Submitting...' : 'Get Callback'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
