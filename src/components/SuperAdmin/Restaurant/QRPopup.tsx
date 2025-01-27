import Image from 'next/image';
import React from 'react';
import assets from '../../../../public/assets/assets';


interface QRPopupProps {
    qrURL: string;
    onClose: () => void;
}

const QRPopup: React.FC<QRPopupProps> = ({ qrURL, onClose }) => {


    const onClosingPopup = () => {
        onClose();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-md">
                <h2 className="text-lg font-bold text-center mb-4">Scan the QR Code</h2>
                <Image
                    src={qrURL ? qrURL : assets.primaryQrCode}
                    width={425}
                    height={425}
                    alt="QR Code"
                    className="w-full h-auto object-contain mb-4"
                />
                <button
                    onClick={onClosingPopup}
                    className="block mx-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default QRPopup;
