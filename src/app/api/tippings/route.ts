import { NextResponse } from "next/server";
import { createTipping, getTippingsByRestaurantId, getTippingsByWaiterId } from "@/database/utils/queries";
import { successResponse, errorResponse } from "@/utils/response";
import connectDB from "@/database/connection";

/**
 * Create a new tipping record.
 * @param {Request} req - The HTTP request object.
 * @returns {Promise<NextResponse>} - The HTTP response with the result of the operation.
 */
export async function POST(req: Request): Promise<NextResponse> {
    try {

        const data = await req.json();
        await connectDB();
        const tipping = await createTipping(data); // Calls the createTipping DB function
        return NextResponse.json(successResponse("Tipping created successfully", tipping), { status: 201 });
    } catch (error) {
        console.error("Error creating tipping:", error);
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
}

/**
 * Get tippings for a restaurant.
 * @param {Request} req - The HTTP request object.
 * @returns {Promise<NextResponse>} - The HTTP response with the list of tippings for the restaurant.
 */
/**
 * Get tippings by restaurantId or waiterId.
 * @param {Request} req - The HTTP request object.
 * @returns {Promise<NextResponse>} - The HTTP response with the list of tippings.
 */
export async function GET(req: Request): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(req.url);
        const restaurantId = searchParams.get("restaurantId");
        const waiterId = searchParams.get("waiterId");

        if (!restaurantId && !waiterId) {
            return NextResponse.json(
                errorResponse({ message: "Missing restaurantId or waiterId parameter", code: "INVALID_PARAMS", status: 400 }),
                { status: 400 }
            );
        }

        let tippings;
        if (restaurantId) {
            tippings = await getTippingsByRestaurantId(restaurantId);
        } else if (waiterId) {
            tippings = await getTippingsByWaiterId(waiterId);
        }

        return NextResponse.json(successResponse("Tippings fetched successfully", tippings), { status: 200 });
    } catch (error) {
        console.error("Error fetching tippings:", error);
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
}

