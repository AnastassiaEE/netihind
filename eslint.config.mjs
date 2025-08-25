import tailwind from 'eslint-plugin-tailwindcss';

export default [
  ...tailwind.configs['flat/recommended'],
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
      tailwindcss: {
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
];
