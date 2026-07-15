import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Customer');
  const { register } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Determine boolean based on the UI dropdown
      const isAdminFlag = userType === 'Admin';
      
      // Use the global Context register function
      await register(username, email, password, isAdminFlag);
      navigate('/'); // Redirect to home instantly with Admin powers!
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="animate-fade" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        
        <div style={{ backgroundColor: 'var(--brand-purple)', padding: '20px', textAlign: 'center' }}>
          <h2 style={{ color: '#fff', fontWeight: '700', fontSize: '1.5rem', margin: 0 }}>Register</h2>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input type="text" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-light)' }} />
          <input type="email" placeholder="Email Address" required value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-light)' }} />
          <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-light)' }} />
          
          <select value={userType} onChange={e => setUserType(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-light)', backgroundColor: '#fff', fontWeight: '600' }}>
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>

          <button type="submit" style={{ width: '100%', backgroundColor: 'var(--brand-purple)', color: '#fff', padding: '12px', borderRadius: '4px', fontWeight: '700', marginTop: '10px' }}>Register</button>
          
          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-gray)' }}>
            Already registered? <Link to="/login" style={{ color: 'var(--brand-purple)', fontWeight: '700' }}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;