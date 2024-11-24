import React, { useState } from 'react';
import { FieldError, Merge, FieldErrorsImpl, UseFormRegisterReturn, FieldValues } from 'react-hook-form';
import PhoneInput, { Value } from 'react-phone-number-input';
import { Star } from 'lucide-react'; // Using Lucide for stars
import 'react-phone-number-input/style.css';

interface InputProps<TFieldValues extends FieldValues> {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<TFieldValues>>;
    required?: boolean;
    className?: string;
    register?: UseFormRegisterReturn;
    phoneValue?: Value | string | undefined; // Corrected type here
    onPhoneChange?: (value?: Value) => void; // Corrected type here
    ratingValue?: number; // For rating value
    onRatingChange?: (value: number) => void; // For rating change handler
}

const Input = <TFieldValues extends FieldValues>({
    id,
    label,
    type = 'text',
    placeholder = '',
    error,
    required = false,
    className = '',
    register,
    phoneValue = '',
    onPhoneChange = () => { },
    ratingValue = 0,
    onRatingChange = () => { },
}: InputProps<TFieldValues>) => {
    const [rating, setRating] = useState<number>(ratingValue); // Local state for rating input

    const handleStarClick = (value: number) => {
        setRating(value);
        onRatingChange(value); // Pass the rating change to parent
    };

    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={id} className="block text-sm font-medium text-black">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>

            {/* Conditional rendering based on input type */}
            {type === 'tel' ? (
                <PhoneInput
                    maxLength={11}
                    value={phoneValue}
                    onChange={onPhoneChange}
                    placeholder={placeholder}
                    limitMaxLength={true}
                    style={{ outline: 'none' }}
                    defaultCountry="IN"
                    className={`w-full mt-2 p-2 text-xs border-b ${error ? 'border-b-red-500' : 'border-b-lightText'
                        } bg-transparent text-black focus:outline-none`}
                />
            ) : type === 'rating' ? (
                // Rating input type
                <div className="flex mt-4 gap-6">
                    {[1, 2, 3, 4, 5].map((starValue) => (
                        <Star
                            key={starValue}
                            className={`cursor-pointer text-ratingYellow  ${starValue <= rating ? ' fill-ratingYellow' : 'text-ratingYellow'}`}

                            size={24}
                            onClick={() => handleStarClick(starValue)}
                        />
                    ))}
                </div>
            ) : (
                // Default text input
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className={`w-full mt-2 p-2 text-xs border-b ${error ? 'border-b-red-500' : 'border-b-lightText'
                        } bg-transparent text-black focus:outline-none`}
                    {...register}
                />
            )}

            {error && <p className="text-red-500 text-xs mt-1">{'Invalid Input'}</p>}
        </div>
    );
};

export default Input;
