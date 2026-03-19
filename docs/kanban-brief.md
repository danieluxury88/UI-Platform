# Kanban Brief

## Purpose

This brief defines the recommended first shared kanban-family direction for the design system.

The goal is to add a second business-widget family without reopening lower-layer ambiguity or pushing product workflow into shared packages.

## Recommended component family

- `ui-kanban-board`
  Role: top-level board shell and controlled column input
- `ui-kanban-column`
  Role: column framing, title, count, and card list
- `ui-kanban-card`
  Role: compact task card rendering and activation event

Suggested shared support:

- `business-widgets/kanban/shared/kanban-types.ts`
- `business-widgets/kanban/shared/kanban-utils.ts`

## Scope for the first slice

In scope:

- Controlled `columns` input
- Column rendering
- Card rendering
- Card activation event
- Reuse of lower shared layers like `ui-stack` and `ui-badge`

Out of scope:

- Drag and drop
- Assignee avatars
- Swimlanes
- Filtering
- Persistence
- Product-specific task workflows
- Reordering rules

## Boundary rules

- The kanban family belongs in the business-widget layer
- It may compose lower shared layers, but it should not recreate them
- App-level state, filtering, and task semantics stay outside the widget family
- The web app remains the proving ground for interaction glue

## First validation path

1. Render a controlled board in `apps/web`
2. Keep the board API thin
3. Verify card activation bubbles cleanly to the host app
4. Avoid adding drag and drop before the base contract is stable
