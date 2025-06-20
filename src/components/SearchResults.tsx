
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  domain: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  isLoading: boolean;
}

const SearchResults = ({ results, query, isLoading }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="space-y-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-700 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-slate-700 rounded w-full mb-1"></div>
              <div className="h-3 bg-slate-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!query) return null;

  if (results.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 text-center">
        <p className="text-slate-300 text-lg">No results found for "{query}"</p>
        <p className="text-slate-500 text-sm mt-2">Try different keywords or check your spelling</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="mb-4 text-sm text-slate-400">
        About {results.length.toLocaleString()} results for "{query}"
      </div>
      <div className="space-y-6">
        {results.map((result) => (
          <div key={result.id} className="group bg-slate-800/30 p-4 rounded-lg border border-slate-700/50 hover:border-violet-500/50 transition-all duration-200 backdrop-blur-sm">
            <div className="flex items-start space-x-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm text-slate-500">{result.domain}</span>
                  <ExternalLink className="h-3 w-3 text-slate-500" />
                </div>
                <h3 className="text-xl text-violet-400 hover:text-violet-300 cursor-pointer group-hover:underline font-medium mb-1">
                  {result.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {result.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
