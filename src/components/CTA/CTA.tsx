"use client"

import React from 'react'
import Link from 'next/link'

interface CTAProps {
  header: string;
  description: string;
  btnContent: string;
  restaurantId: string;
  isWaiter: boolean;
}

const CTA: React.FC<CTAProps> = ({ header, description, restaurantId, isWaiter, btnContent }) => {

  const redirectTo = isWaiter
    ? `/restaurant/${restaurantId}/waiters`
    : `/restaurant/${restaurantId}/menu`;


  return (
    <section className={`font-normal rounded-lg my-4 ${isWaiter ? 'bg-accent1' : 'bg-accent2'} font-poppins py-8 px-4 flex flex-col gap-4 text-center justify-center items-center`}>
      <h3 className='text-black text-base'>{header}</h3>
      <p className='text-lightText text-xs'>{description}</p>
      <Link href={redirectTo} passHref>
        <button className='p-2 rounded-lg text-xs bg-primary text-white'>{btnContent}</button>
      </Link>
    </section>
  );
};

export default CTA;
