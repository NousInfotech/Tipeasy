'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/components/Checkout/Input';
import { Value } from 'react-phone-number-input';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { IUser } from '@/types/schematypes';
import { createUser } from '@/api/userApi';

interface AdminFormValues {
    admin: IUser;
}

const AdminForm = ({ restaurantId }: { restaurantId: string }) => {
    const { register, handleSubmit, formState: { errors }, watch, setValue, trigger } = useForm<AdminFormValues>();
    const [adminPhone, setAdminPhone] = useState<Value | undefined>(undefined);
    const router = useRouter();

    // Handle phone change specific to admin form
    const handleAdminPhoneChange = (value?: Value) => {
        setAdminPhone(value);
        setValue('admin.phoneNumber', value || ''); // Updated to match nested structure
        trigger('admin.phoneNumber'); // Correct field name for nested object
    };

    const createAdmin = async (data: AdminFormValues) => {
        try {
            const adminData = { ...data.admin, restaurantId: restaurantId, role: "admin" };
            console.log(adminData)
            const response = await createUser(adminData as IUser); // Actual API call
            console.log(response);
            toast.success('Admin created successfully');
            router.back();
        } catch (error) {
            toast.error('Error in creating Admin');
            console.error('Error creating admin:', error);
        }
    };

    const onSubmit: SubmitHandler<AdminFormValues> = async (data) => {
        try {
            console.log('Admin Form Data:', data.admin); // Accessing the admin data from AdminFormValues
            await createAdmin(data); // Passing the full data object containing admin info
        } catch (error) {
            console.error('Error submitting admin form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-xl font-bold">Admin Form</h2>
            <div className="grid lg:grid-cols-2 gap-4">
                <Input
                    id="admin-username"
                    label="Username *"
                    register={register('admin.username', { required: 'Username is required' })} // Updated path
                    error={errors.admin?.username} // Updated path
                />
                <Input
                    id="admin-email"
                    label="Email *"
                    type="email"
                    register={register('admin.email', { required: 'Email is required' })} // Updated path
                    error={errors.admin?.email} // Updated path
                />
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
                <Input
                    id="admin-password"
                    label="Password *"
                    type="password"
                    register={register('admin.password', { required: 'Password is required' })} // Updated path
                    error={errors.admin?.password} // Updated path
                />
                <Input
                    id="admin-confirm-password"
                    label="Confirm Password *"
                    type="password"
                    register={register('admin.confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) => value === watch('admin.password') || 'Passwords do not match', // Updated path
                    })}
                    error={errors.admin?.confirmPassword} // Updated path
                />
            </div>
            <Input
                id="admin-phone"
                label="Phone Number"
                type="tel"
                phoneValue={adminPhone}
                onPhoneChange={handleAdminPhoneChange} // Using the specific phone handler here
                error={errors.admin?.phoneNumber} // Updated path
            />
            <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90"
            >
                Create Admin
            </button>
        </form>
    );
};

export default AdminForm;
