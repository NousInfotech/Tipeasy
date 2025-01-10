// app/api/waiter/[waiterId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { successResponse, errorResponse } from '@/utils/response';
import { getWaiterById, updateWaiter, deleteWaiter } from '@/database/utils/queries'; // Import database query functions
import { withDbConnection } from '@/database/utils/withDbConnection'; // Assuming this is your DB connection handler
import { validateSchema, validateWaiter } from '@/utils/validationUtils';
import { waiterSchema } from '@/utils/validations';
import { IWaiter } from '@/types/schematypes';
import { encryptData } from '@/utils/encryptDataByCrypto';

interface Params {
    waiterId: string;
}

// GET: Fetch a specific waiter by ID
export const GET = withDbConnection(async (req: NextRequest, context: { params: Promise<Params> }): Promise<NextResponse> => {
    const { waiterId } = await context.params; // Access waiterId from context.params

    try {

        await validateWaiter(waiterId);

        const waiter = await getWaiterById(waiterId); // Fetch waiter from DB

        if (!waiter) {
            return NextResponse.json(errorResponse({ message: 'Waiter not found', code: 'NOT_FOUND', status: 404 }));
        }

        return NextResponse.json(successResponse('Waiter fetched successfully', waiter));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});

// PUT: Update a specific waiter by ID
export const PUT = withDbConnection(async (req: NextRequest, context: { params: Promise<Params> }): Promise<NextResponse> => {
    const { waiterId } = await context.params; // Access waiterId from context.params

    try {

        await validateWaiter(waiterId)

        const updatedData = await req.json(); // Get the updated data from the request body

        const validatedWaiter = validateSchema(waiterSchema, updatedData, true) as IWaiter

        if (validatedWaiter.bankDetails) {

            const encryptedAccountNumber = encryptData(validatedWaiter.bankDetails.accountNumber);
            const encryptedIfsc = encryptData(validatedWaiter.bankDetails.ifsc);

            // Placeholder for Razorpay Fund Account ID
            const razorpayFundAccountId = "PLACEHOLDER_RPFUNDID";

            // Update validated waiter data with Firebase ID and encrypted bank details
            validatedWaiter.bankDetails = {
                accountNumber: encryptedAccountNumber,
                ifsc: encryptedIfsc,
                accountName: validatedWaiter.name,
                razorpayFundAccountId,
            };
        }

        const updatedWaiter = await updateWaiter(waiterId, validatedWaiter);

        if (!updatedWaiter) {
            return NextResponse.json(errorResponse({ message: 'Failed to update waiter', code: 'DB_UPDATE_ERROR', status: 500 }));
        }

        return NextResponse.json(successResponse('Waiter updated successfully', updatedWaiter));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});

// DELETE: Delete a specific waiter by ID
export const DELETE = withDbConnection(async (req: NextRequest, context: { params: Promise<Params> }): Promise<NextResponse> => {
    const { waiterId } = await context.params; // Access waiterId from context.params

    try {
        await validateWaiter(waiterId)

        const result = await deleteWaiter(waiterId); // Delete waiter from DB

        if (!result) {
            return NextResponse.json(errorResponse({ message: 'Failed to delete waiter', code: 'DB_DELETE_ERROR', status: 500 }));
        }

        return NextResponse.json(successResponse('Waiter deleted successfully', result));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});
