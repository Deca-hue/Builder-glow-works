import React from "react";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "./button";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { formatCurrency, calculateTotal } from "@/lib/cart";
import { Link } from "react-router-dom";

interface CartDrawerProps {
  children: React.ReactNode;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ children }) => {
  const { items, updateQuantity, removeItem, itemCount, closeCart } = useCart();

  const calculations = calculateTotal(items);
  const isEmpty = items.length === 0;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-brand-orange" />
            Your Cart ({itemCount} item{itemCount !== 1 ? "s" : ""})
          </SheetTitle>
        </SheetHeader>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-600 mb-6">
              Add some delicious items to get started!
            </p>
            <Link to="/menu" onClick={closeCart}>
              <Button className="btn-primary">Browse Menu</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold text-brand-orange">
                          {formatCurrency(item.price)}
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      {item.specialInstructions && (
                        <p className="text-xs text-gray-500 mt-1 italic">
                          Note: {item.specialInstructions}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-red-500"
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator className="my-4" />

            {/* Order Summary */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatCurrency(calculations.subtotal)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span
                  className={
                    calculations.deliveryFee === 0 ? "text-green-600" : ""
                  }
                >
                  {calculations.deliveryFee === 0
                    ? "FREE"
                    : formatCurrency(calculations.deliveryFee)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service Fee</span>
                <span>{formatCurrency(calculations.serviceFee)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span>{formatCurrency(calculations.tax)}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-brand-orange">
                  {formatCurrency(calculations.total)}
                </span>
              </div>

              {calculations.deliveryFee > 0 && (
                <p className="text-xs text-gray-600 text-center">
                  Add {formatCurrency(25 - calculations.subtotal)} more for free
                  delivery
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mt-6">
              <Link to="/checkout" onClick={closeCart} className="block">
                <Button className="w-full btn-primary group">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link to="/menu" onClick={closeCart} className="block">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
