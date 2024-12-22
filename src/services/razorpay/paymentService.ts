import { razorpayInstance, rp_id } from "@/config/razorpay";
import { ConnectionStates } from "mongoose";

// Define types for the service props
interface PaymentServiceProps {
    amount: number;
    notes: {
        restaurantId: string;
        waiterId: string;
        tipAmount: number;
    };
    onPaymentSuccess: (response: { razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string }) => void;
}

export const createRazorpayOrder = async (amount: number, notes: any) => {
    try {
        // Prepare the data for the Razorpay order
        const data = {
            amount: amount * 100,  // Razorpay expects the amount in paise (1 INR = 100 paise)
            currency: 'INR',
            receipt: `receipt_${Math.random().toString(36).substring(2, 10)}`, // Unique receipt ID
            notes: notes,  // Notes containing restaurantId, waiterId, and tipAmount
        };
        // Create the Razorpay order


        const razorpayOrder = await razorpayInstance.orders.create(data);

        return razorpayOrder; // Return the order ID for use in the payment process
    } catch (error) {
        console.error('Error fetching order ID:', error);
        throw new Error('Failed to create Razorpay order');
    }
};

export const initializeRazorpayPayment = async (
    orderId: string,
    tipAmount: number,
    notes: { restaurantId: string, waiterId: string },
    onPaymentSuccess: (response: { razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string }) => void
) => {
    try {
        console.log(orderId)
        const options = {
            key: rp_id, // Replace with your Razorpay key
            order_id: orderId,
            name: "Tip Easyy", // Replace with your business name
            amount: tipAmount * 100, // Razorpay expects amount in paise
            handler: (response: { razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string }) => {
                onPaymentSuccess(response); // Handle payment success
            },
            notes: notes,
            theme: {
                color: '#F37254', // Custom theme color
            },
        };

        // Ensure Razorpay script is loaded
        if (!(window as any).Razorpay) {
            throw new Error("Razorpay SDK not loaded. Ensure the script is added.");
        }

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open(); // Open the Razorpay payment widget
    } catch (error) {
        console.error("Failed to initialize Razorpay payment:", error);
        throw new Error("Razorpay payment initialization failed");
    }
};

