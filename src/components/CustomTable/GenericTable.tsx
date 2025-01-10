/* eslint-disable @typescript-eslint/no-explicit-any */


import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
    TablePagination,
} from '@mui/material';

interface ColumnDefinition {
    key: string; // The key in the data object corresponding to the column
    header: string; // The header label of the column
    render?: (row: Record<string, any>) => JSX.Element | string; // Optional custom rendering for the cell
}

interface GenericTableProps {
    data: Record<string, any>[]; // Array of objects representing rows
    columns: ColumnDefinition[]; // Column definitions
    rowsPerPageOptions?: number[]; // Optional: Custom rows per page options
}

const GenericTable: React.FC<GenericTableProps> = ({
    data,
    columns,
    rowsPerPageOptions = [10, 25, 50],
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

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
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell key={index} sx={{ fontWeight: 600, color: 'var(--primary)', textAlign: 'center' }}>
                                {column.header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <TableCell key={colIndex} sx={{ textAlign: 'center' }}>
                                    {column.render
                                        ? column.render(row) // Custom rendering logic
                                        : row[column.key] // Default rendering
                                    }
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
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

export default GenericTable;
