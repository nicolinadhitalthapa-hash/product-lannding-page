"use client";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export function QuantitySelector({ value, onChange }: Props) {
  return (
    <div className="inline-flex items-center rounded-full border border-leaf/15 bg-white p-1 shadow-sm">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-leaf transition hover:bg-leaf/5"
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <div className="min-w-12 text-center text-sm font-semibold text-slate-900">{value}</div>
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-leaf transition hover:bg-leaf/5"
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
