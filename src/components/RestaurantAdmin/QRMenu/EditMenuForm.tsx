/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IMenu } from '@/types/schematypes';
import { PencilIcon } from 'lucide-react';
import { updateMenu } from '@/api/restaurantApi';
import { toast } from 'react-toastify';
import Input from '@/components/Checkout/Input';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

interface MenuFormProps {
    menu: Partial<IMenu>;
}

const EditMenuForm: React.FC<MenuFormProps> = ({ menu }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IMenu>({
        defaultValues: menu,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [availability, setAvailability] = useState(menu.availability); // Default to available
    const [profileImage, setProfileImage] = useState(menu.imgSrc || '');

    const handleImageChange = async (result: any) => {
        const imageUrl = result.info.secure_url;
        setProfileImage(imageUrl);
        setValue('imgSrc', imageUrl);
    };

    const onSubmit: SubmitHandler<IMenu> = async (data) => {
        try {
            const updatedData = { ...data, availability };
            await updateMenu(data._id as string, updatedData);
            toast.success('Menu details updated successfully');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating menu:', error);
            toast.error('Error updating menu details');
        }
    };

    return (
        <section>
            <HeaderwithBackButton heading='Edit Menu Details' />
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl font-bold'>Menu Details</h2>
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
                        alt='Menu Image'
                        className='rounded-full object-cover'
                    />
                    {isEditing && (
                        <CldUploadWidget
                            uploadPreset='menu-profiles'
                            onSuccess={handleImageChange}
                            options={{ folder: 'menuProfileImages' }}
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
                    id='menu-title'
                    label='Menu Title'
                    register={register('title', { required: 'Title is required' })}
                    error={errors.title}
                    disabled={!isEditing}
                />

                <Input
                    id='menu-description'
                    label='Menu Description'
                    register={register('description')}
                    error={errors.description}
                    disabled={!isEditing}
                />

                <Input
                    id='menu-price'
                    label='Price'
                    type='number'
                    register={register('price', { required: 'Price is required' })}
                    error={errors.price}
                    disabled={!isEditing}
                />

                {/* Dropdowns for Category and Availability */}
                <Input
                    id='menu-category'
                    label='Category'
                    type='dropdown'
                    options={['Starter', 'Main Course', 'Dessert']}
                    onDropdownChange={(value) => setValue('category', value)}
                    register={register('category', { required: 'Category is required' })}
                    error={errors.category}
                    disabled={!isEditing}
                />

                <Input
                    id='menu-availability'
                    label='Availability'
                    type='dropdown'
                    options={['Available', 'Out of Stock']}
                    onDropdownChange={(value) => setAvailability(value == 'Available')}
                    disabled={!isEditing}
                />

                <Input
                    id='menu-dietary-preference'
                    label='Dietary Preference'
                    type='dropdown'
                    options={['Veg', 'Non-Veg', 'Vegan']}
                    onDropdownChange={(value) => setValue('dietaryPreference', value)}
                    register={register('dietaryPreference', { required: 'Dietary preference is required' })}
                    error={errors.dietaryPreference}
                    disabled={!isEditing}
                />

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

export default EditMenuForm;
