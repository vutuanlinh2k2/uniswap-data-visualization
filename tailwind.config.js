/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(25,27,31)",
        secondary: "rgb(31, 33, 39)",
        "white-text": "rgb(255, 255, 255)",
        "green-text": "rgb(39, 174, 96)",
        "red-text": "rgb(253, 64, 64)",
        "grey-primary-text": "rgb(195, 197, 203)",
        "grey-secondary-text": "rgb(108, 114, 132)",
        blue: "rgb(33,114,228)",
        pink: "rgb(252, 7, 125)",
      },
    },
  },
  plugins: [],
}
