import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI, categoryAPI, adminAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaUpload, FaTimes, FaPlus, FaBox, FaHashtag } from 'react-icons/fa';

const inputClass = "w-full bg-slate-900/60 border border-white/[0.06] text-slate-200 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500/50 focus:bg-slate-900 transition-all";
const labelClass = "block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2";

const Section = ({ title, icon: Icon, gradient, children }) => (
  <div className="bg-slate-800/60 border border-white/[0.06] rounded-2xl overflow-hidden">
    <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <Icon size={13} className="text-white" />
      </div>
      <h3 className="font-semibold text-white text-sm">{title}</h3>
    </div>
    <div className="p-5 space-y-4">{children}</div>
  </div>
);

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    discount: 0,
    image: '',
    images: [],
    specifications: [''],
    features: [''],
    inStock: true,
    stockQuantity: 0,
    isActive: true,
    isFeatured: false,
    seoTitle: '',
    seoDescription: '',
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const catRes = await categoryAPI.getAll();
        setCategories(catRes.data.data || []);
        if (isEdit) {
          const res = await productAPI.getById(id);
          const product = res.data.data;
          if (product) {
            setForm({
              title: product.title || '',
              category: product.category?._id || product.category || '',
              shortDescription: product.shortDescription || '',
              fullDescription: product.fullDescription || '',
              price: product.price || '',
              discount: product.discount || 0,
              image: product.image || '',
              images: product.images || [],
              specifications: product.specifications?.length ? product.specifications : [''],
              features: product.features?.length ? product.features : [''],
              inStock: product.inStock ?? true,
              stockQuantity: product.stockQuantity || 0,
              isActive: product.isActive ?? true,
              isFeatured: product.isFeatured || false,
              seoTitle: product.seoTitle || '',
              seoDescription: product.seoDescription || '',
            });
          }
        }
      } catch {
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleArrayChange = (field, index, value) => {
    setForm(prev => {
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayItem = (field) => setForm(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  const removeArrayItem = (field, index) => setForm(prev => ({
    ...prev,
    [field]: prev[field].filter((_, i) => i !== index),
  }));

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await adminAPI.uploadMedia(formData);
      handleChange('image', res.data.data.url);
      toast.success('Image uploaded!');
    } catch {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        ...form,
        price: parseFloat(form.price),
        specifications: form.specifications.filter(s => s.trim()),
        features: form.features.filter(f => f.trim()),
      };
      if (isEdit) {
        await productAPI.update(id, data);
        toast.success('Product updated!');
      } else {
        await productAPI.create(data);
        toast.success('Product created!');
      }
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const Toggle = ({ field, label }) => (
    <div className="flex items-center justify-between p-3 bg-slate-900/40 rounded-xl border border-white/[0.04]">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <button
        type="button"
        onClick={() => handleChange(field, !form[field])}
        className={`relative w-11 h-6 rounded-full transition-all duration-300 ${form[field] ? 'bg-sky-500' : 'bg-slate-600'}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${form[field] ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      <p className="text-xs text-slate-500">Loading product data...</p>
    </div>
  );

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/products')}
          className="p-2.5 bg-slate-800/60 hover:bg-slate-800 border border-white/[0.06] rounded-xl text-slate-400 hover:text-white transition-all"
        >
          <FaArrowLeft size={14} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
          <p className="text-slate-400 text-sm mt-0.5">{isEdit ? 'Update product details' : 'Fill in the details to create a new product'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Basic Info */}
            <Section title="Basic Information" icon={FaBox} gradient="from-violet-500 to-purple-600">
              <div>
                <label className={labelClass}>Product Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={e => handleChange('title', e.target.value)}
                  className={inputClass}
                  placeholder="e.g. AGT365N GPS Tracker"
                />
              </div>
              <div>
                <label className={labelClass}>Category *</label>
                <select
                  required
                  value={form.category}
                  onChange={e => handleChange('category', e.target.value)}
                  className={inputClass + " cursor-pointer"}
                >
                  <option value="">Select a category...</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Short Description *</label>
                <textarea
                  required
                  value={form.shortDescription}
                  onChange={e => handleChange('shortDescription', e.target.value)}
                  rows={2}
                  className={inputClass + " resize-none"}
                  placeholder="Brief product overview (shown in listing)"
                />
              </div>
              <div>
                <label className={labelClass}>Full Description *</label>
                <textarea
                  required
                  value={form.fullDescription}
                  onChange={e => handleChange('fullDescription', e.target.value)}
                  rows={6}
                  className={inputClass + " resize-none"}
                  placeholder="Detailed product description..."
                />
              </div>
            </Section>

            {/* Specifications */}
            <Section title="Specifications" icon={FaPlus} gradient="from-emerald-500 to-green-600">
              {form.specifications.map((spec, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={spec}
                    onChange={e => handleArrayChange('specifications', i, e.target.value)}
                    className={inputClass}
                    placeholder={`Specification ${i + 1} (e.g. GPS Accuracy: ±5m)`}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('specifications', i)}
                    className="p-2.5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('specifications')}
                className="flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors"
              >
                <FaPlus size={11} /> Add Specification
              </button>
            </Section>

            {/* Features */}
            <Section title="Features" icon={FaPlus} gradient="from-sky-500 to-blue-600">
              {form.features.map((feat, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={feat}
                    onChange={e => handleArrayChange('features', i, e.target.value)}
                    className={inputClass}
                    placeholder={`Feature ${i + 1} (e.g. Real-time tracking)`}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('features', i)}
                    className="p-2.5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('features')}
                className="flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors"
              >
                <FaPlus size={11} /> Add Feature
              </button>
            </Section>

            {/* SEO */}
            <Section title="SEO & Meta" icon={FaHashtag} gradient="from-pink-500 to-rose-600">
              <div>
                <label className={labelClass}>SEO Title</label>
                <input
                  type="text"
                  value={form.seoTitle}
                  onChange={e => handleChange('seoTitle', e.target.value)}
                  className={inputClass}
                  placeholder="Leave blank to use product title"
                />
              </div>
              <div>
                <label className={labelClass}>SEO Description</label>
                <textarea
                  value={form.seoDescription}
                  onChange={e => handleChange('seoDescription', e.target.value)}
                  rows={2}
                  className={inputClass + " resize-none"}
                  placeholder="Meta description for search engines..."
                />
              </div>
            </Section>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Image */}
            <Section title="Product Image" icon={FaUpload} gradient="from-amber-500 to-orange-600">
              {form.image && (
                <div className="relative rounded-xl overflow-hidden border border-white/[0.06] bg-slate-900/40">
                  <img src={form.image} alt="Product" className="w-full h-40 object-contain" />
                  <button
                    type="button"
                    onClick={() => handleChange('image', '')}
                    className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg text-white transition-all"
                  >
                    <FaTimes size={11} />
                  </button>
                </div>
              )}
              <input
                type="text"
                value={form.image}
                onChange={e => handleChange('image', e.target.value)}
                className={inputClass}
                placeholder="Paste image URL..."
              />
              <label className={`flex items-center justify-center gap-2 w-full border-2 border-dashed border-white/10 hover:border-sky-500/30 bg-slate-900/20 hover:bg-sky-500/5 rounded-xl p-3 cursor-pointer transition-all text-sm font-medium ${uploading ? 'text-slate-500 pointer-events-none' : 'text-slate-400 hover:text-sky-400'}`}>
                {uploading
                  ? <><div className="w-4 h-4 border-2 border-slate-500/30 border-t-slate-500 rounded-full animate-spin" /> Uploading...</>
                  : <><FaUpload size={13} /> Upload Image</>
                }
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
            </Section>

            {/* Pricing */}
            <Section title="Pricing" icon={FaBox} gradient="from-emerald-500 to-teal-600">
              <div>
                <label className={labelClass}>Price (₹) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={form.price}
                  onChange={e => handleChange('price', e.target.value)}
                  className={inputClass}
                  placeholder="0"
                />
              </div>
              <div>
                <label className={labelClass}>Discount (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.discount}
                  onChange={e => handleChange('discount', e.target.value)}
                  className={inputClass}
                  placeholder="0"
                />
              </div>
              {form.price && form.discount > 0 && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400">
                  Discounted price: ₹{(parseFloat(form.price) * (1 - parseFloat(form.discount) / 100)).toFixed(0)}
                </div>
              )}
            </Section>

            {/* Stock & Status */}
            <Section title="Stock & Status" icon={FaBox} gradient="from-slate-500 to-gray-600">
              <Toggle field="inStock" label="In Stock" />
              <Toggle field="isActive" label="Active (Visible)" />
              <Toggle field="isFeatured" label="Featured Product" />
              <div>
                <label className={labelClass}>Stock Quantity</label>
                <input
                  type="number"
                  min="0"
                  value={form.stockQuantity}
                  onChange={e => handleChange('stockQuantity', parseInt(e.target.value))}
                  className={inputClass}
                />
              </div>
            </Section>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {saving
              ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
              : isEdit ? 'Update Product' : 'Create Product'
            }
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-white/[0.06] text-slate-300 rounded-xl text-sm font-medium transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
