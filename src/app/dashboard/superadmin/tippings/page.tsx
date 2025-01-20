import { getTippings } from '@/api/tippingsApi';
import TippingNormal from '@/components/SuperAdmin/Tipping/TippingNormal'
import { ITipping } from '@/types/schematypes';
import React from 'react'

const page = async () => {

    const tippings = await getTippings() as ITipping[];

    return (
        <TippingNormal tippingData={tippings} />
    )
}

export default page