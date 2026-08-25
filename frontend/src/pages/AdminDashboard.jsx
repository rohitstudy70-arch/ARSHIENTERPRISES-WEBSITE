/**
 * Admin Dashboard Page
 */

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { FaBox, FaEnvelope, FaUsers, FaStar, FaPhone } from 'react-icons/fa';

export const AdminDashboard = () => {
  const { isAuthenticated, isAdmin, user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      return;
    }

    const loadStats = async () => {
      try {
        setLoading(true);
        const res = await adminAPI.getStats();
        setStats(res.data.data);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [isAuthenticated, isAdmin]);

  // Redirect if not admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  const statCards = [
    {
      icon: FaBox,
      label: 'Total Products',
      value: stats?.totalProducts || 0,
      color: 'bg-blue-500',
    },
    {
      icon: FaEnvelope,
      label: 'Total Inquiries',
      value: stats?.totalInquiries || 0,
      color: 'bg-green-500',
    },
    {
      icon: FaUsers,
      label: 'New Inquiries',
      value: stats?.newInquiries || 0,
      color: 'bg-orange-500',
    },
    {
      icon: FaStar,
      label: 'Testimonials',
      value: stats?.totalTestimonials || 0,
      color: 'bg-purple-500',
    },
    {
      icon: FaPhone,
      label: 'Total Leads',
      value: stats?.totalLeads || 0,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-light py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-dark">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">Admin Dashboard - Manage your business</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold">{card.label}</p>
                    <p className="text-3xl font-bold text-dark mt-2">{card.value}</p>
                  </div>
                  <div className={`${card.color} p-4 rounded-full text-white`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Latest Leads */}
        {stats?.recentLeads?.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-dark">Latest Customer Leads</h2>
              <span className="text-sm text-gray-500">Newest first</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Phone</th>
                    <th className="text-left py-2">Source</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentLeads.map((lead) => (
                    <tr key={lead._id} className="border-b last:border-0">
                      <td className="py-2 font-medium">{lead.name || 'Visitor'}</td>
                      <td className="py-2">{lead.phone}</td>
                      <td className="py-2">{lead.sourcePage || '/'}</td>
                      <td className="py-2 capitalize">{lead.status}</td>
                      <td className="py-2">{new Date(lead.createdAt).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recent Items */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Inquiries */}
          {stats?.recentInquiries?.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-dark mb-4">Recent Inquiries</h2>
              <div className="space-y-4">
                {stats.recentInquiries.slice(0, 5).map((inquiry) => (
                  <div key={inquiry._id} className="border-l-4 border-primary pl-4">
                    <p className="font-semibold text-dark">{inquiry.name}</p>
                    <p className="text-sm text-gray-600">{inquiry.email}</p>
                    <p className="text-sm text-gray-500 truncate">{inquiry.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Products */}
          {stats?.recentProducts?.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-dark mb-4">Recent Products</h2>
              <div className="space-y-4">
                {stats.recentProducts.slice(0, 5).map((product) => (
                  <div key={product._id} className="border-l-4 border-secondary pl-4">
                    <p className="font-semibold text-dark">{product.title}</p>
                    <p className="text-sm text-gray-600">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm text-gray-500">
                      Category: {product.category?.name || 'N/A'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Admin Links */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-dark mb-4">Admin Management</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="/products"
              className="p-4 border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-center font-semibold"
            >
              Manage Products
            </a>
            <a
              href="/contact"
              className="p-4 border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-center font-semibold"
            >
              View Inquiries
            </a>
            <a
              href="/"
              className="p-4 border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-center font-semibold"
            >
              Manage Testimonials
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
