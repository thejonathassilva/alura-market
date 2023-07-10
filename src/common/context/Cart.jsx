import { createContext, useContext, useState } from "react";

export const CartContext = createContext();
CartContext.displayName = "Cart";

export const CartProvider = ({ children }) => {
  let [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart}}>
       {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const {cart, setCart} = useContext(CartContext);

  function addProduct(newProduct) {
    const hasProduct = cart.some(cartItem => cartItem.id === newProduct.id);
    if(!hasProduct) {
      newProduct.amount = 1;
      return setCart(lastCart => 
        [...lastCart, newProduct])
    }
    setCart(lastCart => lastCart.map(cartItem => {
      if(cartItem.id === newProduct.id) {
        cartItem.amount += 1;
      }
      return cartItem;
    }))
  }

  return {
    cart,
    setCart,
    addProduct
  }
}