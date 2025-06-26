
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}


const filterOptions = {
  dateRange: [
    { id: "today", label: "Today" },
    { id: "this-week", label: "This week" },
    { id: "this-month", label: "This month" },
    { id: "this-year", label: "This year" }
  ],
  source: [
    { id: "openai", label: "OpenAI Blog" },
    { id: "techcrunch", label: "TechCrunch" },
    { id: "huggingface", label: "Hugging Face" },
    { id: "nature", label: "Nature Medicine" }
  ],
  category: [
    { id: "latest", label: "Latest News" },
    { id: "llms", label: "LLMs" },
    { id: "agentic", label: "Agentic AI" },
    { id: "opensource", label: "Open Source" }
  ]
};

export const SearchBar = ({
  value,
  onChange,
  placeholder = "Search..."
}: SearchBarProps) => {
  return (
    <div className="flex w-full max-w-4xl mx-auto gap-2">
      <div className="relative flex-1">
        <Input 
          type="text" 
          placeholder={placeholder} 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          className="w-full h-14 bg-black border border-orange-500/20 text-white placeholder:text-gray-400 text-lg px-6 pr-14 focus:border-orange-500/40 focus:ring-0 rounded-r-none" 
        />
      </div>
      <Button 
        variant="outline" 
        className="h-14 bg-black border border-orange-500 text-white hover:bg-orange-500/10 hover:border-orange-400 px-6 rounded-l-none rounded-r-none flex items-center gap-2"
      >
        <Search className="h-5 w-5" />
        Search
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="h-14 bg-black border border-orange-500/20 text-white hover:bg-orange-500/10 hover:border-orange-400 px-4 flex items-center gap-2"
          >
            <Filter className="h-5 w-5" />
            Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-black border border-orange-500/20 text-white p-6" align="end">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-3">Upload date</h3>
              <div className="space-y-2">
                {filterOptions.dateRange.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox id={option.id} className="border-orange-500/20 data-[state=checked]:bg-orange-500" />
                    <Label htmlFor={option.id} className="text-gray-300 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="bg-orange-500/20" />
            
            <div>
              <h3 className="font-medium text-lg mb-3">Source</h3>
              <div className="space-y-2">
                {filterOptions.source.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox id={option.id} className="border-orange-500/20 data-[state=checked]:bg-orange-500" />
                    <Label htmlFor={option.id} className="text-gray-300 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="bg-orange-500/20" />
            
            <div>
              <h3 className="font-medium text-lg mb-3">Category</h3>
              <div className="space-y-2">
                {filterOptions.category.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox id={option.id} className="border-orange-500/20 data-[state=checked]:bg-orange-500" />
                    <Label htmlFor={option.id} className="text-gray-300 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
