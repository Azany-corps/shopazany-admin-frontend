import React, { ChangeEventHandler } from 'react'
import { Icon } from "@iconify/react";


const Input = ({
    onChange, label, value, name, type = 'text'
}: {
    onChange: ChangeEventHandler<HTMLInputElement>,
    label: string,
    value: string | number,
    name: string
    type?: string
}) => {
    return (
        <>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor={name} className='uppercase font-bold text-[#515151]'>{label}</label>
                {
                    type === 'text' ?
                        (
                            <input type={type} className='border bg-[#f5f5f5] w-full border-[#e2e2e2] py-3 px-4 gap-8 rounded-md' name={name} value={value} onChange={onChange} id="" />
                        ) : (
                            <div className="flex relative">
                                <div className="absolute flex justify-center items-center px-6 left-0 top-o h-full  bg-[#c9c9c9] text-[#515151] font-bold text-2xl">$</div>
                                <input type={type} className='border bg-[#f5f5f5] w-full border-[#e2e2e2] py-3 px-4 gap-8 rounded-md' name={name} value={value} onChange={onChange} id="" />
                            </div>
                        )
                }
            </div>
        </>
    )
}

export default Input