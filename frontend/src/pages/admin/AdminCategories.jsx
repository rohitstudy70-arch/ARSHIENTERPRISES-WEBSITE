import React, { useState, useEffect } from 'react';
import { categoryAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaCheck, FaFolder } from 'react-icons/fa';

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/60 w-full max-w-md animate-slideIn">
        {children}
      </div>
    </div>
  );
}

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', icon: '' });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await categoryAPI.getAll();
      setCategories(res.data.data || []);
    } catch {
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditItem(null);
    setForm({ name: '', description: '', icon: '' });
    setShowForm(true);
  };

  const openEdit = (cat) => {
    setEditItem(cat);
    setForm({ name: cat.name, description: cat.description || '', icon: cat.icon || '' });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem) {
        await categoryAPI.update(editItem._id, form);
        toast.success('Category updated');
      } else {
        await categoryAPI.create(form);
        toast.success('Category created');
      }
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete category "${name}"?`)) return;
    try {
      await categoryAPI.delete(id);
      toast.success('Deleted');
      load();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const gradients = [
    'from-violet-500 to-purple-600',
    'from-sky-500 to-blue-600',
    'from-emerald-500 to-green-600',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-red-600',
    'from-cyan-500 to-teal-600',
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Categories</h1>
          <p className="text-slate-400 text-sm mt-0.5">Organize your product catalog</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-lg shadow-rose-500/25 hover:-translate-y-0.5"
        >
          <FaPlus size={12} />
          Add Category
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-48 gap-3">
          <div className="w-8 h-8 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" />
          <p className="text-xs text-slate-500">Loading categories...</p>
        </div>
      ) : (
        <div className="bg-slate-800/60 border border-white/[0.06] rounded-2xl overflow-hidden">
          {categories.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaFolder size={24} className="text-slate-500" />
              </div>
              <p className="text-slate-400 font-medium">No categories yet</p>
              <p className="text-slate-500 text-sm mt-1">Create your first category to organize products</p>
              <button
                onClick={openAdd}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 text-sm font-medium rounded-xl transition-colors border border-pink-500/20"
              >
                <FaPlus size={11} /> Add Category
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Slug</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Description</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Products</th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {categories.map((cat, i) => (
                    <tr key={cat._id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center flex-shrink-0 shadow-md`}>
                            <FaFolder size={14} className="text-white" />
                          </div>
                          <p className="font-medium text-slate-200">{cat.name}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <code className="text-xs bg-slate-700/50 text-slate-400 px-2 py-1 rounded-lg font-mono">{cat.slug}</code>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <p className="text-sm text-slate-500 max-w-xs truncate">{cat.description || '—'}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center text-xs px-2.5 py-1 bg-slate-700/60 text-slate-400 rounded-lg font-medium">
                          {cat.productCount || 0} products
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEdit(cat)}
                            className="p-2 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 transition-all"
                            title="Edit"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(cat._id, cat.name)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                            title="Delete"
                          >
                            <FaTrash size={13} />
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
      )}

      {/* Form Modal */}
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                  <FaFolder size={14} className="text-white" />
                </div>
                <h3 className="font-semibold text-white">{editItem ? 'Edit Category' : 'New Category'}</h3>
              </div>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                <FaTimes size={14} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-slate-800/60 border border-white/[0.06] text-slate-200 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500/50 transition-all"
                  placeholder="e.g. Vehicle Trackers"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  rows={3}
                  className="w-full bg-slate-800/60 border border-white/[0.06] text-slate-200 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500/50 transition-all resize-none"
                  placeholder="Brief description of this category..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Icon (optional)</label>
                <input
                  type="text"
                  value={form.icon}
                  onChange={e => setForm(p => ({ ...p, icon: e.target.value }))}
                  className="w-full bg-slate-800/60 border border-white/[0.06] text-slate-200 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500/50 transition-all"
                  placeholder="e.g. 🚗 or icon name"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50"
                >
                  {saving
                    ? <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                    : <><FaCheck size={12} /> {editItem ? 'Update' : 'Create'}</>
                  }
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl text-sm font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}
