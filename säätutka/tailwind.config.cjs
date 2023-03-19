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
        text: "#70757A",
        text2: "#262626",
        blue: "#E5F6FD",
      },
      fontSize: {
        "3xl": "23pt",
        "2xl": "19pt",
        "4xl": "26pt",
        xl: "15pt",
        sm: "10pt",
      },
      width: {
        20: "69px",
      },
    },
  },
  plugins: [],
};
