import { createContext, useContext, useEffect, useState } from "react";
import { usePaymentContext } from "./Payment";
import { UserContext } from "./User";

export const CartContext = createContext();
CartContext.displayName = "Cart";

export const CartProvider = ({ children }) => {
  let [cart, setCart] = useState([]);
  let [productsAmount, setProductsAmount] = useState(0);
  let [cartTotalValue, setCartTotalValue] = useState(0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        setCart,
        productsAmount,
        setProductsAmount,
        cartTotalValue,
        setCartTotalValue
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
    setProductsAmount,
    cartTotalValue,
    setCartTotalValue
  } = useContext(CartContext);
  const {
    paymentMethod
  } = usePaymentContext();
  const {
    setBalance
  } = useContext(UserContext);

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

  function makingPurchase() {
    setCart([]);
    setBalance(actualBalance => actualBalance - cartTotalValue);
  }

  useEffect(() => {
    const { amountProducts, newTotal } = cart.reduce((counting, product) => ({ 
      amountProducts: counting.amountProducts + product.amount,
      newTotal: counting.newTotal + (product.value * product.amount)
    }), {
      amountProducts: 0,
      newTotal: 0
    });
    setProductsAmount(amountProducts);
    setCartTotalValue(newTotal * paymentMethod.tax );
  }, [cart, setProductsAmount, setCartTotalValue, paymentMethod])

  return {
    cart,
    setCart,
    addProduct,
    removeProduct,
    productsAmount,
    cartTotalValue,
    makingPurchase
  }
}