import React from "react";
import { Plus, Star, Clock } from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { cn } from "@/lib/utils";

interface FoodCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  cookTime: string;
  category: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  className?: string;
}

const FoodCard: React.FC<FoodCardProps> = ({
  id,
  name,
  description,
  price,
  image,
  rating,
  cookTime,
  category,
  isVegetarian = false,
  isSpicy = false,
  isPopular = false,
  className,
}) => {
  const handleAddToCart = () => {
    console.log("Adding to cart:", id);
    // This would typically dispatch to cart state management
  };

  return (
    <Card
      className={cn(
        "overflow-hidden card-hover group cursor-pointer",
        className,
      )}
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isPopular && (
            <Badge className="bg-brand-red text-white font-medium">
              Popular
            </Badge>
          )}
          {isVegetarian && (
            <Badge className="bg-brand-green text-white">Vegetarian</Badge>
          )}
          {isSpicy && (
            <Badge className="bg-orange-500 text-white">🌶️ Spicy</Badge>
          )}
        </div>

        {/* Add to Cart Button - Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <Button
            onClick={handleAddToCart}
            className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 btn-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-white text-brand-orange font-bold text-lg px-3 py-1">
            ${price.toFixed(2)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
            {category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>

        <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
          {name}
        </h3>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-muted-foreground text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>{cookTime}</span>
          </div>

          <Button
            onClick={handleAddToCart}
            size="sm"
            variant="outline"
            className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-colors"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
