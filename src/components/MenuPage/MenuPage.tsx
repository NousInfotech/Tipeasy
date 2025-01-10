'use client'

import React, { useState, useMemo } from 'react';
import MenuList from '@/components/MenuList/MenuList';
import SearchBar from '@/components/SearchBar/SearchBar';
import { MenuFilter, TagFilter } from '@/components/MenuFilter/MenuFilter';
import HeaderwithBackButton from '@/components/HeaderwithBackButton/HeaderwithBackButton';
import { Filter } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { IMenu } from '@/types/schematypes';

const MenuPage: React.FC<{ menuData: IMenu[] }> = ({ menuData }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMenu, setFilteredMenu] = useState<IMenu[]>(menuData);
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [priceSort, setPriceSort] = useState<string | null>(null);
    const [flatView, setFlatView] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const { state: cartState } = useCart();
    const params = useParams();
    const restaurantId = params?.restaurantId;

    // Extract unique categories from menuData
    const categories = useMemo(() => {
        return Array.from(new Set(menuData.map(item => item.category)));
    }, [menuData]);


    const handleSearch = (query: string) => {
        setSearchQuery(query);

        if (query) {
            setFlatView(true);
            const filtered = menuData.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredMenu(filtered);
        } else {
            setFlatView(false);
            applyFilters();
        }
    };

    const applyFilters = (tags = activeTags, sortOption = priceSort) => {
        let updatedMenu = menuData;

        if (tags.length > 0) {
            updatedMenu = updatedMenu.filter(item => tags.includes((item.dietaryPreference).toLowerCase()));
            setFlatView(true);
        } else {
            setFlatView(false);
        }

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
            setFlatView(false);
            setFilteredMenu(menuData);
        } else if (searchQuery) {
            setFlatView(true);
        }
    };

    const isCartDisabled = cartState.items.every(item => item.quantity <= 0);

    return (
        <div className="p-4">
            <HeaderwithBackButton heading="Menu Items" />
            <SearchBar placeHolder='Search a Food Item' onSearch={handleSearch} />

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
                            onTagToggle={tag => setActiveTags(prev =>
                                prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                            )}
                        />
                    </div>

                    {showFilter && (
                        <MenuFilter
                            tags={['veg', 'non-veg', 'egg']}
                            activeTags={activeTags}
                            onTagToggle={tag => setActiveTags(prev =>
                                prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                            )}
                            onPriceSort={setPriceSort}
                            priceSort={priceSort}
                        />
                    )}
                </>
            )}

            <MenuList
                menuItems={filteredMenu}
                categories={categories}
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
