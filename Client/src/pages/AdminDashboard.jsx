import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const AdminDashboard = () => {
  const { token, products, fetchProducts, API_URL } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState('summary'); // summary | products | orders | new
  const [orders, setOrders] = useState([]);
  const emptyForm = {
  title: '',
  description: '',
  price: '',
  discount: '0',
  category: 'Electronics',
  image: '',
  stock: ''
};

const [formData, setFormData] = useState(emptyForm);
const [editingProduct, setEditingProduct] = useState(null);
  // Fetch all orders on load
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_URL}/orders`, { headers: { Authorization: `Bearer ${token}` } });
        setOrders(res.data);
      } catch (err) { console.error(err); }
    };
    if(token) fetchOrders();
  }, [token]);

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/products`, { ...formData, price: Number(formData.price), discount: Number(formData.discount), stock: Number(formData.stock) }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Product Added Successfully!');
      fetchProducts();
      setFormData({ title: '', description: '', price: '', discount: '0', category: 'Electronics', image: '', stock: '' });
      setActiveTab('products');
    } catch (err) { alert(err.message); }
  };

  const handleEdit = (product) => {
  setEditingProduct(product);

  setFormData({
    title: product.title,
    description: product.description,
    price: product.price,
    discount: product.discount,
    category: product.category,
    image: product.image,
    stock: product.stock
  });

  setActiveTab("new");
};

const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    await axios.put(
      `${API_URL}/products/${editingProduct._id}`,
      {
        ...formData,
        price: Number(formData.price),
        discount: Number(formData.discount),
        stock: Number(formData.stock)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Product Updated Successfully!");

    fetchProducts();

    setEditingProduct(null);
    setFormData(emptyForm);
    setActiveTab("products");

  } catch (err) {
    console.error(err);
    alert("Update Failed");
  }
};

  // Nav Button Styling
  const navStyle = (tab) => ({
    background: 'transparent', color: activeTab === tab ? '#fff' : '#9ca3af',
    fontWeight: '600', padding: '8px 16px', borderBottom: activeTab === tab ? '2px solid #fff' : '2px solid transparent'
  });

  return (
    <div className="animate-fade" style={{ backgroundColor: 'var(--admin-bg)', minHeight: '100vh', color: 'var(--admin-text)' }}>
      
      {/* Dark Admin Topbar */}
      <div style={{ backgroundColor: 'var(--admin-surface)', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #374151' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#fff' }}>ShopEZ (Admin)</h2>
        <nav style={{ display: 'flex', gap: '16px' }}>
          <button onClick={() => setActiveTab('summary')} style={navStyle('summary')}>Dashboard</button>
          <button onClick={() => setActiveTab('orders')} style={navStyle('orders')}>Orders</button>
          <button onClick={() => setActiveTab('products')} style={navStyle('products')}>Products</button>
          <button onClick={() => setActiveTab('new')} style={navStyle('new')}>New Product</button>
        </nav>
      </div>

      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* 1. Dashboard Summary Grid (From Screenshot) */}
        {activeTab === 'summary' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[{ title: 'Total Users', val: '24' }, { title: 'All Products', val: products.length }, { title: 'All Orders', val: orders.length }, { title: 'Pending Shipments', val: orders.filter(o => o.status==='Pending').length }].map((card, i) => (
              <div key={i} style={{ backgroundColor: 'var(--admin-surface)', padding: '32px 24px', borderRadius: '8px', textAlign: 'center', border: '1px solid #374151' }}>
                <p style={{ color: '#9ca3af', fontWeight: '600', marginBottom: '12px' }}>{card.title}</p>
                <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '24px' }}>{card.val}</h3>
                <button onClick={() => setActiveTab(card.title.includes('Products') ? 'products' : 'orders')} style={{ padding: '8px 24px', border: '1px solid var(--admin-accent)', color: 'var(--admin-accent)', backgroundColor: 'transparent', borderRadius: '4px', fontWeight: '600' }}>View All</button>
              </div>
            ))}
          </div>
        )}

        {/* 2. All Products Grid (Dark Theme) */}
        {activeTab === 'products' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px' }}>All Products Database</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
              {products.map(product => (
                <div key={product._id} style={{ backgroundColor: 'var(--admin-surface)', padding: '16px', borderRadius: '8px', border: '1px solid #374151' }}>
                  <img src={product.image} alt={product.title} style={{ width: '100%', height: '180px', objectFit: 'contain', backgroundColor: '#fff', borderRadius: '4px', marginBottom: '16px' }} />
                  <h4 style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontWeight: '800' }}>${product.price}</span>
                    <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Stock: {product.stock}</span>
                  </div>
                  <button
        onClick={() => handleEdit(product)}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid var(--admin-accent)',
          color: 'var(--admin-accent)',
          backgroundColor: 'transparent',
          borderRadius: '4px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        Update Entry
      </button>
                      </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. New Product Form (Dark Theme) */}
        {activeTab === 'new' && (
          <form
  onSubmit={editingProduct ? handleUpdate : handleSubmit}
  style={{
    backgroundColor: 'var(--admin-surface)',
    padding: '40px',
    borderRadius: '8px',
    maxWidth: '700px',
    margin: '0 auto',
    border: '1px solid #374151'
  }}
>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '32px', textAlign: 'center' }}>{editingProduct ? "Update Product" : "Ingest New Product"}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <input type="text" placeholder="Product Name" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ gridColumn: 'span 2', padding: '14px', backgroundColor: '#374151', border: 'none', color: '#fff', borderRadius: '4px', outline: 'none' }} />
              <input type="number" placeholder="Price ($)" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ padding: '14px', backgroundColor: '#374151', border: 'none', color: '#fff', borderRadius: '4px', outline: 'none' }} />
              <input type="number" placeholder="Stock Qty" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} style={{ padding: '14px', backgroundColor: '#374151', border: 'none', color: '#fff', borderRadius: '4px', outline: 'none' }} />
              <input type="url" placeholder="Image URL" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} style={{ gridColumn: 'span 2', padding: '14px', backgroundColor: '#374151', border: 'none', color: '#fff', borderRadius: '4px', outline: 'none' }} />
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ gridColumn: 'span 2', padding: '14px', backgroundColor: '#374151', border: 'none', color: '#fff', borderRadius: '4px', outline: 'none' }}>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Mobiles">Mobiles</option>
                <option value="Groceries">Groceries</option>
                <option value="Sports">Sports</option>
              </select>
              <textarea placeholder="Product Description" required rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ gridColumn: 'span 2', padding: '14px', backgroundColor: '#374151', border: 'none', color: '#fff', borderRadius: '4px', outline: 'none' }}></textarea>
            </div>
            <button
  type="submit"
  style={{
    width: '100%',
    padding: '16px',
    backgroundColor: '#2563eb',
    color: '#fff',
    borderRadius: '4px',
    fontWeight: '700',
    marginTop: '32px'
  }}
>
  {editingProduct ? "Update Product" : "Add Product"}
</button>
        {editingProduct && (
  <button
    type="button"
    onClick={() => {
      setEditingProduct(null);
      setFormData(emptyForm);
      setActiveTab("products");
    }}
    style={{
      width: '100%',
      padding: '16px',
      backgroundColor: '#ef4444',
      color: '#fff',
      borderRadius: '4px',
      fontWeight: '700',
      marginTop: '12px',
      border: 'none',
      cursor: 'pointer'
    }}
  >
    Cancel
  </button>
)}
          </form>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;