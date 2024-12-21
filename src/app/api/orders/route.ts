import { successResponse, errorResponse } from "@/utils/response";
import { withDbConnection } from "@/database/utils/withDbConnection";
import { getOrdersByRestaurantId, createOrderByMenuIds, validateRestaurantId } from "@/database/utils/queries";
import { NextRequest, NextResponse } from "next/server";
import { orderSchema } from "@/utils/validations"; // Assuming orderSchema is defined
import { validateMenu, validateSchema } from "@/utils/validationUtils";
import { validateRestaurant } from "@/utils/validationUtils";

/**
 * GET API Route handler to fetch all orders for a given restaurant from the database.
 * 
 * @returns {NextResponse} - A response containing the list of orders.
 */
export const GET = withDbConnection(async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { searchParams } = new URL(request.url);
        const restaurantId = searchParams.get("restaurantId");

        // Validate restaurantId
        await validateRestaurant(restaurantId as string);

        // Fetch orders for the restaurant
        const orders = await getOrdersByRestaurantId(restaurantId as string);
        return NextResponse.json(successResponse('Orders fetched successfully', orders));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});

/**
 * POST API Route handler to create a new order in the database.
 * Validates the request body using Zod schema before creating the order.
 *
 * @param {Request} request - The incoming HTTP request object containing order data in the body.
 * 
 * @returns {NextResponse} - A response containing the status of the order creation.
 */
export const POST = withDbConnection(async (request: Request): Promise<NextResponse> => {
    try {
        // Parse and validate the order data using Zod schema
        const orderData = await request.json();

        await validateRestaurant(orderData.restaurantId); // Validate restaurant ID

        const validatedOrderData = validateSchema(orderSchema, orderData);

        await Promise.all(
            validatedOrderData.menuItems.map(async (item) => {
                // Validate each menuId
                await validateMenu(item.menuId);
                // You can add more validation here for other fields if needed
            })
        );
        // Validate the order data

        // Call the function to create a new order
        const newOrder = await createOrderByMenuIds(
            validatedOrderData.restaurantId,
            validatedOrderData.menuItems,
            validatedOrderData.tableNo,
            validatedOrderData.customerName,
            validatedOrderData.phoneNumber
        );

        return NextResponse.json(successResponse('Order created successfully', newOrder));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});
