import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaToggleOn, FaToggleOff, FaBox } from 'react-icons/fa';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleting, setDeleting] = useState(null);

  const loadProducts = async (p = 1, s = '') => {
    try {
      setLoading(true);
      const res = await productAPI.getAll({ page: p, limit: 10, search: s, includeInactive: true });
      setProducts(res.data.data || []);
      setTotalPages(res.data.pagination?.pages || 1);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    setDeleting(id);
    try {
      await productAPI.delete(id);
      toast.success('Product deleted');
      loadProducts(page, search);
    } catch {
      toast.error('Failed to delete');
    } finally {
      setDeleting(null);
    }
  };

  const handleToggle = async (product) => {
    try {
      await productAPI.update(product._id, { isActive: !product.isActive });
      toast.success(`Product ${!product.isActive ? 'activated' : 'deactivated'}`);
      loadProducts(page, search);
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadProducts(1, search);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-slate-400 text-sm mt-0.5">Manage your GPS product catalog</p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 self-start sm:self-auto"
        >
          <FaPlus size={12} />
          Add Product
        </Link>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={13} />
          <input
            type="text"
            placeholder="Search products by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-800/60 border border-white/[0.06] text-slate-200 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-sky-500/50 focus:bg-slate-800 transition-all duration-200"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-xl transition-colors"
        >
          Search
        </button>
      </form>

      {/* Table Card */}
      <div className="bg-slate-800/60 border border-white/[0.06] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
            <p className="text-xs text-slate-500">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaBox size={24} className="text-slate-500" />
            </div>
            <p className="text-slate-400 font-medium mb-1">No products found</p>
            <p className="text-slate-500 text-sm mb-4">Get started by adding your first product</p>
            <Link
              to="/admin/products/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 text-sm font-medium rounded-xl transition-colors border border-violet-500/20"
            >
              <FaPlus size={11} /> Add Product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Stock</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Active</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {products.map(p => (
                  <tr key={p._id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-10 h-10 rounded-xl object-cover border border-white/10 flex-shrink-0"
                            onError={e => e.target.style.display = 'none'}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0">
                            <FaBox size={14} className="text-slate-500" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-200 truncate max-w-[200px]">{p.title}</p>
                          <p className="text-xs text-slate-500 truncate max-w-[200px]">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-emerald-400">₹{(p.price || 0).toLocaleString('en-IN')}</span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-xs px-2.5 py-1 bg-slate-700/60 text-slate-400 rounded-lg">
                        {p.category?.name || 'N/A'}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full font-medium ${
                        p.inStock ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${p.inStock ? 'bg-emerald-400' : 'bg-red-400'}`} />
                        {p.inStock ? 'In Stock' : 'Out'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggle(p)}
                        className="transition-transform hover:scale-110 active:scale-95"
                        title={p.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {p.isActive
                          ? <FaToggleOn size={26} className="text-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]" />
                          : <FaToggleOff size={26} className="text-slate-600" />
                        }
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/admin/products/edit/${p._id}`}
                          className="p-2 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 transition-all duration-200"
                          title="Edit"
                        >
                          <FaEdit size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(p._id, p.title)}
                          disabled={deleting === p._id}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 disabled:opacity-50"
                          title="Delete"
                        >
                          {deleting === p._id
                            ? <div className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                            : <FaTrash size={13} />
                          }
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
              onClick={() => { setPage(p); loadProducts(p, search); }}
              className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200 ${
                p === page
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-white/[0.06]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
