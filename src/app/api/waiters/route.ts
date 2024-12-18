import { NextResponse } from "next/server";
import { createWaiter, getWaiterByRestaurantId } from "@/database/utils/queries";
import { successResponse, errorResponse } from "@/utils/response";
import connectDB from "@/database/connection";
import { encryptData } from "./utils";
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
        const { name, password, phoneNumber, email, restaurantId, imgSrc, bankDetails } = body;

        if (!name || !password || !email || !phoneNumber || !restaurantId || !bankDetails?.accountNumber || !bankDetails?.ifsc) {
            return NextResponse.json(errorResponse("Missing required fields"), { status: 400 });
        }



        const firebaseId = await registerUser(email, password);
        const encryptedAccountNumber = encryptData(bankDetails.accountNumber);
        const encryptedIfsc = encryptData(bankDetails.ifsc);

        // Placeholder for Razorpay Fund Account ID
        const razorpayFundAccountId = "PLACEHOLDER_RPFUNDID";

        // Construct waiter data
        const waiterData = {
            name,
            email,
            phoneNumber,
            restaurantId,
            firebaseId,
            imgSrc,
            bankDetails: {
                accountNumber: encryptedAccountNumber,
                ifsc: encryptedIfsc,
                accountName: bankDetails.accountName,
                razorpayFundAccountId,
            },
        };

        // Create waiter using the utility function
        await connectDB();

        const newWaiter = await createWaiter(waiterData);
        return NextResponse.json(successResponse("Waiter created successfully", newWaiter));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
}
/**
 * GET: Get waiters by restaurant ID
 * @param request - The incoming HTTP request.
 * @returns A JSON response with the list of waiters for the given restaurant.
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const restaurantId = searchParams.get("restaurantId");

        if (!restaurantId) {
            return NextResponse.json(errorResponse("Restaurant ID is required"), { status: 400 });
        }

        await connectDB();
        const waiters = await getWaiterByRestaurantId(restaurantId);
        return NextResponse.json(successResponse("Waiters fetched successfully", waiters));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
}
