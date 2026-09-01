import next from 'eslint-config-next';

/**
 * ESLint flat config.
 *
 * `eslint-config-next` v16 ships a native flat config array, so it is spread
 * directly. The FlatCompat shim used with v15 is no longer needed and fails
 * against v16.
 *
 * Unused variables and imports are caught by `noUnusedLocals` in tsconfig
 * rather than duplicated here, so `npm run typecheck` is the single place that
 * reports them.
 */
const config = [
  { ignores: ['.next/**', 'node_modules/**', 'out/**', 'next-env.d.ts'] },
  ...next,
];

export default config;
