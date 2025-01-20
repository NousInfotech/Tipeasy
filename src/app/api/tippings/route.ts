import { successResponse, errorResponse } from "@/utils/response";
import { withDbConnection } from "@/database/utils/withDbConnection";
import { getTippingsByRestaurantId, getTippingsByWaiterId, getTippings } from "@/database/utils/queries";
import { NextRequest, NextResponse } from "next/server";
import { validateRestaurant } from "@/utils/validationUtils";

/**
 * GET API Route handler to fetch all tippings for a given restaurant or waiter, 
 * or fetch all tippings if no query parameters are provided.
 * 
 * @returns {NextResponse} - A response containing the list of tippings.
 */
export const GET = withDbConnection(async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { searchParams } = new URL(request.url);
        const restaurantId = searchParams.get("restaurantId");
        const waiterId = searchParams.get("waiterId");
        const allTippings = searchParams.get("alltippings");

        let tippings;

        // Handle case when no relevant parameters are provided
        if (!restaurantId && !waiterId && allTippings !== "true") {
            return NextResponse.json(errorResponse('Please provide either restaurantId, waiterId, or set alltippings to "true".'));
        }

        // Fetch tippings based on provided query params
        if (allTippings === "true") {
            tippings = await getTippings();
        }
        else if (restaurantId) {
            await validateRestaurant(restaurantId);  // Ensure restaurant exists and is valid
            tippings = await getTippingsByRestaurantId(restaurantId);
        } else if (waiterId) {
            tippings = await getTippingsByWaiterId(waiterId);
        }

        return NextResponse.json(successResponse('Tippings fetched successfully', tippings));
    } catch (error: unknown) {
        console.error('Error fetching tippings:', error); // Log the error for debugging
        return NextResponse.json(errorResponse(error));
    }
});
