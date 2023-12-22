// Table.tsx

import React, { useState, useEffect, ReactNode } from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import Pagination from './Pagination';

interface TableProps {
    headers: string[];
    data: ReactNode[][]; // Array of objects representing table rows
    itemsPerPage?: number;
}

const Table: React.FC<TableProps> = ({ headers, data, itemsPerPage = 5 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortedData, setSortedData] = useState([...data]);

    // Update displayed data when sortedData, searchTerm, or currentPage changes
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = sortedData.slice(startIndex, endIndex);

    useEffect(() => {
        console.log('dd: ', currentPage)
    }, [currentPage]); // Update sortedData when data changes

    // useEffect(() => {
    //     // Searching logic

    //     setSortedData(updatedFilteredData);
    //     setCurrentPage(1); // Reset to the first page when search term changes
    // }, [searchTerm]);

    const handlePageChange = (page: number) => {
        console.log(page)
        setCurrentPage(page);
    };

    return (
        <div className='flex flex-col items-start gap-4 w-full'>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2"
            />
            <table className="border-collapse border-none w-full">
                <TableHeader headers={headers} />
                <tbody>
                    {currentData.map((row, index) => (
                        <TableRow key={index} row={row} />
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end w-full">
                <Pagination currentPage={currentPage} totalPages={Math.ceil(sortedData.length / itemsPerPage)} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default Table;
