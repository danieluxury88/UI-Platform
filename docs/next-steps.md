# Next Steps

## Current baseline

The shared design-system baseline now includes:

- lower shared layers with an explicit filesystem hierarchy
- Calendar as the original business-widget baseline
- Kanban, Task List, Activity Timeline, and Checklist as additional business-widget families
- `apps/web` as the proving ground for controlled-state and interaction contracts

## Recommended next discussion

The next large goal is to make dashboards easy to assemble from shared pieces without pushing app workflow into the design system.

It is:

1. Which dashboard assembly pieces belong in layout versus compositions?
2. Which current business widgets should drop cleanly into dashboard panels with no app-specific wrapper code?
3. Which cross-widget API inconsistencies still need cleanup so dashboard assembly stays predictable?

## Recommended next implementation slice

1. Add a dashboard assembly layer with `ui-dashboard-grid`, `ui-dashboard-panel`, `ui-dashboard-header`, and `ui-stat-card`
2. Build a real dashboard surface in `apps/web` using the existing widget baseline
3. Use that dashboard to expose remaining API and accessibility inconsistencies
4. Tighten the current widget contracts before deciding whether another family is needed

## What should wait

- another business-widget family added only for breadth
- deferred calendar views
- workflow-heavy widgets such as approvals, planners, or tables with dense behavior
- product-specific dashboard logic promoted into shared packages

## Decision gate after the validation pass

Once the dashboard assembly layer feels coherent, revisit whether another family is justified and, if so, choose it from a real repeated gap rather than from momentum.
