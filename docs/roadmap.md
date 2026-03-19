# Roadmap

## Current state

The repo already has the foundation in place:

- pnpm workspace and package boundaries are established
- `@ui-platform/tokens` exports the shared theme variables
- `@ui-platform/design-system` is a working Stencil package with build output
- Phases 1 through 7 are complete and committed
- `ui-button`, `ui-chip`, `ui-card`, and `ui-panel` are in the shared component layer
- layout and composition layers are in place with `ui-stack`, `ui-page-section`, `ui-badge`, and `ui-toolbar`
- `apps/web` loads the Stencil loader and consumes shared components incrementally
- `apps/mobile` is a thin shared-package consumer
- Phase 7 closes at the first committed calendar baseline
- Phase 8 hierarchy tightening is complete enough to treat the layer map and folder structure as the working baseline
- the current business-widget baseline now includes Kanban, Task List, Activity Timeline, and Checklist in addition to Calendar
- multi-week and year calendar views are deferred by product decision

The roadmap now needs to focus on the next phase: adding a dashboard assembly layer on top of the current hierarchy, then using that dashboard to tighten cross-widget API consistency and expose any remaining accessibility or boundary issues before adding more breadth.

## Delivery phases

### Phase 0: Foundation baseline

Status:

- In place

What is already true:

- Tokens exist and theme switching works
- Stencil is bootstrapped and produces distributable output
- The web app can load built custom elements
- Migration from shared CSS to shared components has started

### Phase 1: Tokens, shared components, and web integration baseline

Status:

- Complete and committed

Objective:

- Establish the first reusable shared layers and prove that `apps/web` can consume built Stencil components.

Current shared components:

- `ui-button` as a primitive
- `ui-chip` as the first feedback-oriented component
- `ui-card` and `ui-panel` as the first surfaces

Delivered:

- Token package and shared theme variables
- Stencil design-system package and build output
- Initial primitive and surface layer
- Web demo loading shared components from the design-system package

Exit criteria:

- Phase 1 is complete and should now be treated as the stable baseline for cleanup and layout-helper work

### Phase 2: Layout helpers and cleanup

Status:

- Complete and committed

Objective:

- Land the first shared layout-helper slice and reduce leftover transitional markup around the existing shared components.

Recommended implementation order:

1. Land and normalize `ui-stack`
2. Replace repeated internal spacing wrappers around cards and panels
3. Remove CSS that is no longer needed once shared components own the structure
4. Add a second layout helper only if the same pattern repeats in more than one section

Design constraints:

- Layout helpers should solve spacing and repeated structure, not page-specific composition
- Existing primitives and surfaces should not absorb layout-only responsibilities
- Cleanup should reduce ambiguity between app-local CSS and shared component responsibilities

Exit criteria:

- `ui-stack` is used in the places where repeated vertical spacing already exists
- The web demo has less wrapper and spacing duplication around `ui-card` and `ui-panel`
- Transitional CSS shrinks without blurring component boundaries

### Phase 3: Expand layout only where repetition is proven

Status:

- Complete and committed

Objective:

- Add the next layout helper only where the web demo proves a stable repeated structure beyond `ui-stack`.

Recommended implementation order:

1. `ui-page-section`
2. `ui-grid` only if the grid contract is stable across multiple sections
3. `ui-section-heading` only if the heading structure keeps repeating without page-specific variance

Guardrails:

- Keep layout APIs narrow
- Do not wrap every section of the demo in a bespoke layout component
- Prefer app-local markup when a structure appears only once

Exit criteria:

- The demo page uses shared layout components only for repeated structure
- Layout components compose surfaces and primitives without absorbing page-specific content

### Phase 4: Expand feedback and small reusable states

Status:

- Complete and committed

Objective:

- Grow the feedback layer after primitives and surfaces are stable.

Candidate work:

- Chip variants
- Badge or status indicator
- Empty-state or inline notice pattern

Exit criteria:

- Feedback components communicate state consistently without introducing app logic

### Phase 5: Shared compositions

