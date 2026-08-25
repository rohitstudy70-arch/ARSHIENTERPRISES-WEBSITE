/**
 * Auth Context
 * Manages authentication state globally
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
          setIsAdmin(JSON.parse(savedUser).role === 'admin');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const applyAuthState = (token, userData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    setIsAdmin(userData.role === 'admin');
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data;
      applyAuthState(token, user);

      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const adminLogin = async (email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.adminLogin({ email, password });
      const { token, user } = response.data;
      applyAuthState(token, user);

      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      applyAuthState(token, user);

      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const loginWithOtp = async (phone, otp) => {
    try {
      setLoading(true);
      const response = await authAPI.verifyLoginOtp({ phone, otp });
      const { token, user } = response.data;
      applyAuthState(token, user);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const registerWithOtp = async (phone, otp) => {
    try {
      setLoading(true);
      const response = await authAPI.verifyRegisterOtp({ phone, otp });
      const { token, user } = response.data;
      applyAuthState(token, user);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    loading,
    login,
    register,
    loginWithOtp,
    registerWithOtp,
    logout,
    adminLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
