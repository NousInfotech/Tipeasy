'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from './Input';
import { Value } from 'react-phone-number-input';
import FormBtn from './FormBtn';

interface FormData {
    name: string;
    tableNumber: string;
    phoneNumber: string; // E.164 formatted phone number
}

const CheckoutForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: '',
            tableNumber: '',
            phoneNumber: '', // Default value for phoneNumber
        },
    });

    const [phone, setPhone] = useState<Value | undefined>(undefined);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log('Form Data:', {
            ...data,
            phoneNumber: phone // Ensure correct phone number value
        });
    };

    const handlePhoneChange = (value?: Value) => {
        setPhone(value); // Update local state
        setValue('phoneNumber', value || ''); // Sync with form state
        trigger('phoneNumber'); // Trigger validation
    };

    return (
        <div className="flex items-center justify-center bg-transparent text-black">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                {/* Name Field */}
                <Input
                    id="name"
                    label="Name"
                    placeholder="Your name..."
                    register={register('name', { required: 'Name is required' })}
                    error={errors.name}
                    required
                />

                {/* Table Number Field */}
                <Input
                    id="tableNumber"
                    label="Table Number"
                    type="number"
                    placeholder="Your table number..."
                    register={register('tableNumber', {
                        required: 'Table Number is required',
                    })}
                    error={errors.tableNumber}
                    required
                />

                {/* Phone Number Field */}
                <Input
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter your phone number"
                    phoneValue={phone}
                    onPhoneChange={handlePhoneChange}
                    error={errors.phoneNumber}
                />

                {/* Buttons */}
                <div className="flex justify-between mt-4 gap-4">
                    <FormBtn
                        title="Cancel"
                        filled={false}
                        callback={() => console.log('Cancel clicked')}
                    />
                    <FormBtn
                        type="submit"
                        title="Proceed"
                        filled={true}
                        callback={() => onSubmit}
                    />
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
