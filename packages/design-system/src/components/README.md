# Component Layers

This directory is organized by the design-system hierarchy so the filesystem mirrors the intended dependency order.

Lower layers come first. Higher layers may compose lower layers, but not the reverse.

## Layer order

1. `primitives`
2. `surfaces`
3. `layout`
4. `feedback`
5. `compositions`
6. `business-widgets`

## Current map

- `primitives/ui-button`
- `surfaces/ui-card`
- `surfaces/ui-panel`
- `layout/ui-stack`
- `layout/ui-page-section`
- `feedback/ui-chip`
- `feedback/ui-badge`
- `compositions/ui-toolbar`
- `business-widgets/calendar/ui-calendar`
- `business-widgets/calendar/ui-calendar-toolbar`
- `business-widgets/calendar/ui-calendar-month-view`
- `business-widgets/calendar/ui-calendar-day-view`
- `business-widgets/calendar/ui-calendar-week-view`
- `business-widgets/calendar/ui-calendar-day-cell`
- `business-widgets/calendar/ui-calendar-event-chip`
- `business-widgets/calendar/shared/calendar-utils.ts`
- `business-widgets/kanban/ui-kanban-board`
- `business-widgets/kanban/ui-kanban-column`
- `business-widgets/kanban/ui-kanban-card`
- `business-widgets/kanban/shared/kanban-types.ts`
- `business-widgets/kanban/shared/kanban-utils.ts`

## Dependency rules

- `primitives` may depend on tokens only
- `surfaces` may depend on tokens and primitives
- `layout` may depend on tokens, primitives, and surfaces
- `feedback` may depend on tokens, primitives, and surfaces when needed
- `compositions` may depend on lower shared layers but must remain product-agnostic
- `business-widgets` may depend on lower shared layers and should stay last in the hierarchy

## Review rule

When adding or changing a component, check two things first:

1. Does the folder match the component's actual layer?
2. Does the component only depend on layers below it?

If the answer to either question is no, fix the hierarchy before adding more breadth.
