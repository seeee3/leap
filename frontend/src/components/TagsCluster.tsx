
import { Button } from "@/components/ui/button";

const tags = [
  "llm",
  "agentic",
  "open source",
  "ai tools",
  "ai startups",
  "cyber security",
  "vibe coding",
  "machine learning",
];

interface TagsClusterProps {
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

export const TagsCluster = ({ selectedTags, onTagClick }: TagsClusterProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {tags.map((tag) => (
        <Button
          key={tag}
          variant={selectedTags.includes(tag) ? "default" : "outline"}
          onClick={() => onTagClick(tag)}
          className="h-13 items-center text-sm rounded-sm rounded-md font-medium py-2 h-13 px-6 gap-3 bg-black border border-orange-500/20 text-white hover:border-orange-400 transition-all duration-20"
        >
          {tag}
        </Button>
      ))}
    </div>
  );
};

