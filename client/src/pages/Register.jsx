import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await register(email.trim(), password, name.trim());
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
    <form onSubmit={handleSubmit}>
      {error && (
        <div role="alert" aria-live="assertive" style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}
      
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
        disabled={loading}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        required
        disabled={loading}
      />
      <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
    </form>
  );
}

export default Register;
