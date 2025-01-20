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

        let tippings;

        // Fetch tippings based on provided query params
        if (restaurantId) {
            await validateRestaurant(restaurantId);
            tippings = await getTippingsByRestaurantId(restaurantId);
        } else if (waiterId) {
            tippings = await getTippingsByWaiterId(waiterId);
        } else {
            // No query parameters: Fetch all tippings
            tippings = await getTippings();
        }

        return NextResponse.json(successResponse('Tippings fetched successfully', tippings));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});
