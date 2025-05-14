const eslint = require('eslint');
const tsEslint = require('@typescript-eslint/eslint-plugin');
const angularEslint = require('@angular-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // To parse TypeScript files
  parserOptions: {
    project: './tsconfig.json', // Point to your tsconfig.json file
    createDefaultProgram: true,
  },
  plugins: ['@angular-eslint', '@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@angular-eslint/recommended',
    'plugin:@angular-eslint/template/process-inline-templates',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
    '@angular-eslint/directive-selector': [
      'error',
      {
        type: 'attribute',
        prefix: 'app',
        style: 'camelCase',
      },
    ],
    '@angular-eslint/component-selector': [
      'error',
      {
        type: 'element',
        prefix: 'app',
        style: 'kebab-case',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.html'],
      extends: [
        'plugin:@angular-eslint/template/recommended',
        'plugin:@angular-eslint/template/accessibility',
      ],
      rules: {},
    },
  ],
};
