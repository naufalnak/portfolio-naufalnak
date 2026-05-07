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
        navy: "#0D1B2A",
        sky: "#2FA4D7",
        mist: "#8BA8C4",
        cloud: "#F8FAFC",
        ink: {
          DEFAULT: "#0D1B2A",
          50: "#F8FAFC",
          100: "#E4EDF5",
          200: "#C8D9E8",
          300: "#8BA8C4",
          400: "#6A8FAE",
          500: "#4A6E8E",
          600: "#2A4E6E",
          700: "#0D1B2A",
          800: "#0D1B2A",
          900: "#0D1B2A",
        },
        accent: "#2FA4D7",
      },
      letterSpacing: {
        widest2: "0.25em",
        widest3: "0.4em",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
