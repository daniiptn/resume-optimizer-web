// postcss.config.js
export default {
  plugins: {
    "@tailwindcss/postcss": {},   // ← use this instead of tailwindcss: {}
    autoprefixer: {},
  },
};
