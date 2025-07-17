import { useState, useEffect, useRef } from "react";
import { SearchBar } from "@/components/SearchBar";
import { TagsCluster } from "@/components/TagsCluster";
import { ArticleCard } from "@/components/ArticleCard";

const ITEMS_PER_BATCH = 20;

const Index = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const fetchResults = async (
    pageNum: number,
    searchQuery: string,
    filters: { source: string | null; dateRange: string | null },
    tags: string[]
  ) => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("query", searchQuery);
      tags.forEach((tag) => params.append("tags", tag));
      if (filters.source) params.append("source", filters.source);
      if (filters.dateRange) params.append("dateRange", filters.dateRange);
      params.append("page", String(pageNum));
      params.append("limit", String(ITEMS_PER_BATCH));

      const response = await fetch(`http://localhost:4000/api/search?${params.toString()}`);
      const data = await response.json();

      const fetched = data.results || [];
      setResults((prev) => [...prev, ...fetched]);

      const more = fetched.length === ITEMS_PER_BATCH;
      setHasMore(more);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (
    searchQuery: string,
    filters: { source: string | null; dateRange: string | null },
    tags: string[] = []
  ) => {
    setQuery(searchQuery);
    setPage(1);
    setResults([]);
    setHasMore(true);
    fetchResults(1, searchQuery, filters, tags);
  };

  const handleTagClick = (tag: string) => {
    const updatedTag = selectedTags === tag ? null : tag;
    setSelectedTags(updatedTag);
    setPage(1);
    setResults([]);
    setHasMore(true);

    fetchResults(1, query, { source: selectedSource, dateRange: selectedDateRange }, updatedTag ? [updatedTag] : []);
  };

  const handleFiltersChange = (filters: { source: string | null; dateRange: string | null }) => {
    setSelectedSource(filters.source);
    setSelectedDateRange(filters.dateRange);
    setPage(1);
    setResults([]);
    setHasMore(true);

    fetchResults(1, query, filters, selectedTags ? [selectedTags] : []);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        setPage((prev) => prev + 1);
      }
    });

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => {
      if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    };
  }, [hasMore, isLoading]);

  useEffect(() => {
    if (page > 1) {
      fetchResults(page, query, { source: selectedSource, dateRange: selectedDateRange }, selectedTags ? [selectedTags] : []);
    }
  }, [page]);

  useEffect(() => {
    fetchResults(1, "", { source: null, dateRange: "this-week" }, ["ai"]);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="font-bold text-4xl">Leap XI</h1>
      </header>

      <section className="text-center py-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 max-w-4xl mx-auto leading-tight">
          All Your AI News - In One Place
        </h2>

        <div className="max-w-4xl mx-auto mb-8">
          <SearchBar
            value={query}
            onChange={(val) => {
              setQuery(val);
              setSelectedTags(null);
              setSelectedSource(null);
              setSelectedDateRange(null);
            }}
            onSearch={(q) =>
              handleSearch(q, { source: selectedSource, dateRange: selectedDateRange }, [])
            }
            onFiltersChange={handleFiltersChange}
            placeholder="Search"
            isLoading={isLoading}
          />
        </div>

        <TagsCluster selectedTags={selectedTags ? [selectedTags] : []} onTagClick={handleTagClick} />
      </section>

      <section className="max-w-7xl mx-auto px-16 pb-16">
        {results.length === 0 && isLoading ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 text-gray-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
              Loading articles...
            </div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {results.map((article) => (
              <ArticleCard key={article.url} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No Articles to display.</p>
          </div>
        )}

        <div ref={sentinelRef} className="h-10" />
      </section>

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 left-4 z-50 p-3 bg-orange-500/30 text-white rounded-full shadow-lg hover:bg-orange-500 transition"
          aria-label="Back to Top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Index;



