import React, { useState, useEffect } from 'react';
import { inquiryAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { FaTrash, FaReply, FaEye, FaTimes, FaEnvelope, FaPhone, FaFilter, FaInbox } from 'react-icons/fa';

const statusConfig = {
  new: { label: 'New', class: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  viewed: { label: 'Viewed', class: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
  responded: { label: 'Responded', class: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  closed: { label: 'Closed', class: 'bg-slate-600/50 text-slate-400 border-slate-500/20' },
};

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/60 w-full max-w-lg animate-slideIn">
        {children}
      </div>
    </div>
  );
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [replyModal, setReplyModal] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadInquiries = async (p = 1, status = 'all') => {
    try {
      setLoading(true);
      const params = { page: p, limit: 15 };
      if (status !== 'all') params.status = status;
      const res = await inquiryAPI.getAll(params);
      setInquiries(res.data.data || []);
      setTotalPages(res.data.pagination?.pages || 1);
    } catch {
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadInquiries(); }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await inquiryAPI.updateStatus(id, { status });
      toast.success('Status updated');
      loadInquiries(page, filter);
      setSelected(null);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await inquiryAPI.delete(id);
      toast.success('Deleted');
      loadInquiries(page, filter);
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setSending(true);
    try {
      await inquiryAPI.reply(replyModal._id, { replyMessage: replyText });
      toast.success('Reply sent!');
      setReplyModal(null);
      setReplyText('');
      loadInquiries(page, filter);
    } catch {
      toast.error('Failed to send reply');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Inquiries</h1>
          <p className="text-slate-400 text-sm mt-0.5">Manage and respond to customer inquiries</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <FaFilter size={12} className="text-slate-500" />
          <select
            value={filter}
            onChange={e => { setFilter(e.target.value); setPage(1); loadInquiries(1, e.target.value); }}
            className="bg-slate-800 border border-white/[0.06] text-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-sky-500/50 transition-all cursor-pointer"
          >
            <option value="all">All Inquiries</option>
            <option value="new">New</option>
            <option value="viewed">Viewed</option>
            <option value="responded">Responded</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Status Filter Pills */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'new', 'viewed', 'responded', 'closed'].map(s => (
          <button
            key={s}
            onClick={() => { setFilter(s); setPage(1); loadInquiries(1, s); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 capitalize ${
              filter === s
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                : 'bg-slate-800 text-slate-500 border border-white/[0.06] hover:border-white/10 hover:text-slate-300'
            }`}
          >
            {s === 'all' ? 'All' : s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-slate-800/60 border border-white/[0.06] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-xs text-slate-500">Loading inquiries...</p>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaInbox size={24} className="text-slate-500" />
            </div>
            <p className="text-slate-400 font-medium">No inquiries found</p>
            <p className="text-slate-500 text-sm mt-1">Customer inquiries will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Message</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Type</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {inquiries.map(inq => (
                  <tr key={inq._id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/10 border border-emerald-500/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-emerald-400 text-sm font-bold">
                            {(inq.name || 'U').charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-200 truncate">{inq.name}</p>
                          <p className="text-xs text-slate-500 truncate">{inq.email}</p>
                          {inq.phone && <p className="text-xs text-slate-600">{inq.phone}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <p className="text-sm text-slate-400 line-clamp-2 max-w-xs">{inq.message}</p>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="text-xs text-slate-500 bg-slate-700/50 px-2.5 py-1 rounded-lg capitalize">
                        {inq.inquiryType || 'General'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={inq.status}
                        onChange={e => handleStatusUpdate(inq._id, e.target.value)}
                        className={`text-xs px-2.5 py-1 rounded-full border cursor-pointer bg-transparent focus:outline-none font-medium ${
                          statusConfig[inq.status]?.class || 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="viewed">Viewed</option>
                        <option value="responded">Responded</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <p className="text-xs text-slate-500">
                        {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelected(inq)}
                          className="p-2 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 transition-all"
                          title="View"
                        >
                          <FaEye size={13} />
                        </button>
                        <button
                          onClick={() => { setReplyModal(inq); setReplyText(''); }}
                          className="p-2 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                          title="Reply"
                        >
                          <FaReply size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(inq._id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                          title="Delete"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => { setPage(p); loadInquiries(p, filter); }}
              className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200 ${
                p === page
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-white/[0.06]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* View Modal */}
      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                  <FaEnvelope size={14} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Inquiry Details</h3>
                  <p className="text-xs text-slate-500">{new Date(selected.createdAt).toLocaleString('en-IN')}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                <FaTimes size={14} />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { icon: FaEnvelope, label: 'Name', value: selected.name },
                { icon: FaEnvelope, label: 'Email', value: selected.email },
                { icon: FaPhone, label: 'Phone', value: selected.phone },
                { icon: FaFilter, label: 'Type', value: selected.inquiryType },
              ].filter(f => f.value).map(field => (
                <div key={field.label} className="flex gap-3 bg-slate-800/50 rounded-xl p-3">
                  <span className="text-xs font-semibold text-slate-500 w-12 flex-shrink-0 mt-0.5">{field.label}</span>
                  <span className="text-sm text-slate-200">{field.value}</span>
                </div>
              ))}
              <div className="bg-slate-800/50 rounded-xl p-3">
                <p className="text-xs font-semibold text-slate-500 mb-2">Message</p>
                <p className="text-sm text-slate-200 leading-relaxed">{selected.message}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <button
                onClick={() => { setReplyModal(selected); setSelected(null); setReplyText(''); }}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:from-emerald-400 hover:to-green-500 transition-all shadow-lg shadow-emerald-500/25"
              >
                <FaReply size={12} /> Reply
              </button>
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl text-sm font-medium transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Reply Modal */}
      {replyModal && (
        <Modal onClose={() => setReplyModal(null)}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-white">Reply to {replyModal.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">To: {replyModal.email}</p>
              </div>
              <button onClick={() => setReplyModal(null)} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                <FaTimes size={14} />
              </button>
            </div>

            <div className="bg-slate-800/60 rounded-xl p-3 mb-4 border border-white/[0.06]">
              <p className="text-xs text-slate-500 mb-1">Original message:</p>
              <p className="text-sm text-slate-400 line-clamp-3">{replyModal.message}</p>
            </div>

            <textarea
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              rows={5}
              placeholder="Type your reply..."
              className="w-full bg-slate-800/60 border border-white/[0.06] text-slate-200 placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500/50 transition-all resize-none mb-4"
            />

            <div className="flex gap-2">
              <button
                onClick={handleReply}
                disabled={sending || !replyText.trim()}
                className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-sky-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <><FaReply size={12} /> Send Reply</>
                )}
              </button>
              <button
                onClick={() => setReplyModal(null)}
                className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl text-sm font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
