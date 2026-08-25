/**
 * Navigation Component
 * High-contrast Accessible Design
 */

import React, { useState, useEffect } from 'react';
import { useGsapNavbar } from '../hooks/useGsapAnimations';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaPhone, FaSignOutAlt, FaUser, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { BUSINESS } from '../config/environment';

export const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { getCartTotalCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useGsapNavbar();

  // Scroll handler for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'nav-scrolled' : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo */}
            <Link to="/" className="flex items-center gap-2 group z-50">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-extrabold text-primary tracking-tight transition-colors group-hover:text-primary-dark">
                Arshi GPS
              </span>
            </Link>

            {/* Middle: Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative py-2 text-sm font-semibold transition-colors duration-200 ${
                    isActive(item.href) ? 'text-primary' : 'text-slate-700 hover:text-primary'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-fadeIn" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="hidden md:flex items-center gap-6">
              <a
                href={`tel:${BUSINESS.PHONE}`}
                className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-primary transition-colors"
              >
                <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center text-primary group-hover:bg-primary/10">
                  <FaPhone size={13} />
                </div>
                <span>{BUSINESS.PHONE}</span>
              </a>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-750 hover:text-primary transition-all duration-200 focus:outline-none hover:scale-105 active:scale-95"
                aria-label="Open Cart"
              >
                <FaShoppingCart size={20} className="text-slate-700 hover:text-primary" />
                {getCartTotalCount() > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-primary rounded-full transform translate-x-1/2 -translate-y-1/2 animate-pulse">
                    {getCartTotalCount()}
                  </span>
                )}
              </button>

              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="px-3.5 py-1.5 text-xs font-bold text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-all"
                    >
                      Admin
                    </Link>
                  )}
                  <span className="text-sm text-slate-700 font-semibold flex items-center gap-1.5">
                    <FaUser size={12} className="text-slate-500" />
                    {user?.name?.split(' ')[0]}
                  </span>
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                    aria-label="Logout"
                  >
                    <FaSignOutAlt size={16} />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-5 py-2 text-sm font-bold text-white bg-primary rounded-full hover:bg-primary-dark shadow-sm hover:shadow transition-all duration-200"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center md:hidden z-50 gap-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-700 hover:text-primary transition-all duration-200 focus:outline-none hover:scale-105 active:scale-95"
                aria-label="Open Cart"
              >
                <FaShoppingCart size={20} />
                {getCartTotalCount() > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white bg-primary rounded-full transform translate-x-1/3 -translate-y-1/3">
                    {getCartTotalCount()}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-700 hover:text-primary focus:outline-none transition-colors"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu (3-dots Menu) */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white shadow-lg py-2.5 animate-fadeIn">
            <div className="flex flex-col px-6 py-2 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-bold py-1 transition-colors duration-200 ${
                    isActive(item.href) ? 'text-primary' : 'text-slate-700 hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <hr className="border-slate-100" />

              <a
                href={`tel:${BUSINESS.PHONE}`}
                className="flex items-center gap-2.5 text-sm text-slate-700 font-bold py-1 hover:text-primary transition-colors"
              >
                <FaPhone size={12} className="text-primary" />
                <span>{BUSINESS.PHONE}</span>
              </a>

              {isAuthenticated ? (
                <div className="flex items-center justify-between gap-4 py-1">
                  <span className="text-sm text-slate-700 font-bold truncate flex items-center gap-1.5">
                    <FaUser size={12} className="text-slate-500" />
                    {user?.name}
                  </span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-sm text-red-500 font-bold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center py-2.5 text-white bg-primary font-bold rounded-lg hover:bg-primary-dark transition-all duration-200 text-sm"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
