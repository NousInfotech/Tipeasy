import connectDb from "@/database/connection";
import { getMenuById, updateMenuItem, deleteMenuItem } from "@/database/utils/queries";
import { NextResponse } from "next/server";

/**
 * Fetch a menu item by its ID.
 * @param {Request} request - The request object.
 * @param {Object} context - The context object containing route params.
 * @param {Promise<{ menuId: string }>} context.params - The route params including `menuId`.
 * @returns {Promise<NextResponse>} - A response containing the menu item or an error message.
 */
export async function GET(
    request: Request,
    context: { params: Promise<{ menuId: string }> }
): Promise<NextResponse> {
    try {
        const { menuId } = await context.params;

        if (!menuId) {
            return NextResponse.json({ success: false, message: "Menu ID is required" }, { status: 400 });
        }

        await connectDb();
        const menu = await getMenuById(menuId);

        return NextResponse.json({ success: true, message: "Menu item fetched successfully", data: menu });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: false, message: 'An unknown error occurred' }, { status: 500 });
    }
}

/**
 * Update a menu item by its ID.
 * @param {Request} request - The request object containing updated data in JSON format.
 * @param {Object} context - The context object containing route params.
 * @param {Promise<{ menuId: string }>} context.params - The route params including `menuId`.
 * @returns {Promise<NextResponse>} - A response containing the updated menu item or an error message.
 */
export async function PUT(
    request: Request,
    context: { params: Promise<{ menuId: string }> }
): Promise<NextResponse> {
    try {
        const { menuId } = await context.params;

        if (!menuId) {
            return NextResponse.json({ success: false, message: "Menu ID is required" }, { status: 400 });
        }

        await connectDb();
        const updatedData = await request.json();
        const updatedMenu = await updateMenuItem(menuId, updatedData);

        return NextResponse.json({ success: true, message: "Menu item updated successfully", data: updatedMenu });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: false, message: 'An unknown error occurred' }, { status: 500 });
    }
}

/**
 * Delete a menu item by its ID.
 * @param {Request} request - The request object.
 * @param {Object} context - The context object containing route params.
 * @param {Promise<{ menuId: string }>} context.params - The route params including `menuId`.
 * @returns {Promise<NextResponse>} - A response containing a success message or an error message.
 */
export async function DELETE(
    request: Request,
    context: { params: Promise<{ menuId: string }> }
): Promise<NextResponse> {
    try {
        const { menuId } = await context.params;

        if (!menuId) {
            return NextResponse.json({ success: false, message: "Menu ID is required" }, { status: 400 });
        }

        await connectDb();
        const result = await deleteMenuItem(menuId);

        return NextResponse.json({ success: true, message: result.message });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: false, message: 'An unknown error occurred' }, { status: 500 });
    }
}
