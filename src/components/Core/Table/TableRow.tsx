import React, { ReactNode } from 'react';
import TableCell from './TableCell';

interface TableRowProps {
    row: ReactNode[]; // Object representing a row
    data: any
    onClick?: (id: string | number) => void;
}

const TableRow: React.FC<TableRowProps> = ({ row, onClick = () => { }, data }) => {
    const handleRowClick = () => {
        onClick(data.id)
    }

    return (
        <tr onClick={handleRowClick} className='hover:cursor-pointer border-b'>
            {row.map((cell: ReactNode, index: number) => (
                <TableCell key={index}>
                    {cell}
                </TableCell>
            ))}
        </tr>
    );
};

export default TableRow;
