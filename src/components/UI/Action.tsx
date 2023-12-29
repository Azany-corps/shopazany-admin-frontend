import React, { useState } from 'react'
import { IAction } from '../../types/types'

interface Props {
    actions: IAction[];
    id: string;
}
const Action = ({ actions, id }: Props) => {
    const [modal, setModal] = useState<boolean>(false)
    const handleClick = () => {
        setModal(!modal)
    }

    return (
        <div className='relative'>
            <span onClick={handleClick} className="bg-[#0F60FF29] hover:cursor-pointer text-[#0F60FF] font-semibold rounded-lg py-1 px-4 text-[11px] ">Action</span>
            {
                modal && (
                    <div className="flex z-40 bg-white rounded-md shadow-lg flex-col absolute">
                        {
                            actions.map((action: IAction, index: number) => (
                                <span key={index} onClick={() => { action.api(id); setModal(false) }} className='px-6 border-b border-b-gray-100 py-1 text-gray-400 font-medium text-sm'>{action.action}</span>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Action