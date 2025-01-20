'use client';

import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';
import { IFormattedTippingData, ITipping } from '@/types/schematypes';
import { formatTippingDataForTable } from '@/utils/formatData';
import GenericTable from '@/components/CustomTable/GenericTable';
import TippingPopup from './TippingPopup';

interface TippingNormalProps {
    tippingData: ITipping[];
}

const TippingNormal: React.FC<TippingNormalProps> = ({ tippingData }) => {

    const formattedTippingData = useMemo(
        () => formatTippingDataForTable(tippingData),
        [tippingData]
    );

    const [rows, setRows] = useState<IFormattedTippingData[]>([]);
    const [filteredRows, setFilteredRows] = useState<IFormattedTippingData[]>([]);
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false); // State for showing the popup
    const [selectedTipping, setSelectedTipping] = useState<IFormattedTippingData | null>(null); // State for selected tipping data

    useEffect(() => {
        setRows(formattedTippingData);
        setFilteredRows(formattedTippingData); // Initialize filtered rows with provided data
    }, [formattedTippingData]);

    const handleSearch = (query: string) => {
        const filteredData = rows.filter(row =>
            Object.values(row).some(value =>
                String(value).toLowerCase().includes(query.toLowerCase())
            )
        );
        setFilteredRows(filteredData);
    };

    const handleView = (row: IFormattedTippingData) => {
        setSelectedTipping(row); // Set the selected tipping data
        setIsPopupVisible(true); // Show the popup
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false); // Hide the popup
        setSelectedTipping(null); // Reset selected tipping data
    };

    const columns = [
        { key: 'id', header: 'ID' },
        { key: 'tipAmount', header: "Amount" },
        { key: 'date', header: "Date" },
        { key: 'time', header: "Time" },
        {
            key: 'actions',
            header: 'Actions',
            render: (row: Partial<IFormattedTippingData>) => (
                <button
                    onClick={() => handleView(row as IFormattedTippingData)}
                    className="px-2 py-1 bg-primary text-white text-[14px] font-bold rounded-lg border-[1px] border-solid border-primary hover:bg-white hover:text-primary transition-all duration-300 ease-in-out"
                >
                    View
                </button>
            ),
        },
    ];

    return (
        <section>
            <HeaderwithBackButton heading="Go Back" />
            <SearchBar
                placeHolder="Search for a restaurant..."
                onSearch={handleSearch}
            />
            <GenericTable data={filteredRows} columns={columns} />

            {/* Show the TippingPopup if isPopupVisible is true */}
            {isPopupVisible && selectedTipping && (
                <TippingPopup tippingData={selectedTipping} onClose={handleClosePopup} />
            )}
        </section>
    );
};

export default TippingNormal;
