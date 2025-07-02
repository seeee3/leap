import { useState, useEffect, useRef } from "react";
import { SearchBar } from "@/components/SearchBar";
import { TagsCluster } from "@/components/TagsCluster";
import { ArticleCard } from "@/components/ArticleCard";
import { AuthButtons } from "@/components/AuthButtons";

const Index = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<string | null>(null);

  const cacheRef = useRef<Record<string, any>>({});

  const buildCacheKey = (searchQuery: string, filters: { source: string | null; dateRange: string | null }, tags: string[]) => {
    return `${searchQuery}|${filters.source ?? "null"}|${filters.dateRange ?? "null"}|${tags.join(",")}`;
  };

  // Just fetch data, do NOT set query here
  const fetchResults = async (
    searchQuery: string,
    filters: { source: string | null; dateRange: string | null },
    tags: string[]
  ) => {
    setIsLoading(true);

    const cacheKey = buildCacheKey(searchQuery, filters, tags);
    if (cacheRef.current[cacheKey]) {
      setResults(cacheRef.current[cacheKey]);
      setIsLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append("query", searchQuery);
      tags.forEach((tag) => params.append("tags", tag));

      if (filters?.source) params.append("source", filters.source);
      else if (selectedSource) params.append("source", selectedSource);

      if (filters?.dateRange) params.append("dateRange", filters.dateRange);
      else if (selectedDateRange) params.append("dateRange", selectedDateRange);

      const response = await fetch(`http://localhost:4000/api/search?${params.toString()}`);
      const data = await response.json();

      setResults(data.results || []);
      cacheRef.current[cacheKey] = data.results || [];
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Wrapper that updates query and triggers fetch
  const handleSearch = (
    searchQuery: string,
    filters: { source: string | null; dateRange: string | null },
    tags: string[] = []
  ) => {
    // Always fetch, even if the query hasn’t changed
    fetchResults(searchQuery, filters, tags);
  
    // Only update state if changed (prevents redundant renders)
    if (query !== searchQuery) {
      setQuery(searchQuery);
    }
  };
  
  const handleTagClick = (tag: string) => {
    const updatedTag = selectedTags === tag ? null : tag;
    setSelectedTags(updatedTag);
  
    // Use current query state, not tag as query
    // Because you want the query from the search bar to persist
    fetchResults(query, { source: selectedSource, dateRange: selectedDateRange }, updatedTag ? [updatedTag] : []);
  };
  
  const handleFiltersChange = (filters: { source: string | null; dateRange: string | null }) => {
    setSelectedSource(filters.source);
    setSelectedDateRange(filters.dateRange);
  
    fetchResults(query, filters, selectedTags ? [selectedTags] : []);
  };
  

  useEffect(() => {
    // Fetch results for "ai" without setting query state
    fetchResults("ai", { source: null, dateRange: "null" }, []);
    
    // Don't call setQuery here, so search bar remains empty
  }, []);
  

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="font-bold text-4xl">Leap XI</h1>
        <AuthButtons />
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 max-w-4xl mx-auto leading-tight">
          All Your AI News - In One Place
        </h2>

        <div className="max-w-4xl mx-auto mb-8">
          <SearchBar
            value={query}
            onChange={(val) => {
              setQuery(val);
              setSelectedTags(null); // clear tag selection on manual input
            }}
            onSearch={(q) => handleSearch(q, { source: selectedSource, dateRange: selectedDateRange }, [])}
            onFiltersChange={handleFiltersChange}
            placeholder="Search for anything"
            isLoading={isLoading}
          />
        </div>

        <TagsCluster selectedTags={selectedTags ? [selectedTags] : []} onTagClick={handleTagClick} />
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((article) => (
            <ArticleCard key={article.url} article={article} />
          ))}
        </div>
         
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 text-gray-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
              Loading more articles...
            </div>
          </div>
        )}

        {results.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;

