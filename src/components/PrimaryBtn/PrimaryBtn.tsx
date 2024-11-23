'use client'

import React from 'react';

interface PrimaryBtnProps {
    title: string;
    callback: () => void;
    disabled: boolean;
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({ title, callback, disabled }) => {
    return (
        <button
            onClick={callback}
            disabled={disabled} // Disable the button based on the `disabled` prop
            className={`fixed w-11/12 bottom-3 p-3 rounded-lg text-xs 
                ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'} 
                text-white`}
        >
            {title}
        </button>
    );
};

export default PrimaryBtn;
