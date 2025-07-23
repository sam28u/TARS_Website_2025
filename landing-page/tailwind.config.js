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
        'custom-dark-gradient-tars':
          'linear-gradient(to top right, #010006 20%, #110C1D 50%, #150D2B, #1A0E39 70%, #1E0E43 80%, #200560)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        slideUp: 'slideUp 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}
