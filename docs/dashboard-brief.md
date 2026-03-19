# Dashboard Brief

## Purpose

The next large product goal is to make dashboards easy to assemble from shared building blocks without turning dashboard structure into a business-widget family.

Dashboard assembly should come from layout and composition layers:

- layout defines regions and responsive placement
- compositions provide panel shells, headers, and summary blocks
- business widgets plug into that shell as content

## Recommended first slice

- `ui-dashboard-grid`
  Role: responsive layout grid for dashboard regions
- `ui-dashboard-panel`
  Role: framed composition block for dashboard sections
- `ui-dashboard-header`
  Role: reusable heading/action row for dashboard regions
- `ui-dashboard-filters`
  Role: reusable filter and action wrapper for dashboard controls
- `ui-dashboard-kpi-row`
  Role: dense summary row for dashboard metrics
- `ui-stat-card`
  Role: compact summary metric block

## In scope

- shared dashboard structure
- summary blocks
- widget framing
- responsive panel placement
- reuse of the current widget baseline inside dashboard panels

## Out of scope

- product-specific queries
- data fetching
- dashboard editing
- persistence of layout preferences
- domain-heavy dashboard widgets

## Layer rule

Dashboard shells belong in layout and compositions, not in business widgets.

That keeps the system flexible:

- Calendar, Kanban, Task List, Activity Timeline, and Checklist remain reusable content widgets
- dashboard structure stays product-agnostic
- app-level workflow and data orchestration remain outside the shared package

## Follow-on hardening

After the first slice lands, the next dashboard pass should focus on:

- predictable filter and action placement across dashboard shells
- denser KPI presentation without app-specific wrappers
- accessible panel labeling
- predictable heading hierarchy inside dashboard regions
- consistent summary-card semantics
- confirming that existing widgets drop into panels without bespoke wrappers
