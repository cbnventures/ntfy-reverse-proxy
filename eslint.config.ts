import {
  dxCodeStyle,
  dxIgnore,
  langJavascript,
  runtimeNode,
} from '@cbnventures/nova/presets/eslint';

/**
 * ESLint Configuration.
 *
 * @since 2.0.0
 */
export default [
  ...dxIgnore,
  ...dxCodeStyle,
  ...langJavascript,
  ...runtimeNode,
  {
    name: 'custom-ignores',
    ignores: [
      'apps/**',
      'packages/**',
    ],
  },
  {
    name: 'scripts-overrides',
    files: ['scripts/**/*.mjs'],
    rules: {
      // Bootstrap scripts run before nova is built and cannot import the Logger
      // toolkit battery; console is the correct output channel for them.
      'no-console': 'off',

      // Bootstrap scripts orchestrate child processes and must propagate exit
      // codes to the parent shell; throwing an error would collapse all
      // failures to code 1, losing process-specific exit semantics.
      'no-process-exit': 'off',
      'n/no-process-exit': 'off',
    },
  },
];
