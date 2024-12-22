'use client';

import React, { useState } from 'react';
import TipPayment from './TipPayment'; // Import TipPayment
import RatingAndExperience from './RatingAndExperience';
import CommentOnWaiter from './CommentOnWaiter';
import { useParams, useRouter } from 'next/navigation';
import { useWaiter } from '@/app/context/WaiterContext';
import { updateTipping } from '@/api/tippingsApi'; // Your tipping update API
import { verifyPayment } from '@/api/tippingsApi';
import { ITipping } from '@/types/schematypes';

// Define the Experience enum
enum Experience {
    VerySad = "very_sad",
    Sad = "sad",
    Neutral = "neutral",
    Happy = "happy",
    VeryHappy = "very_happy",
    NoExperience = "no_experience"
}


const PayTip: React.FC = () => {
    const params = useParams();
    const { restaurantId } = params;
    const { waiter } = useWaiter();

    const router = useRouter();
    const [step, setStep] = useState(1);
    const [tipAmount, setTipAmount] = useState<number | null>(null);
    const [tippingId, setTippingId] = useState<string | null>(null);
    const [rating, setRating] = useState<number | 0>(0);
    const [experience, setExperience] = useState<Experience | 'no_experience'>('no_experience');
    const [comment, setComment] = useState<string>('no_comment');

    const handleNextStep = () => setStep((prev) => prev + 1);

    const handleThankYouRedirect = () => {
        setTimeout(() => {
            router.push(`/restaurant/${restaurantId}`);
        }, 10000);
    };

    // Payment Success Handler
    const handlePaymentSuccess = async (response: any) => {
        try {
            // Send the payment response to backend for verification
            const paymentDetails = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
            };

            // Send the details to your backend for verification
            const data = await verifyPayment(paymentDetails) as ITipping; // Assuming verifyPayment returns the tipping object with _id

            console.log(data);
            // Assuming the backend returns the tipping object with a _id
            setTippingId(data._id as string);  // Set the tipping ID after payment verification

            handleNextStep(); // Proceed to next step after successful payment
        } catch (error) {
            console.error('Error processing payment response:', error);
        }
    };
    // Validate using the enum
    const handleRatingExperienceSubmit = (ratingValue: number, experienceValue: string) => {
        setRating(ratingValue);

        if (Object.values(Experience).includes(experienceValue as Experience)) {
            setExperience(experienceValue as Experience);
            handleNextStep();
        } else {
            console.error("Invalid experience value:", experienceValue);
        }
    };

    const handleCommentSubmit = async (commentValue: string) => {
        setComment(commentValue);

        // Update tipping record with all collected data
        if (tippingId) {
            // after rp id and secret comes

            await updateTipping(tippingId, {
                rating: rating || 0, // Default to 0 if no rating was provided
                experience: experience || "no_experience", // Default to "no_experience" if skipped
                comments: comment || "no_comment",
            });

            console.log({
                rating: rating || 0, // Default to 0 if no rating was provided
                experience: experience || "no_experience", // Default to "no_experience" if skipped
                comments: comment || "no_comment",
            })
        }

        handleNextStep();
    };

    if (!waiter) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-gray-500">Loading Waiter Data...</h2>
            </div>
        );
    }

    if (step === 1) {
        return (
            <TipPayment
                waiterId={waiter._id as string}
                restaurantId={restaurantId as string}
                initialTipAmount={tipAmount || 0}
                onPaymentSuccess={handlePaymentSuccess} // Pass handler to TipPayment
                setTippingId={setTippingId} // Pass setTippingId to TipPayment
            />
        );
    }

    if (step === 2) {
        return <RatingAndExperience onNext={handleRatingExperienceSubmit} />;
    }

    if (step === 3) {
        return <CommentOnWaiter onNext={handleCommentSubmit} />;
    }

    if (step === 4) {
        handleThankYouRedirect();
        return (
            <div className="flex flex-col items-center justify-center h-screen space-y-5">
                <h1 className="text-3xl font-bold">Thank You!</h1>
                <p>Redirecting you in 10 seconds...</p>
            </div>
        );
    }

    return null;
};

export default PayTip;
