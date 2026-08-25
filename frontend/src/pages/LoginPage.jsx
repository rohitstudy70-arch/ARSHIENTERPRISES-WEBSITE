import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const [passwordForm, setPasswordForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(passwordForm.email, passwordForm.password);
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary to-secondary flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-dark text-center mb-6">Login</h2>

        <form onSubmit={handlePasswordLogin} className="space-y-4">
          <input type="email" value={passwordForm.email} onChange={(e) => setPasswordForm((p) => ({ ...p, email: e.target.value }))} required placeholder="Email" className="w-full px-4 py-2 border rounded-lg" />
          <input type="password" value={passwordForm.password} onChange={(e) => setPasswordForm((p) => ({ ...p, password: e.target.value }))} required placeholder="Password" className="w-full px-4 py-2 border rounded-lg" />
          <Button variant="primary" size="lg" type="submit" disabled={loading} className="w-full">{loading ? 'Logging in...' : 'Login'}</Button>
        </form>



      </div>
    </div>
  );
};

export default LoginPage;
