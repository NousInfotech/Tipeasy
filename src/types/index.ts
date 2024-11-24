// src/types/index.ts

import { StaticImageData } from "next/image";

export interface Restaurant {
    restaurantId: string;
    name: string;
    description: string;
    location: string;
    activeStatus: boolean;
    waitersId: string[];  // List of waiter IDs
    menusId: string[];    // List of menu IDs
}

export interface Waiter {
    waiterId: string;
    restaurantId: string;
    name: string;
    // imageSrc: string;
    imageSrc: StaticImageData;
    rating: number;   // Example: Waiter rating out of 5
    activeStatus: boolean;
}


// src/types/index.ts


export interface MenuItem {
    id: number;        // Unique ID for the menu item
    restaurantId: string;
    name: string;      // Name of the menu item
    category: string;  // E.g., "Food", "Salads"
    price: number;     // Price of the item
    availability: boolean; // Quantity available for this item
    tag: 'veg' | 'non-veg' | 'egg'; // New tag for filtering items
    imageSrc: string;
    // description and image yet to be added 
}

