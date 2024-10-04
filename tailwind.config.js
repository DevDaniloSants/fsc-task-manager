/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        brand: {
          'dark-blue': '#35383E',
          primary: '#00ADB5',
          'dark-gray': '#818181',
          'light-gray': '#E5E5E5',
          'text-gray': '#9A9C9F',
          white: '#FFFFFF',
          background: '#f8f8f8',
          process: '#FFAA04',
          danger: '#EF4444',
          border: '#E5E5E5',
        },
      },
    },
  },
  plugins: [],
};
