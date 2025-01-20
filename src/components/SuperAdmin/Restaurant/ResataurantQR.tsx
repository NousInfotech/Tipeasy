'use client'
import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar'; // Import your SearchBar component
import { IFormattedRestaurantData, IRestaurant } from '@/types/schematypes';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';
import Link from 'next/link';
import { formatRestaurantDataForTable } from '@/utils/formatData';
import { generateRestaurantQr, updateRestaurant } from '@/api/restaurantApi';
import { toast } from 'react-toastify';
import QRPopup from './QRPopup';
import GenericTable from '@/components/CustomTable/GenericTable';
import { useRouter } from 'next/navigation';

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

    const generateQR = async (id: string) => {
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

    const viewQr = (qrURL: string) => {
        setQrURL(qrURL); // Set the QR URL
        setIsPopupOpen(true); // Open the popup
    }

    const updateQRURL = async (id: string) => {
        try {
            await updateRestaurant(id, { qrStatus: 'none' });
            toast.success('QR Cleared Successfully');
            router.refresh();
        } catch (error) {
            toast.error('Error in QR Generation');
            console.error('Error in QR Generation:', error);
        }
    }

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

    // Columns for GenericTable
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

            {/* <CustomTable
                data={filteredRows} // Pass filtered rows to the table
                buttons={[
                    {
                        actionLabel: "Actions",
                        onClick: generateQR,
                        columnName: "QR Status",
                        isQRButton: true
                    },
                    {
                        actionLabel: "View",
                        onClick: viewQr,
                        columnName: "QR Status",
                        isQRButton: true
                    },

                ]}
            /> */}

            <GenericTable data={filteredRows} columns={columns} />
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

