module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '50': 'repeat(50, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}