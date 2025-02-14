import React, { createContext, useState, useContext, ReactNode } from 'react';
import toast from 'react-hot-toast';

type CartItem = {
  qty: number;
  name: string;
  image: string;
  itemId: number;
  category:string;
  size: string; 
  price: number; 
};

interface CartContextType {
  cart: { [key: string]: CartItem }; 
  addToCart: (itemId: number, name: string, image: string, category:string, size: string, price: number) => void;
  removeFromCart: (itemId: number, size: string) => void;
  decreaseQuantity: (itemId: number, size: string) => void;
  clearCart: () => void;
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

  const addToCart = (itemId: number, name: string, image: string,category:string, size: string, price: number) => {
    const cartKey = `${itemId}-${size}`;
    
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      const totalUniqueItems = Object.keys(updatedCart).length;
  
      if (!updatedCart[cartKey] && totalUniqueItems >= 5) {
        toast.error("You can only have up to 5 different items in your cart.");
        return prevCart;
      }
  
      if (updatedCart[cartKey]) {
        if (updatedCart[cartKey].qty >= 3) {
          toast.error("Maximum quantity per item is 3.");
          return prevCart;
        }
        updatedCart[cartKey].qty += 1;
      } else {
        updatedCart[cartKey] = { qty: 1, name, itemId, image,category, size, price };
      }
  
      return updatedCart;
    });
  };
  

  const removeFromCart = (itemId: number, size: string) => {
    const cartKey = `${itemId}-${size}`;
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[cartKey]) {
        delete updatedCart[cartKey]; 
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
          updatedCart[cartKey].qty -= 1; 
        } else {
          delete updatedCart[cartKey]; 
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
