// src/app/restaurants/[restaurantId]/page.tsx
import React from 'react';
import RestaurantHeader from '@/components/RestaurantHeader/RestaurantHeader';
import CTA from '@/components/CTA/CTA';
import BannerWithProfile from '@/components/BannerWithProfile/BannerWithProfile';

// Adjust the type to include async behavior of params
interface Params {
    restaurantId: string;
}

// Updated Page function with correct typing for params
const RestaurantPage = async ({ params }: { params: Promise<Params> }) => {
    // Resolve params if it is asynchronous
    const { restaurantId } = await params;

    return (
        <section>
            <BannerWithProfile />
            <div className='p-4'>
                <RestaurantHeader restaurantId={restaurantId} />
                <CTA
                    header="Explore Our Menu"
                    description="Tap QR Menu to explore our delicious dishes and order right from your phone!"
                    btnContent="Our Menu"
                    restaurantId={restaurantId} // Pass restaurantId to the client component
                    isWaiter={false}
                />
                <CTA
                    header="Show Your Appreciation"
                    description="Enjoyed the service? Tap Pay Tip to show your thanks!"
                    btnContent="Pay tips"
                    restaurantId={restaurantId} // Pass restaurantId to the client component
                    isWaiter={true}
                />
            </div>
        </section>
    );
};

export default RestaurantPage;
