import { successResponse, errorResponse } from "@/utils/response";
import { withDbConnection } from "@/database/utils/withDbConnection";
import { createWaiter, getWaitersByRestaurantId } from "@/database/utils/queries";
import { NextRequest, NextResponse } from "next/server";
import { waiterSchema } from "@/utils/validations"; // Assuming waiterSchema is defined
import { validateSchema } from "@/utils/validationUtils";
import { IWaiter } from "@/types/schematypes";
import { validateRestaurant } from "@/utils/validationUtils";
import { encryptData } from "@/utils/encryptDataByCrypto";

/**
 * POST API Route handler to create a new waiter in the database.
 * Validates the request body using Zod schema.
 * 
 * @param {Request} request - The incoming HTTP request object containing waiter data in the body.
 * 
 * @returns {NextResponse} - A response containing the status of the waiter creation.
 */

export const GET = withDbConnection(async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get("restaurantId");

    // Validate restaurantId
    await validateRestaurant(restaurantId as string);

    // Fetch menus for the restaurant
    const waiters = await getWaitersByRestaurantId(restaurantId as string);
    return NextResponse.json(successResponse('Waiters fetched successfully', waiters));
});

export const POST = withDbConnection(async (request: NextRequest): Promise<NextResponse> => {
    try {
        // Parse the waiter data from the request
        const waiterData = await request.json();

        // Destructure required fields
        const { email, bankDetails, name, restaurantId } = waiterData;

        // Validate email presence
        if (!email) {
            throw new Error("Email is required.");
        }

        // Validate restaurant ID
        await validateRestaurant(restaurantId);

        // Validate the waiter data using Zod schema before encryption
        const validatedWaiterData = validateSchema(waiterSchema, waiterData) as IWaiter;

        // Encrypt bank details after validation
        const encryptedAccountNumber = encryptData(bankDetails.accountNumber);
        const encryptedIfsc = encryptData(bankDetails.ifsc);

        // Placeholder for Razorpay Fund Account ID
        const razorpayFundAccountId = "PLACEHOLDER_RPFUNDID";

        // Update validated waiter data with encrypted bank details
        validatedWaiterData.bankDetails = {
            accountNumber: encryptedAccountNumber,
            ifsc: encryptedIfsc,
            accountName: name,
            razorpayFundAccountId,
        };

        // Create the waiter record in the database
        const newWaiter = await createWaiter(validatedWaiterData as IWaiter);

        return NextResponse.json(successResponse("Waiter created successfully", newWaiter));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});
