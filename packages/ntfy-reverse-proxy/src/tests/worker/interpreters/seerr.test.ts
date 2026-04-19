import { describe, expect, it } from 'vitest';

import { seerrInterpreter } from '../../../worker/interpreters/seerr.js';

import type { TestsWorkerInterpretersSeerrResult } from '../../../types/tests/worker/interpreters/seerr.test.d.ts';

/**
 * Tests - Worker - Interpreters - Seerr - Interpreter.
 *
 * @since 2.0.0
 */
describe('seerrInterpreter', () => {
  /**
   * Tests - Worker - Interpreters - Seerr.
   *
   * @since 2.0.0
   */
  it('handles media pending notification', () => {
    const result: TestsWorkerInterpretersSeerrResult = seerrInterpreter({
      notification_type: 'MEDIA_PENDING',
      event: 'New Request',
      subject: 'Inception (2010)',
      message: 'A thief who steals corporate secrets...',
      image: 'https://image.tmdb.org/t/p/w600/poster.jpg',
      media: {
        media_type: 'movie', tmdbId: '27205', status: 'PENDING', status4k: 'UNKNOWN',
      },
      request: {
        requestedBy_username: 'johndoe', requestedBy_email: 'john@example.com',
      },
    });

    expect(result['notification']['title']).toContain('New Request');

    expect(result['notification']['body']).toContain('Inception (2010)');

    expect(result['notification']['body']).toContain('johndoe');

    expect(result['notification']['tags']).toContain('seerr');

    expect(result['notification']['icon']).toBe('https://image.tmdb.org/t/p/w600/poster.jpg');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Seerr.
   *
   * @since 2.0.0
   */
  it('handles media available with low priority', () => {
    const result: TestsWorkerInterpretersSeerrResult = seerrInterpreter({
      notification_type: 'MEDIA_AVAILABLE',
      event: 'Available',
      subject: 'Inception (2010)',
      message: 'Now available to watch',
      media: {
        media_type: 'movie', tmdbId: '27205', status: 'AVAILABLE',
      },
    });

    expect(result['notification']['priority']).toBe(2);

    return;
  });

  /**
   * Tests - Worker - Interpreters - Seerr.
   *
   * @since 2.0.0
   */
  it('handles media failed with high priority', () => {
    const result: TestsWorkerInterpretersSeerrResult = seerrInterpreter({
      notification_type: 'MEDIA_FAILED',
      event: 'Failed',
      subject: 'Inception (2010)',
      message: 'Download failed',
      media: {
        media_type: 'movie', status: 'PROCESSING',
      },
    });

    expect(result['notification']['priority']).toBe(4);

    return;
  });

  /**
   * Tests - Worker - Interpreters - Seerr.
   *
   * @since 2.0.0
   */
  it('handles issue with comment', () => {
    const result: TestsWorkerInterpretersSeerrResult = seerrInterpreter({
      notification_type: 'ISSUE_COMMENT',
      event: 'Issue Comment',
      subject: 'Inception (2010)',
      message: 'Audio is out of sync',
      issue: {
        issue_type: 'AUDIO', reportedBy_username: 'jane',
      },
      comment: {
        comment_message: 'I can reproduce this too', commentedBy_username: 'bob',
      },
    });

    expect(result['notification']['body']).toContain('bob');

    expect(result['notification']['body']).toContain('I can reproduce this too');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Seerr.
   *
   * @since 2.0.0
   */
  it('handles string input', () => {
    const result: TestsWorkerInterpretersSeerrResult = seerrInterpreter('plain text fallback');

    expect(result['notification']['body']).toContain('plain text fallback');

    expect(result['notification']['tags']).toContain('seerr');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Seerr.
   *
   * @since 2.0.0
   */
  it('handles TV show with TMDB link', () => {
    const result: TestsWorkerInterpretersSeerrResult = seerrInterpreter({
      notification_type: 'MEDIA_PENDING',
      event: 'New Request',
      subject: 'Breaking Bad',
      message: 'A chemistry teacher turned meth cook',
      media: {
        media_type: 'tv', tmdbId: '1396', status: 'PENDING',
      },
      request: { requestedBy_username: 'johndoe' },
    });

    expect(result['notification']['actions']).toContain('https://www.themoviedb.org/tv/1396');

    return;
  });

  return;
});
