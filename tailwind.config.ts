import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0F1B2E",
        energy: "#FF6B4A",
        bloom: "#FF7EB8",
        mint: "#2EC4B6",
        sand: "#F7F3EF",
        stone: "#D7DBE0",
        "surface-muted": "#F1ECE6",
        "fg-muted": "#5A6473",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        pill: "999px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(15,27,46,0.06)",
        md: "0 8px 24px rgba(15,27,46,0.08)",
        lg: "0 20px 48px rgba(15,27,46,0.10)",
        "glow-accent": "0 12px 32px rgba(255,107,74,0.25)",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.2, 0.7, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
