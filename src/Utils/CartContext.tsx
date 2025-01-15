import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the cart item type
type CartItem = {
  id?: number;
  qty: number;
  item: any;
};

// Define the context shape
interface CartContextType {
  cart: { [id: number]: CartItem };
  addToCart: (itemId: number, itemData: any) => void;
  removeFromCart: (itemId: number) => void;
  decreaseQuantity: (itemId: number) => void; // New function signature
}

// Create the Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a custom hook to use the Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Define the props for the CartProvider component
interface CartProviderProps {
  children: ReactNode;
}

// Create the Cart Provider component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<{ [id: number]: CartItem }>({});

  const addToCart = (itemId: number, itemData: any) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[itemId]) {
        updatedCart[itemId].qty += 1; // Increase quantity if item exists
      } else {
        updatedCart[itemId] = { qty: 1, item: itemData }; // Add item if doesn't exist
      }
      return updatedCart;
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[itemId]) {
        delete updatedCart[itemId]; // Remove item from cart
      }
      return updatedCart;
    });
  };

  // Function to decrease the quantity of an item in the cart
  const decreaseQuantity = (itemId: number) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[itemId]) {
        if (updatedCart[itemId].qty > 1) {
          updatedCart[itemId].qty -= 1; // Decrease quantity if it's greater than 1
        } else {
          delete updatedCart[itemId]; // Remove item if quantity is 1 or less
        }
      }
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
