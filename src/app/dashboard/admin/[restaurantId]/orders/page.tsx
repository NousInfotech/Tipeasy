import { getMenuOrdersByRestaurantId } from '@/api/orderApi';
import { validateRestaurant } from '@/api/restaurantApi';
import { IOrder } from '@/types/schematypes';
import React from 'react'
import OrderListPage from '@/components/RestaurantAdmin/Orders/OrderListPage';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';



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
    const orders = await getMenuOrdersByRestaurantId(restaurantId) as IOrder[];

    return (
        <>
            <HeaderwithBackButton heading="Go Back" />
            <OrderListPage orders={orders} />
        </>
    );
};

export default Page;
