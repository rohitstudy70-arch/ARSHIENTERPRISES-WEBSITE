/**
 * Arshi Enterprises (arshigps.com) - Main Application Script
 * Vanilla JavaScript - Zero Framework Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================
  // CONFIGURATION CONSTANTS & PLACEHOLDERS
  // ==========================================
  const CONFIG = {
    PHONE: '+91 77828 08063',
    PHONE_RAW: '917782808063',
    WHATSAPP_NUMBER: '917782808063',
    EMAIL: 'arshiranjeet133@gmail.com',
    ADDRESS: 'Hanuman Mandir, NH31, Maranga, near Vidya Vihar Institute Of Technology, Purnia - 854303, Bihar, India'
  };

  // Expose configuration globally
  window.ARSHI_CONFIG = CONFIG;

  // ==========================================
  // 1. LAZY INITIALIZE 3D NEON CITY SCENE
  // ==========================================
  const cityContainer = document.getElementById('neon-city-container');
  if (cityContainer && typeof window.initNeonCity === 'function') {
    // Check if Three.js is loaded
    if (typeof THREE !== 'undefined') {
      window.initNeonCity('neon-city-container');
    } else {
      window.addEventListener('load', () => {
        if (typeof window.initNeonCity === 'function') {
          window.initNeonCity('neon-city-container');
        }
      });
    }
  }

  // ==========================================
  // 2. NAVBAR SCROLL EFFECT & MOBILE MENU
  // ==========================================
  const siteNav = document.getElementById('site-nav');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteNav.classList.add('scrolled');
    } else {
      siteNav.classList.remove('scrolled');
    }
  }, { passive: true });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
      mobileToggle.innerHTML = isExpanded ? '&#10005;' : '&#9776;';
    });

    // Close mobile menu on clicking any nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.innerHTML = '&#9776;';
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================
  // 3. PRODUCT CATALOG CATEGORY FILTERING
  // ==========================================
  const filterPills = document.querySelectorAll('.filter-pill');
  const productCards = document.querySelectorAll('.product-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Remove active class from all pills
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterValue = pill.getAttribute('data-filter');

      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // ==========================================
  // 4. WHATSAPP INQUIRY GENERATOR
  // ==========================================
  window.sendWhatsAppInquiry = function (productName, price) {
    const text = encodeURIComponent(
      `Namaste Arshi Enterprises! 🙏\n\nI am interested in buying:\n📦 *${productName}*\n💰 *Price:* ₹${price}\n\nPlease share availability, bulk fleet discount, and installation support in Bihar.`
    );
    window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  window.sendHeroDemoInquiry = function () {
    const text = encodeURIComponent(
      `Namaste Arshi Enterprises! 🙏\n\nI want to get a *Free Live GPS Demo* for my vehicle fleet (Trucks / Buses / Cabs / Bikes). Please share demo app login and quotation.`
    );
    window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  // ==========================================
  // 5. FAQ ACCORDION
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other accordion items for clean accordion behavior
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
    });
  });

  // ==========================================
  // 6. CONTACT & ENQUIRY FORM SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const vehicleType = document.getElementById('form-vehicle-type').value;
      const vehicleCount = document.getElementById('form-vehicle-count').value.trim() || '1';
      const message = document.getElementById('form-message').value.trim();

      if (!name || !phone) {
        alert('Please fill in your name and phone number.');
        return;
      }

      // Build WhatsApp message
      const inquiryText = encodeURIComponent(
        `🚨 *NEW FLEET INQUIRY - arshigps.com*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📱 *Phone:* ${phone}\n` +
        `🚛 *Vehicle Type:* ${vehicleType}\n` +
        `🔢 *Number of Vehicles:* ${vehicleCount}\n` +
        `💬 *Message:* ${message || 'Need product details and quotation'}\n\n` +
        `Sent via Arshi GPS Smart City Portal.`
      );

      // Open WhatsApp directly
      window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${inquiryText}`, '_blank');

      if (formStatus) {
        formStatus.style.display = 'block';
        formStatus.innerHTML = `✅ <strong>Inquiry dispatched!</strong> Redirecting to WhatsApp. Our team will also call on <strong>${phone}</strong>.`;
      }

      contactForm.reset();
    });
  }

  // ==========================================
  // 7. DYNAMIC YEAR IN FOOTER
  // ==========================================
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});
