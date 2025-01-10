import React, { useState } from 'react';
import { initializeRazorpayPayment } from '@/services/razorpay/paymentService';
import { createOrder } from '@/api/razorpayOrderCreation';
import { razorpayHandlerResponse } from '@/types/schematypes';

interface PaymentButtonProps {
    restaurantId: string;
    waiterId: string;
    tipAmount: number;
    onSuccess: (response: razorpayHandlerResponse) => void; // Add onSuccess callback to handle successful payment
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
    restaurantId,
    waiterId,
    tipAmount,
    onSuccess, // Accept onSuccess callback as prop
}) => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        if (loading) return;

        setLoading(true);

        try {
            // Prepare notes containing restaurantId, waiterId, and tipAmount
            const notes = { restaurantId, waiterId, tipAmount };

            // Create Razorpay order ID
            const orderId = await createOrder(tipAmount, notes);

            // Initialize Razorpay payment
            initializeRazorpayPayment(orderId, tipAmount, notes,
                (response) => {
                    // Call onSuccess to handle the successful payment response
                    onSuccess(response);  // Pass the response to the parent component
                },
            );
        } catch (error) {
            console.error('Error during payment:', error);
            alert('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-3 mt-4 text-lg font-semibold text-white rounded-lg 
                ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'} 
                transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary`}>
            {loading ? 'Processing...' : 'Pay Tip'}
        </button>

    );
};

export default PaymentButton;
