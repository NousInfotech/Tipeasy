import { NextResponse } from 'next/server';
import { successResponse, errorResponse } from '@/utils/response'; // Reuse response functions
import { withDbConnection } from '@/database/utils/withDbConnection'; // Import the DB connection middleware
import { ITipping } from '@/types/schematypes'; // Assuming IRestaurant is defined
import { validateSchema } from '@/utils/validationUtils'; // Utility function to validate using Zod
import { tippingSchema } from '@/utils/validations';
import { updateTipping } from '@/database/utils/queries';

interface Params {
    tippingId: string;
}
/**
 * PUT API Route handler to update a specific tipping by ID.
 * 
 * @param {Request} request - The incoming HTTP request object containing updated tipping data in the body.
 * @param {object} context - The context object containing URL parameters.
 * @returns {NextResponse} - A response containing the status of the update operation.
 */
export const PUT = withDbConnection(async (request: Request, context: { params: Promise<Params> }): Promise<NextResponse> => {
    try {
        const { tippingId } = await context.params;

        if (!tippingId) {
            return NextResponse.json(errorResponse('Tipping ID is missing'), { status: 400 });
        }

        const updatedData = await request.json();


        // Validate the updated data with the tipping schema
        const validatedData = validateSchema(tippingSchema, updatedData, true);

        const updatedTipping = await updateTipping(tippingId, validatedData as ITipping);

        return NextResponse.json(successResponse('Tipping updated successfully', updatedTipping));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
});
