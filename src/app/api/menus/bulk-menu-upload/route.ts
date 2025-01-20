import { createMenu, validateRestaurantId } from "@/database/utils/queries";
import { withDbConnection } from "@/database/utils/withDbConnection";
import { IMenu } from "@/types/schematypes";
import { errorResponse, successResponse } from "@/utils/response";
import { menuSchema } from "@/utils/validations";
import { validateSchema } from "@/utils/validationUtils";
import { NextResponse } from "next/server";

/**
 * POST API Route handler for bulk menu upload.
 * Accepts an array of menu items in the request body.
 *
 * @param {Request} request - The incoming HTTP request object containing menu data in the body.
 *
 * @returns {NextResponse} - A response containing the status and created menu items.
 */
export const POST = withDbConnection(async (request: Request): Promise<NextResponse> => {
    try {
        const menuDataArray = await request.json();

        if (!Array.isArray(menuDataArray) || menuDataArray.length === 0) {
            throw new Error("Request body must be a non-empty array of menu items.");
        }

        const createdMenus = [];

        for (const menuData of menuDataArray) {
            await validateRestaurantId(menuData.restaurantId);
            const validatedMenuData = validateSchema(menuSchema, menuData);
            const newMenu = await createMenu(validatedMenuData as IMenu);
            createdMenus.push(newMenu);
        }

        return NextResponse.json(successResponse("Bulk menu upload successful", createdMenus));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});
