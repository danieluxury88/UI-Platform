# Project Board

This is the live coordination document for the project.

It is intended to be updated as work moves between agents.

## Status

- Project stage: Phase 6 complete
- Current focus: Phase 6 mobile shell slice is ready to land
- Current highest-priority implementation: await next phase assignment after commit
- Review model: Lagrange remains available for the next phase boundary

## Agent Tasks

### Codex

Status: in progress

Current responsibilities:

- Coordinate task sequencing across agents
- Verify implementation changes and rebuilds
- Keep the board, agent roster, and execution flow aligned

Next tasks:

1. Commit the completed Phase 6 slice
2. Queue the next phase once commit is complete

### Heisenberg

Status: completed for current phase

Current task:

- Phase 6 implementation complete
- `apps/mobile` now has a real thin shell consuming the shared packages

Definition of done:

- The mobile shell consumes the existing shared packages without redefining them
- The initial mobile setup stays thin and does not fork the component model
- The setup path is explicit enough to continue in later slices

Next after current task:

1. Add one or two representative mobile integration surfaces
2. Keep platform-specific logic isolated to the app shell
3. Address token-alignment cleanup called out in prior review notes

### Lagrange

Status: standby

Current task:

- Await the next review and commit-preparation boundary

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

1. Commit the completed Phase 6 work
2. Ask Archimedes to write the calendar brief
3. Start the first calendar milestone after the brief is in place

## Deferred Review Notes

- Token alignment for accent treatment is still a known cleanup item.
- Transitional `:not(:defined)` fallback styling should keep shrinking as real components replace raw markup.
- Shared layout should only be promoted when repetition is real across the demo surface.
- `ui-stack` and `ui-page-section` are now the current layout baseline.
- Composition work should stay product-agnostic and avoid business semantics.
- Mobile work should not fork or reimplement the shared design-system contract.

## Notes

- This document is live in the sense that it is meant to be updated during the project.
- It is not automatic; updates happen when I or another agent explicitly refresh it.
