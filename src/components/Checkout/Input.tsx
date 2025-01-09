/* eslint-disable  @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import {
  FieldError,
  Merge,
  FieldErrorsImpl,
  UseFormRegisterReturn,
  FieldValues,
} from 'react-hook-form';
import PhoneInput, { Value } from 'react-phone-number-input';
import { Star, Eye, EyeOff } from 'lucide-react'; // Using Lucide for icons
import 'react-phone-number-input/style.css';
import { CldUploadWidget } from 'next-cloudinary';



interface InputProps<TFieldValues extends FieldValues> {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<TFieldValues>>;
  required?: boolean;
  className?: string;
  register?: UseFormRegisterReturn;
  phoneValue?: Value | string | undefined;
  onPhoneChange?: (value?: Value) => void;
  ratingValue?: number;
  onRatingChange?: (value: number) => void;
  onImageChange?: (fileUrl: string) => void; // For handling image URL
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
  onImageChange = () => { },
}: InputProps<TFieldValues>) => {
  const [rating, setRating] = useState<number>(ratingValue); // Local state for rating input
  const [showPassword, setShowPassword] = useState<boolean>(false); // State for toggling password visibility

  const handleStarClick = (value: number) => {
    setRating(value);
    onRatingChange(value); // Pass the rating change to parent
  };

  const handleImageChange = (result: any) => {
    const imageUrl = result.info.secure_url; // Get the image URL from Cloudinary
    onImageChange(imageUrl); // Update the parent component with the image URL
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
          defaultCountry="IN"
          style={{ outline: 'none' }}
          className={`w-full mt-2 p-2 text-xs border-b ${error ? 'border-b-red-500' : 'border-b-lightText'} bg-transparent text-black focus:outline-none`}
        />
      ) : type === 'rating' ? (
        <div className="flex mt-4 gap-6">
          {[1, 2, 3, 4, 5].map((starValue) => (
            <Star
              key={starValue}
              className={`cursor-pointer text-ratingYellow ${starValue <= rating ? 'fill-ratingYellow' : 'text-ratingYellow'}`}
              size={24}
              onClick={() => handleStarClick(starValue)}
            />
          ))}
        </div>
      ) : type === 'image' ? (
        <CldUploadWidget
          uploadPreset="tipeasy-frontend" // Your Cloudinary upload preset
          onSuccess={handleImageChange}
          options={{
            folder: 'restaurantCoverImages', // Specify the folder for the image upload
          }}
        >
          {({ open }) => (
            <button
              type="button"
              className={`w-full mt-2 p-2 text-xs border-b bg-transparent text-black focus:outline-none ${className}`}
              onClick={() => open()}
            >
              Choose an Image
            </button>
          )}
        </CldUploadWidget>
      ) : type === 'password' ? (
        <div className="relative w-full mt-2">
          <input
            id={id}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            className={`w-full p-2 text-xs border-b ${error ? 'border-b-red-500' : 'border-b-lightText'} bg-transparent text-black focus:outline-none`}
            {...register}
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`w-full mt-2 p-2 text-xs border-b ${error ? 'border-b-red-500' : 'border-b-lightText'} bg-transparent text-black focus:outline-none`}
          {...register}
        />
      )}

      {error && <p className="text-red-500 text-xs mt-1">Invalid Input</p>}
    </div>
  );
};

export default Input;
