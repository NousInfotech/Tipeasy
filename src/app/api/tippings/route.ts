import { successResponse, errorResponse } from "@/utils/response";
import { withDbConnection } from "@/database/utils/withDbConnection";
import { getTippings } from "@/database/utils/queries";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET API Route handler to fetch all tippings for a given restaurant or waiter, 
 * or fetch all tippings if no query parameters are provided.
 * 
 * @returns {NextResponse} - A response containing the list of tippings.
 */
export const GET = withDbConnection(async (request: NextRequest): Promise<NextResponse> => {
    try {

        const tippings = await getTippings();

        return NextResponse.json(successResponse('Tippings fetched successfully', tippings));
    } catch (error: unknown) {
        console.error('Error fetching tippings:', error); // Log the error for debugging
        return NextResponse.json(errorResponse(error));
    }
});
