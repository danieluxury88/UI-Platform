# Roadmap

## Current state

The repo already has the foundation in place:

- pnpm workspace and package boundaries are established
- `@ui-platform/tokens` exports the shared theme variables
- `@ui-platform/design-system` is a working Stencil package with build output
- Phases 1 through 6 are complete and committed
- `ui-button`, `ui-chip`, `ui-card`, and `ui-panel` are in the shared component layer
- layout and composition layers are in place with `ui-stack`, `ui-page-section`, `ui-badge`, and `ui-toolbar`
- `apps/web` loads the Stencil loader and consumes shared components incrementally
- `apps/mobile` is a thin shared-package consumer
- the calendar family has started with a month-first milestone in progress

The roadmap now needs to focus on Phase 7 business-widget work, starting with the shared calendar family while keeping the lower shared layers stable.

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

- Active

Objective:

- Add high-complexity domain widgets only when the lower layers stop shifting.

Candidate work:

- Calendar
- Kanban board
- Task-oriented widgets

Current focus:

- Build the calendar as a component family, not a monolith
- Keep the API controlled around `view`, `anchorDate`, `selectedDate`, and `events`
- Use `apps/web` as the proving surface before introducing denser business views elsewhere

Rollout order:

1. Month baseline
2. Day view
3. Week view
4. Multi-week only if product need is proven
5. Year view later

Current milestone:

- `ui-calendar`, `ui-calendar-toolbar`, `ui-calendar-month-view`, `ui-calendar-day-cell`, `ui-calendar-event-chip`, and `ui-calendar-day-view` form the current baseline
- `ui-calendar-week-view` is the next implementation slice
- See `docs/calendar-brief.md` for the current architecture brief

## Near-term execution sequence

This is the recommended next order for a developer working in `packages/design-system` and `apps/web`.

1. Keep the month-first calendar baseline build-clean.
   - Treat `ui-calendar` plus the month view as the shared contract in motion.
   - Avoid breaking the controlled API while new views are introduced.
2. Revisit shared calendar utilities after the day view lands.
   - Promote date-range or label helpers only when month and day both need them.
   - Avoid locking in a month-centric helper model that blocks week or year later.
3. Add week view only after day behavior is stable.
   - Use day-view feedback to shape time-slot, keyboard, and event-density decisions.
4. Treat year and multi-week as later validation work.
   - Do not let them distort the earlier month/day APIs prematurely.

## Recommended `apps/web` migration order

The web demo should continue to be the proving ground for each new calendar slice.

Recommended sequence:

1. Keep the current month-view demo stable.
2. Keep the day-view scenario driven by the same controlled calendar shell.
3. Preserve app-level demo glue in `apps/web` instead of baking product behavior into the widget.
4. Introduce week-level interactions only after day view exposes the next real constraints.
5. Keep dense scheduling, creation flows, and product workflows app-local until the shared widget family proves the lower contracts.

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

## Guardrails

- Do not add business widgets while surfaces and layout are still moving.
- Do not promote one-off demo markup into shared components.
- Do not introduce new tokens for a single component without checking whether an existing semantic token works first.
- Do not start Ionic work until the web consumer path stops exposing basic component API churn.
