import { useState, useEffect } from "react";
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
  onSearch: (query: string, filters: { source: string | null; dateRange: string | null }) => void;
  onFiltersChange: (filters: { source: string | null; dateRange: string | null }) => void;
  placeholder?: string;
  isLoading?: boolean;
}

const filterOptions = {
  dateRange: [
    { id: "today", label: "Today" },
    { id: "this-week", label: "This week" },
    { id: "this-month", label: "This month" },
    { id: "this-year", label: "This year" },
  ],
  source: [
    { id: "youtube", label: "Youtube" },
    { id: "website", label: "Website" },
    { id: "github", label: "Github" },
    { id: "marktechpost", label: "Marktechpost" },
  ],
};

export const SearchBar = ({
  value,
  onChange,
  onSearch,
  onFiltersChange,
  placeholder = "Search...",
}: SearchBarProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  // Debug: Log state changes of filters
  useEffect(() => {
    console.log("Filter state changed:", { selectedDate, selectedSource });
  }, [selectedDate, selectedSource]);

  // Toggle single select filters
  const toggleSingleSelect = (
    current: string | null,
    setter: React.Dispatch<React.SetStateAction<string | null>>,
    value: string
  ) => {
    const newValue = current === value ? null : value;
    setter(newValue);

    // Log before calling parent's filter change handler
    console.log("Toggling filter:", {
      newValue,
      currentSelectedDate: selectedDate,
      currentSelectedSource: selectedSource,
      setterName: setter === setSelectedSource ? "source" : "dateRange",
    });

    onFiltersChange({
      source: setter === setSelectedSource ? newValue : selectedSource,
      dateRange: setter === setSelectedDate ? newValue : selectedDate,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Enter pressed with value:", value, selectedSource, selectedDate);
      onSearch(value, { source: selectedSource, dateRange: selectedDate });
    }
  };

  const handleSearchClick = () => {
    console.log("Search button clicked with value:", value, selectedSource, selectedDate);
    onSearch(value, { source: selectedSource, dateRange: selectedDate });
  };

  return (
    <div className="flex w-full max-w-4xl mx-auto gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            console.log("Input changed to:", e.target.value);
            onChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          className="w-full h-14 bg-black border border-orange-500/20 text-white placeholder:text-gray-400 text-lg px-6 pr-14 focus:border-orange-500/40 focus:ring-0 rounded-r-none"
        />
      </div>

      <Button
        variant="outline"
        className="h-14 bg-black border border-orange-500 text-white hover:bg-orange-500/10 hover:border-orange-400 px-6 rounded-l-none rounded-r-none flex items-center gap-2"
        onClick={handleSearchClick}
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
            {/* Upload Date */}
            <div>
              <h3 className="font-medium text-lg mb-3">Upload date</h3>
              <div className="space-y-2">
                {filterOptions.dateRange.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`date-${option.id}`}
                      checked={selectedDate === option.id}
                      onCheckedChange={() => toggleSingleSelect(selectedDate, setSelectedDate, option.id)}
                      className="border-orange-500/20 data-[state=checked]:bg-orange-500"
                    />
                    <Label htmlFor={`date-${option.id}`} className="text-gray-300 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-orange-500/20" />

            {/* Source */}
            <div>
              <h3 className="font-medium text-lg mb-3">Source</h3>
              <div className="space-y-2">
                {filterOptions.source.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`source-${option.id}`}
                      checked={selectedSource === option.id}
                      onCheckedChange={() => toggleSingleSelect(selectedSource, setSelectedSource, option.id)}
                      className="border-orange-500/20 data-[state=checked]:bg-orange-500"
                    />
                    <Label htmlFor={`source-${option.id}`} className="text-gray-300 cursor-pointer">
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