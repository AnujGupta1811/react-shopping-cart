// App.js
import React from 'react';
import {Routes, Route,useParams } from 'react-router-dom'; 
import Home from '../Index'; 
import Cart from '../Product/AddToCart'; 
import Shop from '../Shop'; 
import Contact from '../Contact'; 
import CartShow from '../Cart'; 
import Login from '../Login/Login'; 
import Register from '../Login/Register'; 
import Logout from '../Login/Logout'; 
import Verification from '../Login/verification';
import Data from '../Product/ProductDetial';
import Search from '../Product/SearchProduct';

function App() {
    const { categoryId } = useParams();
  return (
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/search" element={<Search />} /> 
        <Route path="/carttoshow" element={<CartShow />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/logout" element={<Logout />} /> 
        <Route path="/shop" element={<Shop/>} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/verification" element={<Verification/>} />
        <Route path="/product/:id" element={<Data />} />
        <Route path="/shop/:categoryId" element={<Shop categoryId={categoryId}/>} />
      </Routes>
  );
}

export default App;
