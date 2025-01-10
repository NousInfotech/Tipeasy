/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IWaiter } from '@/types/schematypes';
import { PencilIcon } from 'lucide-react';
import { updateWaiter } from '@/api/restaurantApi';
import { toast } from 'react-toastify';
import Input from '@/components/Checkout/Input';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { decryptData } from '@/utils/encryptDataByCrypto';

interface WaiterFormProps {
    waiter: IWaiter;
}



const EditWaiterForm: React.FC<WaiterFormProps> = ({ waiter }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IWaiter>({
        defaultValues: waiter,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [showBankDetails, setShowBankDetails] = useState(false);
    const [profileImage, setProfileImage] = useState(waiter.imgSrc || '');

    useEffect(() => {
        if (waiter.bankDetails) {
            try {
                setValue('bankDetails.ifsc', decryptData(waiter.bankDetails.ifsc));
                setValue('bankDetails.accountNumber', decryptData(waiter.bankDetails.accountNumber));
            } catch (error) {
                console.error('Error decrypting bank details:', error);
            }
        }
    }, [waiter.bankDetails, setValue]);

    const handleImageChange = async (result: any) => {
        const imageUrl = result.info.secure_url;
        setProfileImage(imageUrl);
        setValue('imgSrc', imageUrl);
    };



    const onSubmit: SubmitHandler<IWaiter> = async (data) => {
        try {
            console.log(data);
            await updateWaiter(data._id as string, data as IWaiter);
            toast.success('Waiter details updated successfully');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating waiter:', error);
            toast.error('Error updating waiter details');
        }
    };

    return (
        <section>
            <HeaderwithBackButton heading='Edit Waiter Details' />
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl font-bold'>Waiter Details</h2>
                    <button
                        type='button'
                        onClick={() => setIsEditing(!isEditing)}
                        className='flex items-center text-blue-500 hover:underline'
                    >
                        <PencilIcon className='w-5 h-5 mr-2' /> {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                </div>

                {/* Profile Image Section */}
                <div className='relative'>
                    <Image
                        width={150}
                        height={150}
                        src={profileImage || '/placeholder-image.jpg'}
                        alt='Waiter Profile Image'
                        className='rounded-full object-cover'
                    />
                    {isEditing && (
                        <CldUploadWidget
                            uploadPreset='waiter-profiles'
                            onSuccess={handleImageChange}
                            options={{ folder: 'waiterProfileImages' }}
                        >
                            {({ open }) => (
                                <button
                                    type='button'
                                    className='absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full'
                                    onClick={() => open()}
                                >
                                    <PencilIcon className='w-5 h-5' />
                                </button>
                            )}
                        </CldUploadWidget>
                    )}
                </div>

                <Input
                    id='waiter-name'
                    label='Waiter Name'
                    register={register('name', { required: 'Name is required' })}
                    error={errors.name}
                    disabled={!isEditing}
                />

                <Input
                    id='waiter-email'
                    label='Email'
                    type='email'
                    register={register('email')}
                    error={errors.email}
                    disabled={false}
                />

                <Input
                    id='waiter-phone'
                    label='Phone Number'
                    type={isEditing ? 'tel' : 'text'}
                    register={register('phoneNumber')}
                    error={errors.phoneNumber}
                    disabled={!isEditing}
                />

                {/* {isEditing && (
                    <>
                        <Input
                            id='waiter-password'
                            label='Password'
                            type='password'
                            register={register('password')}
                            error={errors.password}
                        />
                        <Input
                            id='waiter-confirm-password'
                            label='Confirm Password'
                            type='password'
                            register={register('confirmPassword', {
                                validate: (value) => value === watch('password') || 'Passwords do not match',
                            })}
                            error={errors.confirmPassword}
                        />
                    </>
                )} */}

                {/* Bank Details Section */}
                <div className='mt-4'>
                    <button
                        type='button'
                        className='text-blue-500 hover:underline'
                        onClick={() => setShowBankDetails(!showBankDetails)}
                    >
                        {showBankDetails ? 'Hide Bank Details' : 'Show Bank Details'}
                    </button>

                    {showBankDetails && (
                        <div className='grid lg:grid-cols-2 gap-4 mt-4'>
                            <Input
                                id='waiter-bank-ifsc'
                                label='IFSC Code'
                                register={register('bankDetails.ifsc')}
                                error={errors.bankDetails?.ifsc}
                                disabled={!isEditing}
                            />
                            <Input
                                id='waiter-bank-accountName'
                                label='Account Holder Name'
                                register={register('bankDetails.accountName')}
                                error={errors.bankDetails?.accountName}
                                disabled={!isEditing}
                            />
                            <Input
                                id='waiter-bank-accountNumber'
                                label='Account Number'
                                register={register('bankDetails.accountNumber')}
                                error={errors.bankDetails?.accountNumber}
                                disabled={!isEditing}
                            />
                        </div>
                    )}
                </div>

                {isEditing && (
                    <button
                        type='submit'
                        className='w-full py-2 px-4 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90'
                    >
                        Save Changes
                    </button>
                )}
            </form>
        </section>
    );
};

export default EditWaiterForm;
