# Activity Timeline Brief

## Purpose

The activity-timeline family provides a thin, read-only history surface for task and workflow-adjacent events.

The shared package stays intentionally narrow:

- controlled `events` input
- ordered event rendering
- timestamp and metadata display
- optional tone for emphasis

## Included components

- `ui-activity-timeline`
  Role: shell for a controlled sequence of activity events
- `ui-activity-timeline-item`
  Role: single event row with title, timestamp, metadata, and supporting copy

## In scope

- app-provided event data
- read-only rendering
- compact audit-style presentation
- reuse beside task, board, and form surfaces

## Out of scope

- live updates
- streaming or polling behavior
- comments or threaded discussion
- user resolution and permissions
- filtering or sorting logic

## Demo rule

`apps/web` should own event creation and ordering so the shared widget family stays presentation-first rather than becoming a workflow engine.
