import connectDb from "@/database/connection";
import { getMenusByRestaurantId, createMenuItem } from "@/database/utils/queries";
import { NextResponse } from "next/server";

/**
 * Fetch menus by restaurant ID.
 * @param {Request} request - The request object containing query parameters.
 * @returns {Promise<NextResponse>} - A response containing menu items or an error message.
 */
export async function GET(request: Request): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const restaurantId = searchParams.get("restaurantId");

        if (!restaurantId) {
            return NextResponse.json({ success: false, message: "Restaurant ID is required" }, { status: 400 });
        }

        await connectDb();
        const menus = await getMenusByRestaurantId(restaurantId);

        return NextResponse.json({ success: true, message: "Menus fetched successfully", data: menus });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

/**
 * Create a new menu item.
 * @param {Request} request - The request object containing the menu data in JSON format.
 * @returns {Promise<NextResponse>} - A response containing the created menu item or an error message.
 */
export async function POST(request: Request): Promise<NextResponse> {
    try {
        await connectDb();
        const menuData = await request.json();

        if (!menuData.restaurantId) {
            return NextResponse.json({ success: false, message: "Restaurant ID is required" }, { status: 400 });
        }

        const newMenu = await createMenuItem(menuData);

        return NextResponse.json({ success: true, message: "Menu item created successfully", data: newMenu });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

