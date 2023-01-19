/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "translateY(2px)" },
          "50%": { transform: "translateY(2px)" },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
      },
    },
    screens: {
      'ms': '320px',
      // => @media (min-width: 320px) { ... }
      'sm': '576px',
      // => @media (min-width: 576px) { ... }
      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded']
  },
};
