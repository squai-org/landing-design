import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, '.'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    // `*.test.ts` files use node:test and run with `tsx --test` (see package.json).
    include: ['src/**/*.spec.{ts,tsx}'],
    css: false,
  },
});
