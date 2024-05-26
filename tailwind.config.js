/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
         primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"},
        white: "white",
        none: "none",
        "1. open":"#62b9e5",
        high:"#62e5df",
        low:"#d282f0",
        close: "#6462e5",
        volume: "#b9e17d"
      },
      borderWidth:{
        1: "1px",
      },
      fontFamily:{
        quicksand:["Quicksand", "sans-serif"],
      },
      gridTemplateRows:{
        7: "repeat(7, minmac(0,1fr))",
        8: "repeat(8, minmac(0,1fr))"
      }
    },
  },
  plugins: [],
}