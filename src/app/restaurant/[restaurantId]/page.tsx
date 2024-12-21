import React from 'react';
import Waiters from '@/components/Waiters/Waiters';
import { getWaitersByRestaurantId, validateRestaurant } from '@/api/restaurantApi';

interface WaiterList {
    id: string;
    name: string;
    resataurantId: string;
    ratings: number;
    imgSrc: string;
}


interface Params {
    restaurantId: string;
}

// Updated Page function with correct typing for params
const RestaurantPage = async ({ params }: { params: Promise<Params> }) => {
    // Resolve params if it is asynchronous
    const { restaurantId } = await params;
    if (!restaurantId) {
        throw new Error('RestaurantId is missing');
    }

    const validateRestaurantId = await validateRestaurant(restaurantId);

    if (!validateRestaurantId) {
        throw new Error('RestaurantId is not in database');
    }

    const waiters = (await getWaitersByRestaurantId(restaurantId)) as WaiterList[];

    if (!waiters) {
        throw new Error('Waiters are not on this list');
    }

    return (
        <section>
            <Waiters waiterList={waiters} />
        </section>
    );
};

export default RestaurantPage;
