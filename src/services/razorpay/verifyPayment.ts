import { razorpayInstance, rp_secret } from "@/config/razorpay";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

/**
 * Verifies the Razorpay payment using the `validatePaymentVerification` utility
 * and extracts relevant data from Razorpay's payment notes.
 * @param {object} razorpay_order_id - The payment details received from the client.
 * @returns {Promise<object>} - A Promise resolving to the validated payment data (e.g., waiterId, restaurantId, tippingAmount).
 * @throws {Error} - Throws an error if payment verification fails.
 */
export const verifyPayment = async (razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string): Promise<{
    waiterId: string;
    restaurantId: string;
    tippingAmount: number;
}> => {
    try {

        // Validate payment signature using Razorpay's SDK utility
        const isValid = await validatePaymentVerification({ "order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, rp_secret);

        if (!isValid) {
            throw new Error("Invalid payment signature");
        }


        // Fetch payment details from Razorpay
        const paymentDetails = await razorpayInstance.payments.fetch(razorpay_payment_id);

        // Extract notes from payment details
        const { notes } = paymentDetails;

        if (!notes) {
            throw new Error("Missing notes in payment details");
        }

        const { waiterId, restaurantId, tipAmount } = notes;

        // Ensure all necessary data is present
        if (!waiterId || !restaurantId || !tipAmount) {
            throw new Error("Incomplete payment data");
        }

        return {
            waiterId,
            restaurantId,
            tippingAmount: parseFloat(tipAmount),
        };
    } catch (error) {
        throw new Error(`Payment verification failed: ${error}`);
    }
};
