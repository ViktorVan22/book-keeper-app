import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postCssPxToRem from 'postcss-pxtorem'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base: "/book-keeper-website/",
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'dashesOnly'
    },
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.5,
          propList: ['*']
        })
      ]
    }
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx"],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'utils': path.resolve(__dirname, 'src/utils')
    }
  }
})
