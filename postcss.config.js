import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
    plugins: [
      tailwindcss,  // Use the new Tailwind PostCSS plugin
      autoprefixer,
    ],
  }