import React from 'react'
import Image from 'next/image'
import NumberStatCards from './NumberStatCards'
import { numberStat } from '@/Mockdata/AdminDashboardMockData'
import CTABox from './CTABox'
import { BarChart3, Pizza, UserPlus } from 'lucide-react'
import OrderListPage from './Orders/OrderListPage'
import { IOrder } from '@/types/schematypes'

interface RestaurantAdminProps {
    orders: IOrder[]
}

const RestaurantAdmin: React.FC<RestaurantAdminProps> = ({ orders }) => {
    return (
        <section className='space-y-4'>
            <div className='w-full flex flex-row justify-between'>
                <h1 className='text-xl font-semibold'>Dashboard</h1>
                <Image className='rounded-full aspect-square object-cover' src={"https://res.cloudinary.com/dkeraxhjs/image/upload/v1734775767/restaurantCoverImages/soxrbowq6bj9bcecntau.jpg"} alt={"profileImage"} width={48} height={48} />
            </div>
            <NumberStatCards data={numberStat} />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <CTABox
                    buttonText="View Statistics"
                    icon={BarChart3}
                    ctaLink="stats"
                    className="bg-white text-secondary flex-col"
                    buttonClassName="bg-secondary text-white hover:bg-white hover:text-secondary border border-secondary"
                    iconBoxClassName="bg-secondary"
                    iconClassName="text-white"
                />
                <CTABox
                    buttonText="Add Food Item"
                    icon={Pizza}
                    ctaLink="qr-menu/create"
                    className="bg-secondary text-white flex-col-reverse"
                    buttonClassName="bg-white text-secondary hover:bg-white hover:text-secondary border border-secondary"
                    iconBoxClassName="bg-white p-3"
                    iconClassName="text-secondary"
                />
                <CTABox
                    buttonText="Add New Waiter"
                    icon={UserPlus}
                    ctaLink="waiter/create"
                    className="bg-white text-secondary flex-col"
                    buttonClassName="bg-secondary text-white hover:bg-white hover:text-secondary border border-secondary"
                    iconBoxClassName="bg-secondary"
                    iconClassName="text-white"
                />
            </div>
            <OrderListPage orders={orders} />
        </section>

    )
}

export default RestaurantAdmin