import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();
CartContext.displayName = "Cart";

export const CartProvider = ({ children }) => {
  let [cart, setCart] = useState([]);
  let [productsAmount, setProductsAmount] = useState(0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        setCart,
        productsAmount,
        setProductsAmount
      }}
    >
       {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const {
    cart, 
    setCart, 
    productsAmount, 
    setProductsAmount
  } = useContext(CartContext);

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

    useEffect(() => {
      const amountProducts = cart.reduce((counting, product) => counting + product.amount, 0);
      setProductsAmount(amountProducts);
    }, [cart, setProductsAmount])

  return {
    cart,
    setCart,
    addProduct,
    removeProduct,
    productsAmount
  }
}