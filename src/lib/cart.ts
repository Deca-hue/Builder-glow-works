import { CartItem } from "@/contexts/CartContext";

// Cart calculation utilities
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function calculateTax(subtotal: number, taxRate: number = 0.08): number {
  return subtotal * taxRate;
}

export function calculateDeliveryFee(
  subtotal: number,
  deliveryThreshold: number = 25,
): number {
  return subtotal >= deliveryThreshold ? 0 : 3.99;
}

export function calculateServiceFee(subtotal: number): number {
  return Math.max(subtotal * 0.03, 1.99); // 3% service fee, minimum $1.99
}

export function calculateTip(subtotal: number, tipPercentage: number): number {
  return subtotal * (tipPercentage / 100);
}

export function calculateTotal(
  items: CartItem[],
  tipPercentage: number = 0,
  taxRate: number = 0.08,
): {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  serviceFee: number;
  tip: number;
  total: number;
} {
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal, taxRate);
  const deliveryFee = calculateDeliveryFee(subtotal);
  const serviceFee = calculateServiceFee(subtotal);
  const tip = calculateTip(subtotal, tipPercentage);
  const total = subtotal + tax + deliveryFee + serviceFee + tip;

  return {
    subtotal,
    tax,
    deliveryFee,
    serviceFee,
    tip,
    total,
  };
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// Cart validation
export function validateCartItem(item: any): item is CartItem {
  return (
    typeof item === "object" &&
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.price === "number" &&
    typeof item.image === "string" &&
    typeof item.quantity === "number" &&
    typeof item.category === "string" &&
    item.price > 0 &&
    item.quantity > 0
  );
}

export function validateCart(items: any[]): CartItem[] {
  return items.filter(validateCartItem);
}

// Generate order summary
export function generateOrderSummary(
  items: CartItem[],
  tipPercentage: number = 0,
): string {
  const calculations = calculateTotal(items, tipPercentage);

  let summary = `Order Summary:\n\n`;

  items.forEach((item) => {
    summary += `${item.quantity}x ${item.name} - ${formatCurrency(item.price * item.quantity)}\n`;
  });

  summary += `\n`;
  summary += `Subtotal: ${formatCurrency(calculations.subtotal)}\n`;
  summary += `Tax: ${formatCurrency(calculations.tax)}\n`;
  summary += `Delivery Fee: ${formatCurrency(calculations.deliveryFee)}\n`;
  summary += `Service Fee: ${formatCurrency(calculations.serviceFee)}\n`;

  if (calculations.tip > 0) {
    summary += `Tip: ${formatCurrency(calculations.tip)}\n`;
  }

  summary += `\nTotal: ${formatCurrency(calculations.total)}`;

  return summary;
}

// Estimate delivery time
export function estimateDeliveryTime(): {
  min: number;
  max: number;
  display: string;
} {
  // Base delivery time: 25-40 minutes
  const baseMin = 25;
  const baseMax = 40;

  // Add random factor to simulate real-world conditions
  const factor = Math.random() * 0.3; // 0-30% variation
  const min = Math.round(baseMin * (1 + factor));
  const max = Math.round(baseMax * (1 + factor));

  return {
    min,
    max,
    display: `${min}-${max} min`,
  };
}

// Generate order ID
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 9);
  return `FB-${timestamp}-${random}`.toUpperCase();
}

// Check if cart is empty
export function isCartEmpty(items: CartItem[]): boolean {
  return items.length === 0;
}

// Get cart item count
export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

// Find item in cart
export function findCartItem(
  items: CartItem[],
  itemId: string,
): CartItem | undefined {
  return items.find((item) => item.id === itemId);
}

// Get cart categories
export function getCartCategories(items: CartItem[]): string[] {
  return [...new Set(items.map((item) => item.category))];
}

// Apply discount
export function applyDiscount(
  subtotal: number,
  discountCode: string,
): { discount: number; isValid: boolean; message: string } {
  const discountCodes: Record<
    string,
    { percentage: number; minOrder: number; message: string }
  > = {
    WELCOME10: {
      percentage: 10,
      minOrder: 20,
      message: "10% off your first order!",
    },
    SAVE20: {
      percentage: 20,
      minOrder: 50,
      message: "20% off orders over $50!",
    },
    FREESHIP: { percentage: 0, minOrder: 0, message: "Free delivery!" },
    STUDENT15: {
      percentage: 15,
      minOrder: 25,
      message: "15% student discount!",
    },
  };

  const code = discountCodes[discountCode.toUpperCase()];

  if (!code) {
    return { discount: 0, isValid: false, message: "Invalid discount code" };
  }

  if (subtotal < code.minOrder) {
    return {
      discount: 0,
      isValid: false,
      message: `Minimum order of ${formatCurrency(code.minOrder)} required`,
    };
  }

  const discount = subtotal * (code.percentage / 100);

  return {
    discount,
    isValid: true,
    message: code.message,
  };
}

// Save cart to localStorage with encryption-like encoding
export function saveCartToStorage(items: CartItem[]): void {
  try {
    const encoded = btoa(JSON.stringify(items));
    localStorage.setItem("freshbite-cart", encoded);
  } catch (error) {
    console.error("Failed to save cart to storage:", error);
  }
}

// Load cart from localStorage
export function loadCartFromStorage(): CartItem[] {
  try {
    const encoded = localStorage.getItem("freshbite-cart");
    if (!encoded) return [];

    const items = JSON.parse(atob(encoded));
    return validateCart(items);
  } catch (error) {
    console.error("Failed to load cart from storage:", error);
    return [];
  }
}
