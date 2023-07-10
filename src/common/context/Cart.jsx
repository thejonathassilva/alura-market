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

  function amountChange(id, amount) {
    return cart.map(cartItem => {
      if(cartItem.id === id) {
        cartItem.amount += amount;
      }
      return cartItem;
  })
}

  function addProduct(newProduct) {
    const hasProduct = cart.some(cartItem => cartItem.id === newProduct.id);
    if(!hasProduct) {
      newProduct.amount = 1;
      return setCart(lastCart => 
        [...lastCart, newProduct])
      }
      setCart(amountChange(newProduct.id, 1))
    }
    
    function removeProduct(id) {
      const product = cart.find(cartItem => cartItem.id === id);
      const isLast = product.amount === 1;
      if(isLast) {
        return setCart(lastCart => lastCart.filter(cartItem => cartItem.id !== id));
      }
      setCart(amountChange(id, -1))
    }
  return {
    cart,
    setCart,
    addProduct,
    removeProduct
  }
}