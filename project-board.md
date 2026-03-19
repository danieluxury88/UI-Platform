# Project Board

This is the live coordination document for the project.

It is intended to be updated as work moves between agents.

## Status

- Project stage: Phase 2 in progress
- Current focus: layout helpers and cleanup after the Phase 1 foundation commit
- Current highest-priority implementation: first shared layout helper plus reduction of token/fallback debt
- Review model: Lagrange prepares the next review and commit gate at the Phase 2 boundary

## Agent Tasks

### Codex

Status: in progress

Current responsibilities:

- Coordinate task sequencing across agents
- Verify implementation changes and rebuilds
- Keep the board, agent roster, and execution flow aligned

Next tasks:

1. Start Phase 2 with a narrow implementation slice
2. Track cleanup debt carried from Phase 1
3. Verify Stencil builds and web integration as new shared components land
4. Hand the Phase 2 boundary to Lagrange when the slice set is coherent

### Heisenberg

Status: in progress

Current task:

- Start Phase 2 implementation
- Build the first justified layout helper and reduce cleanup debt from Phase 1 where it directly overlaps

Definition of done:

- The next shared layout helper is implemented and used in `apps/web`
- The API is narrow and justified by repeated structure
- The Stencil build passes
- Transitional CSS is reduced where the new component truly replaces raw structure

Next after current task:

1. Add the next layout helper if repetition still justifies it
2. Reduce duplicated fallback/shared CSS
3. Address token-alignment cleanup called out in prior review notes

### Lagrange

Status: queued for Phase 2 review

Current task:

- Prepare to review the Phase 2 layout/helper changes and cleanup work at the next phase boundary

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

1. Heisenberg implements the first Phase 2 layout helper
2. Heisenberg reduces overlapping fallback/shared CSS where safe
3. Codex verifies build and web integration
4. Lagrange reviews at the Phase 2 boundary

## Deferred Review Notes

- Token alignment for accent treatment is still a known cleanup item.
- Transitional `:not(:defined)` fallback styling should keep shrinking as real components replace raw markup.
- Shared layout should only be promoted when repetition is real across the demo surface.

## Notes

- This document is live in the sense that it is meant to be updated during the project.
- It is not automatic; updates happen when I or another agent explicitly refresh it.
