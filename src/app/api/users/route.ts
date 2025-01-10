import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/database/utils/queries";
import { successResponse, errorResponse } from "@/utils/response";
import { validateRestaurant } from "@/utils/validationUtils";
import { validateSchema } from "@/utils/validationUtils";
import { userSchema } from "@/utils/validations";
import { registerUser } from "@/services/firebase/auth";
import { IUser } from "@/types/schematypes";
import { withDbConnection } from "@/database/utils/withDbConnection";
import { getUserByEmail } from "@/database/utils/queries";

/**
 * GET API Route handler to fetch a user from the database by email.
 * 
 * @param {NextRequest} request - The incoming request.
 * @returns {NextResponse} - A response containing the user data.
 */
export const GET = withDbConnection(async (request: NextRequest): Promise<NextResponse> => {
    try {
        // Extract email from the query parameters
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        // Validate the email
        if (!email) {
            return NextResponse.json(errorResponse("Email parameter is required"), { status: 400 });
        }

        // Fetch the user by email
        const user = await getUserByEmail(email);

        // If user is not found
        if (!user) {
            return NextResponse.json(errorResponse("User not found"), { status: 404 });
        }

        // Respond with the user data
        return NextResponse.json(successResponse("User fetched successfully", user));
    } catch (error: unknown) {
        // Handle any other errors
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
});

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

