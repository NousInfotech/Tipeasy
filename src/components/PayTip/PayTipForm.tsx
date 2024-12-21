import React from 'react';
import Input from '../Checkout/Input';
import { useForm } from 'react-hook-form';
import FormBtn from '../Checkout/FormBtn';
import { createMultipleTippings } from '@/scripts/createTipping';

interface FormData {
    amount: number;
    rating: number;
}

interface PayTipFormProps {
    restaurantId: string; // expecting string type for restaurantId
    waiterId: string; // expecting string type for waiterId
}

const PayTipForm: React.FC<PayTipFormProps> = ({ restaurantId, waiterId }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            amount: 0,
            rating: 0,
        },
    });

    // Handle form submission
    const onSubmit = async (data: FormData) => {
        const { amount, rating } = data;

        // Check if the amount is greater than zero and rating is provided
        if (amount <= 0) {
            alert('Tip Amount should be greater than zero.');
            return;
        }

        if (rating === 0) {
            alert('Please provide a rating for the waiter.');
            return;
        }

        const payload = {
            restaurantId, // ensure this is a string
            waiterId,      // ensure this is a string
            tipDetails: {
                amount,
                rating,
            },
        };

        // Send the data to the API or handle accordingly
        console.log('Form Submitted:', payload);

        await createMultipleTippings();

        // You can also trigger an API call here to send the data to the server
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                id="amount"
                label="Tip Amount"
                placeholder="₹"
                type="number"
                register={register('amount', {
                    required: 'Tip Amount is required',
                    min: { value: 1, message: 'Tip Amount must be greater than 0' }, // Ensure the amount is > 0
                })}
                error={errors.amount}
                required
            />
            <Input
                id="rating"
                label="Rate this Waiter"
                type="rating"
                ratingValue={0} // Initial rating (optional)
                onRatingChange={(newRating) => setValue('rating', newRating)} // Update rating value in the form state
            />
            <div className="flex">
                <FormBtn filled={true} title="Pay Tip" type="submit" callback={() => { }} />
            </div>
        </form>
    );
};

export default PayTipForm;
