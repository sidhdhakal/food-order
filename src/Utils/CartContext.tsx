import React, { createContext, useState, useContext, ReactNode } from 'react';

type CartItem = {
  qty: number;
  name: string;
  image: string;
  itemId: number;
  size: string; // Include the size in the cart item
  price: number; // Store the price for this size
};

interface CartContextType {
  cart: { [key: string]: CartItem }; // Key will be a combination of product ID and size
  addToCart: (itemId: number, name: string, image: string, size: string, price: number) => void;
  removeFromCart: (itemId: number, size: string) => void;
  decreaseQuantity: (itemId: number, size: string) => void;
  clearCart: () => void; // Add function to clear the entire cart
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<{ [key: string]: CartItem }>({});

  const addToCart = (itemId: number, name: string, image: string, size: string, price: number) => {
    const cartKey = `${itemId}-${size}`; // Combine item ID and size to create a unique key
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[cartKey]) {
        updatedCart[cartKey].qty += 1; // Increase quantity if the item is already in the cart
      } else {
        updatedCart[cartKey] = { qty: 1, name, itemId, image, size, price }; // Add new item with size and price
      }
      return updatedCart;
    });
  };

  const removeFromCart = (itemId: number, size: string) => {
    const cartKey = `${itemId}-${size}`;
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[cartKey]) {
        delete updatedCart[cartKey]; // Remove item from cart by key
      }
      return updatedCart;
    });
  };

  const decreaseQuantity = (itemId: number, size: string) => {
    const cartKey = `${itemId}-${size}`;
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[cartKey]) {
        if (updatedCart[cartKey].qty > 1) {
          updatedCart[cartKey].qty -= 1; // Decrease quantity if greater than 1
        } else {
          delete updatedCart[cartKey]; // Remove item if quantity is 1
        }
      }
      return updatedCart;
    });
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCart({}); // Reset cart to an empty object
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
