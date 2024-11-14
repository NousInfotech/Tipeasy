import React from 'react'
import { ArrowLeft } from 'lucide-react'

interface HeaderProps {
    heading: string
}

const HeaderwithBackButton: React.FC<HeaderProps> = ({ heading }) => {
    return (
        <div className='flex flex-row gap-6 p-4 items-center'>
            <ArrowLeft size={28} color='#98B03C' />
            <h1 className='text-primary font-poppins font-semibold text-base capitalize'>{heading}</h1>
        </div>
    )
}

export default HeaderwithBackButton