Status:

- Complete and committed

Objective:

- Create product-agnostic composite blocks only after repeated app patterns are proven.

Candidate work:

- Toolbar
- Filter bar
- Widget shell

Exit criteria:

- Each composition appears in more than one page or use case
- The API stays product-neutral

### Phase 6: Ionic and mobile adoption

Status:

- Complete and committed

Objective:

- Bring the existing shared packages into the mobile shell once the web integration path is stable.

Exit criteria:

- Mobile consumes the same tokens and components without redefining the lower layers

### Phase 7: Business widgets

Status:

- Complete and committed

Objective:

- Establish the first committed business-widget baseline without overextending the calendar family.

Candidate work:

- Calendar
- Kanban board
- Task-oriented widgets

Committed baseline:

- `ui-calendar`
- `ui-calendar-toolbar`
- `ui-calendar-month-view`
- `ui-calendar-day-view`
- `ui-calendar-week-view`
- `ui-calendar-day-cell`
- `ui-calendar-event-chip`

Product decision:

- Phase 7 closes at the first committed calendar baseline
- Multi-week and year views are deferred
- Calendar remains a shared business-widget family, but view breadth is no longer the next implementation priority

### Phase 8: Hierarchy tightening across the design system

Status:

- Complete and committed as the current hierarchy baseline

Objective:

- Define and tighten the hierarchical order of components across the design system before adding more breadth.

Primary goals:

- Make every shared component's layer classification explicit
- Tighten dependency boundaries between layers
- Reduce cross-layer leakage in APIs, props, and shared utilities
- Establish the recommended implementation order from lower shared layers upward

Recommended implementation order:

1. Confirm the current layer map for all shared components
2. Tighten primitives and surfaces first
3. Re-validate layout and feedback boundaries
4. Separate generic compositions from widget-specific support components
5. Keep business widgets last and defer new calendar views until the hierarchy is stable

Expected output:

- A clearer layer map for existing components
- Fewer ambiguous responsibilities between layout, feedback, compositions, and business widgets
- A stricter review standard for where new shared code belongs

Delivered outcome:

- `src/components` now mirrors the layer hierarchy directly
- the design-system structure validator enforces the expected folder layout
- lower-layer cleanup landed before additional business-widget families were introduced

### Phase 9: Business-widget validation and API consistency

Status:

- Next

Objective:

- Validate the current widget set before introducing another family.

Primary goals:

- Normalize event naming and controlled-state expectations across business widgets
- Tighten keyboard and accessibility behavior for interactive widgets
- Use `apps/web` to expose remaining boundary leaks before adding more shared breadth
- Decide whether another family is justified only after the current baseline feels stable

Recommended implementation order:

1. Review interactive widget APIs across Calendar, Kanban, Task List, and Checklist
2. Review read-only widget APIs across Activity Timeline and supporting status surfaces
3. Confirm event names, toggle patterns, and controlled props are consistent where they should be
4. Tighten accessibility semantics and keyboard behavior where the current baseline is weak
5. Reassess whether a repeated product gap still justifies another family

Expected output:

- A more coherent business-widget API surface
- Fewer family-specific naming quirks
- Higher confidence that the next shared family is solving a real gap instead of following momentum

### Phase 10: Dashboard assembly layer

Status:

- In progress

Objective:

- Make dashboards easy to build from shared layout and composition pieces without turning dashboard structure into another business-widget family.

Primary goals:

- Add dashboard-specific layout and composition building blocks
- Prove that the current widget baseline can sit inside a coherent shared dashboard shell
- Keep app workflow and data orchestration out of the shared package

Recommended implementation order:

1. Add `ui-dashboard-grid` to the layout layer
2. Add `ui-dashboard-panel`, `ui-dashboard-header`, and `ui-stat-card` to the composition layer
3. Build a realistic dashboard surface in `apps/web` using existing widgets
4. Use that dashboard to identify cross-widget API and accessibility inconsistencies

Expected output:

