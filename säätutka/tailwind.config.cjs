/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "#f8f9fa",
        white: "ffffff",
      },
    },
  },
  plugins: [],
};
