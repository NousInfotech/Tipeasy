'use client';

import React, { useState } from 'react';
import { MenuItem } from '@/types';

interface MenuListProps {
  menuItems: MenuItem[];
  categories: string[];
  flatView: boolean; // Determines if the flat view (no categories) is active
}

const MenuList: React.FC<MenuListProps> = ({ menuItems, categories, flatView }) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() =>
    categories.reduce((acc, category) => ({ ...acc, [category]: true }), {})
  );

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div>
      {flatView ? (
        // Render flat list when flatView is enabled (e.g., search or filter active)
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.id} className="p-2 border border-gray-200 rounded-md">
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      ) : (
        // Render categorized dropdowns when flatView is disabled
        categories.map(category => (
          <div key={category} className="mb-4">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full text-left p-2 bg-gray-100 border border-gray-300 rounded-md"
            >
              {category} {openCategories[category] ? '▲' : '▼'}
            </button>
            {openCategories[category] && (
              <ul className="mt-2 space-y-2">
                {menuItems
                  .filter(item => item.category === category)
                  .map(item => (
                    <li key={item.id} className="p-2 border border-gray-200 rounded-md">
                      {item.name} - ${item.price}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MenuList;
