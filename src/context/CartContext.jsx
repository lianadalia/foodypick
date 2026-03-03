import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null);

  const addItem = useCallback((restaurantId, item, quantity, selectedModifiers) => {
    setRestaurantId(restaurantId);
    setItems((prev) => {
      const key = `${item.id}-${JSON.stringify(selectedModifiers)}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => i.key === key ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { key, item, quantity, selectedModifiers, restaurantId }];
    });
  }, []);

  const updateQuantity = useCallback((key, quantity) => {
    if (quantity <= 0) {
      setItems((prev) => {
        const next = prev.filter((i) => i.key !== key);
        if (next.length === 0) setRestaurantId(null);
        return next;
      });
    } else {
      setItems((prev) => prev.map((i) => i.key === key ? { ...i, quantity } : i));
    }
  }, []);

  const removeItem = useCallback((key) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.key !== key);
      if (next.length === 0) setRestaurantId(null);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setRestaurantId(null);
  }, []);

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = items.reduce((sum, i) => {
    const modifierCost = (i.selectedModifiers || []).reduce((s, m) => s + (m.price || 0), 0);
    return sum + (i.item.price + modifierCost) * i.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ items, restaurantId, addItem, updateQuantity, removeItem, clearCart, cartCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
