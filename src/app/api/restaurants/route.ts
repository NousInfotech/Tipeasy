// app/api/restaurants/route.ts

import { NextResponse } from 'next/server';
import { createRestaurant, getRestaurants } from '@/database/utils/queries'; // Import your DB functions
import { successResponse, errorResponse } from '@/utils/response'; // Reuse response functions
import connectDB from '@/database/connection';

// GET: Fetch all restaurants
export async function GET() {
    try {
        await connectDB();
        const restaurants = await getRestaurants(); // Adjust based on your DB function
        return NextResponse.json(successResponse('Restaurants fetched successfully', restaurants));
    } catch (error: any) {
        return NextResponse.json(errorResponse(error));
    }
}

// POST: Create a new restaurant
export async function POST(request: Request) {
    try {
        await connectDB();
        const restaurantData = await request.json();
        const newRestaurant = await createRestaurant(restaurantData);
        return NextResponse.json(successResponse('Restaurant created successfully', newRestaurant));
    } catch (error: any) {
        return NextResponse.json(errorResponse(error));
    }
}
