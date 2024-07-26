
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        shake: 'shake 0.6s ease-in-out 0.25s 1',
        slideUp: 'slideUp 1.3s ease-in-out 0.25s 1'
      },
      keyframes: {
        shake: {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translateX(-10px)",
          },
          "20%, 40%, 60%, 80%": {
            transform: "translateX(10px)",
          },
        },
        slideUp: {
          "0%": {
            transform: "translateY(0)",
          },
          "30%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(-14)",
          }
        }
      }
    },
  },
  plugins: [],
}

