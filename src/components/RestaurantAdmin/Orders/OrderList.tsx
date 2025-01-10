'use client'

import SearchBar from '@/components/SearchBar/SearchBar';
import { IOrder } from '@/types/schematypes';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import GenericTable from '@/components/CustomTable/GenericTable';

interface OrderListProps {
    orders: IOrder[];
}

interface FormattedOrder {
    id: number;
    _id: string;
    customerName?: string;
    phone: string;
    totalAmount: number;
    dateTime: string;
    status: string;
    notes?: string;
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
    const [rows, setRows] = useState<IOrder[]>([]);
    const [filteredRows, setFilteredRows] = useState<IOrder[]>([]);

    // Initialize rows with order data
    useEffect(() => {
        setRows(orders);
    }, []);

    // Handle search filter
    const handleSearch = (query: string) => {
        const filteredData = rows.filter((order) =>
            Object.values(order).some((value) =>
                String(value).toLowerCase().includes(query.toLowerCase())
            )
        );
        setFilteredRows(filteredData);
    };


    // Format data for GenericTable
    const formatDataForTable = (data: Partial<IOrder>[]) => {
        return data.map((order: Partial<IOrder>, index: number) => ({
            id: index + 1,
            _id: order._id,
            customerName: order.customerName || 'N/A',
            phone: order.phoneNumber || 'N/A',
            totalAmount: order.totalAmount,
            dateTime: new Date(order.dateTime!).toLocaleString(),
            status: order.status,
            notes: order.notes || 'N/A',
        }));
    };

    // Columns for GenericTable
    const columns = [
        { key: 'id', header: 'ID' },
        { key: 'customerName', header: 'Customer Name' },
        { key: 'phone', header: 'Phone' },
        { key: 'totalAmount', header: 'Total Amount (₹)' },
        { key: 'dateTime', header: 'Date & Time' },
        { key: 'status', header: 'Status' },
        {
            key: 'actions',
            header: 'Actions',
            render: (row: Partial<FormattedOrder>) => (
                <div className="flex gap-4 items-center justify-center">
                    <Link href={'orders/' + row._id}>
                        <button className="px-2 py-1 bg-primary text-white text-[14px] font-bold rounded-lg border-[1px] border-solid border-primary hover:bg-white hover:text-primary transition-all duration-300 ease-in-out">
                            View
                        </button>
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <section>
            <div className="w-full">
                <SearchBar placeHolder="Search for an order..." onSearch={handleSearch} />
            </div>

            {/* Display GenericTable with formatted filtered data */}
            <GenericTable data={formatDataForTable(filteredRows.length > 0 ? filteredRows : rows)} columns={columns} />
        </section>
    );
};

export default OrderList;
