
import { Button } from "@/components/ui/button";

const tags = [
  "All",
  "Latest News",
  "LLMs",
  "Agentic",
  "Open Source",
  "I only have 5 min",
  "AI in Industries",
  "AI Tools",
  "AI Startups",
  "Cyber Security + AI",
  "Vibe Coding",
  "Vibe Anything",
  "AI Transformation",
  "Upcoming Events"
];

interface TagsClusterProps {
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

export const TagsCluster = ({ selectedTags, onTagClick }: TagsClusterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto ">
      {tags.map((tag) => {
        const isSelected = tag === "All" ? selectedTags.length === 0 : selectedTags.includes(tag);
        return (
          <Button
            key={tag}
            onClick={() => onTagClick(tag)}
            variant="outline"
            className={`
              h-12 px-6 border border-orange-500/20 text-white hover:bg-orange-500/10 hover:border-orange-400 transition-all duration-200
              ${isSelected ? 'bg-orange-500/10 border-orange-400' : 'bg-transparent '}
            `}
          >
            {tag}
          </Button>
        );
      })}
    </div>
  );
};