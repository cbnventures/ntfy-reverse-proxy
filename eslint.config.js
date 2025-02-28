import javascriptPlugin from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

/**
 * ESLint config.
 *
 * @type {import('eslint').Linter.Config[]}
 *
 * @since 1.0.0
 */
const eslintConfig = [
  {
    name: 'ignored-files',
    ignores: [
      'src/generated/**/*',
    ],
  },
  {
    name: 'all-rules',
    files: [
      '**/*.js',
      '**/*.mjs',
      '**/*.cjs',
      '**/*.ts',
      '**/*.mts',
      '**/*.cts',
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        NodeJS: 'readonly',
      },
    },
    plugins: {
      '@stylistic': stylisticPlugin,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...javascriptPlugin.configs.recommended.rules,
      ...stylisticPlugin.configs['recommended-flat'].rules,
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/member-delimiter-style': ['error', {
        singleline: {
          requireLast: true,
        },
      }],
      '@stylistic/multiline-ternary': ['off'],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      'import/newline-after-import': ['error', {
        count: 1,
      }],
      'import/no-named-as-default': ['off'],
      'import/no-named-as-default-member': ['off'],
      'import/order': ['error', {
        alphabetize: {
          order: 'asc',
        },
      }],
      'no-console': ['warn', {
        allow: [
          'error',
          'info',
          'warn',
        ],
      }],
      'no-irregular-whitespace': ['error', {
        skipComments: true,
      }],
      'object-curly-newline': ['error', {
        ObjectExpression: {
          minProperties: 4,
          multiline: true,
          consistent: true,
        },
        ObjectPattern: {
          minProperties: 4,
          multiline: true,
          consistent: true,
        },
        ImportDeclaration: {
          minProperties: 4,
          multiline: true,
          consistent: true,
        },
      }],
    },
  },
  {
    name: 'typescript-rules',
    files: [
      '**/*.ts',
      '**/*.mts',
      '**/*.cts',
    ],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-unused-vars': ['error'],
      'no-unused-vars': ['off'],
    },
  },
  {
    name: 'typescript-declaration-rules',
    files: [
      '**/*.d.ts',
    ],
    rules: {
      'no-var': ['off'],
    },
  },
];

export default eslintConfig;
