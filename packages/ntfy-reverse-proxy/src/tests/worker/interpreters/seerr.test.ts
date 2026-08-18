import { describe, expect, it } from 'vitest';

import { seerrInterpreter } from '../../../worker/interpreters/seerr.js';

import type {
  Tests_Worker_Interpreters_Seerr_SeerrInterpreter_HandlesIssueWithComment_Result,
  Tests_Worker_Interpreters_Seerr_SeerrInterpreter_HandlesMediaAvailableWithLowPriority_Result,
  Tests_Worker_Interpreters_Seerr_SeerrInterpreter_HandlesMediaFailedWithHighPriority_Result,
  Tests_Worker_Interpreters_Seerr_SeerrInterpreter_HandlesMediaNotificationWithNullIssueAndComment_Result,
  Tests_Worker_Interpreters_Seerr_SeerrInterpreter_HandlesMediaPendingNotification_Result,
  Tests_Worker_Interpreters_Seerr_SeerrInterpreter_HandlesNotificationWithAllNullSubObjects_Result,
  Tests_Worker_Interpreters_Seerr_SeerrInterpreter_HandlesStringInput_Result,
  Tests_Worker_Interpreters_Seerr_SeerrInterpreter_HandlesTVShowWithTMDBLink_Result,
} from '../../../types/tests/worker/interpreters/seerr.test.d.ts';

/**
 * Tests - Worker - Interpreters - Seerr - Interpreter.
 *
 * @since 2.0.0
 */
describe('seerrInterpreter', () => {
  it('handles media pending notification', () => {
    const result: Tests_Worker_Interpreters_Seerr_SeerrInterpreter_HandlesMediaPendingNotification_Result = seerrInterpreter({
      notification_type: 'MEDIA_PENDING',
      event: 'New Request',
      subject: 'Inception (2010)',
      message: 'A thief who steals corporate secrets...',
      image: 'https://image.tmdb.org/t/p/w600/poster.jpg',
      media: {
        media_type: 'movie',
        tmdbId: '27205',
        status: 'PENDING',
        status4k: 'UNKNOWN',
      },
      request: {
        requestedBy_username: 'johndoe',
        requestedBy_email: 'john@example.com',
      },
    });

    expect(result['notification']['title']).toContain('New Request');

    expect(result['notification']['body']).toContain('Inception (2010)');

    expect(result['notification']['body']).toContain('johndoe');

    expect(result['notification']['tags']).toContain('seerr');

    expect(result['notification']['icon']).toBe('https://image.tmdb.org/t/p/w600/poster.jpg');

    return;
  });

  it('handles media available with low priority', () => {
    const result: Tests_Worker_Interpreters_Seerr_SeerrInterpreter_HandlesMediaAvailableWithLowPriority_Result = seerrInterpreter({
      notification_type: 'MEDIA_AVAILABLE',
      event: 'Available',
      subject: 'Inception (2010)',
      message: 'Now available to watch',
      media: {
        media_type: 'movie',
        tmdbId: '27205',
        status: 'AVAILABLE',
      },
    });

    expect(result['notification']['priority']).toBe(2);

    return;
  });

  it('handles media failed with high priority', () => {
    const result: Tests_Worker_Interpreters_Seerr_SeerrInterpreter_HandlesMediaFailedWithHighPriority_Result = seerrInterpreter({
      notification_type: 'MEDIA_FAILED',
      event: 'Failed',
      subject: 'Inception (2010)',
      message: 'Download failed',
      media: {
        media_type: 'movie',
        status: 'PROCESSING',
      },
    });

    expect(result['notification']['priority']).toBe(4);

    return;
  });

  it('handles issue with comment', () => {
    const result: Tests_Worker_Interpreters_Seerr_SeerrInterpreter_HandlesIssueWithComment_Result = seerrInterpreter({
      notification_type: 'ISSUE_COMMENT',
      event: 'Issue Comment',
      subject: 'Inception (2010)',
      message: 'Audio is out of sync',
      issue: {
        issue_type: 'AUDIO',
        reportedBy_username: 'jane',
      },
      comment: {
        comment_message: 'I can reproduce this too',
        commentedBy_username: 'bob',
      },
    });

    expect(result['notification']['body']).toContain('bob');

    expect(result['notification']['body']).toContain('I can reproduce this too');

    return;
  });

  it('handles string input', () => {
    const result: Tests_Worker_Interpreters_Seerr_SeerrInterpreter_HandlesStringInput_Result = seerrInterpreter('plain text fallback');

    expect(result['notification']['body']).toContain('plain text fallback');

    expect(result['notification']['tags']).toContain('seerr');

    return;
  });

  it('handles TV show with TMDB link', () => {
    const result: Tests_Worker_Interpreters_Seerr_SeerrInterpreter_HandlesTVShowWithTMDBLink_Result = seerrInterpreter({
      notification_type: 'MEDIA_PENDING',
      event: 'New Request',
      subject: 'Breaking Bad',
      message: 'A chemistry teacher turned meth cook',
      media: {
        media_type: 'tv',
        tmdbId: '1396',
        status: 'PENDING',
      },
      request: { requestedBy_username: 'johndoe' },
    });

    expect(result['notification']['actions']).toContain('https://www.themoviedb.org/tv/1396');

    return;
  });

  it('handles media notification with null issue and comment', () => {
    const result: Tests_Worker_Interpreters_Seerr_SeerrInterpreter_HandlesMediaNotificationWithNullIssueAndComment_Result = seerrInterpreter({
      notification_type: 'MEDIA_AUTO_APPROVED',
      event: 'Movie Request Automatically Approved',
      subject: 'My Neighbor Totoro (1988)',
      message: 'Two sisters move to the country with their father.',
      image: 'https://image.tmdb.org/t/p/w600/poster.jpg',
      media: {
        media_type: 'movie',
        tmdbId: '8392',
        status: 'PENDING',
        status4k: 'UNKNOWN',
      },
      request: {
        request_id: '6',
        requestedBy_username: 'mrjackyliang',
      },
      issue: null,
      comment: null,
      extra: [],
    });

    expect(result['notification']['title']).toContain('Movie Request Automatically Approved');

    expect(result['notification']['body']).toContain('My Neighbor Totoro (1988)');

    expect(result['notification']['body']).toContain('mrjackyliang');

    expect(result['notification']['priority']).toBe(3);

    return;
  });

  it('handles notification with all null sub-objects', () => {
    const result: Tests_Worker_Interpreters_Seerr_SeerrInterpreter_HandlesNotificationWithAllNullSubObjects_Result = seerrInterpreter({
      notification_type: 'MEDIA_AVAILABLE',
      event: 'Movie Request Now Available',
      subject: 'Spirited Away (2001)',
      message: 'A young girl becomes trapped in a strange new world of spirits.',
      media: null,
      request: null,
      issue: null,
      comment: null,
      extra: [],
    });

    expect(result['notification']['title']).toContain('Movie Request Now Available');

    expect(result['notification']['body']).toContain('Spirited Away (2001)');

    expect(result['notification']['priority']).toBe(2);

    return;
  });

  return;
});
