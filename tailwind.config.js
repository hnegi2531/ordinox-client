/** @type {import('tailwindcss').Config} */
// const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#EAD3AB",
          50: "#FEFEFD",
          100: "#FAF5EC",
          200: "#F2E4CC",
          300: "#EAD3AB",
          400: "#DFBB7E",
          500: "#D4A451",
          600: "#BD8A2F",
          700: "#906924",
          800: "#644819",
          900: "#37280E",
          950: "#201708",
        },
        secondryText: "#D9D9D9",
        tableBorder: "#636363",
        roundBorder: "#FF3945",
        popUp: "#1D1E20",
        textWarning: "#FF5555",
        verified: "#00FFA3",
        discordbtn: "#757DF0"
      },
      backgroundImage: {
        paper: "url('/bg-home.webp')",
        ordinox: "url('/ordinox.webp')",
        noiseImage: "url('/noise.png')",
        ordinoxScore: "url('/ordinox_score.webp')",
        ordinoxSwap: "url('/swap-bg.webp')",
        "gradient-radial":
          "radial-gradient(rgba(0, 0, 0, 0.8), rgba(0,0,0,0.6), rgba(0, 0, 0, 0.8))",
      },
      fontFamily: {
        poppins: "Poppins, sans-serif",
        raleway: "Raleway, sans-serif",
        spacemono: "Space Mono, sans-serif",
        mplus2: "'M PLUS 2', sans-serif",
      },
    },
  },
  plugins: [],
};
