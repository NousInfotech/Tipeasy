import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton'
import React from 'react'
import RestaurantForm from './RestaurantForm'

const RestaurantCreate = () => {
    return (
        <section>
            <HeaderwithBackButton heading='Add Restaurants' />
            <RestaurantForm />
        </section>
    )
}

export default RestaurantCreate