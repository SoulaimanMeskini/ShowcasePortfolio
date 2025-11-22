/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#1d1d1d',
          text: '#ffffff',
          primary: '#6f02c6',
        },
      },
    },
  },
  plugins: [],
};
