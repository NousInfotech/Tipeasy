import Image from 'next/image'
import React from 'react'
import assets from '../../../public/assets/assets'

const RestaurantCTA = () => {
    return (
        <div className='bg-white flex flex-row justify-around w-full h-full items-center rounded-lg items-centet gap-4 p-[30px]  border-[1px] border-solid border-primary'>
            <Image width={110} height={91} src={assets.chefTasting} alt='chef-tasting' />
            <div className='flex flex-col items-center'>
                <button className='text-xl p-2 rounded-lg font-semibold border-[1px] border-solid border-primary text-primary'>
                    Manage Orders
                </button>
            </div>
        </div>
    )
}

export default RestaurantCTA