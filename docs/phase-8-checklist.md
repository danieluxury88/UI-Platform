# Phase 8 Checklist

## Purpose

This checklist now records the Phase 8 baseline that has already been established in the repo.

Phase 8 was about tightening component hierarchy, clarifying layer boundaries, and making `src/components` easy to navigate by filesystem order.

## Status

- Phase 8 hierarchy baseline: complete and committed

## What Phase 8 established

- `packages/design-system/src/components` now reflects the layer hierarchy directly
- lower shared layers were tightened before adding more business-widget breadth
- app-specific styling and workflow glue stayed in `apps/web`
- the business-widget layer now sits on top of a clearer shared foundation

## Current layer map

- Primitives: `ui-button`, `ui-input`, `ui-textarea`, `ui-select`
- Surfaces: `ui-card`, `ui-panel`
- Layout: `ui-stack`, `ui-page-section`
- Feedback: `ui-chip`, `ui-badge`
- Compositions: `ui-toolbar`
- Business widgets:
  - calendar family
  - kanban family
  - task-list family
  - activity-timeline family
  - checklist family

## Source-structure outcome

The component hierarchy is now visible in the filesystem instead of being implied only by documentation.

Current structure:

```text
src/components/
|-- primitives/
|-- surfaces/
|-- layout/
|-- feedback/
|-- compositions/
`-- business-widgets/
    |-- calendar/
    |-- kanban/
    |-- task-list/
    |-- activity-timeline/
    `-- checklist/
```

## Phase 8 completion checklist

- Layer ownership is explicit for the shared component set
- `src/components` navigation matches the layer hierarchy
- lower-layer APIs are narrower than they were before the reorganization
- shared validation guards the expected folder structure
- `apps/web` remains the proving ground for widget APIs and boundary leaks

## What Phase 8 did not mean

- It did not reopen deferred calendar breadth
- It did not move product workflow logic into the design system
- It did not make every next step “add another widget family”

## Follow-on work

The next move after Phase 8 is not another hierarchy reshuffle.

Recommended follow-on sequence:

1. Validate the current business-widget APIs in `apps/web`
2. Tighten event naming, controlled-state rules, and accessibility across the current widget set
3. Only then decide whether another business-widget family is justified

## Review checklist for the next phase

- Do the current business widgets expose consistent controlled-state contracts?
- Are event names predictable across widget families?
- Are keyboard and screen-reader expectations clear for interactive widgets?
- Is app-owned workflow logic still staying out of shared packages?
- Does a proposed next family solve a repeated gap rather than adding breadth by default?
