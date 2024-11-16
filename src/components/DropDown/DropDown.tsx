"use client"

import React, { useState } from 'react';

type DropDownProps = {
    options: string[];
    onSelect: (value: string | null) => void;
};

const DropDown: React.FC<DropDownProps> = ({ options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value === "null" ? null : value);
        onSelect(value === "null" ? null : value);
    };

    return (
        <select value={selectedOption || "null"} onChange={handleChange} className="p-2 border rounded">
            <option value="null">All Categories</option>
            {options.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default DropDown;
