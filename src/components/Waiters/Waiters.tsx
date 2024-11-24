'use client'

import React, { useState } from 'react';
import HeaderwithBackButton from '../HeaderwithBackButton/HeaderwithBackButton';
import SearchBar from '../SearchBar/SearchBar';
import { Waiter } from '@/types';
import waitersMockData from '@/Mockdata/WaiterData';
import WaiterComponent from './Waiter';

const Waiters: React.FC = () => {
    const [filteredWaiters, setFilteredWaiters] = useState<Waiter[]>(waitersMockData);

    const handleSearch = (query: string) => {
        if (!query) {
            setFilteredWaiters(waitersMockData);
        } else {
            setFilteredWaiters(
                waitersMockData.filter(waiter =>
                    waiter.name.toLowerCase().includes(query.toLowerCase())
                )
            );
        }
    };


    return (
        <section className='p-4'>
            <HeaderwithBackButton heading="Pay Tips" />
            <SearchBar onSearch={handleSearch} />
            <div className="grid grid-cols-3 gap-4 rounded">
                {filteredWaiters.map(waiter => (
                    <WaiterComponent key={waiter.waiterId} waiter={waiter} />
                ))}
            </div>
        </section>
    );
};

export default Waiters;
