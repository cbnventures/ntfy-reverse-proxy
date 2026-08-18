import { describe, expect, it } from 'vitest';

import { diffComponents, formatComponentLines } from '../../../worker/pipeline/accumulate.js';

import type {
  Tests_Worker_Pipeline_Accumulate_DiffComponents_DetectsNewComponentsAsChanged_Current,
  Tests_Worker_Pipeline_Accumulate_DiffComponents_DetectsNewComponentsAsChanged_Diff,
  Tests_Worker_Pipeline_Accumulate_DiffComponents_DetectsNewComponentsAsChanged_Previous,
  Tests_Worker_Pipeline_Accumulate_DiffComponents_DetectsStatusChangesAsChanged_Current,
  Tests_Worker_Pipeline_Accumulate_DiffComponents_DetectsStatusChangesAsChanged_Diff,
  Tests_Worker_Pipeline_Accumulate_DiffComponents_DetectsStatusChangesAsChanged_Previous,
  Tests_Worker_Pipeline_Accumulate_DiffComponents_HandlesMultipleComponentsWithMixedChanges_Changed,
  Tests_Worker_Pipeline_Accumulate_DiffComponents_HandlesMultipleComponentsWithMixedChanges_Current,
  Tests_Worker_Pipeline_Accumulate_DiffComponents_HandlesMultipleComponentsWithMixedChanges_Diff,
  Tests_Worker_Pipeline_Accumulate_DiffComponents_HandlesMultipleComponentsWithMixedChanges_Previous,
  Tests_Worker_Pipeline_Accumulate_DiffComponents_HandlesMultipleComponentsWithMixedChanges_Unchanged,
  Tests_Worker_Pipeline_Accumulate_DiffComponents_MarksUnchangedComponentsAsNotChanged_Current,
  Tests_Worker_Pipeline_Accumulate_DiffComponents_MarksUnchangedComponentsAsNotChanged_Diff,
  Tests_Worker_Pipeline_Accumulate_DiffComponents_MarksUnchangedComponentsAsNotChanged_Previous,
  Tests_Worker_Pipeline_Accumulate_FormatComponentLines_FormatsComponentWithHumanizedStatus_Diff,
  Tests_Worker_Pipeline_Accumulate_FormatComponentLines_FormatsComponentWithHumanizedStatus_Lines,
  Tests_Worker_Pipeline_Accumulate_FormatComponentLines_FormatsUnchangedComponentTheSameWay_Diff,
  Tests_Worker_Pipeline_Accumulate_FormatComponentLines_FormatsUnchangedComponentTheSameWay_Lines,
  Tests_Worker_Pipeline_Accumulate_FormatComponentLines_HumanizesMultiWordStatus_Diff,
  Tests_Worker_Pipeline_Accumulate_FormatComponentLines_HumanizesMultiWordStatus_Lines,
  Tests_Worker_Pipeline_Accumulate_FormatComponentLines_HumanizesSingleWordStatus_Diff,
  Tests_Worker_Pipeline_Accumulate_FormatComponentLines_HumanizesSingleWordStatus_Lines,
} from '../../../types/tests/worker/pipeline/accumulate.test.d.ts';

/**
 * Tests - Worker - Pipeline - Accumulate - Diff Components.
 *
 * @since 2.0.0
 */
