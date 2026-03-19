# Task List Brief

## Purpose

The task-list family provides a denser companion view for task-like records that may also appear in other business widgets such as Kanban.

The shared package stays intentionally thin:

- controlled `items` input
- compact task row rendering
- activation event for host-app interaction
- optional status label and tone per item

## Included components

- `ui-task-list`
  Role: shell for a controlled list of task-like records
- `ui-task-list-item`
  Role: compact row with title, metadata, status label, and activation event

## In scope

- app-provided item data
- compact status and metadata rendering
- item activation events
- reuse of the same records across multiple host views

## Out of scope

- filtering and sorting logic
- inline editing
- persistence
- product-specific ownership semantics
- assignee or workflow resolution

## Demo rule

`apps/web` should keep the Kanban-to-list flattening logic app-local so the shared widget family does not absorb product workflow state.
