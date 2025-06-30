interface Article {
  thumbnail: string;
  headline: string;
  summary: string;
  source: string;
  date: string;
  tags: string[];
  url: string;
}

interface ArticleCardProps {
  article: Article;
}
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};


export const ArticleCard = ({ article }: ArticleCardProps) => {
  const handleClick = () => {
    window.open(article.url, '_blank');
  };

  return (
    <div 
      onClick={handleClick}
      className="border border-white/20 bg-black hover:border-white/40 transition-all duration-200 cursor-pointer group"
    >
      {/* Thumbnail with overlay */}
      <div className="aspect-video bg-gray-800 flex items-center justify-center text-gray-400 text-sm relative">
        <img 
          src={`https://images.unsplash.com/${article.thumbnail}?w=400&h=225&fit=crop`}
          alt={article.headline}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZTwvdGV4dD48L3N2Zz4=';
          }}
        />
        {/* Source and Date Overlay */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-xs text-white bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
          <span className="font-medium">{article.source}</span>
          <span>{formatDate(article.date)}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Headline - 2 lines */}
        <h3 className="text-white font-medium text-lg leading-6 mb-2 line-clamp-2 group-hover:text-gray-200 transition-colors">
          {article.headline}
        </h3>
        
        {/* Summary - 4 lines now with more space */}
        <p className="text-gray-400 text-sm leading-5 mb-3 line-clamp-4">
          {article.summary}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {article.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="text-xs px-2 py-1 bg-white/10 text-orange-400 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
