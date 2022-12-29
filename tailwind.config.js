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
      boxShadow: {
        "my-shadow": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
        "my-shadow-two":
          "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
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
