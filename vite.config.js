import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  root: '.', // Points to the directory containing index.html
  build: {
    outDir: 'dist', // Output directory for production build
  },
   plugins: [react()],
});
