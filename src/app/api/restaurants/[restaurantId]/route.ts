// app/api/restaurants/[restaurantId]/route.ts

import { NextResponse } from 'next/server';
import { getRestaurantById, updateRestaurant, deleteRestaurant } from '@/database/utils/queries'; // Import DB functions
import { successResponse, errorResponse } from '@/utils/response'; // Reuse response functions
import connectDB from '@/database/connection';

interface Params {
    restaurantId: string;
}

// PUT: Get a specific restaurant by ID
export async function GET(request: Request, context: { params: Promise<Params> }) {
    const { restaurantId } = await context.params; // Access restaurantId from context.params

    try {
        if (!restaurantId) {
            return NextResponse.json(errorResponse('Restaurant ID is missing'), { status: 400 });
        }

        await connectDB();
        const restaurant = await getRestaurantById(restaurantId); // Fetch restaurant from DB

        if (!restaurant) {
            return NextResponse.json(errorResponse('Restaurant not found'), { status: 404 });
        }

        return NextResponse.json(successResponse('Restaurant fetched successfully', restaurant));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
}
// PUT: Update a specific restaurant by ID
export async function PUT(request: Request, context: { params: Promise<Params> }) {
    try {
        await connectDB();
        const updatedData = await request.json(); // Get the updated data from the request body

        // Await the params to resolve the restaurantId
        const { restaurantId } = await context.params;

        // Call your update function with restaurantId and updated data
        const updatedRestaurant = await updateRestaurant(restaurantId, updatedData);

        return NextResponse.json(successResponse('Restaurant updated successfully', updatedRestaurant));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
}

// DELETE: Delete a specific restaurant by ID
export async function DELETE(request: Request, context: { params: Promise<Params> }) {
    try {
        await connectDB();

        // Await the params to resolve the restaurantId
        const { restaurantId } = await context.params;

        // Call your delete function with restaurantId
        const result = await deleteRestaurant(restaurantId); // Delete from DB

        return NextResponse.json(successResponse(result.message, result));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
}
