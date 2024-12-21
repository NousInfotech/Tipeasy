'use client'

import React from 'react';
import { Star } from 'lucide-react'; // For the rating star icon
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import assets from '../../../public/assets/assets';

// Assuming Waiter interface is imported


interface WaiterComponentProps {
    waiter: WaiterList;
}

interface WaiterList {
    id: string;
    name: string;
    resataurantId: string;
    ratings: number;
    imgSrc: string;
}



const WaiterComponent: React.FC<WaiterComponentProps> = ({ waiter }) => {

    const params = useParams();
    const restaurantId = params?.restaurantId;


    const handleClick = (waiter: WaiterList) => {
        console.log(waiter)
    };

    return (
        <Link
            href={`/restaurant/${restaurantId}/paytip?waiterId=${waiter.id}`}
            passHref
        >
            <div className="relative bg-accent3 w-full h-auto rounded-lg shadow-lg overflow-hidden" onClick={() => handleClick(waiter)}>
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
                    <Star fill='var(--ratingYellow)' size={12} className='text-ratingYellow' />
                    <span className='filter invert text-xs font-normal'>{waiter.ratings}</span>
                </div>
            </div>
        </Link>
    );
};

export default WaiterComponent;