describe('diffComponents', () => {
  it('detects new components as changed', () => {
    const previous: Tests_Worker_Pipeline_Accumulate_DiffComponents_DetectsNewComponentsAsChanged_Previous = {};
    const current: Tests_Worker_Pipeline_Accumulate_DiffComponents_DetectsNewComponentsAsChanged_Current = {
      abc: {
        name: 'Actions',
        status: 'partial_outage',
      },
    };

    const diff: Tests_Worker_Pipeline_Accumulate_DiffComponents_DetectsNewComponentsAsChanged_Diff = diffComponents(previous, current);

    expect(diff).toHaveLength(1);

    expect(diff[0]!['name']).toBe('Actions');

    expect(diff[0]!['oldStatus']).toBeUndefined();

    expect(diff[0]!['newStatus']).toBe('partial_outage');

    expect(diff[0]!['changed']).toBe(true);

    return;
  });

  it('detects status changes as changed', () => {
    const previous: Tests_Worker_Pipeline_Accumulate_DiffComponents_DetectsStatusChangesAsChanged_Previous = {
      abc: {
        name: 'Actions',
        status: 'partial_outage',
      },
    };
    const current: Tests_Worker_Pipeline_Accumulate_DiffComponents_DetectsStatusChangesAsChanged_Current = {
      abc: {
        name: 'Actions',
        status: 'operational',
      },
    };

    const diff: Tests_Worker_Pipeline_Accumulate_DiffComponents_DetectsStatusChangesAsChanged_Diff = diffComponents(previous, current);

    expect(diff[0]!['changed']).toBe(true);

    expect(diff[0]!['oldStatus']).toBe('partial_outage');

    expect(diff[0]!['newStatus']).toBe('operational');

    return;
  });

  it('marks unchanged components as not changed', () => {
    const previous: Tests_Worker_Pipeline_Accumulate_DiffComponents_MarksUnchangedComponentsAsNotChanged_Previous = {
      abc: {
        name: 'Actions',
        status: 'partial_outage',
      },
    };
    const current: Tests_Worker_Pipeline_Accumulate_DiffComponents_MarksUnchangedComponentsAsNotChanged_Current = {
      abc: {
        name: 'Actions',
        status: 'partial_outage',
      },
    };

    const diff: Tests_Worker_Pipeline_Accumulate_DiffComponents_MarksUnchangedComponentsAsNotChanged_Diff = diffComponents(previous, current);

    expect(diff[0]!['changed']).toBe(false);

    return;
  });

  it('handles multiple components with mixed changes', () => {
    const previous: Tests_Worker_Pipeline_Accumulate_DiffComponents_HandlesMultipleComponentsWithMixedChanges_Previous = {
      a: {
        name: 'Actions',
        status: 'partial_outage',
      },
      b: {
        name: 'Webhooks',
        status: 'partial_outage',
      },
    };
    const current: Tests_Worker_Pipeline_Accumulate_DiffComponents_HandlesMultipleComponentsWithMixedChanges_Current = {
      a: {
        name: 'Actions',
        status: 'operational',
      },
      b: {
        name: 'Webhooks',
        status: 'partial_outage',
      },
      c: {
        name: 'Issues',
        status: 'partial_outage',
      },
    };

    const diff: Tests_Worker_Pipeline_Accumulate_DiffComponents_HandlesMultipleComponentsWithMixedChanges_Diff = diffComponents(previous, current);
    const changed: Tests_Worker_Pipeline_Accumulate_DiffComponents_HandlesMultipleComponentsWithMixedChanges_Changed = diff.filter((d) => d['changed'] === true);
    const unchanged: Tests_Worker_Pipeline_Accumulate_DiffComponents_HandlesMultipleComponentsWithMixedChanges_Unchanged = diff.filter((d) => d['changed'] === false);

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
    const diff: Tests_Worker_Pipeline_Accumulate_FormatComponentLines_FormatsComponentWithHumanizedStatus_Diff = [{
      name: 'Actions',
      oldStatus: 'operational',
      newStatus: 'partial_outage',
      changed: true,
    }];

    const lines: Tests_Worker_Pipeline_Accumulate_FormatComponentLines_FormatsComponentWithHumanizedStatus_Lines = formatComponentLines(diff);

    expect(lines[0]).toBe('- Actions (Partial Outage)');

    return;
  });

  it('formats unchanged component the same way', () => {
    const diff: Tests_Worker_Pipeline_Accumulate_FormatComponentLines_FormatsUnchangedComponentTheSameWay_Diff = [{
      name: 'Webhooks',
      oldStatus: 'partial_outage',
      newStatus: 'partial_outage',
      changed: false,
    }];

    const lines: Tests_Worker_Pipeline_Accumulate_FormatComponentLines_FormatsUnchangedComponentTheSameWay_Lines = formatComponentLines(diff);

    expect(lines[0]).toBe('- Webhooks (Partial Outage)');

    return;
  });

  it('humanizes single-word status', () => {
    const diff: Tests_Worker_Pipeline_Accumulate_FormatComponentLines_HumanizesSingleWordStatus_Diff = [{
      name: 'Issues',
      oldStatus: undefined,
      newStatus: 'operational',
      changed: true,
    }];

    const lines: Tests_Worker_Pipeline_Accumulate_FormatComponentLines_HumanizesSingleWordStatus_Lines = formatComponentLines(diff);

    expect(lines[0]).toBe('- Issues (Operational)');

    return;
  });

  it('humanizes multi-word status', () => {
    const diff: Tests_Worker_Pipeline_Accumulate_FormatComponentLines_HumanizesMultiWordStatus_Diff = [{
      name: 'API',
      oldStatus: undefined,
      newStatus: 'degraded_performance',
      changed: true,
    }];

    const lines: Tests_Worker_Pipeline_Accumulate_FormatComponentLines_HumanizesMultiWordStatus_Lines = formatComponentLines(diff);

    expect(lines[0]).toBe('- API (Degraded Performance)');

    return;
  });

  return;
});
