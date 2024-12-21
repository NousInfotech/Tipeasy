'use client'
// context/WaiterContext.tsx


import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Waiter } from '@/types';
import waitersMockData from '@/Mockdata/WaiterData';

interface WaiterContextType {
    waiter: Waiter | null;
    setWaiter: (waiter: Waiter) => void;
    fetchWaiterData: (waiter: string) => void;
}

const WaiterContext = createContext<WaiterContextType | undefined>(undefined);

export const useWaiter = () => {
    const context = useContext(WaiterContext);
    if (!context) {
        throw new Error('useWaiter must be used within a WaiterProvider');
    }
    return context;
};

export const WaiterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [waiter, setWaiter] = useState<Waiter | null>(null);

    const fetchWaiterData = (waiterId: string) => {
        // fetch watier data in db later

        const waiter = waitersMockData.find((waiter) => waiter.waiterId === waiterId);
        setWaiter(waiter || null);
    }

    return (
        <WaiterContext.Provider value={{ waiter, setWaiter, fetchWaiterData }}>
            {children}
        </WaiterContext.Provider>
    );
};
