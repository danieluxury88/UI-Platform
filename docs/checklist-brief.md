# Checklist Brief

## Purpose

The checklist family provides a thin review and handoff surface that can sit between intake, planning, and execution.

The shared package stays intentionally narrow:

- controlled `items` input
- completed or incomplete state per item
- optional metadata and supporting note
- toggle event for host-app interaction

## Included components

- `ui-checklist`
  Role: shell for a controlled set of review or completion items
- `ui-checklist-item`
  Role: single checklist row with state, label, optional note, and toggle event

## In scope

- app-provided completion state
- compact review-style presentation
- toggle interactions
- reuse beside forms, task views, and handoff surfaces

## Out of scope

- approval policy
- permissions
- escalation logic
- multi-user workflows
- shared persistence or audit rules

## Demo rule

`apps/web` should compute checklist completion locally from the current intake form and own any manual handoff step so the shared widget family stays generic.
