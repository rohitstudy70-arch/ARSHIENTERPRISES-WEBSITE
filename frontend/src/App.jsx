/**
 * Main App Component
 * React Router configuration and global setup
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import { SITE_CONFIG } from './config/environment';
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Public Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';

import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import SitemapPage from './pages/SitemapPage';

// Admin Pages
import AdminOverview from './pages/admin/AdminOverview';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminLeads from './pages/admin/AdminLeads';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminCategories from './pages/admin/AdminCategories';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminMedia from './pages/admin/AdminMedia';
import AdminSettings from './pages/admin/AdminSettings';
import AdminNotifications from './pages/admin/AdminNotifications';
import AdminLogin from './pages/admin/AdminLogin';

/**
 * Protected Route Component
 */
const ProtectedRoute = ({ element, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }

  return element;
};

/**
 * Admin Protected Route - uses AdminLayout
 */
const AdminRoute = ({ element }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/admin/login" />;
  if (!isAdmin) return <Navigate to="/" />;

  return <AdminLayout>{element}</AdminLayout>;
};

/**
 * App Routes
 */
const SeoManager = () => {
  const location = useLocation();

  React.useEffect(() => {
    const upsertMeta = (selector, createAttrs, valueAttr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        Object.entries(createAttrs).forEach(([k, v]) => el.setAttribute(k, v));
        document.head.appendChild(el);
      }
      el.setAttribute(valueAttr, value);
    };

    const pageMeta = {
      '/': {
        title: 'Arshi GPS – Vehicle & Fleet Tracking Solutions Purnia Bihar',
        description: 'Buy AIS 140 certified GPS trackers, AGT365N, PRO-365N, Magnet GPS & anti-theft systems in Purnia, Bihar. Real-time live tracking, fuel monitoring & RTO approval.',
        keywords: 'GPS tracker Purnia, AIS 140 GPS Bihar, AGT365N tracker, PRO-365N GPS, vehicle tracking system Purnia, car GPS tracker Bihar, tractor GPS tracker, fleet management Bihar',
      },
      '/products': {
        title: 'GPS Tracking Products & Devices | AGT365N, PRO-365N, AIS 140',
        description: 'Explore Arshi GPS trackers including AGT365N, PRO-365N, Portable Magnet GPS, and AIS 140 RTO approved devices in Bihar. Best prices with free pan-India support.',
        keywords: 'GPS tracker price, AGT365N GPS, PRO-365N tracker, Magnet GPS tracker, AIS 140 tracker price Bihar, vehicle tracker Purnia, bike GPS tracker',
      },
      '/services': {
        title: 'GPS Vehicle Tracking Services & Installation | Arshi GPS',
        description: 'Professional GPS installation, anti-theft immobilization, real-time fleet analytics, fuel tracking & 24/7 technical support services across Bihar & India.',
        keywords: 'GPS installation Bihar, fleet tracking service Purnia, anti theft GPS system, fuel monitoring GPS, vehicle tracking services India',
      },
      '/about': {
        title: 'About Arshi Enterprises – Leading GPS Supplier Purnia Bihar',
        description: 'Established in 2013 by Mr Ranjeet Kumar in Purnia, Bihar. Arshi Enterprises is a trusted supplier & trader of certified AIS 140 GPS trackers & fleet solutions.',
        keywords: 'Arshi Enterprises Purnia, Ranjeet Kumar GPS, GPS supplier Bihar, AIS 140 company Bihar, fleet management provider Purnia',
      },
      '/contact': {
        title: 'Contact Arshi GPS – Support, Price Quotes & Installation Purnia',
        description: 'Contact Arshi Enterprises for GPS tracker price quotes, installation, RTO AIS 140 support & bulk inquiries. Call +91 77828 08063 or visit us in Purnia, Bihar.',
        keywords: 'Contact Arshi GPS, GPS support Purnia, GPS tracker quote Bihar, GPS helpline number Bihar, Arshi Enterprises address',
      },
      '/privacy-policy': {
        title: 'Privacy Policy | Arshi GPS',
        description: 'Arshi GPS Privacy Policy - How we collect, use, and protect your personal information when you use our GPS tracking products and services.',
        keywords: 'Arshi GPS privacy policy, data protection, GPS tracking privacy',
      },
      '/terms-of-service': {
        title: 'Terms of Service | Arshi GPS',
        description: 'Terms and conditions for purchasing, using, and installing Arshi GPS tracking products and services.',
        keywords: 'Arshi GPS terms, GPS purchase terms, service conditions',
      },
      '/sitemap': {
        title: 'Sitemap | Arshi GPS',
        description: 'Complete sitemap of Arshi GPS website — all products, services, and company pages in one place.',
        keywords: 'Arshi GPS sitemap, website pages, GPS products list',
      },
    };

    const meta = pageMeta[location.pathname] || {
      title: SITE_CONFIG.TITLE,
      description: SITE_CONFIG.DESCRIPTION,
      keywords: SITE_CONFIG.KEYWORDS,
    };

    document.title = meta.title;

    upsertMeta('meta[name="description"]', { name: 'description' }, 'content', meta.description);
    upsertMeta('meta[name="keywords"]', { name: 'keywords' }, 'content', meta.keywords);
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, 'content', meta.title);
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, 'content', meta.description);
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, 'content', `${SITE_CONFIG.URL}${location.pathname}`);
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, 'content', meta.title);
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, 'content', meta.description);

    const canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) canonicalTag.setAttribute('href', `${SITE_CONFIG.URL}${location.pathname}`);
  }, [location.pathname]);

  return null;
};

