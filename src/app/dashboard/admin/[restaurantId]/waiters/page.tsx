import { getWaitersByRestaurantId, validateRestaurant } from '@/api/restaurantApi'
import WaiterList from '@/components/RestaurantAdmin/Waiter/WaiterList'
import { IWaiter } from '@/types/schematypes';
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

  const waiters = (await getWaitersByRestaurantId(restaurantId)) as IWaiter[];

  if (!waiters) {
    throw new Error('Waiters are not on this list');
  }


  return (
    <WaiterList waiters={waiters} />
  )
}

export default page