export type PricingOption = {
  id: string;
  label: string;
  shortLabel: string;
  weight: string;
  description: string;
  unitPrice: number;
  compareAtPrice?: number;
  highlight?: string;
};

export const siteConfig = {
  productName: "Dry Mango",
  brandName: "Dryora",
  receiverEmail: "mail@merodigitalhub.com",
  replyToEmail: "mail@merodigitalhub.com",
  heroHeadline: "Freshly dried mango that tastes like sunshine in every bite",
  heroSubheadline:
    "A naturally sweet, fiber-rich snack made from ripe mangoes and delivered with Cash on Delivery convenience.",
  description:
    "Enjoy the rich, tropical taste of premium dried mango made from handpicked, ripe mangoes and carefully dried to lock in flavor and nutrients. No artificial flavors. No added junk. Just pure, naturally sweet goodness.",
  trustPoints: [
    "Cash on Delivery available",
    "Fast delivery inside Kathmandu",
    "Friendly customer support",
    "Easy order process"
  ],
  benefits: [
    {
      title: "Naturally Sweet Snack",
      description:
        "A clean, satisfying alternative to processed sweets when you want something delicious without the junk."
    },
    {
      title: "Rich in Nutrients",
      description:
        "Packed with vitamins like A and C to support immunity, skin health, and daily wellness."
    },
    {
      title: "Quick Energy Boost",
      description:
        "Natural sugars help you stay energized during busy days, workouts, study sessions, or travel."
    },
    {
      title: "High in Fiber",
      description:
        "Supports digestion and helps you stay fuller longer, so you snack with more intention."
    },
    {
      title: "No Artificial Additives",
      description:
        "Made from real mangoes without artificial colors, flavors, or preservatives."
    },
    {
      title: "Portable and Mess-Free",
      description:
        "Easy to carry in your bag and enjoy anytime without prep or cleanup."
    }
  ],
  testimonials: [
    {
      quote:
        "I ordered one pack just to try, but the taste is amazing. Naturally sweet and chewy. Already ordered the 3-pack bundle!",
      author: "Ramesh K."
    },
    {
      quote:
        "I was trying to avoid junk food, and this helped a lot. It satisfies my sweet cravings without guilt.",
      author: "Sita P."
    },
    {
      quote:
        "You can really tell it's made from real mangoes. No weird taste, just pure flavor. My kids love it too.",
      author: "Anita R."
    },
    {
      quote:
        "The 2-pack offer is a great deal. Tastes premium and stays fresh. Definitely buying again.",
      author: "Bikash T."
    },
    {
      quote:
        "I keep reaching for it instead of chips. Super convenient and delicious!",
      author: "Sunita M."
    }
  ],
  faqs: [
    {
      question: "Is your dried mango 100% natural?",
      answer:
        "Yes. Our dried mango is made from carefully selected ripe mangoes with no artificial colors, flavors, or preservatives."
    },
    {
      question: "Does it contain added sugar?",
      answer: "No added sugar. The sweetness comes naturally from the mango itself."
    },
    {
      question: "How should I store the dried mango?",
      answer:
        "Keep it in a cool, dry place and seal the pack properly after opening to maintain freshness."
    },
    {
      question: "What is the shelf life?",
      answer: "Our dried mango typically lasts up to 6 to 9 months when stored properly."
    },
    {
      question: "Is it suitable for kids?",
      answer:
        "Absolutely. It is a healthy, tasty snack that kids love and a better option than many processed sweets."
    },
    {
      question: "Do you offer Cash on Delivery?",
      answer: "Yes, we offer Cash on Delivery for your convenience."
    },
    {
      question: "How long does delivery take?",
      answer: "Delivery usually takes 2 to 5 days, depending on your location."
    }
  ],
  images: [
    {
      src: "/products/dryora-mango-brand.png",
      alt: "Dryora dried mango hero image"
    },
    {
      src: "/products/dryora-mango-brand.png",
      alt: "Fresh sliced mango"
    },
    {
      src: "/products/dryora-tree.png",
      alt: "Mangoes on a tree"
    },
    {
      src: "/products/dryora-dried.png",
      alt: "Premium dried mango pieces"
    }
  ],
  reels: [] as string[],
  pricingOptions: [
    {
      id: "regular",
      label: "Regular Price",
      shortLabel: "250g Pack",
      weight: "250g",
      description: "Perfect for first-time buyers",
      unitPrice: 399
    },
    {
      id: "double-pack",
      label: "Best Value Offer",
      shortLabel: "2 Packs - 500g",
      weight: "500g",
      description: "Save Rs. 99",
      unitPrice: 699,
      compareAtPrice: 798,
      highlight: "Most Popular"
    },
    {
      id: "bundle",
      label: "Bundle Deal",
      shortLabel: "3 Packs - 750g",
      weight: "750g",
      description: "Save Rs. 198 and best for families",
      unitPrice: 999,
      compareAtPrice: 1197,
      highlight: "Best Family Deal"
    },
    {
      id: "premium",
      label: "Premium Dried Mango",
      shortLabel: "Special Pack",
      weight: "Special Pack",
      description: "Extra quality, extra taste",
      unitPrice: 499,
      highlight: "Premium Pick"
    }
  ] satisfies PricingOption[]
};

export function getPricingOptionById(id?: string) {
  return siteConfig.pricingOptions.find((option) => option.id === id) ?? siteConfig.pricingOptions[0];
}
