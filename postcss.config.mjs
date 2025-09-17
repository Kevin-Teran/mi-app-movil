/**
 * @file postcss.config.mjs
 * @route postcss.config.mjs
 * @description Configuración de PostCSS para Next.js con Tailwind CSS v4.
 * @author kevin mariano
 * @version 2.1.0
 * @since 1.0.0
 * @copyright SENA 2025
 */

 const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};

export default config;