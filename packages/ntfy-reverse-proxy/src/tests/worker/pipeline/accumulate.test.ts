import { describe, expect, it } from 'vitest';

import { diffComponents, formatComponentLines } from '../../../worker/pipeline/accumulate.js';

import type {
  TestsWorkerPipelineAccumulateChangedEntries,
  TestsWorkerPipelineAccumulateCurrent,
  TestsWorkerPipelineAccumulateDiff,
  TestsWorkerPipelineAccumulateLines,
  TestsWorkerPipelineAccumulatePrevious,
  TestsWorkerPipelineAccumulateUnchangedEntries,
} from '../../../types/tests/worker/pipeline/accumulate.test.d.ts';

/**
 * Tests - Worker - Pipeline - Accumulate - Diff Components.
 *
 * @since 2.0.0
 */
describe('diffComponents', () => {
  it('detects new components as changed', () => {
    const previous: TestsWorkerPipelineAccumulatePrevious = {};
    const current: TestsWorkerPipelineAccumulateCurrent = {
      abc: {
        name: 'Actions', status: 'partial_outage',
      },
    };

    const diff: TestsWorkerPipelineAccumulateDiff = diffComponents(previous, current);

    expect(diff).toHaveLength(1);

    expect(diff[0]!['name']).toBe('Actions');

    expect(diff[0]!['oldStatus']).toBeUndefined();

    expect(diff[0]!['newStatus']).toBe('partial_outage');

    expect(diff[0]!['changed']).toBe(true);

    return;
  });

  it('detects status changes as changed', () => {
    const previous: TestsWorkerPipelineAccumulatePrevious = {
      abc: {
        name: 'Actions', status: 'partial_outage',
      },
    };
    const current: TestsWorkerPipelineAccumulateCurrent = {
      abc: {
        name: 'Actions', status: 'operational',
      },
    };

    const diff: TestsWorkerPipelineAccumulateDiff = diffComponents(previous, current);

    expect(diff[0]!['changed']).toBe(true);

    expect(diff[0]!['oldStatus']).toBe('partial_outage');

    expect(diff[0]!['newStatus']).toBe('operational');

    return;
  });

  it('marks unchanged components as not changed', () => {
    const previous: TestsWorkerPipelineAccumulatePrevious = {
      abc: {
        name: 'Actions', status: 'partial_outage',
      },
    };
    const current: TestsWorkerPipelineAccumulateCurrent = {
      abc: {
        name: 'Actions', status: 'partial_outage',
      },
    };

    const diff: TestsWorkerPipelineAccumulateDiff = diffComponents(previous, current);

    expect(diff[0]!['changed']).toBe(false);

    return;
  });

  it('handles multiple components with mixed changes', () => {
    const previous: TestsWorkerPipelineAccumulatePrevious = {
      a: {
        name: 'Actions', status: 'partial_outage',
      },
      b: {
        name: 'Webhooks', status: 'partial_outage',
      },
    };
    const current: TestsWorkerPipelineAccumulateCurrent = {
      a: {
        name: 'Actions', status: 'operational',
      },
      b: {
        name: 'Webhooks', status: 'partial_outage',
      },
      c: {
        name: 'Issues', status: 'partial_outage',
      },
    };

    const diff: TestsWorkerPipelineAccumulateDiff = diffComponents(previous, current);
    const changed: TestsWorkerPipelineAccumulateChangedEntries = diff.filter((d) => d['changed'] === true);
    const unchanged: TestsWorkerPipelineAccumulateUnchangedEntries = diff.filter((d) => d['changed'] === false);

    expect(changed).toHaveLength(2);

    expect(unchanged).toHaveLength(1);

    return;
  });

  return;
});

/**
 * Tests - Worker - Pipeline - Accumulate - Format Component Lines.
 *
 * @since 2.0.0
 */
describe('formatComponentLines', () => {
  it('formats component with humanized status', () => {
    const diff: TestsWorkerPipelineAccumulateDiff = [{
      name: 'Actions', oldStatus: 'operational', newStatus: 'partial_outage', changed: true,
    }];

    const lines: TestsWorkerPipelineAccumulateLines = formatComponentLines(diff);

    expect(lines[0]).toBe('- Actions (Partial Outage)');

    return;
  });

  it('formats unchanged component the same way', () => {
    const diff: TestsWorkerPipelineAccumulateDiff = [{
      name: 'Webhooks', oldStatus: 'partial_outage', newStatus: 'partial_outage', changed: false,
    }];

    const lines: TestsWorkerPipelineAccumulateLines = formatComponentLines(diff);

    expect(lines[0]).toBe('- Webhooks (Partial Outage)');

    return;
  });

  it('humanizes single-word status', () => {
    const diff: TestsWorkerPipelineAccumulateDiff = [{
      name: 'Issues', oldStatus: undefined, newStatus: 'operational', changed: true,
    }];

    const lines: TestsWorkerPipelineAccumulateLines = formatComponentLines(diff);

    expect(lines[0]).toBe('- Issues (Operational)');

    return;
  });

  it('humanizes multi-word status', () => {
    const diff: TestsWorkerPipelineAccumulateDiff = [{
      name: 'API', oldStatus: undefined, newStatus: 'degraded_performance', changed: true,
    }];

    const lines: TestsWorkerPipelineAccumulateLines = formatComponentLines(diff);

    expect(lines[0]).toBe('- API (Degraded Performance)');

    return;
  });

  return;
});
