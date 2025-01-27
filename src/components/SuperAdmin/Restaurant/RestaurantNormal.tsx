'use client';

import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import { IFormattedRestaurantData, IRestaurant } from '@/types/schematypes';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';
import Link from 'next/link';
import { formatRestaurantDataForTable } from '@/utils/formatData';
import DeleteDialog from './DeleteDialog';
import GenericTable from '@/components/CustomTable/GenericTable';
import { getRestaurants } from '@/api/restaurantApi'; // Import the API function

const RestaurantNormal = () => {

    const [rows, setRows] = useState<IFormattedRestaurantData[]>([]);
    const [filteredRows, setFilteredRows] = useState<IFormattedRestaurantData[]>([]);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState<IFormattedRestaurantData | null>(null);
    const [loading, setLoading] = useState(true); // Track loading state

    // Fetch restaurants on component mount
    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            setLoading(true);
            const data = await getRestaurants({ cache: "no-store" }) as IRestaurant[];
            setRows(formatRestaurantDataForTable(data));
            setFilteredRows(formatRestaurantDataForTable(data));
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query: string) => {
        const filteredData = rows.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(query.toLowerCase())
            )
        );
        setFilteredRows(filteredData);
    };

    const handleDeleteQR = (row: IFormattedRestaurantData) => {
        setSelectedRestaurant(row);
        setDeleteOpen(true);
    };

    // Function to refresh the table after CRUD operations
    const refreshTable = async () => {
        await fetchRestaurants();
    };

    const columns = [
        { key: 'id', header: 'ID' },
        { key: 'title', header: "Title" },
        { key: 'email', header: "Email" },
        { key: 'phone', header: "Contact" },
        {
            key: 'actions',
            header: 'Actions',
            render: (row: Partial<IFormattedRestaurantData>) => (
                <div className="flex gap-4 items-center justify-end">
                    <Link href={`restaurants/${row._id}/admincreate`}>
                        <button className="px-2 py-1 bg-gray-800 text-white text-[14px] font-bold rounded-lg border-[1px] border-solid border-gray-800 hover:bg-white hover:text-gray-800 transition-all duration-300 ease-in-out">
                            Create
                        </button>
                    </Link>
                    <Link href={`restaurants/${row._id}`}>
                        <button className="px-2 py-1 bg-primary text-white text-[14px] font-bold rounded-lg border-[1px] border-solid border-primary hover:bg-white hover:text-primary transition-all duration-300 ease-in-out">
                            View
                        </button>
                    </Link>
                    <button
                        onClick={() => handleDeleteQR(row as IFormattedRestaurantData)}
                        className="px-2 py-1 bg-red-600 text-white text-[14px] font-bold rounded-lg border-[1px] border-solid border-red-600 hover:bg-white hover:text-red-600 transition-all duration-300 ease-in-out"
                    >
                        Delete
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
                    <SearchBar placeHolder="Search for a restaurant..." onSearch={handleSearch} />
                </div>
                <div className="w-full lg:w-1/5">
                    <Link href={`create`} passHref>
                        <button className="px-2 w-full py-[.6rem] bg-primary text-white text-[14px] font-bold rounded-lg border-[1px] border-solid border-primary hover:bg-white hover:text-primary transition-all duration-300 ease-in-out">
                            Add Restaurant
                        </button>
                    </Link>
                </div>
            </div>

            {loading ? (
                <p className="text-center text-gray-500 mt-4">Loading...</p>
            ) : (
                <GenericTable data={filteredRows} columns={columns} />
            )}

            {selectedRestaurant && (
                <DeleteDialog
                    id={selectedRestaurant._id}
                    title={selectedRestaurant.title}
                    deleteOpen={deleteOpen}
                    setDeleteOpen={setDeleteOpen}
                    refreshTable={refreshTable} // Pass refresh function to DeleteDialog
                />
            )}
        </section>
    );
};

export default RestaurantNormal;
