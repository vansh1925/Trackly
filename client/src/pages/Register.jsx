import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from 'lucide-react';
import { useAuth } from "../context/useAuth.js";

function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const passwordError = (pwd) => {
    const trimmed = pwd.trim();
    const meetsLength = trimmed.length >= 8;
    const hasUpper = /[A-Z]/.test(trimmed);
    const hasLower = /[a-z]/.test(trimmed);
    const hasNumber = /[0-9]/.test(trimmed);
    const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(trimmed);

    if (!meetsLength || !hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      return 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent double submit
    setError(null);

    // Validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email');
      return;
    }

    const passwordValidationError = passwordError(password);
    if (passwordValidationError) {
      setError(passwordValidationError);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await register(name.trim(), email.trim(), password.trim());
      navigate('/dashboard');
    } catch (err) {
      let message = 'Registration failed. Please try again.';
      if (err?.response?.data?.message) {
        message = err.response.data.message;
      } else if (Array.isArray(err?.response?.data?.errors)) {
        message = err.response.data.errors[0]?.msg || message;
      } else if (err?.code === 'ERR_NETWORK' || err?.message?.toLowerCase?.().includes('network')) {
        message = 'Network error. Check your internet connection.';
      } else if (err?.message) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 mb-4">
            <UserPlus className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create your account</h1>
          <p className="mt-2 text-sm text-slate-600">Start tracking your expenses and productivity</p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div role="alert" aria-live="assertive" className="rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                disabled={loading}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                disabled={loading}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                disabled={loading}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
                disabled={loading}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-slate-900 hover:text-slate-700 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
