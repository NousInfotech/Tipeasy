import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface CTABoxProps {
    className?: string;
    buttonClassName?: string;
    image?: string;
    ctaLink: string;
    buttonText: string;
    icon: LucideIcon;
    iconClassName: string;
    iconBoxClassName: string;
}

const CTABox: React.FC<CTABoxProps> = ({ className = '', buttonClassName = '', ctaLink, buttonText, icon: Icon, iconBoxClassName = '', iconClassName = '' }) => {
    return (
        <div className={`cta-box flex items-center gap-4 p-4 rounded-lg border-[1px] border-solid border-primary ${className}`}>
            <div className={`p-4 rounded-full ${iconBoxClassName}`}>
                <Icon size={48} className={`${iconClassName}`} />
            </div>
            <div className="mt-4 text-center">
                <Link href={ctaLink} passHref>
                    <button className={`p-2 rounded-md ${buttonClassName}`}>{buttonText}</button>
                </Link>
            </div>
        </div>
    );
};

export default CTABox;
