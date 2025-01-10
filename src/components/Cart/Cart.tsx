'use client';

import React, { useEffect, useState } from 'react';
import HeaderwithBackButton from '../HeaderwithBackButton/HeaderwithBackButton';
import MenuList from '../MenuList/MenuList';
import { useCart } from '@/app/context/CartContext';
import GrandTotal from './GrandTotal';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';
import { useParams, useRouter } from 'next/navigation';
import { IMenu } from '@/types/schematypes';

interface CartProps {
    menuData: IMenu[];
}

const Cart: React.FC<CartProps> = ({ menuData }) => {
    const { state } = useCart(); // Assuming `state` contains cart items
    const [menuItemsWithQuantity, setMenuItemsWithQuantity] = useState<{ item: IMenu; quantity: number }[]>([]);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const params = useParams();
    const router = useRouter(); // Move useRouter to the top level
    const restaurantId = params?.restaurantId;

    const handleOrderClick = () => {
        const payload = {
            items: menuItemsWithQuantity.map(({ item, quantity }) => ({
                id: item._id,
                quantity,
            })),
            total: menuItemsWithQuantity.reduce((acc, { item, quantity }) => acc + item.price * quantity, 0),
        };

        console.log('Order Payload:', payload);

        if (restaurantId) {
            router.push(`/restaurant/${restaurantId}/checkout`);
        } else {
            console.error('Restaurant ID is missing');
        }
    };

    useEffect(() => {
        // Map cart items to include full menu item details with quantity
        const itemsWithQuantity = state.items
            .map(cartItem => {
                const menuItem = menuData.find(item => item._id === cartItem.id);
                return menuItem ? { item: menuItem, quantity: cartItem.quantity } : null;
            })
            .filter(Boolean) as { item: IMenu; quantity: number }[];

        setMenuItemsWithQuantity(itemsWithQuantity);

        // Check if there's at least one item with quantity > 0
        const hasValidItems = itemsWithQuantity.some(({ quantity }) => quantity > 0);
        setIsButtonEnabled(hasValidItems);
    }, [state.items, menuData]);

    const categories = ['Food', 'Salads']; // You can dynamically generate categories if needed

    return (
        <section className="p-4">
            <HeaderwithBackButton heading="Orders" />
            <MenuList
                menuItems={menuItemsWithQuantity.map(({ item }) => item)}
                categories={categories}
                flatView={true} // Set to `true` if you want a flat view (e.g., no category grouping)
            />

            <GrandTotal items={menuItemsWithQuantity} />
            <PrimaryBtn
                title="Order Now"
                callback={handleOrderClick}
                disabled={!isButtonEnabled} // Disable the button if no valid items in the cart
            />
        </section>
    );
};

export default Cart;
