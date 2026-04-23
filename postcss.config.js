// postcss.config.js — PostCSS configuration
// PostCSS processes the CSS files before they reach the browser
// Tailwind and Autoprefixer are the two processors used here

module.exports = {
  plugins: {
    tailwindcss: {},   // Converts Tailwind class names into actual CSS
    autoprefixer: {},  // Automatically adds browser vendor prefixes (e.g. -webkit-)
  },
}
