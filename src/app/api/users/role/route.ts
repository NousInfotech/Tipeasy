import { fetchRoleById } from "@/database/utils/queries";
import { withDbConnection } from "@/database/utils/withDbConnection";
import { errorResponse, successResponse } from "@/utils/response";
import { NextResponse } from "next/server";

/**
 * GET API to fetch the role of a user by their Firebase ID.
 * 
 * @param {Request} req - The incoming request object.
 * @returns {Promise<NextResponse>} - A JSON response containing the user's role or an error message.
 */
export const GET = withDbConnection(async (req: Request): Promise<NextResponse> => {
    try {
        // Extract query parameters from the URL
        const { searchParams } = new URL(req.url);
        const firebaseId = searchParams.get("firebaseId");

        // Validate that the firebaseId is provided
        if (!firebaseId) {
            return NextResponse.json(
                errorResponse({
                    message: "Missing firebaseId parameter",
                    code: "INVALID_PARAMS",
                    status: 400,
                }),
                { status: 400 }
            );
        }

        // Fetch role by Firebase ID
        const fetchedRole = await fetchRoleById(firebaseId);

        // Handle case where no role is found
        if (!fetchedRole) {
            return NextResponse.json(
                errorResponse({
                    message: "User Not Found",
                    code: "NOT_FOUND",
                    status: 404,
                }),
                { status: 404 }
            );
        }

        // Respond with the fetched role
        return NextResponse.json(
            successResponse("Role fetched successfully", fetchedRole),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching role:", error);
        return NextResponse.json(
            errorResponse({
                message: "An unexpected error occurred",
                code: "SERVER_ERROR",
                status: 500,
                details: error instanceof Error ? error.message : undefined,
            }),
            { status: 500 }
        );
    }
})
