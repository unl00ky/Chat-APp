/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#121212",
        "secondary": "#181818",
        "light-blue": "#1e2226",
        "hover": "#282828",
      },
    },
  },
  plugins: [],
}