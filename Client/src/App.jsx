import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopContextProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <ShopContextProvider>
      <Router>
        <Navbar />
        <div style={{ minHeight: '85vh', fontFamily: 'Arial, sans-serif' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={<UserProfile />} /> {/* The previously missing route */}
          </Routes>
        </div>
      </Router>
    </ShopContextProvider>
  );
}

export default App;