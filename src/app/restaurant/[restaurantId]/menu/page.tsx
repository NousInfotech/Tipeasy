import { getMenuByRestaurantId, validateRestaurant } from '@/api/restaurantApi';
import MenuPage from '@/components/MenuPage/MenuPage'
import { IMenu } from '@/types/schematypes';
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

  const menu = await getMenuByRestaurantId(restaurantId) as IMenu[];

  return (
    <MenuPage menuData={menu} />
  )
}

export default Page