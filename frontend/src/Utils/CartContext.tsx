import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';

type CartItem = {
  qty: number;
  name: string;
  image: string;
  itemId: number;
  category: string;
  size: string; 
  price: number; 
};

interface CartContextType {
  cart: { [key: string]: CartItem }; 
  addToCart: (itemId: number, name: string, image: string, category: string, size: string, price: number) => void;
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

const getCartFromStorage = (): { [key: string]: CartItem } => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return {};
  }
};

const saveCartToStorage = (cart: { [key: string]: CartItem }) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<{ [key: string]: CartItem }>({});

  useEffect(() => {
    const savedCart = getCartFromStorage();
    setCart(savedCart);
  }, []);

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const addToCart = (itemId: number, name: string, image: string, category: string, size: string, price: number) => {
    const cartKey = `${itemId}-${size}`;
    
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      const totalUniqueItems = Object.keys(updatedCart).length;
  
      if (!updatedCart[cartKey] && totalUniqueItems >= 4) {
        toast.error("You can only have up to 4 different items in your cart.");
        return prevCart;
      }
  
      if (updatedCart[cartKey]) {
        if (updatedCart[cartKey].qty >= 5) {
          toast.error("Maximum quantity per item is 5.");
          return prevCart;
        }
        updatedCart[cartKey].qty += 1;
      } else {
        updatedCart[cartKey] = { qty: 1, name, itemId, image, category, size, price };
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

  const clearCart = () => {
    setCart({}); 
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};