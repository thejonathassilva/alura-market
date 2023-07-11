import { createContext, useContext, useState } from "react";

export const PaymentContext = createContext();
PaymentContext.displayName = "Payment";

export const PaymentProvider = ({ children }) => {
  const paymentType = [{
    name: "Boleto",
    tax: 1,
    id: 1
  },
  {
    name: "Cartão de Crédito",
    tax: 1.3,
    id: 2
  },
  {
    name: "Pix",
    tax: 1,
    id: 3
  },
  {
    name: "Crediário",
    tax: 1.5,
    id: 4
  }]

  const [paymentMethod, setPaymentMethod] = useState(paymentType[0]);

  return (
    <PaymentContext.Provider
      value={{
        paymentType,
        paymentMethod,
        setPaymentMethod
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}

export const usePaymentContext = () => {
  const {
    paymentType,
    paymentMethod,
    setPaymentMethod
  } = useContext(PaymentContext);

  function changePaymentMethod(id) {
    const actualPayment = paymentType.find(payment => payment.id === id);

    setPaymentMethod(actualPayment)
  }

  return {
    paymentMethod,
    paymentType,
    changePaymentMethod
  }
}