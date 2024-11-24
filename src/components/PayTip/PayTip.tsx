import React, { useEffect } from 'react';
import HeaderwithBackButton from '../HeaderwithBackButton/HeaderwithBackButton';
import PayTipForm from './PayTipForm';
import { useParams, useSearchParams } from 'next/navigation';
import WaiterComponent from '../Waiters/Waiter';
import { useWaiter } from '@/context/WaiterContext';


const PayTip = () => {
    // Using useParams to get restaurantId (which could be undefined)
    const params = useParams();
    const restaurantId = Array.isArray(params?.restaurantId) ? params.restaurantId[0] : params?.restaurantId ?? '';

    // Using useSearchParams to get waiterId (which can be null)
    const searchParams = useSearchParams();
    const waiterId = searchParams.get('waiterId') ?? ''; // Fallback to empty string if null

    const { waiter, fetchWaiterData } = useWaiter();

    // If either restaurantId or waiterId is missing, you can either redirect or show an error message
    if (!restaurantId || !waiterId) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-red-500">Missing Restaurant or Waiter ID</h2>
            </div>
        );
    }
    else if (!waiter) {

        useEffect(() => {
            fetchWaiterData(waiterId)
        }, [waiter, restaurantId, waiterId])

        return (
            <div className="text-center mt-10">
                <h2 className="text-red-500">Missing Restaurant or Waiter ID</h2>
            </div>
        );
    }

    return (
        <section className='p-4 flex flex-col gap-4'>
            <HeaderwithBackButton heading="Pay Tip" />
            <div className='w-1/2 has-[425px]:w-1/3 sm:w-3/12 md:w-1/6  mx-auto'>
                <WaiterComponent waiter={waiter} />
            </div>
            <PayTipForm waiterId={waiterId} restaurantId={restaurantId} />
        </section>
    );
};

export default PayTip;


