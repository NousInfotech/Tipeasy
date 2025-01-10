'use client'

import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';
import SearchBar from '@/components/SearchBar/SearchBar';
import { IMenu } from '@/types/schematypes';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import GenericTable from '@/components/CustomTable/GenericTable';
import Image from 'next/image';
import { deleteMenu } from '@/api/restaurantApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface QRMenuListProps {
    menus: IMenu[];
}

interface FormattedMenu {
    id: number;
    _id: string;
    title: string;
    image: string;
    price: number;
    category: string;
    availability: boolean;
}

const QRMenuList: React.FC<QRMenuListProps> = ({ menus }) => {

    console.log(menus)
    const router = useRouter();

    const [rows, setRows] = useState<IMenu[]>([]); // Rows for the table
    const [filteredRows, setFilteredRows] = useState<IMenu[]>([]); // Filtered rows for search


    useEffect(() => {
        // Set initial rows from menus prop
        setRows(menus);
    }, [menus]);

    // Handle search filter
    const handleSearch = (query: string) => {
        const filteredData = rows.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(query.toLowerCase())
            )
        );
        setFilteredRows(filteredData);
    };

    // Format data for GenericTable
    const formatDataForTable = (data: Partial<IMenu>[]) => {
        return data.map((menu, index) => ({
            id: index + 1,
            _id: menu._id,
            title: menu.title,
            image: menu.imgSrc,
            price: menu.price,
            category: menu.category,
            availability: menu.availability,
        }));
    };

    const handleDeleteMenu = async (id: string) => {
        await deleteMenu(id);
        toast.success("Menu delted successfully")
        router.refresh();
    }

    // Columns for GenericTable
    const columns = [
        { key: 'id', header: 'ID' },
        {
            key: 'title',
            header: 'Menu Item',
            render: (row: Partial<FormattedMenu>) => (
                <div className="flex items-center gap-4 justify-center">
                    <Image
                        src={row.image as string}
                        alt={row.title as string}
                        width={35}
                        height={35}
                        className="rounded-full w-[35px] h-[35px] object-contain"
                    />
                    <h5>{row.title}</h5>
                </div>
            ),
        },
        { key: 'price', header: 'Price (₹)' },
        { key: 'category', header: 'Category' },
        {
            key: 'availability',
            header: 'Availability',
            render: (row: Partial<FormattedMenu>) => (
                <div className={`flex flex-row gap-4 items-center rounded-md justify-center ${row.availability ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                    {row.availability ? 'Available' : 'out of stock'}
                </div>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            render: (row: Partial<FormattedMenu>) => (
                <div className='flex flex-row gap-4 items-center justify-center'>
                    <Link href={'qr-menu/' + row._id}>
                        <button
                            className='px-2 py-1 bg-primary text-white text-[14px] font-bold rounded-lg border-[1px] border-solid border-primary hover:bg-white hover:text-primary transition-all duration-300 ease-in-out'
                        >
                            View
                        </button>
                    </Link>
                    <button
                        className='px-2 py-1 bg-white text-red-600 text-[14px] font-bold rounded-lg border-[1px] border-solid border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out'
                        onClick={() => handleDeleteMenu(row._id as string)}
                    >
                        delelte
                    </button>
                </div>
            ),
        },
    ];

    return (
        <section>
            <HeaderwithBackButton heading="Go Back" />
            <div className="flex flex-col items-center lg:flex-row gap-4 w-full">
                <div className="w-full lg:w-4/5">
                    <SearchBar placeHolder="Search for a menu item..." onSearch={handleSearch} />
                </div>
                <div className="w-full lg:w-1/5">
                    <Link href="qr-menu/create" passHref>
                        <button className="px-2 w-full py-[.6rem] bg-primary text-white text-[14px] font-bold rounded-lg border-[1px] border-solid border-primary hover:bg-white hover:text-primary transition-all duration-300 ease-in-out">
                            Add Menu Item
                        </button>
                    </Link>
                </div>
            </div>

            <GenericTable
                data={formatDataForTable(filteredRows.length > 0 ? filteredRows : rows)}
                columns={columns}
            />
        </section>
    );
};

export default QRMenuList;
