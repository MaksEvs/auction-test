import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: './src/shared/config/tests/setup-tests.ts',
      clearMocks: true,
      restoreMocks: true,
      css: false,
    },
  }),
);
