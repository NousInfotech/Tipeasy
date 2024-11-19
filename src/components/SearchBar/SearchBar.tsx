// components/SearchBar.tsx
'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Pass search query to the parent
  };

  return (
    <div className="my-4 relative">
      {/* Search Icon */}
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />

      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search a food Item"
        className="w-full pl-10 p-3 font-normal text-xs border rounded-lg border-primary focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
