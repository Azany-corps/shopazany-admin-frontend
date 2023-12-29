import React, { ReactNode } from 'react';
import TableCell from './TableCell';

interface TableRowProps {
    row: ReactNode[]; // Object representing a row
    data: any
    onClick?: (id: string | number) => void;
}

const TableRow: React.FC<TableRowProps> = ({ row, onClick = () => { }, data = {} }) => {

    return (
        <tr className='border-b'>
            {row.map((cell: ReactNode, index: number) => (
                <TableCell cellKey={Object.keys(data)[index + 1]} onClick={onClick} id={data.id} key={index}>
                    {cell}
                </TableCell>
            ))}
        </tr>
    );
};

export default TableRow;
