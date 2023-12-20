module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
  },
  plugins: ['prettier', 'simple-import-sort'],
  extends: ['eslint:recommended'],
  rules: {
    'prettier/prettier': 2,
    'simple-import-sort/imports': 2,
    'simple-import-sort/exports': 2,
    'max-classes-per-file': ['error', { ignoreExpressions: true, max: 1 }],
  },
  env: {
    node: true,
    es6: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 2,
        '@typescript-eslint/no-unused-vars': [
          2,
          { args: 'after-used', ignoreRestSiblings: true },
        ],
      },
    },
  ],
};
