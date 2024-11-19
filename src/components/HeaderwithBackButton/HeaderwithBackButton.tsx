"use client"

import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'


interface HeaderProps {
    heading: string
}

const HeaderwithBackButton: React.FC<HeaderProps> = ({ heading }) => {

    const router = useRouter();

    const handleClick = () => {
        router.back();
    }

    return (
        <div className='flex flex-row gap-6 items-center my-4'>
            <ArrowLeft onClick={handleClick} size={28} color='#98B03C' />
            <h1 className='text-primary font-poppins font-semibold text-base capitalize'>{heading}</h1>
        </div>
    )
}

export default HeaderwithBackButton