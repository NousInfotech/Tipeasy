import React from 'react'
import HeaderwithBackButton from '../HeaderwithBackButton/HeaderwithBackButton';
import CheckoutForm from './CheckoutForm';

const Checkout = () => {
    return (
        <section className='p-4'>
            <HeaderwithBackButton heading='User Details' />
            <CheckoutForm />
        </section>
    )
}

export default Checkout