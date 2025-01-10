'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from './Input';
import { Value } from 'react-phone-number-input';
import FormBtn from './FormBtn';
import { useCart } from '@/app/context/CartContext';
import { IOrder } from '@/types/schematypes';
import { createMenuOrder } from '@/api/orderApi';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';

// Define the shape of a cart item
interface CartItem {
    id: string;
    quantity: number;
}

// Define the shape of the cart state
interface CartState {
    items: CartItem[];
}


interface FormData {
    name: string;
    tableNumber: string;
    phoneNumber: string; // E.164 formatted phone number
    cartData?: CartState
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

    const { state, dispatch } = useCart();

    const params = useParams();
    const router = useRouter();

    const { restaurantId } = params


    const orderCreate = async (data: Partial<IOrder>) => {
        try {
            await createMenuOrder(data);
            toast.success('Order Placed', { position: 'top-center' })
            dispatch({ type: 'CLEAR_CART' });
            router.push(`/restaurant/${restaurantId}/menu`);
        } catch (error) {
            console.error("error in creating order" + error);
            toast.error("Order placing failed")
        }
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log('Form Data:', {
            ...data,
            phoneNumber: phone, // Ensure correct phone number value
            cartData: state.items
        });

        const menuOrder: Partial<IOrder> = {
            menuItems: state.items.map((item) => {
                return {
                    menuId: item.id,
                    quantity: item.quantity
                }
            }),
            restaurantId: restaurantId as string,
            tableNo: data.tableNumber,
            customerName: data.name,
            phoneNumber: phone,
        }

        await orderCreate(menuOrder)

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
