import React from 'react'
import assets from '../../../public/assets/assets'
import Image from 'next/image'

interface RestaurantHeaderProps {
    restaurantId: string;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ restaurantId }) => {
    return (
        <header className='flex flex-row items-center justify-between'>
            <div>
                <div className='flex gap-1 items-center'>
                    <h1 className='font-normal font-poppins text-2xl text-black'>Good Morning {restaurantId}</h1>
                    <Image width={50} height={50} src={assets.handwaveoff} alt="hand" />
                </div>
                <p className='font-normal font-poppins text-xs text-lightText'>Treat yourself to yummy dishes</p>
            </div>
            <div>
                <Image className='animate-spin-slow transition' width={90} src={assets.birthday} alt="birthday" />
            </div>
        </header>
    )
}

export default RestaurantHeader