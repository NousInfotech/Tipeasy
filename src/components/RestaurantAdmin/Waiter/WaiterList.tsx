'use client'

import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';
import SearchBar from '@/components/SearchBar/SearchBar';
import { IWaiter } from '@/types/schematypes';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import GenericTable from '@/components/CustomTable/GenericTable'; // Assuming GenericTable is in the same path
import Image from 'next/image';
import DeleteWaiterDialog from './DeleteWaiterDialog';

interface WaiterListProps {
    waiters: IWaiter[]
}

interface FormattedWaiter {
    id: number;
    _id: string;
    name: string;
    image: string;
    email: string;
    phone: string;
}

const WaiterList: React.FC<WaiterListProps> = ({ waiters }) => {
    const [rows, setRows] = useState<IWaiter[]>([]); // Rows of the table
    const [filteredRows, setFilteredRows] = useState<IWaiter[]>([]); // Filtered rows based on search
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const [selectedWaiter, setSelectedWaiter] = useState<Partial<FormattedWaiter> | null>(null)

    // Fetch rows (this is an example; replace it with actual data fetching logic)
    useEffect(() => {
        // For demonstration, you could set rows manually or fetch from API
        setRows(waiters);
    }, [waiters]);

    // Handle search filter
    const handleSearch = (query: string) => {
        // Filter rows based on the search term
        const filteredData = rows.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(query.toLowerCase())
            )
        );
        setFilteredRows(filteredData); // Set the filtered rows to state
    };


    const handleDeleteWaiter = (row: Partial<FormattedWaiter>) => {
        setSelectedWaiter(row)
        setDeleteOpen(true);
    }


    // Format data for GenericTable
    const formatDataForTable = (data: Partial<IWaiter>[]) => {
        return data.map((row: Partial<IWaiter>, index: number) => ({
            id: index + 1,
            _id: row._id,
            name: row.name,
            image: row.imgSrc,
            email: row.email,
            phone: row.phoneNumber,
        }));
    };

    // Columns for GenericTable
    const columns = [
        { key: 'id', header: 'ID' },
        {
            key: 'status',
            header: 'Name',
            render: (row: Partial<FormattedWaiter>) => (
                <div className="flex items-center gap-4 justify-center">
                    <Image
                        src={row.image || '/default-image.jpg'} // Fallback image if not available
                        alt={row.name || 'No name'}
                        width={35}
                        height={35}
                        className="rounded-full w-[35px] h-[35px] object-contain" // Optional styling for a circular image
                    />
                    <h5>{row.name}</h5>
                </div>
            ),
        },
        { key: 'email', header: 'Email' },
        { key: 'phone', header: 'Phone' },
        {
            key: 'actions',
            header: 'Actions',
            render: (row: Partial<FormattedWaiter>) => (
                <div className='flex flex-row gap-4 items-center justify-center'>
                    <Link href={'waiters/' + row._id}>
                        <button
                            className='px-2 py-1 bg-primary text-white text-[14px] font-bold rounded-lg border-[1px] border-solid border-primary hover:bg-white hover:text-primary transition-all duration-300 ease-in-out'
                        >
                            View
                        </button>
                    </Link>
                    <div>
                        <button
                            onClick={() => handleDeleteWaiter(row)}
                            className='px-2 py-1 bg-white text-red-600 text-[14px] font-bold rounded-lg border-[1px] border-solid border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ),
        },
    ];


    return (
        <section>
            <HeaderwithBackButton heading="Go Back" />
            <div className="flex flex-col items-center lg:flex-row gap-4 w-full">
                <div className="w-full lg:w-4/5">
                    <SearchBar placeHolder="Search for a restaurant..." onSearch={handleSearch} />
                </div>
                <div className="w-full lg:w-1/5">
                    <Link href="waiters/create" passHref>
                        <button className="px-2 w-full py-[.6rem] bg-primary text-white text-[14px] font-bold rounded-lg border-[1px] border-solid border-primary hover:bg-white hover:text-primary transition-all duration-300 ease-in-out">
                            Add Waiter
                        </button>
                    </Link>
                </div>
            </div>

            {/* Display GenericTable with formatted filtered data */}
            <GenericTable data={formatDataForTable(filteredRows.length > 0 ? filteredRows : rows)} columns={columns} />
            {
                deleteOpen && (
                    <DeleteWaiterDialog id={selectedWaiter?._id as string} waiterName={selectedWaiter?.name as string} deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} />
                )
            }
        </section>
    );
};

export default WaiterList;
