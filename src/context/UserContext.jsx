import { createContext, useContext, useState } from 'react';
import { pastOrders } from '../data/orders';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [isGuest, setIsGuest] = useState(true);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [savedOrders, setSavedOrders] = useState([]);

  const signIn = (name, email) => {
    setUser({ name, email });
    setIsGuest(false);
    setSavedOrders(pastOrders);
  };

  const signOut = () => {
    setUser(null);
    setIsGuest(true);
    setSavedOrders([]);
  };

  const addOrder = (order) => {
    setSavedOrders((prev) => [order, ...prev]);
  };

  return (
    <UserContext.Provider value={{ isGuest, user, address, setAddress, postcode, setPostcode, savedOrders, signIn, signOut, addOrder }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};
