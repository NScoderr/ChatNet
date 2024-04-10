/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary: '#30002E',
        chat1: '#260026',
        chat2: '#30001E',
      }
    },
  },
  plugins: [],
}

