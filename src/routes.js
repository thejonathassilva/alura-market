import Cart from 'pages/Cart';
import Login from 'pages/Login';
import Market from 'pages/Market';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function Router() {
  const [name, setName] = useState(''); 
  const [balance, setBalance] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'  
          element={<Login
            name={name}
            setName={setName}
            balance={balance}
            setBalance={setBalance}
          />}
        />
        <Route
          path='/feira'
          element={<Market/>}
        />
        <Route
          path='/carrinho'
          element={<Cart/>}
        />
      </Routes>
    </BrowserRouter>
  )
}
