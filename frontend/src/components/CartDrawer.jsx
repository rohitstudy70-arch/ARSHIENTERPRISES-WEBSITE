import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTimes, FaPlus, FaMinus, FaTrash, FaShoppingCart, FaArrowRight } from 'react-icons/fa';
import { Button } from './Button';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    getCartSubtotal,
    getCartTotalCount,
  } = useCart();

  const navigate = useNavigate();

  // Scroll lock when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isCartOpen]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    // Navigate with state to tell ContactPage that it came from cart
    navigate('/contact', { state: { fromCart: true } });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[400px] max-w-[90vw] bg-white shadow-2xl z-[101] flex flex-col justify-between transition-transform duration-300 ease-out transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold">
            <FaShoppingCart size={18} />
            <span className="text-lg">Your Cart ({getCartTotalCount()})</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="Close Cart"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                <FaShoppingCart size={32} />
              </div>
              <p className="font-semibold text-lg text-slate-800 mb-1">Your cart is empty</p>
              <p className="text-sm text-slate-500 mb-6">Add products from our catalog to request a B2B quote.</p>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/products');
                }}
              >
                Browse Products
              </Button>
            </div>
          ) : (
            cartItems.map((item) => {
              const product = item.product;
              const price = product.discount
                ? product.price * (1 - product.discount / 100)
                : product.price;

              return (
                <div
                  key={product._id}
                  className="flex gap-4 p-3 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors bg-slate-50/50"
                >
                  {/* Image */}
                  <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-bold text-slate-800 text-sm line-clamp-1">
                        {product.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {product.discount > 0 ? (
                          <span className="flex items-center gap-1">
                            <span className="text-primary font-semibold">
                              ₹{price.toLocaleString('en-IN')}
                            </span>
                            <span className="line-through text-gray-400">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                          </span>
                        ) : (
                          <span className="text-primary font-semibold">
                            ₹{price.toLocaleString('en-IN')}
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                        <button
                          onClick={() => updateQuantity(product._id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-500 hover:bg-gray-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <FaMinus size={10} />
                        </button>
                        <span className="px-3 text-xs font-semibold text-gray-700 min-w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product._id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-500 hover:bg-gray-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <FaPlus size={10} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        title="Remove product"
                        aria-label="Remove product from cart"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 font-medium">Estimated Subtotal</span>
              <span className="text-xl font-extrabold text-primary">
                ₹{getCartSubtotal().toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mb-4 leading-normal">
              * Note: Final bulk prices and shipping costs will be details in your customized quote.
            </p>
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center flex items-center gap-2"
              onClick={handleCheckout}
            >
              Request Bulk Quote <FaArrowRight size={12} />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
