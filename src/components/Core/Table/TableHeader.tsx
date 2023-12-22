import React from 'react';

interface TableHeaderProps {
    headers: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
    return (
        <thead>
            <tr className='bg-[#F8F8F8] text-[#8E95A9] text-start rounded-full'>
                {headers.map((header, index) => (
                    <th key={index} className="border-none text-start p-2">
                        {header}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
