
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from "node:path"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/tests/**",
    ]
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});