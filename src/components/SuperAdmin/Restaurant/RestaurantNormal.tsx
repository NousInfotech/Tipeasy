'use client';
import React, { useState, useEffect, useMemo } from 'react';
import CustomTable from '@/components/CustomTable/CustomTable';
import SearchBar from '@/components/SearchBar/SearchBar';
import { IFormattedRestaurantData, IRestaurant } from '@/types/schematypes';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';
import Link from 'next/link';
import { formatRestaurantDataForTable } from '@/utils/formatData';
import { useRouter } from 'next/navigation';
import DeleteDialog from './DeleteDialog';

interface RestaurantNormalProps {
    restaurants: IRestaurant[];
}

const RestaurantNormal: React.FC<RestaurantNormalProps> = ({ restaurants }) => {
    const router = useRouter();

    // Memoize formatted data to avoid unnecessary recalculations
    const formattedRestaurantData = useMemo(
        () => formatRestaurantDataForTable(restaurants),
        [restaurants]
    );

    const [rows, setRows] = useState<IFormattedRestaurantData[]>([]); // Rows of the table
    const [filteredRows, setFilteredRows] = useState<IFormattedRestaurantData[]>([]); // Filtered rows based on search
    const [deleteOpen, setDeleteOpen] = useState(false); // Control dialog visibility
    const [selectedRestaurant, setSelectedRestaurant] = useState<IFormattedRestaurantData | null>(null); // Store the restaurant to delete

    // Initialize rows and filteredRows when formattedRestaurantData changes
    useEffect(() => {
        setRows(formattedRestaurantData);
        setFilteredRows(formattedRestaurantData);
    }, [formattedRestaurantData]);

    const handleSearch = (query: string) => {
        // Filter rows based on the search term
        const filteredData = rows.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(query.toLowerCase())
            )
        );

        setFilteredRows(filteredData);
    };

    const handleDeleteQR = (row: IFormattedRestaurantData) => {
        setSelectedRestaurant(row); // Store the selected restaurant
        setDeleteOpen(true); // Open the delete dialog
    };

    const handleView = (row: IFormattedRestaurantData) => {
        const { id } = row;
        router.push(`restaurants/${id}`);
    };

    const handleAdmin = (row: IFormattedRestaurantData) => {
        const { id } = row;
        router.push(`restaurants/${id}/admincreate`)
    }

    return (
        <section>
            <HeaderwithBackButton heading="Go Back" />
            <div className="flex flex-col items-center lg:flex-row gap-4 w-full">
                <div className="w-full lg:w-4/5">
                    <SearchBar
                        placeHolder="Search for a restaurant..."
                        onSearch={handleSearch}
                    />
                </div>
                <div className="w-full lg:w-1/5">
                    <Link href={`create`} passHref>
                        <button className="px-2 w-full py-[.6rem] bg-primary text-white text-[14px] font-bold rounded-lg border-[1px] border-solid border-primary hover:bg-white hover:text-primary transition-all duration-300 ease-in-out">
                            Add Restaurant
                        </button>
                    </Link>
                </div>
            </div>

            <CustomTable
                data={filteredRows} // Pass filtered rows to the table
                buttons={[
                    {
                        actionLabel: 'Create',
                        onClick: handleAdmin,
                        columnName: 'Admin',
                        className:
                            'px-2 py-1 bg-gray-800 text-white text-[14px] font-bold rounded-lg border-[1px] border-solid border-gray-800 hover:bg-white hover:text-gray-800 transition-all duration-300 ease-in-out',
                    },
                    {
                        actionLabel: 'View',
                        onClick: handleView,
                        columnName: 'View',
                        className:
                            'px-2 py-1 bg-primary text-white text-[14px] font-bold rounded-lg border-[1px] border-solid border-primary hover:bg-white hover:text-primary transition-all duration-300 ease-in-out',
                    },
                    {
                        actionLabel: 'Delete',
                        onClick: handleDeleteQR,
                        columnName: 'Delete',
                        className:
                            'px-2 py-1 bg-red-600 text-white text-[14px] font-bold rounded-lg border-[1px] border-solid border-red-600 hover:bg-white hover:text-red-600 transition-all duration-300 ease-in-out',
                    },
                ]}
            />
            {selectedRestaurant && (
                <DeleteDialog
                    id={selectedRestaurant.id}
                    title={selectedRestaurant.title}
                    deleteOpen={deleteOpen}
                    setDeleteOpen={setDeleteOpen}
                />
            )}
        </section>
    );
};

export default RestaurantNormal;
