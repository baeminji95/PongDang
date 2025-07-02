/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'main': "url('/public/img/main.jpg')",
      }
    },
  },
  plugins: [],
}

