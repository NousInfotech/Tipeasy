'use client'
import React, { useState, useEffect } from 'react';
import CustomTable from '@/components/CustomTable/CustomTable';
import SearchBar from '@/components/SearchBar/SearchBar'; // Import your SearchBar component
import { TippingData } from '@/Mockdata/RestaurantTableData';
import { TableData } from '@/types/schematypes';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';

const fetchData = (): TableData[] => {
    return TippingData;
};

const TippingNormal = () => {
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

    const handleView = (row: TableData) => {
        const { restaurantId } = row;
        console.log(`View QR for restaurant ${restaurantId}`);
    };

    return (
        <section>
            <HeaderwithBackButton heading='Go Back' />
            <SearchBar
                placeHolder="Search for a restaurant..."
                onSearch={handleSearch}
            />

            <CustomTable
                data={filteredRows} // Pass filtered rows to the table
                buttons={[
                    {
                        actionLabel: "View",
                        onClick: handleView,
                        columnName: "Actions",
                        className: 'px-2 py-1 bg-primary text-white text-[14px] font-bold rounded-lg border-[1px] border-solid border-primary hover:bg-white hover:text-primary transition-all duration-300 ease-in-out'
                    },
                ]}
            />
        </section>
    );
};

export default TippingNormal;

