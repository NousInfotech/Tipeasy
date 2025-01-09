import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, TablePagination } from '@mui/material';
import { IFormattedRestaurantData } from '@/types/schematypes';

interface CustomTableProps {
    data: IFormattedRestaurantData[]; // Array of objects with dynamic keys (columns)
    buttons?: { // Array of buttons with their respective labels and onClick handlers
        actionLabel: string;
        onClick: (row: IFormattedRestaurantData) => void;
        columnName: string; // Name of the column for this button
        className?: string;
        isQRButton?: boolean; // Flag to determine if the button uses qrStatus value
    }[];
}

const CustomTable: React.FC<CustomTableProps> = ({ data, buttons }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow className="capitalize text-primary">
                        {data.length > 0 &&
                            Object.keys(data[0]).map((key, index) => (
                                <TableCell sx={{ color: "var(--primary)", fontWeight: 600 }} key={index}>
                                    {key === 'id' ? 'ID' : key !== 'qrStatus' ? key : null}
                                </TableCell>
                            ))}
                        {/* Render dynamic button columns based on `buttons` prop */}
                        {buttons &&
                            buttons.map((button, index) => (
                                <TableCell sx={{ color: "var(--primary)", fontWeight: 600 }} key={`btn-col-${index}`}>{button.columnName}</TableCell>
                            ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index: number) => (
                        <TableRow key={index}>
                            {Object.entries(row).map(([key, value], idx) => (
                                <TableCell key={idx}>
                                    {key === 'id' ? page * rowsPerPage + index + 1 : key !== 'qrStatus' ? value : null}
                                </TableCell>
                            ))}
                            {/* Render action buttons for each row */}
                            {buttons &&
                                buttons.map((button, btnIndex) => (
                                    <TableCell key={`btn-${btnIndex}-${index}`}>
                                        <button
                                            className={`px-2 py-1 text-[14px] font-bold rounded-lg border-[1px] border-solid transition-all duration-300 ease-in-out ${button.isQRButton && row.qrStatus
                                                ? getQRButtonClass(row.qrStatus as string).className
                                                : button.className
                                                }`}
                                            onClick={() => button.onClick(row)} // Pass entire row as argument
                                        >
                                            {/* If isQRButton is true, show qrStatus; otherwise, show the action label */}
                                            {button.isQRButton ? getQRButtonClass(row.qrStatus).displayName : button.actionLabel}
                                        </button>
                                    </TableCell>
                                ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default CustomTable;
