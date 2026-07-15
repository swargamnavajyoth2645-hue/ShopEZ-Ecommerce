import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const VISUAL_CATEGORIES = [
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&q=80' },
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&q=80' },
  { name: 'Mobiles', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80' },
  { name: 'Groceries', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80' },
  { name: 'Sports', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200&q=80' }
];

const Home = () => {
  const { products, loading, addToCart } = useContext(ShopContext);
  const [selectedCat, setSelectedCat] = useState('All');
  const navigate = useNavigate();

  const filteredProducts = selectedCat === 'All' ? products : products.filter(p => p.category.includes(selectedCat));

  return (
    <main className="animate-fade" style={{ paddingBottom: '60px' }}>
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        
        {/* SUPER SALE PROMO BANNER */}
        <section style={{ width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden', position: 'relative', marginBottom: '40px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2000&auto=format&fit=crop" alt="Super Sale" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, #4f46e5 0%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px' }}>
            <h1 style={{ color: '#fff', fontSize: '4rem', fontWeight: '800', lineHeight: '1', fontStyle: 'italic' }}>SUPER<br/>SALE</h1>
            <p style={{ color: '#fbbf24', fontSize: '1.5rem', fontWeight: '700', marginTop: '10px' }}>Up to 60% OFF on top brands</p>
          </div>
        </section>

        {/* CIRCULAR CATEGORY THUMBNAILS */}
        <section style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '60px' }}>
          <div onClick={() => setSelectedCat('All')} style={{ cursor: 'pointer', textAlign: 'center' }}>
             <div style={{ width: '100px', height: '100px', borderRadius: '12px', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', border: selectedCat === 'All' ? '3px solid var(--brand-purple)' : 'none' }}>
                <span style={{ fontWeight: '700' }}>All Items</span>
             </div>
          </div>
          {VISUAL_CATEGORIES.map(cat => (
            <div key={cat.name} onClick={() => setSelectedCat(cat.name)} style={{ cursor: 'pointer', textAlign: 'center', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
              <div style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', border: selectedCat === cat.name ? '3px solid var(--brand-purple)' : '2px solid transparent', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <p style={{ fontWeight: '600', marginTop: '12px', color: 'var(--text-dark)' }}>{cat.name}</p>
            </div>
          ))}
        </section>

        {/* PRODUCT GRID */}
        <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '24px' }}>{selectedCat === 'All' ? 'All Products' : `${selectedCat} Collection`}</h2>
          
          {loading ? <p>Loading catalog...</p> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
              {filteredProducts.map(product => {
                const isOutOfStock = product.stock === 0;
                return (
                  <div key={product._id} style={{ border: '1px solid var(--border-light)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.2s', backgroundColor: '#fff' }} onMouseEnter={e => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)'} onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                    <div onClick={() => navigate(`/product/${product._id}`)} style={{ cursor: 'pointer', height: '200px', marginBottom: '16px', position: 'relative' }}>
                      <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: isOutOfStock ? 0.5 : 1 }} />
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '8px', height: '2.5em', overflow: 'hidden' }}>{product.title}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>${product.price}</span>
                        {product.discount > 0 && <span style={{ color: '#16a34a', fontWeight: '700', fontSize: '0.85rem' }}>({product.discount}% off)</span>}
                      </div>
                    </div>
                    <button 
                      disabled={isOutOfStock}
                      onClick={() => addToCart(product)}
                      style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: isOutOfStock ? '#e5e7eb' : 'var(--brand-purple)', color: isOutOfStock ? '#9ca3af' : '#fff', fontWeight: '700', cursor: isOutOfStock ? 'not-allowed' : 'pointer' }}
                    >
                      {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </main>
  );
};

export default Home;