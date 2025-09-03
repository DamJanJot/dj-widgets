// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// import { fileURLToPath, URL } from 'node:url'

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
      
//     },
//   },
//   server: { port: 5173 },
//   preview: { port: 4173 },

  
// })



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
})
