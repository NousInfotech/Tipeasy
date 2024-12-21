import { successResponse, errorResponse } from "@/utils/response";
import { withDbConnection } from "@/database/utils/withDbConnection";
import { createRestaurant, getRestaurants } from "@/database/utils/queries";
import { NextResponse } from "next/server";
import { restaurantSchema } from "@/utils/validations";
import { IRestaurant } from "@/types/schematypes";

/**
 * GET API Route handler to fetch all restaurants from the database.
 * 
 * @returns {NextResponse} - A response containing the list of restaurants.
 */
export const GET = withDbConnection(async (): Promise<NextResponse> => {
    try {
        const restaurants = await getRestaurants(); // Adjust based on your DB function
        return NextResponse.json(successResponse('Restaurants fetched successfully', restaurants));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});

/**
 * POST API Route handler to create a new restaurant in the database.
 * Validates the request body using Zod schema before creating the restaurant.
 *
 * @param {Request} request - The incoming HTTP request object containing restaurant data in the body.
 * 
 * @returns {NextResponse} - A response containing the status of the restaurant creation.
 */
export const POST = withDbConnection(async (request: Request): Promise<NextResponse> => {
    try {
        // Parse and validate the restaurant data using Zod schema
        const restaurantData = await request.json();
        const validateData = restaurantSchema.parse(restaurantData);
        
        // Call the function to create a new restaurant
        const newRestaurant = await createRestaurant(validateData as IRestaurant);
        
        return NextResponse.json(successResponse('Restaurant created successfully', newRestaurant));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});
