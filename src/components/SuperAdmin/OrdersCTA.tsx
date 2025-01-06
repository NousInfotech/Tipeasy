import React from 'react'

const OrdersCTA = () => {
    return (
        <div className='bg-accent1 flex flex-col gap-4 p-[30px] rounded-lg text-center'>
            <p className='text-base font-normal'>
                View and manage the overall orders in all the restaurants.
            </p>
            <div>
                <button className='text-xl p-2 rounded-lg font-semibold bg-primary text-white'>
                    View Orders
                </button>
            </div>
        </div>
    )
}

export default OrdersCTA