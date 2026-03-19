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
- Task list
- Activity timeline
- Checklist

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

## Next decision gate

The current baseline is broad enough that the next move should not be another widget family by default.

Recommended next step:

1. Validate the current widget set in `apps/web`.
2. Tighten any API or accessibility issues that show up across Task List, Activity Timeline, and Checklist.
3. Only then select the next family if a repeated gap still remains.

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

1. review the current business-widget APIs for naming and accessibility consistency
2. confirm event naming and controlled-state rules across Kanban, Task List, Activity Timeline, and Checklist
3. use `apps/web` to expose any remaining boundary leaks before selecting another shared family

That path protects the current hierarchy and reduces the chance of adding a sixth widget family on top of unstable contracts.
