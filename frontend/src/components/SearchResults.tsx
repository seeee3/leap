import React from 'react';
import { ExternalLink } from 'lucide-react';

interface SearchResult {
  title: string;
  url: string;
  description: string;
  date?: string; 
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  isLoading: boolean;
}

const SearchResults = ({ results, query, isLoading }: SearchResultsProps) => {
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return '';
    }
  };

  const formatDescription = (desc: string) => {
  if (!desc) return 'No description available';

  const cleanLines = desc
    .split('\n')
    .filter(line => !line.includes('%'))
    .join(' ');

  const trimmed = cleanLines.trim();
  const capitalized =
    trimmed.charAt(0).toUpperCase() + trimmed.slice(1);

  return capitalized.length > 300
    ? capitalized.slice(0, 297).trim() + '...'
    : capitalized;
};


  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-12 animate-fade-in">
        <div className="space-y-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="backdrop-blur-xl border p-6 rounded-xl animate-pulse transition-colors duration-500
                                       dark:bg-slate-800/30 dark:border-slate-700/50
                                       bg-white/60 border-gray-200/50">
              <div className="h-4 rounded-lg w-3/4 mb-3 dark:bg-slate-700/50 bg-gray-300/50" />
              <div className="h-3 rounded-lg w-1/2 mb-3 dark:bg-slate-700/50 bg-gray-300/50" />
              <div className="h-3 rounded-lg w-full mb-2 dark:bg-slate-700/50 bg-gray-300/50" />
              <div className="h-3 rounded-lg w-2/3 dark:bg-slate-700/50 bg-gray-300/50" />
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
        <div className="backdrop-blur-xl border p-12 rounded-xl dark:bg-slate-800/30 dark:border-slate-700/50 bg-white/60 border-gray-200/50">
          <p className="text-xl mb-2 dark:text-slate-300 text-gray-700">
            No results found for "{query}"
          </p>
          <p className="dark:text-slate-500 text-gray-500">
            Try different keywords or check your spelling
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <div className="mb-6 text-sm animate-fade-in dark:text-slate-400 text-gray-600">
        About {results.length.toLocaleString()} results for "{query}"
      </div>
      <div className="space-y-4">
        {results.map((result, index) => (
          <div
            key={index}
            className="group backdrop-blur-xl border p-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] animate-slide-up
                       dark:bg-slate-800/30 dark:border-slate-700/50 dark:hover:border-cyan-500/30 dark:hover:bg-slate-800/50 dark:hover:shadow-cyan-500/10
                       bg-white/60 border-gray-200/50 hover:border-blue-300/50 hover:bg-white/80 hover:shadow-blue-500/10 hover:shadow-lg"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 mb-2"
                >
                  <span className="text-sm dark:text-slate-500 text-gray-500">
                    {getDomain(result.url)}
                  </span>
                  <ExternalLink className="h-3 w-3 dark:text-slate-500 text-gray-500" />
                </a>
                <h3 className="text-xl font-medium mb-1 cursor-pointer group-hover:underline dark:text-cyan-400 dark:hover:text-cyan-300 text-blue-600 hover:text-blue-700
                overflow-hidden text-ellipsis line-clamp-2">
                  <a href={result.url} target="_blank" rel="noopener noreferrer">
                    {result.title || 'No Title'}
                  </a>
                </h3>
                {result.date && (
                  <p className="text-sm mb-2 text-gray-500 dark:text-slate-400">
                    {new Date(result.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}

                  </p>
                )}
                <p className="leading-relaxed dark:text-slate-300 text-gray-700">
                  {formatDescription(result.description || 'No description available.')}
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


