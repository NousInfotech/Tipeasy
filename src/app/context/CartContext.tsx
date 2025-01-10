'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Define the shape of a cart item
interface CartItem {
  id: string;
  quantity: number;
}

// Define the shape of the cart state
interface CartState {
  items: CartItem[];
}

// Define cart actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'CLEAR_CART' };

// Key for localStorage
const LOCAL_STORAGE_KEY = 'cartState';

const initialCartState: CartState = {
  items: [],
};

// Retrieve initial state from localStorage or use the default
const getInitialCartState = (): CartState => {
  if (typeof window === "undefined") return initialCartState;

  try {
    const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : initialCartState;
  } catch (error) {
    console.error("Error parsing cart state from localStorage:", error);
    return initialCartState;
  }
};



// Cart reducer to handle cart actions
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { id: action.payload.id, quantity: 1 }],
      };
    }
    case 'UPDATE_ITEM': {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    }
    case 'CLEAR_CART': {
      return { items: [] };
    }
    default:
      return state;
  }
};

// Create the Cart Context
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

// Cart Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, getInitialCartState());


  // Update localStorage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
