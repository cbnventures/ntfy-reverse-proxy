import {
  dxCodeStyle,
  dxIgnore,
  langJavascript,
  langTypescript,
  novaRules,
  runtimeCloudflareWorkers,
  runtimeNode,
} from '@cbnventures/nova/presets/eslint';

/**
 * ESLint Configuration.
 *
 * Defines the full set of custom lint rules and presets used
 * across all source files in this package.
 *
 * @since 0.11.0
 */
export default [
  ...dxIgnore,
  ...dxCodeStyle,
  ...langJavascript,
  ...langTypescript,
  ...runtimeCloudflareWorkers.map((config) => ({
    ...config,
    files: [
      'src/worker/**/*.ts',
      'src/types/worker/**/*.d.ts',
      'src/tests/worker/**/*.ts',
    ],
  })),
  ...runtimeNode.map((config) => ({
    ...config,
    ignores: [
      ...(config['ignores'] ?? []),
      'src/worker/**',
      'src/types/worker/**',
      'src/tests/worker/**',
    ],
  })),
  {
    name: 'custom-ignores',
    ignores: ['./worker-configuration.d.ts'],
  },
  {
    name: 'worker-console-override',
    files: ['src/worker/**/*.ts'],
    rules: {
      'no-console': [
        'error',
        {
          allow: ['info'],
        },
      ],
    },
  },
  {
    name: 'custom-tsconfig',
    files: [
      '**/*.cts',
      '**/*.mts',
      '**/*.ts',
      '**/*.tsx',
    ],
    languageOptions: {
      parserOptions: {
        project: [
          './tsconfig.cli.json',
          './tsconfig.config.json',
          './tsconfig.tests.json',
          './tsconfig.worker.json',
        ],
      },
    },
  },
  ...novaRules,
  {
    name: 'custom-nova-rules',
    files: [
      '**/*.cjs',
      '**/*.cts',
      '**/*.js',
      '**/*.jsx',
      '**/*.mjs',
      '**/*.mts',
      '**/*.ts',
      '**/*.tsx',
    ],
    rules: {
      '@cbnventures/nova/no-regex-literals': [
        'error',
        {
          ignoreFiles: [],
          regexFile: './src/lib/regex.ts',
        },
      ],
      '@cbnventures/nova/no-shared-type-import': [
        'error',
        {
          ignoreFiles: [],
          sharedFiles: ['./src/types/shared.d.ts'],
        },
      ],
      '@cbnventures/nova/require-jsdoc-body': [
        'error',
        {
          ignoreFiles: [
            './eslint.config.mts',
            './vitest.config.mts',
          ],
          maxLines: 3,
          maxWidth: 90,
          minLines: 2,
          skipDirectories: [
            'styles',
            'tests',
            'types',
          ],
        },
      ],
      '@cbnventures/nova/require-jsdoc-hierarchy': [
        'error',
        {
          anchorDirectories: [
            'src',
            'utils',
          ],
          ignoreFiles: [
            './eslint.config.mts',
            './vitest.config.mts',
            './vitest.setup.ts',
          ],
          knownNames: {},
          stripDirectories: ['types'],
        },
      ],
      '@cbnventures/nova/require-jsdoc-presence': [
        'error',
        {
          ignoreFiles: [
            './eslint.config.mts',
            './vitest.config.mts',
          ],
          skipDirectories: [
            'tests',
            'types',
          ],
        },
      ],
    },
  },
];
