import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { registerWithOtp } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await authAPI.sendRegisterOtp({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: formData.phone.trim(),
      });
      setOtpSent(true);
      toast.success('OTP sent successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyAndRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await registerWithOtp(formData.phone.trim(), otp.trim());
      toast.success('Registration successful');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary to-secondary flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-dark text-center mb-8">Register with OTP</h2>

        {!otpSent ? (
          <form onSubmit={sendOtp} className="space-y-4">
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="w-full px-4 py-2 border rounded-lg" />
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Registered Phone" className="w-full px-4 py-2 border rounded-lg" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Password" className="w-full px-4 py-2 border rounded-lg" />
            <Button variant="primary" size="lg" type="submit" disabled={loading} className="w-full">{loading ? 'Sending OTP...' : 'Send OTP'}</Button>
          </form>
        ) : (
          <form onSubmit={verifyAndRegister} className="space-y-4">
            <p className="text-sm text-gray-600">OTP sent to {formData.phone}</p>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required placeholder="Enter 6-digit OTP" className="w-full px-4 py-2 border rounded-lg" />
            <Button variant="primary" size="lg" type="submit" disabled={loading} className="w-full">{loading ? 'Verifying...' : 'Verify OTP & Register'}</Button>
            <button type="button" onClick={() => setOtpSent(false)} className="text-primary text-sm hover:underline">Edit details</button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-600">Already have an account? <Link to="/login" className="text-primary hover:underline font-semibold">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
