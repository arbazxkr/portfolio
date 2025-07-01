/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      zIndex: {
        '45': '45',
        '50': '50',
      },
    },
  },
  plugins: [],
}

