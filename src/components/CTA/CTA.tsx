"use client"

import React from 'react'

interface CTAProps {
  header: string,
  description: string,
  btnContent: string,
  restaurantId: string,
  isWaiter: boolean
}

const CTA: React.FC<CTAProps> = ({ header, description, restaurantId, isWaiter, btnContent }) => {

  const redirectTobasedOnPage = () => {
    if (isWaiter) {
      console.log("waiter :" + restaurantId)
    } else {
      console.log("menu :" + restaurantId)
    }
  }

  return (
    <section className={`font-normal rounded-lg my-4 ${isWaiter ? 'bg-accent1' : 'bg-accent2'} font-poppins py-8 px-4 flex flex-col gap-4 text-center justify-center items-center`}>
      <h3 className='text-black text-base'>{header}</h3>
      <p className='text-lightText text-xs'>{description}</p>
      <button className='p-2 rounded-lg text-xs bg-primary text-white' onClick={redirectTobasedOnPage}>{btnContent}</button>
    </section>
  )
}

export default CTA