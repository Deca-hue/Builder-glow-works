import React from "react";
import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  X,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Navigation from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency, calculateTotal, applyDiscount } from "@/lib/cart";
import { useState } from "react";

const Cart = () => {
  const { items, updateQuantity, removeItem, itemCount } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    discount: number;
    isValid: boolean;
    message: string;
  }>({ discount: 0, isValid: false, message: "" });

  const calculations = calculateTotal(items);
  const isEmpty = items.length === 0;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleApplyDiscount = () => {
    const result = applyDiscount(calculations.subtotal, discountCode);
    setAppliedDiscount(result);
  };

  const finalTotal = calculations.total - appliedDiscount.discount;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <section className="section-padding">
        <div className="container max-w-6xl">
          <div className="mb-8">
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
            </p>
          </div>

          {isEmpty ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added any delicious items to your cart
                yet. Browse our menu to get started!
              </p>
              <Link to="/menu">
                <Button className="btn-primary">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Browse Menu
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {item.category}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-gray-400 hover:text-red-500"
                              onClick={() => removeItem(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity - 1,
                                  )
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-12 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity + 1,
                                  )
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <div className="text-right">
                              <p className="font-semibold text-lg text-brand-orange">
                                {formatCurrency(item.price * item.quantity)}
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatCurrency(item.price)} each
                              </p>
                            </div>
                          </div>

                          {item.specialInstructions && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-700">
                                <strong>Special instructions:</strong>{" "}
                                {item.specialInstructions}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-center pt-4">
                  <Link to="/menu">
                    <Button
                      variant="outline"
                      className="text-brand-orange border-brand-orange hover:bg-brand-orange hover:text-white"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Discount Code */}
                    <div className="space-y-2">
                      <Label htmlFor="discount">Discount Code</Label>
                      <div className="flex gap-2">
                        <Input
                          id="discount"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          placeholder="Enter code"
                        />
                        <Button
                          variant="outline"
                          onClick={handleApplyDiscount}
                          disabled={!discountCode.trim()}
                        >
                          Apply
                        </Button>
                      </div>
                      {appliedDiscount.message && (
                        <p
                          className={`text-sm ${
                            appliedDiscount.isValid
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {appliedDiscount.message}
                        </p>
                      )}
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal ({itemCount} items)</span>
                        <span>{formatCurrency(calculations.subtotal)}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Delivery Fee</span>
                        <span
                          className={
                            calculations.deliveryFee === 0
                              ? "text-green-600"
                              : ""
                          }
                        >
                          {calculations.deliveryFee === 0
                            ? "FREE"
                            : formatCurrency(calculations.deliveryFee)}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Service Fee</span>
                        <span>{formatCurrency(calculations.serviceFee)}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Tax</span>
                        <span>{formatCurrency(calculations.tax)}</span>
                      </div>

                      {appliedDiscount.isValid &&
                        appliedDiscount.discount > 0 && (
                          <div className="flex justify-between text-sm text-green-600">
                            <span>Discount</span>
                            <span>
                              -{formatCurrency(appliedDiscount.discount)}
                            </span>
                          </div>
                        )}

                      <Separator />

                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="text-brand-orange">
                          {formatCurrency(finalTotal)}
                        </span>
                      </div>
                    </div>

                    {calculations.deliveryFee > 0 && (
                      <div className="bg-brand-cream p-3 rounded-lg">
                        <p className="text-sm text-gray-700 text-center">
                          💡 Add {formatCurrency(25 - calculations.subtotal)}{" "}
                          more for free delivery
                        </p>
                      </div>
                    )}

                    <Link to="/checkout" className="block">
                      <Button className="w-full btn-primary group">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>

                    <div className="text-center text-sm text-gray-600">
                      <p>🔒 Secure checkout with 256-bit SSL encryption</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
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

export default Cart;
