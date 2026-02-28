import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
//import pluginReact from "eslint-plugin-react";
import jsonPlugin from '@eslint/json';
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import tailwind from 'eslint-plugin-tailwindcss';
import { defineConfig } from "eslint/config";
import path from "path";

const jsonPluginTyped = jsonPlugin as any;

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
  tseslint.configs.recommended,
  //pluginReact.configs.flat.recommended,
  { files: ["**/*.json"], plugins: { json: jsonPluginTyped }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.jsonc"], plugins: { json: jsonPluginTyped }, language: "json/jsonc", extends: ["json/recommended"] },
  { files: ["**/*.json5"], plugins: { json: jsonPluginTyped }, language: "json/json5", extends: ["json/recommended"] },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
  tailwind.configs['flat/recommended'],
  {
    rules: {
      // Tailwind
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/no-contradicting-classname': 'error',
      // JS
      eqeqeq: ['error', 'always'],
      'prefer-destructuring': ['error', { object: true, array: false }],
    },
    settings: {
      react: { version: "detect" },
      tailwindcss: {
        config: path.join(__dirname, './tailwind.config.ts'),
        callees: ['classNames', 'classnames', 'clsx', 'twMerge', 'tv'],
        cssFiles: ['**/*.css', '**/*.scss'],
        tags: ['styled'],
        classRegex: '\\bclass(Name)?=\\s*[\'"`]([^\'"`]+)[\'"`]',
      },
    },
  },
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
]);