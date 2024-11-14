// components/BannerWithProfile.tsx

import React from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

const BannerWithProfile: React.FC = () => {
    return (
        <section className="relative h-[163px] overflow-hidden">
            {/* Banner */}
            <div className="absolute top-0 left-0 right-0 h-[75%] bg-blue-500 flex justify-end items-end p-2" >
                <p className='flex flex-row gap-1'>
                    <MapPin size={15} /><span className='cursor-pointer underline text-[10px]'>Chennai, TamilNadu</span>
                </p>
            </div>

            {/* Profile Circle */}
            <div className="absolute bottom-0 left-5 w-[120px] h-[120px] rounded-full border-4 border-white overflow-hidden">
                <Image
                    src="https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk" // Replace with actual path
                    width={120}
                    height={120}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            </div>
        </section>
    );
};

export default BannerWithProfile;
