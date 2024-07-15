/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textShadow: {
        default: "2px 2px 4px rgba(255, 0, 0, 0.5)",
      },
    },
    variants: {
      textShadow: ['responsive', 'hover', 'focus'],
    },
    plugins: [
      function ({ addUtilities }) {
        const newUtilities = {
          '.text-shadow-default': {
            textShadow: '2px 2px 4px rgba(255, 0, 0, 0.5)',
            
          }
        }
        addUtilities(newUtilities, ['responsive, hover']);
      },
    ],
  },
};
