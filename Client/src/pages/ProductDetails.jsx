import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, API_URL } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [itemLoading, setItemLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleItem = async () => {
      try {
        const res = await axios.get(`${API_URL}/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Product lookups failed processing", err);
      } finally {
        setItemLoading(false);
      }
    };
    fetchSingleItem();
  }, [id]);

  if (itemLoading) return <div style={{ textAlign: 'center', padding: '100px' }}>Assembling catalog layouts...</div>;
  if (!product) return <div style={{ textAlign: 'center', padding: '100px' }}>Target product profile catalog item missing.</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '20px', padding: '20px', backgroundColor: '#fff' }}>
          <img src={product.image} alt={product.title} style={{ width: '100%', maxHeight: '450px', objectFit: 'contain' }} />
        </div>
        <div>
          <span style={{ color: '#2563eb', fontWeight: '700', fontSize: '0.85rem' }}>{product.category}</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '8px 0 16px 0', color: '#0f172a' }}>{product.title}</h1>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>${product.price}</div>
          <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '32px' }}>{product.description}</p>
          <div style={{ marginBottom: '32px', fontSize: '0.95rem', fontWeight: '600', color: product.stock > 0 ? '#16a34a' : '#ef4444' }}>
            {product.stock > 0 ? `✓ Local Inventory Stock Available (${product.stock} Units)` : 'Out of stock'}
          </div>
          <button onClick={() => { addToCart(product); navigate('/cart'); }} style={{ width: '100%', backgroundColor: '#0f172a', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: '700', fontSize: '1rem' }}>Secure Bag Entry</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;