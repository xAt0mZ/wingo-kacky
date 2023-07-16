/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: '#544FD9',
          blue: '#0E0574',
          dark: '#0D1046',
        },
        gray: {
          dark: '#8D8FB2',
          medium: '#DBDCEC',
          light: '#EEEDFB',
          gold: '#F4F4F4',
        },
        gold: '#BFAA82',
        brown: {
          dark: '#4F4F4F',
          light: '#898989',
        },
        green: {
          DEFAULT: '#5AC8A0',
        },
        black: {},
        white: {
          DEFAULT: '#FFFFFF',
          neutral: '#F8F8F8',
        },
      },
      gridTemplateRows: {
        '3-auto': 'repeat(3, auto)',
        '5-auto': 'repeat(5, auto)',
      },
      gridTemplateColumns: {
        '3-auto': 'repeat(3, auto)',
        '7-auto': 'repeat(7, auto)',
      },
    },
  },
  plugins: [],
};
