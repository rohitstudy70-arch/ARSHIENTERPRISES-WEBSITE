/**
 * Product Details Page - Premium Layout
 * Features showcase gallery, specification tabs, interactive ROI calculator,
 * installation manuals, custom FAQs, and comparison matrix.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaStar, 
  FaShoppingCart, 
  FaPhone, 
  FaCheckCircle, 
  FaInfoCircle, 
  FaCalculator, 
  FaWrench, 
  FaQuestionCircle, 
  FaPlus, 
  FaMinus,
  FaWhatsapp
} from 'react-icons/fa';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { BUSINESS, SITE_CONFIG } from '../config/environment';

export const ProductDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Navigation tabs
  const [activeTab, setActiveTab] = useState('overview');
  
  // Fleet ROI Calculator States
  const [fleetSize, setFleetSize] = useState(10);
  const [monthlyFuel, setMonthlyFuel] = useState(15000);
  
  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const res = await productAPI.getBySlug(slug);
        setProduct(res.data.data);
        setSelectedImage(0);

        // Load related products
        const relatedRes = await productAPI.getRelated(res.data.data._id);
        setRelatedProducts(relatedRes.data.data);
      } catch (error) {
        toast.error('Product not found');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug, navigate]);

  // Handle SEO Meta Tag Injection
  useEffect(() => {
    if (!product) return;

    const title = `${product.title} | Arshi GPS`;
    const description = product.seoDescription || product.shortDescription || SITE_CONFIG.DESCRIPTION;
    const canonicalUrl = `${SITE_CONFIG.URL}/products/${product.slug}`;
    const productImage = product.image || `${SITE_CONFIG.URL}/vite.svg`;

    document.title = title;

    const upsertMeta = (selector, createAttrs, valueAttr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        Object.entries(createAttrs).forEach(([k, v]) => el.setAttribute(k, v));
        document.head.appendChild(el);
      }
      el.setAttribute(valueAttr, value);
    };

    upsertMeta('meta[name="description"]', { name: 'description' }, 'content', description);
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, 'content', title);
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, 'content', description);
    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, 'content', 'product');
    upsertMeta('meta[property="og:image"]', { property: 'og:image' }, 'content', productImage);
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, 'content', canonicalUrl);
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, 'content', title);
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, 'content', description);
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, 'content', productImage);

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    const schemaId = 'product-schema-jsonld';
    const existingSchema = document.getElementById(schemaId);
    if (existingSchema) existingSchema.remove();

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description,
      image: [productImage],
      brand: {
        '@type': 'Brand',
        name: BUSINESS.NAME,
      },
      sku: product._id,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: product.price > 0 ? String(product.price) : '0',
        availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: canonicalUrl,
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = schemaId;
    script.text = JSON.stringify(productSchema);
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.getElementById(schemaId);
      if (schemaScript) schemaScript.remove();
    };
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner message="Retrieving secure product metrics..." />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const allImages = [product.image, ...(product.images || [])];
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  // dynamic FAQ list generator based on product category/slug
  const getFaqs = () => {
    if (product.slug.includes('magnetic')) {
      return [
        { q: "How long does the 10,000mAh battery last?", a: "On standard tracking mode (uploading every 10 seconds while moving), it lasts around 15-20 days. On battery-saver mode (updating once daily), it can last up to 40 days on a single charge." },
        { q: "Is the magnetic grip secure enough for bumpy roads?", a: "Yes, it features 5 ultra-strong industrial-grade NdFeB magnets. Once snapped onto a flat steel surface (like under the vehicle body), it will not fall off even under extreme off-road vibrations." },
        { q: "How do I charge the magnetic tracker?", a: "It has a rubber-sealed Micro-USB charging port. You can charge it with any standard 5V/1A USB charger (like a mobile phone adapter). Charging takes approximately 6-8 hours from empty to full." },
        { q: "What happens if someone finds and removes the device?", a: "The tracker has a built-in light-sensitive optical tamper sensor on its base. If it is detached or removed, it instantly sends an SOS push notification and SMS alert to your phone." }
      ];
    }
    if (product.slug.includes('government')) {
      return [
        { q: "Is this device approved by Ministry of Road Transport (MoRTH)?", a: "Yes, our tracker is fully CDAC and ARAI certified, complying with all parameters of the Indian Government AIS 140 standard, making it fully compliant for RTO vehicle registration." },
        { q: "How does the dual-IP data transmission work?", a: "The device simultaneously uploads tracking logs to the government RTO server (Vahan 4 database) and our secure customer private dashboard, ensuring compliance and utility." },
        { q: "Does it come with double network eSIMs?", a: "Yes, it contains an embedded eSIM configured with dual-telecom profiles (usually BSNL + Airtel or Vi) to automatically switch to the strongest network signal across India." },
        { q: "Does the package include the panic button (SOS)?", a: "Yes, the CDAC certified packet includes the physical panic button block, standard wiring harnesses, and the certification code required for registration upload." }
      ];
    }
    return [
      { q: "Will installing this tracker void my vehicle's manufacturer warranty?", a: "No, our technicians use professional couplers for installation that tap into the wiring harness without cutting/slicing factory wires. Your warranty remains 100% valid." },
      { q: "How does the engine cut-off immobilizer function?", a: "Through the mobile application, you can send an 'Immobilize' command. The tracker activates a micro-relay that cuts off fuel pump power or starter ignition circuit safely. The vehicle cannot be restarted until you send the 'Restore' command." },
      { q: "What happens if the vehicle's main battery is disconnected?", a: "The tracker immediately triggers a 'Power Cut Alert' SMS and push notification. Its internal lithium backup battery then powers the GPS for up to 3-5 hours, allowing you to track its final location." },
      { q: "What is the monthly or yearly renewal fee?", a: "The first year of secure cloud server database access and software license is included. Renewal for subsequent years is ₹1,200 per year, covering SIM data costs and hosting." }
    ];
  };

  // ROI Math
  const calculatedSavings = Math.round((fleetSize * monthlyFuel * 12) * 0.18); // 18% savings typical
  const co2Reduced = (calculatedSavings * 0.0003).toFixed(1); // carbon metric tons math

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-primary transition-colors bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs"
          >
            <FaArrowLeft size={10} /> Back to Catalog
          </button>
          <span className="text-slate-350 text-xs">/</span>
          <span className="text-slate-400 text-xs truncate max-w-[180px]">{product.title}</span>
        </div>

        {/* Main Product Showcase Box */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xs p-6 sm:p-8 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Premium Floating Showcase Gallery */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-gradient-to-b from-slate-50 to-white rounded-2xl overflow-hidden mb-4 h-96 flex items-center justify-center p-6 border border-slate-100 shadow-xs relative">
                <img
                  src={allImages[selectedImage]}
                  alt={product.title}
                  className="aspect-square h-full object-cover transition-all duration-300 hover:scale-103"
                  style={{ clipPath: 'inset(5px)' }}
                />
                
                {/* Save overlay */}
                {product.discount > 0 && (
                  <span className="absolute top-4 right-4 bg-rose-600 text-white px-2.5 py-0.5 rounded-lg text-xs font-black tracking-wider uppercase shadow-sm z-10">
                    Save {product.discount}%
                  </span>
                )}
              </div>

              {allImages.length > 1 && (
                <div className="flex flex-wrap gap-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all p-1 flex items-center justify-center bg-white ${
                        selectedImage === idx 
                          ? 'border-primary shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`product-thumb-${idx}`} 
                        className="w-full h-full object-cover" 
                        style={{ clipPath: 'inset(3px)' }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Key Details & Buy Actions */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded bg-sky-50 text-primary border border-sky-100 text-[10px] font-black uppercase tracking-wider mb-3">
                  {product.category === 'cat-personal' ? 'Personal GPS' : product.category === 'cat-commercial' ? 'Fleet Operations' : 'Govt Certified AIS 140'}
                </span>
                
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                  {product.title}
                </h1>

                {/* Stars Rating */}
                {product.rating > 0 && (
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={13} className={i < Math.floor(product.rating) ? 'fill-current' : 'opacity-25'} />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 font-bold">
                      {product.rating} ({product.reviews} customer reviews)
                    </span>
                  </div>
                )}

                {/* Price Display */}
                <div className="bg-slate-50 rounded-2xl p-4.5 mb-6 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-0.5">Special Deal Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-slate-900">
                        ₹{discountedPrice.toLocaleString('en-IN')}
                      </span>
                      {product.discount > 0 && (
                        <span className="text-sm text-slate-400 line-through">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-1">Stock Status</span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      product.inStock 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                        : 'bg-rose-50 text-rose-600 border border-rose-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      {product.inStock ? 'Available' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {product.shortDescription}
                </p>

                {/* High contrast features bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                  {product.features?.slice(0, 4).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                      <FaCheckCircle className="text-emerald-500 shrink-0 w-4 h-4" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons Box */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                {product.price && product.price > 0 ? (
                  <Button
                    variant="primary"
                    size="lg"
                    disabled={!product.inStock}
                    onClick={() => {
                      addToCart(product);
                      toast.success(`${product.title} added to cart!`);
                      setIsCartOpen(true);
                    }}
                    className="flex-1 text-center py-3.5 bg-gradient-to-r from-sky-600 to-sky-750 text-white font-extrabold rounded-xl hover:from-sky-700 hover:to-sky-850 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FaShoppingCart size={14} /> Add to Order Cart
                  </Button>
                ) : (
                  <Button
                    as={Link}
                    to="/contact"
                    variant="primary"
                    size="lg"
                    className="flex-1 text-center py-3.5 bg-gradient-to-r from-sky-600 to-sky-750 text-white font-extrabold rounded-xl hover:from-sky-700 hover:to-sky-850 shadow-md flex items-center justify-center gap-2"
                  >
                    Send RFQ / Get Quote
                  </Button>
                )}

                <a 
                  href={`https://api.whatsapp.com/send?phone=${BUSINESS.WHATSAPP.replace(/\D/g, '')}&text=Hi, I am interested in purchasing the ${product.title}. Please provide delivery options.`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full text-center py-3.5 border-emerald-500 text-emerald-650 hover:bg-emerald-50/40 font-extrabold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <FaWhatsapp className="text-emerald-500" size={16} /> Chat on WhatsApp
                  </Button>
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Tabbed Interactive Sections */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xs overflow-hidden mb-12">
          
          {/* Tab Selection Header */}
          <div className="flex border-b border-slate-100 overflow-x-auto bg-slate-50">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-6 py-4.5 text-xs font-black tracking-wide uppercase transition-all whitespace-nowrap border-b-2 cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-primary text-primary bg-white font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FaInfoCircle size={12} /> Overview
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`flex items-center gap-2 px-6 py-4.5 text-xs font-black tracking-wide uppercase transition-all whitespace-nowrap border-b-2 cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-primary text-primary bg-white font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FaCheckCircle size={12} /> Specifications
            </button>
            <button
              onClick={() => setActiveTab('roi')}
              className={`flex items-center gap-2 px-6 py-4.5 text-xs font-black tracking-wide uppercase transition-all whitespace-nowrap border-b-2 cursor-pointer ${
                activeTab === 'roi'
                  ? 'border-primary text-primary bg-white font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FaCalculator size={12} /> ROI Calculator
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`flex items-center gap-2 px-6 py-4.5 text-xs font-black tracking-wide uppercase transition-all whitespace-nowrap border-b-2 cursor-pointer ${
                activeTab === 'support'
                  ? 'border-primary text-primary bg-white font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FaWrench size={12} /> Installation & FAQs
            </button>
          </div>

          {/* Tab Body */}
          <div className="p-6 sm:p-8">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2.5">Comprehensive Features Overview</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                    Our {product.title} sets the industry baseline for telemetry stability. Engineered with state-of-the-art GPS components, the hardware captures and uploads location logs every 10 seconds to deliver continuous tracking map visualization. The model comes pre-activated on our private server dashboard and includes one year of cloud data backup.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <h4 className="font-black text-slate-800 text-xs uppercase tracking-wide mb-3">🛠️ Primary System Applications</h4>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-extrabold">•</span>
                        <span>Anti-theft notification triggers (Ignition status, tow alerts).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-extrabold">•</span>
                        <span>Accurate geofencing parameters for warehouses and depots.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-extrabold">•</span>
                        <span>Over-speeding alerts and historical path playbacks.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <h4 className="font-black text-slate-800 text-xs uppercase tracking-wide mb-3">📊 Fleet Performance Insights</h4>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-extrabold">•</span>
                        <span>Idle duration audits to optimize fleet fuel efficiency.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-extrabold">•</span>
                        <span>Rerouting tracking logs to cut down daily transit mileage.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-extrabold">•</span>
                        <span>Maintenance reminder schedule logs.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specs' && (
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4">Technical Datasheet</h3>
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-250">
                        <th className="py-3 px-5 font-black text-slate-650 uppercase tracking-wider w-1/3">Parameter Name</th>
                        <th className="py-3 px-5 font-black text-slate-650 uppercase tracking-wider">Manufacturer Spec</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.specifications?.map((spec, idx) => {
                        const parts = spec.split(':');
                        const name = parts[0]?.trim() || '';
                        const val = parts.slice(1).join(':')?.trim() || '';
                        return (
                          <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50 last:border-b-0">
                            <td className="py-3 px-5 font-bold text-slate-700">{name}</td>
                            <td className="py-3 px-5 text-slate-600 font-semibold">{val || '-'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Fleet ROI Calculator Tab */}
            {activeTab === 'roi' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Controls */}
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2">Fleet ROI Calculator</h3>
                    <p className="text-xs text-slate-500">
                      Determine your business's potential fuel and operational savings with Arshi GPS telemetry analytics.
                    </p>
                  </div>

                  {/* Slider 1: Fleet Size */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-600">Total Fleet Vehicles</span>
                      <span className="text-primary bg-sky-50 border border-sky-100 px-3 py-1 rounded-lg">
                        {fleetSize} Vehicles
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={fleetSize}
                      onChange={(e) => setFleetSize(parseInt(e.target.value))}
                      className="w-full accent-primary h-2 bg-slate-150 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>1</span>
                      <span>50</span>
                      <span>100</span>
                    </div>
                  </div>

                  {/* Slider 2: Monthly Fuel Cost */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-600">Monthly Fuel Budget per Vehicle</span>
                      <span className="text-primary bg-sky-50 border border-sky-100 px-3 py-1 rounded-lg">
                        ₹{monthlyFuel.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="50000"
                      step="1000"
                      value={monthlyFuel}
                      onChange={(e) => setMonthlyFuel(parseInt(e.target.value))}
                      className="w-full accent-primary h-2 bg-slate-150 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>₹5,000</span>
                      <span>₹25,000</span>
                      <span>₹50,000</span>
                    </div>
                  </div>
                </div>

                {/* Outputs Panel */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between border border-slate-800">
                  <div className="absolute inset-0 bg-radial-gradient opacity-10" />
                  
                  <div className="relative z-10 space-y-4">
                    <span className="inline-block text-[9px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md tracking-wider">
                      💡 System Projection
                    </span>
                    <h4 className="text-slate-400 text-xs font-black uppercase tracking-wide">Estimated Annual Savings</h4>
                    
                    <div className="space-y-0.5">
                      <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                        ₹{calculatedSavings.toLocaleString('en-IN')}
                      </div>
                      <p className="text-[10px] text-slate-400 font-semibold">
                        Based on ~18% typical operational efficiency improvement (idle reductions + route optimization)
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 pt-6 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-slate-300">
                    <div className="space-y-1">
                      <span>Carbon Footprint Offset</span>
                      <div className="text-sky-300 text-sm font-extrabold">{co2Reduced} Tons CO2 / year</div>
                    </div>
                    <div className="space-y-1 text-right">
                      <span>Estimated Payback</span>
                      <div className="text-sky-300 text-sm font-extrabold">2.5 Months</div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Installation & Support Tab */}
            {activeTab === 'support' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Installation Manual */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FaWrench className="text-primary" /> Device Installation Guide
                  </h3>
                  
                  {product.slug.includes('magnetic') ? (
                    <div className="space-y-3.5 text-xs text-slate-650">
                      <p className="font-semibold">The portable magnetic tracker requires zero complex wiring. Set up in 3 simple steps:</p>
                      <div className="flex gap-3">
                        <span className="bg-sky-100 text-primary font-black rounded-lg w-6 h-6 flex items-center justify-center shrink-0">1</span>
                        <span>Slide a micro-SIM card with active data plan into the internal SIM slot and toggle power switch to ON. Verify status LED is blinking.</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="bg-sky-100 text-primary font-black rounded-lg w-6 h-6 flex items-center justify-center shrink-0">2</span>
                        <span>Identify a flat steel frame underneath the vehicle chassis, wheel well, or cargo container base. Clean the metal target.</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="bg-sky-100 text-primary font-black rounded-lg w-6 h-6 flex items-center justify-center shrink-0">3</span>
                        <span>Snap the tracker firmly. Ensure the base tamper light sensor is fully covered to prevent false removal alert notifications.</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3.5 text-xs text-slate-650">
                      <p className="font-semibold">Wired vehicle trackers are connected to the vehicle electrical loom. Wire connections are color-coded:</p>
                      <div className="flex gap-3">
                        <span className="bg-sky-100 text-primary font-black rounded-lg w-6 h-6 flex items-center justify-center shrink-0">🔴</span>
                        <div>
                          <strong className="text-slate-800">Red (Power Input):</strong>
                          <p>Connect to the vehicle's permanent battery positive (+12V / +24V) wire.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="bg-sky-100 text-primary font-black rounded-lg w-6 h-6 flex items-center justify-center shrink-0">⚫</span>
                        <div>
                          <strong className="text-slate-800">Black (Ground):</strong>
                          <p>Connect to the chassis metal body or battery negative ground terminal.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="bg-sky-100 text-primary font-black rounded-lg w-6 h-6 flex items-center justify-center shrink-0">🟠</span>
                        <div>
                          <strong className="text-slate-800">Orange (Ignition ACC Sensor):</strong>
                          <p>Connect to the vehicle ignition line to detect key-on and trip start alerts.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="bg-sky-100 text-primary font-black rounded-lg w-6 h-6 flex items-center justify-center shrink-0">🟡</span>
                        <div>
                          <strong className="text-slate-800">Yellow (Immobilizer Relay Control):</strong>
                          <p>Tether to relay wire loop to initiate engine cut-off functionality via the app.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* FAQ Accordion */}
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <FaQuestionCircle className="text-primary" /> Frequently Asked Questions
                  </h3>
                  <div className="space-y-2.5">
                    {getFaqs().map((faq, idx) => (
                      <div key={idx} className="border border-slate-100 bg-slate-50/50 rounded-2xl overflow-hidden transition-all">
                        <button
                          onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                          className="w-full text-left px-5 py-3.5 text-xs font-bold text-slate-800 hover:text-primary transition-colors flex items-center justify-between gap-4 cursor-pointer select-none"
                        >
                          <span>{faq.q}</span>
                          <span className="text-slate-400">
                            {openFaqIndex === idx ? <FaMinus size={10} /> : <FaPlus size={10} />}
                          </span>
                        </button>
                        {openFaqIndex === idx && (
                          <div className="px-5 pb-4.5 text-xs text-slate-600 leading-relaxed border-t border-slate-100/50 pt-2.5 bg-white font-medium">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

        {/* Technical Specification Matrix (Compare this product to the other 3) */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xs p-6 sm:p-8 mb-12 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-primary text-xs font-bold bg-sky-50 px-2 py-0.5 rounded-lg">📊 Compare Specs</span>
            <h2 className="text-sm sm:text-base font-black text-slate-900">How it stacks up against other models</h2>
          </div>
          <table className="w-full text-xs text-left min-w-[650px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-black uppercase tracking-wider">
                <th className="pb-3 w-1/4">Feature</th>
                <th className="pb-3 w-1/4 px-4 text-primary font-black">{product.title} (Selected)</th>
                <th className="pb-3 w-1/4 px-4">Arshi AGT365N</th>
                <th className="pb-3 w-1/4 px-4">PRO-365N Lite</th>
              </tr>
            </thead>
            <tbody className="font-semibold text-slate-700">
              <tr className="border-b border-slate-100 hover:bg-slate-50/30">
                <td className="py-3 font-bold text-slate-500">Installation Mode</td>
                <td className="py-3 px-4 text-primary font-black">
                  {product.slug.includes('magnetic') ? 'Wireless Plug-n-Play' : 'Wired Hidden'}
                </td>
                <td className="py-3 px-4">Wired Hidden</td>
                <td className="py-3 px-4">Wired Hidden</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/30">
                <td className="py-3 font-bold text-slate-500">Engine Cut-off Option</td>
                <td className="py-3 px-4 text-primary font-black">
                  {product.slug.includes('magnetic') ? 'No (Asset tracking priority)' : 'Yes (Remote Immobilizer)'}
                </td>
                <td className="py-3 px-4">Yes (Remote Relay)</td>
                <td className="py-3 px-4">Yes (Remote Relay)</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/30">
                <td className="py-3 font-bold text-slate-500">Standby Battery Power</td>
                <td className="py-3 px-4 text-primary font-black">
                  {product.slug.includes('magnetic') ? '10,000mAh (Up to 30 days)' : '150-200mAh (Up to 4 hours)'}
                </td>
                <td className="py-3 px-4">150mAh</td>
                <td className="py-3 px-4">200mAh</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/30">
                <td className="py-3 font-bold text-slate-500">Certifications</td>
                <td className="py-3 px-4 text-primary font-black">
                  {product.slug.includes('government') ? 'MoRTH AIS 140 ARAI' : 'IP65 Water resistant'}
                </td>
                <td className="py-3 px-4">IP65 Water resistant</td>
                <td className="py-3 px-4">Industrial Grade</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mb-6">Explore Other Trackers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <div
                  key={related._id}
                  className="bg-white rounded-2xl border border-slate-200/60 shadow-xs overflow-hidden cursor-pointer hover:shadow-lg transition-all group flex flex-col justify-between"
                  onClick={() => navigate(`/products/${related.slug}`)}
                >
                  <div className="bg-gradient-to-b from-slate-50 to-white h-44 flex items-center justify-center p-4 relative border-b border-slate-100">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="aspect-square h-full object-cover mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                      style={{ clipPath: 'inset(5px)' }}
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-xs line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-[10px] text-slate-600 font-bold uppercase mt-1">
                        {related.category === 'cat-personal' ? 'Personal' : related.category === 'cat-commercial' ? 'Commercial' : 'AIS 140 Government'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                      <span className="text-xs font-black text-slate-900">
                        ₹{related.price?.toLocaleString('en-IN') || 'RFQ'}
                      </span>
                      <span className="text-[10px] text-primary font-bold group-hover:underline flex items-center gap-0.5">
                        Details <FaArrowLeft className="rotate-180 scale-75" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetailsPage;
