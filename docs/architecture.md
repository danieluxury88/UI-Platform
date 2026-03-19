# Architecture

## Purpose

This document describes the current architecture target for the UI Platform monorepo and the rules that should guide the next implementation steps.

The repository is already past the planning-only stage. It now has:

- A pnpm workspace
- A token package exporting shared CSS variables
- A Stencil-based `@ui-platform/design-system` package
- Shared primitives, surfaces, layout helpers, feedback components, and the first composition layer
- A web demo that loads built custom elements and still uses some shared CSS during migration
- A thin mobile package consuming the shared layers
- A business-widget track started through the calendar family

The main architectural job now is not bootstrap. Lower shared layers are committed and stable enough to support business widgets. The active work is the calendar family, starting with a month-first baseline and expanding carefully into day and later week views without collapsing into a single monolithic component.

## Goals

- Keep the design system framework-agnostic through Stencil and Web Components
- Preserve a single token source of truth across web and later mobile surfaces
- Grow the component library in a layered order that avoids circular abstractions
- Use `apps/web` as the proving ground for component APIs and migration quality
- Keep mobile work downstream from a stable web integration path

## Non-goals

- Putting product logic, routing, or backend concerns in shared packages
- Converting every existing CSS class into a component immediately
- Building advanced business widgets before the lower layers are stable
- Optimizing for Ionic-specific constraints before the web consumer path is mature

## Monorepo structure

