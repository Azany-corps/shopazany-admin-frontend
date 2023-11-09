/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "639px",
      // => @media (min-width: 0px and max-width: 639px) { ... }

      sm: "767px",
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: "1023px",
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: "1279px",
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      "2xl": "1536px",
      xsm: "639px",
      // => @media (min-width: 1536px) { ... }
      smm: "640px",
      // => @media (min-width: 1536px) { ... }
      mdm: "768px",
      // => @media (min-width: 1536px) { ... }
      lgm: "1024px",
      // => @media (min-width: 1536px) { ... }
      xlm: "1280px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        "brand-blue": "#1B7CFC",
        "brand-red": "#E51B48",
        "brand-light-blue": "#D9E9FF",
        "brand-bg": "#F5F5F5",
      },
      backgroundImage: {
        "login-bg": "url('../public/images/LoginBg.svg')",
      },
    },
  },
};
