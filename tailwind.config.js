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

      },
      backgroundImage: {
        paper: "url('/ordinox-bg.webp')",
        ordinox:"url('/ordinox.webp')",
        "gradient-radial": "radial-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))",
      },
    },
  },
  plugins: [],
}