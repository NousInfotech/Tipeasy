// src/app/restaurants/[restaurantId]/page.tsx
import React from 'react';
import RestaurantHeader from '@/components/RestaurantHeader/RestaurantHeader';
import CTA from '@/components/CTA/CTA';
import BannerWithProfile from '@/components/BannerWithProfile/BannerWithProfile';

// Mock Data
import { mockRestaurantData, mockMenuItems } from '@/Mockdata/RestaurantData';
import { MenuItem } from '@/types';

interface Params {
    params: { restaurantId: string };
}

const RestaurantPage: React.FC<Params> = async ({ params }) => {

    const { restaurantId } = await params;  // Get restaurantId from params

    // Mocked restaurant data
    const restaurant = mockRestaurantData;  // In reality, this would be fetched using the restaurantId
    const menuItems = mockMenuItems; // In reality, these items would be fetched for this specific restaurant

    return (
        <section>
            <BannerWithProfile />
            <div className='p-4'>
                <RestaurantHeader restaurantId={restaurantId} />
                <CTA
                    header="Explore Our Menu"
                    description="Tap QR Menu to explore our delicious dishes and order right from your phone!"
                    btnContent="Our Menu"
                    restaurantId={restaurantId}  // Pass restaurantId to the client component
                    isWaiter={false}
                />
                <CTA
                    header="Show Your Appreciation"
                    description="Enjoyed the service? Tap Pay Tip to show your thanks!"
                    btnContent="Pay tips"
                    restaurantId={restaurantId}  // Pass restaurantId to the client component
                    isWaiter={true}
                />
            </div>
        </section>
    );
};

export default RestaurantPage;

