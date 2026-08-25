import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('arshi_gps_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  const saveCart = (items) => {
    setCartItems(items);
    try {
      localStorage.setItem('arshi_gps_cart', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  };

  const addToCart = (product, quantity = 1) => {
    const existingIndex = cartItems.findIndex((item) => item.product._id === product._id);
    let updatedItems = [...cartItems];

    if (existingIndex > -1) {
      updatedItems[existingIndex].quantity += quantity;
    } else {
      updatedItems.push({ product, quantity });
    }

    saveCart(updatedItems);
  };

  const removeFromCart = (productId) => {
    const updatedItems = cartItems.filter((item) => item.product._id !== productId);
    saveCart(updatedItems);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedItems = cartItems.map((item) =>
      item.product._id === productId ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updatedItems);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const getCartTotalCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.discount
        ? item.product.price * (1 - item.product.discount / 100)
        : item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotalCount,
    getCartSubtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
