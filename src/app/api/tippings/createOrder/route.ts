import { successResponse, errorResponse } from "@/utils/response";
import { withDbConnection } from "@/database/utils/withDbConnection";
import { NextRequest, NextResponse } from "next/server";
import { createRazorpayOrder } from "@/services/razorpay/paymentService";

/**
 * POST API Route handler to create a new order and return orderId of razorpay.
 *
 * @param {NextRequest} request - The incoming HTTP request object containing payment data.
 * @returns {NextResponse} - A response containing the status of the order creation.
 */


export const POST = withDbConnection(async (request: NextRequest): Promise<NextResponse> => {
    try {

        const { amount, notes } = await request.json();
        const order = await createRazorpayOrder(amount, notes);
        return NextResponse.json(successResponse("Tipping created successfully", order));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});
