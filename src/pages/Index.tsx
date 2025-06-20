
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';

interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  domain: string;
}

const Index = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock search function - in a real app, this would call an API
  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setCurrentQuery(query);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock search results
    const mockResults: SearchResult[] = [
      {
        id: '1',
        title: `Understanding ${query} - Complete Guide`,
        url: `https://example.com/${query.toLowerCase()}`,
        description: `Learn everything about ${query} with our comprehensive guide. This article covers the fundamentals, best practices, and advanced techniques for working with ${query}.`,
        domain: 'example.com'
      },
      {
        id: '2',
        title: `${query} Documentation and Resources`,
        url: `https://docs.example.com/${query}`,
        description: `Official documentation for ${query}. Find detailed explanations, code examples, and troubleshooting guides to help you get started with ${query}.`,
        domain: 'docs.example.com'
      },
      {
        id: '3',
        title: `Top 10 ${query} Tips and Tricks`,
        url: `https://blog.example.com/${query}-tips`,
        description: `Discover the best tips and tricks for ${query}. Our experts share their insights and proven strategies to help you master ${query} efficiently.`,
        domain: 'blog.example.com'
      },
      {
        id: '4',
        title: `${query} Community Forum`,
        url: `https://forum.example.com/${query}`,
        description: `Join the ${query} community forum to discuss best practices, ask questions, and share your experiences with other ${query} enthusiasts.`,
        domain: 'forum.example.com'
      },
      {
        id: '5',
        title: `${query} Tools and Software`,
        url: `https://tools.example.com/${query}`,
        description: `Explore the best tools and software for ${query}. Compare features, pricing, and user reviews to find the perfect solution for your needs.`,
        domain: 'tools.example.com'
      }
    ];
    
    setSearchResults(mockResults);
    setIsLoading(false);
  };

  const hasSearched = currentQuery.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hasSearched ? (
          // Landing page view
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4 tracking-tight">
                AI Search Engine
              </h1>
              <p className="text-xl text-slate-300">
                Find what you're looking for across the web with AI
              </p>
            </div>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        ) : (
          // Results page view
          <div className="py-8">
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            </div>
            <SearchResults 
              results={searchResults} 
              query={currentQuery} 
              isLoading={isLoading} 
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <p className="text-sm text-slate-400">
              © 2024 AI Search Engine. Built with modern web technologies.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
