import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Management from './pages/Management';
import Login from './pages/Login';
import Home from './pages/layout';
import ItemDetail from './pages/layout/itemDetail/ItemDetail';
import CustomNavbar from './pages/layout/navbar/Navbar';
import Footer from './pages/layout/Footer/Footer';
import Cart from './pages/layout/cart/Cart';
import Checkout from './pages/layout/checkout/Checkout';
import Profile from './pages/layout/profile/Profile';
import Register from './pages/Register';
import Orders from './pages/layout/orders/Orders';
import Womens from './pages/layout/navbar/Womens';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/womens" element={<Womens />} />
          <Route path="/product/:id" element={<ItemDetail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/orders' element={<Orders />} />
          <Route path="/management" element={<Management />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
