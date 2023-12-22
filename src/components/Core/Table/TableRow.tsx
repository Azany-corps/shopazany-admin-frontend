import React, { ReactNode } from 'react';
import TableCell from './TableCell';

interface TableRowProps {
    row: ReactNode[]; // Object representing a row
}

const TableRow: React.FC<TableRowProps> = ({ row }) => {
    return (
        <tr className='border-b'>
            {row.map((cell: ReactNode, index: number) => (
                <TableCell key={index}>
                    {cell}
                </TableCell>
            ))}
        </tr>
    );
};

export default TableRow;
