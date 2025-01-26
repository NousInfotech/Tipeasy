import { getRestaurants } from '@/api/restaurantApi';
import ResataurantQR from '@/components/SuperAdmin/Restaurant/ResataurantQR'
import { IRestaurant } from '@/types/schematypes';
import React from 'react'


const page = async () => {

    const restaurants = await getRestaurants({ cache: 'no-store' }) as IRestaurant[];


    return (
        <ResataurantQR restaurants={restaurants} />
    )
}

export default page