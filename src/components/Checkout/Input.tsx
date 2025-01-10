/* eslint-disable @typescript-eslint/no-explicit-any */
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
  disabled?: boolean;
  folder?: string;
  register?: UseFormRegisterReturn;
  phoneValue?: Value | string | undefined;
  onPhoneChange?: (value?: Value) => void;
  ratingValue?: number;
  onRatingChange?: (value: number) => void;
  onImageChange?: (fileUrl: string) => void;
  options?: string[]; // Dropdown options
  onDropdownChange?: (value: string) => void;
}

const Input = <TFieldValues extends FieldValues>({
  id,
  label,
  type = 'text',
  placeholder = '',
  folder = '',
  error,
  required = false,
  disabled = false,
  className = '',
  register,
  phoneValue = '',
  onPhoneChange = () => { },
  ratingValue = 0,
  onRatingChange = () => { },
  onImageChange = () => { },
  options = [],
  onDropdownChange = () => { },
}: InputProps<TFieldValues>) => {
  const [rating, setRating] = useState<number>(ratingValue);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectedDropdown, setSelectedDropdown] = useState<string>('');

  const handleStarClick = (value: number) => {
    setRating(value);
    onRatingChange(value);
  };

  const handleImageChange = (result: any) => {
    const imageUrl = result.info.secure_url;
    onImageChange(imageUrl);
  };

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedDropdown(value);
    onDropdownChange(value);
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
          disabled={disabled}
          value={phoneValue}
          onChange={onPhoneChange}
          placeholder={placeholder}
          defaultCountry="IN"
          className={`w-full mt-2 p-2 text-xs border-b ${error ? 'border-b-red-500' : 'border-b-lightText'} bg-transparent text-black focus:outline-none`}
        />
      ) : type === 'rating' ? (
        <div className="flex mt-4 gap-6">
          {[1, 2, 3, 4, 5].map((starValue) => (
            <Star
              key={starValue}
              className={`cursor-pointer ${starValue <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
              size={24}
              onClick={() => handleStarClick(starValue)}
            />
          ))}
        </div>
      ) : type === 'image' ? (
        <CldUploadWidget
          uploadPreset="tipeasy-frontend"
          onSuccess={handleImageChange}
          options={{ folder }}
        >
          {({ open }) => (
            <button
              type="button"
              className="w-full mt-2 p-2 text-xs border-b bg-primary text-white rounded-md focus:outline-none"
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
            disabled={disabled}
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
      ) : type === 'dropdown' ? (
        <select
          id={id}
          value={selectedDropdown}
          onChange={handleDropdownChange}
          className={`w-full mt-2 p-2 text-xs border-b ${error ? 'border-b-red-500' : 'border-b-lightText'} bg-transparent text-black focus:outline-none`}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          className={`w-full mt-2 p-2 text-xs border-b ${error ? 'border-b-red-500' : 'border-b-lightText'} bg-transparent text-black focus:outline-none`}
          {...register}
        />
      )}

      {error && <p className="text-red-500 text-xs mt-1">{`Invalid Input : ${error}`}</p>}
    </div>
  );
};

export default Input;
