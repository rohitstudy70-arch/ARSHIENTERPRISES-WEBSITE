/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0a0630",
        darkSection: "#140d5c",
        darkCard: "rgba(20, 12, 80, 0.65)",
        neonAmber: "#e3ab84",
        neonCyan: "#4bc0ff",
        neonMagenta: "#ff79e0",
        neonPurple: "#6b4bff",
      },
      fontFamily: {
        outfit: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        neonAmber: '0 0 25px rgba(227, 171, 132, 0.35)',
        neonCyan: '0 0 25px rgba(75, 192, 255, 0.35)',
        neonCard: '0 8px 32px rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
