// import { defineConfig } from 'vite'
// import preact from '@preact/preset-vite'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [preact()],
// })

// vite.config.js
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  base: './'
});
