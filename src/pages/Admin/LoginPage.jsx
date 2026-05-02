import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <h2>TanyaAdvokat Admin</h2>
        <p>Silakan masuk untuk mengelola konten website</p>
        
        {error && <div className="admin-login-error">{error}</div>}
        
        <div className="admin-form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="admin@tanyaadvokat.id"
            required 
          />
        </div>
        
        <div className="admin-form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••"
            required 
          />
        </div>
        
        <button type="submit" disabled={loading} className="admin-login-btn">
          {loading ? 'Memproses...' : 'Masuk'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
