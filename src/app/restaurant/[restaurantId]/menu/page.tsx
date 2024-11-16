'use client';

import React, { useState } from 'react';
import { MenuItem } from '@/types';
import MenuList from '@/components/MenuList/MenuList';
import SearchBar from '@/components/SearchBar/SearchBar';
import MenuFilter from '@/components/MenuFilter/MenuFilter';

const menuData: MenuItem[] = [
  { id: 1, name: 'Pepperoni Pizza', category: 'Food', price: 10, restaurantId: "3", availability: true, tag: 'non-veg' },
  { id: 2, name: 'Cheese Pizza', category: 'Food', price: 8, restaurantId: "3", availability: true, tag: 'veg' },
  { id: 3, name: 'Veggie Pizza', category: 'Food', price: 9, restaurantId: "3", availability: true, tag: 'veg' },
  { id: 4, name: 'Chicken Wings', category: 'Food', price: 5, restaurantId: "3", availability: true, tag: 'non-veg' },
  { id: 5, name: 'Caesar Salad', category: 'Salads', price: 7, restaurantId: "3", availability: true, tag: 'veg' },
  { id: 6, name: 'Greek Salad', category: 'Salads', price: 6, restaurantId: "3", availability: true, tag: 'veg' },
];

const MenuPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>(menuData);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [priceSort, setPriceSort] = useState<string | null>(null);
  const [flatView, setFlatView] = useState(false);
  const [showFilter, setShowFilter] = useState(true);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query) {
      setFlatView(true); // Switch to flat view when searching
      const filtered = menuData.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMenu(filtered);
    } else {
      setFlatView(false); // Restore category view when search is cleared
      applyFilters(); // Reapply filters when search is cleared
    }
  };

  const handleTagToggle = (tag: string) => {
    const updatedTags = activeTags.includes(tag)
      ? activeTags.filter(t => t !== tag)
      : [...activeTags, tag];
    setActiveTags(updatedTags);
    applyFilters(updatedTags, priceSort);
  };

  const handlePriceSort = (sortOption: string | null) => {
    setPriceSort(sortOption);
    applyFilters(activeTags, sortOption);
  };

  const applyFilters = (tags = activeTags, sortOption = priceSort) => {
    let updatedMenu = menuData;

    // Filter by tags
    if (tags.length > 0) {
      updatedMenu = updatedMenu.filter(item => tags.includes(item.tag));
      setFlatView(true); // Switch to flat view when filtering
    }

    // Sort by price
    if (sortOption === 'low-to-high') {
      updatedMenu = updatedMenu.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-to-low') {
      updatedMenu = updatedMenu.sort((a, b) => b.price - a.price);
    }

    setFilteredMenu(updatedMenu);
  };

  const toggleFilter = () => {
    const nextShowFilter = !showFilter;
    setShowFilter(nextShowFilter);

    if (!nextShowFilter) {
      setFlatView(false); // Switch back to category view if filter is turned off
      setFilteredMenu(menuData); // Reset to original menu when filter is off
    } else if (searchQuery) {
      setFlatView(true); // Keep flat view if search is active
    }
  };

  return (
    <div className="p-6">
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Show filter toggle button and filter only if no search query */}
      {!searchQuery && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Menu</h1>
            <button
              onClick={toggleFilter}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {showFilter ? 'Hide Filter' : 'Show Filter'}
            </button>
          </div>

          {showFilter && (
            <MenuFilter
              tags={['veg', 'non-veg', 'egg']}
              activeTags={activeTags}
              onTagToggle={handleTagToggle}
              onPriceSort={handlePriceSort}
              priceSort={priceSort}
            />
          )}
        </>
      )}

      {/* Menu List */}
      <MenuList menuItems={filteredMenu} categories={['Food', 'Salads']} flatView={flatView} />
    </div>
  );
};

export default MenuPage;
