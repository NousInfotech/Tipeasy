'use client'

import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import WaiterComponent from './Waiter';
import { IWaiter } from '@/types/schematypes';
import Link from 'next/link';
import { useParams } from 'next/navigation';


interface WaiterProps {
    waiterList: IWaiter[]
}

const Waiters: React.FC<WaiterProps> = ({ waiterList }) => {
    const [filteredWaiters, setFilteredWaiters] = useState<IWaiter[]>(waiterList);

    const params = useParams();

    const { restaurantId } = params

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
            <h1 className="m-0 text-xl font-bold text-[#98B03C] ml-2 leading-7 whitespace-nowrap">Tip Easyy</h1>
            <Link href={restaurantId + '/menu'}>
                <button className='w-full mt-4 p-3 rounded-lg text-xs bg-primary text-white hover:bg-primary-dark'>
                    Explore our Menu
                </button>
            </Link>
            <SearchBar placeHolder='Find your Waiter to Tip' onSearch={handleSearch} />
            <div className="grid grid-cols-3 gap-4 rounded">
                {filteredWaiters?.map((waiter, index) => (
                    <WaiterComponent key={index} waiter={waiter as IWaiter} />
                ))}
            </div>
        </section>
    );
};

export default Waiters;
