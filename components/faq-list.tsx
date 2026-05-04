"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function FaqList() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {siteConfig.faqs.map((faq, index) => {
        const open = openIndex === index;
        return (
          <div key={faq.question} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-base font-semibold text-leaf">{faq.question}</span>
              <span className={cn("text-xl text-mango transition", open && "rotate-45")}>+</span>
            </button>
            {open ? <div className="px-5 pb-5 text-sm leading-7 text-slate-600">{faq.answer}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
