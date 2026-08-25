import React, { useState, useEffect } from 'react';
import { leadAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { FaFilter, FaDownload, FaStickyNote, FaTimes, FaPhone, FaUsers } from 'react-icons/fa';

const statusConfig = {
  new: { label: 'New', class: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
  contacted: { label: 'Contacted', class: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  converted: { label: 'Converted', class: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  lost: { label: 'Lost', class: 'bg-red-500/10 text-red-400 border-red-500/20' },
};

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/60 w-full max-w-md animate-slideIn">
        {children}
      </div>
    </div>
  );
}

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [noteModal, setNoteModal] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [exporting, setExporting] = useState(false);

  const loadLeads = async (p = 1, status = 'all') => {
    try {
      setLoading(true);
      const params = { page: p, limit: 20 };
      if (status !== 'all') params.status = status;
      const res = await leadAPI.getAll(params);
      setLeads(res.data.data || []);
      setTotalPages(res.data.pagination?.pages || 1);
    } catch {
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadLeads(); }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await leadAPI.updateStatus(id, status);
      toast.success('Status updated');
      loadLeads(page, filter);
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleSaveNote = async () => {
    if (!noteText.trim()) return;
    setSavingNote(true);
    try {
      await leadAPI.addNote(noteModal._id, noteText);
      toast.success('Note saved');
      setNoteModal(null);
      setNoteText('');
      loadLeads(page, filter);
    } catch {
      toast.error('Failed to save note');
    } finally {
      setSavingNote(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await leadAPI.exportCSV(filter !== 'all' ? { status: filter } : {});
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'leads.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('CSV exported!');
    } catch {
      toast.error('Export failed');
    } finally {
      setExporting(false);
    }
  };

  // Pipeline counts
  const pipelineStats = ['new', 'contacted', 'converted', 'lost'].map(s => ({
    status: s,
    count: leads.filter(l => l.status === s).length,
    ...statusConfig[s]
  }));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-slate-400 text-sm mt-0.5">Track and manage your customer pipeline</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-sm font-medium rounded-xl transition-all disabled:opacity-50"
          >
            {exporting
              ? <div className="w-3.5 h-3.5 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
              : <FaDownload size={12} />
            }
            Export CSV
          </button>
          <div className="flex items-center gap-2">
            <FaFilter size={12} className="text-slate-500" />
            <select
              value={filter}
              onChange={e => { setFilter(e.target.value); setPage(1); loadLeads(1, e.target.value); }}
              className="bg-slate-800 border border-white/[0.06] text-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-sky-500/50 transition-all cursor-pointer"
            >
              <option value="all">All Leads</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pipeline Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {pipelineStats.map(({ status, count, label, class: cls }) => (
          <button
            key={status}
            onClick={() => { setFilter(status); setPage(1); loadLeads(1, status); }}
            className={`p-3 rounded-xl border bg-slate-800/60 transition-all duration-200 hover:-translate-y-0.5 text-left ${
              filter === status ? 'border-sky-500/30 bg-sky-500/5' : 'border-white/[0.06] hover:border-white/10'
            }`}
          >
            <p className="text-xl font-bold text-white">{count}</p>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border mt-1 inline-block ${cls}`}>{label}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-slate-800/60 border border-white/[0.06] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <div className="w-8 h-8 border-2 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
            <p className="text-xs text-slate-500">Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaUsers size={24} className="text-slate-500" />
            </div>
            <p className="text-slate-400 font-medium">No leads found</p>
            <p className="text-slate-500 text-sm mt-1">Leads captured from your website appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Source</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Product</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Notes</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {leads.map(lead => (
                  <tr key={lead._id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-500/10 border border-sky-500/10 flex items-center justify-center flex-shrink-0">
                          <FaPhone size={12} className="text-sky-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-200 truncate">{lead.name || 'Visitor'}</p>
                          <p className="text-xs text-slate-500">{lead.phone}</p>
                          {lead.email && <p className="text-xs text-slate-600 truncate">{lead.email}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="text-xs bg-slate-700/60 text-slate-400 px-2.5 py-1 rounded-lg capitalize">
                        {lead.source || 'website'}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <p className="text-xs text-slate-400 max-w-[120px] truncate">
                        {lead.productName || lead.product?.title || '—'}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={lead.status || 'new'}
                        onChange={e => handleStatusUpdate(lead._id, e.target.value)}
                        className={`text-xs px-2.5 py-1 rounded-full border cursor-pointer bg-transparent focus:outline-none font-medium ${
                          statusConfig[lead.status]?.class || 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                      </select>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <p className="text-xs text-slate-500 max-w-[120px] truncate">
                        {lead.notes || <span className="text-slate-600 italic">No notes</span>}
                      </p>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <p className="text-xs text-slate-500">
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => { setNoteModal(lead); setNoteText(lead.notes || ''); }}
                          className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all"
                          title="Add/Edit Note"
                        >
                          <FaStickyNote size={13} />
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
              onClick={() => { setPage(p); loadLeads(p, filter); }}
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

      {/* Note Modal */}
      {noteModal && (
        <Modal onClose={() => setNoteModal(null)}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <FaStickyNote size={14} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Lead Notes</h3>
                  <p className="text-xs text-slate-500">{noteModal.name || noteModal.phone}</p>
                </div>
              </div>
              <button onClick={() => setNoteModal(null)} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                <FaTimes size={14} />
              </button>
            </div>

            <textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              rows={4}
              placeholder="Add notes about this lead (e.g., call outcome, next steps)..."
              className="w-full bg-slate-800/60 border border-white/[0.06] text-slate-200 placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500/50 transition-all resize-none mb-4"
            />

            <div className="flex gap-2">
              <button
                onClick={handleSaveNote}
                disabled={savingNote}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-amber-400 hover:to-orange-500 transition-all shadow-lg shadow-orange-500/25 disabled:opacity-50"
              >
                {savingNote
                  ? <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                  : 'Save Note'
                }
              </button>
              <button
                onClick={() => setNoteModal(null)}
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
