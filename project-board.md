# Project Board

This is the live coordination document for the project.

It is intended to be updated as work moves between agents.

## Status

- Project stage: Hierarchy-focused phase setup
- Current focus: define the next hierarchy-focused implementation plan after the first committed calendar baseline
- Current highest-priority implementation: documentation refresh and component-hierarchy planning
- Review model: Lagrange remains available for the next implementation boundary

## Agent Tasks

### Codex

Status: in progress

Current responsibilities:

- Coordinate task sequencing across agents
- Verify implementation changes and rebuilds
- Keep the board, agent roster, and execution flow aligned

Next tasks:

1. Close Phase 7 against commit `d580ae1`
2. Fold Archimedes' documentation refresh into the repo state
3. Define the next implementation queue around component hierarchy

### Heisenberg

Status: standby

Current task:

- Await the next hierarchy-focused implementation slice

Definition of done:

- The next phase has a clear component hierarchy
- Implementation order follows that hierarchy cleanly
- Deferred calendar views remain explicitly out of scope until reactivated

Next after current task:

1. Implement the first slice that proves the new hierarchy
2. Keep lower-layer boundaries clear before expanding business widgets again
3. Revisit deferred calendar views only after the new phase is stable

### Lagrange

Status: in progress

Current task:

- Review commit `d580ae1` as the Phase 7 boundary and prepare follow-up findings

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
3. Mark deferred calendar views as follow-up, not as Phase 7 blockers

### Archimedes

Status: in progress

Current task:

- Review and update the documentation for the next hierarchy-focused phase

Next tasks if needed:

1. Close Phase 7 in the docs at the first committed calendar baseline
2. Define the next phase around component hierarchy and layer order
3. Record any decision changes that become stable during the docs refresh

## Immediate Queue

1. Archimedes refreshes the docs for the new phase boundary
2. Lagrange reviews commit `d580ae1` as the closed Phase 7 milestone
3. Codex scopes the first hierarchy-focused implementation slice for Heisenberg

## Deferred Review Notes

- Token alignment for accent treatment is still a known cleanup item.
- Transitional `:not(:defined)` fallback styling should keep shrinking as real components replace raw markup.
- Shared layout should only be promoted when repetition is real across the demo surface.
- `ui-stack` and `ui-page-section` are now the current layout baseline.
- Composition work should stay product-agnostic and avoid business semantics.
- Mobile work should not fork or reimplement the shared design-system contract.
- Calendar work should start as a family of components, not a monolith with a large `view` switch.
- Day view should stay narrow and avoid pretending timed scheduling is solved yet.
- Multi-week and year views are now explicitly deferred beyond Phase 7.
- The next phase should tighten component hierarchy before expanding business widgets again.

## Notes

- This document is live in the sense that it is meant to be updated during the project.
- It is not automatic; updates happen when I or another agent explicitly refresh it.
