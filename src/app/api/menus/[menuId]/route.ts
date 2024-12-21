// app/api/menu/[menuId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { successResponse, errorResponse } from '@/utils/response';
import { getMenuById, updateMenu, deleteMenu } from '@/database/utils/queries'; // Import database query functions
import { withDbConnection } from '@/database/utils/withDbConnection'; // Assuming this is your DB connection handler
import { validateMenu, validateSchema } from '@/utils/validationUtils';
import { menuSchema } from '@/utils/validations';
import { IMenu } from '@/types/schematypes';

interface Params {
    menuId: string;
}

// GET: Fetch a specific menu by ID
export const GET = withDbConnection(async (req: NextRequest, context: { params: Promise<Params> }): Promise<NextResponse> => {
    const { menuId } = await context.params; // Access menuId from context.params

    try {
        await validateMenu(menuId)

        const menu = await getMenuById(menuId); // Fetch menu from DB

        if (!menu) {
            return NextResponse.json(errorResponse({ message: 'Menu not found', code: 'NOT_FOUND', status: 404 }));
        }

        return NextResponse.json(successResponse('Menu fetched successfully', menu));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});

// PUT: Update a specific menu by ID
export const PUT = withDbConnection(async (req: NextRequest, context: { params: Promise<Params> }): Promise<NextResponse> => {
    const { menuId } = await context.params; // Access menuId from context.params

    try {
        await validateMenu(menuId)

        const updatedData = await req.json(); // Get the updated data from the request body

        const validatedMenu = validateSchema(menuSchema, updatedData, true) as IMenu

        const updatedMenu = await updateMenu(menuId, validatedMenu);

        if (!updatedMenu) {
            return NextResponse.json(errorResponse({ message: 'Failed to update menu', code: 'DB_UPDATE_ERROR', status: 500 }));
        }

        return NextResponse.json(successResponse('Menu updated successfully', updatedMenu));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});

// DELETE: Delete a specific menu by ID
export const DELETE = withDbConnection(async (req: NextRequest, context: { params: Promise<Params> }): Promise<NextResponse> => {
    const { menuId } = await context.params; // Access menuId from context.params

    try {
        await validateMenu(menuId)

        const result = await deleteMenu(menuId); // Delete menu from DB

        if (!result) {
            return NextResponse.json(errorResponse({ message: 'Failed to delete menu', code: 'DB_DELETE_ERROR', status: 500 }));
        }

        return NextResponse.json(successResponse('Menu deleted successfully', result));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});
