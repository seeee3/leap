
import { Button } from "@/components/ui/button";

const tags = [
  "LLMs",
  "Agentic",
  "Open Source",
  "AI Tools",
  "AI Startups",
  "Cyber Security",
  "Vibe Coding",
  "Machine Learning",
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
        >
          {tag}
        </Button>
      ))}
    </div>
  );
};

