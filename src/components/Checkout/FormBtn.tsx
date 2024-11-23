'use client';

import React from 'react';

interface FormBtnProps {
    title: string;
    callback: () => void;
    filled: boolean;
    type?: 'button' | 'submit' | 'reset'; // Optional type prop
}

const FormBtn: React.FC<FormBtnProps> = ({ title, callback, filled, type = 'button' }) => {
    return (
        <button
            onClick={callback}
            type={type} // Use the optional type prop
            className={`flex-1 p-2 rounded-lg transition border font-bold text-xs h-11
                ${filled
                    ? 'bg-primary text-white border-primary hover:bg-primary/90'
                    : 'bg-white text-primary border-primary hover:bg-primary hover:text-white'}`}
        >
            {title}
        </button>
    );
};

export default FormBtn;
