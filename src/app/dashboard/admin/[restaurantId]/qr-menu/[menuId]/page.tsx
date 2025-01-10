import { getMenuByMenuId } from '@/api/restaurantApi'
import EditMenuForm from '@/components/RestaurantAdmin/QRMenu/EditMenuForm'
import { IMenu } from '@/types/schematypes'
import React from 'react'

interface Params {
    menuId: string
}

const page = async ({ params }: { params: Promise<Params> }) => {

    const { menuId } = await params

    if (!menuId) console.error(`menuId ${menuId} cannot be found`);

    const menu = await getMenuByMenuId(menuId) as IMenu

    return (
        <EditMenuForm menu={menu} />
    )
}

export default page