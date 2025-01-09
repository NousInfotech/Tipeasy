
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IRestaurant } from '@/types/schematypes';
import { PencilIcon } from 'lucide-react';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';
import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { updateRestaurant } from '@/api/restaurantApi';
import { deleteCloudinaryImageApi } from '@/api/cloudinaryApi';
import { toast } from 'react-toastify';
import Input from '@/components/Checkout/Input';

interface ViewRestaurantProps {
    restaurant: IRestaurant;
}

const ViewRestaurant: React.FC<ViewRestaurantProps> = ({ restaurant }) => {
    const { register, handleSubmit } = useForm<IRestaurant>({
        defaultValues: restaurant,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [bannerImage, setBannerImage] = useState(restaurant.profileImage || '');


    const handleImageChange = async (result: any) => {
        const imageUrl = result.info.secure_url; // Get the image URL from Cloudinary
        await deleteCloudinaryImageApi(bannerImage);
        await deleteCloudinaryImageApi(restaurant.profileImage as string)
        await onUpdateRestaurant(restaurant._id as string, { profileImage: imageUrl })
        setBannerImage(imageUrl); // Update state with new image
    };

    const handleSave = (data: IRestaurant) => {
        onUpdateRestaurant(restaurant._id as string, data);
        setIsEditing(false);
    };

    const onUpdateRestaurant = async (id: string, updatedData: Partial<IRestaurant>) => {
        try {
            const response = await updateRestaurant(id, updatedData);
            toast.success("Restaurant Updated Successfully")
            console.log(response)
        } catch (error) {
            console.error('Error creating restaurant:', error);
            toast.error("Error in creating Restaurant" + error)
        }
    }

    return (
        <section>
            <HeaderwithBackButton heading="Edit Restaurant" />
            <div className="p-4 space-y-4">
                {/* Banner Image */}
                <div className="relative">
                    <img
                        src={bannerImage || '/placeholder-banner.jpg'}
                        alt="Restaurant Banner"
                        className="w-full h-48 object-cover rounded-md"
                    />
                    <CldUploadWidget
                        uploadPreset="tipeasy-frontend"
                        onSuccess={handleImageChange}
                        options={{
                            folder: 'restaurantCoverImages',
                        }}
                    >
                        {({ open }) => (
                            <button
                                type="button"
                                className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full"
                                onClick={() => open()}
                            >
                                <PencilIcon className="w-5 h-5" />
                            </button>
                        )}
                    </CldUploadWidget>
                </div>


                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Restaurant Details</h1>
                    <button onClick={() => setIsEditing((prev) => !prev)}>
                        <PencilIcon className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(handleSave)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            {...register('title')}
                            type="text"
                            disabled={!isEditing}
                            className={`w-full p-2 text-xs border-b bg-transparent text-black focus:outline-none`}
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium">Phone Number</label>
                        <input
                            {...register('phoneNumber')}
                            type="text"
                            disabled={!isEditing}
                            className={`w-full p-2 text-xs border-b bg-transparent text-black focus:outline-none`}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            {...register('email')}
                            type="email"
                            disabled={!isEditing}
                            className={`w-full p-2 text-xs border-b bg-transparent text-black focus:outline-none`}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            {...register('description')}
                            disabled={!isEditing}
                            className={`w-full p-2 text-xs border-b bg-transparent text-black focus:outline-none`}
                        ></textarea>
                    </div>

                    {/* Address */}
                    <h2 className="text-xl font-bold mt-6">Address Details</h2>
                    {Object.keys(restaurant.address).map((key) => (
                        <div key={key}>
                            <label className="block text-sm font-medium capitalize">{key}</label>
                            <input
                                {...register(`address.${key as keyof IRestaurant['address']}`)}
                                type="text"
                                disabled={!isEditing}
                                className={`w-full p-2 text-xs border-b bg-transparent text-black focus:outline-none`}
                            />
                        </div>
                    ))}
                </form>

                {/* Buttons */}
                {isEditing && (
                    <div className="mt-4 flex justify-end space-x-2">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit(handleSave)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ViewRestaurant;
