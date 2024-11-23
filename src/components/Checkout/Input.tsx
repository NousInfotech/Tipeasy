import React from 'react';
import { FieldError, Merge, FieldErrorsImpl, UseFormRegisterReturn } from 'react-hook-form';
import PhoneInput, { Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

type E164Number = string;

interface InputProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    required?: boolean;
    className?: string;
    register?: UseFormRegisterReturn;
    phoneValue?: Value | undefined;
    onPhoneChange?: (value?: Value) => void;
}

const Input: React.FC<InputProps> = ({
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
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={id} className="block text-sm font-medium text-black">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
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

            ) : (
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
