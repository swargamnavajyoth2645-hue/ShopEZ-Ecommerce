import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const AdminAllOrders = () => {
  const { token, API_URL } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(`${API_URL}/orders`, config);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const updateStatus = async (orderId, currentStatus) => {
    const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    const nextStatus = statuses[(statuses.indexOf(currentStatus) + 1) % statuses.length];
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`${API_URL}/orders/${orderId}/status`, { status: nextStatus }, config);
      fetchOrders(); // Refresh table
    } catch (err) {
      alert("Status update failed");
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>Order Ledger</h1>
      
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.9rem' }}>
              <th style={{ padding: '16px 24px' }}>Order ID</th>
              <th style={{ padding: '16px 24px' }}>User Context</th>
              <th style={{ padding: '16px 24px' }}>Total Amount</th>
              <th style={{ padding: '16px 24px' }}>Action / Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px 24px', fontFamily: 'monospace', color: '#64748b' }}>{order._id}</td>
                <td style={{ padding: '16px 24px', fontWeight: '600' }}>{order.userId?.username || 'Guest'}</td>
                <td style={{ padding: '16px 24px', fontWeight: '800', color: '#0f172a' }}>${order.amount}</td>
                <td style={{ padding: '16px 24px' }}>
                  <button 
                    onClick={() => updateStatus(order._id, order.status)}
                    style={{ 
                      backgroundColor: order.status === 'Delivered' ? '#dcfce7' : '#fef9c3', 
                      color: order.status === 'Delivered' ? '#16a34a' : '#ca8a04', 
                      padding: '8px 16px', 
                      borderRadius: '20px', 
                      fontWeight: '700',
                      border: '1px solid rgba(0,0,0,0.05)',
                      cursor: 'pointer'
                    }}
                  >
                    {order.status} ↻
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// THIS IS THE CRITICAL LINE THAT WAS MISSING OR CUT OFF:
export default AdminAllOrders;