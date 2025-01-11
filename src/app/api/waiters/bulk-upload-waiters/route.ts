import { successResponse, errorResponse } from "@/utils/response";
import { withDbConnection } from "@/database/utils/withDbConnection";
import { createWaiter } from "@/database/utils/queries";
import { NextResponse } from "next/server";
import { waiterSchema } from "@/utils/validations";
import { validateSchema } from "@/utils/validationUtils";
import { IWaiter } from "@/types/schematypes";
import { validateRestaurant } from "@/utils/validationUtils";
import { encryptData } from "@/utils/encryptDataByCrypto";

/**
 * POST API Route handler for bulk waiter upload.
 * Accepts an array of waiter data in the request body.
 *
 * @param {Request} request - The incoming HTTP request object containing waiter data in the body.
 *
 * @returns {NextResponse} - A response containing the status and created waiter records.
 */
export const POST = withDbConnection(async (request: Request): Promise<NextResponse> => {
    try {
        const waiterDataArray = await request.json();

        if (!Array.isArray(waiterDataArray) || waiterDataArray.length === 0) {
            throw new Error("Request body must be a non-empty array of waiter data.");
        }

        const createdWaiters = [];

        for (let i = 0; i < waiterDataArray.length; i++) {
            const waiterData = waiterDataArray[i];
            const { email, bankDetails, name, restaurantId } = waiterData;

            if (!email) throw new Error("Email is required for each waiter.");

            await validateRestaurant(restaurantId);

            const validatedWaiterData = validateSchema(waiterSchema, waiterData) as IWaiter;

            const encryptedAccountNumber = encryptData(bankDetails.accountNumber);
            const encryptedIfsc = encryptData(bankDetails.ifsc);

            // Generate unique firebaseId with counter
            const firebaseId = `firebaseId${String(i + 1).padStart(3, "0")}`;

            const razorpayFundAccountId = "PLACEHOLDER_RPFUNDID";

            validatedWaiterData.bankDetails = {
                accountNumber: encryptedAccountNumber,
                ifsc: encryptedIfsc,
                accountName: name,
                razorpayFundAccountId,
            };

            validatedWaiterData.firebaseId = firebaseId;

            const newWaiter = await createWaiter(validatedWaiterData);
            createdWaiters.push(newWaiter);
        }

        return NextResponse.json(successResponse("Bulk waiter upload successful", createdWaiters));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});
