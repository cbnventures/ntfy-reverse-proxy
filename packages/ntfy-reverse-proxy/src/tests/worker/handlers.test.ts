import { describe, expect, it } from 'vitest';

import { shouldNotifyError } from '../../worker/handlers.js';

/**
 * Tests - Worker - Handlers - Should Notify Error.
 *
 * @since 2.1.0
 */
describe('shouldNotifyError', () => {
  it('notifies both categories when error_events is omitted', () => {
    expect(shouldNotifyError({
      name: 'test',
      type: 'http',
      id: 'abc',
      interpreter: 'plain-text',
      topic: 'test',
      error_topic: 'errors',
      mode: 'send-once',
      show_visitor_info: false,
      primary_server: 'primary',
      servers: ['primary'],
    }, 'authentication')).toBe(true);

    expect(shouldNotifyError({
      name: 'test',
      type: 'http',
      id: 'abc',
      interpreter: 'plain-text',
      topic: 'test',
      error_topic: 'errors',
      mode: 'send-once',
      show_visitor_info: false,
      primary_server: 'primary',
      servers: ['primary'],
    }, 'interpretation')).toBe(true);

    return;
  });

  it('honors the error_events allow-list', () => {
    expect(shouldNotifyError({
      name: 'test',
      type: 'http',
      id: 'abc',
      interpreter: 'plain-text',
      topic: 'test',
      error_topic: 'errors',
      error_events: ['interpretation'],
      mode: 'send-once',
      show_visitor_info: false,
      primary_server: 'primary',
      servers: ['primary'],
    }, 'authentication')).toBe(false);

    expect(shouldNotifyError({
      name: 'test',
      type: 'http',
      id: 'abc',
      interpreter: 'plain-text',
      topic: 'test',
      error_topic: 'errors',
      error_events: ['interpretation'],
      mode: 'send-once',
      show_visitor_info: false,
      primary_server: 'primary',
      servers: ['primary'],
    }, 'interpretation')).toBe(true);

    return;
  });

  it('suppresses all categories when error_events is empty', () => {
    expect(shouldNotifyError({
      name: 'test',
      type: 'http',
      id: 'abc',
      interpreter: 'plain-text',
      topic: 'test',
      error_topic: 'errors',
      error_events: [],
      mode: 'send-once',
      show_visitor_info: false,
      primary_server: 'primary',
      servers: ['primary'],
    }, 'authentication')).toBe(false);

    expect(shouldNotifyError({
      name: 'test',
      type: 'http',
      id: 'abc',
      interpreter: 'plain-text',
      topic: 'test',
      error_topic: 'errors',
      error_events: [],
      mode: 'send-once',
      show_visitor_info: false,
      primary_server: 'primary',
      servers: ['primary'],
    }, 'interpretation')).toBe(false);

    return;
  });

  it('never notifies when error_topic is unset', () => {
    expect(shouldNotifyError({
      name: 'test',
      type: 'http',
      id: 'abc',
      interpreter: 'plain-text',
      topic: 'test',
      mode: 'send-once',
      show_visitor_info: false,
      primary_server: 'primary',
      servers: ['primary'],
    }, 'interpretation')).toBe(false);

    return;
  });

  return;
});
