
import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { TagsCluster } from "@/components/TagsCluster";
import { ArticleCard } from "@/components/ArticleCard";
import { AuthButtons } from "@/components/AuthButtons";

// Mock article data
const mockArticlesBase = [{
  id: 1,
  thumbnail: "photo-1488590528505-98d2b5aba04b",
  headline: "OpenAI Announces GPT-5 with Revolutionary Multimodal Capabilities and Enhanced Reasoning",
  summary: "The latest iteration of GPT promises unprecedented performance across text, image, and audio processing. Early benchmarks show significant improvements in mathematical reasoning and code generation. Industry experts predict this could accelerate AI adoption across enterprise applications.",
  source: "OpenAI Blog",
  date: "2024-01-15",
  tags: ["Latest News", "LLMs", "AI Startups"],
  url: "https://openai.com"
}, {
  id: 2,
  thumbnail: "photo-1461749280684-dccba630e2f6",
  headline: "Agentic AI Systems Begin Autonomous Software Development at Major Tech Companies",
  summary: "Several Fortune 500 companies report successful deployment of AI agents capable of writing, testing, and deploying code independently. These systems reduce development time by 40% while maintaining quality standards. The shift represents a fundamental change in how software is created.",
  source: "TechCrunch",
  date: "2024-01-14",
  tags: ["Agentic", "AI Tools", "AI Transformation"],
  url: "https://techcrunch.com"
}, {
  id: 3,
  thumbnail: "photo-1581091226825-a6a2a5aee158",
  headline: "Open Source AI Models Achieve Parity with Proprietary Solutions in Latest Benchmarks",
  summary: "Community-driven AI models now match or exceed performance of closed-source alternatives across multiple evaluation metrics. This democratization of AI capabilities could reshape the competitive landscape. Major cloud providers are adapting their strategies accordingly.",
  source: "Hugging Face",
  date: "2024-01-13",
  tags: ["Open Source", "LLMs", "AI Transformation"],
  url: "https://huggingface.co"
}, {
  id: 4,
  thumbnail: "photo-1526374965328-7f61d4dc18c5",
  headline: "AI-Powered Cybersecurity Tools Detect Zero-Day Vulnerabilities in Real-Time",
  summary: "Next-generation security platforms leverage machine learning to identify previously unknown attack patterns. These systems can predict and prevent cyber threats before they manifest. Government agencies are fast-tracking adoption for critical infrastructure protection.",
  source: "CyberScoop",
  date: "2024-01-12",
  tags: ["Cyber Security + AI", "AI Tools", "Latest News"],
  url: "https://cyberscoop.com"
}, {
  id: 5,
  thumbnail: "photo-1487058792275-0ad4aaf24ca7",
  headline: "Healthcare AI Achieves 95% Accuracy in Early Disease Detection Across Multiple Conditions",
  summary: "Medical AI systems now outperform human specialists in diagnosing various cancers, heart conditions, and neurological disorders. Clinical trials show reduced diagnostic errors and faster treatment initiation. Regulatory approval processes are being expedited globally.",
  source: "Nature Medicine",
  date: "2024-01-11",
  tags: ["AI in Industries", "Latest News", "AI Transformation"],
  url: "https://nature.com"
}, {
  id: 6,
  thumbnail: "photo-1605810230434-7631ac76ec81",
  headline: "Major AI Conference Announces Breakthrough Presentations for Upcoming Summit",
  summary: "Leading researchers will present groundbreaking work on artificial general intelligence, quantum-AI integration, and ethical AI frameworks. Registration opens next week with expected record attendance. Virtual participation options available for global audience.",
  source: "AI Conference Board",
  date: "2024-01-10",
  tags: ["Upcoming Events", "Latest News", "AI Transformation"],
  url: "https://aiconference.com"
}];

// Function to generate more articles for infinite scroll
const generateMoreArticles = (startId: number, count: number) => {
  const additionalHeadlines = [
    "Machine Learning Breakthrough Enables Real-Time Language Translation",
    "Quantum Computing Integration with AI Shows Promising Early Results",
    "Robotic Process Automation Transforms Financial Services Industry",
    "Computer Vision Technology Revolutionizes Medical Imaging Analysis",
    "Natural Language Processing Advances Enable Better Human-AI Interaction",
    "Edge AI Deployment Reduces Latency in IoT Applications",
    "Federated Learning Preserves Privacy While Training Global AI Models",
    "Reinforcement Learning Algorithms Master Complex Strategic Games",
    "AI Ethics Frameworks Gain Adoption Across Technology Companies",
    "Neural Architecture Search Automates Deep Learning Model Design"
  ];

  const sources = ["MIT Technology Review", "Wired", "Ars Technica", "IEEE Spectrum", "Science Daily"];
  const thumbnails = [
    "photo-1677442136019-21780ecad995",
    "photo-1620712943543-bcc4688e7485",
    "photo-1485827404703-89b55fcc595e",
    "photo-1519389950473-47ba0277781c",
    "photo-1451187580459-43490279c0fa"
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: startId + i,
    thumbnail: thumbnails[i % thumbnails.length],
    headline: additionalHeadlines[i % additionalHeadlines.length],
    summary: "This AI breakthrough represents a significant step forward in the field of artificial intelligence. The research team has demonstrated impressive results that could have far-reaching implications for various industries and applications.",
    source: sources[i % sources.length],
    date: new Date(2024, 0, 10 - i).toISOString().split('T')[0],
    tags: ["AI Research", "Technology", "Innovation"],
    url: "https://example.com"
  }));
};


const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [articles, setArticles] = useState(mockArticlesBase);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleTagClick = (tag: string) => {
    if (tag === "All") {
      setSelectedTags([]);
    } else {
      setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    }
  };
  const handleSearch = async (searchQuery: string) => {
  setSearchQuery(searchQuery);
  setLoading(true);

  try {
    const response = await fetch(`http://localhost:4000/api/search?query=${encodeURIComponent(searchQuery)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setArticles(data.results || []);
  } catch (error) {
    console.error('Error fetching search results:', error);
    setArticles([]);
  } finally {
    setLoading(false);
  }
};


  const loadMoreArticles = () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newArticles = generateMoreArticles(articles.length + 1, 6);
      setArticles(prev => [...prev, ...newArticles]);
      setLoading(false);
      
      // Stop loading more after 30 articles total
      if (articles.length >= 24) {
        setHasMore(false);
      }
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        loadMoreArticles();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, articles.length]);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchQuery === "" || article.headline.toLowerCase().includes(searchQuery.toLowerCase()) || article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => article.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  return <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="font-bold text-4xl">Leap XI</h1>
        <AuthButtons />
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 max-w-4xl mx-auto leading-tight">All Your AI News - In One Place</h2>
        
        <div className="max-w-4xl mx-auto mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearch} placeholder="Search for anything" />
        </div>
 
        <TagsCluster selectedTags={selectedTags} onTagClick={handleTagClick} />
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => <ArticleCard key={article.id} article={article} />)}
        </div>
        
        {loading && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 text-gray-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
              Loading more articles...
            </div>
          </div>
        )}
        
        {!hasMore && filteredArticles.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">You've reached the end of the articles.</p>
          </div>
        )}
        
        {filteredArticles.length === 0 && <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
          </div>}
      </section>
    </div>;
};

export default Index;