- A shared dashboard assembly baseline
- Less app-specific dashboard framing code
- Better evidence about where the current widget contracts are still rough

## Near-term execution sequence

This is the recommended next order for a developer working in `packages/design-system` and `apps/web`.

1. Keep the current business-widget baseline stable.
   - Treat Calendar, Kanban, Task List, Activity Timeline, and Checklist as the current shared baseline.
   - Do not add deferred calendar views or workflow-heavy widgets by default.
2. Add the dashboard assembly layer.
   - Land shared layout and composition pieces for dashboard construction.
   - Keep dashboard structure product-agnostic.
3. Build and review the dashboard surface in `apps/web`.
   - Use the existing widget baseline inside the shared dashboard shell.
   - Expose API friction before adding more breadth.
4. Review the current business-widget APIs.
   - Confirm controlled props, event names, and interaction patterns are coherent across families.
   - Resolve inconsistencies explicitly instead of carrying them forward.
5. Tighten accessibility and interaction contracts.
   - Review keyboard behavior, toggle semantics, and read-only versus interactive expectations.
   - Keep product workflow rules in the app layer.
6. Reassess the next family only after the current baseline is stable.
   - Add more shared breadth only if a repeated gap remains after the validation pass.

## Recommended `apps/web` migration order

The web demo should continue to be the proving ground for hierarchy work and any future calendar slices.

Recommended sequence:

1. Keep the current month, day, and week calendar scenarios stable.
2. Preserve app-level demo glue in `apps/web` instead of baking product behavior into the shared widgets.
3. Use the demo to expose layer-boundary leaks, not to justify adding more deferred calendar breadth.
4. Keep dense scheduling, creation flows, and product workflows app-local until the shared hierarchy is tighter.

## Milestones

### Milestone 1: Phase 1 baseline is complete

Success means:

- The Phase 1 work is the committed baseline
- Tokens, primitives, surfaces, and web integration are in place
- Phase 2 can focus on layout-helper and cleanup work instead of bootstrap

### Milestone 2: Phase 2 layout-helper slice lands

Success means:

- `ui-stack` is part of the shared layer where repetition justifies it
- The web demo uses the helper to reduce repeated spacing markup
- Transitional CSS is visibly smaller and more intentional

### Milestone 3: Web integration is disciplined

Success means:

- New shared components are introduced only where repetition justifies them
- `apps/web` remains the first consumer for every new shared component
- Component boundaries are clearer after each migration step, not blurrier

### Milestone 4: Layout and feedback layers are ready to expand

Success means:

- Repeated page structure is understood well enough to promote into layout components
- Feedback variants are grounded in real usage rather than speculative design

### Milestone 5: Phase 7 calendar baseline is closed

Success means:

- Month, day, and the current narrow week view are the committed shared calendar baseline
- Multi-week and year views are explicitly deferred
- The next phase can focus on hierarchy and boundaries instead of more calendar breadth

### Milestone 6: Hierarchy tightening is complete enough to be the baseline

Success means:

- Every existing shared component has a clear layer assignment
- The recommended implementation order is lower layers first, business widgets last
- Reviews can reject cross-layer leakage using a documented standard

### Milestone 7: A shared dashboard assembly baseline lands

Success means:

- The repo can build a coherent dashboard from shared layout and composition pieces
- Existing business widgets fit into dashboard panels without bespoke app wrappers
- Dashboard framing is shared while product workflow stays app-local

### Milestone 8: The current business-widget set is validated before more breadth

Success means:

- Business-widget event naming and controlled-state rules are coherent enough to review consistently
- `apps/web` exposes remaining accessibility and API issues in the current widget set
- The team can justify the next family based on a repeated gap instead of momentum

## Guardrails

- Do not add another business-widget family by default before the current widget baseline is reviewed.
- Do not promote one-off demo markup into shared components.
- Do not introduce new tokens for a single component without checking whether an existing semantic token works first.
- Do not start Ionic work until the web consumer path stops exposing basic component API churn.
- Do not use deferred calendar views to mask unresolved hierarchy or boundary problems.
