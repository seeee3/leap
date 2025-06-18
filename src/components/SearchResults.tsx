
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
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
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
        <p className="text-gray-600 text-lg">No results found for "{query}"</p>
        <p className="text-gray-400 text-sm mt-2">Try different keywords or check your spelling</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="mb-4 text-sm text-gray-600">
        About {results.length.toLocaleString()} results for "{query}"
      </div>
      <div className="space-y-6">
        {results.map((result) => (
          <div key={result.id} className="group">
            <div className="flex items-start space-x-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm text-gray-500">{result.domain}</span>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </div>
                <h3 className="text-xl text-blue-600 hover:text-blue-800 cursor-pointer group-hover:underline font-medium mb-1">
                  {result.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
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
