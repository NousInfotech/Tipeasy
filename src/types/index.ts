// src/types/index.ts

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
    restaurantId:string;
    name: string;
    rating: number;   // Example: Waiter rating out of 5
    activeStatus: boolean;
}


// src/types/index.ts

export interface MenuItem {
    menuItemId: string;  // Unique ID for the menu item
    restaurantId:string;
    name: string;        // Name of the menu item
    description: string; // Description of the menu item
    category: string;    // E.g., "Appetizers", "Main Course", "Desserts"
    price: number;       // Price of the item
    image: string;       // URL to the image of the menu item
    availability: boolean; // Quantity available for this item
}
