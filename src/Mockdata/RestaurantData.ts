// src/mockData/restaurantData.ts
import { Restaurant } from '@/types';

export const mockRestaurantData: Restaurant = {
    restaurantId: '3',
    name: 'Tasty Bites',
    description: 'Welcome to Tasty Bites, where you can enjoy the best dishes and an unforgettable dining experience.',
    location: '123 Flavor Street, Foodtown, USA',
    activeStatus: true,
    waitersId: ['w1', 'w2', 'w3'],
    menusId: ['m1'],  // Menus array, for now just one
};

// export const mockMenuItems: MenuItem[] = [
//     {
//         menuItemId: 'item1',
//         restaurantId: "3",
//         name: 'Spaghetti Carbonara',
//         description: 'Classic pasta with creamy sauce and pancetta.',
//         category: 'Main Course',
//         price: 12.99,
//         image: 'https://example.com/spaghetti-carbonara.jpg',
//         availability: true,
//     },
//     {
//         menuItemId: 'item2',
//         restaurantId: "3",
//         name: 'Caesar Salad',
//         description: 'Fresh greens with Caesar dressing and croutons.',
//         category: 'Appetizers',
//         price: 7.99,
//         image: 'https://example.com/caesar-salad.jpg',
//         availability: false,
//     },
//     {
//         menuItemId: 'item3',
//         restaurantId: "3",
//         name: 'Chocolate Lava Cake',
//         description: 'Decadent chocolate cake with a molten center.',
//         category: 'Desserts',
//         price: 5.99,
//         image: 'https://example.com/chocolate-lava-cake.jpg',
//         availability: true,
//     },
// ];

