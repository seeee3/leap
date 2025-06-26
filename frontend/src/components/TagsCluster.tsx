import { Button } from "@/components/ui/button";
import React from "react";

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

export const TagsCluster: React.FC<TagsClusterProps> = ({
  selectedTags,
  onTagClick
}) => {
  return (
    <div className="flex flex-wrap gap-2">
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
