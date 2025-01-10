import { getMenuByRestaurantId, validateRestaurant } from '@/api/restaurantApi'
import QRMenuList from '@/components/RestaurantAdmin/QRMenu/QRMenuList'
import { IMenu } from '@/types/schematypes'
import React from 'react'

interface Params {
    restaurantId: string;
}

const page = async ({ params }: { params: Promise<Params> }) => {
    // Resolve params if it is asynchronous
    const { restaurantId } = await params;
    if (!restaurantId) {
        throw new Error('RestaurantId is missing');
    }

    const validateRestaurantId = await validateRestaurant(restaurantId);

    if (!validateRestaurantId) {
        throw new Error('RestaurantId is not in database');
    }

    const menus = (await getMenuByRestaurantId(restaurantId)) as IMenu[];

    if (!menus) {
        throw new Error('Menus are not available for this restaurant');
    }

    return (
        <QRMenuList menus={menus} />
    )
}

export default page;
