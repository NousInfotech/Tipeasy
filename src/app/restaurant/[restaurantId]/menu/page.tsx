'use client';

import React, { useState } from 'react';
import MenuList from '@/components/MenuList/MenuList';
import SearchBar from '@/components/SearchBar/SearchBar';
import { MenuFilter, TagFilter } from '@/components/MenuFilter/MenuFilter';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';
import { Filter } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { menuData } from '@/Mockdata/MenuData';
import { MenuItem } from '@/types';
import { useCart } from '@/context/CartContext'; // Assuming CartContext manages cart state

const MenuPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>(menuData);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [priceSort, setPriceSort] = useState<string | null>(null);
  const [flatView, setFlatView] = useState(false);
  const [showFilter, setShowFilter] = useState(true);

  const { state: cartState } = useCart(); // Access cart state
  const params = useParams();
  const restaurantId = params?.restaurantId;

  console.log(activeTags);

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
    // Toggle tag in activeTags
    const updatedTags = activeTags.includes(tag)
      ? activeTags.filter(t => t !== tag) // Remove tag if it's active
      : [...activeTags, tag]; // Add tag if it's not active

    setActiveTags(updatedTags); // Update state
    applyFilters(updatedTags, priceSort); // Reapply filters
  };

  const handlePriceSort = (sortOption: string | null) => {
    setPriceSort(sortOption);
    applyFilters(activeTags, sortOption);
  };

  const applyFilters = (tags = activeTags, sortOption = priceSort) => {
    let updatedMenu = menuData;

    // Filter by tags (show items matching active tags)
    if (tags.length > 0) {
      updatedMenu = updatedMenu.filter(item => tags.includes(item.tag));
      setFlatView(true); // Switch to flat view when filtering
    } else {
      setFlatView(false); // Reset to category view when no tags are selected
    }

    // Sort by price
    if (sortOption === 'low-to-high') {
      updatedMenu = updatedMenu.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-to-low') {
      updatedMenu = updatedMenu.sort((a, b) => b.price - a.price);
    }

    setFilteredMenu(updatedMenu); // Update the filtered menu
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

  // Check if cart is empty or if all item quantities are <= 0
  const isCartDisabled = cartState.items.every(item => item.quantity <= 0);

  return (
    <div className="p-4">
      <HeaderwithBackButton heading="Menu Items" />
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Show filter toggle button and filter only if no search query */}
      {!searchQuery && (
        <>
          <div className="flex items-center justify-between mb-4 gap-2">
            <button
              onClick={toggleFilter}
              className="p-[.3rem] bg-accent2 text-xs rounded-2xl flex flex-row gap-1 flex-1 justify-around"
            >
              <Filter size={16} />
              <span>Filter</span>
              <span>▼</span>
            </button>
            <TagFilter
              tags={['veg', 'non-veg', 'egg']}
              activeTags={activeTags}
              onTagToggle={handleTagToggle}
            />
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
      <MenuList
        menuItems={filteredMenu}
        categories={['Food', 'Salads']}
        flatView={flatView}
      />

      {isCartDisabled ? (
        <button
          disabled
          className="fixed w-11/12 bottom-3 p-3 rounded-lg text-xs bg-gray-400 text-white cursor-not-allowed"
        >
          Checkout
        </button>
      ) : (
        <Link href={`/restaurant/${restaurantId}/cart`}>
          <button className="fixed w-11/12 bottom-3 p-3 rounded-lg text-xs bg-primary text-white hover:bg-primary-dark">
            Checkout
          </button>
        </Link>
      )}
    </div>
  );
};

export default MenuPage;
