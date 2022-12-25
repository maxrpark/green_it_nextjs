/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green-main": "#86EFAC",
        "light-gray": "#D9D9D9",
      },
      borderRadius: {
        main: "10px",
      },
      backgroundImage: {
        "hero-bg": "url('/img/hero/hero_bg.jpg')",
      },
      gridTemplateColumns: {
        "product-layout": "1fr 3fr",
      },
    },
    screens: {
      sm: "576px",
      md: "960px",
      lg: "1200px",
    },
    container: {
      screens: {
        sm: "600px",
        md: "728px",
        lg: "1200px",
        xl: "984px",
        "2xl": "984px",
      },
    },
  },
  plugins: [],
};
