import { successResponse, errorResponse } from "@/utils/response";
import { withDbConnection } from "@/database/utils/withDbConnection";
import { createTippingByWaiterId } from "@/database/utils/queries";
import { NextRequest, NextResponse } from "next/server";
import { tippingSchema } from "@/utils/validations";
import { validateSchema, validateWaiter, validateRestaurant } from "@/utils/validationUtils";
import { ITipping } from "@/types/schematypes";
import { verifyPayment } from "@/services/razorpay/verifyPayment";

/**
 * POST API Route handler to create a new tipping for a waiter in the database.
 *
 * @param {NextRequest} request - The incoming HTTP request object containing payment data.
 * @returns {NextResponse} - A response containing the status of the tipping creation.
 */
export const POST = withDbConnection(async (request: NextRequest): Promise<NextResponse> => {
    try {
        // Parse incoming Razorpay payment data
        const paymentData = await request.json();

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentData;

        // Verify payment and extract tipping-related data
        const tippingData = await verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);

        // Validate restaurant ID
        await validateRestaurant(tippingData.restaurantId);

        // Construct tipping payload
        const payload: ITipping = {
            waiterId: tippingData.waiterId,
            restaurantId: tippingData.restaurantId,
            tipAmount: tippingData.tippingAmount,
            razorpayPaymentId: razorpay_payment_id,
            dateTime: new Date(),
        };

        // Validate tipping payload using Zod schema
        const validatedTippingData = validateSchema(tippingSchema, payload) as ITipping;

        // Validate the waiter ID
        await validateWaiter(validatedTippingData.waiterId);

        // Create tipping record in the database
        const newTipping = await createTippingByWaiterId(
            validatedTippingData.waiterId,
            validatedTippingData.restaurantId,
            validatedTippingData.tipAmount,
            validatedTippingData.razorpayPaymentId as string,
        );

        return NextResponse.json(successResponse("Tipping created successfully", newTipping));
    } catch (error: unknown) {
        return NextResponse.json(errorResponse(error));
    }
});
