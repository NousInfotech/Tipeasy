import { getMenuOrdersByRestaurantId } from '@/api/orderApi';
import { getRestaurantById, validateRestaurant } from '@/api/restaurantApi';
import RestaurantAdmin from '@/components/RestaurantAdmin/RestaurantAdmin'
import { IOrder, IRestaurant } from '@/types/schematypes';
import React from 'react'



interface Params {
    restaurantId: string;
}

const Page = async ({ params }: { params: Promise<Params> }) => {

    const { restaurantId } = await params;

    if (!restaurantId) {
        throw new Error('RestaurantId is missing');
    }

    const validateRestaurantId = await validateRestaurant(restaurantId);

    if (!validateRestaurantId) {
        throw new Error('RestaurantId is not in database');
    }

    const restaurant = await getRestaurantById(restaurantId) as IRestaurant

    const orders = await getMenuOrdersByRestaurantId(restaurantId) as IOrder[];

    return (
        <RestaurantAdmin restaurant={restaurant} orders={orders} />
    )
}

export default Page;