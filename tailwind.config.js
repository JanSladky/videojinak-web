/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { opacity: "0.2", transform: "translateX(-100%)" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "0.2", transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
