// src/app/page.tsx
"use client"

import React from 'react';
import Link from 'next/link';

const Page: React.FC = () => {
  const restaurants: number[] = Array.from({ length: 10 }, (_, index) => index + 1); // Restaurant IDs 1-10

  return (
    <div>
      <h1>Restaurant List</h1>
      <div>
        {restaurants.map((restaurantId) => (
          <Link key={restaurantId} href={`/restaurant/${restaurantId}`} passHref>
            <button style={{ margin: '10px', padding: '10px', fontSize: '16px' }}>
              Restaurant {restaurantId}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
