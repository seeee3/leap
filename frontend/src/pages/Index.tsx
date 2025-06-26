import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { TagsCluster } from "@/components/TagsCluster";
import { ArticleCard } from "@/components/ArticleCard";
import { AuthButtons } from "@/components/AuthButtons";

// Optional: fallback content for initial render
const mockArticles = [/* your original mockArticles array */];

const Index = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    if (tag === "All") {
      setSelectedTags([]);
    } else {
      setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    }
  };

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:4000/api/search?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // If no search is triggered yet, show mockArticles as default
  const displayedArticles = (query === "" && selectedTags.length === 0) ? mockArticles : results;

  const filteredArticles = displayedArticles.filter(article => {
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => article.tags.includes(tag));
    return matchesTags;
  });

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
            onChange={handleSearch}
            placeholder="Search for anything"
            isLoading={isLoading}
          />
        </div>

        <TagsCluster selectedTags={selectedTags} onTagClick={handleTagClick} />
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
