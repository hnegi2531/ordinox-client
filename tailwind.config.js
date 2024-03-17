/** @type {import('tailwindcss').Config} */
// const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#EAD3AB',
          50: '#FEFEFD',
          100: '#FAF5EC',
          200: '#F2E4CC',
          300: '#EAD3AB',
          400: '#DFBB7E',
          500: '#D4A451',
          600: '#BD8A2F',
          700: '#906924',
          800: '#644819',
          900: '#37280E',
          950: '#201708'
        },
        secondryText: "#D9D9D9",
        tableBorder: "#636363",
        roundBorder: "#FF3945",
        popUp: "#1D1E20",
        textWarning: "#FF5555",
        verified: "#00FFA3"
      },
      backgroundImage: {
        paper: "url('/ordinox-bg.webp')",
        ordinox:"url('/ordinox.webp')",
        ordinoxScore: "url('/ordinox_score.webp')",
        "gradient-radial": "radial-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))",
      },
      fontFamily: {
        poppins: "Poppins, sans-serif",
        raleway: "Raleway, sans-serif",
        spacemono: "Space Mono, sans-serif",
        mplus2: "'M PLUS 2', sans-serif"
      },
    },
  },
  plugins: [],
}