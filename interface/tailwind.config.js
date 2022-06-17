module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '128': 'repeat(128, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}