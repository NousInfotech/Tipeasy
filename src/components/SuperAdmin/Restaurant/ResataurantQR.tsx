'use client'
import React, { useState, useEffect, useMemo } from 'react';
import CustomTable from '@/components/CustomTable/CustomTable';
import SearchBar from '@/components/SearchBar/SearchBar'; // Import your SearchBar component
import { IFormattedRestaurantData, IRestaurant } from '@/types/schematypes';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';
import Link from 'next/link';
import { formatRestaurantDataForTable } from '@/utils/formatData';
import { useRouter } from 'next/navigation';
import { generateRestaurantQr } from '@/api/restaurantApi';
import { toast } from 'react-toastify';
import QRPopup from './QRPopup';

interface RestaurantQRProps {
    restaurants: IRestaurant[];
}

interface QRGenerationResponse {
    qrUrl: string
}

const RestaurantQR: React.FC<RestaurantQRProps> = ({ restaurants }) => {
    const router = useRouter();

    // Memoize formatted data to avoid unnecessary recalculations
    const formattedRestaurantData = useMemo(
        () => formatRestaurantDataForTable(restaurants),
        [restaurants]
    );

    const [rows, setRows] = useState<IFormattedRestaurantData[]>([]); // Rows of the table
    const [filteredRows, setFilteredRows] = useState<IFormattedRestaurantData[]>([]); // Filtered rows based on search
    const [qrURL, setQrURL] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

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

    const generateQR = async (row: { id: string }) => {
        const { id } = row;
        try {
            const response = await generateRestaurantQr(id) as QRGenerationResponse;
            toast.success('QR Generated Successfully');
            const qrImg = response.qrUrl
            setQrURL(qrImg); // Set the QR URL
            setIsPopupOpen(true); // Open the popup
        } catch (error) {
            toast.error('Error in QR Generation');
            console.error('Error in QR Generation:', error);
        }
    };

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
                    <Link href={`create`} passHref>
                        <button className='px-2 w-full py-[.6rem] bg-primary text-white text-[14px] font-bold rounded-lg border-[1px] border-solid border-primary hover:bg-white hover:text-primary transition-all duration-300 ease-in-out'
                        >
                            Add Restaurant
                        </button>
                    </Link>
                </div>
            </div>

            <CustomTable
                data={filteredRows} // Pass filtered rows to the table
                buttons={[
                    {
                        actionLabel: "Actions",
                        onClick: generateQR,
                        columnName: "QR Status",
                        isQRButton: true
                    },
                ]}
            />
            {isPopupOpen && qrURL && (
                <QRPopup
                    qrURL={qrURL}
                    onClose={() => setIsPopupOpen(false)} // Close the popup
                />
            )}
        </section>
    );
};

export default RestaurantQR;

