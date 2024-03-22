/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkModeEle: '#2B3945',
        darkModeText: '#111517'
      },
      screens: {
        tablet: [
          { 'max': '1000px' },
        ],
        tabletSmall: [
          { 'max': '850px' },
        ],
        middleSect:[
          {'max': '680px'}
        ],
        singleCol: [
          { 'max': '600px' },
        ],
        phoneLg: [
          { 'max': '480px' },
        ],
        phoneMd: [
          { 'max': '420px' },
        ],
        phoneSm: [
          { 'max': '360px' }
        ]
      }
    },
  },
  plugins: [],
}