function AppRoutes() {
  return (
    <>
      <SeoManager />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        <Route
          path="/products"
          element={
            <MainLayout>
              <ProductsPage />
            </MainLayout>
          }
        />

        <Route
          path="/products/:slug"
          element={
            <MainLayout>
              <ProductDetailsPage />
            </MainLayout>
          }
        />

        <Route
          path="/services"
          element={
            <MainLayout>
              <ServicesPage />
            </MainLayout>
          }
        />

        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutPage />
            </MainLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <MainLayout>
              <ContactPage />
            </MainLayout>
          }
        />

        <Route
          path="/login"
          element={
            <MainLayout>
              <LoginPage />
            </MainLayout>
          }
        />



        <Route
          path="/privacy-policy"
          element={
            <MainLayout>
              <PrivacyPolicyPage />
            </MainLayout>
          }
        />

        <Route
          path="/terms-of-service"
          element={
            <MainLayout>
              <TermsOfServicePage />
            </MainLayout>
          }
        />

        <Route
          path="/sitemap"
          element={
            <MainLayout>
              <SitemapPage />
            </MainLayout>
          }
        />


        {/* Admin Login - dedicated page, no MainLayout */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute element={<AdminOverview />} />} />
        <Route path="/admin/products" element={<AdminRoute element={<AdminProducts />} />} />
        <Route path="/admin/products/new" element={<AdminRoute element={<AdminProductForm />} />} />
        <Route path="/admin/products/edit/:id" element={<AdminRoute element={<AdminProductForm />} />} />
        <Route path="/admin/inquiries" element={<AdminRoute element={<AdminInquiries />} />} />
        <Route path="/admin/leads" element={<AdminRoute element={<AdminLeads />} />} />
        <Route path="/admin/testimonials" element={<AdminRoute element={<AdminTestimonials />} />} />
        <Route path="/admin/categories" element={<AdminRoute element={<AdminCategories />} />} />
        <Route path="/admin/analytics" element={<AdminRoute element={<AdminAnalytics />} />} />
        <Route path="/admin/media" element={<AdminRoute element={<AdminMedia />} />} />
        <Route path="/admin/settings" element={<AdminRoute element={<AdminSettings />} />} />
        <Route path="/admin/notifications" element={<AdminRoute element={<AdminNotifications />} />} />

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <MainLayout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                  <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
                  <a
                    href="/"
                    className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            </MainLayout>
          }
        />
      </Routes>
    </>
  );
}

/**
 * Main App Component
 */
function App() {
  useSmoothScroll();

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
          <Toaster position="top-right" reverseOrder={false} />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
