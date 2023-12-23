// TableCell.tsx

import React, { ReactNode } from 'react';

interface TableCellProps {
    children: ReactNode | string | number; // Value representing a cell
}

const TableCell: React.FC<TableCellProps> = ({ children }) => {
    return <td className="p-2 border-none">{children}</td>;
};

export default TableCell;
