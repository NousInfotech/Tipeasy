import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, TablePagination, Button } from '@mui/material';

interface TableData {
    [key: string]: string | number; // Any type for flexible data
}

interface CustomTableProps {
    data: TableData[]; // Array of objects with dynamic keys (columns)
    buttons?: { // Array of buttons with their respective labels and onClick handlers
        actionLabel: string;
        onClick: (row: TableData) => void;
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

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow className='capitalize text-primary'>
                        {data.length > 0 && Object.keys(data[0]).map((key, index) => (
                            // Skip the qrStatus column
                            key !== 'qrStatus' && <TableCell key={index}>{key}</TableCell>
                        ))}                        {/* Render dynamic button columns based on `buttons` prop */}
                        {buttons && buttons.map((button, index) => (
                            <TableCell key={`btn-col-${index}`}>{button.columnName}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                        <TableRow key={index}>
                            {Object.entries(row).map(([key, value], idx) => (
                                // Skip the qrStatus column
                                key !== 'qrStatus' && <TableCell key={idx}>{value}</TableCell>
                            ))}
                            {/* Render action buttons for each row */}
                            {buttons && buttons.map((button, btnIndex) => (
                                <TableCell key={`btn-${btnIndex}-${index}`}>
                                    <button
                                        className={`mr-2 ${button.className}`}
                                        onClick={() => button.onClick(row)} // Pass entire row as argument
                                    >
                                        {/* If isQRButton is true, show qrStatus; otherwise, show the action label */}
                                        {button.isQRButton ? row.qrStatus : button.actionLabel}
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
