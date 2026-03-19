# Phase 8 Checklist

## Purpose

This checklist turns the Phase 8 documentation into an implementation-ready sequence.

Phase 8 is not about adding more calendar breadth. It is about tightening component hierarchy, clarifying layer boundaries, and making the next shared-component decisions easier to review.

## Scope

In scope:

- Confirm layer ownership for every existing shared component
- Make `src/components` easier to navigate by reflecting the layer hierarchy in the folder structure
- Tighten lower-layer boundaries before changing business widgets
- Reduce API and utility leakage across layers
- Keep `apps/web` as the proving ground for hierarchy work

Out of scope:

- Multi-week calendar view
- Year calendar view
- New business-widget families
- Ionic or Capacitor expansion
- Product-specific workflows in shared packages

## Source-structure goal

The component hierarchy should be visible in the filesystem, not only in the docs.

Target outcome:

- A developer can open `packages/design-system/src/components` and understand the layer model immediately
- Lower layers appear first and are easier to inspect than higher-layer widgets
- Calendar-specific code is grouped under the business-widget layer instead of appearing as peer folders next to primitives and surfaces

Suggested target structure:

```text
src/components/
|-- primitives/
|   `-- ui-button/
|-- surfaces/
|   |-- ui-card/
|   `-- ui-panel/
|-- layout/
|   |-- ui-page-section/
|   `-- ui-stack/
|-- feedback/
|   |-- ui-badge/
|   `-- ui-chip/
|-- compositions/
|   `-- ui-toolbar/
`-- business-widgets/
    `-- calendar/
        |-- ui-calendar/
        |-- ui-calendar-toolbar/
        |-- ui-calendar-month-view/
        |-- ui-calendar-day-view/
        |-- ui-calendar-week-view/
        |-- ui-calendar-day-cell/
        |-- ui-calendar-event-chip/
        `-- shared/
            |-- calendar-utils.ts
            `-- calendar-utils.spec.ts
```

Implementation note:

- The Phase 8 goal is not to reshuffle folders for aesthetics alone
- Reorganization should happen only when it makes the hierarchy easier to follow and does not blur component ownership
- If the folder structure changes, imports and build configuration must keep the package behavior unchanged

## Immediate implementation slice

### 1. Freeze the current calendar baseline

Checklist:

- Treat `ui-calendar`, `ui-calendar-toolbar`, `ui-calendar-month-view`, `ui-calendar-day-view`, `ui-calendar-week-view`, `ui-calendar-day-cell`, and `ui-calendar-event-chip` as the committed Phase 7 baseline
- Do not add new calendar views
- Do not add dense scheduling, creation flows, or product workflows to shared calendar components
- Keep demo-specific behavior in `apps/web`

Definition of done:

- No new calendar breadth is introduced while hierarchy work is underway

### 2. Audit the current layer map

Checklist:

- Create a single source of truth for the layer assignment of every component in `packages/design-system`
- Confirm these current assignments:
  - Primitives: `ui-button`
  - Surfaces: `ui-card`, `ui-panel`
  - Layout: `ui-stack`, `ui-page-section`
  - Feedback: `ui-chip`, `ui-badge`
  - Compositions: `ui-toolbar`
  - Business widgets: calendar family
- Call out any ambiguous cases explicitly instead of leaving them implied
- Record which components are allowed to depend on which lower layers
- Record the target folder location for each component so the filesystem order matches the layer order

Definition of done:

- The repo has a clear component-to-layer map that reviewers can use

### 3. Tighten primitives and surfaces first

Checklist:

- Review `ui-button` for props or styling behavior that pull in higher-layer concerns
- Review `ui-card` and `ui-panel` for layout or page-structure responsibilities that do not belong in surfaces
- Move one-off page structure back to `apps/web` if it is not reusable
- Keep lower-layer APIs narrow and predictable

Definition of done:

- Primitives depend only on tokens
- Surfaces frame content without absorbing page structure

### 4. Re-check layout and feedback boundaries

Checklist:

- Verify `ui-stack` and `ui-page-section` solve repeated structure rather than page-specific composition
- Verify `ui-chip` and `ui-badge` stay state-oriented rather than workflow-oriented
- Remove or reject any app-specific semantics that leaked into layout or feedback APIs
- Keep fallback CSS shrinking as real shared components replace raw markup

Definition of done:

- Layout stays structural
- Feedback stays state-oriented

### 5. Separate generic compositions from widget support

Checklist:

- Review `ui-toolbar` and confirm it remains product-agnostic
- Keep calendar-specific controls and view logic in the business-widget layer
- Do not promote calendar support pieces into the composition layer just because they have slots or controls
- Keep shared composition APIs neutral enough to be reused outside the calendar

Definition of done:

- Generic compositions are clearly separate from calendar-specific support components

### 6. Normalize shared APIs and utilities

Checklist:

- Review shared utilities and keep widget-specific helpers in the widget layer unless lower-layer reuse is proven
- Normalize event names, prop naming, and controlled-state expectations where hierarchy is unclear
- Keep selection state separate from focus state in calendar-related APIs
- Avoid introducing new shared abstractions until repeated use is proven

Definition of done:

- API boundaries match the documented layer model

## `apps/web` proving-ground checklist

- Keep the current month, day, and week scenarios stable
- Keep app-level demo glue in `apps/web/app.js`
- Use the demo to expose boundary leaks
- Do not move product behavior into `packages/design-system` just to make the demo look richer
- Keep class-based or fallback styling only where the migration still genuinely needs it

## Suggested execution order

1. Document the final component layer map and target folder structure in the repo
2. Decide whether the current flat folder layout should be reorganized now or after the first audit pass
3. Review and tighten `ui-button`, `ui-card`, and `ui-panel`
4. Review and tighten `ui-stack`, `ui-page-section`, `ui-chip`, and `ui-badge`
5. Review `ui-toolbar` against the composition rules
6. Review the calendar family for hierarchy leaks without adding new breadth
7. If approved, reorganize `src/components` to reflect the agreed hierarchy
8. Rebuild, typecheck, and test after each slice

## Review checklist

- Does this change respect the documented layer map?
- Is a lower-layer component taking on a higher-layer responsibility?
- Is app behavior being pushed into a shared package?
- Is a widget-specific helper being promoted too early?
- Is new shared code justified by repetition rather than convenience?
- Are deferred calendar views still out of scope?

## Exit criteria

Phase 8 is underway when:

- Every shared component has a clear layer assignment
- Lower-layer boundaries are tighter than they were at the end of Phase 7
- Review comments can point to a documented hierarchy standard
- The next implementation slice is lower-layers first, business widgets last
