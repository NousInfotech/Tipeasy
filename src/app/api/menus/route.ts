import { successResponse, errorResponse } from "@/utils/response";
import { withDbConnection } from "@/database/utils/withDbConnection";
import { getMenusByRestaurantId, createMenu } from "@/database/utils/queries";
import { NextRequest, NextResponse } from "next/server";
import { menuSchema } from "@/utils/validations"; // Assuming menuSchema is defined
import { IMenu } from "@/types/schematypes";
import { validateSchema } from "@/utils/validationUtils";
import { validateRestaurant } from "@/utils/validationUtils";

/**
 * GET API Route handler to fetch all menus for a given restaurant from the database.
 * 
 * @returns {NextResponse} - A response containing the list of menus.
 */
export const GET = withDbConnection(async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { searchParams } = new URL(request.url);
        const restaurantId = searchParams.get("restaurantId");

        // Validate restaurantId
        await validateRestaurant(restaurantId as string);

        // Fetch menus for the restaurant
        const menus = await getMenusByRestaurantId(restaurantId as string);
        return NextResponse.json(successResponse('Menus fetched successfully', menus));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});

/**
 * POST API Route handler to create a new menu in the database.
 * Validates the request body using Zod schema before creating the menu.
 *
 * @param {Request} request - The incoming HTTP request object containing menu data in the body.
 * 
 * @returns {NextResponse} - A response containing the status of the menu creation.
 */
export const POST = withDbConnection(async (request: Request): Promise<NextResponse> => {
    try {
        // Parse and validate the menu data using Zod schema
        const menuData = await request.json();

        await validateRestaurant(menuData.restaurantId)

        // Validate the menu data
        const validatedMenuData = validateSchema(menuSchema, menuData);

        // Call the function to create a new menu
        const newMenu = await createMenu(validatedMenuData as IMenu);

        return NextResponse.json(successResponse('Menu created successfully', newMenu));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});
