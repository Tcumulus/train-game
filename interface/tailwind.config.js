module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '64': 'repeat(64, minmax(0, 1fr))',
        '128': 'repeat(128, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}