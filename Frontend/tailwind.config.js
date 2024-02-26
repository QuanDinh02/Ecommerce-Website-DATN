/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screen: {
      sm: '480px',
      md: '768px',
      lg: '1280px',
      xl: '1440px'
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      }
    }
  },
  plugins: [],
}