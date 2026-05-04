import { getPricingOptionById, siteConfig } from "@/lib/site-config";

export type OrderRecord = {
  orderId: string;
  dateTime: string;
  customerName: string;
  phoneNumber: string;
  emailAddress: string;
  exactLocation: string;
  productName: string;
  pricingOptionId: string;
  quantity: number;
  pricePerPiece: number;
  totalPrice: number;
  paymentMethod: "Cash On Delivery";
  orderStatus: "New Order";
  notes: string;
};

export function createOrderId() {
  return `DRY-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function createOrderRecord(input: {
  customerName: string;
  phoneNumber: string;
  emailAddress: string;
  exactLocation: string;
  pricingOptionId: string;
  quantity: number;
}) {
  const option = getPricingOptionById(input.pricingOptionId);
  const pricePerPiece = option.unitPrice;
  const totalPrice = option.unitPrice * input.quantity;

  return {
    orderId: createOrderId(),
    dateTime: new Date().toLocaleString("en-NP", {
      dateStyle: "medium",
      timeStyle: "short"
    }),
    customerName: input.customerName,
    phoneNumber: input.phoneNumber,
    emailAddress: input.emailAddress,
    exactLocation: input.exactLocation,
    productName: `${siteConfig.productName} - ${option.shortLabel}`,
    pricingOptionId: option.id,
    quantity: input.quantity,
    pricePerPiece,
    totalPrice,
    paymentMethod: "Cash On Delivery" as const,
    orderStatus: "New Order" as const,
    notes: ""
  };
}

export function spreadsheetHeaders() {
  return [
    "Order ID",
    "Date & Time",
    "Customer Name",
    "Phone Number",
    "Email Address",
    "Exact Location",
    "Product Name",
    "Quantity",
    "Price Per Piece",
    "Total Price",
    "Payment Method",
    "Order Status",
    "Notes"
  ];
}

export function orderToSheetRow(order: OrderRecord) {
  return [
    order.orderId,
    order.dateTime,
    order.customerName,
    order.phoneNumber,
    order.emailAddress,
    order.exactLocation,
    order.productName,
    String(order.quantity),
    String(order.pricePerPiece),
    String(order.totalPrice),
    order.paymentMethod,
    order.orderStatus,
    order.notes
  ];
}
