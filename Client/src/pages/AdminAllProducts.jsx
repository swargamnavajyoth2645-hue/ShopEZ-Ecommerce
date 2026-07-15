import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const AdminAllProducts = () => {
  const { products, loading } = useContext(ShopContext);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>Inventory Registry</h1>
      
      {loading ? <p style={{ color: '#64748b' }}>Loading catalog...</p> : (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.9rem' }}>
                <th style={{ padding: '16px 24px' }}>Product Details</th>
                <th style={{ padding: '16px 24px' }}>Category</th>
                <th style={{ padding: '16px 24px' }}>Price</th>
                <th style={{ padding: '16px 24px' }}>Stock Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={product.image} alt={product.title} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                    <span style={{ fontWeight: '600', color: '#0f172a' }}>{product.title}</span>
                  </td>
                  <td style={{ padding: '16px 24px', color: '#64748b', fontWeight: '500' }}>{product.category}</td>
                  <td style={{ padding: '16px 24px', fontWeight: '700', color: '#0f172a' }}>${product.price}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ backgroundColor: product.stock > 0 ? '#dcfce7' : '#fee2e2', color: product.stock > 0 ? '#16a34a' : '#ef4444', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' }}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// THIS IS THE CRITICAL LINE THAT MUST BE AT THE BOTTOM:
export default AdminAllProducts;