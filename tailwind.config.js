/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fira: ["var(--font-fira)"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: ".5rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
        screens: {
          DEFAULT: {
            min: "1000px",
          },
        },
      },
      colors: {
        primary: "#FF6C55",
      },
    },
  },
  plugins: [],
};
