import React, { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import FoodCard from "@/components/ui/food-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Burgers",
    "Pizza",
    "Healthy",
    "Asian",
    "Desserts",
    "Drinks",
  ];

  // Sample menu items
  const menuItems = [
    {
      id: "1",
      name: "Gourmet Burger Deluxe",
      description:
        "Juicy beef patty with premium toppings, fresh lettuce, and our signature sauce",
      price: 14.99,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      rating: 4.8,
      cookTime: "15-20 min",
      category: "Burgers",
      isPopular: true,
    },
    {
      id: "2",
      name: "Mediterranean Bowl",
      description:
        "Fresh quinoa bowl with grilled chicken, olives, feta cheese, and tahini dressing",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      rating: 4.9,
      cookTime: "10-15 min",
      category: "Healthy",
      isVegetarian: true,
    },
    {
      id: "3",
      name: "Spicy Chicken Wings",
      description:
        "Crispy wings tossed in our house buffalo sauce, served with ranch dip",
      price: 11.99,
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
      rating: 4.7,
      cookTime: "20-25 min",
      category: "Burgers",
      isSpicy: true,
    },
    {
      id: "4",
      name: "Margherita Pizza",
      description:
        "Classic Italian pizza with fresh mozzarella, basil, and tomato sauce",
      price: 16.99,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      rating: 4.6,
      cookTime: "25-30 min",
      category: "Pizza",
      isVegetarian: true,
    },
    {
      id: "5",
      name: "Chicken Teriyaki Bowl",
      description:
        "Grilled chicken with steamed rice, vegetables, and teriyaki glaze",
      price: 13.99,
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
      rating: 4.5,
      cookTime: "15-20 min",
      category: "Asian",
    },
    {
      id: "6",
      name: "Chocolate Lava Cake",
      description:
        "Warm chocolate cake with molten center, served with vanilla ice cream",
      price: 8.99,
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
      rating: 4.9,
      cookTime: "10-15 min",
      category: "Desserts",
    },
    {
      id: "7",
      name: "Caesar Salad",
      description:
        "Crisp romaine lettuce with parmesan cheese, croutons, and caesar dressing",
      price: 10.99,
      image:
        "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop",
      rating: 4.4,
      cookTime: "5-10 min",
      category: "Healthy",
      isVegetarian: true,
    },
    {
      id: "8",
      name: "Craft Lemonade",
      description:
        "Freshly squeezed lemonade with a hint of mint and sparkling water",
      price: 4.99,
      image:
        "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop",
      rating: 4.3,
      cookTime: "2-5 min",
      category: "Drinks",
    },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <section className="bg-white py-12">
        <div className="container">
          <div className="text-center mb-8">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-gray-900 mb-4">
              Our Menu
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our carefully crafted dishes made with the finest
              ingredients and bold flavors
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-brand-orange"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "transition-all duration-200",
                    activeCategory === category
                      ? "bg-brand-orange hover:bg-brand-orange-dark text-white"
                      : "border-gray-300 hover:border-brand-orange hover:text-brand-orange",
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-12">
        <div className="container">
          {/* Results Info */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-gray-600">
                Showing {filteredItems.length}{" "}
                {filteredItems.length === 1 ? "item" : "items"}
                {activeCategory !== "All" && (
                  <span>
                    {" "}
                    in{" "}
                    <Badge className="bg-brand-orange text-white ml-1">
                      {activeCategory}
                    </Badge>
                  </span>
                )}
              </p>
            </div>
            <Button
              variant="outline"
              className="hidden md:flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              More Filters
            </Button>
          </div>

          {/* Menu Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <FoodCard key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-16">
              <CardContent>
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  No items found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or browse different categories
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">
              Special Offers
            </h2>
            <p className="text-lg text-gray-600">
              Don't miss out on these limited-time deals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-r from-brand-orange to-brand-red text-white overflow-hidden">
              <CardContent className="p-8 relative">
                <div className="relative z-10">
                  <Badge className="bg-white text-brand-orange font-medium mb-4">
                    Limited Time
                  </Badge>
                  <h3 className="font-heading font-bold text-2xl mb-2">
                    Free Delivery
                  </h3>
                  <p className="text-lg opacity-90 mb-4">
                    On all orders over $25. Valid until end of month.
                  </p>
                  <Button className="bg-white text-brand-orange hover:bg-gray-100">
                    Order Now
                  </Button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                  <div className="w-full h-full bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-brand-green text-white overflow-hidden">
              <CardContent className="p-8 relative">
                <div className="relative z-10">
                  <Badge className="bg-white text-brand-green font-medium mb-4">
                    Today Only
                  </Badge>
                  <h3 className="font-heading font-bold text-2xl mb-2">
                    20% Off Healthy Menu
                  </h3>
                  <p className="text-lg opacity-90 mb-4">
                    Get 20% off all items from our healthy menu selection.
                  </p>
                  <Button className="bg-white text-brand-green hover:bg-gray-100">
                    Browse Healthy
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 w-24 h-24 opacity-20">
                  <div className="w-full h-full bg-white rounded-full transform -translate-x-12 translate-y-12"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer placeholder */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container text-center">
          <p className="text-gray-400">
            © 2024 FreshBite. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Menu;
