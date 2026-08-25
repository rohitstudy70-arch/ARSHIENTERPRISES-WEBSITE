import React, { useState, useEffect } from 'react';
import { testimonialAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { FaCheck, FaTimes, FaTrash, FaStar, FaFilter, FaQuoteLeft, FaPlus } from 'react-icons/fa';

const statusConfig = {
  pending: { label: 'Pending', class: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  approved: { label: 'Approved', class: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  rejected: { label: 'Rejected', class: 'bg-red-500/10 text-red-400 border-red-500/20' },
};

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    designation: '',
    company: '',
    rating: 5,
    message: '',
    status: 'approved'
  });
  const [submitting, setSubmitting] = useState(false);

  const loadTestimonials = async (status = 'all') => {
    try {
      setLoading(true);
      const params = {};
      if (status !== 'all') params.status = status;
      const res = await testimonialAPI.getAll(params);
      setTestimonials(res.data.data || []);
    } catch {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTestimonials(); }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newTestimonial.name.trim() || !newTestimonial.message.trim()) {
      toast.error('Name and Message are required');
      return;
    }
    try {
      setSubmitting(true);
      await testimonialAPI.create(newTestimonial);
      toast.success('Testimonial added successfully!');
      setShowAddModal(false);
      setNewTestimonial({
        name: '',
        designation: '',
        company: '',
        rating: 5,
        message: '',
        status: 'approved'
      });
      loadTestimonials(filter);
    } catch {
      toast.error('Failed to add testimonial');
    } finally {
      setSubmitting(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await testimonialAPI.approve(id);
      toast.success('Testimonial approved');
      loadTestimonials(filter);
    } catch {
      toast.error('Failed to approve');
    }
  };

  const handleReject = async (id) => {
    try {
      await testimonialAPI.reject(id);
      toast.success('Testimonial rejected');
      loadTestimonials(filter);
    } catch {
      toast.error('Failed to reject');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await testimonialAPI.delete(id);
      toast.success('Deleted');
      loadTestimonials(filter);
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <p className="text-slate-400 text-sm mt-0.5">Review and manage customer testimonials</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <FaFilter size={12} className="text-slate-500" />
            <select
              value={filter}
              onChange={e => { setFilter(e.target.value); loadTestimonials(e.target.value); }}
              className="bg-slate-800 border border-white/[0.06] text-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-sky-500/50 transition-all cursor-pointer"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            <FaPlus size={11} /> Add Testimonial
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2">
        {['all', 'pending', 'approved', 'rejected'].map(s => (
          <button
            key={s}
            onClick={() => { setFilter(s); loadTestimonials(s); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 capitalize ${
              filter === s
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                : 'bg-slate-800 text-slate-500 border border-white/[0.06] hover:text-slate-300'
            }`}
          >
            {s === 'all' ? 'All' : s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-48 gap-3">
          <div className="w-8 h-8 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
          <p className="text-xs text-slate-500">Loading testimonials...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-16 bg-slate-800/60 border border-white/[0.06] rounded-2xl">
          <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaStar size={24} className="text-slate-500" />
          </div>
          <p className="text-slate-400 font-medium">No testimonials found</p>
          <p className="text-slate-500 text-sm mt-1">Customer testimonials will appear here</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {testimonials.map(t => (
            <div
              key={t._id}
              className="group relative bg-slate-800/60 border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 hover:bg-slate-800/90 transition-all duration-200 hover:-translate-y-0.5"
            >
              {/* Quote icon */}
              <FaQuoteLeft size={20} className="text-yellow-500/20 mb-3" />

              {/* Status */}
              <span className={`absolute top-4 right-4 text-xs px-2.5 py-1 rounded-full border font-medium capitalize ${
                statusConfig[t.status]?.class || 'bg-slate-700 text-slate-400 border-white/10'
              }`}>
                {t.status}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-400 text-sm font-bold">
                    {(t.name || 'U').charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-200 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">
                    {t.designation}{t.company ? ` · ${t.company}` : ''}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map(star => (
                  <FaStar
                    key={star}
                    size={12}
                    className={star <= (t.rating || 5) ? 'text-yellow-400' : 'text-slate-600'}
                  />
                ))}
                <span className="text-xs text-slate-500 ml-1">{t.rating || 5}/5</span>
              </div>

              {/* Message */}
              <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed mb-4">
                "{t.message}"
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-white/[0.04]">
                {t.status !== 'approved' && (
                  <button
                    onClick={() => handleApprove(t._id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl text-xs font-medium transition-all border border-emerald-500/20"
                  >
                    <FaCheck size={9} /> Approve
                  </button>
                )}
                {t.status !== 'rejected' && (
                  <button
                    onClick={() => handleReject(t._id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl text-xs font-medium transition-all border border-amber-500/20"
                  >
                    <FaTimes size={9} /> Reject
                  </button>
                )}
                <button
                  onClick={() => handleDelete(t._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-medium transition-all border border-red-500/20 ml-auto"
                >
                  <FaTrash size={9} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Testimonial Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-white/[0.06] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-scaleIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <h3 className="font-bold text-white text-sm">Add Customer Testimonial</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all"
              >
                <FaTimes size={14} />
              </button>
            </div>
            
            {/* Modal Body */}
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={newTestimonial.name}
                  onChange={e => setNewTestimonial(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-slate-950/60 border border-white/[0.06] text-slate-200 placeholder-slate-655 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sky-500/50 focus:bg-slate-955 transition-all"
                  placeholder="e.g. Ramesh Kumar"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Designation</label>
                  <input
                    type="text"
                    value={newTestimonial.designation}
                    onChange={e => setNewTestimonial(p => ({ ...p, designation: e.target.value }))}
                    className="w-full bg-slate-950/60 border border-white/[0.06] text-slate-200 placeholder-slate-655 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sky-500/50 focus:bg-slate-955 transition-all"
                    placeholder="e.g. Fleet Manager"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Company</label>
                  <input
                    type="text"
                    value={newTestimonial.company}
                    onChange={e => setNewTestimonial(p => ({ ...p, company: e.target.value }))}
                    className="w-full bg-slate-950/60 border border-white/[0.06] text-slate-200 placeholder-slate-655 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sky-500/50 focus:bg-slate-955 transition-all"
                    placeholder="e.g. RK Travels"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Rating (Stars)</label>
                  <select
                    value={newTestimonial.rating}
                    onChange={e => setNewTestimonial(p => ({ ...p, rating: parseInt(e.target.value) }))}
                    className="w-full bg-slate-950/60 border border-white/[0.06] text-slate-200 placeholder-slate-655 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500/50 focus:bg-slate-955 transition-all cursor-pointer"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Initial Status</label>
                  <select
                    value={newTestimonial.status}
                    onChange={e => setNewTestimonial(p => ({ ...p, status: e.target.value }))}
                    className="w-full bg-slate-950/60 border border-white/[0.06] text-slate-200 placeholder-slate-655 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500/50 focus:bg-slate-955 transition-all cursor-pointer"
                  >
                    <option value="approved">Approved (Visible)</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Review Message *</label>
                <textarea
                  required
                  rows={4}
                  value={newTestimonial.message}
                  onChange={e => setNewTestimonial(p => ({ ...p, message: e.target.value }))}
                  className="w-full bg-slate-950/60 border border-white/[0.06] text-slate-200 placeholder-slate-655 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sky-500/50 focus:bg-slate-955 transition-all resize-none"
                  placeholder="Type customer review here..."
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl text-xs font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-blue-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Adding...' : 'Add Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
