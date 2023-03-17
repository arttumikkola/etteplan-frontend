/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Arial", "regular"],
      },
      colors: {
        gray: "#f8f9fa",
        white: "ffffff",
        border: "#e6e6e6",
      },
      fontSize: {
        "3xl": "23pt",
      },
    },
  },
  plugins: [],
};
