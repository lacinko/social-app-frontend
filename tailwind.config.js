/** @type {import('tailwindcss').Config} */
const { createFluidValue } = require("./src/lib/createFluidValue");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        // NOTE: These are just example names and values
        "fluid-xs": createFluidValue(12, 14),
        "fluid-sm": createFluidValue(14, 16),
        "fluid-base": createFluidValue(16, 18),
        "fluid-lg": createFluidValue(18, 20),
        "fluid-xl": createFluidValue(20, 24),
        "fluid-2xl": createFluidValue(24, 28),
        "fluid-3xl": createFluidValue(28, 32),
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        "open-menu": {
          "0%": { height: 0, opacity: 0 },
          "80%": { height: "10rem", opacity: 0.8 },
          "100%": { height: "8rem", opacity: 1 },
        },
        "close-menu": {
          "0%": { height: "8rem", opacity: 1 },
          "80%": { height: "10rem", opacity: 0.8 },
          "100%": { height: 0, opacity: 0 },
        },

        "open-dropdown": {
          "0%": { opacity: 0, transform: "scaleX(0.9) scaleY(0.9)" },
          "80%": { opacity: 0.8, transform: "scaleX(1.1) scaleY(1.1)" },
          "100%": {
            opacity: 1,
            transform: "scaleX(1) scaleY(1)",
          },
        },
        "close-dropdown": {
          "0%": { opacity: 1, transform: "scaleX(1) scaleY(1)" },
          "80%": { opacity: 0.8, transform: "scaleX(1.1) scaleY(1.1)" },
          "100%": {
            opacity: 0,
            transform: "scaleX(0.9) scaleY(0.9)",
          },
        },
      },
      animation: {
        "open-menu": "open-menu 0.2s ease-in-out forwards",
        "close-menu": "close-menu 0.2s ease-in-out forwards",
        "open-dropdown": "open-dropdown 0.1 ease-out forwards",
        "close-dropdown": "close-dropdown 0.1 ease-in forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
