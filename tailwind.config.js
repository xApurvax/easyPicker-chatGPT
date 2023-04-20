/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#544bb9',
        secondary: '#EDF2F7',
        secondaryYellow: '#ffe84d',
        textGray: '#737373',
        secondaryLayout: '#e5e5e5',
        primaryBorder: '#aab2b8',
        secondaryBorder: '#f8f8f8',
        textBlack: '#141414',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateY(2px)' },
          '50%': { transform: 'translateY(2px)' },
        },
      },
      animation: {
        wiggle: 'wiggle 200ms ease-in-out',
      },
    },
    screens: {
      ms: '320px',
      // => @media (min-width: 320px) { ... }
      sm: '576px',
      // => @media (min-width: 576px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/aspect-ratio'),
  ],
  variants: {
    scrollbar: ['rounded'],
  },
}
