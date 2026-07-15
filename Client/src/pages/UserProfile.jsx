import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, token, API_URL, logout } = useContext(ShopContext);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate('/login');
    
    const fetchMyOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        // Fetching specific user orders based on the backend logic we built
        const res = await axios.get(`${API_URL}/orders/myorders`, config);
        setMyOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch order history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, [token, API_URL, navigate]);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 24px', minHeight: '85vh' }}>
      {/* Profile Header Widget */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '40px', borderRadius: '24px', color: '#fff', boxShadow: '0 20px 25px -5px rgba(15,23,42,0.2)', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '800' }}>
            {user ? user.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0 }}>{user}</h1>
            <p style={{ color: '#94a3b8', marginTop: '4px', fontSize: '1rem' }}>Verified Shopper Account</p>
          </div>
        </div>
        <button onClick={() => { logout(); navigate('/login'); }} style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 24px', borderRadius: '10px', fontWeight: '600' }}>
          Sign Out
        </button>
      </div>

      {/* Order History Section */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>Your Order History</h2>
        
        {loading ? (
          <p style={{ color: '#64748b' }}>Retrieving your secure ledger...</p>
        ) : myOrders.length === 0 ? (
          <div style={{ backgroundColor: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '16px' }}>You haven't placed any orders yet.</p>
            <button onClick={() => navigate('/')} style={{ backgroundColor: '#2563eb', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontWeight: '600' }}>Explore Catalog</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {myOrders.map(order => (
              <div key={order._id} style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <div>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600', marginBottom: '4px', textTransform: 'uppercase' }}>Order ID: {order._id}</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>${order.amount.toLocaleString()}</p>
                  <p style={{ fontSize: '0.9rem', color: '#475569', marginTop: '8px' }}>Delivering to: {order.address?.street}, {order.address?.city}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    display: 'inline-block',
                    backgroundColor: order.status === 'Delivered' ? '#dcfce7' : order.status === 'Shipped' ? '#dbeafe' : '#fef9c3', 
                    color: order.status === 'Delivered' ? '#16a34a' : order.status === 'Shipped' ? '#1d4ed8' : '#ca8a04', 
                    padding: '8px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '0.9rem'
                  }}>
                    ● {order.status}
                  </span>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '12px' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// CRITICAL EXPORT LINE
export default UserProfile;