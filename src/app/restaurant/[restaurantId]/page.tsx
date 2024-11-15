// src/app/restaurants/[restaurantId]/page.tsx
import React from 'react';
import RestaurantHeader from '@/components/RestaurantHeader/RestaurantHeader';
import CTA from '@/components/CTA/CTA';
import BannerWithProfile from '@/components/BannerWithProfile/BannerWithProfile';

// Adjust the type to match Next.js' inferred types for dynamic routes
interface Params {
    restaurantId: string;
}

// Use Async Page function with a dynamic route
const RestaurantPage = async ({ params }: { params: Params }) => {
    const { restaurantId } = params; // Extract restaurantId from params

    // Mocked restaurant data (replace with real API call as needed)
    // const restaurant = await fetchRestaurantData(restaurantId);
    // const menuItems = await fetchMenuItems(restaurantId);

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
