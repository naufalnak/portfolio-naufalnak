/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        mono: ["DM Mono", "monospace"],
        display: ["Syne", "sans-serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#0a0a0a",
          50: "#f5f5f5",
          100: "#e8e8e8",
          200: "#d0d0d0",
          300: "#a0a0a0",
          400: "#707070",
          500: "#505050",
          600: "#303030",
          700: "#1a1a1a",
          800: "#111111",
          900: "#0a0a0a",
        },
        accent: "#e8390e",
      },
      letterSpacing: {
        widest2: "0.25em",
        widest3: "0.4em",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
