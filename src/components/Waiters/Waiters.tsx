'use client'

import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import WaiterComponent from './Waiter';
import { IWaiter } from '@/types/schematypes';


interface WaiterProps {
    waiterList: IWaiter[]
}

const Waiters: React.FC<WaiterProps> = ({ waiterList }) => {
    const [filteredWaiters, setFilteredWaiters] = useState<IWaiter[]>(waiterList);

    const handleSearch = (query: string) => {
        if (!query) {
            setFilteredWaiters(waiterList);
        } else {
            setFilteredWaiters(
                waiterList.filter(waiter =>
                    waiter.name.toLowerCase().includes(query.toLowerCase())
                )
            );
        }
    };

    return (
        <section className='p-4'>
            {/* <CTA btnContent='Explore Our Menu' isWaiter={false} description='just a menu button' restaurantId={restaurantId} /> */}
            <SearchBar placeHolder='Find your Waiter' onSearch={handleSearch} />
            <div className="grid grid-cols-3 gap-4 rounded">
                {filteredWaiters?.map((waiter, index) => (
                    <WaiterComponent key={index} waiter={waiter as IWaiter} />
                ))}
            </div>
        </section>
    );
};

export default Waiters;
