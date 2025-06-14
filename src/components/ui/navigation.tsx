import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Search,
  LogOut,
  Settings,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./button";
import { Badge } from "./badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import CartDrawer from "./cart-drawer";
import SearchDialog from "./search-dialog";
import AuthDialog from "./auth-dialog";
import { cn } from "@/lib/utils";

// Sample menu items for search - in a real app, this would come from an API
const searchItems = [
  {
    id: "1",
    name: "Gourmet Burger Deluxe",
    description:
      "Juicy beef patty with premium toppings, fresh lettuce, and our signature sauce",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    rating: 4.8,
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
    category: "Appetizers",
    isSpicy: true,
  },
  // Add more items as needed
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const location = useLocation();

  const { itemCount, addItem } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSearchItemSelect = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      // If logged in, show user menu in dropdown
      return;
    } else {
      setIsAuthOpen(true);
    }
  };

  const getUserInitials = (firstName?: string, lastName?: string) => {
    if (!firstName || !lastName) return "U";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <>
      <nav className="bg-white shadow-soft sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-brand-orange to-brand-red rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="font-heading font-bold text-xl lg:text-2xl text-gray-900">
                FreshBite
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "font-medium transition-colors duration-200",
                    isActive(item.path)
                      ? "text-brand-orange"
                      : "text-gray-600 hover:text-brand-orange",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-brand-orange"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>

              <CartDrawer>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-brand-orange relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-brand-red text-xs p-0 flex items-center justify-center">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </CartDrawer>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={user?.firstName} />
                        <AvatarFallback className="bg-brand-orange text-white">
                          {getUserInitials(user?.firstName, user?.lastName)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-brand-orange"
                  onClick={handleAuthAction}
                >
                  <User className="h-5 w-5" />
                </Button>
              )}

              <Button className="btn-primary">Order Now</Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-brand-orange"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>

              <CartDrawer>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-brand-orange relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-brand-red text-xs p-0 flex items-center justify-center">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </CartDrawer>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-brand-orange"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                      isActive(item.path)
                        ? "text-brand-orange bg-brand-cream"
                        : "text-gray-600 hover:text-brand-orange hover:bg-gray-50",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <div className="space-y-3 px-3">
                    {isAuthenticated ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={user?.avatar}
                              alt={user?.firstName}
                            />
                            <AvatarFallback className="bg-brand-orange text-white">
                              {getUserInitials(user?.firstName, user?.lastName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">
                              {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          setIsAuthOpen(true);
                          setIsMenuOpen(false);
                        }}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    )}
                    <Button className="btn-primary w-full">Order Now</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Search Dialog */}
      <SearchDialog
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        items={searchItems}
        onItemSelect={handleSearchItemSelect}
      />

      {/* Auth Dialog */}
      <AuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </>
  );
};

export default Navigation;
