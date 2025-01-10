import { successResponse, errorResponse } from "@/utils/response";
import { withDbConnection } from "@/database/utils/withDbConnection";
import { getOrdersByRestaurantId, createOrderByMenuIds, getOrderById } from "@/database/utils/queries";
import { NextRequest, NextResponse } from "next/server";
import { orderSchema } from "@/utils/validations"; // Assuming orderSchema is defined
import { validateMenu, validateSchema } from "@/utils/validationUtils";
import { validateRestaurant } from "@/utils/validationUtils";
import { getMenuOrders } from "@/api/orderApi";

/**
 * GET API Route handler to fetch orders based on the provided query parameters.
 * - If `restaurantId` is provided, it fetches orders for that restaurant.
 * - If `orderId` is provided, it fetches the specific order by ID.
 * - If no parameters are provided, it fetches all menu orders.
 * 
 * @returns {NextResponse} - A response containing the appropriate list of orders.
 */
export const GET = withDbConnection(async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { searchParams } = new URL(request.url);
        const restaurantId = searchParams.get("restaurantId");
        const orderId = searchParams.get("orderId");

        let orders;

        if (orderId) {
            // Fetch order by OrderId
            orders = await getOrderById(orderId);
        } else if (restaurantId) {
            // Validate restaurantId and fetch orders for the restaurant
            await validateRestaurant(restaurantId);
            orders = await getOrdersByRestaurantId(restaurantId);
        } else {
            // Fetch all menu orders if no specific parameters
            orders = await getMenuOrders();
        }

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

        const validatedOrderData = validateSchema(orderSchema, orderData, true);

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
            validatedOrderData.phoneNumber,
        );

        return NextResponse.json(successResponse('Order created successfully', newOrder));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});
