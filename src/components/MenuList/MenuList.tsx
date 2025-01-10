'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { IMenu } from '@/types/schematypes';

interface MenuListProps {
  menuItems: IMenu[];
  categories: string[];
  flatView: boolean; // Determines if the flat view (no categories) is active
}

interface MenuProductItemProps {
  id: string;
  name: string;
  category: string;
  price: number;
  imageSrc: string;
}

const MenuProductItem: React.FC<MenuProductItemProps> = ({ id, name, category, price, imageSrc }) => {
  const { state, dispatch } = useCart(); // Access cart state and dispatch functions
  const [quantity, setQuantity] = useState(() => {
    const itemInCart = state.items.find(item => item.id === id);
    return itemInCart ? itemInCart.quantity : 0;
  });

  const handleAddToCart = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch({ type: 'ADD_ITEM', payload: { id } });
  };

  const handleIncreaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch({ type: 'UPDATE_ITEM', payload: { id, quantity: newQuantity } });
  };

  const handleDecreaseQuantity = () => {
    const newQuantity = quantity - 1;
    if (newQuantity < 1) {
      setQuantity(0);
      dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    } else {
      setQuantity(newQuantity);
      dispatch({ type: 'UPDATE_ITEM', payload: { id, quantity: newQuantity } });
    }
  };

  return (
    <li>
      <div className='flex flex-row justify-between items-center p-4 pr-2 bg-accent2 gap-4 rounded-lg'>
        <div>
          <Image width={80} height={80} src={imageSrc} alt={name} className='rounded-lg' />
        </div>
        <div className='flex-1'>
          <h1 className='text-sm'>{name}</h1>
          <p className='text-xs'>{category}</p>
          <h3 className='text-base text-primary'>&#x20b9;{price}</h3>
        </div>
        <div className={`flex flex-1 items-center justify-end`}>
          {quantity > 0 ? (
            <div className='flex items-center gap-2'>
              <button
                onClick={handleDecreaseQuantity}
                className='p-[6px] bg-primary rounded text-white'
              >
                <Minus size={16} />
              </button>
              <span className='text-black text-xs'>{quantity}</span>
              <button
                onClick={handleIncreaseQuantity}
                className='p-[6px] bg-primary rounded text-white'
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className='p-[6px] bg-primary rounded text-white'
            >
              <Plus size={16} />
            </button>
          )}
        </div>
      </div>
    </li>
  );
};
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
    <div className='my-4'>
      {flatView ? (
        // Render flat list when flatView is enabled (e.g., search or filter active)
        <ul className="space-y-2">
          {menuItems.map((item: IMenu, index: number) => (
            <MenuProductItem
              key={index}
              id={item._id as string}
              name={item.title}
              category={item.category}
              price={item.price}
              imageSrc={item.imgSrc}
            />
          ))}
        </ul>
      ) : (
        // Render categorized dropdowns when flatView is disabled
        categories.map(category => (
          <div key={category} className="mb-4">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full text-left p-2 bg-transparent flex flex-row justify-between"
              style={{ borderBottom: '1px solid rgb(209 213 219)' }}
            >
              <span>{category}</span>
              <span>{openCategories[category] ? '▲' : '▼'}</span>
            </button>
            {
              openCategories[category] && (
                <ul className="mt-2 space-y-2">
                  {menuItems
                    .filter(item => item.category === category)
                    .map((item: IMenu, index: number) => (
                      <MenuProductItem
                        key={index}
                        id={item._id as string}
                        name={item.title}
                        category={item.category}
                        price={item.price}
                        imageSrc={item.imgSrc}
                      />
                    ))}
                </ul>
              )
            }
          </div>
        ))
      )}
    </div >
  );
};

export default MenuList;
