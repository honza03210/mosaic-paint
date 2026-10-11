// ESLint (`npm run lint`): the recommended JavaScript and TypeScript rules. Types are checked by tsc, so the
// rules here need no type information and run fast.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', 'test-results/**', 'playwright-report/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // the code is loosely typed on purpose (tsconfig: not strict); the page's markup is the contract
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrors: 'none' }],
    },
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: { globals: { ...globals.browser } },
  },
  {
    // build script, unit tests, slicer check: Node
    files: ['*.mjs', '*.js', 'tests/**/*.mjs', 'tests/**/*.js'],
    languageOptions: { globals: { ...globals.node } },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  {
    // end-to-end tests and benchmarks: Node, plus the code they run in the page (the apps' MZ / RZ)
    files: ['tests/e2e/**/*.js', 'tests/perf/**/*.js', 'playwright.config.js', 'sw.js'],
    languageOptions: { globals: { ...globals.node, ...globals.browser, ...globals.serviceworker, MZ: 'readonly', RZ: 'readonly', Geo: 'readonly', Colors: 'readonly', Store: 'readonly', PhotoTools: 'readonly', LayPlan: 'readonly', Vision: 'readonly', Pages: 'readonly', Snippets: 'readonly', Share: 'readonly' } },
  },
);
