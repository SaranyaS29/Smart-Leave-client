/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust based on your project structure
  ],

  theme: {
    extend: {
      fontFamily:{
        "pacific":["Pacifico",'sans-serif']
      }
    },
  },
  plugins: [],
}

