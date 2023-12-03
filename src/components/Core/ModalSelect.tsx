import React, { useState, ReactNode } from 'react';
import { Icon } from '@iconify/react';

interface AccordionProps {
    title: string;
    subcategories: Category[];
    handleCategorySelect: Function;
    setCategs: Function;
    id: number
}

const Accordion: React.FC<AccordionProps> = ({ title, subcategories, id, handleCategorySelect, setCategs }) => {
    const handleClick = () => {
        setCategs([...subcategories])
    }
    return (
        <div className="mb-2">
            <div
                className="flex justify-between items-center hover:cursor-pointer hover:bg-slate-200 w-full bg-white text-black text-sm px-8 py-4 font-bold"
                onClick={() => { subcategories.length === 0 ? handleCategorySelect(title, id) : handleClick() }}
            >
                <span>{title}</span>
                {subcategories.length > 0 && (<Icon icon="ic:twotone-greater-than" height="20" width="20" />)}
            </div>
        </div>
    );
};

interface ModalSelectProps {
    categories: Category[];
    level?: number;
    handleCategorySelect: Function
}

interface Category {
    id: number;
    title: string;
    business_type: string;
    parent_category_id?: string | null;
    subcategories: Category[];
}

const ModalSelect: React.FC<ModalSelectProps> = ({ categories, level = 0, handleCategorySelect }) => {
    const [categs, setCategs] = useState<Category[]>([...categories]);
    return (
        <>
            {categs.map(category => (
                <Accordion key={category.id} id={category.id} title={category.title} subcategories={category.subcategories} handleCategorySelect={handleCategorySelect} setCategs={setCategs} />
            ))}
        </>
    );
};

export { Accordion, ModalSelect };
