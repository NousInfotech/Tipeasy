import { NextResponse } from "next/server";
import { createUser } from "@/database/utils/queries";
import { successResponse, errorResponse } from "@/utils/response";
import { validateRestaurant } from "@/utils/validationUtils";
import { validateSchema } from "@/utils/validationUtils";
import { userSchema } from "@/utils/validations";
import { registerUser } from "@/services/firebase/auth";
import { IUser } from "@/types/schematypes";
import { withDbConnection } from "@/database/utils/withDbConnection";

/**
 * POST API to create a new user.
 *
 * @param {Request} request - The incoming HTTP request.
 * @returns {Promise<NextResponse>} - A JSON response indicating success or failure.
 */
export const POST = withDbConnection(async (request: Request): Promise<NextResponse> => {
    try {
        const body = await request.json();

        const { username, email, password, phoneNumber, role, restaurantId } = body;

        // Check for missing fields
        if (!username || !password || !email || !phoneNumber || !role) {
            return NextResponse.json(
                errorResponse("Missing required fields"),
                { status: 400 }
            );
        }

        // Validate restaurantId if the role is admin
        if (role === "admin") {
            if (!restaurantId) {
                return NextResponse.json(
                    errorResponse("Restaurant ID is required for admin role"),
                    { status: 400 }
                );
            }
            await validateRestaurant(restaurantId); // Ensure restaurant exists
        }

        // Register user in Firebase
        const firebaseId = await registerUser(email, password);

        // Construct user data for validation
        const userData = {
            username,
            email,
            phoneNumber,
            restaurantId: restaurantId,
            firebaseId,
            role,
        };


        // Validate user data using Zod schema
        const validatedUser = validateSchema(userSchema, userData) as IUser;


        // Save user to database
        const newUser = await createUser(validatedUser);

        return NextResponse.json(
            successResponse(`${role} created successfully`, newUser)
        );
    } catch (error: unknown) {
        console.error("Error creating user:", error);
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
})
