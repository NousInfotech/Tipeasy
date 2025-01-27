'use client';

import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';
import { IFormattedTippingData, ITipping } from '@/types/schematypes';
import { formatTippingDataForTable } from '@/utils/formatData';
import GenericTable from '@/components/CustomTable/GenericTable';
import TippingPopup from './TippingPopup';
import { getAllTippings } from '@/api/tippingsApi';


const TippingNormal: React.FC = () => {


    const [rows, setRows] = useState<IFormattedTippingData[]>([]);
    const [filteredRows, setFilteredRows] = useState<IFormattedTippingData[]>([]);
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
    const [selectedTipping, setSelectedTipping] = useState<IFormattedTippingData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchTippings();
    }, []);

    const fetchTippings = async () => {
        try {
            setLoading(true);
            const data = await getAllTippings({ cache: 'no-store' }) as ITipping[];
            const formattedData = formatTippingDataForTable(data);
            setRows(formattedData);
            setFilteredRows(formattedData);
        } catch (error) {
            console.error('Error fetching tippings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query: string) => {
        const filteredData = rows.filter(row =>
            Object.values(row).some(value =>
                String(value).toLowerCase().includes(query.toLowerCase())
            )
        );
        setFilteredRows(filteredData);
    };

    const handleView = (row: IFormattedTippingData) => {
        setSelectedTipping(row);
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
        setSelectedTipping(null);
    };

    const columns = [
        { key: 'id', header: 'ID' },
        { key: 'tipAmount', header: 'Amount' },
        { key: 'date', header: 'Date' },
        { key: 'time', header: 'Time' },
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
            <div className="flex flex-col items-center lg:flex-row gap-4 w-full">
                <div className="w-full lg:w-4/5">
                    <SearchBar placeHolder="Search for a restaurant..." onSearch={handleSearch} />
                </div>
                <div className="w-full lg:w-1/5">
                    <button
                        className="px-2 w-full py-[.6rem] bg-primary text-white text-[14px] font-bold rounded-lg border-[1px] border-solid border-primary hover:bg-white hover:text-primary transition-all duration-300 ease-in-out"
                        onClick={() => fetchTippings()}
                    >
                        Refresh
                    </button>
                </div>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <GenericTable data={filteredRows} columns={columns} />
            )}
            {isPopupVisible && selectedTipping && (
                <TippingPopup tippingData={selectedTipping} onClose={handleClosePopup} />
            )}
        </section>
    );
};

export default TippingNormal;
