import { getRestaurantById } from '@/api/restaurantApi';
import ViewRestaurant from '@/components/SuperAdmin/Restaurant/ViewRestaurant/ViewRestaurant';
import { IRestaurant } from '@/types/schematypes';
import React from 'react'

interface Params {
    restaurantId: string;
}

const page = async ({ params }: { params: Promise<Params> }) => {


    const { restaurantId } = await params;

    const restaurnt = await getRestaurantById(restaurantId) as IRestaurant;


    return (
        <ViewRestaurant restaurant={restaurnt} />
    )
}

export default page


