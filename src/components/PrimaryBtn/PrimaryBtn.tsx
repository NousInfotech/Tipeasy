'use client'

import React from 'react'

interface PrimaryBtnProps {
    title: string,
    callback: () => void;
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({ title, callback }) => {
    return (
        <button onClick={callback} className='fixed w-11/12 bottom-3 p-3 rounded-lg text-xs bg-primary text-white'>
            {title}
        </button>
    )
}

export default PrimaryBtn