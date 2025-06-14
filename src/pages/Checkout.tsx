import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CreditCard,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  ArrowLeft,
  Plus,
  AlertCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import {
  formatCurrency,
  calculateTotal,
  generateOrderId,
  estimateDeliveryTime,
} from "@/lib/cart";

const checkoutSchema = z.object({
  // Delivery Information
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  address: z.string().min(1, "Address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(1, "ZIP code is required"),

  // Order preferences
  deliveryInstructions: z.string().optional(),
  paymentMethod: z.enum(["card", "paypal", "apple-pay", "cash"]),

  // Payment (simplified for demo)
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  cardName: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { items, clearCart, itemCount } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [tipPercentage, setTipPercentage] = useState(15);

  const calculations = calculateTotal(items, tipPercentage);
  const deliveryTime = estimateDeliveryTime();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      paymentMethod: "card",
      address: "",
      apartment: "",
      city: "",
      zipCode: "",
      deliveryInstructions: "",
    },
  });

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container section-padding text-center">
          <h1 className="font-heading font-bold text-3xl text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some items to your cart before checking out.
          </p>
          <Link to="/menu">
            <Button className="btn-primary">Browse Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);

    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const orderId = generateOrderId();

      // Clear cart and redirect to success
      clearCart();

      toast.success("Order placed successfully!", {
        description: `Order ${orderId} will be delivered in ${deliveryTime.display}`,
      });

      // In a real app, you'd redirect to an order confirmation page
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Failed to process order", {
        description: "Please try again or contact support",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethod = form.watch("paymentMethod");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <section className="section-padding">
        <div className="container max-w-6xl">
          <div className="mb-8">
            <Link
              to="/cart"
              className="inline-flex items-center text-brand-orange hover:text-brand-orange-dark mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-2">
              Checkout
            </h1>
            <p className="text-gray-600">
              Complete your order for {itemCount} item
              {itemCount !== 1 ? "s" : ""}
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Authentication Notice */}
                {!isAuthenticated && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Want to save your information?
                      <Link
                        to="/login"
                        className="text-brand-orange hover:underline ml-1"
                      >
                        Sign in
                      </Link>{" "}
                      or
                      <Link
                        to="/register"
                        className="text-brand-orange hover:underline ml-1"
                      >
                        create an account
                      </Link>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Delivery Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-brand-orange" />
                      Delivery Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          {...form.register("firstName")}
                          className={
                            form.formState.errors.firstName
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {form.formState.errors.firstName && (
                          <p className="text-sm text-red-600 mt-1">
                            {form.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          {...form.register("lastName")}
                          className={
                            form.formState.errors.lastName
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {form.formState.errors.lastName && (
                          <p className="text-sm text-red-600 mt-1">
                            {form.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          {...form.register("phone")}
                          className={
                            form.formState.errors.phone ? "border-red-500" : ""
                          }
                        />
                        {form.formState.errors.phone && (
                          <p className="text-sm text-red-600 mt-1">
                            {form.formState.errors.phone.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...form.register("email")}
                          className={
                            form.formState.errors.email ? "border-red-500" : ""
                          }
                        />
                        {form.formState.errors.email && (
                          <p className="text-sm text-red-600 mt-1">
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        placeholder="123 Main Street"
                        {...form.register("address")}
                        className={
                          form.formState.errors.address ? "border-red-500" : ""
                        }
                      />
                      {form.formState.errors.address && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.address.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="apartment">Apt/Unit</Label>
                        <Input
                          id="apartment"
                          placeholder="Apt 4B"
                          {...form.register("apartment")}
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          {...form.register("city")}
                          className={
                            form.formState.errors.city ? "border-red-500" : ""
                          }
                        />
                        {form.formState.errors.city && (
                          <p className="text-sm text-red-600 mt-1">
                            {form.formState.errors.city.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          placeholder="12345"
                          {...form.register("zipCode")}
                          className={
                            form.formState.errors.zipCode
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {form.formState.errors.zipCode && (
                          <p className="text-sm text-red-600 mt-1">
                            {form.formState.errors.zipCode.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="deliveryInstructions">
                        Delivery Instructions
                      </Label>
                      <Textarea
                        id="deliveryInstructions"
                        placeholder="e.g., Leave at front door, Ring doorbell, etc."
                        rows={3}
                        {...form.register("deliveryInstructions")}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-brand-orange" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) =>
                        form.setValue("paymentMethod", value as any)
                      }
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-5 w-5" />
                            <span>Credit/Debit Card</span>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label
                          htmlFor="paypal"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-blue-600 rounded"></div>
                            <span>PayPal</span>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="apple-pay" id="apple-pay" />
                        <Label
                          htmlFor="apple-pay"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-black rounded"></div>
                            <span>Apple Pay</span>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-green-600 rounded"></div>
                            <span>Cash on Delivery</span>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {/* Card Details (shown only for card payment) */}
                    {paymentMethod === "card" && (
                      <div className="mt-6 space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            {...form.register("cardNumber")}
                          />
                        </div>

                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            {...form.register("cardName")}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cardExpiry">Expiry Date</Label>
                            <Input
                              id="cardExpiry"
                              placeholder="MM/YY"
                              {...form.register("cardExpiry")}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardCvc">CVC</Label>
                            <Input
                              id="cardCvc"
                              placeholder="123"
                              {...form.register("cardCvc")}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-brand-orange" />
                      Order Summary
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Estimated delivery: {deliveryTime.display}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-xs text-gray-600">
                              {item.quantity}x {formatCurrency(item.price)}
                            </p>
                          </div>
                          <span className="font-semibold text-sm">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Tip Selection */}
                    <div>
                      <Label className="text-sm font-medium">Add Tip</Label>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {[10, 15, 20, 25].map((tip) => (
                          <Button
                            key={tip}
                            type="button"
                            size="sm"
                            variant={
                              tipPercentage === tip ? "default" : "outline"
                            }
                            onClick={() => setTipPercentage(tip)}
                            className={
                              tipPercentage === tip ? "bg-brand-orange" : ""
                            }
                          >
                            {tip}%
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatCurrency(calculations.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>
                          {calculations.deliveryFee === 0
                            ? "FREE"
                            : formatCurrency(calculations.deliveryFee)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service Fee</span>
                        <span>{formatCurrency(calculations.serviceFee)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>{formatCurrency(calculations.tax)}</span>
                      </div>
                      {calculations.tip > 0 && (
                        <div className="flex justify-between">
                          <span>Tip ({tipPercentage}%)</span>
                          <span>{formatCurrency(calculations.tip)}</span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-brand-orange">
                        {formatCurrency(calculations.total)}
                      </span>
                    </div>

                    <Button
                      type="submit"
                      className="w-full btn-primary"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                          Processing Order...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Place Order
                        </div>
                      )}
                    </Button>

                    <p className="text-xs text-gray-600 text-center">
                      🔒 Your payment information is encrypted and secure
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
