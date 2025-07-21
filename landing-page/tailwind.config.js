/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kode: ['"Kode Mono"'],
      },
      
       backgroundImage: {
        'custom-dark-gradient-tars': 'linear-gradient(to top right, #010006 20%, #110C1D 50%, #150D2B, #1A0E39 70%, #1E0E43 80%, #200560)',
    },
  },
  plugins: [],
  }
}