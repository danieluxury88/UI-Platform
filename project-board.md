# Project Board

This is the live coordination document for the project.

It is intended to be updated as work moves between agents.

## Status

- Project stage: Business-widget implementation in progress
- Current focus: stabilize the month-and-day calendar milestone and prepare the next week-view slice
- Current highest-priority implementation: review and land the combined month/day calendar milestone cleanly
- Review model: Lagrange remains available for the next implementation boundary

## Agent Tasks

### Codex

Status: in progress

Current responsibilities:

- Coordinate task sequencing across agents
- Verify implementation changes and rebuilds
- Keep the board, agent roster, and execution flow aligned

Next tasks:

1. Keep the month-first calendar baseline build-clean while new slices land
2. Align roadmap and architecture docs with the active business-widget track
3. Hand the combined month/day milestone to Lagrange and queue the next calendar slice

### Heisenberg

Status: completed, pending review

Current task:

- Deliver the combined month/day calendar milestone

Definition of done:

- `ui-calendar-day-view` renders a narrow, controlled single-day experience
- `ui-calendar` supports `view="day"` without breaking the month API
- `apps/web` demonstrates both month and day meaningfully
- The Stencil build passes after the new slice lands

Next after current task:

1. Start `ui-calendar-week-view` after the current milestone is reviewed
2. Reuse the event shape and shared calendar utilities where sensible
3. Report follow-up work needed for timed layouts and denser scheduling

### Lagrange

Status: in progress

Current task:

- Review the combined month/day calendar milestone and prepare follow-up findings

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
3. Own commit preparation once the next calendar milestone is accepted

### Archimedes

Status: complete

Current task:

- Calendar brief delivered in `docs/calendar-brief.md`

Next tasks if needed:

1. Align docs if the calendar API or rollout order changes materially
2. Record architectural decisions once week/day/year behavior stabilizes
3. Re-enter only if the business-widget boundary starts to blur

## Immediate Queue

1. Codex lands the combined month/day milestone
2. Lagrange reviews the milestone and flags follow-up work
3. Heisenberg starts `ui-calendar-week-view` once the review boundary is clear

## Deferred Review Notes

- Token alignment for accent treatment is still a known cleanup item.
- Transitional `:not(:defined)` fallback styling should keep shrinking as real components replace raw markup.
- Shared layout should only be promoted when repetition is real across the demo surface.
- `ui-stack` and `ui-page-section` are now the current layout baseline.
- Composition work should stay product-agnostic and avoid business semantics.
- Mobile work should not fork or reimplement the shared design-system contract.
- Calendar work should start as a family of components, not a monolith with a large `view` switch.
- Day view should stay narrow and avoid pretending timed scheduling is solved yet.
- Week and year views should not start until day-view state, events, and keyboard behavior feel stable.
- Week view is the next intentional complexity jump and should stay narrow on its first pass.

## Notes

- This document is live in the sense that it is meant to be updated during the project.
- It is not automatic; updates happen when I or another agent explicitly refresh it.
