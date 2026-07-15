import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || "Verification authentication exception occurred.");
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px', backgroundColor: '#fff', padding: '40px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px', fontWeight: '800' }}>Sign In</h2>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>Email Address</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
        </div>
        <button type="submit" style={{ width: '100%', backgroundColor: '#0f172a', color: '#fff', padding: '12px', borderRadius: '8px', fontWeight: '600' }}>Verify Session</button>
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#64748b' }}>New to platform? <Link to="/register" style={{ color: '#2563eb', fontWeight: '600' }}>Register Account</Link></p>
      </form>
    </div>
  );
};

export default Login;