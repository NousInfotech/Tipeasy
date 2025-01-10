'use client';

import React, { useState } from 'react';

interface RatingAndExperienceProps {
    onNext: (rating: number, experience: string) => void;
}

const emojis = [
    { label: 'very_sad', emoji: '😞' },
    { label: 'sad', emoji: '😟' },
    { label: 'neutral', emoji: '😐' },
    { label: 'happy', emoji: '😊' },
    { label: 'very_happy', emoji: '😄' },
];

const RatingAndExperience: React.FC<RatingAndExperienceProps> = ({ onNext }) => {
    const [rating, setRating] = useState<number>(0);
    const [experience, setExperience] = useState<string>('no_rating');

    const handleNext = () => {
        onNext(rating, experience);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-5">
            <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-3xl ${rating && rating >= star ? 'text-yellow-500' : 'text-gray-400'
                            }`}
                    >
                        ★
                    </button>
                ))}
            </div>
            <div className="flex space-x-3">
                {emojis.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => setExperience(item.label)}
                        className={`text-3xl ${experience === item.label ? 'border-2 border-primary p-1 rounded-full' : ''
                            }`}
                    >
                        {item.emoji}
                    </button>
                ))}
            </div>
            <button
                onClick={handleNext}
                className="bg-primary text-white p-3 rounded-md w-64"
            >
                Submit Review
            </button>
            <button
                onClick={() => onNext(0, 'no_experience')}
                className="text-gray-600 underline"
            >
                Skip
            </button>
        </div>
    );
};

export default RatingAndExperience;
