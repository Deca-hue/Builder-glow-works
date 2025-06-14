import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Clock, Users, CheckCircle } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Hero from "@/components/ui/hero";
import FoodCard from "@/components/ui/food-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  // Sample featured menu items
  const featuredItems = [
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
      category: "Appetizers",
      isSpicy: true,
    },
  ];

  const categories = [
    { name: "Burgers", icon: "🍔", count: 12 },
    { name: "Pizza", icon: "🍕", count: 8 },
    { name: "Healthy", icon: "🥗", count: 15 },
    { name: "Asian", icon: "🍜", count: 10 },
    { name: "Desserts", icon: "🍰", count: 6 },
    { name: "Drinks", icon: "🥤", count: 12 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Featured Categories */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover your favorite dishes from our carefully curated menu
              categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="card-hover cursor-pointer text-center p-6"
              >
                <CardContent className="p-0">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.count} items
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="section-padding gradient-bg">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">
                Featured Dishes
              </h2>
              <p className="text-lg text-gray-600">
                Handpicked favorites loved by our customers
              </p>
            </div>
            <Link to="/menu">
              <Button
                variant="outline"
                className="mt-4 md:mt-0 border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
              >
                View Full Menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <FoodCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-brand-orange to-brand-red rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-3xl text-gray-900">
                  10K+
                </h3>
                <p className="text-gray-600">Happy Customers</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-3xl text-gray-900">
                  500+
                </h3>
                <p className="text-gray-600">Dishes Available</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-brand-orange to-brand-red rounded-full flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-3xl text-gray-900">
                  4.9
                </h3>
                <p className="text-gray-600">Average Rating</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-3xl text-gray-900">
                  15
                </h3>
                <p className="text-gray-600">Min Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding gradient-bg">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">
              Why Choose FreshBite?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering the best food experience with
              quality, speed, and care
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 card-hover">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-gradient-to-r from-brand-orange to-brand-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🍃</span>
                </div>
                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-4">
                  Fresh Ingredients
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We source only the freshest, locally-grown ingredients to
                  ensure every bite is packed with flavor and nutrition.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 card-hover">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-4">
                  Lightning Fast
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our optimized kitchen workflow and delivery network ensures
                  your food arrives hot and fresh in record time.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 card-hover">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-gradient-to-r from-brand-orange to-brand-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">👨‍🍳</span>
                </div>
                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-4">
                  Expert Chefs
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our team of skilled chefs brings years of culinary expertise
                  to create memorable dishes you'll love.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-white">
        <div className="container">
          <Card className="bg-gradient-to-r from-brand-orange to-brand-red text-white overflow-hidden">
            <CardContent className="p-12 text-center relative">
              <div className="relative z-10">
                <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                  Ready to Order?
                </h2>
                <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                  Join thousands of satisfied customers and experience the
                  FreshBite difference today. Delicious food is just a click
                  away!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-brand-orange hover:bg-gray-100 font-semibold"
                  >
                    Order Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-brand-orange"
                  >
                    Download App
                  </Button>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                <div className="w-full h-full bg-white rounded-full transform translate-x-32 -translate-y-32"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10">
                <div className="w-full h-full bg-white rounded-full transform -translate-x-24 translate-y-24"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-brand-orange to-brand-red rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
                <span className="font-heading font-bold text-xl">
                  FreshBite
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Delivering fresh, delicious meals to your doorstep since 2020.
                Quality ingredients, fast service, unforgettable flavors.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/menu"
                    className="hover:text-white transition-colors"
                  >
                    Menu
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Track Order
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>📞 (555) 123-4567</p>
                <p>✉️ hello@freshbite.com</p>
                <p>📍 123 Food Street, City, State 12345</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 FreshBite. All rights reserved. Made with ❤️ for food
              lovers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
