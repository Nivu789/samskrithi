/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          darkest: '#3D1F0A',
          dark:    '#5C3820',
          mid:     '#6B3A1F',
          DEFAULT: '#9B6B47',
          light:   '#B8875F',
        },
        gold: {
          DEFAULT: '#C49A2E',
          light:   '#E8C656',
          dim:     '#A07E20',
        },
        cream: {
          light:   '#FAF5EC',
          DEFAULT: '#F2E6CE',
          dark:    '#E8D5B7',
          muted:   '#D9C4A0',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        dm:       ['var(--font-dm)',       'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
