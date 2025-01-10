/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/components/Checkout/Input';
import { Value } from 'react-phone-number-input';
import { toast } from 'react-toastify';
import { IWaiter } from '@/types/schematypes';
import { createWaiter } from '@/api/restaurantApi';
import { useParams, useRouter } from 'next/navigation';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';


interface WaiterFormValues {
    waiter: Partial<IWaiter>;
}


const WaiterForm = () => {

    const params = useParams();

    const { restaurantId } = params;

    const { register, handleSubmit, setValue, trigger, formState: { errors }, watch } = useForm<WaiterFormValues>();
    const [waiterPhone, setWaiterPhone] = useState<Value | undefined>(undefined);
    const router = useRouter();

    const handleWaiterPhoneChange = (value?: Value) => {
        setWaiterPhone(value);
        setValue('waiter.phoneNumber', value || '');
        trigger('waiter.phoneNumber');
    };

    const onImageChange = (url: string | null) => {
        setValue("waiter.imgSrc", url as string);
    };

    const onSubmit: SubmitHandler<WaiterFormValues> = async (data) => {
        try {
            console.log('Waiter Form Data:', data);
            await createWaiterByForm(data);
            router.back();
            router.refresh();
        } catch (error) {
            console.error('Error submitting waiter form:', error);
        }
    };

    const createWaiterByForm = async (data: WaiterFormValues) => {
        try {
            const response = await createWaiter({
                ...data.waiter,
                restaurantId: restaurantId as string,
            }) as unknown as IWaiter;
            console.log(response);
            toast.success('Waiter created successfully');
            router.refresh();
        } catch (error) {
            toast.error('Error in creating Waiter');
            console.error('Error creating waiter:', error);
        }
    };

    return (
        <section>
            <HeaderwithBackButton heading='Add Waiter' />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <h2 className="text-xl font-bold">Waiter Form</h2>
                <div className="grid lg:grid-cols-2 gap-4">
                    <Input
                        id="waiter-name"
                        label="Waiter Name *"
                        register={register('waiter.name', { required: 'Name is required' })}
                        error={errors.waiter?.name}
                    />
                    <Input
                        id="waiter-email"
                        label="Waiter Email"
                        type="email"
                        register={register('waiter.email')}
                        error={errors.waiter?.email}
                    />
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                    <Input
                        id="waiter-password"
                        label="Password *"
                        type="password"
                        register={register('waiter.password', { required: 'Password is required' })}
                        error={errors.waiter?.password}
                    />
                    <Input
                        id="waiter-confirm-password"
                        label="Confirm Password *"
                        type="password"
                        register={register('waiter.confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) => value === watch('waiter.password') || 'Passwords do not match',
                        })}
                        error={errors.waiter?.confirmPassword}
                    />
                </div>
                <Input
                    id="waiter-phone"
                    label="Phone Number *"
                    type="tel"
                    phoneValue={waiterPhone}
                    onPhoneChange={handleWaiterPhoneChange}
                    error={errors.waiter?.phoneNumber}
                />

                <Input
                    id="waiter-profile-image"
                    label="Waiter Profile Image"
                    type="image"
                    error={errors.waiter?.imgSrc}
                    onImageChange={onImageChange}
                    folder='waiters'
                />

                <h3 className="text-lg font-bold mt-4">Bank Details</h3>
                <div className="grid lg:grid-cols-2 gap-4">
                    <Input
                        id="waiter-bank-ifsc"
                        label="IFSC Code"
                        register={register('waiter.bankDetails.ifsc')}
                        error={errors.waiter?.bankDetails?.ifsc}
                    />
                    <Input
                        id="waiter-bank-accountName"
                        label="Account Holder Name"
                        register={register('waiter.bankDetails.accountName')}
                        error={errors.waiter?.bankDetails?.accountName}
                    />
                </div>
                <Input
                    id="waiter-bank-accountNumber"
                    label="Account Number"
                    register={register('waiter.bankDetails.accountNumber')}
                    error={errors.waiter?.bankDetails?.accountNumber}
                />

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90"
                >
                    Create Waiter
                </button>
            </form>
        </section>
    );
};

export default WaiterForm;
