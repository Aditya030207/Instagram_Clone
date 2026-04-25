/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.{jsx,js,html}",
    "./src/**/*.{jsx,js}",
  ],
  theme: {
    extend: {
      spacing: {
        '85': '21.25rem', // 340px
        '110': '27.5rem',  // 440px
        '130': '32.5rem',  // 520px
      }
    },
  },
  plugins: [],
}
