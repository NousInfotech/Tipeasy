import Image from 'next/image'
import React from 'react'
import assets from '../../../public/assets/assets'

const RestaurantCountBox: React.FC<{ restaurantCount: number }> = ({ restaurantCount }) => {
    return (
        <div className='ty-primary-gradient p-[30px] w-auto h-auto flex flex-row gap-4 rounded-lg'>
            <div>
                <h1 className='text-3xl text-white font-bold'>
                    Total <br /> Restaurnts <br /> {restaurantCount}
                </h1>
                <Image width={134} height={108} src={assets.qrCodeScanning} alt='qrcodescanning' />
            </div>
            <div>
                <Image width={255} height={113} src={assets.baristaCustomer} alt='barista-customer'/>
            </div>
        </div>
    )
}

export default RestaurantCountBox