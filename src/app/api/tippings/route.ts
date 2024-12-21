import { successResponse, errorResponse } from "@/utils/response";
import { withDbConnection } from "@/database/utils/withDbConnection";
import { createTippingByWaiterId, getTippingsByRestaurantId, getTippingsByWaiterId } from "@/database/utils/queries";
import { NextRequest, NextResponse } from "next/server";
import { tippingSchema } from "@/utils/validations"; // Assuming tippingSchema is defined
import { validateSchema, validateWaiter, validateRestaurant } from "@/utils/validationUtils";

/**
 * GET API Route handler to fetch all tippings for a given restaurant from the database.
 * 
 * @returns {NextResponse} - A response containing the list of tippings.
 */
export const GET = withDbConnection(async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { searchParams } = new URL(request.url);
        const restaurantId = searchParams.get("restaurantId");
        const waiterId = searchParams.get("waiterId");

        // Validate at least one of the IDs is provided
        if (!restaurantId && !waiterId) {
            throw new Error("Either restaurantId or waiterId must be provided.");
        }

        // If restaurantId is provided, validate it
        if (restaurantId) {
            await validateRestaurant(restaurantId);
        }

        // Fetch tippings based on either restaurantId or waiterId
        let tippings;
        if (restaurantId) {
            tippings = await getTippingsByRestaurantId(restaurantId);
        } else if (waiterId) {
            tippings = await getTippingsByWaiterId(waiterId);
        }

        return NextResponse.json(successResponse('Tippings fetched successfully', tippings));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});


/**
 * POST API Route handler to create a new tipping for a waiter in the database.
 * Validates the request body using Zod schema before creating the tipping.
 *
 * @param {NextRequest} request - The incoming HTTP request object containing tipping data in the body.
 * 
 * @returns {NextResponse} - A response containing the status of the tipping creation.
 */
export const POST = withDbConnection(async (request: NextRequest): Promise<NextResponse> => {
    try {
        // Parse and validate the tipping data using Zod schema
        const tippingData = await request.json();

        // Validate the restaurantId
        await validateRestaurant(tippingData.restaurantId);

        // Validate the tipping data using schema validation
        const validatedTippingData = validateSchema(tippingSchema, tippingData);

        // Validate the waiterId for the tipping
        await validateWaiter(validatedTippingData.waiterId);

        validatedTippingData.dateTime = new Date();

        // Create the tipping with the validated data, passing each argument explicitly
        const newTipping = await createTippingByWaiterId(
            validatedTippingData.waiterId, // Waiter ID
            validatedTippingData.restaurantId, // Restaurant ID
            validatedTippingData.tipAmount, // Tip amount
            validatedTippingData.rating, // Rating
            validatedTippingData.experience, // Experience
            validatedTippingData.comments // Optional comments
        );

        return NextResponse.json(successResponse('Tipping created successfully', newTipping));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});

