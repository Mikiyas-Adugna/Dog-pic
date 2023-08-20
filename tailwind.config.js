/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        darkBlue: "hsl(217, 28%, 15%)",
        darkBlue1: "hsl(218, 28%, 13%)",
        darkBlue2: "hsl(216, 53%, 9%)",
        darkBlue3: "hsl(219, 30%, 18%)",
        accentCyan: "hsl(176, 68%, 64%)",
        accentBlue: "hsl(198, 60%, 50%)",
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }
        md: "1100px",

        lg: "1390px",
        // => @media (min-width: 768px) { ... }
      },
    },
  },
  plugins: [],
};
