/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#0B0F14',
          dark: '#080C10',
        },
        surface: {
          DEFAULT: '#121821',
          alt: '#161F2B',
        },
        border: {
          DEFAULT: '#222B37',
          hover: '#313D4D',
        },
        ivory: {
          DEFAULT: '#EDE8DC',
          dim: '#DCD6C8',
        },
        muted: {
          DEFAULT: '#9AA3AE',
        },
        brass: {
          DEFAULT: '#C9A96E',
          hover: '#D8BC84',
          dark: '#A8874E',
        },
        terracotta: {
          DEFAULT: '#C97B5A',
          hover: '#D88E6F',
          dark: '#AB6142',
        },
        silver: {
          DEFAULT: '#B8BEC6',
          hover: '#CCD2DA',
          dark: '#9FA6AF',
        },
      },
      maxWidth: {
        '65ch': '65ch',
      },
    },
  },
  plugins: [],
};
