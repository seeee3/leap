
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
      <div className="w-full max-w-4xl mx-auto mt-12 animate-fade-in">
        <div className="space-y-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 p-6 rounded-xl animate-pulse">
              <div className="h-4 bg-slate-700/50 rounded-lg w-3/4 mb-3"></div>
              <div className="h-3 bg-slate-700/50 rounded-lg w-1/2 mb-3"></div>
              <div className="h-3 bg-slate-700/50 rounded-lg w-full mb-2"></div>
              <div className="h-3 bg-slate-700/50 rounded-lg w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!query) return null;

  if (results.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-12 text-center animate-fade-in">
        <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 p-12 rounded-xl">
          <p className="text-slate-300 text-xl mb-2">No results found for "{query}"</p>
          <p className="text-slate-500">Try different keywords or check your spelling</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <div className="mb-6 text-sm text-slate-400 animate-fade-in">
        About {results.length.toLocaleString()} results for "{query}"
      </div>
      <div className="space-y-4">
        {results.map((result, index) => (
          <div 
            key={result.id} 
            className="group backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 p-6 rounded-xl hover:border-cyan-500/30 hover:bg-slate-800/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/10 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-slate-500">{result.domain}</span>
                  <ExternalLink className="h-3 w-3 text-slate-500" />
                </div>
                <h3 className="text-xl text-cyan-400 hover:text-cyan-300 cursor-pointer group-hover:underline font-medium mb-2 transition-colors duration-200">
                  {result.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
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
