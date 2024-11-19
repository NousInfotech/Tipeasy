'use client'

import React, { useEffect, useState } from 'react';
import HeaderwithBackButton from '../HeaderwithBackButton/HeaderwithBackButton';
import MenuList from '../MenuList/MenuList';
import { useCart } from '@/context/CartContext';
import { MenuItem } from '@/types';
import { menuData } from '@/Mockdata/MenuData';
import GrandTotal from './GrandTotal';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';

const Checkout = () => {
    const { state } = useCart(); // Assuming `state` contains cart items
    const [menuItemsWithQuantity, setMenuItemsWithQuantity] = useState<{ item: MenuItem; quantity: number }[]>([]);

    const handleOrderClick = () => {
        const payload = {
            items: menuItemsWithQuantity.map(({ item, quantity }) => ({
                id: item.id,
                quantity,
            })),
            total: menuItemsWithQuantity.reduce((acc, { item, quantity }) => acc + item.price * quantity, 0),
        };

        console.log('Order Payload:', payload);
        // Implement order submission logic here (e.g., API call)
    };

    useEffect(() => {
        // Map cart items to include full menu item details with quantity
        const itemsWithQuantity = state.items.map(cartItem => {
            const menuItem = menuData.find(item => item.id === cartItem.id);
            return menuItem ? { item: menuItem, quantity: cartItem.quantity } : null;
        }).filter(Boolean) as { item: MenuItem; quantity: number }[];

        setMenuItemsWithQuantity(itemsWithQuantity);
    }, [state.items]);

    const categories = ['Food', 'Salads']; // You can dynamically generate categories if needed

    return (
        <section className='p-4'>
            <HeaderwithBackButton heading="Orders" />
            <MenuList
                menuItems={menuItemsWithQuantity.map(({ item }) => item)}
                categories={categories}
                flatView={true} // Set to `true` if you want a flat view (e.g., no category grouping)
            />

            <GrandTotal items={menuItemsWithQuantity} />
            <PrimaryBtn title='Order Now' callback={handleOrderClick} />
        </section>
    );
};

export default Checkout;
