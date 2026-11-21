/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-sky': '#38BDF8',
        'brand-black': '#111111',
        'brand-brown': '#5C4033',
        'brand-brown-dark': '#422D24',
        'brand-dark': '#222222',
        'brand-gray': '#666666',
        'brand-light': '#F8FAFC'
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        script: ['Caveat', 'Dancing Script', 'cursive'],
        serif: ['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
}
