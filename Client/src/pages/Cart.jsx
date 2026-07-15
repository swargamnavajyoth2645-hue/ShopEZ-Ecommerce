import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, updateQty, removeFromCart, placeOrder, user } = useContext(ShopContext);
  const navigate = useNavigate();

  // Price Details calculations
  const totalMRP = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalDiscount = cart.reduce((sum, item) => sum + ((item.price * (item.discount || 0) / 100) * item.qty), 0);
  const finalPrice = Math.round(totalMRP - totalDiscount);

  const handleCheckout = async () => {
    if (!user) return navigate('/login');
    try {
      await placeOrder({ street: '123 Main St', city: 'Metropolis', zip: '10001' }); // Mock address for flow
      alert("Order placed successfully!");
      navigate('/profile');
    } catch (err) { alert(err.message); }
  };

  if (cart.length === 0) return <div style={{ textAlign: 'center', padding: '100px' }}><h2>Your Cart is Empty</h2></div>;

  return (
    <div className="animate-fade" style={{ maxWidth: '1200px', margin: '40px auto', display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px', padding: '0 20px' }}>
      
      {/* Left: Cart Items */}
      <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        {cart.map(item => {
          const itemPrice = Math.round(item.price * (1 - (item.discount || 0) / 100));
          return (
            <div key={item._id} style={{ display: 'flex', gap: '24px', paddingBottom: '24px', marginBottom: '24px', borderBottom: '1px solid var(--border-light)' }}>
              <img src={item.image} alt={item.title} style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
              <div style={{ flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '4px' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '16px' }}>Size: M &nbsp; | &nbsp; Brand: Premium</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-light)', borderRadius: '4px' }}>
                    <button onClick={() => updateQty(item._id, -1)} style={{ padding: '4px 12px', backgroundColor: '#f9fafb' }}>-</button>
                    <span style={{ padding: '0 16px', fontWeight: '600' }}>{item.qty}</span>
                    <button onClick={() => updateQty(item._id, 1)} style={{ padding: '4px 12px', backgroundColor: '#f9fafb' }}>+</button>
                  </div>
                  <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>${itemPrice}</span>
                  <button onClick={() => removeFromCart(item._id)} style={{ color: '#ef4444', fontWeight: '600', backgroundColor: 'transparent' }}>Remove</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Right: Price Details Card from Screenshot */}
      <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px', height: 'fit-content', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-gray)', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', marginBottom: '16px' }}>PRICE DETAILS</h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span>Total MRP</span>
          <span>${totalMRP}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#16a34a' }}>
          <span>Discount</span>
          <span>-${Math.round(totalDiscount)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <span>Delivery Charges</span>
          <span style={{ color: '#16a34a' }}>FREE</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--border-light)', paddingTop: '16px', marginBottom: '24px' }}>
          <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Final Price</span>
          <span style={{ fontWeight: '800', fontSize: '1.5rem' }}>${finalPrice}</span>
        </div>

        <button onClick={handleCheckout} style={{ width: '100%', backgroundColor: 'var(--brand-purple)', color: '#fff', padding: '14px', borderRadius: '4px', fontWeight: '700', fontSize: '1.05rem' }}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;