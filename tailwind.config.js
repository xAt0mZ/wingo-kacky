const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: [],
  theme: {
    extend: {
      colors: {
        theme: {
          1: 'var(--theme-1)',
          2: 'var(--theme-2)',
          3: 'var(--theme-3)',
          4: 'var(--theme-4)',
          5: 'var(--theme-5)',
          6: 'var(--theme-6)',
          7: 'var(--theme-7)',
          8: 'var(--theme-8)',
        },
        green: {
          DEFAULT: 'var(--theme-green)',
        },
        red: {
          DEFAULT: 'var(--theme-red)',
        },
        gold: {
          DEFAULT: 'var(--theme-gold)',
        },
        'white-neutral': 'var(--theme-white-neutral)',
      },
      gridTemplateRows: {
        '3-auto': 'repeat(3, auto)',
        '5-auto': 'repeat(5, auto)',
      },
      gridTemplateColumns: {
        '3-auto': 'repeat(3, auto)',
        '7-auto': 'repeat(7, auto)',
      },
      backgroundImage: {
        explanation: "url('/img/explanation.webp')",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'bounce-right': {
          '0%, 100%': {
            transform: 'translateX(25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'bounce-left': {
          '0%, 100%': {
            transform: 'translateX(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s linear infinite',
        'bounce-right': 'bounce-right 3s infinite',
        'bounce-left': 'bounce-left 3s infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('dark', '&:is([data-theme="dark"] *)');
      addVariant('colorblind', '&:is([data-colorblind="true"] *)');
    }),
  ],
};
