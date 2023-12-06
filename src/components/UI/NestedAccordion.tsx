import React, { useState, ReactNode } from 'react';
import { Icon } from '@iconify/react';

interface AccordionProps {
    id: number;
    title: string;
    children: ReactNode;
    subcategories: Category[];
    handleCategorySelect: Function;
}

const Accordion: React.FC<AccordionProps> = ({ id, title, children, subcategories, handleCategorySelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mb-2">
            <div
                className="flex justify-between items-center hover:cursor-pointer hover:bg-slate-200 w-full bg-white text-black text-sm px-8 py-2 font-bold"
                onClick={() => { subcategories.length === 0 ? handleCategorySelect(title, id) : toggleAccordion() }}
            >
                <span
                    className='w-full'
                    onClick={() => { handleCategorySelect(title, id) }}
                >
                    {title}
                </span>
                <div
                    className="border border-gray-400 rounded-md p-2"
                    onClick={toggleAccordion}
                >
                    {subcategories.length > 0 && !isOpen && (<Icon icon="ic:twotone-greater-than" height="20" width="20" />)}
                    {subcategories.length > 0 && isOpen && (<Icon icon="uiw:down" width="20" height="20" />)}
                </div>

            </div>
            {isOpen && (
                <div className="pl-4 border-l border-gray-300">{children}</div>
            )}
        </div>
    );
};

interface NestedAccordionProps {
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

const NestedAccordion: React.FC<NestedAccordionProps> = ({ categories, level = 0, handleCategorySelect }) => {
    return (
        <>
            {categories.map(category => (
                <Accordion key={category.id} id={category.id} title={`${'--'.repeat(level)} ${category.title}`} subcategories={category.subcategories} handleCategorySelect={handleCategorySelect}>
                    {category.subcategories && category.subcategories.length > 0 && level < 5 && (
                        <NestedAccordion categories={category.subcategories} level={level + 1} handleCategorySelect={handleCategorySelect} />
                    )}
                </Accordion>
            ))}
        </>
    );
};

export { Accordion, NestedAccordion };
