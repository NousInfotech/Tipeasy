

import React, { useState } from 'react';
import { deleteWaiter } from '@/api/restaurantApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface DeleteWaiterDialogProps {
    id: string;
    waiterName: string;
    deleteOpen: boolean;
    setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>; // Correct type for state setter
}

const DeleteWaiterDialog: React.FC<DeleteWaiterDialogProps> = ({ id, waiterName, deleteOpen, setDeleteOpen }) => {

    const [confirmationText, setConfirmationText] = useState('');

    const router = useRouter();

    const handleConfirm = async () => { // Declare as async
        if (confirmationText === waiterName) {
            try {
                await deleteWaiter(id); // Wait for the deletion API call
                toast.success('Waiter deleted successfully');
                setDeleteOpen(false); // Close the dialog after success
                router.refresh()
            } catch (error) {
                console.error(error);
                toast.error(`Waiter cannot be deleted: ${error}`);
            }
        } else {
            toast.error('The Waiter name does not match. Please try again.');
        }
    };

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${deleteOpen ? '' : 'hidden'
                }`}
        >
            <div className="bg-white p-6 rounded-md w-96 space-y-4 shadow-lg">
                <h2 className="text-xl font-semibold text-red-600">Confirm Deletion</h2>
                <p className="text-gray-700">
                    Are you sure you want to delete <span className="font-bold">{waiterName}</span>? This action cannot be
                    undone.
                </p>
                <p className="text-gray-700">
                    Please type the Waiter name <span className="font-bold">{waiterName}</span> to confirm.
                </p>
                <input
                    type="text"
                    placeholder="Enter Waiter name"
                    value={confirmationText}
                    onChange={(e) => setConfirmationText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => setDeleteOpen(false)} // Close dialog on cancel
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm} // Confirm deletion
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteWaiterDialog;
