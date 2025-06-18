
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchBar = ({ onSearch, isLoading = false }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors duration-200" />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search the web..."
            className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-full shadow-sm hover:shadow-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
            disabled={isLoading}
          />
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <Button
            type="submit"
            variant="outline"
            className="px-6 py-2 rounded-md hover:shadow-sm transition-shadow duration-200"
            disabled={isLoading || !query.trim()}
          >
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            className="px-6 py-2 rounded-md hover:shadow-sm transition-shadow duration-200"
            onClick={() => setQuery('')}
            disabled={isLoading}
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
