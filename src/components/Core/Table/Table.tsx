// Table.tsx

import React, { useState, useEffect, ReactNode } from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import Pagination from './Pagination';

interface TableProps {
    headers: string[];
    data: any; // Array of objects representing table rows
    itemsPerPage?: number;
    search?: boolean;
}

const Table: React.FC<TableProps> = ({ headers, data, itemsPerPage = 10, search = false }) => {
    console.log(data)
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortedData, setSortedData] = useState<any>([]);

    // Update displayed data when sortedData, searchTerm, or currentPage changes
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = sortedData.slice(startIndex, endIndex);

    useEffect(() => {
        setSortedData([...data.map((dat: any, index: number) => [...Object.values(dat).map((item: any, index: number) => item)])])
    }, [data]);

    const handlePageChange = (page: number) => {
        console.log(page)
        setCurrentPage(page);
    };

    return (
        <div className='flex flex-col items-start w-full gap-4'>
            {
                search && (
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2"
                    />
                )
            }
            <table className="w-full border-collapse border-none">
                <TableHeader headers={headers} />
                <tbody className='w-full'>
                    {
                        currentData.length > 0 ?
                            currentData.map((row: any, index: number) => (
                                <TableRow key={index} row={row} />
                            )) : (
                                <div className="w-full py-6 text-2xl font-semibold text-center">No Product Found</div>
                            )
                    }
                </tbody>
            </table>
            <div className="flex justify-end w-full">
                <Pagination currentPage={currentPage} totalPages={Math.ceil(sortedData.length / itemsPerPage)} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default Table;
