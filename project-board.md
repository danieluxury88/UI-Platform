# Project Board

This is the live coordination document for the project.

It is intended to be updated as work moves between agents.

## Status

- Project stage: active foundation build
- Current focus: Stencil component migration from shared CSS
- Current highest-priority implementation: complete Phase 1 component work
- Review model: Lagrange performs the formal review pass at the end of Phase 1

## Agent Tasks

### Codex

Status: in progress

Current responsibilities:

- Coordinate task sequencing across agents
- Verify implementation changes and rebuilds
- Keep the board, agent roster, and execution flow aligned

Next tasks:

1. Keep Heisenberg moving through the remaining Phase 1 work
2. Track review debt and known findings for end-of-phase cleanup
3. Refresh the board as implementation progresses
4. Hand the full Phase 1 diff to Lagrange at the review gate

### Heisenberg

Status: in progress

Current task:

- Continue Phase 1 component work without a per-slice review gate
- `ui-card` is implemented and accepted provisionally for this phase

Definition of done:

- `ui-card` exists as a Stencil surface component
- The API is narrow and slot-based
- The component consumes shared tokens
- One visible card in the web demo uses the component
- The Stencil build passes
- Remaining transitional card CSS is identified

Next after current task:

1. Implement `ui-panel`
2. Reduce transitional CSS tied to card and panel surfaces
3. Evaluate whether a shared section-heading or layout helper is justified
4. Address accumulated review findings before the Phase 1 closeout if needed

### Lagrange

Status: queued for end-of-phase review

Current task:

- Review the full Phase 1 change set after implementation reaches the phase boundary

Review focus:

- Bugs and regressions
- Accessibility issues
- Token misuse or hardcoded values
- Layering or hierarchy violations
- API design risks
- Transitional CSS that should be removed or retained

Next after review:

1. Prepare a concise findings report
2. Confirm whether the change is ready to land
3. Own commit preparation once the change is accepted

### Archimedes

Status: standby

Current task:

- No active implementation task

Next tasks if needed:

1. Align docs if `ui-card` or `ui-panel` introduce architectural clarifications
2. Update roadmap if implementation order changes
3. Record any new architectural decision that becomes stable

## Immediate Queue

1. Heisenberg implements `ui-panel`
2. Heisenberg continues Phase 1 cleanup and component migration work
3. Codex tracks deferred review items during the phase
4. Lagrange reviews the full Phase 1 set before commit preparation

## Deferred Review Notes

- `ui-card` already has preliminary review findings from Lagrange.
- Those findings stay open until the end-of-phase review gate unless we choose to address them earlier.
- Current known issues include token alignment for accent treatment and cleanup of `ui-card` fallback styling.

## Notes

- This document is live in the sense that it is meant to be updated during the project.
- It is not automatic; updates happen when I or another agent explicitly refresh it.
