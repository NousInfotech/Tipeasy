'use client';

import React from 'react';
import { Star } from 'lucide-react'; // For the rating star icon
import Image from 'next/image';
import assets from '../../../public/assets/assets';
import { IWaiter } from '@/types/schematypes';
import { useWaiter } from '@/app/context/WaiterContext';

interface WaiterComponentProps {
    waiter: IWaiter;
}

const WaiterComponent: React.FC<WaiterComponentProps> = ({ waiter }) => {

    const { setWaiter } = useWaiter();

    const handleClick = (waiter: IWaiter) => {
        setWaiter(waiter);
    };

    return (
        <div
            className="relative bg-accent3 w-full h-auto rounded-lg shadow-lg overflow-hidden"
            onClick={() => handleClick(waiter)}
        >
            {/* Waiter Image */}
            <Image
                src={assets.waiter}
                alt={waiter.name}
                className="w-full h-48 object-contain rounded-t-lg"
                width={108}
                height={118}
            />
            {/* Waiter Name and Rating */}
            <div className="absolute bottom-0 left-0 w-full bg-lightPrimary bg-opacity-50 text-white py-2 px-4 text-center rounded-b-lg">
                <p className="font-semibold text-lg">{waiter.name}</p>
            </div>
            <div className="absolute top-2 right-1 bg-lightPrimary flex flex-row justify-center rounded items-center space-x-1 mt-1">
                <Star fill="var(--ratingYellow)" size={12} className="text-ratingYellow" />
                <span className="filter invert text-xs font-normal">{waiter.ratings}</span>
            </div>
        </div>
    );
};

export default WaiterComponent;
