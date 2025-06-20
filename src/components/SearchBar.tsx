
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
    <div className="w-full max-w-2xl mx-auto fade-in">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-cyan-400 transition-colors duration-200" />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search the web..."
            className="w-full pl-12 pr-4 py-4 text-lg border border-slate-700 bg-slate-800/50 text-slate-100 placeholder-slate-400 rounded-full shadow-lg hover:shadow-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 backdrop-blur-sm glow-hover"
            disabled={isLoading}
          />
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <Button
            type="submit"
            variant="outline"
            className="btn-animate px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-500 hover:from-cyan-700 hover:to-blue-700 hover:shadow-lg transition-all duration-200 rounded-md"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? (
              <span className="pulse-subtle">Searching...</span>
            ) : (
              'Search'
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="btn-animate px-6 py-2 bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700 hover:shadow-lg transition-all duration-200 rounded-md"
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
