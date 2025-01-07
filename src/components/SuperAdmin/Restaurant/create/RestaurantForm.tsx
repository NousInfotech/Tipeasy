'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/components/Checkout/Input';
import { Value } from 'react-phone-number-input';
import { toast } from 'react-toastify';
import { IRestaurant } from '@/types/schematypes';
import { createRestaurant } from '@/api/restaurantApi';
import { useRouter } from 'next/navigation'; // Import router for navigation

interface RestaurantFormValues {
    restaurant: IRestaurant;
}

const RestaurantForm = () => {
    const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm<RestaurantFormValues>();
    const [restaurantPhone, setRestaurantPhone] = useState<Value | undefined>(undefined);
    const router = useRouter(); // Initialize router

    // Handle phone change specific to restaurant form
    const handleRestaurantPhoneChange = (value?: Value) => {
        setRestaurantPhone(value);
        setValue('restaurant.phoneNumber', value || '');
        trigger('restaurant.phoneNumber');
    };

    const onImageChange = (url: string | null) => {
        setValue("restaurant.profileImage", url as string);
    };


    const onSubmit: SubmitHandler<RestaurantFormValues> = async (data) => {
        try {
            console.log('Restaurant Form Data:', data);

            // Include the image URL in the API call
            await createRestaurantByForm(data);

            router.back(); // Redirect to the previous page
        } catch (error) {
            console.error('Error submitting restaurant form:', error);
        }
    };

    const createRestaurantByForm = async (data: RestaurantFormValues) => {
        try {
            const response = await createRestaurant({
                ...data.restaurant,
                qrStatus: 'none',
                profileImage: data.restaurant.profileImage, // Include the image URL here
            }) as unknown as IRestaurant; // Actual API call 
            console.log(response)
            toast.success('Restaurant created successfully');
        } catch (error) {
            toast.error('Error in creating Restaurant');
            console.error('Error creating restaurant:', error);
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-xl font-bold">Restaurant Form</h2>
            <div className="grid lg:grid-cols-2 gap-4">
                <Input
                    id="restaurant-title"
                    label="Restaurant Title *"
                    register={register('restaurant.title', { required: 'Title is required' })}
                    error={errors.restaurant?.title}
                />
                <Input
                    id="restaurant-email"
                    label="Restaurant Email"
                    type="email"
                    register={register('restaurant.email')}
                    error={errors.restaurant?.email}
                />
            </div>
            <Input
                id="restaurant-phone"
                label="Phone Number *"
                type="tel"
                phoneValue={restaurantPhone}
                onPhoneChange={handleRestaurantPhoneChange} // Using the specific phone handler here
                error={errors.restaurant?.phoneNumber}
            />
            <Input
                id="restaurant-description"
                label="Description"
                register={register('restaurant.description')}
                error={errors.restaurant?.description}
            />

            {/* Address Section */}
            <h3 className="text-lg font-bold mt-4">Restaurant Address</h3>
            <div className="grid lg:grid-cols-2 gap-4">
                <Input
                    id="restaurant-address-no"
                    label="No*"
                    register={register('restaurant.address.no', { required: 'No is required' })}
                    error={errors.restaurant?.address?.no}
                />
                <Input
                    id="restaurant-address-street"
                    label="Street *"
                    register={register('restaurant.address.street', { required: 'Street is required' })}
                    error={errors.restaurant?.address?.street}
                />
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
                <Input
                    id="restaurant-address-Area"
                    label="Area *"
                    register={register('restaurant.address.area',)}
                    error={errors.restaurant?.address?.area}
                />
                <Input
                    id="restaurant-address-city"
                    label="City *"
                    register={register('restaurant.address.townCity', { required: 'City is required' })}
                    error={errors.restaurant?.address?.townCity}
                />

            </div>
            <div className="grid lg:grid-cols-2 gap-4">
                <Input
                    id="restaurant-address-state"
                    label="State *"
                    register={register('restaurant.address.state', { required: 'State is required', value: 'Telangana' })} // Default value for state
                    error={errors.restaurant?.address?.state}
                />
                <Input
                    id="restaurant-address-postalCode"
                    label="Postal Code *"
                    register={register('restaurant.address.pinCode', { required: 'Postal code is required' })}
                    error={errors.restaurant?.address?.pinCode}
                />
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
                <Input
                    id="restaurant-address-district"
                    label="District *"
                    register={register('restaurant.address.district', { required: 'District is required' })}
                    error={errors.restaurant?.address?.district}
                />
                <Input
                    id="restaurant-address-country"
                    label="Country *"
                    register={register('restaurant.address.country', { value: 'India' })} // Default value for country
                    error={errors.restaurant?.address?.country}
                />
            </div>

            <Input
                id="google-location"
                label="Google Map Link"
                type="url"
                register={register('restaurant.googleLocation')}
                placeholder="https://forms.gle/example"
            />
            <Input
                id="restaurant-profile-image"
                label="Restaurant Profile Image"
                type="image"  // Set the input type to 'image' so it triggers the image upload flow
                error={errors.restaurant?.profileImage}
                onImageChange={onImageChange}  // Pass onImageChange to handle the image URL
            />

            <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90"
            >
                Create Restaurant
            </button>
        </form>
    );
};


export default RestaurantForm;
