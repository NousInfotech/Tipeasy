'use client'
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';
import CustomTable from '@/components/CustomTable/CustomTable';
import SearchBar from '@/components/SearchBar/SearchBar'; // Import your SearchBar component

// Simulate data fetching
interface TableData {
    [key: string]: any;
}

const fetchData = (): TableData[] => {
    return [
        { "restaurantId": "1", "name": 'Restaurant A', "qrStatus": 'Generate' },
        { "restaurantId": "2", "name": 'Restaurant B', "qrStatus": 'Send Qr' },
        { "restaurantId": "3", "name": 'Restaurant C', "qrStatus": 'Live' },
        { "restaurantId": "4", "name": 'Restaurant D', "qrStatus": 'Generate' },
        { "restaurantId": "5", "name": 'Restaurant E', "qrStatus": 'Send Qr' },
        { "restaurantId": "6", "name": 'Restaurant F', "qrStatus": 'Live' },
        { "restaurantId": "7", "name": 'Restaurant G', "qrStatus": 'Live' },
        { "restaurantId": "8", "name": 'Restaurant H', "qrStatus": 'Live' },
        { "restaurantId": "11", "name": 'Restaurant I', "qrStatus": 'Live' },
        { "restaurantId": "12", "name": 'Restaurant J', "qrStatus": 'Live' },
        { "restaurantId": "13", "name": 'Restaurant K', "qrStatus": 'Live' },
    ];
};

const MyTable = () => {
    const [rows, setRows] = useState<TableData[]>([]); // Rows of the table
    const [searchTerm, setSearchTerm] = useState<string>(''); // Search term
    const [filteredRows, setFilteredRows] = useState<TableData[]>([]); // Filtered rows based on search

    useEffect(() => {
        const data = fetchData();
        setRows(data);
        setFilteredRows(data); // Initialize filtered rows with all data
    }, []);

    const handleSearch = (query: string) => {
        setSearchTerm(query);

        // Filter rows based on the search term
        const filteredData = rows.filter(row =>
            Object.values(row).some(value =>
                String(value).toLowerCase().includes(query.toLowerCase())
            )
        );

        setFilteredRows(filteredData);
    };

    const handleGenerateQR = (row: TableData) => {
        const { restaurantId } = row;
        console.log(`Generating QR for restaurant ${restaurantId}`);
    };

    const handleSendQR = (row: TableData) => {
        const { restaurantId } = row;
        console.log(`Sending QR to client for restaurant ${restaurantId}`);
    };

    const handleDeleteQR = (row: TableData) => {
        const { restaurantId } = row;
        console.log(`Deleting QR for restaurant ${restaurantId}`);
    };

    return (
        <PageContainer>
            {/* Pass handleSearch function to the SearchBar component */}
            <SearchBar
                placeHolder="Search for a restaurant..."
                onSearch={handleSearch}
            />

            <CustomTable
                data={filteredRows} // Pass filtered rows to the table
                buttons={[
                    {
                        actionLabel: "Generate QR",
                        onClick: handleGenerateQR,
                        columnName: "Generate QR"
                    },
                    {
                        actionLabel: "Send QR",
                        onClick: handleSendQR,
                        columnName: "Send QR"
                    },
                    {
                        actionLabel: "Delete QR",
                        onClick: handleDeleteQR,
                        columnName: "Delete QR"
                    }
                ]}
            />
        </PageContainer>
    );
};

export default MyTable;
