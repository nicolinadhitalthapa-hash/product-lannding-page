"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getPricingOptionById, siteConfig } from "@/lib/site-config";
import { formatCurrency } from "@/lib/utils";
import { QuantitySelector } from "@/components/quantity-selector";

type Props = {
  optionId?: string;
  initialQuantity?: number;
};

type FormErrors = Partial<Record<"customerName" | "phoneNumber" | "emailAddress" | "exactLocation" | "form", string>>;

export function CheckoutForm({ optionId, initialQuantity = 1 }: Props) {
  const router = useRouter();
  const [selectedOptionId, setSelectedOptionId] = useState(optionId ?? siteConfig.pricingOptions[0].id);
  const [quantity, setQuantity] = useState(Math.max(1, initialQuantity));
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [exactLocation, setExactLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const selectedOption = getPricingOptionById(selectedOptionId);
  const totalPrice = selectedOption.unitPrice * quantity;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customerName,
        phoneNumber,
        emailAddress,
        exactLocation,
        productName: `${siteConfig.productName} - ${selectedOption.shortLabel}`,
        pricingOptionId: selectedOption.id,
        quantity,
        pricePerPiece: selectedOption.unitPrice,
        totalPrice
      })
    });

    const payload = await response.json();

    if (!response.ok) {
      if (payload?.fieldErrors) {
        setErrors(payload.fieldErrors);
      } else {
        setErrors({ form: payload?.error ?? "Something went wrong while submitting your order." });
      }
      setIsSubmitting(false);
      return;
    }

    const params = new URLSearchParams({
      orderId: payload.order.orderId,
      product: payload.order.productName,
      quantity: String(payload.order.quantity),
      total: String(payload.order.totalPrice),
      emailStatus: payload.emailSent === false ? "pending" : "sent"
    });

    router.push(`/thank-you?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Full Name</label>
          <input
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-leaf"
            placeholder="Enter your full name"
          />
          {errors.customerName ? <p className="mt-2 text-sm text-red-600">{errors.customerName}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>
          <input
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-leaf"
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber ? <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p> : null}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
          <input
            type="email"
            value={emailAddress}
            onChange={(event) => setEmailAddress(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-leaf"
            placeholder="Enter your email address"
          />
          {errors.emailAddress ? <p className="mt-2 text-sm text-red-600">{errors.emailAddress}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Exact Location</label>
          <input
            value={exactLocation}
            onChange={(event) => setExactLocation(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-leaf"
            placeholder="Kindly share your exact location"
          />
          {errors.exactLocation ? <p className="mt-2 text-sm text-red-600">{errors.exactLocation}</p> : null}
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-cream/80 p-5">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Pack Selection</label>
            <select
              value={selectedOptionId}
              onChange={(event) => setSelectedOptionId(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-leaf"
            >
              {siteConfig.pricingOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label} - {option.shortLabel} - {formatCurrency(option.unitPrice)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Quantity</label>
            <QuantitySelector value={quantity} onChange={setQuantity} />
          </div>
        </div>

        <div className="mt-5 grid gap-4 rounded-[1.5rem] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryItem label="Product Name" value={`${siteConfig.productName} - ${selectedOption.shortLabel}`} />
          <SummaryItem label="Price Per Piece" value={formatCurrency(selectedOption.unitPrice)} />
          <SummaryItem label="Quantity" value={String(quantity)} />
          <SummaryItem label="Total Price" value={formatCurrency(totalPrice)} />
        </div>
      </div>

      {errors.form ? <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errors.form}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="cta-button w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Submitting Order..." : "Order Now"}
      </button>
    </form>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm font-semibold text-leaf">{value}</div>
    </div>
  );
}
