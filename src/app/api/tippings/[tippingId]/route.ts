import { NextResponse } from "next/server";
import { getTippingById } from "@/database/utils/queries";
import { successResponse, errorResponse } from "@/utils/response";
import connectDB from "@/database/connection";

/**
 * Get a specific tipping record by its ID.
 * @param {Request} req - The HTTP request object.
 * @param {Object} context - The request context containing the dynamic parameters.
 * @returns {Promise<NextResponse>} - The HTTP response with the tipping record.
 */
export async function GET(req: Request, context: { params: Promise<{ tippingId: string }> }): Promise<NextResponse> {
    try {
        const { tippingId } = await context.params;

        if (!tippingId) {
            return NextResponse.json({ error: "Missing tippingId parameter" }, { status: 400 });
        }

        await connectDB();
        const tipping = await getTippingById(tippingId); // Calls the getTippingById DB function
        if (!tipping) {
            return NextResponse.json({ error: "Tipping not found" }, { status: 404 });
        }

        return NextResponse.json(successResponse("Tipping fetched successfully", tipping), { status: 200 });
    } catch (error) {
        console.error("Error fetching tipping by ID:", error);
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
}
