// app/api/orders/[orderId]/route.ts

import connectDB from "@/database/connection";
import { getOrderById } from "@/database/utils/queries";
import { NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/utils/response";
// Get a specific order by orderId
export async function GET(
    request: Request,
    context: { params: Promise<{ orderId: string }> }
): Promise<NextResponse> {
    try {
        const { orderId } = await context.params;

        if (!orderId) {
            return NextResponse.json(errorResponse({ message: "Missing orderId parameter", code: "MISSING_ORDERID", status: 400 }), { status: 400 });
        }

        await connectDB();

        const order = await getOrderById(orderId);
        if (!order) {
            return NextResponse.json(errorResponse({ message: "Order not found", code: "ORDER_NOT_FOUND", status: 404 }), { status: 404 });
        }

        return NextResponse.json(successResponse("Order fetched successfully", order), { status: 200 });
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
}