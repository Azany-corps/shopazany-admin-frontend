import React from 'react';
import { Icon } from '@iconify/react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center text-xs gap-1">
            <button
                onClick={() => currentPage > 1 ? onPageChange(currentPage - 1) : onPageChange(1)}
                className={`px-3 py-[6px] rounded-md border bg-[#F1F2F6] text-[#8B909A]`}
            >
                <Icon icon="mingcute:left-line" />
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-[6px] rounded-md border ${page === currentPage ? 'bg-[#D65D5B] text-white' : 'bg-[#F1F2F6] text-[#8B909A]'
                        }`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => currentPage < totalPages ? onPageChange(currentPage + 1) : onPageChange(totalPages)}
                className={`px-3 py-[6px] rounded-md border bg-[#F1F2F6] text-[#8B909A]`}
            >
                <Icon icon="mingcute:right-line" />
            </button>
        </div>
    );
};

export default Pagination;
