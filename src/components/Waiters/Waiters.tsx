'use client'

import React, { useState } from 'react';
import HeaderwithBackButton from '../HeaderwithBackButton/HeaderwithBackButton';
import SearchBar from '../SearchBar/SearchBar';
import { Waiter } from '@/types';
import waitersMockData from '@/Mockdata/WaiterData';
import WaiterComponent from './Waiter';
import CTA from '../CTA/CTA';

interface WaiterList {
    id: string;
    name: string;
    resataurantId: string,
    ratings: number,
    imgSrc: string
}

interface WaiterProps {
    waiterList: WaiterList[]
}

const Waiters: React.FC<WaiterProps> = ({ waiterList }) => {
    const [filteredWaiters, setFilteredWaiters] = useState<WaiterList[]>(waiterList);

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
                    <WaiterComponent key={index} waiter={waiter} />
                ))}
            </div>
        </section>
    );
};

export default Waiters;
