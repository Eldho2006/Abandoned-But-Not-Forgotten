/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#030712',
          900: '#0b1120',
          800: '#151f38',
          700: '#1e293b',
        },
        space: {
          cyan: '#22d3ee',
          cyanDark: '#06b6d4',
        },
        mars: {
          light: '#fb923c',
          DEFAULT: '#f97316',
          dark: '#ea580c',
        },
      },
      maxWidth: {
        '65ch': '65ch',
      },
    },
  },
  plugins: [],
};
