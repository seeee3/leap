
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
  const [results, setResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: '1',
          title: 'React Documentation - Getting Started',
          url: 'https://react.dev',
          description: 'Learn React with our comprehensive documentation and tutorials. Build modern web applications with components, hooks, and more.',
          domain: 'react.dev'
        },
        {
          id: '2',
          title: 'Tailwind CSS - Utility-First Framework',
          url: 'https://tailwindcss.com',
          description: 'A utility-first CSS framework packed with classes to build any design, directly in your markup.',
          domain: 'tailwindcss.com'
        },
        {
          id: '3',
          title: 'TypeScript Handbook',
          url: 'https://typescriptlang.org',
          description: 'TypeScript extends JavaScript by adding types. Learn how to use TypeScript to build scalable applications.',
          domain: 'typescriptlang.org'
        },
        {
          id: '4',
          title: 'Vite - Next Generation Frontend Tooling',
          url: 'https://vitejs.dev',
          description: 'Vite provides a faster and leaner development experience for modern web projects.',
          domain: 'vitejs.dev'
        },
        {
          id: '5',
          title: 'MDN Web Docs',
          url: 'https://developer.mozilla.org',
          description: 'The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs.',
          domain: 'developer.mozilla.org'
        }
      ];
      setResults(mockResults);
      setIsLoading(false);
    }, 1500);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Off-screen light source */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-l from-cyan-400/20 via-blue-400/10 to-transparent rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-teal-400/15 via-cyan-400/8 to-transparent rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
      
      {/* Subtle grid pattern */}
      <div className="fixed inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }}></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-4xl mx-auto">
            {/* Logo/Title */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                Search
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent ml-3">
                  Engine
                </span>
              </h1>
              <p className="text-slate-400 text-lg">Find what you're looking for</p>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <SearchBar 
                onSearch={handleSearch} 
                onClear={handleClear}
                isLoading={isLoading} 
                query={query}
              />
            </div>

            {/* Search Results */}
            <SearchResults 
              results={results} 
              query={query} 
              isLoading={isLoading} 
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
