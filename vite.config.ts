import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    server: {
      port: 1508
    },
    plugins: [
      svgr(),
      react(),
    ],
    build: {
      target: 'esnext',
      modulePreload: false,
      minify: false,
      cssCodeSplit: false,
    },
  }
})