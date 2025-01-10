'use client';

import { IOrder } from '@/types/schematypes';
import dynamic from 'next/dynamic';

const OrderList = dynamic(() => import('@/components/RestaurantAdmin/Orders/OrderList'));

interface OrderListPageProps {
    orders: IOrder[]; // Use proper typing as needed
}

const OrderListPage: React.FC<OrderListPageProps> = ({ orders }) => {
    return <OrderList orders={orders} />;
};

export default OrderListPage;
