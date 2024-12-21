import { NextResponse } from 'next/server';
import { getRestaurantById, updateRestaurant, deleteRestaurant } from '@/database/utils/queries'; // Import DB functions
import { successResponse, errorResponse } from '@/utils/response'; // Reuse response functions
import { withDbConnection } from '@/database/utils/withDbConnection'; // Import the DB connection middleware
import { IRestaurant } from '@/types/schematypes'; // Assuming IRestaurant is defined
import { restaurantSchema } from '@/utils/validations'; // Assuming you have this validation schema
import { validateSchema } from '@/utils/validationUtils'; // Utility function to validate using Zod

interface Params {
    restaurantId: string;
}

/**
 * GET API Route handler to fetch a specific restaurant by ID from the database.
 * 
 * @param {Request} request - The incoming HTTP request object.
 * @param {object} context - The context object containing URL parameters.
 * @returns {NextResponse} - A response containing the status of the fetch operation.
 */
export const GET = withDbConnection(async (request: Request, context: { params: Promise<Params> }): Promise<NextResponse> => {
    try {
        const { restaurantId } = await context.params;

        if (!restaurantId) {
            return NextResponse.json(errorResponse('Restaurant ID is missing'), { status: 400 });
        }

        const restaurant = await getRestaurantById(restaurantId);

        if (!restaurant) {
            return NextResponse.json(errorResponse('Restaurant not found'), { status: 404 });
        }

        return NextResponse.json(successResponse('Restaurant fetched successfully', restaurant));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
});

/**
 * PUT API Route handler to update a specific restaurant by ID.
 * 
 * @param {Request} request - The incoming HTTP request object containing updated restaurant data in the body.
 * @param {object} context - The context object containing URL parameters.
 * @returns {NextResponse} - A response containing the status of the update operation.
 */
export const PUT = withDbConnection(async (request: Request, context: { params: Promise<Params> }): Promise<NextResponse> => {
    try {
        const { restaurantId } = await context.params;

        if (!restaurantId) {
            return NextResponse.json(errorResponse('Restaurant ID is missing'), { status: 400 });
        }

        const updatedData = await request.json();
        // Validate the updated data with the restaurant schema
        const validatedData = validateSchema(restaurantSchema, updatedData, true);

        const updatedRestaurant = await updateRestaurant(restaurantId, validatedData as IRestaurant);

        return NextResponse.json(successResponse('Restaurant updated successfully', updatedRestaurant));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
});

/**
 * DELETE API Route handler to delete a specific restaurant by ID.
 * 
 * @param {Request} request - The incoming HTTP request object.
 * @param {object} context - The context object containing URL parameters.
 * @returns {NextResponse} - A response containing the status of the delete operation.
 */
export const DELETE = withDbConnection(async (request: Request, context: { params: Promise<Params> }): Promise<NextResponse> => {
    try {
        const { restaurantId } = await context.params;

        if (!restaurantId) {
            return NextResponse.json(errorResponse('Restaurant ID is missing'), { status: 400 });
        }

        const result = await deleteRestaurant(restaurantId);

        return NextResponse.json(successResponse('Restaurant deleted successfully', result));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
});
