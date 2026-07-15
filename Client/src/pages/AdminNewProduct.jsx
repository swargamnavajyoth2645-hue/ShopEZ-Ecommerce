import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const AdminNewProduct = () => {
  const { token, API_URL, fetchProducts } = useContext(ShopContext);
  const [formData, setFormData] = useState({ title: '', description: '', price: '', discount: '0', category: 'Electronics', image: '', stock: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(`${API_URL}/products`, { 
        ...formData, 
        price: Number(formData.price), 
        discount: Number(formData.discount), 
        stock: Number(formData.stock) 
      }, config);
      alert('Product Added Successfully!');
      fetchProducts(); // Refresh global state
      setFormData({ title: '', description: '', price: '', discount: '0', category: 'Electronics', image: '', stock: '' });
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const inputStyle = { width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', backgroundColor: '#f8fafc' };

  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Launch New Product</h1>
      <p style={{ color: '#64748b', marginBottom: '32px' }}>Fill out the specifications below to publish a new SKU to the marketplace.</p>
      
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Product Title</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={inputStyle} />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Base Price ($)</label>
            <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={inputStyle} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Discount (%)</label>
            <input type="number" required value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} style={inputStyle} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Stock Quantity</label>
            <input type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} style={inputStyle} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Category</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={inputStyle}>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Image URL</label>
            <input type="url" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} style={inputStyle} />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Description</label>
            <textarea required rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ ...inputStyle, resize: 'vertical' }}></textarea>
          </div>
        </div>

        <button type="submit" style={{ width: '100%', backgroundColor: '#0f172a', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: '800', fontSize: '1.05rem' }}>Publish Product</button>
      </form>
    </div>
  );
};

// THIS IS THE CRITICAL EXPORT LINE
export default AdminNewProduct;