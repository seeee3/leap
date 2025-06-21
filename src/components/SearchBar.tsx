
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
    <div className="w-full max-w-3xl mx-auto animate-slide-up">
      <form onSubmit={handleSubmit} className="relative group">
        {/* Search Input Container */}
        <div className="relative flex items-center backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 hover:border-cyan-500/30 group-focus-within:border-cyan-400/50 group-focus-within:shadow-cyan-500/20">
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-cyan-400 transition-colors duration-300" />
          
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search the web..."
            className="w-full pl-16 pr-16 py-5 text-lg bg-transparent text-slate-100 placeholder-slate-400 rounded-2xl focus:outline-none transition-all duration-300"
            disabled={isLoading}
          />
          
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-all duration-200 p-2 hover:bg-slate-700/50 rounded-full group"
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
              className="h-2 bg-slate-800/50 rounded-full overflow-hidden"
            />
          </div>
        )}

        {/* Search Button */}
        <div className="flex justify-center mt-8">
          <Button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white border-none rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-slate-900"
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
