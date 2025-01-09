import { getRestaurantById } from '@/api/restaurantApi';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';
import AdminForm from '@/components/SuperAdmin/Restaurant/create/AdminFomr'
import { IRestaurant } from '@/types/schematypes';
import { formatRestaurantDataForTable } from '@/utils/formatData';
import React from 'react'

const page = async ({ params }: { params: Promise<{ restaurantId: string }> }) => {

  const { restaurantId } = await params;

  const restaurant = await getRestaurantById(restaurantId) as IRestaurant;

  return (
    <section>
      <HeaderwithBackButton heading='Admin Creation Form' />
      <AdminForm restaurant={restaurant} />
    </section>
  )
}

export default page