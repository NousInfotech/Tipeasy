'use client'

import React, { useEffect } from 'react';
import RestaurantCountBox from './RestaurantCountBox';
import GenerateQRCodeBox from './GenerateQRCodeBox';
import OrdersCTA from './OrdersCTA';
import RestaurantCTA from './RestaurantCTA';
// mockData
import { tippings, orders } from '@/Mockdata/LineData';
import { Grid } from '@mui/material';
import SimpleLineChart from '../Comman/SimpleLineChart';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

const SuperAdmin = () => {

    const role = Cookie.get('userRole');
    const router = useRouter();

    useEffect(() => {
        if (role !== 'superadmin') {
            router.push('/login');
        }
    }, [role, router]); // Depend on role and router to rerun the effect if they change

    return (
        <section>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                    <RestaurantCountBox restaurantCount={32} />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <GenerateQRCodeBox />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <RestaurantCTA />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <OrdersCTA />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    {/* Tipping Chart */}
                    <SimpleLineChart
                        data={tippings} // Array of tipping data
                        title="Tipping Chart"
                        chartId={'1'}
                        borderColor={'green'}
                        backgroundColor={'white'}
                    // isOrders={false} // Determines the chart type
                    // initialTimePeriod="daily" // Initial filter
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    {/* Orders Chart */}
                    <SimpleLineChart
                        data={orders} // Array of order data
                        title="Order Chart"
                        chartId={'2'}
                        borderColor={'green'}
                        backgroundColor={'white'}                        // isOrders={true} // Determines the chart type
                    // initialTimePeriod="daily" // Initial filter
                    />
                </Grid>
            </Grid>
        </section>
    );
};

export default SuperAdmin;
