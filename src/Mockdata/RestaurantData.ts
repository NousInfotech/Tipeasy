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


export const waiters = [
    {
        "name": "Ramesh Kumar",
        "phoneNumber": "9876543210",
        "email": "ramesh.kumar@example.com",
        "restaurantId": "677d6f1c833c60c2b3be8f31",
        "ratings": 4.5,
        "imgSrc": "https://res.cloudinary.com/dkeraxhjs/image/upload/v1736499917/waiters/1200_x_1800_shank-1_aekuhz.jpg"
    },
    {
        "name": "Suresh Mehta",
        "phoneNumber": "9823456789",
        "email": "suresh.mehta@example.com",
        "restaurantId": "677d6f1c833c60c2b3be8f31",
        "ratings": 4.2,
        "imgSrc": "https://res.cloudinary.com/dkeraxhjs/image/upload/v1736445543/waiters/Untitled_design_-_Mahesh_V_R_myt4vb.png"
    },
    {
        "name": "Mahesh Sharma",
        "phoneNumber": "9123456780",
        "email": "mahesh.sharma@example.com",
        "restaurantId": "677d6f1c833c60c2b3be8f31",
        "ratings": 4.7,
        "imgSrc": "https://res.cloudinary.com/dkeraxhjs/image/upload/v1736445357/waiters/IMG_4260_asur0i.jpg"
    },
    {
        "name": "Ajay Singh",
        "phoneNumber": "9998765432",
        "email": "ajay.singh@example.com",
        "restaurantId": "677d6f1c833c60c2b3be8f31",
        "ratings": 4.8,
        "imgSrc": "https://res.cloudinary.com/dkeraxhjs/image/upload/v1734785129/waiters/ufnqy9ldjonljrd6mc3g.jpg"
    },
    {
        "name": "Vijay Patel",
        "phoneNumber": "9871234560",
        "email": "vijay.patel@example.com",
        "restaurantId": "677d6f1c833c60c2b3be8f31",
        "ratings": 4.6,
        "imgSrc": "https://res.cloudinary.com/dkeraxhjs/image/upload/v1736499917/waiters/1200_x_1800_shank-1_aekuhz.jpg"
    },
    {
        "name": "Deepak Joshi",
        "phoneNumber": "9987654321",
        "email": "deepak.joshi@example.com",
        "restaurantId": "677d6f1c833c60c2b3be8f31",
        "ratings": 4.3,
        "imgSrc": "https://res.cloudinary.com/dkeraxhjs/image/upload/v1736445543/waiters/Untitled_design_-_Mahesh_V_R_myt4vb.png"
    },
    {
        "name": "Rohan Verma",
        "phoneNumber": "9123546789",
        "email": "rohan.verma@example.com",
        "restaurantId": "677d6f1c833c60c2b3be8f31",
        "ratings": 4.9,
        "imgSrc": "https://res.cloudinary.com/dkeraxhjs/image/upload/v1736445357/waiters/IMG_4260_asur0i.jpg"
    },
    {
        "name": "Arjun Pandey",
        "phoneNumber": "9873456123",
        "email": "arjun.pandey@example.com",
        "restaurantId": "677d6f1c833c60c2b3be8f31",
        "ratings": 4.1,
        "imgSrc": "https://res.cloudinary.com/dkeraxhjs/image/upload/v1734785129/waiters/ufnqy9ldjonljrd6mc3g.jpg"
    }
]

export const menu = [
    {
        "title": "Paneer Butter Masala",
        "description": "Rich and creamy paneer curry with butter and spices.",
        "imgSrc": "https://res.cloudinary.com/dkeraxhjs/image/upload/v1736503017/menus/photo-1619193100179-af4cc742ed3e_ylb0t3.jpg",
        "price": 250,
        "category": "Main Course",
        "availability": true,
        "dietaryPreference": "veg",
        "restaurantId": "677d6f1c833c60c2b3be8f31"
    },
    {
        "title": "Chicken Biryani",
        "description": "Flavorful basmati rice layered with spiced chicken.",
        "imgSrc": "https://res.cloudinary.com/dkeraxhjs/image/upload/v1734785326/menus/a08dqsvpjn1lbumfchsp.jpg",
        "price": 350,
        "category": "Main Course",
        "availability": true,
        "dietaryPreference": "non-veg",
        "restaurantId": "677d6f1c833c60c2b3be8f31"
    },
    {
        "title": "Masala Dosa",
        "description": "Crispy dosa filled with spiced potato filling.",
        "imgSrc": "https://res.cloudinary.com/dkeraxhjs/image/upload/v1734785275/menus/kkc2qzwp5qelyx0qwyuk.jpg",
        "price": 150,
        "category": "Breakfast",
        "availability": true,
        "dietaryPreference": "veg",
        "restaurantId": "677d6f1c833c60c2b3be8f31"
    },
    {
        "title": "Veg Manchurian",
        "description": "Crispy vegetable balls in tangy Indo-Chinese sauce.",
        "imgSrc": "https://res.cloudinary.com/dkeraxhjs/image/upload/v1736503017/menus/photo-1619193100179-af4cc742ed3e_ylb0t3.jpg",
        "price": 220,
        "category": "Starters",
        "availability": true,
        "dietaryPreference": "veg",
        "restaurantId": "677d6f1c833c60c2b3be8f31"
    },
    {
        "title": "Butter Chicken",
        "description": "Tender chicken cooked in a creamy tomato-based sauce.",
        "imgSrc": "https://res.cloudinary.com/dkeraxhjs/image/upload/v1734785326/menus/a08dqsvpjn1lbumfchsp.jpg",
        "price": 320,
        "category": "Main Course",
        "availability": true,
        "dietaryPreference": "non-veg",
        "restaurantId": "677d6f1c833c60c2b3be8f31"
    },
    {
        "title": "Idli Sambar",
        "description": "Steamed rice cakes served with tangy lentil soup.",
        "imgSrc": "https://res.cloudinary.com/dkeraxhjs/image/upload/v1734785275/menus/kkc2qzwp5qelyx0qwyuk.jpg",
        "price": 120,
        "category": "Breakfast",
        "availability": true,
        "dietaryPreference": "veg",
        "restaurantId": "677d6f1c833c60c2b3be8f31"
    },
    {
        "title": "Egg Curry",
        "description": "Boiled eggs simmered in spicy curry sauce.",
        "imgSrc": "https://res.cloudinary.com/dkeraxhjs/image/upload/v1736503017/menus/photo-1619193100179-af4cc742ed3e_ylb0t3.jpg",
        "price": 180,
        "category": "Main Course",
        "availability": true,
        "dietaryPreference": "egg",
        "restaurantId": "677d6f1c833c60c2b3be8f31"
    }
]


