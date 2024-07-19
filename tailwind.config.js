/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".rotate-y-3-142": {
          transform: "rotateY(3.142rad)",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
