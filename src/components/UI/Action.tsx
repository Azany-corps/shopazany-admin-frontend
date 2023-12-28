import React from 'react'
import { IAction } from '../../types/types'

interface Props {
    actions: IAction[]
}
const Action = ({ actions }: Props) => {
    return (
        <div className=''>
            {/* {
                actions.map((action: IAction, index: number) => (
                    <span onClick={action.api as React.MouseEventHandler<HTMLSpanElement>} className='px-2 py-1 bg-gray-400 font-medium text-sm'>{action.action}</span>
                ))
            } */}
        </div>
    )
}

export default Action