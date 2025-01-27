'use client'
import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import { IFormattedRestaurantData, IRestaurant } from '@/types/schematypes';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';
import Link from 'next/link';
import { formatRestaurantDataForTable } from '@/utils/formatData';
import { generateRestaurantQr, getRestaurants, updateRestaurant } from '@/api/restaurantApi';
import { toast } from 'react-toastify';
import QRPopup from './QRPopup';
import GenericTable from '@/components/CustomTable/GenericTable';

interface QRGenerationResponse {
    qrUrl: string
}

const RestaurantQR: React.FC = () => {

    const [rows, setRows] = useState<IFormattedRestaurantData[]>([]);
    const [filteredRows, setFilteredRows] = useState<IFormattedRestaurantData[]>([]);
    const [qrURL, setQrURL] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Track loading state

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

    const generateQR = async (id: string) => {
        try {
            const response = await generateRestaurantQr(id) as QRGenerationResponse;
            toast.success('QR Generated Successfully');
            setQrURL(response.qrUrl);
            await fetchRestaurants();
            setIsPopupOpen(true);
        } catch (error) {
            toast.error('Error in QR Generation');
            console.error('Error in QR Generation:', error);
        }
    };

    const viewQr = (qrURL: string) => {
        setQrURL(qrURL);
        setIsPopupOpen(true);
    };

    const updateQRURL = async (id: string) => {
        try {
            await updateRestaurant(id, { qrStatus: 'none' });
            toast.success('QR Cleared Successfully');
            await fetchRestaurants();
        } catch (error) {
            toast.error('Error clearing QR');
            console.error('Error clearing QR:', error);
        }
    };

    const getQRButtonClass = (qrStatus: string) => {
        switch (qrStatus.toLowerCase()) {
            case 'none':
                return { displayName: "generate", className: 'bg-gray-500 border-gray-500 text-white hover:bg-white hover:text-gray-500' };
            case 'sent':
                return { displayName: "send again", className: 'bg-red-500 border-red-500 text-white hover:bg-white hover:text-red-500' };
            case 'generated':
                return { displayName: "send", className: 'bg-primary border-primary text-white hover:bg-white hover:text-primary' };
            default:
                return { displayName: "no-idea", className: 'bg-gray-200 border-gray-200 text-gray-700' };
        }
    };

    const columns = [
        { key: 'id', header: 'ID' },
        { key: 'title', header: 'Title' },
        { key: 'email', header: 'Email' },
        { key: 'phone', header: 'Contact' },
        {
            key: 'actions',
            header: 'Actions',
            render: (row: Partial<IFormattedRestaurantData>) => (
                <div className="flex gap-4 items-center justify-end">
                    <button onClick={() => generateQR(row._id as string)} className={`px-2 py-1 text-[14px] font-bold rounded-lg border-[1px] border-solid transition-all duration-300 ease-in-out ${row.qrStatus && getQRButtonClass(row.qrStatus as string).className}`}>
                        {getQRButtonClass(row.qrStatus as string).displayName}
                    </button>
                    <button
                        onClick={() => viewQr(row.qrURL as string)}
                        disabled={row.qrStatus === "none"}
                        className={`px-2 py-1 text-white text-[14px] font-bold rounded-lg border-[1px] border-solid transition-all duration-300 ease-in-out 
            ${row.qrStatus === "none" ? "bg-gray-400 border-gray-400 cursor-not-allowed" : "bg-primary border-primary hover:bg-white hover:text-primary"}`}
                    >
                        View
                    </button>
                    <button
                        onClick={() => updateQRURL(row._id as string)}
                        disabled={row.qrStatus === "none"}
                        className={`px-2 py-1 text-white text-[14px] font-bold rounded-lg border-[1px] border-solid transition-all duration-300 ease-in-out 
            ${row.qrStatus === "none" ? "bg-gray-400 border-gray-400 cursor-not-allowed" : "bg-red-600 border-red-600 hover:bg-white hover:text-red-600"}`}
                    >
                        Clear
                    </button>
                </div>
            ),
        },
    ];

    return (
        <section>
            <HeaderwithBackButton heading='Go Back' />

            <div className='flex flex-col items-center lg:flex-row gap-4 w-full'>
                <div className='w-full lg:w-4/5'>
                    <SearchBar placeHolder='Search for a restaurant...' onSearch={handleSearch} />
                </div>
                <div className='w-full lg:w-1/5'>
                    <Link href='/create'>
                        <button className='px-2 w-full py-2 bg-primary text-white rounded'>Add Restaurant</button>
                    </Link>
                </div>
            </div>
            {loading ? (
                <p className="text-center text-gray-500 mt-4">Loading...</p>
            ) : (
                <GenericTable data={filteredRows} columns={columns} />
            )}

            {isPopupOpen && qrURL && <QRPopup qrURL={qrURL} onClose={() => setIsPopupOpen(false)} />}
        </section>
    );
};

export default RestaurantQR;
