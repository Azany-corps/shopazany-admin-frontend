import React, { ChangeEventHandler } from 'react'

const Select = ({
    options, name, value, onChange, label, optionText
}: {
    options?: [],
    name: string,
    value: string | number,
    onChange: ChangeEventHandler<HTMLSelectElement>,
    label: string,
    optionText: string
}) => {
    return (
        <>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor={name} className='uppercase font-bold text-[#515151]'>{label}</label>
                <select value={value} onChange={onChange} className='border bg-[#f5f5f5] w-full border-[#e2e2e2] py-3 px-4 gap-8 rounded-md' name={name}>
                    <option disabled selected>{optionText}</option>
                    {
                        options?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))
                    }
                </select>
            </div>
        </>
    )
}

export default Select