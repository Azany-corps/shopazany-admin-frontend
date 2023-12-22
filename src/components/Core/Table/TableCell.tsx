// TableCell.tsx

import React, { ReactNode } from 'react';

interface TableCellProps {
    children: ReactNode | string | number; // Value representing a cell
}

const TableCell: React.FC<TableCellProps> = ({ children }) => {
    console.log('chil: ', children);
    return <td className="border-none p-2">{children}</td>;
};

export default TableCell;
