// Tailwind CSS v4: use the new dedicated PostCSS plugin package
// We keep this single JS config (removed the parallel .mjs file) so Next.js/Turbopack
// doesn't pick up the legacy config that referenced `tailwindcss` directly.
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
