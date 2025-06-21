
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

  const popularTopics = [
    {
      title: "Machine Learning",
      description: "Explore algorithms and neural networks",
      icon: "🤖"
    },
    {
      title: "Natural Language Processing",
      description: "Understanding human language with AI",
      icon: "💬"
    },
    {
      title: "Computer Vision",
      description: "Teaching machines to see and interpret",
      icon: "👁️"
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
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-slate-900 to-indigo-900 relative overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-blue-500/5 to-purple-500/10"></div>
      
      {/* Off-screen light sources */}
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

            {/* Popular AI Topics Overlay - Only show when no search query */}
            {!query && !isLoading && results.length === 0 && (
              <div className="mb-12 animate-fade-in">
                <h2 className="text-2xl font-semibold text-white mb-6 text-center">Popular AI Topics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {popularTopics.map((topic, index) => (
                    <div
                      key={index}
                      onClick={() => handleTopicClick(topic.title)}
                      className="group backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 p-6 rounded-xl hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer animate-slide-up"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                          {topic.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
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
