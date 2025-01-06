'use client'
import React, { useState, useEffect } from 'react';
import CustomTable from '@/components/CustomTable/CustomTable';
import SearchBar from '@/components/SearchBar/SearchBar'; // Import your SearchBar component
import { restaurantMockData } from '@/Mockdata/RestaurantTableData';
import { TableData } from '@/types/schematypes';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';

const fetchData = (): TableData[] => {
    return restaurantMockData;
};

const RestaurantQR = () => {
    const [rows, setRows] = useState<TableData[]>([]); // Rows of the table
    const [filteredRows, setFilteredRows] = useState<TableData[]>([]); // Filtered rows based on search

    useEffect(() => {
        const data = fetchData();
        setRows(data);
        setFilteredRows(data); // Initialize filtered rows with all data
    }, []);

    const handleSearch = (query: string) => {

        // Filter rows based on the search term
        const filteredData = rows.filter(row =>
            Object.values(row).some(value =>
                String(value).toLowerCase().includes(query.toLowerCase())
            )
        );

        setFilteredRows(filteredData);
    };

    const generateQR = (row: TableData) => {
        const { restaurantId } = row;
        console.log(`Generating QR Code for the ${restaurantId} restaurant`)
    }

    return (
        <section>
            <HeaderwithBackButton heading='Go Back' />

            <div className='flex flex-col items-center lg:flex-row gap-4 w-full'>
                <div className='w-full lg:w-4/5'>
                    <SearchBar
                        placeHolder="Search for a restaurant..."
                        onSearch={handleSearch}
                    />

                </div>
                <div className='w-full lg:w-1/5'>
                    <button>
                        Add Restaurant
                    </button>
                </div>
            </div>

            <CustomTable
                data={filteredRows} // Pass filtered rows to the table
                buttons={[
                    {
                        actionLabel: "Generate QR",
                        onClick: generateQR,
                        columnName: "QR Status",
                        isQRButton: true
                    },
                ]}
            />
        </section>
    );
};

export default RestaurantQR;

