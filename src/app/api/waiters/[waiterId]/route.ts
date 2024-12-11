import { NextResponse } from "next/server";
import { getWaiterById, updateWaiter, deleteWaiter } from "@/database/utils/queries";
import { successResponse, errorResponse } from "@/utils/response";
import connectDB from "@/database/connection";

/**
 * GET: Get a waiter by their unique ID
 * @param request - The incoming HTTP request.
 * @param context - The context containing route parameters.
 * @returns A JSON response with the waiter details.
 */
export async function GET(
    request: Request,
    context: { params: Promise<{ waiterId: string }> }
) {
    try {
        const { waiterId } = await context.params; // Await context.params

        if (!waiterId) {
            return NextResponse.json(errorResponse("Waiter ID is required"), { status: 400 });
        }

        await connectDB();

        const waiter = await getWaiterById(waiterId);
        return NextResponse.json(successResponse("Waiter fetched successfully", waiter));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
}

/**
 * PUT: Update a waiter by their unique ID
 * @param request - The incoming HTTP request containing updated waiter data in the body.
 * @param context - The context containing route parameters.
 * @returns A JSON response with the updated waiter details.
 */
export async function PUT(
    request: Request,
    context: { params: Promise<{ waiterId: string }> }
) {
    try {
        const { waiterId } = await context.params; // Await context.params
        const updatedData = await request.json();

        if (!waiterId) {
            return NextResponse.json(errorResponse("Waiter ID is required"), { status: 400 });
        }

        await connectDB();

        const updatedWaiter = await updateWaiter(waiterId, updatedData);
        return NextResponse.json(successResponse("Waiter updated successfully", updatedWaiter));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
}

/**
 * DELETE: Delete a waiter by their unique ID
 * @param request - The incoming HTTP request.
 * @param context - The context containing route parameters.
 * @returns A JSON response confirming deletion of the waiter.
 */
export async function DELETE(
    request: Request,
    context: { params: Promise<{ waiterId: string }> }
) {
    try {
        const { waiterId } = await context.params; // Await context.params

        if (!waiterId) {
            return NextResponse.json(errorResponse("Waiter ID is required"), { status: 400 });
        }

        await connectDB();

        const result = await deleteWaiter(waiterId);
        return NextResponse.json(successResponse(result.message, result));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
}

