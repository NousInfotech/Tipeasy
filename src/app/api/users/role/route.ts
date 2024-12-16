import connectDB from "@/database/connection";
import { fetchRoleById } from "@/database/utils/queries";
import { errorResponse, successResponse } from "@/utils/response";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
    try {
        // Extract query parameters from the URL
        const { searchParams } = new URL(req.url); // URL of the request
        const firebaseId = searchParams.get("firebaseId"); // Get firebaseId from the query string

        if (!firebaseId) {
            return NextResponse.json(
                errorResponse({ message: "Missing firebaseId parameter", code: "INVALID_PARAMS", status: 400 }),
                { status: 400 }
            );
        }

        // Connect to the database and fetch the role
        await connectDB();

        const fetchedRole = await fetchRoleById(firebaseId);

        if (!fetchedRole) {
            return NextResponse.json(
                errorResponse({ message: "User Not Found", code: "NOT_FOUND", status: 404 }),
                { status: 404 }
            );
        }

        return NextResponse.json(successResponse("Role fetched successfully", fetchedRole), { status: 200 });
    } catch (error) {
        console.error("Error fetching role:", error);
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
}
