import { IFormattedTippingData } from '@/types/schematypes';
import { CircleX } from 'lucide-react';
import React from 'react';

interface TippingPopupProps {
    tippingData: IFormattedTippingData;
    onClose: () => void;
}

const TippingPopup: React.FC<TippingPopupProps> = ({ tippingData, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white relative p-6 rounded-lg shadow-lg max-w-lg w-full">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-red-600 rounded-full"
                >
                    <CircleX />
                </button>
                <h2 className="text-2xl font-semibold mb-4">Tipping Details</h2>
                <div className="space-y-2">
                    <p><strong>ID:</strong> {tippingData.id}</p>
                    <p><strong>Waiter ID:</strong> {tippingData.waiterId}</p>
                    <p><strong>Restaurant ID:</strong> {tippingData.restaurantId}</p>
                    <p><strong>Amount:</strong> ₹{tippingData.tipAmount}</p>
                    <p><strong>Date:</strong> {tippingData.date}</p>
                    <p><strong>Time:</strong> {tippingData.time}</p>
                </div>
            </div>
        </div>
    );
};

export default TippingPopup;
