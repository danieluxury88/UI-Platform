# Business Widget Queue

## Purpose

This document defines the recommended next business-oriented component families after the current calendar, kanban, and form-control baselines.

The goal is to expand the system in a way that:

- reuses the current lower layers cleanly
- gives `apps/web` realistic product-like scenarios
- avoids pushing workflow-specific logic into shared packages

## Current baseline

Shared business-widget families already in place:

- Calendar
- Kanban

Shared form-control baseline already in place:

- Input
- Textarea
- Select

This means the next business-oriented work should prefer widgets that benefit from:

- controlled data input
- task-like record rendering
- status and timeline display

## Selection rules

A candidate should move forward only if it meets all of these:

1. It solves a repeated product problem, not a one-off page.
2. It can be expressed with a thin controlled API.
3. It reuses current primitives, surfaces, layout, feedback, and compositions instead of recreating them.
4. App-level filtering, persistence, permissions, and workflow rules can stay outside the shared package.

## Recommended priority order

### 1. Task List Family

Priority:

- Highest

Why next:

- It complements kanban directly with a denser list view of the same kind of work items.
- It fits naturally with the new form controls for task/request creation and editing flows.
- It can stay thin and controlled without drag-and-drop or deep workflow logic.

Recommended first slice:

- `ui-task-list`
  Role: controlled list shell for task-like records
- `ui-task-list-item`
  Role: compact task row with title, meta, status, and activation event

In scope:

- Controlled `items` input
- Activation event
- Compact metadata display
- Optional status slot or tone

Out of scope:

- Sorting logic
- Inline editing
- Assignee resolution
- Product-specific status semantics

### 2. Activity Timeline Family

Priority:

- Second

Why next:

- It gives the system a strong read-only history/audit surface that works across many business apps.
- It pairs well with forms, task lists, and kanban without forcing shared workflow logic.
- It can prove event-density rendering without becoming a scheduler.

Recommended first slice:

- `ui-activity-timeline`
  Role: ordered event list shell
- `ui-activity-timeline-item`
  Role: single event row with timestamp, title, and supporting copy

In scope:

- Controlled event input
- Read-only rendering
- Timestamp and metadata display

Out of scope:

- Live updates
- Streaming
- Comment threads
- User resolution logic

### 3. Checklist / Review Family

Priority:

- Third

Why next:

- It creates a bridge between form submission and task execution.
- It supports review and handoff flows without forcing domain-specific approval engines.
- It can reuse the current feedback and primitive layers heavily.

Recommended first slice:

- `ui-checklist`
  Role: ordered set of review or completion items
- `ui-checklist-item`
  Role: single row with state, label, and optional note

In scope:

- Controlled items
- Completed/incomplete state
- Activation or toggle event

Out of scope:

- Multi-user workflows
- Approval policies
- Escalation logic

## Recommended implementation order

1. Build the Task List family first.
2. Use `apps/web` to show the same work in kanban and list form without shared filtering logic.
3. Add the Activity Timeline family next to support history and audit scenarios.
4. Only then consider Checklist / Review if the workflow needs remain generic enough.

## What not to build next

Avoid these until the queue above is proven:

- drag-and-drop scheduling
- approval engines
- resource planners
- dense data tables with sorting/filtering/pinning
- chart-heavy widgets
- widgets that require backend assumptions to feel coherent

## Next concrete slice

Recommended next implementation target:

1. `ui-task-list`
2. `ui-task-list-item`
3. a small `apps/web` demo that shows the same task records in both kanban and list form

That path keeps the next step close to the current system and gives a clean test of whether the widget family boundaries still hold.
