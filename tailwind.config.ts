import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        background: {
          DEFAULT: "#030806",
          secondary: "#050B08",
          elevated: "#0B1710",
          card: "#101D15",
        },
        brand: {
          primary: "#00F58A",
          secondary: "#00C878",
          deep: "#0B3824",
          border: "#204D35",
        },
        text: {
          primary: "#F3F8F5",
          secondary: "#A5B7AA",
          muted: "#72877A",
        },
        status: {
          error: "#FF6474",
          warning: "#F6B75C",
          info: "#65B9FF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "neon-sm": "0 0 18px -4px rgba(0, 245, 138, 0.25)",
        "neon-md": "0 0 32px -6px rgba(0, 245, 138, 0.32)",
        "card-elevated": "0 20px 45px -20px rgba(0, 0, 0, 0.75)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(32, 77, 53, 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(32, 77, 53, 0.14) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(0, 245, 138, 0.12), rgba(11, 56, 36, 0.05) 45%, transparent 75%)",
      },
    },
  },
  plugins: [],
};

export default config;
