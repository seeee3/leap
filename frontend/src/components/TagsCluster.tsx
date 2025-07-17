import { Button } from "@/components/ui/button";

const tags = [
  "llm",
  "agentic",
  "open-source",
  "ai-tools",
  "ai-startups",
  "cyber-security",
  "vibe-coding",
  "machine-learning"
];

interface TagsClusterProps {
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

export const TagsCluster = ({ selectedTags, onTagClick }: TagsClusterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto">
      {tags.map((tag) => {
        const isSelected = tag === "All" ? selectedTags.length === 0 : selectedTags.includes(tag);
        return (
          <Button
            key={tag}
            onClick={() => onTagClick(tag)}
            variant="outline"
            className={`
              h-12 px-6 border border-orange-500 text-white hover:bg-orange-500/30 hover:border-orange-400 transition-all duration-200
              ${isSelected ? 'bg-orange-500/30 border-orange-400' : 'bg-transparent'}
            `}
          >
            {tag}
          </Button>
        );
      })}
    </div>
  );
};
