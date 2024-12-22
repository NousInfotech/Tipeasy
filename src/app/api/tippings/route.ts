import { successResponse, errorResponse } from "@/utils/response";
import { withDbConnection } from "@/database/utils/withDbConnection";
import { getTippingsByRestaurantId, getTippingsByWaiterId } from "@/database/utils/queries";
import { NextRequest, NextResponse } from "next/server";
import { validateRestaurant } from "@/utils/validationUtils";

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

