// Table.tsx

import React, { useState, useEffect, ReactNode } from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import Pagination from './Pagination';
import { ITableCol } from './types';

interface TableProps {
    headers: ITableCol[];
    data: any; // Array of objects representing table rows
    itemsPerPage?: number;
    headerStyle?: string;
    search?: boolean;
    onClick?: (id: string | number) => void;
}

const Table: React.FC<TableProps> = ({ headers, data, itemsPerPage = 10, search = false, headerStyle, onClick }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortedData, setSortedData] = useState<any>([]);

    // Update displayed data when sortedData, searchTerm, or currentPage changes
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = sortedData.slice(startIndex, endIndex);

    useEffect(() => {
        // const myData = [...data.map((dat: any, index: number) => {
        //     if (objectShallowCompare.key)
        //         return [...Object.values(dat).map((item: any, index: number) => item)]
        // })]


        setSortedData([...data.map((dat: any, index: number) => [...headers.map(({ field }) => dat[field])])])
    }, [data]);

    const handlePageChange = (page: number) => {
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
                <TableHeader headerStyle={headerStyle} headers={headers} />
                {
                    currentData.length > 0 ? (
                        <tbody className='w-full'>
                            {
                                currentData.map((row: any, index: number) => (
                                    <TableRow key={index} data={data[index]} onClick={onClick} row={row} />
                                ))
                            }
                        </tbody>
                    ) : (
                        <div className="w-full py-6  text-2xl font-semibold text-center">No Data Found</div>
                    )

                }
            </table>
            <div className="flex justify-end w-full">
                <Pagination currentPage={currentPage} totalPages={Math.ceil(sortedData.length / itemsPerPage)} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default Table;
