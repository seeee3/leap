
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import ThemeToggle from '@/components/ThemeToggle';

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

  const popularTopics = [
    {
      title: "Machine Learning",
      description: "Explore algorithms and neural networks"
    },
    {
      title: "Natural Language Processing",
      description: "Understanding human language with AI"
    },
    {
      title: "Computer Vision",
      description: "Teaching machines to see and interpret"
    }
  ];

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

  const handleTopicClick = (topic: string) => {
    handleSearch(topic);
  };

  return (
    <div className="min-h-screen relative overflow-hidden transition-all duration-500
                    dark:bg-gradient-to-br dark:from-slate-900 dark:via-navy-900 dark:to-slate-800
                    bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 transition-opacity duration-500
                      dark:bg-gradient-to-tr dark:from-cyan-400/10 dark:via-blue-400/5 dark:to-purple-400/10
                      bg-gradient-to-tr from-blue-100/30 via-indigo-100/20 to-purple-100/30"></div>
      
      {/* Off-screen light sources */}
      <div className="fixed top-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500
                      dark:bg-gradient-to-l dark:from-cyan-300/20 dark:via-blue-300/10 dark:to-transparent
                      bg-gradient-to-l from-blue-300/30 via-indigo-300/15 to-transparent"></div>
      <div className="fixed bottom-0 left-0 w-80 h-80 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none transition-all duration-500
                      dark:bg-gradient-to-r dark:from-teal-300/15 dark:via-cyan-300/8 dark:to-transparent
                      bg-gradient-to-r from-teal-300/20 via-cyan-300/10 to-transparent"></div>
      
      {/* Subtle grid pattern */}
      <div className="fixed inset-0 opacity-[0.02] transition-opacity duration-500" style={{
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
              <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight transition-colors duration-500
                             dark:text-white text-gray-900">
                Search
                <span className="ml-3 bg-gradient-to-r dark:from-cyan-400 dark:to-teal-400 from-blue-500 to-blue-700 bg-clip-text text-transparent">
                  Engine
                </span>
              </h1>
              <p className="text-lg transition-colors duration-500
                           dark:text-slate-400 text-gray-600">Find what you're looking for</p>
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

            {/* Popular AI Topics Overlay - Only show when no search query */}
            {!query && !isLoading && results.length === 0 && (
              <div className="mb-12 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6 text-center transition-colors duration-500
                               dark:text-white text-gray-900">Popular AI Topics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {popularTopics.map((topic, index) => (
                    <div
                      key={index}
                      onClick={() => handleTopicClick(topic.title)}
                      className="group backdrop-blur-xl border p-4 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer animate-slide-up
                                 dark:bg-slate-800/40 dark:border-slate-600/50 dark:hover:border-cyan-400/60 dark:hover:bg-slate-700/60 dark:hover:shadow-cyan-400/20
                                 bg-white/70 border-gray-200/60 hover:border-blue-300/60 hover:bg-white/90 hover:shadow-blue-500/15
                                 hover:shadow-lg"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2 transition-colors duration-300
                                       dark:text-cyan-300 dark:group-hover:text-cyan-200
                                       text-blue-700 group-hover:text-blue-800">
                          {topic.title}
                        </h3>
                        <p className="text-sm leading-relaxed transition-colors duration-300
                                      dark:text-slate-300 text-gray-600">
                          {topic.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
