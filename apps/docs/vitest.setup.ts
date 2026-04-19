import { afterEach, beforeEach, vi } from 'vitest';

/**
 * Vitest Setup.
 *
 * Global test hooks that run before and after every test. Suppresses
 * Logger output by spying on stdout and stderr, and resets the process
 * exit code so each test starts with a clean slate.
 *
 * @since 0.15.0
 */
beforeEach(() => {
  vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

  vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

  process.exitCode = undefined;

  return;
});

afterEach(() => {
  vi.restoreAllMocks();

  return;
});
