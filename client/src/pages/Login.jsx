import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/useAuth.js';

function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Validation
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      setIsSubmitting(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      setIsSubmitting(false);
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      let message = 'Login failed. Please try again.';
      if (err?.response?.data?.message) {
        message = err.response.data.message;
      } else if (err?.message) {
        message = err.message;
      }
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 dark:bg-slate-700 mb-4">
            <LogIn className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Sign in to your account to continue</p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
                <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={handleInputChange(setEmail)}
                disabled={loading || isSubmitting}
                className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-600 focus:border-transparent disabled:bg-slate-50 dark:disabled:bg-slate-900 disabled:text-slate-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={handleInputChange(setPassword)}
                disabled={loading || isSubmitting}
                className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-600 focus:border-transparent disabled:bg-slate-50 dark:disabled:bg-slate-900 disabled:text-slate-500 transition-colors"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || isSubmitting}
              className="w-full py-2.5 px-4 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-600 focus:ring-offset-2"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-slate-900 dark:text-white hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
