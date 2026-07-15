import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const { user, isAdmin, cart, logout } = useContext(ShopContext);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const totalCartItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirect to home with search query (logic handled in Home)
    navigate(`/?search=${search}`); 
  };

  return (
    <header style={{ backgroundColor: 'var(--brand-purple)', padding: '12px 24px', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '40px', alignItems: 'center' }}>
        
        {/* Logo */}
        <Link to="/" style={{ color: '#fff', fontSize: '1.8rem', fontWeight: '800', textDecoration: 'none', letterSpacing: '-0.5px' }}>
          Shop<span style={{ color: '#fbbf24' }}>EZ</span>
        </Link>

        {/* Central Search Bar */}
        <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Search Electronics, fashion, mobiles, etc..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 16px', borderRadius: '4px', border: 'none', outline: 'none', fontSize: '0.95rem' }}
          />
          <button type="submit" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'transparent', color: 'var(--brand-purple)', fontWeight: 'bold' }}>
            🔍
          </button>
        </form>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {isAdmin && <Link to="/admin" style={{ color: '#fff', fontWeight: '600', textDecoration: 'none' }}>Admin</Link>}
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link to="/profile" style={{ color: '#fff', fontWeight: '600', textDecoration: 'none' }}>Hi, {user}</Link>
              <button onClick={() => { logout(); navigate('/login'); }} style={{ backgroundColor: '#ef4444', color: '#fff', padding: '6px 16px', borderRadius: '4px', fontWeight: '600' }}>Logout</button>
            </div>
          ) : (
            <Link to="/login" style={{ backgroundColor: '#fff', color: 'var(--brand-purple)', padding: '8px 24px', borderRadius: '4px', fontWeight: '700', textDecoration: 'none' }}>
              Login
            </Link>
          )}

          <Link to="/cart" style={{ color: '#fff', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🛒 Cart
            {totalCartItems > 0 && (
              <span style={{ backgroundColor: '#fbbf24', color: '#111827', fontSize: '0.75rem', fontWeight: '800', padding: '2px 8px', borderRadius: '12px' }}>
                {totalCartItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;