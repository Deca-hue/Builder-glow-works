import React, { useState, useEffect, useMemo } from "react";
import { Search, Clock, TrendingUp, X, Filter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Input } from "./input";
import { Button } from "./button";
import { Badge } from "./badge";
import { ScrollArea } from "./scroll-area";
import { Separator } from "./separator";
import { cn } from "@/lib/utils";

interface SearchItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: SearchItem[];
  onItemSelect: (item: SearchItem) => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({
  open,
  onOpenChange,
  items,
  onItemSelect,
}) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("freshbite-recent-searches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load recent searches:", error);
      }
    }
  }, []);

  // Save recent searches to localStorage
  const addToRecentSearches = (searchQuery: string) => {
    if (searchQuery.trim().length < 2) return;

    const updated = [
      searchQuery,
      ...recentSearches.filter((s) => s !== searchQuery),
    ].slice(0, 5); // Keep only 5 recent searches

    setRecentSearches(updated);
    localStorage.setItem("freshbite-recent-searches", JSON.stringify(updated));
  };

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(items.map((item) => item.category))];
    return cats;
  }, [items]);

  // Filter and search items
  const filteredItems = useMemo(() => {
    let filtered = items;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Search by query
    if (query.trim()) {
      const searchTerm = query.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          item.category.toLowerCase().includes(searchTerm),
      );
    }

    // Sort by relevance (popular items first, then by rating)
    return filtered.sort((a, b) => {
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;
      return b.rating - a.rating;
    });
  }, [items, query, selectedCategory]);

  // Popular searches
  const popularSearches = [
    "Burger",
    "Pizza",
    "Healthy",
    "Chicken",
    "Vegetarian",
  ];

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    addToRecentSearches(searchQuery);
  };

  const handleItemClick = (item: SearchItem) => {
    addToRecentSearches(item.name);
    onItemSelect(item);
    onOpenChange(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("freshbite-recent-searches");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-brand-orange" />
            Search Menu
          </DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="px-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for dishes, categories..."
              className="pl-10 pr-4 h-12 text-lg border-2 focus:border-brand-orange"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="px-6">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-2 pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "flex-shrink-0",
                    selectedCategory === category
                      ? "bg-brand-orange hover:bg-brand-orange-dark"
                      : "hover:border-brand-orange hover:text-brand-orange",
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Separator />

        <ScrollArea className="flex-1 px-6">
          {/* Show suggestions when no query */}
          {!query.trim() && (
            <div className="space-y-6 pb-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Recent Searches
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearRecentSearches}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Clear
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search) => (
                      <Badge
                        key={search}
                        variant="secondary"
                        className="cursor-pointer hover:bg-brand-orange hover:text-white transition-colors"
                        onClick={() => handleSearch(search)}
                      >
                        {search}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search) => (
                    <Badge
                      key={search}
                      variant="outline"
                      className="cursor-pointer hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-colors"
                      onClick={() => handleSearch(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search Results */}
          {query.trim() && (
            <div className="space-y-4 pb-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {filteredItems.length} result
                  {filteredItems.length !== 1 ? "s" : ""} found
                </p>
              </div>

              {filteredItems.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600">
                    Try searching for something else or browse our categories
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleItemClick(item)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {item.name}
                          </h4>
                          {item.isPopular && (
                            <Badge className="bg-brand-red text-white text-xs">
                              Popular
                            </Badge>
                          )}
                          {item.isVegetarian && (
                            <Badge className="bg-brand-green text-white text-xs">
                              Vegetarian
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-semibold text-brand-orange">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
