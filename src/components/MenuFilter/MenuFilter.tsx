'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import assets from '../../../public/assets/assets';

// TagFilter Component
interface TagFilterProps {
  tags: ('veg' | 'non-veg' | 'egg')[];
  activeTags: string[];
  onTagToggle: (tag: string) => void;
}

const TAG_ICONS: Record<'veg' | 'non-veg' | 'egg', StaticImageData> = {
  'veg': assets.vegIcon,
  'non-veg': assets.nonVegIcon,
  'egg': assets.eggIcon,
};

const TagFilter: React.FC<TagFilterProps> = ({ tags, activeTags, onTagToggle }) => {
  return (
    <div className="flex flex-row justify-between flex-[5] gap-1 items-center">
      {tags.map((tag, index) => (
        <button
          key={tag}
          onClick={() => onTagToggle(tag)}
          className={`flex ${index == tags.length + 1 ? 'flex-[4]' : 'flex-[3]'} items-center gap-2 w-full text-left p-[.3rem] border rounded-2xl ${activeTags.includes(tag) ? 'bg-secondary border-none text-white' : 'bg-transparent border-gray-200 border border-primary'
            }`}
        >
          <Image
            src={TAG_ICONS[tag]}
            alt={`${tag} icon`}
            width={16}
            height={16}
            className="inline-block"
          />
          <span className="capitalize text-xs">{tag}</span>
        </button>
      ))}
    </div>
  );
};

// MenuFilter Component
interface MenuFilterProps {
  tags: string[];
  activeTags: string[];
  priceSort: string | null;
  onTagToggle: (tag: string) => void;
  onPriceSort: (sortOption: string | null) => void;
}

const MenuFilter: React.FC<MenuFilterProps> = ({ tags, activeTags, priceSort, onTagToggle, onPriceSort }) => {
  return (
    <div className="p-4 border border-gray-300 bg-gray-100 rounded-md mb-4">
      <h2 className="font-semibold mb-2">Filters</h2>

      {/* Tag Filters */}
      <div className="space-y-2 mb-4">
        <TagFilter tags={tags as ('veg' | 'non-veg' | 'egg')[]} activeTags={activeTags} onTagToggle={onTagToggle} />
      </div>

      {/* Price Sorting */}
      <div className="space-y-2">
        <h3 className="font-medium text-xs mb-2">Sort by Price</h3>
        <div className="flex space-x-4">
          {['Low to High', 'High to Low'].map(option => {
            const value = option === 'Low to High' ? 'low-to-high' : 'high-to-low';

            return (
              <button
                key={value}
                onClick={() =>
                  onPriceSort(priceSort === value ? null : value) // Toggle selection
                }
                className={`flex flex-[3] text-xs items-center gap-2 w-full text-left p-[.3rem] border rounded-xl justify-center ${priceSort === value
                  ? 'bg-secondary text-white border-none'
                  : 'bg-gray-100 text-black border-primary'
                  }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export { MenuFilter, TagFilter };
