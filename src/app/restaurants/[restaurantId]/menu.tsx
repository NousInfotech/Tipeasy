// src/app/restaurants/[restaurantId]/menu.tsx
"use client"

import React from 'react';

interface Params {
    restaurantId: string; // Type the restaurantId param as a string
}

const Menu: React.FC<{ params: Params }> = ({ params }) => {
    const { restaurantId } = params;



    // Ensure restaurantId is a string
    if (typeof restaurantId !== 'string') {
        return <div>Invalid restaurant ID</div>;
    }

    return (
        <div>
            <h1>Menu for Restaurant {restaurantId}</h1>
            <ul>
                <li>Pizza</li>
                <li>Burger</li>
                <li>Pasta</li>
                {/* Add more menu items as needed */}
            </ul>
        </div>
    );
};

export default Menu;
