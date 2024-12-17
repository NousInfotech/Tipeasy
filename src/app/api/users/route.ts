import { NextResponse } from "next/server";
import { createUser } from "@/database/utils/queries";
import { successResponse, errorResponse } from "@/utils/response";
import connectDB from "@/database/connection";
import { registerUser } from "@/services/firebase/auth";

export const runtime = 'nodejs';

/**
 * Fetch menus by restaurant ID.
 * @param {Request} request - The request object containing query parameters.
 * @returns {Promise<NextResponse>} - A response containing menu items or an error message.
 */
export async function POST(request: Request): Promise<NextResponse> {
    try {
        const body = await request.json();
        const { username, email, password, phoneNumber, role, restaurantId } = body;

        if (!username || !password || !email || !phoneNumber || !role) {

            if (role == "admin" && !restaurantId) {

                return NextResponse.json(errorResponse("Missing required fields"), { status: 400 });
            }

            return NextResponse.json(errorResponse("Missing required fields"), { status: 400 });
        }



        const firebaseId = await registerUser(email, password);

        // Construct User data
        const userData = {
            username,
            email,
            phoneNumber,
            restaurantId,
            firebaseId,
            role,
        };

        // Create User using the utility function
        await connectDB();

        const newUser = await createUser(userData);
        return NextResponse.json(successResponse(role + " created successfully", newUser));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
}
