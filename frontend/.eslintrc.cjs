module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: { version: '18.2' },
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@pages', './src/pages'],
          ['@common', './src/components/common'],
          ['@script', './src/components/script'],
          ['@assets', './src/assets'],
        ],
      },
    },
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': ['error', { printWidth: 100 }],
    'import/no-unresolved': 0,
    'import/order': [
      'error',
      {
        'newlines-between': 'always', // Add a newline between different import groups
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '@pages/**',
            group: 'internal',
          },
          {
            pattern: '@common/**',
            group: 'internal',
          },
          {
            pattern: '@script/**',
            group: 'internal',
          },
          {
            pattern: '@assets/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal'],
      },
    ],
  },
};
