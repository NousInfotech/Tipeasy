import React from 'react'
import { Grid2 } from '@mui/material'
import RestaurantCountBox from './RestaurantCountBox'
import GenerateQRCodeBox from './GenerateQRCodeBox'
import OrdersCTA from './OrdersCTA'
import RestaurantCTA from './RestaurantCTA'
import SimpleLineChart from '../Comman/SimpleLineChart'

// mockData
import { tippings, orders } from '@/Mockdata/LineData'

const SuperAdmin = () => {
    return (
        <section>
            <Grid2 container spacing={2}>
                <Grid2 size={6}>
                    <RestaurantCountBox restaurantCount={32} />
                </Grid2>
                <Grid2 size={6}>
                    <GenerateQRCodeBox />
                </Grid2>
                <Grid2 size={6}>
                    <RestaurantCTA />
                </Grid2>
                <Grid2 size={6}>
                    <OrdersCTA />
                </Grid2>
                <Grid2 size={6}>
                    <SimpleLineChart data={tippings} isOrders={false} initialTimePeriod="daily" />
                </Grid2>
                <Grid2 size={6}>
                    <SimpleLineChart data={orders} isOrders={true} initialTimePeriod="daily" />
                </Grid2>
            </Grid2>

        </section>
    )
}

export default SuperAdmin