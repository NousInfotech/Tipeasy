'use client';

import React, { useState } from 'react';
import PaymentButton from './paymentButton';

interface TipPaymentProps {
    waiterId: string;
    restaurantId: string;
    tipAmount: number;
    onPaymentSuccess: (response: any) => void;  // Callback after payment success
    setTipAmount: React.Dispatch<React.SetStateAction<number>>; // Set Tipping ID in parent
}

const TipPayment: React.FC<TipPaymentProps> = ({ waiterId, restaurantId, tipAmount, onPaymentSuccess, setTipAmount }) => {

    const handleTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setTipAmount(value);
        }
    };



    return (
        <div className="tip-payment">
            <h2 className="text-xl">Enter Tip Amount</h2>
            <div className="payment-amount">
                <span>{`₹${tipAmount.toFixed(2)}`}</span>
            </div>
            {/* Input for setting the tip amount */}
            <input
                type="number"
                value={tipAmount}
                onChange={handleTipChange}
                min="0"
                placeholder="Enter tip amount"
                className="tip-input"
            />

            {/* Razorpay Payment Button */}
            <PaymentButton
                waiterId={waiterId}
                restaurantId={restaurantId}
                tipAmount={tipAmount}
                onSuccess={onPaymentSuccess} // Pass callback to PaymentButton
            />
        </div>
    );
};

export default TipPayment;
