/**
 * Admin Layout - Ultra Premium Dark Theme
 * Sidebar-based layout for admin panel
 */
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import {
  FaHome, FaBox, FaEnvelope, FaPhone, FaStar,
  FaFolder, FaChartBar, FaImage, FaCog, FaBell,
  FaBars, FaTimes, FaSignOutAlt, FaUser, FaExternalLinkAlt,
  FaChevronRight, FaShieldAlt
} from 'react-icons/fa';

const navItems = [
  { path: '/admin', icon: FaHome, label: 'Overview', exact: true, color: 'from-sky-500 to-blue-600' },
  { path: '/admin/products', icon: FaBox, label: 'Products', color: 'from-violet-500 to-purple-600' },
  { path: '/admin/inquiries', icon: FaEnvelope, label: 'Inquiries', color: 'from-emerald-500 to-green-600' },
  { path: '/admin/leads', icon: FaPhone, label: 'Leads', color: 'from-orange-500 to-amber-600' },
  { path: '/admin/testimonials', icon: FaStar, label: 'Testimonials', color: 'from-yellow-500 to-orange-500' },
  { path: '/admin/categories', icon: FaFolder, label: 'Categories', color: 'from-pink-500 to-rose-600' },
  { path: '/admin/analytics', icon: FaChartBar, label: 'Analytics', color: 'from-cyan-500 to-teal-600' },
  { path: '/admin/media', icon: FaImage, label: 'Media', color: 'from-indigo-500 to-blue-600' },
  { path: '/admin/settings', icon: FaCog, label: 'Settings', color: 'from-slate-500 to-gray-600' },
  { path: '/admin/notifications', icon: FaBell, label: 'Notifications', color: 'from-red-500 to-rose-600' },
];

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await adminAPI.getNotifications();
        setUnreadCount(res.data.unreadCount || 0);
      } catch (e) {}
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    navigate('/');
    logout();
  };

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path) && item.path !== '/admin';
  };

  const currentPage = navItems.find(n => isActive(n) || (n.exact && location.pathname === '/admin'));

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'} p-4 border-b border-white/10`}>
        {sidebarOpen && (
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
              <FaShieldAlt size={16} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white leading-tight truncate">Arshi GPS</p>
              <p className="text-xs text-slate-400 leading-tight">Admin Panel</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-slate-400 hover:text-white flex-shrink-0"
        >
          {sidebarOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden admin-nav-scroll">
        <div className="px-2 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item) || (item.exact && location.pathname === '/admin');
            const isNotif = item.path === '/admin/notifications';
            return (
              <Link
                key={item.path}
                to={item.path}
                title={!sidebarOpen ? item.label : ''}
                className={`
                  group flex items-center gap-3 rounded-xl transition-all duration-200
                  ${sidebarOpen ? 'px-3 py-2.5' : 'px-0 py-2.5 justify-center'}
                  ${active
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }
                `}
              >
                {/* Icon */}
                <div className={`
                  relative flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
                  ${active
                    ? `bg-gradient-to-br ${item.color} shadow-lg`
                    : 'bg-white/5 group-hover:bg-white/10'
                  }
                `}>
                  <Icon size={14} className={active ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'} />
                  {isNotif && unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold border border-slate-900 animate-pulse">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </div>

                {sidebarOpen && (
                  <>
                    <span className="text-sm font-medium flex-1 truncate">{item.label}</span>
                    {active && <FaChevronRight size={10} className="text-slate-400 flex-shrink-0" />}
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={`
            flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all duration-200
            ${!sidebarOpen && 'justify-center px-0'}
          `}
          title={!sidebarOpen ? 'Visit Website' : ''}
        >
          <FaExternalLinkAlt size={13} className="flex-shrink-0" />
          {sidebarOpen && <span className="text-xs font-medium">Visit Website</span>}
        </a>
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200
            ${!sidebarOpen && 'justify-center px-0'}
          `}
          title={!sidebarOpen ? 'Logout' : ''}
        >
          <FaSignOutAlt size={13} className="flex-shrink-0" />
          {sidebarOpen && <span className="text-xs font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-60' : 'w-[68px]'}
          bg-slate-900 border-r border-white/[0.06]
        `}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`
          lg:hidden fixed left-0 top-0 h-full z-50 w-64
          bg-slate-900 border-r border-white/[0.06]
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Bar */}
        <header className="flex-shrink-0 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-white/[0.06] px-4 lg:px-6 flex items-center justify-between gap-4">
          {/* Left: Mobile menu + Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <FaBars size={16} />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 hidden sm:block">Admin</span>
                <span className="text-xs text-slate-600 hidden sm:block">/</span>
                <span className="text-sm font-semibold text-white truncate">
                  {currentPage?.label || 'Dashboard'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Notification Bell */}
            <Link
              to="/admin/notifications"
              className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-200"
            >
              <FaBell size={15} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </Link>

            {/* View Site */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-medium transition-all duration-200"
            >
              <FaExternalLinkAlt size={11} />
              View Site
            </a>

            {/* User Avatar */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-md">
                  <FaUser size={10} className="text-white" />
                </div>
                <span className="hidden md:block text-xs font-medium text-slate-300 max-w-[100px] truncate">
                  {user?.name || 'Admin'}
                </span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-white/10 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden animate-fadeIn">
                  <div className="px-3 py-2.5 border-b border-white/10">
                    <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>
                  <div className="p-1">
                    <Link
                      to="/admin/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-all"
                    >
                      <FaCog size={12} /> Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <FaSignOutAlt size={12} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 admin-main-scroll">
          <div className="animate-slideIn">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
