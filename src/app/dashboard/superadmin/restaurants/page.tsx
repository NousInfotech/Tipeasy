import RestaurantNormal from '@/components/SuperAdmin/Restaurant/RestaurantNormal'
import React from 'react'
import { IRestaurant } from '@/types/schematypes';
import { getRestaurants } from '@/api/restaurantApi';

const page = async () => {

    const restaurants = await getRestaurants() as IRestaurant[];

    return (
        <RestaurantNormal restaurants={restaurants} />
    )
}

export const dynamic = 'force-dynamic' 
export default page