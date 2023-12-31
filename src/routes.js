import Cart from 'pages/Cart';
import Login from 'pages/Login';
import Market from 'pages/Market';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from 'common/context/User';
import { CartProvider } from 'common/context/Cart';
import { PaymentProvider } from 'common/context/Payment';

export default function Router() {
  return (
    <UserProvider>
      <CartProvider>
        <PaymentProvider>
          <BrowserRouter>
              <Routes>
                  <Route
                    path='/'  
                    element={
                        <Login />
                    }
                  />
                  <Route
                    path='/feira'
                    element={
                          <Market/>
                    }
                  />
                <Route
                  path='/carrinho'
                  element={
                      <Cart/>
                    }
                    />
              </Routes>
          </BrowserRouter>
        </PaymentProvider>
      </CartProvider>
    </UserProvider>
  )
}
