import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
  const API_URL = 'http://localhost:5000/api';
  
  // Persistent State
  const [user, setUser] = useState(localStorage.getItem('shopez_user') || null);
  const [token, setToken] = useState(localStorage.getItem('shopez_token') || null);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('shopez_admin') === 'true');
  
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  // Perfected Auth Sync
  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/users/login`, { email, password });
    setUser(res.data.username);
    setToken(res.data.token);
    setIsAdmin(res.data.isAdmin === true); // Lock in boolean
    
    localStorage.setItem('shopez_user', res.data.username);
    localStorage.setItem('shopez_token', res.data.token);
    localStorage.setItem('shopez_admin', res.data.isAdmin);
  };

  const register = async (username, email, password, isAdminFlag) => {
    const res = await axios.post(`${API_URL}/users/register`, { username, email, password, isAdmin: isAdminFlag });
    setUser(res.data.username);
    setToken(res.data.token);
    setIsAdmin(res.data.isAdmin === true);
    
    localStorage.setItem('shopez_user', res.data.username);
    localStorage.setItem('shopez_token', res.data.token);
    localStorage.setItem('shopez_admin', res.data.isAdmin);
  };

  const logout = () => {
    setUser(null); setToken(null); setIsAdmin(false); setCart([]);
    localStorage.clear();
  };

  // Cart & Order Engine
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) return prev.map((item) => item._id === product._id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, amount) => {
    setCart((prev) => prev.map((item) => {
      if (item._id === id) {
        const newQty = item.qty + amount;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item._id !== id));

  const placeOrder = async (addressDetails) => {
    if (!token) throw new Error("Please log in first.");
    
    // Calculates total perfectly matching the UI cart
    const finalAmount = cart.reduce((acc, item) => {
      const currentPrice = item.price * (1 - (item.discount || 0) / 100);
      return acc + (currentPrice * item.qty);
    }, 0);

    const payload = {
      products: cart.map(item => ({ productId: item._id, quantity: item.qty })),
      amount: Math.round(finalAmount),
      address: addressDetails
    };
    
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axios.post(`${API_URL}/orders`, payload, config);
    setCart([]);
    return res.data;
  };

  return (
    <ShopContext.Provider value={{
      user, token, isAdmin, products, cart, loading,
      login, register, logout, addToCart, updateQty, removeFromCart, placeOrder, fetchProducts, API_URL
    }}>
      {children}
    </ShopContext.Provider>
  );
};