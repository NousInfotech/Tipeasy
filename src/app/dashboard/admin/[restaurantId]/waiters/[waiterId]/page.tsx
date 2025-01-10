import { getWaiterById } from '@/api/restaurantApi';
import EditWaiterForm from '@/components/RestaurantAdmin/Waiter/ViewWaiter/ViewWaiter';
import { IWaiter } from '@/types/schematypes';
import React from 'react'

interface Params {
    waiterId: string
}

const page = async ({ params }: { params: Promise<Params> }) => {

    const { waiterId } = await params

    if (!waiterId) console.error(`waiterId ${waiterId} cannot be found`);

    const waiter = await getWaiterById(waiterId as string) as IWaiter;

    return (
        <EditWaiterForm waiter={waiter} />
    )
}

export default page