import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fff7ea",
        leaf: "#0f4d38",
        leafDark: "#0b3628",
        mango: "#f28c28",
        mangoSoft: "#ffb45f",
        sand: "#f7e3be"
      },
      boxShadow: {
        glow: "0 20px 60px rgba(15,77,56,0.16)"
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at top left, rgba(242,140,40,0.24), transparent 35%), radial-gradient(circle at bottom right, rgba(15,77,56,0.2), transparent 30%)"
      }
    }
  },
  plugins: []
};

export default config;
