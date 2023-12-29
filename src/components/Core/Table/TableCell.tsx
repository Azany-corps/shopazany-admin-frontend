// TableCell.tsx

import React, { ReactNode } from 'react';

interface TableCellProps {
    children: ReactNode | string | number; // Value representing a cell
    onClick?: (id: string | number) => void;
    id: string
    cellKey: string
}

const TableCell: React.FC<TableCellProps> = ({ children, cellKey, id, onClick = () => { } }) => {
    console.log('ddd: ', cellKey)
    const handleRowClick = () => {
        if (cellKey !== 'action') {
            onClick(id)
        }
        return;
    }
    return <td onClick={handleRowClick} className="p-2 hover:cursor-pointer border-none">{children}</td>;
};

export default TableCell;
