'use client'

import React from 'react';
import HeaderwithBackButton from '../HeaderwithBackButton/HeaderwithBackButton';
import PayTipForm from './PayTipForm';
import { useParams } from 'next/navigation';
import WaiterComponent from '../Waiters/Waiter';
import { useWaiter } from '@/app/context/WaiterContext';

const PayTip = () => {
    // Using useParams to get restaurantId (which could be undefined)
    const params = useParams();

    const { restaurantId } = params;

    const { waiter } = useWaiter();

    // Handle loading state and render loading message
    if (!waiter) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-gray-500">Loading Waiter Data...</h2>
            </div>
        );
    }

    return (
        <section className="p-4 flex flex-col gap-4">
            <HeaderwithBackButton heading="Pay Tip" />
            <div className="w-1/2 has-[425px]:w-1/3 sm:w-3/12 md:w-1/6 mx-auto">
                <WaiterComponent waiter={waiter} />
            </div>
            <PayTipForm waiterId={waiter._id as string} restaurantId={restaurantId as string} />
        </section>
    );
};

export default PayTip;
