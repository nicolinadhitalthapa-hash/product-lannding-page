import { z } from "zod";

export const orderSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  emailAddress: z.string().email("Please enter a valid email address"),
  exactLocation: z.string().min(1, "Location is required"),
  productName: z.string().min(1, "Product name is required"),
  pricingOptionId: z.string().min(1, "Pricing option is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  pricePerPiece: z.number().positive("Price per piece must be valid"),
  totalPrice: z.number().positive("Total price must be valid")
});

export type OrderInput = z.infer<typeof orderSchema>;
