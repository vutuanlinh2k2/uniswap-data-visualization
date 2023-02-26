/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(25,27,31)",
        secondary: "rgb(31, 33, 39)",
        white: "rgb(255, 255, 255)",
        green: "rgb(39, 174, 96)",
        red: "rgb(253, 64, 64)",
        "grey-primary": "rgb(195, 197, 203)",
        "grey-secondary": "rgb(108, 114, 132)",
        "grey-tertiary": "rgb(64,68,79)",
        blue: "rgb(33,114,228)",
        pink: "rgb(252, 7, 125)",
      },
    },
  },
  plugins: [],
}
