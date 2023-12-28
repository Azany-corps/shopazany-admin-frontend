import React from 'react';
import { ITableCol } from './types';

interface TableHeaderProps {
    headers: ITableCol[];
    headerStyle?: string
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers, headerStyle }) => {
    return (
        <thead>
            <tr className={`${headerStyle} bg-[#F8F8F8] text-[#8E95A9] text- text-start rounded-full`}>
                {headers.map((header, index) => (
                    <th key={index} className="border-none text-start p-2">
                        {header.headerName}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
