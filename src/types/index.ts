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

// Type for a linked provider object
export interface ProviderUserInfo {
    providerId: string; // The ID of the provider (e.g., "password", "google.com")
    displayName?: string; // The display name provided by the provider
    photoUrl?: string; // The photo URL provided by the provider
    federatedId?: string; // The federated ID for the provider
    email?: string; // The email address from the provider
    rawId?: string; // The raw ID from the provider
    screenName?: string; // The screen name from the provider
}

// Type for a single user object
export interface FirebaseUser {
    uid: string,
    localId: string; // The unique ID (UID) of the user
    email?: string; // The email address of the user
    emailVerified: boolean; // Whether the email is verified
    displayName?: string; // The display name of the user
    providerUserInfo?: ProviderUserInfo[]; // List of linked provider information
    photoUrl?: string; // The photo URL of the user
    passwordHash?: string; // The hashed password of the user
    passwordUpdatedAt?: number; // Timestamp (in ms) when the password was last updated
    validSince?: string; // Timestamp (in seconds) marking token revocation boundary
    disabled?: boolean; // Whether the account is disabled
    lastLoginAt?: string; // Timestamp (in ms) of the last login
    createdAt?: string; // Timestamp (in ms) when the account was created
    customAuth?: boolean; // Whether the account uses custom authentication
}

// Type for the entire Firebase API response
export interface FirebaseResponse {
    users: FirebaseUser[]; // Array of users associated with the provided ID token
}


