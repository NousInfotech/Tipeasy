import Image from 'next/image'
import React from 'react'
import assets from '../../../public/assets/assets'

const GenerateQRCodeBox = () => {
    return (
        <div className='p-[30px] bg-accent2 w-full h-full flex flex-row gap-4 items-center rounded-lg'>
            <Image src={assets.primaryQrCode} width={153} height={153} alt='primary-qr' />
            <div className='space-y-2 text-right'>
                <h1 className='text-2xl font-bold'>Generate QR Code</h1>
                <p className='text-sm font-normal'>Generate and share a QR code with restaurant login credentials.</p>
                <button className='text-xl p-2 rounded-lg font-semibold bg-primary text-white'>
                    Generate QR
                </button>
            </div>
        </div>
    )
}

export default GenerateQRCodeBox