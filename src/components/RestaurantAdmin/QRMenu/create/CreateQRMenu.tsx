/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/components/Checkout/Input';
import { toast } from 'react-toastify';
import { IMenu } from '@/types/schematypes';
import { createMenu } from '@/api/restaurantApi';
import { useParams, useRouter } from 'next/navigation';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';

interface QRMenuFormValues {
    menu: IMenu;
}

const QRMenuForm = () => {

    const params = useParams();
    const { restaurantId } = params;

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<QRMenuFormValues>();
    const [menuImage, setMenuImage] = useState<string | null>(null);
    const [availability, setAvailability] = useState<boolean>(true); // true = available

    const router = useRouter();

    const onImageChange = (url: string) => {
        console.log(menuImage);
        console.log(availability);
        setMenuImage(url);
        setValue("menu.imgSrc", url);
    };

    const onSubmit: SubmitHandler<QRMenuFormValues> = async (data) => {
        try {
            const parsedData = {
                ...data,
                menu: {
                    ...data.menu,
                    price: parseFloat(data.menu.price as unknown as string),  // Ensure price is number
                    availability: availability,
                },
            };

            console.log('Parsed QR Menu Form Data:', parsedData);
            await createQRMenuByForm(parsedData);
            router.back();
            router.refresh();
        } catch (error) {
            console.error('Error submitting QR menu form:', error);
        }
    };

    const createQRMenuByForm = async (data: QRMenuFormValues) => {
        try {
            const response = await createMenu({ ...data.menu, restaurantId: restaurantId as string })
            console.log(response);
            toast.success('QR Menu created successfully');
            router.refresh();
        } catch (error) {
            toast.error('Error in creating QR Menu');
            console.error('Error creating QR menu:', error);
        }
    };

    return (
        <section>
            <HeaderwithBackButton heading='Add QR Menu' />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <h2 className="text-xl font-bold">QR Menu Form</h2>
                <div className="grid lg:grid-cols-2 gap-4">
                    <Input
                        id="menu-title"
                        label="Menu Title *"
                        register={register('menu.title', { required: 'Title is required' })}
                        error={errors.menu?.title}
                    />
                    <Input
                        id="menu-description"
                        label="Menu Description"
                        type="text"
                        register={register('menu.description')}
                        error={errors.menu?.description}
                    />
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                    <Input
                        id="menu-price"
                        label="Price *"
                        type="number"
                        register={register('menu.price', { required: 'Price is required' })}
                        error={errors.menu?.price}
                    />
                    <Input
                        id="menu-category"
                        label="Category *"
                        type="text"
                        register={register('menu.category', { required: 'Category is required' })}
                        error={errors.menu?.category}
                    />
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                    <Input
                        id="menu-availability"
                        label="Availability *"
                        type="dropdown"
                        options={['Available', 'Out of Stock']}
                        onDropdownChange={(value) => setAvailability(value === 'Available')}
                    />

                    <Input
                        id="menu-dietary-preference"
                        label="Dietary Preference *"
                        type="dropdown"
                        options={['Veg', 'Non-Veg', 'Vegan']}
                        onDropdownChange={(value) => setValue('menu.dietaryPreference', value)}
                        error={errors.menu?.dietaryPreference}
                        register={register('menu.dietaryPreference', { required: 'Dietary preference is required' })}
                    />

                </div>

                <Input
                    id="menu-profile-image"
                    label="Menu Image"
                    type="image"
                    error={errors.menu?.imgSrc}
                    onImageChange={onImageChange}
                    folder='menus'
                />

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90"
                >
                    Create QR Menu
                </button>
            </form>
        </section>
    );
};

export default QRMenuForm;
