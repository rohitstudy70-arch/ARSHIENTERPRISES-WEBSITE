/**
 * Product Card Component
 * Premium enterprise layout
 */

import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaStar, 
  FaShoppingCart, 
  FaLock, 
  FaBatteryFull, 
  FaMapMarkerAlt, 
  FaGasPump, 
  FaShieldAlt, 
  FaCheckCircle 
} from 'react-icons/fa';
import { Button } from './Button';
import { gsap } from '../hooks/useGsapAnimations';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const getFeatureIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes('engine') || n.includes('lock') || n.includes('cut-off')) return <FaLock className="text-primary" />;
  if (n.includes('battery') || n.includes('backup') || n.includes('standby')) return <FaBatteryFull className="text-emerald-500" />;
  if (n.includes('location') || n.includes('tracking') || n.includes('realtime') || n.includes('real-time')) return <FaMapMarkerAlt className="text-sky-500" />;
  if (n.includes('fuel') || n.includes('sensor')) return <FaGasPump className="text-blue-500" />;
  if (n.includes('anti-theft') || n.includes('alarm') || n.includes('tamper') || n.includes('shield')) return <FaShieldAlt className="text-rose-500" />;
  return <FaCheckCircle className="text-slate-400" />;
};

export const ProductCard = ({ product, isCompared, onCompareToggle }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const isQuoteOnly = !product.price || product.price <= 0;
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    
    const enter = () => {
      gsap.to(el, { 
        y: -6, 
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.08)', 
        borderColor: '#0284c7', // Slate sky focus border
        duration: 0.25, 
        ease: 'power2.out' 
      });
    };
    const leave = () => {
      gsap.to(el, { 
        y: 0, 
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)', 
        borderColor: '#f1f5f9', // Slate border reset
        duration: 0.25, 
        ease: 'power2.out' 
      });
    };
    
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    
    return () => {
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
    };
  }, []);

  const categoryLabel = product.category === 'cat-personal' 
    ? 'Personal GPS' 
    : product.category === 'cat-commercial' 
    ? 'Commercial Fleet' 
    : 'Govt Approved AIS 140';

  return (
    <div 
      ref={cardRef} 
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm transition-all duration-300 h-full flex flex-col p-4 relative"
    >
      {/* Compare Checkbox Overlay */}
      {onCompareToggle && (
        <label className="absolute top-6 left-6 flex items-center gap-1.5 bg-slate-900/90 text-white text-[9px] font-extrabold tracking-wide uppercase px-2.5 py-1 rounded-full cursor-pointer hover:bg-slate-800 transition-colors z-10 backdrop-blur-xs shadow-sm select-none">
          <input
            type="checkbox"
            checked={isCompared || false}
            onChange={() => onCompareToggle(product)}
            className="rounded border-slate-300 text-primary focus:ring-primary w-3 h-3 cursor-pointer"
            aria-label={`Compare ${product.title}`}
          />
          <span>Compare</span>
        </label>
      )}

      {/* Floating Discount Pill */}
      {product.discount > 0 && !isQuoteOnly && (
        <div className="absolute top-6 right-6 bg-rose-600 text-white px-2 py-0.5 rounded-lg text-xs font-black shadow-sm z-10">
          SAVE {product.discount}%
        </div>
      )}

      {/* Product Image Floating Container */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100/40 rounded-xl h-48 flex items-center justify-center p-4 mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="aspect-square h-full object-cover mix-blend-multiply transition-transform duration-500 hover:scale-105"
          style={{ clipPath: 'inset(5px)' }}
          loading="lazy"
        />
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center rounded-xl backdrop-blur-xs">
            <span className="text-white font-bold text-xs tracking-wider uppercase bg-red-600 px-3 py-1.5 rounded-full shadow">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col">
        {/* Category & Stock Row */}
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
            {categoryLabel}
          </span>
          
          <div className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <span className="text-[9px] font-bold text-slate-500">
              {product.inStock ? 'In Stock' : 'Unavailable'}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-black text-slate-800 mb-1.5 line-clamp-1 hover:text-primary transition-colors">
          <Link to={`/products/${product.slug}`}>{product.title}</Link>
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-500 mb-3.5 line-clamp-2 leading-relaxed flex-1">
          {product.shortDescription}
        </p>

        {/* Quick Specs Icons (Professional feature tag row) */}
        {product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.features.slice(0, 3).map((feat, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center gap-1 bg-slate-50 border border-slate-100 text-slate-600 text-[9px] font-semibold px-2 py-0.5 rounded"
                title={feat}
              >
                {getFeatureIcon(feat)}
                <span className="max-w-[75px] truncate">{feat.split(' ')[0]} {feat.split(' ')[1] || ''}</span>
              </span>
            ))}
          </div>
        )}

        {/* Price & Rating Divider */}
        <div className="border-t border-slate-50 pt-3 flex items-center justify-between mt-auto">
          {/* Rating */}
          {product.rating > 0 ? (
            <div className="flex flex-col gap-0.5">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={10}
                    className={i < Math.floor(product.rating) ? 'fill-current' : 'opacity-25'}
                  />
                ))}
              </div>
              <span className="text-[10px] font-bold text-slate-600">
                {product.rating} ({product.reviews || 0} reviews)
              </span>
            </div>
          ) : (
            <div />
          )}

          {/* Pricing Block */}
          <div className="flex flex-col items-end">
            {isQuoteOnly ? (
              <span className="text-xs font-bold text-primary">Price on Request</span>
            ) : (
              <div className="flex items-baseline gap-1">
                <span className="text-base font-black text-slate-900">
                  ₹{discountedPrice.toLocaleString('en-IN')}
                </span>
                {product.discount > 0 && (
                  <span className="text-xs text-slate-600 line-through font-semibold">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            )}
            <span className="text-[10px] text-slate-600 font-bold">Software License Included</span>
          </div>
        </div>

        {/* CTA Button Grid */}
        <div className="flex gap-2 mt-4 pt-1">
          <Button 
            as={Link} 
            to={`/products/${product.slug}`} 
            variant="outline" 
            size="sm" 
            className="flex-1 text-center text-xs py-2 border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-xl"
          >
            Details
          </Button>

          {isQuoteOnly ? (
            <Button 
              as={Link} 
              to="/contact" 
              variant="primary" 
              size="sm" 
              className="flex-1 text-center text-xs py-2 bg-primary text-white hover:bg-primary-dark font-bold rounded-xl"
            >
              Get Quote
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              className="px-3.5 bg-primary text-white hover:bg-primary-dark font-bold rounded-xl"
              onClick={() => {
                addToCart(product);
                toast.success(`${product.title} added to cart!`);
                setIsCartOpen(true);
              }}
              disabled={!product.inStock}
              aria-label={`Add ${product.title} to cart`}
            >
              <FaShoppingCart size={12} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
