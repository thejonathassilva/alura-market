import { createContext, useState } from 'react';

export const UserContext = createContext();
UserContext.displayName = "User";

export const UserProvider = ({ children }) => {
  let [name, setName] = useState(''); 
  let [balance, setBalance] = useState(0);

  return (
    <UserContext.Provider value={{ name, setName, balance, setBalance }}>
      {children}
    </UserContext.Provider>
  )
}