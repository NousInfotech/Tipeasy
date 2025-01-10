import React from 'react';
import { LucideIcon } from 'lucide-react'; // Ensure you import the icons dynamically if needed

interface NumberCardProps {
    title: string;
    count: number;
    icon: LucideIcon;
    isAmount?: boolean;
}

const NumberCard: React.FC<NumberCardProps> = ({ title, count, icon: Icon, isAmount = false }) => {
    return (
        <div className='bg-secondary rounded-lg p-4 font-medium flex flex-row items-center gap-4'>
            <div className='text-primary flex items-center p-2 rounded-full bg-white'>
                <Icon size={32} color='var(--primary)' />
            </div>
            <div className='flex flex-row justify-between flex-1 w-full'>
                <h5 className='text-lg'>{title}</h5>
                <h5 className='text-2xl font-bold'>{isAmount && <span className='mr-2'>₹</span>}{count}</h5>
            </div>
        </div>
    );
};

interface NumberStatCardsProps {
    data: NumberCardProps[];
}

const NumberStatCards: React.FC<NumberStatCardsProps> = ({ data }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {data.map((item, index) => (
                <NumberCard
                    key={index}
                    title={item.title}
                    count={item.count}
                    icon={item.icon}
                    isAmount={item.isAmount || false}
                />
            ))}
        </div>
    );
};

export default NumberStatCards;
