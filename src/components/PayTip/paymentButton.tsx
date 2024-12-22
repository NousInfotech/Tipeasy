import React, { useState } from 'react';
import { initializeRazorpayPayment } from '@/services/razorpay/paymentService';
import { createOrder } from '@/api/razorpayOrderCreation';

interface PaymentButtonProps {
    restaurantId: string;
    waiterId: string;
    tipAmount: number;
    onSuccess: (response: any) => void; // Add onSuccess callback to handle successful payment
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
        <button onClick={handlePayment} disabled={loading}>
            {loading ? 'Processing...' : 'Pay Tip'}
        </button>
    );
};

export default PaymentButton;
