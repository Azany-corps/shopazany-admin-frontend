import React, { ChangeEventHandler } from 'react'
import { Icon } from "@iconify/react";


const Input = ({
    onChange, label, value, name, type = 'text', disabled = false
}: {
    onChange: ChangeEventHandler<HTMLInputElement>,
    label: string,
    value: string | number,
    name: string,
    type?: string,
    disabled?: boolean
}) => {
    return (
        <>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor={name} className='uppercase font-bold text-[#515151]'>{label}</label>
                {
                    disabled ?
                        (
                            <input type={type} disabled className='border bg-[#f5f5f5] w-full border-[#e2e2e2] py-3 px-4 gap-8 rounded-md' name={name} value={0} onChange={onChange} id="" />
                        ) : (
                            <input type={type} className='border bg-[#f5f5f5] w-full border-[#e2e2e2] py-3 px-4 gap-8 rounded-md' name={name} value={value} onChange={onChange} id="" />
                        )
                }
            </div>
        </>
    )
}

export default Input