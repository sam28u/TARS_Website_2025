/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kode: ["Kode Mono", "monospace"],
      },
      backgroundImage: {
        "custom-dark-gradient-tars":
          "linear-gradient(to top right, #010006 20%, #110C1D 50%, #150D2B, #1A0E39 70%, #1E0E43 80%, #200560)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(50px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "fade-up": "fade-up 1s ease-out both",
      },
    },
  },
  plugins: [],
};
