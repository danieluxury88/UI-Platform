# Decisions

## Status legend

- Accepted: the team should execute against this choice unless new information changes it
- Open: the team needs a decision before implementation reaches that area

## D-001: Use a monorepo with workspace-based package management

Status: Accepted

Decision:

- Keep apps and shared packages in one repository managed through a workspace package manager.

Rationale:

- Shared tokens and components need fast local iteration with consuming apps.
- Early-stage architecture work benefits from single-repo visibility and simpler refactoring.

Consequences:

- The repo must maintain clear package boundaries from the start.
- Root scripts and CI need to support package-scoped execution.

## D-002: Build the reusable UI layer with Stencil

Status: Accepted

Decision:

- Implement the design system as Stencil-based Web Components.

Rationale:

- The design system should remain reusable across application shells.
- Web Components provide a framework-agnostic surface and fit the goal of multi-app reuse.

Consequences:

- Accessibility and event APIs must be designed carefully because consumers are not framework-specific.
- Integration examples in the web and mobile apps are required early to validate ergonomics.

## D-003: Use CSS custom properties as the token delivery mechanism

Status: Accepted

Decision:

- Publish design tokens primarily as CSS custom properties with a semantic token layer.

Rationale:

- CSS variables are portable across Stencil components, web apps, and mobile shells.
- Theming remains possible without rebuilding every component for each brand variation.

Consequences:

- Token naming discipline matters.
- Components should avoid hardcoded visual values unless structurally necessary.

## D-004: Keep application logic out of shared UI packages

Status: Accepted

Decision:

- Shared packages should stop at tokens and UI components.
- Product workflows, API integration, auth, and native adapters live in app-level code.

Rationale:

- Reusable UI degrades quickly when it is coupled to backend or product assumptions.
- App shells need freedom to evolve independently from the shared component layer.

Consequences:

- Some duplication across apps may be acceptable until a truly shared abstraction emerges.
- Code review should reject product-specific imports in shared packages.

## D-005: Validate on the web before optimizing for mobile

Status: Accepted

Decision:

- Use the web app as the first real consumer and add the mobile shell after the component model is stable.

Rationale:

- Browser feedback loops are faster.
- Foundation issues in tokens, accessibility, and composition are cheaper to fix before native packaging enters the loop.

Consequences:

- Mobile-specific needs may arrive later and should be handled in the app layer first.
- The team should avoid making early component API decisions solely for hypothetical native cases.

## D-006: Migrate to Stencil incrementally from the existing CSS demo

Status: Accepted

Decision:

- Use the current shared-CSS web demo as the migration baseline while expanding the Stencil design system in `packages/design-system`.

Rationale:

- The repo already has a usable visual surface, token wiring, and shared styles.
- Replacing that baseline incrementally reduces risk and gives each new component an immediate consumer.

Consequences:

- Temporary shared CSS may coexist with Stencil components for a short period.
- The migration should prioritize extracting primitives that already exist in the static demo.
- The web app should remain runnable throughout the bootstrap and migration phases.
- New shared layers should be introduced in order: primitives, then surfaces, then layout, then feedback, then compositions, then business widgets.

## D-007: Use pnpm as the workspace package manager

Status: Accepted

Decision:

- Use pnpm as the workspace package manager for the monorepo.

Rationale:

- The repo already contains a pnpm workspace scaffold.
- pnpm provides strong workspace linking and predictable package isolation for shared package development.

Consequences:

- Root scripts and contributor setup should assume pnpm by default.
- Future documentation should not describe package-manager selection as an open bootstrap question.

## D-008: Close Phase 7 at the first committed calendar baseline

Status: Accepted

Decision:

- Treat the first committed calendar baseline as the end of Phase 7.

Rationale:

- The first committed calendar baseline establishes the calendar family as a shared business-widget baseline without forcing denser or broader views into the design-system too early.
- Product has decided that multi-week and year views should be deferred rather than defining the next phase.

Consequences:

- `ui-calendar`, `ui-calendar-toolbar`, `ui-calendar-month-view`, `ui-calendar-day-view`, `ui-calendar-week-view`, `ui-calendar-day-cell`, and `ui-calendar-event-chip` form the committed shared baseline.
- Multi-week and year are deferred.
- The next phase should focus on hierarchy tightening, layer boundaries, and implementation order across the design system rather than more calendar breadth.

## D-009: Validate the current widget baseline before adding another family

Status: Accepted

Decision:

- After the initial business-widget expansion, prioritize API consistency, accessibility, and app-level validation of the current widget set before introducing another shared family.

Rationale:

- The repo now has multiple business-widget families, which increases the cost of inconsistent event naming and interaction rules.
- Adding more breadth before validating the current baseline would make cross-family cleanup more expensive.
- `apps/web` is already rich enough to expose the next round of API and accessibility issues.

Consequences:

- The next implementation slice should review Calendar, Kanban, Task List, Activity Timeline, and Checklist before proposing another family.
- New widget families need a clearer justification than “we can add more components now”.
- Documentation should treat the current widget baseline as something to validate, not just to expand.

## Open questions

### O-002: Is a component documentation site required in the first milestone?

Status: Open

Decision needed:

- Decide whether the first milestone needs a dedicated component documentation surface or whether the web app is sufficient.

Current recommendation:

- Use the web app as the initial integration surface and defer a dedicated docs site until the first component set is stable.

### O-003: Which advanced third-party libraries are justified?

Status: Open

Decision needed:

- Determine whether drag-and-drop, charts, or table libraries are actually required for the first product needs.

Current recommendation:

- Delay those choices until an advanced widget has a concrete requirement and acceptance criteria.
