// src/app/restaurants/[restaurantId]/page.tsx
import React from 'react';
import RestaurantHeader from '@/components/RestaurantHeader/RestaurantHeader';
import CTA from '@/components/CTA/CTA';

interface Params {
    params: Promise<{ restaurantId: string }>;
}

const RestaurantPage: React.FC<Params> = async ({ params }) => {

    const { restaurantId } = await params;  // Get restaurantId from params

    return (
        <section>
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
        </section>
    );
};

export default RestaurantPage;
