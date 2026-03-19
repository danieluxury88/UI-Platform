# Roadmap

## Current state

The repo already has the foundation in place:

- pnpm workspace and package boundaries are established
- `@ui-platform/tokens` exports the shared theme variables
- `@ui-platform/design-system` is a working Stencil package with build output
- `ui-button` and `ui-chip` exist as the first shared components
- `apps/web` loads the Stencil loader and consumes those components incrementally
- `apps/mobile` remains a later-stage shell

The roadmap now needs to focus on expanding the design-system package in the agreed layer order and steadily replacing transitional markup in `apps/web`.

## Delivery phases

### Phase 0: Foundation baseline

Status:

- In place

What is already true:

- Tokens exist and theme switching works
- Stencil is bootstrapped and produces distributable output
- The web app can load built custom elements
- Migration from shared CSS to shared components has started

### Phase 1: Harden the current lower layers

Status:

- Active

Objective:

- Stabilize the first low-level component APIs before the library expands upward.

Current shared components:

- `ui-button` as a primitive
- `ui-chip` as the first feedback-oriented component

Recommended work:

- Review and tighten the public props for the existing components
- Fill obvious primitive gaps only if they are already repeated in `apps/web`
- Add spec coverage for variants, disabled states, and slotted content
- Remove primitive styling duplication from app markup where the component already exists

Exit criteria:

- The first low-level APIs feel stable enough to reuse without page-specific hacks
- The web demo relies on the shared components in visible places

### Phase 2: Add the first surfaces

Status:

- Next

Objective:

- Move repeated container and framing patterns out of raw classes and into reusable components.

Recommended implementation order:

1. `ui-card`
2. `ui-panel`
3. `ui-section-heading` or equivalent only if the pattern is repeated enough

Design constraints:

- Surfaces should own framing, elevation, border, and padding behavior
- Surfaces may host arbitrary slotted content
- Surfaces should not own page layout rules

Exit criteria:

- The main content cards in `apps/web` use shared surface components
- Shared CSS for card and panel treatment is reduced or clearly transitional

### Phase 3: Introduce minimal layout helpers

Status:

- Next

Objective:

- Add layout components only where they remove repeated structural markup from the web app.

Recommended implementation order:

1. `ui-stack`
2. `ui-page-section`
3. `ui-grid` only if the grid contract is stable across multiple sections

Guardrails:

- Keep layout APIs narrow
- Do not wrap every section of the demo in a bespoke layout component
- Prefer app-local markup when a structure appears only once

Exit criteria:

- The demo page uses shared layout components only for repeated structure
- Layout components compose surfaces and primitives without absorbing page-specific content

### Phase 4: Expand feedback and small reusable states

Status:

- Later

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

- Later

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

- Later

Objective:

- Bring the existing shared packages into the mobile shell once the web integration path is stable.

Exit criteria:

- Mobile consumes the same tokens and components without redefining the lower layers

### Phase 7: Business widgets

Status:

- Later

Objective:

- Add high-complexity domain widgets only when the lower layers stop shifting.

Candidate work:

- Calendar
- Kanban board
- Task-oriented widgets

## Near-term execution sequence

This is the recommended next order for a developer working in `packages/design-system` and `apps/web`.

1. Harden `ui-button`.
   - Confirm variant naming, disabled behavior, and slot behavior.
   - Add or tighten tests before expanding the API further.
2. Harden `ui-chip`.
   - Decide whether it remains a general feedback primitive or narrows into a status-only component.
   - Align tone naming with token semantics.
3. Implement `ui-card`.
   - Move the main card framing from raw CSS into a surface component.
   - Migrate one prominent card in `apps/web` first.
4. Implement `ui-panel`.
   - Use it for the hero-side informational panel in `apps/web`.
   - Keep panel responsibilities to framing and spacing, not section layout.
5. Evaluate repeated section structure in `apps/web`.
   - If repeated enough, add `ui-page-section` or `ui-stack`.
   - If not, keep the structure app-local for now.
6. Reduce transitional CSS.
   - Remove styles that are fully replaced by components.
   - Keep only the shared CSS that still supports unmigrated structures.

## Recommended `apps/web` migration order

The web demo should continue to be the proving ground for each new component.

Recommended sequence:

1. Keep the existing `ui-button` and `ui-chip` usage stable.
2. Replace the primary card surface in the demo with `ui-card`.
3. Replace the hero-side panel with `ui-panel`.
4. Move repeated section framing into a shared layout helper only if repetition is real.
5. Keep stats, lists, and one-off page structure app-local until clear shared patterns emerge.

## Milestones

### Milestone 1: Primitive layer is stable

Success means:

- `ui-button` and `ui-chip` have reviewed APIs
- Low-level tests cover their main states
- The web demo uses those shared components without page-specific workarounds

### Milestone 2: Surface layer is live

Success means:

- `ui-card` and `ui-panel` exist
- The web demo uses them in its major content areas
- Transitional CSS is visibly smaller

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
