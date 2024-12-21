// WaiterContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IWaiter } from '@/types/schematypes'; // Import the IWaiter type

// Define the context type
interface WaiterContextType {
    waiter: IWaiter | null;
    setWaiter: (waiter: IWaiter) => void;
}

// Create a context with a default value of undefined
const WaiterContext = createContext<WaiterContextType | undefined>(undefined);

// WaiterProvider component to wrap the app and provide context
export const WaiterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [waiter, setWaiter] = useState<IWaiter | null>(null);

    return (
        <WaiterContext.Provider value={{ waiter, setWaiter }}>
            {children}
        </WaiterContext.Provider>
    );
};

// Custom hook to use the WaiterContext
export const useWaiter = (): WaiterContextType => {
    const context = useContext(WaiterContext);
    if (!context) {
        throw new Error('useWaiter must be used within a WaiterProvider');
    }
    return context;
};
