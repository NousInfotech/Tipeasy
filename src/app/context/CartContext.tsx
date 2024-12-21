'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the shape of a cart item
interface CartItem {
  id: number; // Unique product ID
  quantity: number; // Quantity of the product
}

// Define the shape of the cart state
interface CartState {
  items: CartItem[];
}

// Define cart actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: { id: number } }
  | { type: 'UPDATE_ITEM'; payload: { id: number; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'CLEAR_CART' };

// Define the initial cart state
const initialCartState: CartState = {
  items: [],
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
      return initialCartState;
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
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

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
