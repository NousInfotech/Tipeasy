'use client';

import React, { useState } from 'react';
import PaymentButton from './paymentButton';
import { razorpayHandlerResponse } from '@/types/schematypes';
import HeaderwithBackButton from '../HeaderwithBackButton/HeaderwithBackButton';

interface TipPaymentProps {
    waiterId: string;
    restaurantId: string;
    waiterName: string;
    tipAmount: number;
    onPaymentSuccess: (response: razorpayHandlerResponse) => void;
    setTipAmount: React.Dispatch<React.SetStateAction<number>>;
}

const TipPayment: React.FC<TipPaymentProps> = ({ waiterId, waiterName, restaurantId, tipAmount, onPaymentSuccess, setTipAmount }) => {
    const [tipInput, setTipInput] = useState<string>('₹0');

    const handleTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        setTipInput(`₹${numericValue}`);
        setTipAmount(parseFloat(numericValue) || 0); // Update numeric state
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4">
            <div className="min-w-[325px] max-w-[500px] w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
                <HeaderwithBackButton heading='pay tip' />

                <h2 className="text-2xl font-semibold text-center">Tipping {waiterName}</h2>

                {/* Input for setting the tip amount with Rupee symbol */}
                <div className="flex justify-center items-center">
                    <input
                        type="text"
                        value={tipInput}
                        onChange={handleTipChange}
                        placeholder="₹0"
                        className="w-full text-center text-7xl font-semibold py-2 focus:outline-none caret-primary"
                    />
                </div>

                {/* Custom Numeric Keypad */}
                <Keypad tipInput={tipInput} setTipInput={setTipInput} setTipAmount={setTipAmount} />

                {/* Razorpay Payment Button */}
                <PaymentButton
                    waiterId={waiterId}
                    restaurantId={restaurantId}
                    tipAmount={tipAmount}
                    onSuccess={onPaymentSuccess}
                />
            </div>
        </div>
    );
};

export default TipPayment;

// Numeric Keypad Component
const Keypad: React.FC<{
    tipInput: string;
    setTipInput: React.Dispatch<React.SetStateAction<string>>;
    setTipAmount: React.Dispatch<React.SetStateAction<number>>;
}> = ({ tipInput, setTipInput, setTipAmount }) => {

    const handleButtonClick = (value: string) => {
        let updatedValue = tipInput.replace(/₹/g, ''); // Remove ₹ symbol for processing

        if (value === 'clear') {
            updatedValue = '0';
        } else if (value === 'backspace') {
            updatedValue = updatedValue.slice(0, -1) || '0';
        } else {
            updatedValue = updatedValue === '0' ? value : updatedValue + value;
        }

        const formattedValue = `₹${updatedValue}`;
        setTipInput(formattedValue);
        setTipAmount(parseFloat(updatedValue) || 0);
    };

    return (
        <div className="w-full grid grid-cols-3 gap-2 mt-4">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'backspace'].map((button, index) => (
                <button
                    key={index}
                    onClick={() => handleButtonClick(button)}
                    className="w-full py-4 text-xl font-bold text-white bg-primary rounded-lg focus:outline-none hover:bg-primary-dark"
                >
                    {button === 'clear' ? 'Clear' : button === 'backspace' ? '←' : button}
                </button>
            ))}
        </div>
    );
};
