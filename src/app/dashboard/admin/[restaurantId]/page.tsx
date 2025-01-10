import { validateRestaurant } from '@/api/restaurantApi';
import RestaurantAdmin from '@/components/RestaurantAdmin/RestaurantAdmin'
import { getOrdersByRestaurantId } from '@/database/utils/queries';
import { IOrder } from '@/types/schematypes';
import React from 'react'

interface Params {
    restaurantId: string;
}

const Page = async ({ params }: { params: Params }) => {
    const { restaurantId } = params;

    if (!restaurantId) {
        throw new Error('RestaurantId is missing');
    }

    const validateRestaurantId = await validateRestaurant(restaurantId);

    if (!validateRestaurantId) {
        throw new Error('RestaurantId is not in database');
    }

    const orders = (await getOrdersByRestaurantId(restaurantId)) as IOrder[];

    return (
        <RestaurantAdmin orders={orders}/>
    )
}

export default Page;