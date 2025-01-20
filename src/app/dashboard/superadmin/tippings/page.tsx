// import { getTippings } from '@/api/tippingsApi';
import TippingNormal from '@/components/SuperAdmin/Tipping/TippingNormal'
import { fakeTippings } from '@/Mockdata/RestaurantTableData';
import { ITipping } from '@/types/schematypes';
import React from 'react'

const page = async () => {

    const getMockTippings = async () => {
        return fakeTippings
    }

    const tippings = await getMockTippings() as ITipping[];

    return (
        <TippingNormal tippingData={tippings} />
    )
}

export default page