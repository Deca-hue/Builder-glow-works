import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  Phone,
  Mail,
  HelpCircle,
  Truck,
  Shield,
  Star,
  CreditCard,
  Users,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { Separator } from "./separator";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

interface QuickLinkSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  badge?: string;
  content: React.ReactNode;
}

const QuickLinks = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(),
  );

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const quickLinkSections: QuickLinkSection[] = [
    {
      id: "delivery-info",
      title: "Delivery Information",
      icon: <Truck className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-brand-orange mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">Delivery Hours</h4>
                <p className="text-sm text-gray-600">
                  Monday - Sunday: 10:00 AM - 11:00 PM
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-brand-green mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">Delivery Zone</h4>
                <p className="text-sm text-gray-600">
                  Within 5 miles of downtown area
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900">Delivery Fees</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• FREE delivery on orders $25+</p>
              <p>• $3.99 delivery fee on orders under $25</p>
              <p>• Average delivery time: 25-40 minutes</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "faq",
      title: "Frequently Asked Questions",
      icon: <HelpCircle className="h-5 w-5" />,
      badge: "Popular",
      content: (
        <div className="space-y-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                How do I track my order?
              </h4>
              <p className="text-sm text-gray-600">
                Once your order is confirmed, you'll receive a tracking link via
                SMS and email. You can also check your order status in the "My
                Orders" section of your account.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Can I modify my order after placing it?
              </h4>
              <p className="text-sm text-gray-600">
                You can modify your order within 5 minutes of placing it by
                calling our support team. After preparation begins,
                modifications may not be possible.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h4>
              <p className="text-sm text-gray-600">
                We accept all major credit cards, debit cards, PayPal, Apple
                Pay, Google Pay, and cash on delivery in select areas.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Do you offer vegetarian/vegan options?
              </h4>
              <p className="text-sm text-gray-600">
                Yes! We have a dedicated section for vegetarian and vegan
                dishes. Look for the green "Vegetarian" badges on menu items.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "contact-support",
      title: "Contact & Support",
      icon: <MessageCircle className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-orange" />
                <div>
                  <h4 className="font-semibold text-gray-900">Phone Support</h4>
                  <p className="text-sm text-gray-600">(555) 123-4567</p>
                  <p className="text-xs text-gray-500">Available 24/7</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand-green" />
                <div>
                  <h4 className="font-semibold text-gray-900">Email Support</h4>
                  <p className="text-sm text-gray-600">help@freshbite.com</p>
                  <p className="text-xs text-gray-500">
                    Response within 2 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-brand-orange" />
                <div>
                  <h4 className="font-semibold text-gray-900">Live Chat</h4>
                  <p className="text-sm text-gray-600">Available on website</p>
                  <p className="text-xs text-gray-500">
                    Monday - Friday, 9 AM - 9 PM
                  </p>
                </div>
              </div>

              <Button className="w-full btn-primary" size="sm">
                Start Live Chat
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "about-quality",
      title: "Quality & Safety",
      icon: <Shield className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="h-6 w-6 text-brand-green" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Fresh Ingredients
              </h4>
              <p className="text-xs text-gray-600">
                Sourced locally and delivered fresh daily
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="h-6 w-6 text-brand-orange" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Quality Certified
              </h4>
              <p className="text-xs text-gray-600">
                FDA approved kitchen and food safety standards
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6 text-brand-red" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Expert Chefs</h4>
              <p className="text-xs text-gray-600">
                Professional culinary team with 10+ years experience
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Our Certifications
            </h4>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="border-brand-green text-brand-green"
              >
                USDA Organic
              </Badge>
              <Badge
                variant="outline"
                className="border-brand-orange text-brand-orange"
              >
                FDA Approved
              </Badge>
              <Badge
                variant="outline"
                className="border-brand-red text-brand-red"
              >
                ServSafe Certified
              </Badge>
              <Badge
                variant="outline"
                className="border-gray-500 text-gray-700"
              >
                ISO 22000
              </Badge>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "payment-info",
      title: "Payment & Pricing",
      icon: <CreditCard className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Accepted Payment Methods
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-3 border rounded-lg">
                <CreditCard className="h-6 w-6 mx-auto mb-1 text-gray-600" />
                <p className="text-xs text-gray-600">Credit Cards</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <Phone className="h-6 w-6 mx-auto mb-1 text-gray-600" />
                <p className="text-xs text-gray-600">Mobile Pay</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <Shield className="h-6 w-6 mx-auto mb-1 text-gray-600" />
                <p className="text-xs text-gray-600">PayPal</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <MapPin className="h-6 w-6 mx-auto mb-1 text-gray-600" />
                <p className="text-xs text-gray-600">Cash on Delivery</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Pricing Information
            </h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• All prices include preparation and packaging</p>
              <p>• Tax calculated at checkout based on delivery location</p>
              <p>• Service fee: 3% of order total (minimum $1.99)</p>
              <p>• Optional tip can be added at checkout</p>
              <p>• Group orders (5+ people) may have additional fees</p>
            </div>
          </div>

          <div className="bg-brand-cream p-3 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">💡 Pro Tip</h4>
            <p className="text-sm text-gray-600">
              Save money by ordering $25+ for free delivery and joining our
              loyalty program for exclusive discounts!
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-gray-900 mb-2">
          Quick Information
        </h2>
        <p className="text-gray-600">
          Everything you need to know about ordering from FreshBite
        </p>
      </div>

      <div className="grid gap-4">
        {quickLinkSections.map((section) => {
          const isExpanded = expandedSections.has(section.id);

          return (
            <Card key={section.id} className="overflow-hidden">
              <Button
                variant="ghost"
                className="w-full p-0 h-auto"
                onClick={() => toggleSection(section.id)}
              >
                <CardContent className="w-full p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-brand-orange">{section.icon}</div>
                      <h3 className="font-semibold text-gray-900 text-left">
                        {section.title}
                      </h3>
                      {section.badge && (
                        <Badge className="bg-brand-red text-white text-xs">
                          {section.badge}
                        </Badge>
                      )}
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </CardContent>
              </Button>

              {isExpanded && (
                <div className="border-t">
                  <CardContent className="p-4 pt-4 animate-fade-in">
                    {section.content}
                  </CardContent>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLinks;
