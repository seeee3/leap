
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  isLoading?: boolean;
  query: string;
}

const SearchBar = ({ onSearch, onClear, isLoading = false, query: initialQuery }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 15;
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      const timeout = setTimeout(() => setProgress(0), 500);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    onClear();
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-slide-up">
      <form onSubmit={handleSubmit} className="relative group">
        {/* Search Input Container */}
        <div className="relative flex items-center backdrop-blur-xl border shadow-2xl rounded-2xl transition-all duration-500 group-focus-within:shadow-2xl
                        dark:bg-slate-800/40 dark:border-slate-700/50 dark:hover:border-cyan-500/30 dark:group-focus-within:border-cyan-400/50 dark:hover:shadow-cyan-500/10 dark:group-focus-within:shadow-cyan-500/20
                        bg-white/80 border-gray-200/50 hover:border-blue-300/50 group-focus-within:border-blue-400/50 hover:shadow-blue-500/10 group-focus-within:shadow-blue-500/20">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-300
                             dark:text-slate-400 dark:group-focus-within:text-cyan-400
                             text-gray-500 group-focus-within:text-blue-500" />
          
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search the web..."
            className="w-full pl-14 pr-14 py-4 text-lg bg-transparent rounded-2xl focus:outline-none transition-all duration-300
                       dark:text-slate-100 dark:placeholder-slate-400
                       text-gray-900 placeholder-gray-500"
            disabled={isLoading}
          />
          
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 transition-all duration-200 p-2 rounded-full group
                         dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700/50
                         text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
              disabled={isLoading}
            >
              <X className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
          )}
        </div>

        {/* Loading Progress Bar */}
        {isLoading && (
          <div className="mt-4 animate-fade-in">
            <Progress 
              value={progress} 
              className="h-2 rounded-full overflow-hidden transition-colors duration-500
                         dark:bg-slate-800/50 bg-gray-200/50"
            />
          </div>
        )}

        {/* Search Button */}
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="px-8 py-3 border-none rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-offset-2
                       dark:bg-gradient-to-r dark:from-cyan-600 dark:to-teal-600 dark:hover:from-cyan-500 dark:hover:to-teal-500 dark:text-white dark:hover:shadow-cyan-500/25 dark:focus:ring-cyan-400/50 dark:focus:ring-offset-slate-900
                       bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white hover:shadow-blue-500/25 focus:ring-blue-400/50 focus:ring-offset-white
                       hover:shadow-xl"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Searching...</span>
              </span>
            ) : (
              'Search'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
