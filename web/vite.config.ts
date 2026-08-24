import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import rsc from '@vitejs/plugin-rsc';
import { nitro } from 'nitro/vite';
import { defineConfig, loadEnv, lazyPlugins } from 'vite-plus';

import { enabledViewerSourcesSchema } from './src/sources/source-options';

const sourceFrameAncestors = {
  beatsaver: ['https://beatsaver.com'],
  scoresaber: ['https://scoresaber.com'],
  beatleader: ['https://beatleader.com', 'https://beatleader.xyz'],
};

export default defineConfig(({ mode }) => {
  const enabledSources = enabledViewerSourcesSchema.parse(loadEnv(mode, process.cwd(), 'VITE_').VITE_ENABLED_SOURCES);
  const securityHeaders = {
    'content-security-policy': `frame-ancestors 'self' ${enabledSources
      .flatMap((source) => sourceFrameAncestors[source])
      .join(' ')}`,
    'referrer-policy': 'strict-origin-when-cross-origin',
    'x-content-type-options': 'nosniff',
  };

  return {
    fmt: {
      singleQuote: true,
      trailingComma: 'all',
      printWidth: 120,
      tabWidth: 2,
      endOfLine: 'lf',
      sortImports: {
        internalPattern: ['@/'],
        customGroups: [
          {
            groupName: 'react-libs',
            elementNamePattern: ['react', 'react/**'],
          },
          {
            groupName: 'app-components',
            elementNamePattern: ['@/components/**'],
          },
        ],
        groups: [
          'side_effect',
          'react-libs',
          'builtin',
          'external',
          ['parent', 'sibling', 'index'],
          'app-components',
          'internal',
          'style',
          'unknown',
        ],
      },
      sortTailwindcss: {},
      ignorePatterns: [
        'node_modules/**',
        'public/environments/**',
        'src/routeTree.gen.ts',
        'src/modules/live/generated/**',
        'src/sources/beatsaver/generated/**',
        'src/sources/scoresaber/generated/**',
      ],
    },
    lint: {
      categories: {
        correctness: 'error',
      },
      options: {
        typeAware: true,
        typeCheck: true,
      },
      env: {
        browser: true,
        builtin: true,
      },
      ignorePatterns: [
        'src/routeTree.gen.ts',
        'src/modules/live/generated/**',
        'src/sources/beatsaver/generated/**',
        'src/sources/scoresaber/generated/**',
      ],
      rules: {
        'typescript/no-explicit-any': 'error',
        'typescript/no-non-null-assertion': 'error',
        'vite-plus/prefer-vite-plus-imports': 'error',
      },
      overrides: [
        {
          files: ['src/core/**/*.{ts,tsx}'],
          rules: {
            'no-restricted-imports': [
              'error',
              {
                patterns: [
                  {
                    group: ['@/app/**', '@/modules/**', '@/renderer/**', '@/sources/**'],
                    message: 'core modules cannot depend on app, source, renderer, or UI implementations',
                  },
                ],
              },
            ],
          },
        },
        {
          files: ['src/sources/**/*.{ts,tsx}'],
          rules: {
            'no-restricted-imports': [
              'error',
              {
                patterns: [
                  {
                    group: ['@/app/**', '@/modules/**', '@/renderer/**'],
                    message: 'source adapters cannot depend on renderer or UI implementations',
                  },
                ],
              },
            ],
          },
        },
        {
          files: ['src/renderer/**/*.{ts,tsx}'],
          rules: {
            'no-restricted-imports': [
              'error',
              {
                patterns: [
                  {
                    group: ['@/app/**', '@/modules/**', '@/sources/**'],
                    message: 'renderer modules cannot depend on source or UI implementations',
                  },
                ],
              },
            ],
          },
        },
      ],
      jsPlugins: [
        {
          name: 'vite-plus',
          specifier: 'vite-plus/oxlint-plugin',
        },
      ],
    },
    staged: {
      '*.{css,js,json,jsonc,jsx,md,ts,tsx,yaml,yml}': 'vp fmt --write',
      '*.{js,jsx,ts,tsx}': 'vp lint --fix',
    },
    test: {
      passWithNoTests: true,
    },
    plugins:
      mode === 'test'
        ? []
        : lazyPlugins(() => [
            tanstackStart({
              rsc: { enabled: true },
              prerender: { enabled: true, filter: (page) => page.path === '/' },
            }),
            nitro({
              preset: 'node-server',
              compressPublicAssets: { gzip: true, brotli: true },
              routeRules: {
                '/**': { headers: securityHeaders },
                '/assets/**': {
                  headers: { 'cache-control': 'public, max-age=31536000, immutable' },
                },
                '/environments/**': {
                  headers: { 'cache-control': 'public, max-age=3600, must-revalidate' },
                },
                '/environments/textures/**': {
                  headers: { 'cache-control': 'public, max-age=31536000, immutable' },
                },
                '/fonts/**': {
                  headers: { 'cache-control': 'public, max-age=31536000, immutable' },
                },
                '/twemoji/**': {
                  headers: { 'cache-control': 'public, max-age=31536000, immutable' },
                },
                '/health': { headers: { 'cache-control': 'no-store' } },
              },
            }),
            rsc(),
            viteReact(),
            tailwindcss(),
          ]),
    resolve: {
      tsconfigPaths: true,
    },
    ssr: {
      external: ['@resvg/resvg-js', 'zod'],
    },
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
    build: {
      minify: 'oxc',
      chunkSizeWarningLimit: 1024,
    },
  };
});
