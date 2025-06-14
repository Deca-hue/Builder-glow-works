import React from "react";
import { ArrowRight, Clock, Shield, Truck } from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";

const Hero = () => {
  return (
    <section className="relative gradient-bg overflow-hidden">
      <div className="container section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <Badge className="bg-brand-green text-white font-medium px-4 py-2">
                🍃 Fresh & Healthy
              </Badge>

              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight">
                Delicious Food
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-red">
                  Delivered Fast
                </span>
              </h1>

              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Experience the finest flavors with our carefully crafted meals.
                Fresh ingredients, bold flavors, and lightning-fast delivery to
                your doorstep.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-primary group">
                Order Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
              >
                View Menu
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full shadow-soft flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-brand-orange" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Fast Delivery
                </h4>
                <p className="text-sm text-gray-600">30 min or less</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full shadow-soft flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-brand-green" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Fresh Quality
                </h4>
                <p className="text-sm text-gray-600">100% fresh</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full shadow-soft flex items-center justify-center mx-auto mb-3">
                  <Truck className="h-6 w-6 text-brand-red" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Free Shipping
                </h4>
                <p className="text-sm text-gray-600">On orders $25+</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=600&fit=crop&crop=faces,center"
                alt="Delicious food bowl"
                className="w-full h-auto rounded-2xl shadow-soft-lg"
              />

              {/* Floating Stats */}
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-soft p-4 animate-fade-in">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-brand-orange to-brand-red rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">4.9</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Rating</p>
                    <p className="text-sm text-gray-600">2.5k+ reviews</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-soft p-4 animate-fade-in">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">15</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Minutes</p>
                    <p className="text-sm text-gray-600">Avg delivery</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-brand-orange to-brand-red opacity-10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-green opacity-10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMTA3LCA1MywgMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
    </section>
  );
};

export default Hero;
