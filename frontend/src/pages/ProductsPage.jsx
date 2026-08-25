/**
 * Products Page - Premium Design
 * Features sidebar filtering, category pills, comparison drawer, and side-by-side spec overlay.
 */

import React, { useState, useEffect } from 'react';
import { productAPI, categoryAPI } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Button } from '../components/Button';
import { FaSearch, FaTimes, FaExchangeAlt, FaCheck, FaTrashAlt, FaChevronRight } from 'react-icons/fa';
import { SEO } from '../components/SEO';
import toast from 'react-hot-toast';

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Custom filter states
  const [comparedProducts, setComparedProducts] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  
  // Spec toggles for sidebar
  const [filterBattery, setFilterBattery] = useState(false);
  const [filterEngineCut, setFilterEngineCut] = useState(false);
  const [filterWaterproof, setFilterWaterproof] = useState(false);
  const [filterMagnetic, setFilterMagnetic] = useState(false);

  const limit = 12;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await categoryAPI.getAll();
        setCategories(res.data.data);
      } catch (error) {
        toast.error('Failed to load categories');
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const res = await productAPI.getAll({
          page,
          limit,
          category: selectedCategory,
          search: searchTerm,
        });

        let data = res.data.data;

        // Apply local specification filters
        if (filterBattery) {
          data = data.filter(p => 
            p.features.some(f => f.toLowerCase().includes('battery') || f.toLowerCase().includes('backup')) ||
            p.specifications.some(s => s.toLowerCase().includes('battery') || s.toLowerCase().includes('mah'))
          );
        }
        if (filterEngineCut) {
          data = data.filter(p => 
            p.features.some(f => f.toLowerCase().includes('engine') || f.toLowerCase().includes('lock') || f.toLowerCase().includes('cut-off'))
          );
        }
        if (filterWaterproof) {
          data = data.filter(p => 
            p.features.some(f => f.toLowerCase().includes('waterproof') || f.toLowerCase().includes('ip6')) ||
            p.specifications.some(s => s.toLowerCase().includes('waterproof') || s.toLowerCase().includes('ip65') || s.toLowerCase().includes('ip67'))
          );
        }
        if (filterMagnetic) {
          data = data.filter(p => 
            p.features.some(f => f.toLowerCase().includes('magnet') || f.toLowerCase().includes('no wiring'))
          );
        }

        setProducts(data);
        setTotalPages(res.data.pagination.totalPages);
      } catch (error) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page, selectedCategory, searchTerm, filterBattery, filterEngineCut, filterWaterproof, filterMagnetic]);

  // Handle adding/removing product from compared list
  const handleCompareToggle = (product) => {
    setComparedProducts((prev) => {
      const exists = prev.some((p) => p._id === product._id);
      if (exists) {
        return prev.filter((p) => p._id !== product._id);
      } else {
        if (prev.length >= 3) {
          toast.error('You can compare up to 3 products at a time.');
          return prev;
        }
        toast.success(`Added ${product.title} to comparison list.`);
        return [...prev, product];
      }
    });
  };

  const handleClearCompare = () => {
    setComparedProducts([]);
    toast.success('Comparison list cleared.');
  };

  const getSpecValue = (product, specKey) => {
    const specs = product.specifications || [];
    const found = specs.find(s => s.toLowerCase().startsWith(specKey.toLowerCase()));
    if (found) {
      return found.split(':')[1]?.trim() || found;
    }
    
    // Fallback values mapping
    if (specKey === 'Battery') {
      if (product.slug.includes('magnetic')) return '10,000mAh Lithium-ion (Rechargeable)';
      if (product.slug.includes('agt365n')) return '150mAh Li-Polymer Backup';
      if (product.slug.includes('pro-365n')) return '200mAh Li-Po Backup';
      if (product.slug.includes('government')) return 'Integrated Li-Po Backup';
    }
    if (specKey === 'Voltage') {
      if (product.slug.includes('magnetic')) return '5V USB Charger';
      if (product.slug.includes('government')) return '9V - 32V DC';
      return '9V - 90V DC (wide range)';
    }
    if (specKey === 'Waterproof') {
      if (product.slug.includes('government')) return 'IP67 Rugged Casing';
      if (product.slug.includes('magnetic')) return 'IP65 Dust & Water Resistant';
      if (product.slug.includes('agt365n')) return 'IP65 Water Resistant';
      return 'Splash proof';
    }
    if (specKey === 'SIM Configuration') {
      if (product.slug.includes('government')) return 'Dual SIM eSIM + Micro SIM';
      return 'Single Micro SIM slot';
    }
    return '-';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="GPS Tracking Products & Devices | AGT365N, PRO-365N, AIS 140"
        description="Explore Arshi GPS trackers including AGT365N, PRO-365N, Portable Magnet GPS, and AIS 140 RTO approved devices in Bihar. Best prices with free pan-India support."
        keywords="GPS tracker price, AGT365N GPS, PRO-365N tracker, Magnet GPS tracker, AIS 140 tracker price Bihar, vehicle tracker Purnia, bike GPS tracker"
        canonicalPath="/products"
      />
      {/* Immersive Header Banner */}
      <div className="relative bg-slate-900 text-white overflow-hidden py-16 sm:py-20 border-b border-slate-800">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
        {/* Decorative Light Glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary rounded-full filter blur-[120px] opacity-20 pointer-events-none" />
        <div className="absolute -bottom-40 right-20 w-96 h-96 bg-sky-500 rounded-full filter blur-[120px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-400/20 mb-4 tracking-wider uppercase">
            ⚡ Advanced Vehicle Analytics
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Arshi GPS <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Tracking Suite</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
            Protect assets, monitor driver performance, and optimize fuel spend with our high-precision GPS locators. Approved by leading transport authorities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-400 border-t border-slate-800/80 pt-6 max-w-lg mx-auto">
            <span>🚀 10,000+ Active Devices</span>
            <span>|</span>
            <span>🎯 99% System Accuracy</span>
            <span>|</span>
            <span>🔧 Live Support</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mobile Horizontal Filters (Scrollable list of categories) */}
        <div className="flex sm:hidden overflow-x-auto gap-2 pb-4 scrollbar-none mb-6">
          <button
            onClick={() => { setSelectedCategory(''); setPage(1); }}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all border ${
              selectedCategory === ''
                ? 'bg-primary border-primary text-white shadow-sm'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => { setSelectedCategory(cat._id); setPage(1); }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                selectedCategory === cat._id
                  ? 'bg-primary border-primary text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Desktop Split Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs flex flex-col gap-6">
              
              {/* Search Bar */}
              <div>
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2.5">Search Products</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search model, feature..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setPage(1);
                    }}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-xs text-slate-800"
                  />
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3 h-3" />
                </div>
              </div>

              {/* Categories Accordion */}
              <div className="hidden sm:block border-t border-slate-100 pt-5">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-3">Categories</h3>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => { setSelectedCategory(''); setPage(1); }}
                    className={`flex items-center justify-between text-xs px-3 py-2 rounded-lg font-bold transition-colors ${
                      selectedCategory === '' 
                        ? 'bg-slate-100 text-primary' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>All GPS Systems</span>
                    <FaChevronRight size={8} className="opacity-60" />
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat._id}
                      onClick={() => { setSelectedCategory(cat._id); setPage(1); }}
                      className={`flex items-center justify-between text-xs px-3 py-2 rounded-lg font-bold transition-colors ${
                        selectedCategory === cat._id 
                          ? 'bg-slate-100 text-primary' 
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <FaChevronRight size={8} className="opacity-60" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Device Specs Filters */}
              <div className="border-t border-slate-100 pt-5">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-3">Filter by Spec</h3>
                <div className="flex flex-col gap-2.5">
                  <label className="flex items-center gap-2.5 text-xs text-slate-600 font-semibold cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={filterBattery}
                      onChange={(e) => { setFilterBattery(e.target.checked); setPage(1); }}
                      className="rounded border-slate-350 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                    />
                    <span>🔋 Internal Battery Backup</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs text-slate-600 font-semibold cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={filterEngineCut}
                      onChange={(e) => { setFilterEngineCut(e.target.checked); setPage(1); }}
                      className="rounded border-slate-350 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                    />
                    <span>🔌 Engine Immobilizer Lock</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs text-slate-600 font-semibold cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={filterWaterproof}
                      onChange={(e) => { setFilterWaterproof(e.target.checked); setPage(1); }}
                      className="rounded border-slate-350 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                    />
                    <span>🌊 IP65 / IP67 Waterproofing</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs text-slate-600 font-semibold cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={filterMagnetic}
                      onChange={(e) => { setFilterMagnetic(e.target.checked); setPage(1); }}
                      className="rounded border-slate-350 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                    />
                    <span>🧲 Wireless Magnetic Mount</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters Reset */}
              {(selectedCategory || searchTerm || filterBattery || filterEngineCut || filterWaterproof || filterMagnetic) && (
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSearchTerm('');
                    setFilterBattery(false);
                    setFilterEngineCut(false);
                    setFilterWaterproof(false);
                    setFilterMagnetic(false);
                    setPage(1);
                    toast.success('Filters reset');
                  }}
                  className="mt-2 text-center text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors border border-rose-100 hover:bg-rose-50/50 py-2 rounded-xl"
                >
                  Clear Active Filters
                </button>
              )}
            </div>
          </aside>

          {/* Right Main Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="h-96 flex items-center justify-center">
                <LoadingSpinner message="Searching tracking products..." />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/50 p-8 shadow-xs">
                <div className="text-slate-300 text-5xl mb-4">🔍</div>
                <h3 className="text-sm font-black text-slate-800 mb-1">No Trackers Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We couldn't find any GPS products matching your current search criteria. Try modifying your filter choices.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSearchTerm('');
                    setFilterBattery(false);
                    setFilterEngineCut(false);
                    setFilterWaterproof(false);
                    setFilterMagnetic(false);
                    setPage(1);
                  }}
                  className="mt-5 inline-flex items-center justify-center text-xs font-bold bg-primary text-white px-4 py-2 rounded-xl hover:bg-opacity-95 shadow-sm transition-all"
                >
                  Reset Catalog
                </button>
              </div>
            ) : (
              <>
                {/* Grid Title bar */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-extrabold text-slate-500 tracking-wide uppercase">
                    Showing {products.length} GPS Systems
                  </span>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                  {products.map((product) => (
                    <ProductCard 
                      key={product._id} 
                      product={product} 
                      isCompared={comparedProducts.some(p => p._id === product._id)}
                      onCompareToggle={handleCompareToggle}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="rounded-xl px-4 text-xs font-bold border-slate-200 text-slate-700"
                    >
                      Previous
                    </Button>
                    {[...Array(totalPages)].map((_, idx) => (
                      <Button
                        key={idx + 1}
                        variant={page === idx + 1 ? 'primary' : 'outline'}
                        onClick={() => setPage(idx + 1)}
                        className={`rounded-xl w-8 h-8 text-xs font-bold p-0 flex items-center justify-center ${
                          page === idx + 1 ? 'bg-primary text-white' : 'border-slate-200 text-slate-700'
                        }`}
                      >
                        {idx + 1}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="rounded-xl px-4 text-xs font-bold border-slate-200 text-slate-700"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Sticky Bottom Comparison Drawer */}
      {comparedProducts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4 md:gap-6 shadow-2xl z-40 border border-white/10 w-[92%] max-w-3xl justify-between animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="bg-sky-500/20 text-sky-400 p-2 rounded-xl border border-sky-400/20 text-xs hidden sm:block">
              <FaExchangeAlt />
            </div>
            <div>
              <p className="text-xs font-black tracking-wide uppercase">Compare Products</p>
              <p className="text-[10px] text-slate-400">{comparedProducts.length} of 3 items selected</p>
            </div>
          </div>

          {/* Product Thumbnails List */}
          <div className="flex items-center gap-3">
            {comparedProducts.map((p) => (
              <div key={p._id} className="relative bg-slate-800/80 rounded-xl p-1 w-11 h-11 flex items-center justify-center group border border-slate-700">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover mix-blend-multiply rounded-lg"
                  style={{ clipPath: 'inset(3px)' }}
                />
                <button
                  onClick={() => handleCompareToggle(p)}
                  className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full w-4.5 h-4.5 flex items-center justify-center text-[8px] hover:bg-rose-600 shadow border border-slate-900 cursor-pointer"
                  aria-label="Remove item"
                >
                  <FaTimes size={7} />
                </button>
              </div>
            ))}
            {comparedProducts.length < 3 && (
              <div className="border border-dashed border-slate-700 rounded-xl w-11 h-11 flex items-center justify-center text-slate-500 text-xs font-bold bg-slate-950/20">
                +
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearCompare}
              className="text-[10px] font-extrabold tracking-wide uppercase text-slate-400 hover:text-white px-3 py-2 flex items-center gap-1 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all cursor-pointer"
            >
              <FaTrashAlt size={9} /> Reset
            </button>
            <button
              onClick={() => setIsCompareOpen(true)}
              className="text-xs font-black tracking-wide uppercase bg-gradient-to-r from-sky-500 to-sky-600 text-white px-4.5 py-2.5 rounded-xl hover:from-sky-600 hover:to-sky-700 shadow-lg hover:shadow-sky-500/15 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Compare Specs <FaChevronRight size={8} />
            </button>
          </div>
        </div>
      )}

      {/* Side-by-Side Product Comparison Fullscreen Modal */}
      {isCompareOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold text-sm bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
                  ⚡ Comparison Matrix
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-900">Side-by-Side Technical Specs</h3>
              </div>
              <button
                onClick={() => setIsCompareOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-200/50 rounded-full transition-all cursor-pointer"
                aria-label="Close Comparison"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Modal Body Scroll Container */}
            <div className="flex-1 overflow-x-auto p-6 scrollbar-thin">
              <table className="w-full min-w-[700px] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="w-1/4 pb-4 font-black text-slate-500 uppercase tracking-wider">Device Specs</th>
                    {comparedProducts.map((p) => (
                      <th key={p._id} className="w-1/4 pb-4 px-4 font-black text-slate-900 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="bg-slate-50/80 rounded-2xl p-2 w-20 h-20 flex items-center justify-center border border-slate-100 shadow-xs">
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-full h-full object-cover mix-blend-multiply"
                              style={{ clipPath: 'inset(5px)' }}
                            />
                          </div>
                          <span className="text-xs font-black text-slate-800 line-clamp-2 max-w-[150px] leading-tight">
                            {p.title}
                          </span>
                        </div>
                      </th>
                    ))}
                    {/* Empty headers to fill up to 3 columns layout if less compared */}
                    {[...Array(3 - comparedProducts.length)].map((_, i) => (
                      <th key={i} className="w-1/4 pb-4 px-4 text-slate-300 font-bold text-center">
                        <div className="border border-dashed border-slate-200 rounded-2xl h-20 w-20 mx-auto flex items-center justify-center bg-slate-50/20 text-lg">
                          +
                        </div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mt-2">Add product</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Category */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/40">
                    <td className="py-4 font-bold text-slate-500">Category</td>
                    {comparedProducts.map((p) => (
                      <td key={p._id} className="py-4 px-4 text-center text-slate-700 font-bold">
                        {p.category === 'cat-personal' ? 'Personal / Luxury Car' : p.category === 'cat-commercial' ? 'Commercial Fleet' : 'Government AIS 140'}
                      </td>
                    ))}
                    {[...Array(3 - comparedProducts.length)].map((_, i) => (
                      <td key={i} className="py-4 px-4 text-center text-slate-300">-</td>
                    ))}
                  </tr>

                  {/* Price */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/40">
                    <td className="py-4 font-bold text-slate-500">Price</td>
                    {comparedProducts.map((p) => {
                      const isQuoteOnly = !p.price || p.price <= 0;
                      const discountedPrice = p.discount ? p.price * (1 - p.discount / 100) : p.price;
                      return (
                        <td key={p._id} className="py-4 px-4 text-center font-black text-slate-900 text-sm">
                          {isQuoteOnly ? (
                            <span className="text-primary text-xs">Request Quote</span>
                          ) : (
                            <span>₹{discountedPrice.toLocaleString('en-IN')}</span>
                          )}
                        </td>
                      );
                    })}
                    {[...Array(3 - comparedProducts.length)].map((_, i) => (
                      <td key={i} className="py-4 px-4 text-center text-slate-300">-</td>
                    ))}
                  </tr>

                  {/* Battery */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/40">
                    <td className="py-4 font-bold text-slate-500">🔋 Battery Backup</td>
                    {comparedProducts.map((p) => (
                      <td key={p._id} className="py-4 px-4 text-center text-slate-700">
                        {getSpecValue(p, 'Battery')}
                      </td>
                    ))}
                    {[...Array(3 - comparedProducts.length)].map((_, i) => (
                      <td key={i} className="py-4 px-4 text-center text-slate-300">-</td>
                    ))}
                  </tr>

                  {/* Voltage */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/40">
                    <td className="py-4 font-bold text-slate-500">🔌 Voltage Support</td>
                    {comparedProducts.map((p) => (
                      <td key={p._id} className="py-4 px-4 text-center text-slate-700">
                        {getSpecValue(p, 'Voltage')}
                      </td>
                    ))}
                    {[...Array(3 - comparedProducts.length)].map((_, i) => (
                      <td key={i} className="py-4 px-4 text-center text-slate-300">-</td>
                    ))}
                  </tr>

                  {/* Waterproof */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/40">
                    <td className="py-4 font-bold text-slate-500">🌊 Waterproofing</td>
                    {comparedProducts.map((p) => (
                      <td key={p._id} className="py-4 px-4 text-center text-slate-700">
                        {getSpecValue(p, 'Waterproof')}
                      </td>
                    ))}
                    {[...Array(3 - comparedProducts.length)].map((_, i) => (
                      <td key={i} className="py-4 px-4 text-center text-slate-300">-</td>
                    ))}
                  </tr>

                  {/* SIM config */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/40">
                    <td className="py-4 font-bold text-slate-500">📶 SIM Setup</td>
                    {comparedProducts.map((p) => (
                      <td key={p._id} className="py-4 px-4 text-center text-slate-700">
                        {getSpecValue(p, 'SIM Configuration')}
                      </td>
                    ))}
                    {[...Array(3 - comparedProducts.length)].map((_, i) => (
                      <td key={i} className="py-4 px-4 text-center text-slate-300">-</td>
                    ))}
                  </tr>

                  {/* Features */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/40">
                    <td className="py-4 font-bold text-slate-500">⭐ Key Features</td>
                    {comparedProducts.map((p) => (
                      <td key={p._id} className="py-4 px-4 text-slate-600 leading-relaxed text-[10px]">
                        <ul className="flex flex-col gap-1 items-center">
                          {p.features.slice(0, 4).map((f, idx) => (
                            <li key={idx} className="flex items-center gap-1 font-semibold">
                              <span className="text-emerald-500 text-[10px] font-bold">✓</span> {f}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                    {[...Array(3 - comparedProducts.length)].map((_, i) => (
                      <td key={i} className="py-4 px-4 text-center text-slate-300">-</td>
                    ))}
                  </tr>

                  {/* Actions */}
                  <tr>
                    <td className="py-6 font-bold text-slate-500" />
                    {comparedProducts.map((p) => {
                      const isQuoteOnly = !p.price || p.price <= 0;
                      return (
                        <td key={p._id} className="py-6 px-4 text-center">
                          <a 
                            href={isQuoteOnly ? '/contact' : `/products/${p.slug}`}
                            className="inline-block text-[10px] font-extrabold tracking-wider uppercase px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-xs transition-all cursor-pointer"
                          >
                            {isQuoteOnly ? 'Get Quote' : 'Buy Now'}
                          </a>
                        </td>
                      );
                    })}
                    {[...Array(3 - comparedProducts.length)].map((_, i) => (
                      <td key={i} className="py-6 px-4 text-center text-slate-350">-</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button
                onClick={() => setIsCompareOpen(false)}
                className="text-xs font-black tracking-wide uppercase px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
              >
                Close Comparison
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProductsPage;
