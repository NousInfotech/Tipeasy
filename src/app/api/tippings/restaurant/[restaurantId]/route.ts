import { NextResponse } from 'next/server';
import { successResponse, errorResponse } from '@/utils/response'; // Reuse response functions
import { withDbConnection } from '@/database/utils/withDbConnection'; // Import the DB connection middleware
import { ITipping } from '@/types/schematypes'; // Assuming IRestaurant is defined
import { validateSchema } from '@/utils/validationUtils'; // Utility function to validate using Zod
import { tippingSchema } from '@/utils/validations';
import { getTippingsByRestaurantId, updateTipping } from '@/database/utils/queries';

interface Params {
    restaurantId: string;
}
/**
 * PUT API Route handler to update a specific tipping by ID.
 * 
 * @param {Request} request - The incoming HTTP request object containing updated tipping data in the body.
 * @param {object} context - The context object containing URL parameters.
 * @returns {NextResponse} - A response containing the status of the update operation.
 */
export const GET = withDbConnection(async (request: Request, context: { params: Promise<Params> }): Promise<NextResponse> => {
    try {
        const { restaurantId } = await context.params;

        if (!restaurantId) {
            return NextResponse.json(errorResponse('Restaurant ID is missing'), { status: 400 });
        }
        
        const updatedTipping = await getTippingsByRestaurantId(restaurantId);

        return NextResponse.json(successResponse('Tipping updated successfully', updatedTipping));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
});
