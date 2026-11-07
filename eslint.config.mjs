import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['.expo/**', 'node_modules/**', 'coverage/**', '.android-sdk/**', '.gradle-home/**', '.build-tools/**', '.appdata/**', '.localdata/**', '.pnpm-store/**', 'android/**', 'dist/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
);
