'use client';

import React from 'react';

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
        <h3 className="font-medium">Tags</h3>
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`w-full text-left p-2 border rounded-md ${
              activeTags.includes(tag) ? 'bg-green-200 border-green-400' : 'bg-gray-50 border-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Price Sorting */}
      <div className="space-y-2">
        <h3 className="font-medium">Sort by Price</h3>
        <select
          value={priceSort || ''}
          onChange={(e) => onPriceSort(e.target.value || null)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">None</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default MenuFilter;