```text
.
|-- apps/
|   |-- web/
|   `-- mobile/
|-- packages/
|   |-- tokens/
|   `-- design-system/
|-- docs/
`-- readme.md
```

## Package responsibilities

### `packages/tokens`

Responsibility:

- Define and publish the shared visual contract
- Expose global CSS custom properties for themes and component consumption

Should contain:

- Theme tokens
- Semantic aliases
- Token documentation and any future token build logic

Should not contain:

- Component selectors
- Product naming
- App-specific overrides

### `packages/design-system`

Responsibility:

- Implement reusable components with Stencil
- Consume tokens and expose stable component APIs
- Carry only the minimum transitional shared CSS needed while migration is underway

Should contain:

- Component source
- Global styles required by the Stencil package
- Component-level docs and tests

Should not contain:

- Routing
- API clients
- Product workflows
- Native integrations

### `apps/web`

Responsibility:

- Act as the first real consumer of the design system
- Expose API friction, theming issues, and composition gaps early
- Host migration from class-based markup to shared components

Should contain:

- Demo and integration pages
- App-level interaction glue
- Thin page-specific layout code

Should not contain:

- Reusable component implementations that belong in `packages/design-system`

### `apps/mobile`

Responsibility:

- Later consumer for the same token and component packages
- Ionic shell and Capacitor integration when the design-system contract is stable

Should not contain:

- Forked versions of shared components
- Shared abstractions created only for one mobile flow

## Dependency boundaries

Package-level rules:

- `packages/tokens` depends on nothing inside the repo.
- `packages/design-system` may depend on `packages/tokens` and Stencil runtime utilities.
- `apps/web` and `apps/mobile` may depend on `packages/design-system` and `packages/tokens`.
- Apps must not depend on each other.

Practical rule:

- If something still makes sense without routes, APIs, auth, or app state, it is a candidate for the design system.
- If something knows about navigation, product copy, backend resources, or native plugins, it belongs in an app.

## Component hierarchy

The agreed component taxonomy is:

1. Tokens
2. Primitives
3. Surfaces
4. Layout
5. Feedback
6. Compositions
7. Business widgets

This order is also the dependency direction. Higher layers may compose lower layers, but not the reverse.

### 1. Tokens

Examples:

- Color, spacing, radius, shadow, typography, motion variables

Rules:

- Tokens do not depend on component code.
- New reusable visual values must be introduced here first, not invented ad hoc inside components.

### 2. Primitives

Examples:

- `ui-button`
- text inputs
- icon wrappers
- basic interactive controls

Rules:

- Primitives may depend on tokens only.
- Primitives should not depend on surfaces, layout, or app markup.
- Primitive APIs should stay narrow and predictable.

### 3. Surfaces

Examples:

- Card
- Panel
- Section container
- Elevated content blocks

Rules:

- Surfaces may depend on tokens and primitives.
- Surfaces define containment and visual framing, not page structure.

### 4. Layout

Examples:

- Stack
- Grid
- Page shell
- Section header wrapper

Rules:

- Layout may depend on tokens, primitives, and surfaces.
- Layout components should solve repeated structural problems, not one-off page markup.

### 5. Feedback

Examples:

- `ui-chip`
- badges
- inline status
- empty-state notices

Rules:

- Feedback components may depend on tokens, primitives, and surfaces when needed.
- They should communicate state, not own business workflows.

### 6. Compositions

Examples:

- Toolbar
- Filter bar
- Widget shell
- Reusable dashboard blocks

Rules:

- Compositions may use lower shared layers but must remain product-agnostic.
- If a composition starts encoding one app's workflow, it should stay in the app instead.

### 7. Business widgets

Examples:

- Calendar
- Kanban board
- Task card tied to domain behavior

Rules:

- Business widgets sit at the top of the hierarchy and should arrive last.
- They require a concrete product need and stable lower layers first.
- Calendar planning should follow the component-family approach described in `docs/calendar-brief.md`, with a shared shell, separate view components, and month-first rollout.

## Layer dependency rules

The design-system package should enforce these rules in code review:

- Tokens can be referenced by all layers.
- Primitives cannot import surfaces, layout, feedback, compositions, or business widgets.
- Surfaces cannot import layout, compositions, or business widgets.
- Layout cannot import compositions or business widgets.
- Feedback should not import compositions or business widgets.
- Compositions may import primitives, surfaces, layout, and feedback.
- Business widgets may use any lower shared layer, but app-specific workflows still stay outside the shared package unless reuse is proven.

## Token usage guidance for component authors

Component authors should treat the token package as the styling contract.

Required rules:

- Do not hardcode brand colors, spacing values, radii, or shadows inside a component when an existing token covers the need.
- Prefer semantic tokens such as `--ui-color-surface` and `--ui-color-text-muted` over raw palette-like names in component CSS.
- Use spacing and sizing from the established scale before creating a new value.
- If a component needs local customization, expose a namespaced component variable that falls back to a shared token.

Example:

```css
:host {
  --ui-button-bg: var(--ui-color-text);
  --ui-button-fg: var(--ui-color-surface);
}
```

Use that pattern when:

- The component needs a stable override point
- The fallback should still align with the token system

Do not use that pattern when:

- The value should obviously be promoted to a shared token because multiple components will need it

Promotion rule:

- If the same visual value or semantic meaning appears in more than one component, move it into `packages/tokens` instead of duplicating component-local variables.

Theme rule:

- Components must work under the current light and dark token sets without requiring app-specific overrides.

## Current implementation baseline

As of now, the design-system package already contains early primitives and the web app already loads built custom elements. That means the next work should extend a live component library, not design a hypothetical one.

Current baseline:

- Tokens are delivered as shared CSS custom properties.
- `packages/design-system` is configured with Stencil and produces built output.
- `ui-button`, `ui-chip`, `ui-card`, and `ui-panel` are active shared components.
- `ui-stack` is the first shared layout-helper slice.
- `apps/web` loads the Stencil loader and uses shared components alongside transitional class-based markup.

## Testing strategy

Near-term testing priorities:

- Spec tests for primitive behavior and API states
- Type checks for the design-system package
- A smoke path in `apps/web` that proves loader registration and theme-safe rendering

Order of investment:

1. Primitive specs
2. Web integration smoke checks
3. Visual regression for stable components
4. Mobile validation after web integration is stable

## Development workflow

Recommended working loop:

1. Add or update tokens only when the visual contract genuinely needs to expand.
2. Build the component in `packages/design-system`.
3. Validate it immediately in `apps/web`.
4. Remove or reduce transitional shared CSS when the new component replaces it.
5. Add tests once the API is stable enough to defend.

## Current recommended component order

Based on the live repo state, the next layers should progress like this:

1. Finish the first layout-helper and cleanup pass around `ui-stack`
2. Reduce transitional wrappers and CSS around the existing surface layer
3. Add the next layout helper only if the same structure repeats in more than one place
4. Add feedback variants only after the layout-helper pass settles
5. Add compositions after repeated page patterns exist
6. Delay business widgets until at least one shared page structure feels stable
