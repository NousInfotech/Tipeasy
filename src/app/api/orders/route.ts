// app/api/orders/route.ts

import { NextResponse } from "next/server";
import { createOrder, getOrdersByRestaurantId } from "@/database/utils/queries";
import connectDB from "@/database/connection";
import { successResponse, errorResponse } from "@/utils/response";
import { connect } from "http2";



// Get orders by restaurantId
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const restaurantId = searchParams.get("restaurantId");

        if (!restaurantId) {
            return NextResponse.json(errorResponse({ message: "Missing restaurantId parameter", code: "MISSING_RESTAURANTID", status: 400 }), { status: 400 });
        }

        await connectDB();

        const orders = await getOrdersByRestaurantId(restaurantId);

        if (orders.length === 0) {
            return NextResponse.json(errorResponse({ message: "No orders found for this restaurant", code: "NO_ORDERS_FOUND", status: 404 }), { status: 404 });
        }

        return NextResponse.json(successResponse("Orders fetched successfully", orders), { status: 200 });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
}

// Create a new order
export async function POST(request: Request): Promise<NextResponse> {
    try {
        const data = await request.json();

        if (!data.restaurantId || !data.tableNo || !data.menuItems || !data.totalAmount) {
            return NextResponse.json(errorResponse({ message: "Missing required fields", code: "MISSING_FIELDS", status: 400 }), { status: 400 });
        }

        await connectDB();

        const order = await createOrder(data);  // Assuming createOrder will handle the actual order creation

        return NextResponse.json(successResponse("Order created successfully", order), { status: 201 });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
}

